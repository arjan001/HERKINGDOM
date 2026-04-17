"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { pickKeywords, keywordToShopHref } from "@/lib/seo-keyword-engine"

/**
 * Footer SEO link cloud.
 *
 * Client component, but because Next.js SSR renders this to HTML on the
 * first response, Googlebot sees the anchor text without executing JS.
 * The set of keywords is seeded off the current pathname so every page
 * surfaces a different slice of the 10,000+ keyword matrix — Google
 * crawls the entire cluster by walking the site.
 */
export function SeoLinkCloud({ count = 50 }: { count?: number }) {
  const pathname = usePathname() || "/"
  const keywords = pickKeywords(count, pathname)

  return (
    <section
      aria-labelledby="seo-cluster-heading"
      className="border-t border-background/10 bg-foreground text-background/60"
    >
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h2
          id="seo-cluster-heading"
          className="text-[11px] uppercase tracking-[0.25em] text-background/70 mb-4"
        >
          Shop by Intent — Popular Gift Searches on herkingdom.shop
        </h2>
        <ul className="flex flex-wrap gap-x-3 gap-y-2 text-[11px] leading-tight">
          {keywords.map((k) => (
            <li key={k.slug}>
              <Link
                href={keywordToShopHref(k)}
                className="inline-block hover:text-background transition-colors"
                title={k.text}
              >
                {k.text}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[11px] text-background/40 leading-relaxed">
          Explore the full catalogue of{" "}
          <Link href="/shop?category=necklaces" className="underline hover:text-background">
            minimalist jewelry Nairobi
          </Link>
          ,{" "}
          <Link href="/shop?category=mens-watches" className="underline hover:text-background">
            luxury watches for men Kenya
          </Link>
          ,{" "}
          <Link href="/shop?category=gift-packages" className="underline hover:text-background">
            Mother's Day Gift Package Kenya
          </Link>{" "}
          and the{" "}
          <Link href="/shop?occasion=valentines" className="underline hover:text-background">
            Valentine's Card herkingdomjewelry.shop
          </Link>{" "}
          range — always with the best packaging cover for gifts and same-day
          Nairobi delivery. The{" "}
          <Link href="/shop" className="underline hover:text-background">
            best gift for girlfriend herkingdomjewelry.shop
          </Link>{" "}
          is a single WhatsApp away.
        </p>
      </div>
    </section>
  )
}
