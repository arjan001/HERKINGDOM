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
  authors: [{ name: "Elani Beauty Hub", url: siteUrl }],
  creator: "Elani Beauty Hub",
  openGraph: {
    title: PAGE_SEO.shop.title,
    description: PAGE_SEO.shop.description,
    url: `${siteUrl}/shop`,
    type: "website",
    siteName: "Elani Beauty Hub",
    locale: "en_KE",
    images: [{ url: `${siteUrl}/logo-kf.png`, width: 512, height: 512, alt: "Elani Beauty Hub Shop - Thrift & New Fashion" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@_classycollections",
    creator: "@_classycollections",
    title: PAGE_SEO.shop.title,
    description: PAGE_SEO.shop.description,
    images: [{ url: `${siteUrl}/logo-kf.png`, alt: "Elani Beauty Hub Shop" }],
  },
}

export default function Page() {
  return (
    <Suspense>
      <ShopPage />
    </Suspense>
  )
}
