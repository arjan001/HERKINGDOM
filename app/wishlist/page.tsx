import type { Metadata } from "next"
import { WishlistPage } from "@/components/store/wishlist-page"
import { PAGE_SEO, SITE_SEO, PAGE_KEYWORDS } from "@/lib/seo-data"

const siteUrl = SITE_SEO.siteUrl

export const metadata: Metadata = {
  title: PAGE_SEO.wishlist.title,
  description: PAGE_SEO.wishlist.description,
  alternates: { canonical: `${siteUrl}/wishlist` },
  keywords: PAGE_KEYWORDS.wishlist,
  authors: [{ name: SITE_SEO.siteName, url: siteUrl }],
  creator: SITE_SEO.siteName,
  publisher: SITE_SEO.siteName,
  openGraph: {
    title: PAGE_SEO.wishlist.title,
    description: PAGE_SEO.wishlist.description,
    url: `${siteUrl}/wishlist`,
    siteName: "Elani Beauty Hub",
    type: "website",
    locale: "en_KE",
    images: [{ url: `${siteUrl}/logo-kf.png`, width: 512, height: 512, alt: "Elani Beauty Hub Wishlist" }],
  },
  twitter: {
    card: "summary",
    site: "@_classycollections",
    creator: "@_classycollections",
    title: PAGE_SEO.wishlist.title,
    description: PAGE_SEO.wishlist.description,
    images: [{ url: `${siteUrl}/logo-kf.png`, alt: "Elani Beauty Hub" }],
  },
}

export default function Page() {
  return <WishlistPage />
}
