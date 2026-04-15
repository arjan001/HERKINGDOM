"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "./product-card"
import type { Product } from "@/lib/types"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function getMixedProducts(products: Product[], count: number): Product[] {
  // Group products by category
  const byCategory: Record<string, Product[]> = {}
  for (const p of products) {
    const cat = p.categorySlug || "other"
    if (!byCategory[cat]) byCategory[cat] = []
    byCategory[cat].push(p)
  }

  const categories = Object.keys(byCategory)
  if (categories.length === 0) return []

  // Round-robin pick from each category to get a nice mix
  const result: Product[] = []
  const indices: Record<string, number> = {}
  for (const cat of categories) indices[cat] = 0

  while (result.length < count) {
    let added = false
    for (const cat of categories) {
      if (result.length >= count) break
      if (indices[cat] < byCategory[cat].length) {
        result.push(byCategory[cat][indices[cat]])
        indices[cat]++
        added = true
      }
    }
    if (!added) break
  }
  return result
}

export function FeaturedProducts() {
  const { data: products = [] } = useSWR<Product[]>("/api/products", fetcher)

  // Prioritize featured/offer/new items but mix from all categories
  const prioritized = [...products].sort((a, b) => {
    const aScore = (a.isOnOffer ? 2 : 0) + (a.isNew ? 1 : 0)
    const bScore = (b.isOnOffer ? 2 : 0) + (b.isNew ? 1 : 0)
    return bScore - aScore
  })

  const featured = getMixedProducts(prioritized, 8)

  if (featured.length === 0) return null

  return (
    <section className="py-14 lg:py-20 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Curated For You
            </p>
            <h2 className="text-2xl lg:text-3xl font-serif font-bold">
              Featured Products
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium hover:text-muted-foreground transition-colors"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
