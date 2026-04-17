import { Suspense } from "react"
import { ShopPage } from "@/components/store/shop-page"
import type { Metadata } from "next"
import { SITE_SEO, PAGE_SEO, PAGE_KEYWORDS, generateCategoryKeywords, buildCategorySeo } from "@/lib/seo-data"
import { getCategoryBySlug } from "@/lib/supabase-data"

const siteUrl = SITE_SEO.siteUrl

type ShopSearchParams = {
  category?: string | string[]
  q?: string | string[]
  filter?: string | string[]
}

type PageProps = {
  searchParams: Promise<ShopSearchParams>
}

function firstParam(value: string | string[] | undefined): string | undefined {
  if (!value) return undefined
  return Array.isArray(value) ? value[0] : value
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const categorySlug = firstParam(params.category)
  const searchQuery = firstParam(params.q)

  if (categorySlug) {
    const category = await getCategoryBySlug(categorySlug).catch(() => null)

    if (category) {
      const { title, description } = buildCategorySeo(
        category.name,
        category.description,
        category.productCount
      )
      const canonical = `${siteUrl}/shop?category=${category.slug}`
      const ogImage = category.image?.startsWith("http")
        ? category.image
        : `${siteUrl}${category.image || "/logo.png"}`

      return {
        title,
        description,
        alternates: { canonical },
        keywords: generateCategoryKeywords(category.name),
        authors: [{ name: "Her Kingdom", url: siteUrl }],
        creator: "Her Kingdom",
        openGraph: {
          title,
          description,
          url: canonical,
          type: "website",
          siteName: "Her Kingdom",
          locale: "en_KE",
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: `${category.name} at Her Kingdom Nairobi`,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          site: "@herkingdom_jewelry",
          creator: "@herkingdom_jewelry",
          title,
          description,
          images: [{ url: ogImage, alt: `${category.name} at Her Kingdom` }],
        },
      }
    }
  }

  if (searchQuery) {
    const q = searchQuery.trim().slice(0, 80)
    const title = `Search "${q}" | Her Kingdom Jewelry Nairobi`
    const description = `Results for "${q}" at Her Kingdom Nairobi. Browse curated necklaces, bracelets, earrings, watches & accessories delivered across Kenya.`
    const canonical = `${siteUrl}/shop`
    return {
      title,
      description,
      alternates: { canonical },
      robots: { index: false, follow: true },
      keywords: PAGE_KEYWORDS.shop,
      openGraph: {
        title,
        description,
        url: canonical,
        type: "website",
        siteName: "Her Kingdom",
        locale: "en_KE",
        images: [{ url: `${siteUrl}/logo.png`, width: 512, height: 512, alt: "Her Kingdom Shop" }],
      },
      twitter: {
        card: "summary_large_image",
        site: "@herkingdom_jewelry",
        creator: "@herkingdom_jewelry",
        title,
        description,
        images: [{ url: `${siteUrl}/logo.png`, alt: "Her Kingdom Shop" }],
      },
    }
  }

  return {
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
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams
  const categorySlug = firstParam(params.category)
  const category = categorySlug ? await getCategoryBySlug(categorySlug).catch(() => null) : null

  const jsonLd = category
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${siteUrl}/shop?category=${category.slug}#collection`,
            url: `${siteUrl}/shop?category=${category.slug}`,
            name: `${category.name} | Her Kingdom Nairobi`,
            description:
              category.description ||
              `Shop ${category.name.toLowerCase()} at Her Kingdom Nairobi. Hypoallergenic, long-lasting jewelry delivered across Kenya.`,
            isPartOf: { "@id": `${siteUrl}#website` },
            about: {
              "@type": "Thing",
              name: category.name,
            },
            image: category.image?.startsWith("http")
              ? category.image
              : `${siteUrl}${category.image || "/logo.png"}`,
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteUrl,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Shop",
                item: `${siteUrl}/shop`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: category.name,
                item: `${siteUrl}/shop?category=${category.slug}`,
              },
            ],
          },
        ],
      }
    : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Suspense>
        <ShopPage />
      </Suspense>
    </>
  )
}
