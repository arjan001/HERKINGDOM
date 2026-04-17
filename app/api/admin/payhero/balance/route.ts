import { NextRequest, NextResponse } from "next/server"
import { rateLimit, rateLimitResponse, requireAuth } from "@/lib/security"
import { getPayHeroEnv, getWalletBalance } from "@/lib/payhero"

/**
 * GET /api/admin/payhero/balance
 * Returns the PayHero payment-channel (wallet) balance for the configured
 * channel, so the admin dashboard can show cash available for withdrawal.
 *
 * Admin-only. Uses PAYHERO_WALLET_ID when set, otherwise falls back to
 * PAYHERO_CHANNEL_ID.
 */
export async function GET(request: NextRequest) {
  const rl = rateLimit(request, { limit: 30, windowSeconds: 60 })
  if (!rl.success) return rateLimitResponse()

  const auth = await requireAuth()
  if (!auth.authenticated) return auth.response!

  const env = getPayHeroEnv()
  if (!env) {
    return NextResponse.json(
      { configured: false, error: "PayHero not configured" },
      { status: 200 },
    )
  }

  const balance = await getWalletBalance(env)
  if (!balance) {
    return NextResponse.json(
      { configured: true, error: "Failed to read wallet balance from PayHero" },
      { status: 502 },
    )
  }

  return NextResponse.json({
    configured: true,
    balance: balance.balance,
    currency: "KES",
    channelId: balance.channelId,
    channelName: balance.channelName,
  })
}
