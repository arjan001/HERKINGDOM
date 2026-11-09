import { createAdminClient } from "@/lib/supabase/admin"

// Analytics storage backed by Supabase (replaces @netlify/blobs which only
// works on Netlify). Uses the service-role client since tracking endpoints
// run server-side and tables are not publicly writable.

function db() {
  return createAdminClient()
}

// ---- Page Views ----

export interface PageView {
  id: string
  page_path: string
  referrer: string
  user_agent: string
  country: string
  country_name: string
  city: string
  region: string
  device_type: string
  browser: string
  session_id: string
  is_bot: boolean
  ip_address: string
  duration_seconds: number
  scroll_depth: number
  visitor_id: string
  is_returning: boolean
  language: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  created_at: string
}

function isRecent(createdAt: string, windowMs: number): boolean {
  const ts = new Date(createdAt).getTime()
  if (Number.isNaN(ts)) return false
  return Date.now() - ts <= windowMs
}

const VIEW_DEDUP_WINDOW_MS = 30 * 60 * 1000
const EVENT_DEDUP_WINDOW_MS = 10 * 1000

function sameVisitor(view: PageView, incoming: Omit<PageView, "id" | "created_at">): boolean {
  if (incoming.session_id && view.session_id && incoming.session_id === view.session_id) return true
  if (incoming.visitor_id && view.visitor_id && incoming.visitor_id === view.visitor_id) return true
  if (incoming.ip_address && view.ip_address && incoming.ip_address === view.ip_address) return true
  return false
}

export async function addPageView(view: Omit<PageView, "id" | "created_at">): Promise<string> {
  const supabase = db()
  const cutoff = new Date(Date.now() - VIEW_DEDUP_WINDOW_MS).toISOString()

  // Dedup: same visitor + same page within the window -> merge into existing row
  let q = supabase
    .from("page_views")
    .select("*")
    .eq("page_path", view.page_path)
    .gte("created_at", cutoff)
    .order("created_at", { ascending: false })
    .limit(20)

  const { data: candidates } = await q
  const match = (candidates || []).find((c: PageView) => sameVisitor(c, view))
  if (match) {
    await supabase
      .from("page_views")
      .update({
        referrer: match.referrer || view.referrer,
        country: match.country || view.country,
        country_name: match.country_name || view.country_name,
        city: match.city || view.city,
        region: match.region || view.region,
        user_agent: match.user_agent || view.user_agent,
        device_type: match.device_type || view.device_type,
        browser: match.browser || view.browser,
        is_bot: match.is_bot || view.is_bot,
        ip_address: match.ip_address || view.ip_address,
      })
      .eq("id", match.id)
    return match.id
  }

  const { data, error } = await supabase
    .from("page_views")
    .insert({ ...view, created_at: new Date().toISOString() })
    .select("id")
    .single()
  if (error) throw error
  return data.id
}

export async function updatePageView(sessionId: string, path: string, duration: number, scrollDepth: number): Promise<void> {
  const supabase = db()
  const { data } = await supabase
    .from("page_views")
    .select("id")
    .eq("session_id", sessionId)
    .eq("page_path", path)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()
  if (data?.id) {
    await supabase
      .from("page_views")
      .update({ duration_seconds: duration, scroll_depth: scrollDepth })
      .eq("id", data.id)
  }
}

export async function getPageViews(days: number): Promise<PageView[]> {
  const supabase = db()
  const since = new Date()
  since.setDate(since.getDate() - days)
  const { data } = await supabase
    .from("page_views")
    .select("*")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: false })
    .limit(50000)
  return (data as PageView[]) || []
}

export async function getRecentPageViews(minutes: number): Promise<PageView[]> {
  const supabase = db()
  const cutoff = new Date(Date.now() - minutes * 60 * 1000).toISOString()
  const { data } = await supabase
    .from("page_views")
    .select("*")
    .gte("created_at", cutoff)
  return (data as PageView[]) || []
}

// ---- Analytics Events ----

