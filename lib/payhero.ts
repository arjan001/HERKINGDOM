/**
 * PayHero Kenya integration helpers.
 * Docs: https://docs.payhero.co.ke
 *
 * Auth: PayHero uses HTTP Basic auth. Either supply the pre-computed token or
 * the raw username/password pair and we derive the header:
 *   Authorization: Basic base64(USERNAME:PASSWORD)
 *
 * Env vars (add to Netlify > Site > Environment):
 *   PAYHERO_BASIC_AUTH_TOKEN - Pre-computed Basic auth value. Accepts either the
 *                              bare base64 string or the full "Basic xxx" header.
 *                              Takes precedence over username/password when set.
 *   PAYHERO_API_USERNAME     - API username issued by PayHero (used when token
 *                              is not provided)
 *   PAYHERO_API_PASSWORD     - API password issued by PayHero (used when token
 *                              is not provided)
 *   PAYHERO_CHANNEL_ID       - Numeric payment channel ID (Payment Channels >
 *                              My Payment Channels)
 *   PAYHERO_WALLET_ID        - Wallet payment channel ID used to read the
 *                              payments wallet balance
 *                              (GET /api/v2/payment_channels/{id}). Falls
 *                              back to PAYHERO_CHANNEL_ID when unset.
 *   PAYHERO_CALLBACK_URL     - (Optional) Full public URL PayHero posts the STK
 *                              callback to. When unset, the callback URL is
 *                              derived from NEXT_PUBLIC_SITE_URL / URL /
 *                              DEPLOY_PRIME_URL + /api/payments/payhero/callback.
 */

const CALLBACK_PATH = "/api/payments/payhero/callback"

/** Resolve the public callback URL from explicit env or the site's base URL. */
export function resolvePayHeroCallbackUrl(): string | null {
  const explicit = process.env.PAYHERO_CALLBACK_URL?.trim()
  if (explicit) return explicit

  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    ""
  ).trim()
  if (!base) return null

  const normalised = base.replace(/\/+$/, "")
  return `${normalised}${CALLBACK_PATH}`
}

const PAYHERO_BASE = "https://backend.payhero.co.ke/api/v2"

export interface PayHeroEnv {
  username?: string
  password?: string
  channelId: number
  walletId?: number
  callbackUrl: string
  authHeader: string
}

function buildAuthHeader(): string | null {
  const rawToken = process.env.PAYHERO_BASIC_AUTH_TOKEN?.trim()
  if (rawToken) {
    return rawToken.toLowerCase().startsWith("basic ") ? rawToken : `Basic ${rawToken}`
  }

  const username = process.env.PAYHERO_API_USERNAME
  const password = process.env.PAYHERO_API_PASSWORD
  if (!username || !password) return null

  const token = Buffer.from(`${username}:${password}`).toString("base64")
  return `Basic ${token}`
}

export function getPayHeroEnv(): PayHeroEnv | null {
  const channelIdRaw = process.env.PAYHERO_CHANNEL_ID
  const walletIdRaw = process.env.PAYHERO_WALLET_ID
  const callbackUrl = resolvePayHeroCallbackUrl()

  const authHeader = buildAuthHeader()
  if (!authHeader || !channelIdRaw || !callbackUrl) return null

  const channelId = Number(channelIdRaw)
  if (!Number.isFinite(channelId)) return null
  const walletId = walletIdRaw ? Number(walletIdRaw) : undefined

  return {
    username: process.env.PAYHERO_API_USERNAME,
    password: process.env.PAYHERO_API_PASSWORD,
    channelId,
    walletId: Number.isFinite(walletId) ? walletId : undefined,
    callbackUrl,
    authHeader,
  }
}

/** Normalise a Kenyan phone number to the 2547XXXXXXXX / 2541XXXXXXXX form PayHero accepts. */
export function normalizePhone(input: string): string {
  const cleaned = (input || "").replace(/[\s\-()+]/g, "")
  if (/^254\d{9}$/.test(cleaned)) return cleaned
  if (/^0\d{9}$/.test(cleaned)) return "254" + cleaned.slice(1)
  if (/^7\d{8}$/.test(cleaned) || /^1\d{8}$/.test(cleaned)) return "254" + cleaned
  return cleaned
}

