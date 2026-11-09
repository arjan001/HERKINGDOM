import type { MetadataRoute } from "next"
import { SITE_SEO } from "@/lib/seo-data"

export const revalidate = 3600

// This dynamic sitemap is DISABLED in favor of static sitemap.xml
// The static sitemap is manually managed to ensure SEO control
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = SITE_SEO.siteUrl
  const now = new Date()

  // Return empty to defer to static sitemap.xml
  return []
}
