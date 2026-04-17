import type { MetadataRoute } from "next"
import { createClient } from "@supabase/supabase-js"
import { SITE_SEO } from "@/lib/seo-data"

export const revalidate = 3600 // regenerate sitemap at most once per hour

const SITE_URL = SITE_SEO.siteUrl

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Static pages — only real, publicly-reachable routes for this jewelry shop.
  // The navbar is dynamic (categories come from Supabase) and links to
  // /shop?category={slug}, so individual category URLs are filters on /shop
  // rather than separate pages and are intentionally not listed here.
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/delivery`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/track-order`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms-of-service`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/refund-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/payments-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  // Try to fetch dynamic pages from Supabase, but never let DB errors break the sitemap
  let productPages: MetadataRoute.Sitemap = []
  let policyPages: MetadataRoute.Sitemap = []

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey)

      // Dynamic product pages
      const { data: products } = await supabase
        .from("products")
        .select("slug, updated_at, created_at")

      productPages = (products || []).map((p) => ({
        url: `${SITE_URL}/product/${p.slug}`,
        lastModified: new Date(p.updated_at || p.created_at),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))

      // Dynamic policy pages from the policies table
      const { data: policies } = await supabase
        .from("policies")
        .select("slug, updated_at, created_at")

      policyPages = (policies || []).map((p) => ({
        url: `${SITE_URL}/policies/${p.slug}`,
        lastModified: new Date(p.updated_at || p.created_at || now),
        changeFrequency: "yearly" as const,
        priority: 0.3,
      }))
    }
  } catch {
    // If Supabase is unavailable, return static pages only — never fail the sitemap
  }

  return [...staticPages, ...productPages, ...policyPages]
}