export interface AnalyticsEvent {
  id: string
  event_type: string
  event_target: string
  event_data: Record<string, unknown>
  page_path: string
  session_id: string
  device_type: string
  browser: string
  country: string
  country_name: string
  city: string
  region: string
  is_bot: boolean
  bot_reason: string
  ip_address: string
  created_at: string
}

export async function addEvent(event: Omit<AnalyticsEvent, "id" | "created_at">): Promise<void> {
  const supabase = db()
  const cutoff = new Date(Date.now() - EVENT_DEDUP_WINDOW_MS).toISOString()

  let q = supabase
    .from("analytics_events")
    .select("id")
    .eq("event_type", event.event_type)
    .eq("event_target", event.event_target)
    .eq("page_path", event.page_path)
    .gte("created_at", cutoff)
    .limit(20)
  if (event.session_id) q = q.eq("session_id", event.session_id)
  else if (event.ip_address) q = q.eq("ip_address", event.ip_address)

  const { data: dup } = await q
  if (dup && dup.length > 0) return

  const { error } = await supabase.from("analytics_events").insert({
    ...event,
    event_data: event.event_data || {},
    created_at: new Date().toISOString(),
  })
  if (error) console.error("addEvent failed:", error.message)
}

export async function getEvents(days: number): Promise<AnalyticsEvent[]> {
  const supabase = db()
  const since = new Date()
  since.setDate(since.getDate() - days)
  const { data } = await supabase
    .from("analytics_events")
    .select("*")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: false })
    .limit(50000)
  return (data as AnalyticsEvent[]) || []
}

// ---- Abandoned Checkouts ----

export interface AbandonedCheckout {
  id: string
  session_id: string
  customer_name: string
  customer_phone: string
  customer_email: string
  items: unknown[]
  subtotal: number
  step_reached: string
  reason: string
  device_type: string
  browser: string
  recovered: boolean
  created_at: string
  updated_at: string
}

export async function upsertCheckout(sessionId: string, data: Partial<AbandonedCheckout>): Promise<void> {
  const supabase = db()
  const { data: existing } = await supabase
    .from("abandoned_checkouts")
    .select("id")
    .eq("session_id", sessionId)
    .maybeSingle()

  if (existing?.id) {
    await supabase
      .from("abandoned_checkouts")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", existing.id)
  } else {
    await supabase.from("abandoned_checkouts").insert({
      id: crypto.randomUUID(),
      session_id: sessionId,
      recovered: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...data,
    })
  }
}

export async function recoverCheckout(sessionId: string): Promise<void> {
  const supabase = db()
  await supabase
    .from("abandoned_checkouts")
    .update({ recovered: true, updated_at: new Date().toISOString() })
    .eq("session_id", sessionId)
}

export async function getAbandonedCheckouts(days: number): Promise<AbandonedCheckout[]> {
  const supabase = db()
  const since = new Date()
  since.setDate(since.getDate() - days)
  const { data } = await supabase
    .from("abandoned_checkouts")
    .select("*")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: false })
    .limit(5000)
  return (data as AbandonedCheckout[]) || []
}

// ---- Realtime Sessions (live users) ----

export async function touchSession(sessionId: string, pagePath = ""): Promise<void> {
  if (!sessionId) return
  const supabase = db()
  const now = new Date().toISOString()
  const { data: existing } = await supabase
    .from("analytics_sessions")
    .select("session_id")
    .eq("session_id", sessionId)
    .maybeSingle()

  if (existing) {
    await supabase
      .from("analytics_sessions")
      .update({ last_seen: now, page_path: pagePath || undefined })
      .eq("session_id", sessionId)
  } else {
    await supabase.from("analytics_sessions").insert({
      session_id: sessionId,
      last_seen: now,
      page_path: pagePath || null,
    })
  }

  // Opportunistic cleanup of stale sessions (>24h) - cheap, keeps table small
  const stale = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  supabase.from("analytics_sessions").delete().lt("last_seen", stale).then(() => {})
}

export async function getActiveSessions(minutes: number = 5): Promise<number> {
  const supabase = db()
  const cutoff = new Date(Date.now() - minutes * 60 * 1000).toISOString()
  const { count } = await supabase
    .from("analytics_sessions")
    .select("session_id", { count: "exact", head: true })
    .gte("last_seen", cutoff)
  return count || 0
}

