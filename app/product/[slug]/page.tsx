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
    if (!product) return { title: "Product Not Found | Elani Beauty Hub" }
    const desc = product.description.slice(0, 130) + (product.description.length > 130 ? "..." : "")
    const isThrift = product.condition === "thrift"
    const conditionLabel = isThrift ? "Thrift" : "New"
    return {
      title: `${product.name} | ${conditionLabel} Fashion at Elani Beauty Hub`,
      description: `${desc} Shop ${isThrift ? "quality thrift" : "brand new"} women's fashion at Elani Beauty Hub Nairobi. Tops, dresses, bodysuits & jackets. Fast delivery Kenya. Call 0702642324.`,
      keywords: generateProductKeywords(product.name, product.category, product.tags || []),
      alternates: {
        canonical: `${siteUrl}/product/${slug}`,
      },
      authors: [{ name: "Elani Beauty Hub", url: siteUrl }],
      creator: "Elani Beauty Hub",
      openGraph: {
        title: `${product.name} | ${conditionLabel} Fashion - Elani Beauty Hub`,
        description: `${desc} ${isThrift ? "Quality thrift" : "Brand new"} women's fashion. Tops, dresses, bodysuits & more. Order now at Elani Beauty Hub Kenya.`,
        url: `${siteUrl}/product/${slug}`,
        images: product.images[0] ? [{ url: product.images[0], width: 600, height: 800, alt: `${product.name} - Elani Beauty Hub ${conditionLabel} Fashion` }] : [],
        type: "website",
        siteName: "Elani Beauty Hub",
        locale: "en_KE",
      },
      twitter: {
        card: "summary_large_image",
        site: "@_classycollections",
        creator: "@_classycollections",
        title: `${product.name} | Elani Beauty Hub Nairobi`,
        description: `${desc} Shop ${isThrift ? "thrift" : "new"} fashion at Elani Beauty Hub Kenya.`,
        images: product.images[0] ? [{ url: product.images[0], alt: `${product.name} - Elani Beauty Hub` }] : [],
      },
    }
  } catch {
    return { title: "Product Not Found | Elani Beauty Hub" }
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
        brand: { "@type": "Brand", name: "Elani Beauty Hub" },
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "KES",
          availability: product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          seller: {
            "@type": "Organization",
            name: "Elani Beauty Hub",
            url: siteUrl,
            telephone: "+254702642324",
          },
          itemCondition: product.condition === "thrift"
            ? "https://schema.org/UsedCondition"
            : "https://schema.org/NewCondition",
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
