import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { CartProvider } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"
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
    default: "Elani Beauty Hub | Best Thrift & New Tops, Dresses, Bodysuits & Jackets in Nairobi",
    template: "%s | Elani Beauty Hub",
  },
  description:
    "Shop the best thrift and new women's tops, dresses, bodysuits, and jackets at Elani Beauty Hub Nairobi. Quality preloved and brand-new fashion at unbeatable prices. Best thrift shop in Kenya. Call 0702642324.",
  icons: {
    icon: [
      { url: "/favicon.jpg", type: "image/jpeg" },
      { url: "/logo-kf.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/logo-kf.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.jpg",
  },
  manifest: "/manifest.json",
  keywords: SITE_SEO.allKeywords,
  authors: [
    { name: "Elani Beauty Hub", url: siteUrl },
    { name: "OnePlus Africa Tech Solutions", url: "http://oneplusafrica.com/" },
  ],
  creator: "Elani Beauty Hub",
  publisher: "Elani Beauty Hub",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteUrl,
    siteName: "Elani Beauty Hub",
    title: "Elani Beauty Hub | Best Thrift & New Tops, Dresses, Bodysuits & Jackets in Nairobi",
    description:
      "Shop the best thrift and new women's tops, dresses, bodysuits, and jackets at Elani Beauty Hub. Quality preloved and brand-new fashion. Best thrift shop in Nairobi, Kenya.",
    images: [
      {
        url: `${siteUrl}/logo-kf.png`,
        width: 512,
        height: 512,
        alt: "Elani Beauty Hub - Best Thrift & New Fashion in Nairobi",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@_classycollections",
    creator: "@_classycollections",
    title: "Elani Beauty Hub | Best Thrift & New Fashion in Nairobi",
    description:
      "Shop quality thrift and new tops, dresses, bodysuits, and jackets. Affordable women's fashion delivered across Kenya. Call 0702642324.",
    images: [
      {
        url: `${siteUrl}/logo-kf.png`,
        alt: "Elani Beauty Hub Logo",
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
    "instagram:creator": "@_classycollections",
    "tiktok:creator": "@_classycollections",
    "developer": "OnePlus Africa Tech Solutions",
    "developer-website": "http://oneplusafrica.com/",
    "google-site-verification": "2db8ce1a2a14fac0",
    "msvalidate.01": "",
    "pinterest-rich-pin": "true",
  },
  category: "Fashion",
  classification: "Thrift Fashion Store",
  referrer: "origin-when-cross-origin",
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
        <link rel="icon" href="/favicon.jpg" type="image/jpeg" />
        <link rel="icon" href="/logo-kf.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/logo-kf.png" sizes="512x512" />
        <link rel="shortcut icon" href="/favicon.jpg" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="application-name" content="Elani Beauty Hub" />
        <meta name="apple-mobile-web-app-title" content="Elani Beauty Hub" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileImage" content="/logo-kf.png" />
        <meta name="msapplication-TileColor" content="#0a0a0a" />
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
                { "@type": "ListItem", position: 3, name: "Women's Collection", item: `${siteUrl}/shop/women` },
                { "@type": "ListItem", position: 4, name: "Men's Collection", item: `${siteUrl}/shop/men` },
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
              name: "Elani Beauty Hub",
              legalName: "Elani Beauty Hub Kenya",
              url: siteUrl,
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/logo-kf.png`,
                width: 512,
                height: 512,
              },
              foundingDate: "2025",
              description: "Best thrift and new women's fashion store in Nairobi. Shop quality tops, dresses, bodysuits, and jackets at affordable prices.",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                telephone: "+254702642324",
                email: "info@classycollections.com",
                url: "https://wa.me/254702642324",
                availableLanguage: ["English", "Swahili"],
              },
              sameAs: [
                "https://www.instagram.com/_classycollections/",
                "https://www.tiktok.com/@_classycollections",
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
              name: "Elani Beauty Hub",
              description: "Best thrift and new women's fashion in Nairobi. Quality tops, dresses, bodysuits, jackets and more at affordable prices. New arrivals and preloved fashion delivered across Kenya.",
              url: siteUrl,
              telephone: "+254702642324",
              email: "info@classycollections.com",
              image: `${siteUrl}/logo-kf.png`,
              logo: `${siteUrl}/logo-kf.png`,
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
                "https://www.instagram.com/_classycollections/",
                "https://www.tiktok.com/@_classycollections",
              ],
              priceRange: "KES 500 - KES 15,000",
              brand: {
                "@type": "Brand",
                name: "Elani Beauty Hub",
              },
              paymentAccepted: "M-PESA, Card, Cash on Delivery",
              currenciesAccepted: "KES",
              openingHours: "Mo-Su 08:00-20:00",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Elani Beauty Hub Fashion",
                itemListElement: [
                  { "@type": "OfferCatalog", name: "Thrift Tops" },
                  { "@type": "OfferCatalog", name: "Thrift Dresses" },
                  { "@type": "OfferCatalog", name: "Thrift Bodysuits" },
                  { "@type": "OfferCatalog", name: "Thrift Jackets" },
                  { "@type": "OfferCatalog", name: "New Arrivals" },
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
              name: "Elani Beauty Hub",
              alternateName: "Elani Beauty Hub Nairobi",
              url: siteUrl,
              description: "Best thrift and new women's fashion — tops, dresses, bodysuits, and jackets delivered across Kenya.",
              publisher: {
                "@type": "Organization",
                name: "Elani Beauty Hub",
                logo: {
                  "@type": "ImageObject",
                  url: `${siteUrl}/logo-kf.png`,
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
              name: "Elani Beauty Hub Site Pages",
              itemListElement: [
                { "@type": "SiteNavigationElement", position: 1, name: "Home", url: siteUrl },
                { "@type": "SiteNavigationElement", position: 2, name: "Shop All", url: `${siteUrl}/shop` },
                { "@type": "SiteNavigationElement", position: 3, name: "Women's Collection", url: `${siteUrl}/shop/women` },
                { "@type": "SiteNavigationElement", position: 4, name: "Men's Collection", url: `${siteUrl}/shop/men` },
                { "@type": "SiteNavigationElement", position: 5, name: "New Arrivals", url: `${siteUrl}/shop?filter=new` },
                { "@type": "SiteNavigationElement", position: 6, name: "Track My Order", url: `${siteUrl}/track-order` },
                { "@type": "SiteNavigationElement", position: 7, name: "Delivery Locations", url: `${siteUrl}/delivery` },
                { "@type": "SiteNavigationElement", position: 8, name: "Wishlist", url: `${siteUrl}/wishlist` },
                { "@type": "SiteNavigationElement", position: 9, name: "Privacy Policy", url: `${siteUrl}/privacy-policy` },
                { "@type": "SiteNavigationElement", position: 10, name: "Terms of Service", url: `${siteUrl}/terms-of-service` },
                { "@type": "SiteNavigationElement", position: 11, name: "Refund Policy", url: `${siteUrl}/refund-policy` },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
          <WishlistProvider><CartProvider>{children}</CartProvider></WishlistProvider>
          <PageViewTracker />
          <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  )
}
