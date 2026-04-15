import { LandingPage } from "@/components/store/landing-page"
import type { Metadata } from "next"
import { SITE_SEO, PAGE_SEO, PAGE_KEYWORDS } from "@/lib/seo-data"

const siteUrl = SITE_SEO.siteUrl

export const metadata: Metadata = {
  title: PAGE_SEO.home.title,
  description: PAGE_SEO.home.description,
  keywords: PAGE_KEYWORDS.home,
  alternates: { canonical: siteUrl },
  openGraph: {
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    url: siteUrl,
    type: "website",
    siteName: "Her Kingdom",
    locale: "en_KE",
    images: [{ url: `${siteUrl}/logo.png`, width: 512, height: 512, alt: "Her Kingdom - Curated Jewelry & Accessories Nairobi" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@herkingdom_jewelry",
    creator: "@herkingdom_jewelry",
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    images: [{ url: `${siteUrl}/logo.png`, alt: "Her Kingdom Logo" }],
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Her Kingdom - Curated Jewelry & Accessories",
            description: "Her Kingdom is a jewelry brand based in Nairobi, Kenya. Shop curated necklaces, bracelets, earrings, watches, handbags & accessories.",
            url: siteUrl,
            mainEntity: {
              "@type": "LocalBusiness",
              name: "Her Kingdom",
              description: "Curated jewelry & accessories — necklaces, bracelets, earrings, watches & more in Nairobi, Kenya",
              image: `${siteUrl}/logo.png`,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nairobi",
                addressCountry: "KE",
              },
              telephone: "+254717264422",
              email: "herkingdomlive@gmail.com",
              url: siteUrl,
            },
          }),
        }}
      />
      <LandingPage />
    </>
  )
}
