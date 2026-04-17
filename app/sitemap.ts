import type { MetadataRoute } from "next"
import { createClient } from "@supabase/supabase-js"
import { SITE_SEO } from "@/lib/seo-data"
import {
  SEO_PRODUCTS,
  SEO_MODIFIERS,
  SEO_OCCASIONS,
  SEO_LOCATIONS,
} from "@/lib/seo-keyword-engine"

export const revalidate = 3600 // regenerate each sub-sitemap at most once per hour

const SITE_URL = SITE_SEO.siteUrl

/**
 * Split the sitemap into a sitemap-index.xml with multiple sub-sitemaps so
 * Google and Bing can crawl large clusters in parallel — the same approach
 * used by Jumia, Amazon and other catalogue-scale e-commerce sites.
 *
 * Next.js serves each entry below at `/sitemap/<id>.xml` and automatically
 * exposes a sitemap index at `/sitemap.xml` that references them all.
 */
export async function generateSitemaps() {
  return [
    { id: "static" },
    { id: "categories" },
    { id: "products" },
    { id: "policies" },
    { id: "keywords-1" },
    { id: "keywords-2" },
    { id: "keywords-3" },
  ]
}

type SitemapId =
  | "static"
  | "categories"
  | "products"
  | "policies"
  | "keywords-1"
  | "keywords-2"
  | "keywords-3"

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function staticPages(now: Date): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/delivery`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/track-order`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/refund-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/payments-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ]
}

async function supabasePages(id: Extract<SitemapId, "categories" | "products" | "policies">, now: Date) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!supabaseUrl || !supabaseKey) return []
    const supabase = createClient(supabaseUrl, supabaseKey)

    if (id === "products") {
      const { data: products } = await supabase
        .from("products")
        .select("slug, updated_at, created_at")
      return (products || []).map((p) => ({
        url: `${SITE_URL}/product/${p.slug}`,
        lastModified: new Date(p.updated_at || p.created_at || now),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
    }

    if (id === "policies") {
      const { data: policies } = await supabase
        .from("policies")
        .select("slug, updated_at, created_at")
      return (policies || []).map((p) => ({
        url: `${SITE_URL}/policies/${p.slug}`,
        lastModified: new Date(p.updated_at || p.created_at || now),
        changeFrequency: "yearly" as const,
        priority: 0.3,
      }))
    }

    if (id === "categories") {
      const { data: categories } = await supabase
        .from("categories")
        .select("slug, updated_at, created_at, is_active")
        .eq("is_active", true)
      return (categories || []).map((c) => ({
        url: `${SITE_URL}/shop?category=${c.slug}`,
        lastModified: new Date(c.updated_at || c.created_at || now),
        changeFrequency: "daily" as const,
        priority: 0.7,
      }))
    }
  } catch {
    // Degrade gracefully — sitemap must never 500
  }
  return []
}

/**
 * Programmatic keyword URLs from the Modifier × Product × Occasion × Location
 * matrix. The full matrix is 15 × 15 × 10 × 15 = 33,750 combinations, which
 * we pare down to valid Product × Occasion combinations per sitemap to stay
 * comfortably within the 50,000-URL / 50MB Google sitemap limit while still
 * giving crawlers thousands of distinct indexable URLs to walk.
 */
function keywordPages(shard: 1 | 2 | 3, now: Date): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = []
  for (const product of SEO_PRODUCTS) {
    for (const occasion of SEO_OCCASIONS) {
      for (const location of SEO_LOCATIONS) {
        for (const modifier of SEO_MODIFIERS) {
          // Deterministic bucketing keeps each shard small and stable
          const bucket =
            (product.key.length + occasion.key.length + location.length + modifier.length) % 3
          if (bucket !== shard - 1) continue
          const params = new URLSearchParams({
            category: product.slug,
            occasion: occasion.key,
            location: slugify(location),
            modifier: slugify(modifier),
          })
          urls.push({
            url: `${SITE_URL}/shop?${params.toString()}`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.4,
          })
        }
      }
    }
  }
  return urls
}

export default async function sitemap({ id }: { id: SitemapId }): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  switch (id) {
    case "static":
      return staticPages(now)
    case "categories":
    case "products":
    case "policies":
      return supabasePages(id, now)
    case "keywords-1":
      return keywordPages(1, now)
    case "keywords-2":
      return keywordPages(2, now)
    case "keywords-3":
      return keywordPages(3, now)
    default:
      return staticPages(now)
  }
}
