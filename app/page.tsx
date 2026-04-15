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
    siteName: "Elani Beauty Hub",
    locale: "en_KE",
    images: [{ url: `${siteUrl}/logo-kf.png`, width: 512, height: 512, alt: "Elani Beauty Hub - Best Thrift & New Fashion Nairobi" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@_classycollections",
    creator: "@_classycollections",
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    images: [{ url: `${siteUrl}/logo-kf.png`, alt: "Elani Beauty Hub Logo" }],
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
            name: "Elani Beauty Hub - Best Thrift & New Fashion",
            description: "Best thrift and new women's fashion online store in Nairobi Kenya. Shop tops, dresses, bodysuits, jackets, and more at affordable prices.",
            url: siteUrl,
            mainEntity: {
              "@type": "LocalBusiness",
              name: "Elani Beauty Hub",
              description: "Best thrift and new women's fashion — tops, dresses, bodysuits, jackets & more in Nairobi, Kenya",
              image: `${siteUrl}/logo-kf.png`,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nairobi",
                addressCountry: "KE",
              },
              telephone: "+254702642324",
              email: "info@classycollections.com",
              url: siteUrl,
            },
          }),
        }}
      />
      <LandingPage />
    </>
  )
}
