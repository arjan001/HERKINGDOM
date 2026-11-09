import { NextRequest, NextResponse } from "next/server"
import { rateLimit, rateLimitResponse, requireAuth } from "@/lib/security"
import { getPayHeroEnv } from "@/lib/payhero"

const PAYHERO_BASE = "https://backend.payhero.co.ke/api/v2"
const MAX_PAGES = 5
const PER_PAGE = 50

export interface PayHeroAccountTransaction {
  id: number
  transaction_type: string
  transaction_name?: string
  description?: string
  amount: number
  cost?: number
  wallet_balance?: number
  transaction_reference?: string
  provider_reference?: string
  gateway?: string
  created_at: string
}

/**
 * GET /api/admin/payhero/transactions?page=1
 *
 * Consolidates the merchant's PayHero account transactions (service wallet
 * top-ups, STK fees, withdrawals, etc.) into one place for the admin UI.
 * Fetches up to MAX_PAGES pages from PayHero's paginated endpoint.
 */
export async function GET(request: NextRequest) {
  const rl = rateLimit(request, { limit: 20, windowSeconds: 60 })
  if (!rl.success) return rateLimitResponse()

  const auth = await requireAuth()
  if (!auth.authenticated) return auth.response!

  const env = getPayHeroEnv()
  if (!env) {
    return NextResponse.json({ configured: false, transactions: [] }, { status: 200 })
  }

  const pageParam = Number(new URL(request.url).searchParams.get("page") || "1")
  const startPage = Number.isFinite(pageParam) && pageParam > 0 ? Math.floor(pageParam) : 1

  try {
    const all: PayHeroAccountTransaction[] = []
    let page = startPage
    let numPages = startPage
    let count = 0

    // Page forward up to MAX_PAGES so the admin sees a consolidated feed
    // without hammering PayHero on every request.
    while (page <= numPages && page < startPage + MAX_PAGES) {
      const res = await fetch(`${PAYHERO_BASE}/transactions?page=${page}&per=${PER_PAGE}`, {
        headers: { Authorization: env.authHeader },
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        return NextResponse.json(
          { configured: true, error: `PayHero responded with HTTP ${res.status}`, transactions: all },
          { status: 502 },
        )
      }

      const txns = Array.isArray((data as Record<string, unknown>).transactions)
        ? ((data as Record<string, unknown>).transactions as PayHeroAccountTransaction[])
        : []
      const pagination = (data as Record<string, unknown>).pagination as
        | { num_pages?: number; count?: number }
        | undefined

      all.push(...txns)
      numPages = pagination?.num_pages ?? page
      count = pagination?.count ?? all.length
      page += 1
      if (txns.length === 0) break
    }

    return NextResponse.json({
      configured: true,
      transactions: all,
      pagination: { count, page: startPage, fetched: all.length, hasMore: page <= numPages },
    })
  } catch (error) {
    console.error("[payhero] transactions error:", error)
    return NextResponse.json({ error: "Failed to fetch PayHero transactions" }, { status: 500 })
  }
}
