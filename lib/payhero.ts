/**
 * PayHero Kenya integration helpers.
 * Docs: https://docs.payhero.co.ke
 *
 * Auth: PayHero uses HTTP Basic auth. The header is derived from the
 * API username and password provided in your PayHero dashboard:
 *   Authorization: Basic base64(USERNAME:PASSWORD)
 *
 * Env vars required (add to Netlify > Site > Environment):
 *   PAYHERO_API_USERNAME  - API username issued by PayHero
 *   PAYHERO_API_PASSWORD  - API password issued by PayHero
 *   PAYHERO_CHANNEL_ID    - Numeric payment channel ID (Payment Channels > My Payment Channels)
 *   PAYHERO_WALLET_ID     - (Optional) Payment channel ID used for balance queries
 *   PAYHERO_CALLBACK_URL  - Public URL PayHero posts the STK callback to
 *                           e.g. https://your-site.netlify.app/api/payments/payhero/callback
 */

const PAYHERO_BASE = "https://backend.payhero.co.ke/api/v2"

export interface PayHeroEnv {
  username: string
  password: string
  channelId: number
  walletId?: number
  callbackUrl: string
  authHeader: string
}

export function getPayHeroEnv(): PayHeroEnv | null {
  const username = process.env.PAYHERO_API_USERNAME
  const password = process.env.PAYHERO_API_PASSWORD
  const channelIdRaw = process.env.PAYHERO_CHANNEL_ID
  const walletIdRaw = process.env.PAYHERO_WALLET_ID
  const callbackUrl = process.env.PAYHERO_CALLBACK_URL

  if (!username || !password || !channelIdRaw || !callbackUrl) return null

  const channelId = Number(channelIdRaw)
  if (!Number.isFinite(channelId)) return null
  const walletId = walletIdRaw ? Number(walletIdRaw) : undefined

  const token = Buffer.from(`${username}:${password}`).toString("base64")
  return {
    username,
    password,
    channelId,
    walletId: Number.isFinite(walletId) ? walletId : undefined,
    callbackUrl,
    authHeader: `Basic ${token}`,
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
  const payload = {
    amount: Math.round(input.amount),
    phone_number: normalizePhone(input.phone),
    channel_id: env.channelId,
    provider: "m-pesa",
    external_reference: input.externalReference,
    customer_name: input.customerName || undefined,
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

    if (!res.ok) {
      return {
        success: false,
        raw: data,
        error:
          (data && (data.error_message || data.message || data.error)) ||
          `PayHero responded with HTTP ${res.status}`,
      }
    }

    return {
      success: Boolean(data.success),
      status: data.status,
      reference: data.reference,
      checkoutRequestId: data.CheckoutRequestID,
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
  raw: unknown
}

/** Read the wallet (payment channel) balance from PayHero. */
export async function getWalletBalance(env: PayHeroEnv, walletId?: number): Promise<WalletBalance | null> {
  const id = walletId ?? env.walletId ?? env.channelId
  try {
    const res = await fetch(`${PAYHERO_BASE}/payment_channels/${id}`, {
      headers: { Authorization: env.authHeader },
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) return null

    const channel = (data.payment_channel || data.data || data) as Record<string, unknown>
    const balancePlain = channel?.balance_plain as Record<string, unknown> | undefined
    const balance =
      (typeof balancePlain?.balance === "number" ? (balancePlain.balance as number) : undefined) ??
      (typeof channel?.balance === "number" ? (channel.balance as number) : undefined) ??
      Number(balancePlain?.balance) ??
      0

    return {
      balance: Number.isFinite(balance) ? (balance as number) : 0,
      channelId: Number(channel?.id) || id,
      channelName: (channel?.name as string) || undefined,
      raw: data,
    }
  } catch {
    return null
  }
}
