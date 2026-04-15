import { CollectionPage } from "@/components/store/collection-page"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SITE_SEO, PAGE_SEO, PAGE_KEYWORDS } from "@/lib/seo-data"

const siteUrl = SITE_SEO.siteUrl
const VALID_COLLECTIONS = ["men", "women", "babyshop"] as const

const META: Record<string, { title: string; description: string; keywords: string[]; schema: Record<string, unknown> }> = {
  men: {
    title: PAGE_SEO.menCollection.title,
    description: PAGE_SEO.menCollection.description,
    keywords: PAGE_KEYWORDS.menCollection,
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Men's Thrift & New Collection",
      description: "Affordable thrift and new men's fashion collection at Elani Beauty Hub Nairobi",
      url: `${siteUrl}/shop/men`,
      mainEntity: {
        "@type": "ItemCollection",
        name: "Men's Thrift & New Fashion",
        description: "Curated collection of quality thrift and new men's clothing from Elani Beauty Hub",
        inLanguage: "en",
      },
    },
  },
  women: {
    title: PAGE_SEO.womenCollection.title,
    description: PAGE_SEO.womenCollection.description,
    keywords: PAGE_KEYWORDS.womenCollection,
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Women's Thrift & New Collection",
      description: "Best thrift and new women's tops, dresses, bodysuits, and jackets at Elani Beauty Hub Nairobi",
      url: `${siteUrl}/shop/women`,
      mainEntity: {
        "@type": "ItemCollection",
        name: "Women's Thrift & New Fashion",
        description: "Curated collection of quality thrift and new women's styles from Elani Beauty Hub",
        inLanguage: "en",
      },
    },
  },
  babyshop: {
    title: PAGE_SEO.babyShop.title,
    description: PAGE_SEO.babyShop.description,
    keywords: PAGE_KEYWORDS.babyShop,
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Baby & Kids Thrift & New Collection",
      description: "Affordable thrift and new baby and kids clothing at Elani Beauty Hub Nairobi",
      url: `${siteUrl}/shop/babyshop`,
      mainEntity: {
        "@type": "ItemCollection",
        name: "Baby & Kids Thrift & New Fashion",
        description: "Curated collection of quality thrift and new baby and kids clothing from Elani Beauty Hub",
        inLanguage: "en",
      },
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }): Promise<Metadata> {
  const { collection } = await params
  const meta = META[collection]
  if (!meta) return { title: "Collection Not Found" }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: "Elani Beauty Hub", url: siteUrl }],
    creator: "Elani Beauty Hub",
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteUrl}/shop/${collection}`,
      type: "website",
      siteName: "Elani Beauty Hub",
      locale: "en_KE",
      images: [{ url: `${siteUrl}/logo-kf.png`, width: 512, height: 512, alt: meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@_classycollections",
      creator: "@_classycollections",
      title: meta.title,
      description: meta.description,
      images: [{ url: `${siteUrl}/logo-kf.png`, alt: meta.title }],
    },
    alternates: {
      canonical: `${siteUrl}/shop/${collection}`,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params
  if (!VALID_COLLECTIONS.includes(collection as typeof VALID_COLLECTIONS[number])) {
    notFound()
  }

  const meta = META[collection]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(meta.schema),
        }}
      />
      <CollectionPage collection={collection} />
    </>
  )
}