// ---- Geo helpers ----

export interface GeoData {
  country: string
  countryName: string
  city: string
  region: string
  latitude: number
  longitude: number
  timezone: string
}

export function parseNetlifyGeo(headers: Headers): GeoData {
  const geo: GeoData = {
    country: "",
    countryName: "",
    city: "",
    region: "",
    latitude: 0,
    longitude: 0,
    timezone: "",
  }

  const nfGeo = headers.get("x-nf-geo")
  if (nfGeo) {
    try {
      const parsed = JSON.parse(nfGeo)
      geo.country = parsed?.country?.code || ""
      geo.countryName = parsed?.country?.name || ""
      geo.city = parsed?.city || ""
      geo.region = parsed?.subdivision?.name || ""
      geo.latitude = parsed?.latitude || 0
      geo.longitude = parsed?.longitude || 0
      geo.timezone = parsed?.timezone || ""
    } catch {
      // ignore
    }
  }

  if (!geo.country) {
    geo.country = headers.get("x-country") || headers.get("x-vercel-ip-country") || ""
  }

  return geo
}

export function getClientIP(headers: Headers): string {
  return (
    headers.get("x-nf-client-connection-ip") ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    ""
  )
}

// Country code to name map for dashboard display
const COUNTRY_NAMES: Record<string, string> = {
  AF: "Afghanistan", AL: "Albania", DZ: "Algeria", AO: "Angola", AR: "Argentina",
  AT: "Austria", AU: "Australia", BD: "Bangladesh", BE: "Belgium", BR: "Brazil",
  CA: "Canada", CH: "Switzerland", CL: "Chile", CM: "Cameroon", CN: "China",
  CO: "Colombia", CZ: "Czech Republic", DE: "Germany", DK: "Denmark", EG: "Egypt",
  ES: "Spain", ET: "Ethiopia", FI: "Finland", FR: "France", GB: "United Kingdom",
  GH: "Ghana", GR: "Greece", HK: "Hong Kong", HU: "Hungary", ID: "Indonesia",
  IE: "Ireland", IL: "Israel", IN: "India", IQ: "Iraq", IR: "Iran", IT: "Italy",
  JP: "Japan", KE: "Kenya", KR: "South Korea", KW: "Kuwait", LK: "Sri Lanka",
  MA: "Morocco", MX: "Mexico", MY: "Malaysia", NG: "Nigeria", NL: "Netherlands",
  NO: "Norway", NZ: "New Zealand", PE: "Peru", PH: "Philippines", PK: "Pakistan",
  PL: "Poland", PT: "Portugal", QA: "Qatar", RO: "Romania", RU: "Russia",
  RW: "Rwanda", SA: "Saudi Arabia", SE: "Sweden", SG: "Singapore", TH: "Thailand",
  TN: "Tunisia", TR: "Turkey", TW: "Taiwan", TZ: "Tanzania", UA: "Ukraine",
  UG: "Uganda", US: "United States", VN: "Vietnam", ZA: "South Africa", ZM: "Zambia",
  ZW: "Zimbabwe", AE: "UAE", BW: "Botswana", CD: "DR Congo", CI: "Ivory Coast",
  DJ: "Djibouti", ER: "Eritrea", GA: "Gabon", GM: "Gambia", GN: "Guinea",
  GQ: "Equatorial Guinea", LS: "Lesotho", LR: "Liberia", LY: "Libya", MG: "Madagascar",
  ML: "Mali", MU: "Mauritius", MW: "Malawi", MZ: "Mozambique", NA: "Namibia",
  NE: "Niger", SC: "Seychelles", SD: "Sudan", SL: "Sierra Leone", SN: "Senegal",
  SO: "Somalia", SS: "South Sudan", SZ: "Eswatini", TD: "Chad", TG: "Togo",
}

export function countryCodeToName(code: string): string {
  return COUNTRY_NAMES[code.toUpperCase()] || code
}
