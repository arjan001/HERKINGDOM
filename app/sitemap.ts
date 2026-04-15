import type { MetadataRoute } from "next"
import { createClient } from "@supabase/supabase-js"
import { SITE_SEO } from "@/lib/seo-data"

export const revalidate = 3600 // regenerate sitemap at most once per hour

const SITE_URL = SITE_SEO.siteUrl

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Static pages — only clean path URLs, no query parameters
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
      url: `${SITE_URL}/shop/men`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/shop/women`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/shop/babyshop`,
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
  ]

  // Try to fetch dynamic pages from Supabase, but never let DB errors break the sitemap
  let productPages: MetadataRoute.Sitemap = []
  let categoryPages: MetadataRoute.Sitemap = []

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

      // Category pages as clean path URLs via collection routes
      const { data: categories } = await supabase
        .from("categories")
        .select("slug")
        .eq("is_active", true)

      categoryPages = (categories || []).map((c) => ({
        url: `${SITE_URL}/shop/${c.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }))
    }
  } catch {
    // If Supabase is unavailable, return static pages only — never fail the sitemap
  }

  return [...staticPages, ...productPages, ...categoryPages]
}
