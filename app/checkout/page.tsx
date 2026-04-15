import { CheckoutPage } from "@/components/store/checkout-page"
import type { Metadata } from "next"
import { PAGE_SEO, SITE_SEO } from "@/lib/seo-data"

const siteUrl = SITE_SEO.siteUrl

export const metadata: Metadata = {
  title: PAGE_SEO.checkout.title,
  description: PAGE_SEO.checkout.description,
  robots: { index: false, follow: false },
  openGraph: {
    title: PAGE_SEO.checkout.title,
    description: PAGE_SEO.checkout.description,
    url: `${siteUrl}/checkout`,
    siteName: "Elani Beauty Hub",
    locale: "en_KE",
    type: "website",
    images: [{ url: `${siteUrl}/logo-kf.png`, width: 512, height: 512, alt: "Elani Beauty Hub Checkout" }],
  },
  twitter: {
    card: "summary",
    site: "@_classycollections",
    creator: "@_classycollections",
    title: PAGE_SEO.checkout.title,
    description: PAGE_SEO.checkout.description,
    images: [{ url: `${siteUrl}/logo-kf.png`, alt: "Elani Beauty Hub" }],
  },
}

export default function Page() {
  return <CheckoutPage />
}
