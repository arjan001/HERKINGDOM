import { NextResponse } from "next/server"

export const revalidate = 1800 // cache 30 min

interface SocialPost {
  id: string
  platform: "instagram" | "tiktok"
  thumbnailUrl: string
  caption: string
  url: string
  authorName: string
}

// ── Instagram ─────────────────────────────────────────
// Uses rss.app or similar RSS-to-JSON proxies to get latest posts.
// Falls back to scraping the profile page via imginn.com which mirrors IG publicly.
async function fetchInstagramPosts(): Promise<SocialPost[]> {
  const username = "classycollections"
  const posts: SocialPost[] = []

  // Approach 1: Use imginn.com (public IG mirror) HTML scrape
  try {
    const res = await fetch(`https://imginn.com/${username}/`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept: "text/html",
      },
      next: { revalidate: 1800 },
    })

    if (res.ok) {
      const html = await res.text()
      // Extract post data from the HTML - imginn uses img tags with data-src or src
      const imgRegex =
        /<a[^>]*href="(\/p\/[^"]+)"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"[^>]*>/g
      let match
      let count = 0
      while ((match = imgRegex.exec(html)) !== null && count < 2) {
        const postPath = match[1]
        const thumbUrl = match[2]
        if (thumbUrl && !thumbUrl.includes("avatar") && !thumbUrl.includes("profile")) {
          const shortcode = postPath.replace("/p/", "").replace("/", "")
          posts.push({
            id: `ig-${shortcode}`,
            platform: "instagram",
            thumbnailUrl: thumbUrl,
            caption: "Latest from @classycollections",
            url: `https://www.instagram.com/p/${shortcode}/`,
            authorName: `@${username}`,
          })
          count++
        }
      }

      if (posts.length >= 2) return posts.slice(0, 2)
    }
  } catch {
    // continue to next approach
  }

  // Approach 2: Use Bibliogram (another public mirror)
  try {
    const res = await fetch(`https://bibliogram.art/u/${username}/rss.xml`, {
      next: { revalidate: 1800 },
    })
    if (res.ok) {
      const xml = await res.text()
      const items = xml.split("<item>").slice(1, 3)
      for (const item of items) {
        const linkMatch = item.match(/<link>([^<]+)<\/link>/)
        const imgMatch =
          item.match(/<media:content[^>]*url="([^"]+)"/) ||
          item.match(/<enclosure[^>]*url="([^"]+)"/) ||
          item.match(/src="(https:\/\/[^"]+\.jpg[^"]*)"/i)
        const titleMatch = item.match(/<title>([^<]*)<\/title>/)
        if (linkMatch) {
          posts.push({
            id: `ig-bib-${posts.length}`,
            platform: "instagram",
            thumbnailUrl: imgMatch?.[1] || "",
            caption: titleMatch?.[1]?.slice(0, 100) || "Latest from Instagram",
            url: linkMatch[1],
            authorName: `@${username}`,
          })
        }
      }
      if (posts.length >= 2) return posts.slice(0, 2)
    }
  } catch {
    // continue
  }

  return posts
}

// ── TikTok ────────────────────────────────────────────
// Uses the official TikTok oembed API (free, no auth required)
async function fetchTikTokPosts(): Promise<SocialPost[]> {
  // Known recent video URLs from @classycollections
  const videoUrls = [
    "https://www.tiktok.com/@classycollections/video/7461643744227393798",
    "https://www.tiktok.com/@classycollections/video/7459629757042420998",
  ]

  const posts: SocialPost[] = []

  for (const videoUrl of videoUrls) {
    try {
      const res = await fetch(
        `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`,
        { next: { revalidate: 1800 } }
      )
      if (res.ok) {
        const data = await res.json()
        posts.push({
          id: `tt-${data.embed_product_id || posts.length}`,
          platform: "tiktok",
          thumbnailUrl: data.thumbnail_url || "",
          caption:
            data.title?.slice(0, 100) || "Latest from TikTok",
          url: videoUrl,
          authorName: data.author_name
            ? `@${data.author_name}`
: "@classycollections",
        })
      }
    } catch {
      // continue
    }
  }

  return posts
}

// ── Fallback posts (used when APIs fail) ──────────────
const fallbackPosts: SocialPost[] = [
  {
    id: "ig-fallback-1",
    platform: "instagram",
    thumbnailUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/629193217_18340368757212493_1480765838168153731_n-wC1jOTRfbRYdWnoXghbWGXEVNGBWam.jpg",
    caption: "New collection just landed! Fresh styles available",
    url: "https://www.instagram.com/classycollections/",
    authorName: "@classycollections",
  },
  {
    id: "tt-fallback-1",
    platform: "tiktok",
    thumbnailUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/626300021_18340368655212493_4414636015382857078_n-blUbjySwyB9lUadVyYMogCeKLn1ceI.jpg",
    caption: "How to style your outfits for any occasion",
    url: "https://www.tiktok.com/@classycollections/video/7461643744227393798",
    authorName: "@classycollections",
  },
  {
    id: "ig-fallback-2",
    platform: "instagram",
    thumbnailUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/630121672_18340368937212493_3946690921086389086_n-VRoUTe5L8vTxr34o4RQxJDZGGzARSK.jpg",
    caption: "Elegant prints - timeless fashion",
    url: "https://www.instagram.com/classycollections/",
    authorName: "@classycollections",
  },
  {
    id: "tt-fallback-2",
    platform: "tiktok",
    thumbnailUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/627839274_18340368694212493_1900658190163154627_n-RQbuPfN5qde7Mt0Zu6MOrirynVM7Nv.jpg",
    caption: "Size-inclusive haul from Elani Beauty Hub",
    url: "https://www.tiktok.com/@classycollections/video/7459629757042420998",
    authorName: "@classycollections",
  },
]

export async function GET() {
  const [igPosts, ttPosts] = await Promise.all([
    fetchInstagramPosts(),
    fetchTikTokPosts(),
  ])

  // Interleave: IG, TT, IG, TT
  const combined: SocialPost[] = []
  const maxLen = Math.max(igPosts.length, ttPosts.length)
  for (let i = 0; i < maxLen && combined.length < 4; i++) {
    if (igPosts[i]) combined.push(igPosts[i])
    if (ttPosts[i]) combined.push(ttPosts[i])
  }

  // Use fallbacks to fill any gaps, maintaining IG/TT alternating pattern
  const result: SocialPost[] = []
  let igIdx = 0
  let ttIdx = 0
  const liveIg = combined.filter((p) => p.platform === "instagram")
  const liveTt = combined.filter((p) => p.platform === "tiktok")
  const fallbackIg = fallbackPosts.filter((p) => p.platform === "instagram")
  const fallbackTt = fallbackPosts.filter((p) => p.platform === "tiktok")

  for (let i = 0; i < 4; i++) {
    if (i % 2 === 0) {
      // Instagram slot
      result.push(liveIg[igIdx] || fallbackIg[igIdx] || fallbackPosts[i])
      igIdx++
    } else {
      // TikTok slot
      result.push(liveTt[ttIdx] || fallbackTt[ttIdx] || fallbackPosts[i])
      ttIdx++
    }
  }

  return NextResponse.json({
    posts: result,
    sources: {
      instagram: liveIg.length > 0 ? "live" : "fallback",
      tiktok: liveTt.length > 0 ? "live" : "fallback",
    },
  })
}
