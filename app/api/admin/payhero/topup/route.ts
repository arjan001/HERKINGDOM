import { NextRequest, NextResponse } from "next/server"
import { rateLimit, rateLimitResponse, requireAuth, isValidPhone, sanitize } from "@/lib/security"
import { getPayHeroEnv, normalizePhone } from "@/lib/payhero"

const PAYHERO_BASE = "https://backend.payhero.co.ke/api/v2"

/**
 * POST /api/admin/payhero/topup
 * Body: { amount: number, phone: string }
 *
 * Tops up the PayHero SERVICE wallet via M-Pesa STK push. PayHero deducts
 * per-transaction fees from this wallet, so it must stay funded for STK
 * pushes to customer phones to work.
 */
export async function POST(request: NextRequest) {
  const rl = rateLimit(request, { limit: 5, windowSeconds: 60 })
  if (!rl.success) return rateLimitResponse()

  const auth = await requireAuth()
  if (!auth.authenticated) return auth.response!

  const env = getPayHeroEnv()
  if (!env) {
    return NextResponse.json({ error: "PayHero is not configured" }, { status: 503 })
  }

  try {
    const body = await request.json()
    const amount = Math.round(Number(body.amount) || 0)
    const phone = sanitize(body.phone || "", 20)

    if (!Number.isFinite(amount) || amount < 1) {
      return NextResponse.json({ error: "Amount must be at least KSh 1" }, { status: 400 })
    }
    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: "Invalid Kenyan phone number" }, { status: 400 })
    }

    const res = await fetch(`${PAYHERO_BASE}/topup?wallet_type=service_wallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: env.authHeader,
      },
      body: JSON.stringify({
        amount,
        phone_number: normalizePhone(phone),
      }),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      const msg =
        (data as Record<string, unknown>)?.error_message ||
        (data as Record<string, unknown>)?.message ||
        (data as Record<string, unknown>)?.error ||
        `PayHero responded with HTTP ${res.status}`
      return NextResponse.json({ error: String(msg), raw: data }, { status: 502 })
    }

    const obj = data as Record<string, unknown>
    if (obj.success === false) {
      const msg = obj.error_message || obj.message || obj.error || "PayHero rejected the top-up"
      return NextResponse.json({ error: String(msg), raw: data }, { status: 502 })
    }

    return NextResponse.json({
      success: true,
      status: obj.status,
      reference: obj.reference,
      checkoutRequestId: obj.CheckoutRequestID,
    })
  } catch (error) {
    console.error("[payhero] topup error:", error)
    return NextResponse.json({ error: "Failed to initiate wallet top-up" }, { status: 500 })
  }
}
