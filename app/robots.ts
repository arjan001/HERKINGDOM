import type { MetadataRoute } from "next"
import { SITE_SEO } from "@/lib/seo-data"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/auth/", "/checkout/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/auth/", "/checkout/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/auth/", "/checkout/"],
      },
    ],
    sitemap: `${SITE_SEO.siteUrl}/sitemap.xml`,
  }
}
