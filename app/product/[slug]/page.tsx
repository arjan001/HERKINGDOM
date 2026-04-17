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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const product = await getProductBySlug(slug)
    if (!product) return { title: "Product Not Found | Her Kingdom" }
    const desc = product.description.slice(0, 130) + (product.description.length > 130 ? "..." : "")
    const category = product.category || "Jewelry"
    const occasion = inferOccasion(product)
    const title = `${product.name} | Best ${category} Gift Kenya | herkingdomjewelry.shop`
    const description = `Shop ${product.name} at herkingdomjewelry.shop. The best ${category.toLowerCase()} in Nairobi. Perfect for ${occasion} with luxe packaging and same-day delivery. Order via WhatsApp!`
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
        images: product.images[0]
          ? [{
              url: product.images[0],
              width: 600,
              height: 800,
              alt: `${product.name} - herkingdomjewelry.shop Gifting`,
            }]
          : [],
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
        images: product.images[0]
          ? [{
              url: product.images[0],
              alt: `${product.name} - herkingdomjewelry.shop Gifting`,
            }]
          : [],
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
