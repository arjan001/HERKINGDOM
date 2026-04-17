import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { CartProvider } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import { GiftProvider } from "@/lib/gift-context"
import { Toaster } from "@/components/ui/sonner"
import { PageViewTracker } from "@/components/page-view-tracker"
import { SITE_SEO } from "@/lib/seo-data"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const siteUrl = SITE_SEO.siteUrl

export const metadata: Metadata = {
  title: {
    default: "Her Kingdom | Curated Jewelry & Accessories for Women in Nairobi, Kenya",
    template: "%s | Her Kingdom",
  },
  description:
    "Shop curated jewelry, necklaces, bracelets, earrings, watches & accessories at Her Kingdom Nairobi. Hypoallergenic, long-lasting pieces that complement your personal style. #HerkingdomBabe",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
  manifest: "/manifest.json",
  keywords: SITE_SEO.allKeywords,
  authors: [
    { name: "Her Kingdom", url: siteUrl },
  ],
  creator: "Her Kingdom",
  publisher: "Her Kingdom",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteUrl,
    siteName: "Her Kingdom",
    title: "Her Kingdom | Curated Jewelry & Accessories for Women in Nairobi, Kenya",
    description:
      "Shop curated jewelry, necklaces, bracelets, earrings, watches & accessories at Her Kingdom. Hypoallergenic, long-lasting pieces. Delivery across Kenya.",
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 512,
        height: 512,
        alt: "Her Kingdom - Curated Jewelry & Accessories Nairobi",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@herkingdom_jewelry",
    creator: "@herkingdom_jewelry",
    title: "Her Kingdom | Curated Jewelry & Accessories in Nairobi",
    description:
      "Shop curated necklaces, bracelets, earrings, watches & accessories. Hypoallergenic jewelry delivered across Kenya. WhatsApp +254717264422.",
    images: [
      {
        url: `${siteUrl}/logo.png`,
        alt: "Her Kingdom Logo",
        width: 512,
        height: 512,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "instagram:creator": "@herkingdom_jewelry",
    "tiktok:creator": "@herkingdom_jewelry",
    "pinterest-rich-pin": "true",
  },
  category: "Jewelry & Accessories",
  classification: "Jewelry Store",
  referrer: "origin-when-cross-origin",
}

export const viewport: Viewport = {
  themeColor: "#f4a4c0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/favicon.png" sizes="512x512" />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#f4a4c0" />
        <meta name="application-name" content="Her Kingdom" />
        <meta name="apple-mobile-web-app-title" content="Her Kingdom" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileImage" content="/favicon.png" />
        <meta name="msapplication-TileColor" content="#f4a4c0" />
        <meta name="msapplication-config" content="none" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
                { "@type": "ListItem", position: 2, name: "Shop", item: `${siteUrl}/shop` },
                { "@type": "ListItem", position: 3, name: "Necklaces", item: `${siteUrl}/shop?category=necklaces` },
                { "@type": "ListItem", position: 4, name: "Bracelets", item: `${siteUrl}/shop?category=bracelets` },
                { "@type": "ListItem", position: 5, name: "Earrings", item: `${siteUrl}/shop?category=earrings` },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Her Kingdom",
              legalName: "Her Kingdom Kenya",
              url: siteUrl,
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/logo.png`,
                width: 512,
                height: 512,
              },
              foundingDate: "2024",
              description: "Her Kingdom is a jewelry brand based in Nairobi, Kenya. We offer curated jewelry pieces that complement your personal style and embody individuality.",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                telephone: "+254717264422",
                email: "herkingdomlive@gmail.com",
                url: "https://wa.me/254717264422",
                availableLanguage: ["English", "Swahili"],
              },
              sameAs: [
                "https://www.instagram.com/herkingdom_jewelry/",
                "https://www.tiktok.com/@herkingdom_jewelry",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nairobi",
                addressRegion: "Nairobi",
                addressCountry: "KE",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": `${siteUrl}/#business`,
              name: "Her Kingdom",
              description: "Her Kingdom is a jewelry brand based in Nairobi, Kenya offering curated necklaces, bracelets, earrings, watches, handbags & accessories. Hypoallergenic, long-lasting pieces delivered across Kenya.",
              url: siteUrl,
              telephone: "+254717264422",
              email: "herkingdomlive@gmail.com",
              image: `${siteUrl}/logo.png`,
              logo: `${siteUrl}/logo.png`,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nairobi",
                addressRegion: "Nairobi",
                addressCountry: "KE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -1.2921,
                longitude: 36.8219,
              },
              sameAs: [
                "https://www.instagram.com/herkingdom_jewelry/",
                "https://www.tiktok.com/@herkingdom_jewelry",
              ],
              priceRange: "KES 200 - KES 15,000",
              brand: {
                "@type": "Brand",
                name: "Her Kingdom",
              },
              paymentAccepted: "M-PESA, Cash on Delivery",
              currenciesAccepted: "KES",
              openingHours: "Mo-Su 08:00-20:00",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Her Kingdom Jewelry & Accessories",
                itemListElement: [
                  { "@type": "OfferCatalog", name: "Necklaces" },
                  { "@type": "OfferCatalog", name: "Bracelets" },
                  { "@type": "OfferCatalog", name: "Earrings" },
                  { "@type": "OfferCatalog", name: "Watches" },
                  { "@type": "OfferCatalog", name: "Handbags & Accessories" },
                ],
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Her Kingdom",
              alternateName: "Her Kingdom Jewelry Nairobi",
              url: siteUrl,
              description: "Curated jewelry & accessories — necklaces, bracelets, earrings, watches & more delivered across Kenya.",
              publisher: {
                "@type": "Organization",
                name: "Her Kingdom",
                logo: {
                  "@type": "ImageObject",
                  url: `${siteUrl}/logo.png`,
                },
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${siteUrl}/shop?search={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
              inLanguage: "en",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Her Kingdom Site Pages",
              itemListElement: [
                { "@type": "SiteNavigationElement", position: 1, name: "Home", url: siteUrl },
                { "@type": "SiteNavigationElement", position: 2, name: "Shop All", url: `${siteUrl}/shop` },
                { "@type": "SiteNavigationElement", position: 3, name: "New Arrivals", url: `${siteUrl}/shop?filter=new` },
                { "@type": "SiteNavigationElement", position: 4, name: "Track My Order", url: `${siteUrl}/track-order` },
                { "@type": "SiteNavigationElement", position: 5, name: "Delivery Locations", url: `${siteUrl}/delivery` },
                { "@type": "SiteNavigationElement", position: 6, name: "Wishlist", url: `${siteUrl}/wishlist` },
                { "@type": "SiteNavigationElement", position: 7, name: "Privacy Policy", url: `${siteUrl}/privacy-policy` },
                { "@type": "SiteNavigationElement", position: 8, name: "Terms of Service", url: `${siteUrl}/terms-of-service` },
                { "@type": "SiteNavigationElement", position: 9, name: "Refund Policy", url: `${siteUrl}/refund-policy` },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
          <WishlistProvider><CartProvider><GiftProvider>{children}</GiftProvider></CartProvider></WishlistProvider>
          <PageViewTracker />
          <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  )
}
