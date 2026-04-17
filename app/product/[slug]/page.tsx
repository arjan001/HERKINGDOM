import { ProductDetailPage } from "@/components/store/product-detail-page"
import { getProductBySlug } from "@/lib/supabase-data"
import type { Metadata } from "next"
import { SITE_SEO, generateProductKeywords } from "@/lib/seo-data"
import { metaKeywordsFor } from "@/lib/seo-keyword-engine"

export const dynamic = "force-dynamic"

const siteUrl = SITE_SEO.siteUrl

function inferOccasion(product: { category?: string; tags?: string[] }): string {
  const haystack = [product.category, ...(product.tags || [])].filter(Boolean).join(" ").toLowerCase()
  if (haystack.includes("valentine")) return "Valentine's Day"
  if (haystack.includes("mother")) return "Mother's Day"
  if (haystack.includes("wedding") || haystack.includes("bridal")) return "Weddings"
  if (haystack.includes("anniversary")) return "Anniversaries"
  if (haystack.includes("birthday")) return "Birthdays"
  if (haystack.includes("men")) return "Executive Men's Gifting"
  return "Luxe Gifting"
}

function absoluteUrl(url: string): string {
  if (!url) return `${siteUrl}/logo.png`
  if (url.startsWith("http://") || url.startsWith("https://")) return url
  if (url.startsWith("/")) return `${siteUrl}${url}`
  return `${siteUrl}/${url}`
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const product = await getProductBySlug(slug)
    if (!product) return { title: "Product Not Found | Her Kingdom" }
    const category = product.category || "Jewelry"
    const occasion = inferOccasion(product)
    const title = `${product.name} | Best ${category} Gift Kenya | herkingdomjewelry.shop`
    const description = `Shop ${product.name} at herkingdomjewelry.shop. The best ${category.toLowerCase()} in Nairobi. Perfect for ${occasion} with luxe packaging and same-day delivery. Order via WhatsApp!`
    const primaryImage = product.images[0]
      ? absoluteUrl(product.images[0])
      : `${siteUrl}/logo.png`
    const ogImage = {
      url: primaryImage,
      width: 1200,
      height: 1200,
      alt: `${product.name} - Her Kingdom Jewelry Nairobi`,
    }
    return {
      title,
      description,
      keywords: [
        ...generateProductKeywords(product.name, category, product.tags || []),
        ...metaKeywordsFor(`product:${slug}`, 40),
      ],
      alternates: {
        canonical: `${siteUrl}/product/${slug}`,
      },
      authors: [{ name: "Her Kingdom", url: siteUrl }],
      creator: "Her Kingdom",
      openGraph: {
        title,
        description,
        url: `${siteUrl}/product/${slug}`,
        images: [ogImage],
        type: "website",
        siteName: "Her Kingdom",
        locale: "en_KE",
      },
      twitter: {
        card: "summary_large_image",
        site: "@herkingdom_jewelry",
        creator: "@herkingdom_jewelry",
        title,
        description,
        images: [{ url: primaryImage, alt: ogImage.alt }],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
    }
  } catch {
    return { title: "Product Not Found | Her Kingdom" }
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let jsonLd = null
  try {
    const product = await getProductBySlug(slug)
    if (product) {
      jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Product",
            name: product.name,
            description: product.description,
            url: `${siteUrl}/product/${slug}`,
            image: product.images,
            brand: { "@type": "Brand", name: "HerKingdom Jewelry" },
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "KES",
              url: `${siteUrl}/product/${slug}`,
              availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
              seller: {
                "@type": "Organization",
                name: "HerKingdom Jewelry",
                url: siteUrl,
                telephone: "+254717264422",
              },
              itemCondition: "https://schema.org/NewCondition",
            },
            category: product.category,
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "Shop", item: `${siteUrl}/shop` },
              {
                "@type": "ListItem",
                position: 3,
                name: product.category || "Jewelry",
                item: `${siteUrl}/shop?category=${encodeURIComponent(
                  (product.category || "jewelry").toLowerCase().replace(/\s+/g, "-")
                )}`,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: product.name,
                item: `${siteUrl}/product/${slug}`,
              },
            ],
          },
        ],
      }
    }
  } catch {}

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetailPage slug={slug} />
    </>
  )
}
