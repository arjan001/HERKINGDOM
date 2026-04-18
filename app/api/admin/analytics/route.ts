import { NextRequest, NextResponse } from "next/server"
import { getPageViews, getEvents, getAbandonedCheckouts, getRecentPageViews, countryCodeToName } from "@/lib/analytics-store"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const days = parseInt(searchParams.get("days") || "30")

  // Fetch analytics data from Netlify Blobs
  const [views, allEvents, abandoned] = await Promise.all([
    getPageViews(days),
    getEvents(days),
    getAbandonedCheckouts(days),
  ])

  // Try to get orders from Supabase (graceful fallback if unavailable)
  let orders: { id: string; total: number; status: string; created_at: string }[] = []
  let prevOrders: { id: string; total: number }[] = []
  let prevViewCount = 0

  try {
    const { createAdminClient } = await import("@/lib/supabase/admin")
    const supabase = createAdminClient()

    const since = new Date()
    since.setDate(since.getDate() - days)
    const sinceISO = since.toISOString()
    const prevSince = new Date()
    prevSince.setDate(prevSince.getDate() - days * 2)
    const prevSinceISO = prevSince.toISOString()

    const [ordersRes, prevOrdersRes] = await Promise.all([
      supabase.from("orders").select("id, total, status, created_at").gte("created_at", sinceISO).order("created_at", { ascending: false }),
      supabase.from("orders").select("id, total").gte("created_at", prevSinceISO).lt("created_at", sinceISO),
    ])

    orders = ordersRes.data || []
    prevOrders = prevOrdersRes.data || []
  } catch {
    // Supabase unavailable - orders will be empty
  }

  // Calculate previous period view count from blobs
  const prevPeriodViews = await getPageViews(days * 2)
  const since = new Date()
  since.setDate(since.getDate() - days)
  prevViewCount = prevPeriodViews.filter(v => new Date(v.created_at) < since).length

  const totalViews = views.length
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0)
  const prevOrderCount = prevOrders.length
  const prevRevenue = prevOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0)

  // Separate human vs bot views
  const humanViews = views.filter(v => !v.is_bot)
  const botViews = views.filter(v => v.is_bot)
  const humanViewCount = humanViews.length
  const botViewCount = botViews.length

  // Unique sessions (human only)
  const uniqueSessions = new Set(humanViews.map(v => v.session_id).filter(Boolean)).size

  // Average session duration (human only, views with duration > 0)
  const viewsWithDuration = humanViews.filter(v => v.duration_seconds && v.duration_seconds > 0)
  const avgDuration = viewsWithDuration.length > 0
    ? Math.round(viewsWithDuration.reduce((sum, v) => sum + v.duration_seconds, 0) / viewsWithDuration.length)
    : 0

  // Average scroll depth (human only)
  const viewsWithScroll = humanViews.filter(v => v.scroll_depth && v.scroll_depth > 0)
  const avgScrollDepth = viewsWithScroll.length > 0
    ? Math.round(viewsWithScroll.reduce((sum, v) => sum + v.scroll_depth, 0) / viewsWithScroll.length)
    : 0

  // Bounce rate: sessions with only 1 page view / total sessions
  const sessionPageCounts: Record<string, number> = {}
  humanViews.forEach(v => {
    if (v.session_id) sessionPageCounts[v.session_id] = (sessionPageCounts[v.session_id] || 0) + 1
  })
  const totalSessions = Object.keys(sessionPageCounts).length || 1
  const bounceSessions = Object.values(sessionPageCounts).filter(c => c === 1).length
  const bounceRate = Math.round((bounceSessions / totalSessions) * 100)

  // Sales by day
  const salesByDay: Record<string, { orders: number; revenue: number }> = {}
  orders.forEach((o) => {
    const day = new Date(o.created_at).toISOString().split("T")[0]
    if (!salesByDay[day]) salesByDay[day] = { orders: 0, revenue: 0 }
    salesByDay[day].orders++
    salesByDay[day].revenue += Number(o.total) || 0
  })
  const salesTimeline: { date: string; orders: number; revenue: number }[] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().split("T")[0]
    salesTimeline.push({ date: key, orders: salesByDay[key]?.orders || 0, revenue: salesByDay[key]?.revenue || 0 })
  }

  // Views by page (human only)
  const pageMap: Record<string, number> = {}
  humanViews.forEach((v) => { pageMap[v.page_path] = (pageMap[v.page_path] || 0) + 1 })
  const topPages = Object.entries(pageMap)
    .map(([page, count]) => ({ page, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15)

  // Page retention: avg duration per page
  const pageDuration: Record<string, { total: number; count: number }> = {}
  viewsWithDuration.forEach(v => {
    if (!pageDuration[v.page_path]) pageDuration[v.page_path] = { total: 0, count: 0 }
    pageDuration[v.page_path].total += v.duration_seconds
    pageDuration[v.page_path].count++
  })
  const pageRetention = Object.entries(pageDuration)
    .map(([page, d]) => ({ page, avgDuration: Math.round(d.total / d.count), views: d.count }))
    .sort((a, b) => b.avgDuration - a.avgDuration)
    .slice(0, 15)

  // Views by day
  const dayMap: Record<string, { total: number; human: number; bot: number }> = {}
  views.forEach((v) => {
    const day = new Date(v.created_at).toISOString().split("T")[0]
    if (!dayMap[day]) dayMap[day] = { total: 0, human: 0, bot: 0 }
    dayMap[day].total++
    if (v.is_bot) dayMap[day].bot++
    else dayMap[day].human++
  })
  const viewsByDay: { date: string; count: number; human: number; bot: number }[] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().split("T")[0]
    viewsByDay.push({
      date: key,
      count: dayMap[key]?.total || 0,
      human: dayMap[key]?.human || 0,
      bot: dayMap[key]?.bot || 0,
    })
  }

  // Device breakdown (human only)
  const deviceMap: Record<string, number> = {}
  humanViews.forEach((v) => {
    const d = v.device_type || "desktop"
    deviceMap[d] = (deviceMap[d] || 0) + 1
  })
  const devices = Object.entries(deviceMap).map(([device, count]) => ({
    device, count, percentage: Math.round((count / Math.max(humanViewCount, 1)) * 100)
  }))

  // Browser breakdown (human only)
  const browserMap: Record<string, number> = {}
  humanViews.forEach((v) => { browserMap[v.browser || "Unknown"] = (browserMap[v.browser || "Unknown"] || 0) + 1 })
  const browsers = Object.entries(browserMap)
    .map(([browser, count]) => ({ browser, count, percentage: Math.round((count / Math.max(humanViewCount, 1)) * 100) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Country breakdown (human only) - now with full country names, city, and region
  const countryMap: Record<string, { count: number; name: string; cities: Record<string, number> }> = {}
  humanViews.forEach((v) => {
    if (v.country) {
      if (!countryMap[v.country]) {
        countryMap[v.country] = { count: 0, name: v.country_name || countryCodeToName(v.country), cities: {} }
      }
      countryMap[v.country].count++
      if (v.city) {
        countryMap[v.country].cities[v.city] = (countryMap[v.country].cities[v.city] || 0) + 1
      }
    }
  })
  const countries = Object.entries(countryMap)
    .map(([country, data]) => ({
      country,
      countryName: data.name,
      count: data.count,
      percentage: Math.round((data.count / Math.max(humanViewCount, 1)) * 100),
      topCities: Object.entries(data.cities)
        .map(([city, count]) => ({ city, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)

  // Top referrers (human only)
  const refMap: Record<string, number> = {}
  humanViews.forEach((v) => {
    if (v.referrer) {
      try { refMap[new URL(v.referrer).hostname] = (refMap[new URL(v.referrer).hostname] || 0) + 1 } catch { /* ignore */ }
    } else {
      refMap["Direct"] = (refMap["Direct"] || 0) + 1
    }
  })
  const referrers = Object.entries(refMap)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // Click events summary
  const clickEvents = allEvents.filter(e => e.event_type === "click" && !e.is_bot)
  const totalClicks = clickEvents.length

  const clickTargetMap: Record<string, number> = {}
  clickEvents.forEach(e => {
    const target = e.event_target || "Unknown"
    clickTargetMap[target] = (clickTargetMap[target] || 0) + 1
  })
  const topClicks = Object.entries(clickTargetMap)
    .map(([target, count]) => ({ target, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)

  const clickPageMap: Record<string, number> = {}
  clickEvents.forEach(e => {
    clickPageMap[e.page_path || "/"] = (clickPageMap[e.page_path || "/"] || 0) + 1
  })
  const clicksByPage = Object.entries(clickPageMap)
    .map(([page, count]) => ({ page, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // Traffic Source Categorization
  const searchEngines = ["google", "bing", "yahoo", "duckduckgo", "baidu", "yandex", "ecosia", "brave"]
  const socialNetworks = ["facebook", "instagram", "tiktok", "twitter", "x.com", "linkedin", "pinterest", "reddit", "youtube", "snapchat", "whatsapp", "t.co"]
  const emailProviders = ["mail", "email", "outlook", "gmail", "newsletter"]

  function categorizeSource(referrer: string, utmMedium?: string, utmSource?: string): string {
    if (utmMedium) {
      const med = utmMedium.toLowerCase()
      if (med === "cpc" || med === "ppc" || med === "paid" || med === "paidsearch") return "Paid Search"
      if (med === "social" || med === "paid_social" || med === "paidsocial") return "Social"
      if (med === "email" || med === "e-mail") return "Email"
      if (med === "organic") return "Organic Search"
      if (med === "referral") return "Referral"
      if (med === "display" || med === "banner" || med === "cpm") return "Display"
      if (med === "affiliate") return "Affiliate"
    }
    if (utmSource) {
      const src = utmSource.toLowerCase()
      if (searchEngines.some(se => src.includes(se))) return "Organic Search"
      if (socialNetworks.some(sn => src.includes(sn))) return "Social"
      if (emailProviders.some(ep => src.includes(ep))) return "Email"
    }
    if (!referrer) return "Direct"
    try {
      const host = new URL(referrer).hostname.toLowerCase()
      if (searchEngines.some(se => host.includes(se))) return "Organic Search"
      if (socialNetworks.some(sn => host.includes(sn))) return "Social"
      if (emailProviders.some(ep => host.includes(ep))) return "Email"
      return "Referral"
    } catch {
      return "Direct"
    }
  }

  const sourceCategories: Record<string, number> = {}
  humanViews.forEach(v => {
    const cat = categorizeSource(v.referrer || "", v.utm_medium, v.utm_source)
    sourceCategories[cat] = (sourceCategories[cat] || 0) + 1
  })
  const trafficChannels = Object.entries(sourceCategories)
    .map(([channel, count]) => ({ channel, count, percentage: Math.round((count / Math.max(humanViewCount, 1)) * 100) }))
    .sort((a, b) => b.count - a.count)

  // New vs Returning Visitors
  const visitorMap: Record<string, boolean> = {}
  humanViews.forEach(v => {
    const vid = v.visitor_id || v.session_id
    if (vid && visitorMap[vid] === undefined) {
      visitorMap[vid] = v.is_returning === true
    }
  })
  const totalUniqueVisitors = Object.keys(visitorMap).length || 1
  const returningVisitors = Object.values(visitorMap).filter(r => r).length
  const newVisitors = totalUniqueVisitors - returningVisitors
  const newVsReturning = {
    new: newVisitors,
    returning: returningVisitors,
    newPercentage: Math.round((newVisitors / totalUniqueVisitors) * 100),
    returningPercentage: Math.round((returningVisitors / totalUniqueVisitors) * 100),
  }

  // UTM Campaign Data
  const campaignMap: Record<string, { views: number; source: string; medium: string }> = {}
  humanViews.forEach(v => {
    if (v.utm_campaign) {
      if (!campaignMap[v.utm_campaign]) {
        campaignMap[v.utm_campaign] = { views: 0, source: v.utm_source || "", medium: v.utm_medium || "" }
      }
      campaignMap[v.utm_campaign].views++
    }
  })
  const utmCampaigns = Object.entries(campaignMap)
    .map(([campaign, data]) => ({ campaign, views: data.views, source: data.source, medium: data.medium }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10)

  const utmEvents = allEvents.filter(e => e.event_type === "utm_landing" && !e.is_bot)
  const utmSourceMap: Record<string, number> = {}
  utmEvents.forEach(e => {
    const src = (e.event_data as Record<string, string>)?.utm_source || "unknown"
    utmSourceMap[src] = (utmSourceMap[src] || 0) + 1
  })
  const utmSources = Object.entries(utmSourceMap)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // Language Breakdown
  const langMap: Record<string, number> = {}
  humanViews.forEach(v => {
    if (v.language) {
      const lang = v.language.split("-")[0]
      langMap[lang] = (langMap[lang] || 0) + 1
    }
  })
  const languages = Object.entries(langMap)
    .map(([language, count]) => ({ language, count, percentage: Math.round((count / Math.max(humanViewCount, 1)) * 100) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // Abandoned checkouts summary
  const totalAbandoned = abandoned.length
  const recoveredCount = abandoned.filter(a => a.recovered).length
  const abandonedValue = abandoned.reduce((sum, a) => sum + (Number(a.subtotal) || 0), 0)
  const abandonedByStep: Record<string, number> = {}
  const abandonedByReason: Record<string, number> = {}
  abandoned.forEach(a => {
    abandonedByStep[a.step_reached || "cart"] = (abandonedByStep[a.step_reached || "cart"] || 0) + 1
    const reason = a.reason || "unknown"
    abandonedByReason[reason] = (abandonedByReason[reason] || 0) + 1
  })

  // ---- Search term analytics ----
  const searchEvents = allEvents.filter(e => e.event_type === "search" && !e.is_bot)
  const searchTermCounts: Record<string, { count: number; uniqueSessions: Set<string>; lastSeen: string }> = {}
  searchEvents.forEach(e => {
    const term = (e.event_target || "").trim().toLowerCase()
    if (!term) return
    if (!searchTermCounts[term]) {
      searchTermCounts[term] = { count: 0, uniqueSessions: new Set(), lastSeen: e.created_at }
    }
    searchTermCounts[term].count++
    if (e.session_id) searchTermCounts[term].uniqueSessions.add(e.session_id)
    if (e.created_at > searchTermCounts[term].lastSeen) searchTermCounts[term].lastSeen = e.created_at
  })
  const topSearches = Object.entries(searchTermCounts)
    .map(([term, data]) => ({
      term,
      count: data.count,
      uniqueVisitors: data.uniqueSessions.size,
      lastSeen: data.lastSeen,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)
  const totalSearches = searchEvents.length

  // Searches over time (last "days" buckets)
  const searchByDayMap: Record<string, number> = {}
  searchEvents.forEach(e => {
    const day = new Date(e.created_at).toISOString().split("T")[0]
    searchByDayMap[day] = (searchByDayMap[day] || 0) + 1
  })
  const searchesByDay: { date: string; count: number }[] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().split("T")[0]
    searchesByDay.push({ date: key, count: searchByDayMap[key] || 0 })
  }

  // ---- Live visitor heat map (last 15 minutes, human only) ----
  const liveWindowMinutes = 15
  const recentViews = await getRecentPageViews(liveWindowMinutes)
  const recentHumanViews = recentViews.filter(v => !v.is_bot)
  const liveCutoff = Date.now() - 5 * 60 * 1000
  const activeSessionIds = new Set<string>()
  const liveCellMap: Record<string, {
    country: string
    countryName: string
    region: string
    city: string
    sessions: Set<string>
    views: number
    latest: string
  }> = {}

  recentHumanViews.forEach(v => {
    if (new Date(v.created_at).getTime() >= liveCutoff && v.session_id) {
      activeSessionIds.add(v.session_id)
    }
    const country = v.country || "??"
    const city = v.city || "Unknown"
    const key = `${country}__${city}`
    if (!liveCellMap[key]) {
      liveCellMap[key] = {
        country,
        countryName: v.country_name || countryCodeToName(country),
        region: v.region || "",
        city,
        sessions: new Set(),
        views: 0,
        latest: v.created_at,
      }
    }
    liveCellMap[key].views++
    if (v.session_id) liveCellMap[key].sessions.add(v.session_id)
    if (v.created_at > liveCellMap[key].latest) liveCellMap[key].latest = v.created_at
  })

  const heatmapCells = Object.values(liveCellMap)
    .map(c => ({
      country: c.country,
      countryName: c.countryName,
      region: c.region,
      city: c.city,
      visitors: c.sessions.size || 1,
      views: c.views,
      latest: c.latest,
    }))
    .sort((a, b) => b.visitors - a.visitors || b.views - a.views)
    .slice(0, 25)

  const activeVisitors = activeSessionIds.size
  const liveByCountryMap: Record<string, { country: string; countryName: string; visitors: number }> = {}
  heatmapCells.forEach(cell => {
    if (!liveByCountryMap[cell.country]) {
      liveByCountryMap[cell.country] = { country: cell.country, countryName: cell.countryName, visitors: 0 }
    }
    liveByCountryMap[cell.country].visitors += cell.visitors
  })
  const liveByCountry = Object.values(liveByCountryMap).sort((a, b) => b.visitors - a.visitors).slice(0, 10)

  // Minute-by-minute active visitor trend for the last 15 minutes.
  const activityByMinute: { minute: string; visitors: number }[] = []
  for (let i = liveWindowMinutes - 1; i >= 0; i--) {
    const windowStart = Date.now() - (i + 1) * 60 * 1000
    const windowEnd = Date.now() - i * 60 * 1000
    const sessions = new Set<string>()
    recentHumanViews.forEach(v => {
      const ts = new Date(v.created_at).getTime()
      if (ts >= windowStart && ts < windowEnd && v.session_id) sessions.add(v.session_id)
    })
    const minuteLabel = new Date(windowEnd - 30 * 1000).toISOString().slice(11, 16)
    activityByMinute.push({ minute: minuteLabel, visitors: sessions.size })
  }

  // Pages currently being viewed (active within 5 minutes).
  const currentPageMap: Record<string, { views: number; sessions: Set<string> }> = {}
  recentHumanViews.forEach(v => {
    if (new Date(v.created_at).getTime() < liveCutoff) return
    const path = v.page_path || "/"
    if (!currentPageMap[path]) currentPageMap[path] = { views: 0, sessions: new Set() }
    currentPageMap[path].views++
    if (v.session_id) currentPageMap[path].sessions.add(v.session_id)
  })
  const currentlyViewing = Object.entries(currentPageMap)
    .map(([page, data]) => ({ page, views: data.views, visitors: data.sessions.size }))
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 10)

  return NextResponse.json({
    totalViews,
    humanViewCount,
    botViewCount,
    previousPeriodViews: prevViewCount,
    uniqueSessions,
    avgDuration,
    avgScrollDepth,
    bounceRate,
    totalOrders,
    totalRevenue,
    prevOrderCount,
    prevRevenue,
    topPages,
    pageRetention,
    viewsByDay,
    salesTimeline,
    devices,
    browsers,
    countries,
    referrers,
    totalClicks,
    topClicks,
    clicksByPage,
    botTraffic: {
      total: botViewCount,
      percentage: totalViews > 0 ? Math.round((botViewCount / totalViews) * 100) : 0,
    },
    abandonedCheckouts: {
      total: totalAbandoned,
      recovered: recoveredCount,
      value: abandonedValue,
      byStep: abandonedByStep,
      byReason: abandonedByReason,
      recent: abandoned.slice(0, 10).map(a => ({
        id: a.id,
        customerName: a.customer_name || "Anonymous",
        items: a.items,
        subtotal: a.subtotal,
        stepReached: a.step_reached,
        reason: a.reason || "",
        recovered: a.recovered,
        createdAt: a.created_at,
      })),
    },
    trafficChannels,
    newVsReturning,
    utmCampaigns,
    utmSources,
    languages,
    searches: {
      total: totalSearches,
      top: topSearches,
      byDay: searchesByDay,
    },
    liveHeatmap: {
      activeVisitors,
      cells: heatmapCells,
      byCountry: liveByCountry,
      activityByMinute,
      currentlyViewing,
      windowMinutes: liveWindowMinutes,
    },
  })
}