export interface StkPushInput {
  amount: number
  phone: string
  externalReference: string
  customerName?: string
}

export interface StkPushResult {
  success: boolean
  status?: string
  reference?: string
  checkoutRequestId?: string
  raw: unknown
  error?: string
}

/** Initiate a PayHero M-Pesa STK push. Returns the CheckoutRequestID for polling. */
export async function initiateStkPush(env: PayHeroEnv, input: StkPushInput): Promise<StkPushResult> {
  const normalizedPhone = normalizePhone(input.phone)
  // PayHero's backend occasionally returns "sql: no rows in result set" when a
  // required field (most commonly customer_name) is missing — their downstream
  // lookup blows up on the empty value. Guarantee every field is present so
  // their validation never has to guess.
  const payload = {
    amount: Math.max(1, Math.round(input.amount)),
    phone_number: normalizedPhone,
    channel_id: Number(env.channelId),
    provider: "m-pesa",
    external_reference: input.externalReference,
    customer_name: (input.customerName && input.customerName.trim()) || `Customer ${normalizedPhone.slice(-4)}`,
    callback_url: env.callbackUrl,
  }

  try {
    const res = await fetch(`${PAYHERO_BASE}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: env.authHeader,
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json().catch(() => ({}))
    const obj = (data && typeof data === "object") ? (data as Record<string, unknown>) : {}

    const extractError = (): string | undefined => {
      const candidates = [
        obj.error_message,
        obj.message,
        obj.error,
        (obj.data as Record<string, unknown> | undefined)?.error_message,
        (obj.data as Record<string, unknown> | undefined)?.message,
        (obj.response as Record<string, unknown> | undefined)?.error_message,
        (obj.response as Record<string, unknown> | undefined)?.ResultDesc,
      ]
      for (const c of candidates) {
        if (typeof c === "string" && c.trim()) return c.trim()
      }
      return undefined
    }

    if (!res.ok) {
      return {
        success: false,
        raw: data,
        error: extractError() || `PayHero responded with HTTP ${res.status}`,
      }
    }

    // Some PayHero errors come back as HTTP 200 with { success: false, error: "..." }.
    // The classic offender is "sql: no rows in result set" — bubble that up to
    // the caller instead of pretending it succeeded.
    const succeeded = Boolean(obj.success)
    if (!succeeded) {
      const err = extractError()
      return {
        success: false,
        raw: data,
        error: err
          ? (err.toLowerCase().includes("sql: no rows in result set")
              ? "PayHero could not find a matching payment channel — check that PAYHERO_CHANNEL_ID matches an active channel in app.payhero.co.ke."
              : err)
          : "PayHero rejected the STK push",
      }
    }

    return {
      success: true,
      status: typeof obj.status === "string" ? obj.status : undefined,
      reference: typeof obj.reference === "string" ? obj.reference : undefined,
      checkoutRequestId: typeof obj.CheckoutRequestID === "string" ? obj.CheckoutRequestID : undefined,
      raw: data,
    }
  } catch (err) {
    return {
      success: false,
      raw: null,
      error: err instanceof Error ? err.message : "Network error contacting PayHero",
    }
  }
}

export interface TransactionStatusResult {
  status: string
  amount?: number
  mpesaReceipt?: string
  phone?: string
  externalReference?: string
  resultDesc?: string
  raw: unknown
}

/** Query the live status of a PayHero transaction by CheckoutRequestID or reference. */
export async function getTransactionStatus(env: PayHeroEnv, reference: string): Promise<TransactionStatusResult | null> {
  try {
    const url = `${PAYHERO_BASE}/transaction-status?reference=${encodeURIComponent(reference)}`
    const res = await fetch(url, {
      headers: { Authorization: env.authHeader },
    })
    const data = await res.json().catch(() => ({}))

    if (!res.ok) return null

    const response = (data.response || data.data || data) as Record<string, unknown>
    const status =
      (data.status as string) ||
      (response?.Status as string) ||
      (response?.status as string) ||
      "pending"

    return {
      status: String(status).toLowerCase(),
      amount: typeof response?.Amount === "number" ? (response.Amount as number) : undefined,
      mpesaReceipt: (response?.MpesaReceiptNumber as string) || undefined,
      phone: (response?.Phone as string) || undefined,
      externalReference: (response?.ExternalReference as string) || undefined,
      resultDesc: (response?.ResultDesc as string) || undefined,
      raw: data,
    }
  } catch {
    return null
  }
}

export interface WalletBalance {
  balance: number
  channelId?: number
  channelName?: string
  walletType?: "service_wallet" | "payment_wallet"
  raw: unknown
}

export interface WalletBalanceError {
  error: string
  status?: number
  raw?: unknown
}

export type WalletType = "service_wallet" | "payment_wallet"

function extractBalance(payload: unknown): number | null {
  if (!payload || typeof payload !== "object") return null
  const obj = payload as Record<string, unknown>

  // Try the many field names PayHero has used across doc versions.
  const candidates = [
    obj.service_wallet_balance,
    obj.payment_wallet_balance,
    obj.wallet_balance,
    obj.balance,
    obj.available_balance,
    obj.amount_available,
    (obj.data as Record<string, unknown> | undefined)?.balance,
    (obj.data as Record<string, unknown> | undefined)?.wallet_balance,
    (obj.wallet as Record<string, unknown> | undefined)?.balance,
    ((obj.balance_plain as Record<string, unknown> | undefined)?.balance),
  ]

  for (const raw of candidates) {
    if (raw == null) continue
    const n = typeof raw === "number" ? raw : Number(raw)
    if (Number.isFinite(n)) return n
  }
  return null
}

/**
 * Read a wallet balance from PayHero.
 *
 * PayHero exposes two distinct endpoints (docs.payhero.co.ke):
 *   - Service wallet — funds STK-push fees are deducted from:
 *       GET /api/v2/wallets?wallet_type=service_wallet
 *     Response carries `available_balance`.
 *   - Payments wallet — customer payments available to withdraw. The
 *     `wallets?wallet_type=payment_wallet` variant is NOT a valid endpoint
 *     and returns "wallet not found"; the balance lives on the wallet
 *     payment channel itself:
 *       GET /api/v2/payment_channels/{wallet_channel_id}
 *     Response carries `balance_plain.balance`. `wallet_channel_id` comes
 *     from PAYHERO_WALLET_ID (fall back to PAYHERO_CHANNEL_ID).
 *
 * On non-2xx responses we return a `WalletBalanceError` so callers can
 * forward the actionable PayHero error text to the admin UI.
 */
export async function getWalletBalance(
  env: PayHeroEnv,
  walletType: WalletType = "service_wallet",
): Promise<WalletBalance | WalletBalanceError> {
  let url: string
  if (walletType === "service_wallet") {
    url = `${PAYHERO_BASE}/wallets?wallet_type=service_wallet`
  } else {
    const channelId = env.walletId ?? env.channelId
    if (!Number.isFinite(channelId)) {
      return {
        error:
          "PAYHERO_WALLET_ID is not set. Add the wallet payment channel ID from app.payhero.co.ke > Payment Channels to read your payments wallet balance.",
      }
    }
    url = `${PAYHERO_BASE}/payment_channels/${encodeURIComponent(String(channelId))}`
  }

  try {
    const res = await fetch(url, { headers: { Authorization: env.authHeader } })
    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      const msg =
        (data && typeof data === "object" &&
          ((data as Record<string, unknown>).error_message ||
            (data as Record<string, unknown>).message ||
            (data as Record<string, unknown>).error)) ||
        `PayHero responded with HTTP ${res.status}`
      return { error: String(msg), status: res.status, raw: data }
    }

    const balance = extractBalance(data)
    if (balance == null) {
      return {
        error: "PayHero returned an unexpected wallet response",
        status: res.status,
        raw: data,
      }
    }

    return {
      balance,
      walletType,
      raw: data,
    }
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Network error contacting PayHero",
    }
  }
}

export function isWalletBalance(
  v: WalletBalance | WalletBalanceError,
): v is WalletBalance {
  return typeof (v as WalletBalance).balance === "number"
}
