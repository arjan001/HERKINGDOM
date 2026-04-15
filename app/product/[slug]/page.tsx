import { ProductDetailPage } from "@/components/store/product-detail-page"
import { getProductBySlug } from "@/lib/supabase-data"
import type { Metadata } from "next"
import { SITE_SEO, generateProductKeywords } from "@/lib/seo-data"

export const dynamic = "force-dynamic"

const siteUrl = SITE_SEO.siteUrl

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const product = await getProductBySlug(slug)
    if (!product) return { title: "Product Not Found | Her Kingdom" }
    const desc = product.description.slice(0, 130) + (product.description.length > 130 ? "..." : "")
    return {
      title: `${product.name} | Her Kingdom Jewelry`,
      description: `${desc} Shop curated jewelry & accessories at Her Kingdom Nairobi. Necklaces, bracelets, earrings & more. Delivery across Kenya. WhatsApp +254717264422.`,
      keywords: generateProductKeywords(product.name, product.category, product.tags || []),
      alternates: {
        canonical: `${siteUrl}/product/${slug}`,
      },
      authors: [{ name: "Her Kingdom", url: siteUrl }],
      creator: "Her Kingdom",
      openGraph: {
        title: `${product.name} | Her Kingdom Jewelry`,
        description: `${desc} Curated jewelry & accessories. Order now at Her Kingdom Kenya.`,
        url: `${siteUrl}/product/${slug}`,
        images: product.images[0] ? [{ url: product.images[0], width: 600, height: 800, alt: `${product.name} - Her Kingdom Jewelry` }] : [],
        type: "website",
        siteName: "Her Kingdom",
        locale: "en_KE",
      },
      twitter: {
        card: "summary_large_image",
        site: "@herkingdom_jewelry",
        creator: "@herkingdom_jewelry",
        title: `${product.name} | Her Kingdom`,
        description: `${desc} Shop jewelry & accessories at Her Kingdom Kenya.`,
        images: product.images[0] ? [{ url: product.images[0], alt: `${product.name} - Her Kingdom` }] : [],
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
        "@type": "Product",
        name: product.name,
        description: product.description,
        url: `${siteUrl}/product/${slug}`,
        image: product.images,
        brand: { "@type": "Brand", name: "Her Kingdom" },
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "KES",
          availability: product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          seller: {
            "@type": "Organization",
            name: "Her Kingdom",
            url: siteUrl,
            telephone: "+254717264422",
          },
          itemCondition: "https://schema.org/NewCondition",
        },
        category: product.category,
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
