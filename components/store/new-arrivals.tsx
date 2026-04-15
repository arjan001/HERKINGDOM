"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "./product-card"
import type { Product } from "@/lib/types"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function NewArrivals() {
  const { data: products = [] } = useSWR<Product[]>("/api/products", fetcher)
  const newProducts = products.filter((p) => p.isNew)

  // If not enough new products, fill with recent products from different categories
  let displayed = [...newProducts]
  if (displayed.length < 4) {
    const usedIds = new Set(displayed.map((p) => p.id))
    const usedCats = new Set(displayed.map((p) => p.categorySlug))
    // Add products from categories not yet represented
    for (const p of products) {
      if (displayed.length >= 4) break
      if (!usedIds.has(p.id) && !usedCats.has(p.categorySlug)) {
        displayed.push(p)
        usedIds.add(p.id)
        usedCats.add(p.categorySlug)
      }
    }
    // If still not enough, add any remaining
    for (const p of products) {
      if (displayed.length >= 4) break
      if (!usedIds.has(p.id)) {
        displayed.push(p)
        usedIds.add(p.id)
      }
    }
  }

  displayed = displayed.slice(0, 4)

  if (displayed.length === 0) return null

  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Just In
            </p>
            <h2 className="text-2xl lg:text-3xl font-serif font-bold">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop?filter=new"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium hover:text-muted-foreground transition-colors"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {displayed.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
