"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { SlidersHorizontal, Grid3X3, LayoutList, X, Search } from "lucide-react"
import { usePagination } from "@/hooks/use-pagination"
import { PaginationControls } from "@/components/pagination-controls"
import { TopBar } from "./top-bar"
import { Navbar } from "./navbar"
import { Footer } from "./footer"
import { ProductCard } from "./product-card"
import type { Product, Category } from "@/lib/types"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function formatPrice(price: number): string {
  return `KSh ${price.toLocaleString()}`
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name", label: "Name A-Z" },
]

function FilterSidebar({
  categories, selectedCategory, setSelectedCategory, priceRange, setPriceRange, showNew, setShowNew, showOffers, setShowOffers, maxPrice,
}: {
  categories: Category[]; selectedCategory: string; setSelectedCategory: (cat: string) => void; priceRange: number[]; setPriceRange: (range: number[]) => void; showNew: boolean; setShowNew: (show: boolean) => void; showOffers: boolean; setShowOffers: (show: boolean) => void; maxPrice: number
}) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Categories</h3>
        <div className="flex flex-col gap-2">
          <button type="button" onClick={() => setSelectedCategory("")} className={`text-left text-sm py-1.5 transition-colors ${selectedCategory === "" ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}`}>All Categories</button>
          {categories.map((cat) => (
            <button key={cat.id} type="button" onClick={() => setSelectedCategory(cat.slug)} className={`text-left text-sm py-1.5 flex items-center justify-between transition-colors ${selectedCategory === cat.slug ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {cat.name}<span className="text-xs">({cat.productCount})</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Price Range</h3>
        <Slider min={0} max={maxPrice} step={100} value={priceRange} onValueChange={setPriceRange} className="mb-3" />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{formatPrice(priceRange[0])}</span><span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Filter By</h3>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer"><Checkbox checked={showNew} onCheckedChange={(checked) => setShowNew(checked === true)} /><span className="text-sm">New Arrivals</span></label>
          <label className="flex items-center gap-3 cursor-pointer"><Checkbox checked={showOffers} onCheckedChange={(checked) => setShowOffers(checked === true)} /><span className="text-sm">On Offer</span></label>
        </div>
      </div>
    </div>
  )
}

export function ShopPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category") || ""
  const filterParam = searchParams.get("filter") || ""
  const queryParam = searchParams.get("q") || ""

  const { data: products = [] } = useSWR<Product[]>("/api/products", fetcher)
  const { data: categories = [] } = useSWR<Category[]>("/api/categories", fetcher)

  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [sortBy, setSortBy] = useState("newest")
  const [showNew, setShowNew] = useState(filterParam === "new")
  const [showOffers, setShowOffers] = useState(filterParam === "offers")
  const minProductPrice = products.length > 0 ? Math.min(...products.map((p) => p.price)) : 0
  const maxProductPrice = products.length > 0 ? Math.max(...products.map((p) => p.price)) : 10000
  const maxPrice = Math.ceil(maxProductPrice / 100) * 100
  const [priceRange, setPriceRange] = useState([0, maxPrice])
  const [priceInitialized, setPriceInitialized] = useState(false)
  const [gridView, setGridView] = useState<"grid" | "list">("grid")
  const [localSearch, setLocalSearch] = useState(queryParam)

  // Set price range dynamically once products load
  useEffect(() => {
    if (products.length > 0 && !priceInitialized) {
      setPriceRange([0, maxPrice])
      setPriceInitialized(true)
    }
  }, [products.length, maxPrice, priceInitialized])

  const filtered = useMemo(() => {
    let result = [...products]

    if (queryParam) {
      const q = queryParam.toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)))
    }

    if (localSearch && !queryParam) {
      const q = localSearch.toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)))
    }

    if (selectedCategory) result = result.filter((p) => p.categorySlug === selectedCategory)
    if (showNew) result = result.filter((p) => p.isNew)
    if (showOffers) result = result.filter((p) => p.isOnOffer)
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    switch (sortBy) {
      case "price-low": result.sort((a, b) => a.price - b.price); break
      case "price-high": result.sort((a, b) => b.price - a.price); break
      case "name": result.sort((a, b) => a.name.localeCompare(b.name)); break
      default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
    return result
  }, [products, selectedCategory, showNew, showOffers, priceRange, sortBy, queryParam, localSearch])

  const { paginatedItems, currentPage, totalPages, totalItems, itemsPerPage, goToPage, changePerPage, resetPage } = usePagination(filtered, { defaultPerPage: 12 })

  // Reset page when filters change
  useEffect(() => { resetPage() }, [selectedCategory, showNew, showOffers, sortBy, queryParam, localSearch])

  const activeFilters = [
    queryParam && `Search: "${queryParam}"`,
    selectedCategory && categories.find((c) => c.slug === selectedCategory)?.name,
    showNew && "New Arrivals",
    showOffers && "On Offer",
    (priceRange[0] > 0 || priceRange[1] < maxPrice) && `${formatPrice(priceRange[0])} - ${formatPrice(priceRange[1])}`,
  ].filter(Boolean)

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold">{queryParam ? `Results for "${queryParam}"` : "Shop"}</h1>
              <p className="text-sm text-muted-foreground mt-1">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="hidden md:flex items-center border border-border rounded-sm max-w-xs">
              <input type="text" placeholder="Filter products..." value={localSearch} onChange={(e) => setLocalSearch(e.target.value)} className="flex-1 h-9 px-3 bg-background text-sm outline-none" />
              {localSearch && <button type="button" onClick={() => setLocalSearch("")} className="px-2"><X className="h-3.5 w-3.5 text-muted-foreground" /></button>}
              <div className="px-2 border-l border-border"><Search className="h-3.5 w-3.5 text-muted-foreground" /></div>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {activeFilters.map((filter) => (
                <span key={String(filter)} className="flex items-center gap-1.5 bg-secondary text-foreground text-xs px-3 py-1.5 rounded-sm">
                  {String(filter)}
                  <button type="button" onClick={() => {
                    if (String(filter).startsWith("Search:")) window.location.href = "/shop"
                    if (filter === categories.find((c) => c.slug === selectedCategory)?.name) setSelectedCategory("")
                    if (filter === "New Arrivals") setShowNew(false)
                    if (filter === "On Offer") setShowOffers(false)
                    if (String(filter).includes("KSh")) setPriceRange([0, maxPrice])
                  }}><X className="h-3 w-3" /></button>
                </span>
              ))}
              <button type="button" onClick={() => { setSelectedCategory(""); setShowNew(false); setShowOffers(false); setPriceRange([0, maxPrice]); setLocalSearch(""); if (queryParam) window.location.href = "/shop" }} className="text-xs text-muted-foreground hover:text-foreground underline">Clear All</button>
            </div>
          )}

          <div className="flex gap-8">
            <aside className="hidden lg:block w-60 flex-shrink-0">
              <FilterSidebar categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} priceRange={priceRange} setPriceRange={setPriceRange} showNew={showNew} setShowNew={setShowNew} showOffers={showOffers} setShowOffers={setShowOffers} maxPrice={maxPrice} />
            </aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Sheet>
                    <SheetTrigger asChild><Button variant="outline" size="sm" className="lg:hidden bg-transparent"><SlidersHorizontal className="h-4 w-4 mr-2" />Filters</Button></SheetTrigger>
                    <SheetContent side="left" className="w-80 bg-background text-foreground p-6">
                      <h2 className="text-lg font-serif font-semibold mb-6">Filters</h2>
                      <FilterSidebar categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} priceRange={priceRange} setPriceRange={setPriceRange} showNew={showNew} setShowNew={setShowNew} showOffers={showOffers} setShowOffers={setShowOffers} maxPrice={maxPrice} />
                    </SheetContent>
                  </Sheet>
                  <div className="hidden sm:flex items-center border border-border rounded-sm">
                    <button type="button" onClick={() => setGridView("grid")} className={`p-2 ${gridView === "grid" ? "bg-foreground text-background" : ""}`}><Grid3X3 className="h-4 w-4" /></button>
                    <button type="button" onClick={() => setGridView("list")} className={`p-2 ${gridView === "list" ? "bg-foreground text-background" : ""}`}><LayoutList className="h-4 w-4" /></button>
                  </div>
                </div>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm bg-background border border-border px-3 py-2 rounded-sm outline-none">
                  {sortOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">No products found matching your filters.</p>
                  <button type="button" onClick={() => { setSelectedCategory(""); setShowNew(false); setShowOffers(false); setPriceRange([0, maxPrice]); setLocalSearch("") }} className="mt-3 text-sm underline hover:text-muted-foreground">Clear all filters</button>
                </div>
              ) : (
                <>
                  <div className={gridView === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6" : "grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"}>
                    {paginatedItems.map((product) => <ProductCard key={product.id} product={product} />)}
                  </div>
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={(p) => { goToPage(p); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                    onItemsPerPageChange={changePerPage}
                    perPageOptions={[12, 24, 48, 96]}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
