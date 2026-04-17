import type { MetadataRoute } from "next"
import { createClient } from "@supabase/supabase-js"
import { SITE_SEO } from "@/lib/seo-data"

export const revalidate = 3600 // regenerate sitemap at most once per hour

const SITE_URL = SITE_SEO.siteUrl

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Static pages — only real, publicly-reachable routes for this jewelry shop.
  // The navbar is dynamic (categories come from Supabase) and links to
  // /shop?category={slug}. Each category-filtered view has its own
  // generateMetadata + JSON-LD in app/shop/page.tsx, so those URLs are
  // also included below as dynamic entries derived from the categories table.
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

      // Dynamic category-filtered shop views, driven by the same Supabase
      // categories table the navbar reads. Each entry corresponds to a
      // distinct /shop?category={slug} URL whose metadata is produced by
      // generateMetadata in app/shop/page.tsx.
      const { data: categories } = await supabase
        .from("categories")
        .select("slug, updated_at, created_at, is_active")
        .eq("is_active", true)

      categoryPages = (categories || []).map((c) => ({
        url: `${SITE_URL}/shop?category=${c.slug}`,
        lastModified: new Date(c.updated_at || c.created_at || now),
        changeFrequency: "daily" as const,
        priority: 0.7,
      }))
    }
  } catch {
    // If Supabase is unavailable, return static pages only — never fail the sitemap
  }

  return [...staticPages, ...categoryPages, ...productPages, ...policyPages]
}
