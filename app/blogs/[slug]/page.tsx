import { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogDetailPage } from "@/components/store/blog-detail-page"
import { SITE_SEO } from "@/lib/seo-data"

const siteUrl = SITE_SEO.siteUrl

type BlogFetched = {
  post: {
    id: string
    slug: string
    title: string
    excerpt: string | null
    cover_image: string | null
    author: string
    tags: string[]
    category: string | null
    read_time_minutes: number | null
    published_at: string
  }
}

async function fetchPost(slug: string): Promise<BlogFetched["post"] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || siteUrl}/api/blogs/${slug}`,
      { next: { revalidate: 300 } }
    )
    if (!res.ok) return null
    const data = (await res.json()) as BlogFetched
    return data.post || null
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPost(slug)
  if (!post) return { title: "Story Not Found" }

  const title = `${post.title} | The Her Kingdom Journal`
  const description = post.excerpt || `${post.title} — a story from the Her Kingdom Journal.`
  const canonical = `${siteUrl}/blogs/${post.slug}`
  const image = post.cover_image || `${siteUrl}/og-default.jpg`

  return {
    title,
    description,
    keywords: [...(post.tags || []), "Her Kingdom", "Nairobi jewelry", "style journal"],
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description,
      url: canonical,
      type: "article",
      siteName: "Her Kingdom",
      locale: "en_KE",
      publishedTime: post.published_at,
      authors: [post.author],
      tags: post.tags || [],
      images: [{ url: image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [{ url: image, alt: post.title }],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await fetchPost(slug)
  if (!post) notFound()

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image ? [post.cover_image] : undefined,
    datePublished: post.published_at,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Her Kingdom",
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: `${siteUrl}/blogs/${post.slug}`,
    keywords: (post.tags || []).join(", "),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogDetailPage slug={slug} />
    </>
  )
}
