import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

/**
 * POST /api/payments/payhero/callback
 * Webhook called by PayHero once an STK push resolves (success or failure).
 *
 * Expected payload shape:
 * {
 *   "status": true,
 *   "response": {
 *     "Amount": 10,
 *     "CheckoutRequestID": "ws_CO_...",
 *     "ExternalReference": "CC-XXXX",
 *     "MerchantRequestID": "...",
 *     "MpesaReceiptNumber": "SAE3YULR0Y",
 *     "Phone": "+2547...",
 *     "ResultCode": 0,
 *     "ResultDesc": "The service request is processed successfully.",
 *     "Status": "Success"
 *   }
 * }
 */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown> = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ received: true })
  }

  const response = (body.response || {}) as Record<string, unknown>
  const externalReference = (response.ExternalReference as string) || ""
  const checkoutRequestId = (response.CheckoutRequestID as string) || ""
  const mpesaReceipt = (response.MpesaReceiptNumber as string) || ""
  const resultCode = Number(response.ResultCode ?? -1)
  const statusLabel = String(response.Status || "").toLowerCase()
  const resultDesc = (response.ResultDesc as string) || ""
  const phone = (response.Phone as string) || ""
  const amount = typeof response.Amount === "number" ? (response.Amount as number) : undefined

  const isSuccess = resultCode === 0 || statusLabel === "success"

  try {
    const supabase = createAdminClient()

    // Locate the order: prefer the external reference (our order_no), fall
    // back to matching on the CheckoutRequestID we stashed during initiation.
    let orderQuery = supabase
      .from("orders")
      .select("id, order_no, mpesa_message")
      .limit(1)

    if (externalReference) {
      orderQuery = orderQuery.eq("order_no", externalReference)
    } else if (checkoutRequestId) {
      orderQuery = orderQuery.eq("mpesa_code", checkoutRequestId)
    } else {
      return NextResponse.json({ received: true })
    }

    const { data: order } = await orderQuery.maybeSingle()
    if (!order) return NextResponse.json({ received: true })

    const update: Record<string, unknown> = {
      payment_method: "mpesa",
      mpesa_phone: phone || undefined,
      mpesa_message: JSON.stringify({
        status: statusLabel || (isSuccess ? "success" : "failed"),
        resultCode,
        resultDesc,
        amount,
        mpesaReceipt,
        checkoutRequestId,
        receivedAt: new Date().toISOString(),
      }),
    }

    if (isSuccess) {
      update.mpesa_code = mpesaReceipt || checkoutRequestId
      update.status = "confirmed"
    } else {
      // Leave mpesa_code pointing at the CheckoutRequestID so polling still
      // finds the order, but surface the failure through mpesa_message.
      if (!mpesaReceipt && checkoutRequestId) update.mpesa_code = checkoutRequestId
    }

    await supabase.from("orders").update(update).eq("id", order.id)
  } catch (error) {
    console.error("[payhero] callback error:", error)
  }

  // Always acknowledge so PayHero does not retry indefinitely.
  return NextResponse.json({ received: true })
}
