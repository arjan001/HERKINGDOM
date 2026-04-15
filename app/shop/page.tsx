import { Suspense } from "react"
import { ShopPage } from "@/components/store/shop-page"
import type { Metadata } from "next"
import { SITE_SEO, PAGE_SEO, PAGE_KEYWORDS } from "@/lib/seo-data"

const siteUrl = SITE_SEO.siteUrl

export const metadata: Metadata = {
  title: PAGE_SEO.shop.title,
  description: PAGE_SEO.shop.description,
  alternates: { canonical: `${siteUrl}/shop` },
  keywords: PAGE_KEYWORDS.shop,
  authors: [{ name: "Her Kingdom", url: siteUrl }],
  creator: "Her Kingdom",
  openGraph: {
    title: PAGE_SEO.shop.title,
    description: PAGE_SEO.shop.description,
    url: `${siteUrl}/shop`,
    type: "website",
    siteName: "Her Kingdom",
    locale: "en_KE",
    images: [{ url: `${siteUrl}/logo.png`, width: 512, height: 512, alt: "Her Kingdom - Shop Jewelry & Accessories" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@herkingdom_jewelry",
    creator: "@herkingdom_jewelry",
    title: PAGE_SEO.shop.title,
    description: PAGE_SEO.shop.description,
    images: [{ url: `${siteUrl}/logo.png`, alt: "Her Kingdom Shop" }],
  },
}

export default function Page() {
  return (
    <Suspense>
      <ShopPage />
    </Suspense>
  )
}
