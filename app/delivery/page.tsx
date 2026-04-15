import { DeliveryPage } from "@/components/store/delivery-page"
import type { Metadata } from "next"
import { SITE_SEO, PAGE_SEO, PAGE_KEYWORDS } from "@/lib/seo-data"

const siteUrl = SITE_SEO.siteUrl

export const metadata: Metadata = {
  title: PAGE_SEO.delivery.title,
  description: PAGE_SEO.delivery.description,
  alternates: { canonical: `${siteUrl}/delivery` },
  keywords: PAGE_KEYWORDS.delivery,
  authors: [{ name: "Elani Beauty Hub", url: siteUrl }],
  creator: "Elani Beauty Hub",
  openGraph: {
    title: PAGE_SEO.delivery.title,
    description: PAGE_SEO.delivery.description,
    url: `${siteUrl}/delivery`,
    type: "website",
    siteName: "Elani Beauty Hub",
    locale: "en_KE",
    images: [{ url: `${siteUrl}/logo-kf.png`, width: 512, height: 512, alt: "Elani Beauty Hub Delivery" }],
  },
  twitter: {
    card: "summary",
    site: "@_classycollections",
    creator: "@_classycollections",
    title: PAGE_SEO.delivery.title,
    description: PAGE_SEO.delivery.description,
    images: [{ url: `${siteUrl}/logo-kf.png`, alt: "Elani Beauty Hub Delivery" }],
  },
}

export default function Page() {
  return <DeliveryPage />
}
