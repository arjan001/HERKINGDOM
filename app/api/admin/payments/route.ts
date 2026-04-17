import { NextRequest, NextResponse } from "next/server"
import { requireAuth, rateLimit, rateLimitResponse, isValidPhone } from "@/lib/security"
import { createClient } from "@/lib/supabase/server"
import { getPayHeroEnv, initiateStkPush, getWalletBalance } from "@/lib/payhero"

/**
 * Admin payments API.
 *
 * Transactions are stored in the `orders` table (payment_method = "mpesa"),
 * so we no longer talk to any external transactions list — PayHero is only
 * used to fire STK pushes and read the wallet balance.
 */

export async function GET(request: NextRequest) {
  const rl = rateLimit(request, { limit: 30, windowSeconds: 60 })
  if (!rl.success) return rateLimitResponse()
  const auth = await requireAuth()
  if (!auth.authenticated) return auth.response!

  const { searchParams } = new URL(request.url)
  const action = searchParams.get("action") || "transactions"

  if (action === "card-payments") {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from("orders")
        .select("id, order_no, customer_name, customer_phone, customer_email, subtotal, delivery_fee, total, status, payment_method, order_notes, created_at")
        .eq("payment_method", "card")
        .order("created_at", { ascending: false })
        .limit(100)

      if (error) {
        console.error("Supabase card payments error:", error)
        return NextResponse.json({ error: "Failed to fetch card payments" }, { status: 500 })
      }
      return NextResponse.json(data || [])
    } catch (error) {
      console.error("Card payments error:", error)
      return NextResponse.json({ error: "Failed to fetch card payments" }, { status: 500 })
    }
  }

  if (action === "transactions") {
    try {
      const supabase = await createClient()
      const status = searchParams.get("status") || ""
      const limit = Math.min(100, Number(searchParams.get("limit") || "50"))

      let query = supabase
        .from("orders")
        .select("id, order_no, customer_name, customer_phone, mpesa_code, mpesa_phone, total, status, payment_method, created_at")
        .eq("payment_method", "mpesa")
        .order("created_at", { ascending: false })
        .limit(limit)

      if (status === "success" || status === "completed") {
        query = query.eq("status", "confirmed")
      } else if (status === "pending") {
        query = query.eq("status", "pending")
      } else if (status === "failed") {
        query = query.eq("status", "cancelled")
      }

      const { data, error } = await query
      if (error) {
        console.error("Supabase transactions error:", error)
        return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
      }

      const txs = (data || []).map((row) => ({
        id: row.id,
        reference: row.order_no,
        amount: Number(row.total) || 0,
        currency: "KES",
        status: row.status === "confirmed" ? "success" : row.status,
        phone: row.mpesa_phone || row.customer_phone,
        mpesaReceipt: row.mpesa_code || "",
        customer: row.customer_name,
        timestamp: row.created_at,
      }))
      return NextResponse.json(txs)
    } catch (error) {
      console.error("Transactions error:", error)
      return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
    }
  }

  if (action === "balance") {
    const env = getPayHeroEnv()
    if (!env) {
      return NextResponse.json({ configured: false, error: "PayHero not configured" })
    }
    const balance = await getWalletBalance(env)
    if (!balance) {
      return NextResponse.json({ configured: true, error: "Could not read wallet balance" }, { status: 502 })
    }
    return NextResponse.json({
      configured: true,
      balance: balance.balance,
      currency: "KES",
      channelId: balance.channelId,
      channelName: balance.channelName,
    })
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}

export async function POST(request: NextRequest) {
  const rl = rateLimit(request, { limit: 15, windowSeconds: 60 })
  if (!rl.success) return rateLimitResponse()
  const auth = await requireAuth()
  if (!auth.authenticated) return auth.response!

  try {
    const body = await request.json()
    const { action, ...payload } = body

    if (action === "stk-push") {
      const env = getPayHeroEnv()
      if (!env) {
        return NextResponse.json(
          { error: "PayHero not configured. Set PAYHERO_BASIC_AUTH_TOKEN (or PAYHERO_API_USERNAME + PAYHERO_API_PASSWORD) and PAYHERO_CHANNEL_ID. The callback URL is derived from NEXT_PUBLIC_SITE_URL / URL; set PAYHERO_CALLBACK_URL only to override." },
          { status: 503 },
        )
      }

      const phone = String(payload.phone || "")
      const amount = Math.round(Number(payload.amount) || 0)
      if (!isValidPhone(phone) || amount < 1) {
        return NextResponse.json({ error: "Valid phone and amount are required" }, { status: 400 })
      }

      // Admin-initiated STK pushes do not come from a customer-facing order;
      // stamp them with a traceable reference so the callback can be matched
      // if the operator wants to reconcile later.
      const reference = `ADMIN-${Date.now().toString(36).toUpperCase()}`
      const result = await initiateStkPush(env, {
        amount,
        phone,
        externalReference: reference,
        customerName: payload.customerName ? String(payload.customerName) : undefined,
      })

      if (!result.success) {
        return NextResponse.json({ error: result.error || "STK push failed", details: result.raw }, { status: 502 })
      }
      return NextResponse.json({
        success: true,
        reference,
        checkoutRequestId: result.checkoutRequestId,
        status: result.status,
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("PayHero admin error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
