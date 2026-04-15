"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { SlidersHorizontal, Grid3X3, LayoutList, X, Search, ChevronLeft, ChevronRight, ChevronRight as ChevronRightBreadcrumb } from "lucide-react"
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

const COLLECTION_INFO: Record<string, { label: string; tagline: string; banners: string[] }> = {
  men: {
    label: "Men's Collection",
    tagline: "Stylish watches, necklaces & accessories for the modern man",
    banners: ["/banners/men-page-banner.jpg", "/banners/men-collection.jpg"],
  },
  women: {
    label: "Women's Collection",
    tagline: "Curated necklaces, bracelets, earrings & accessories for every occasion",
    banners: ["/banners/women-page-banner.jpg", "/banners/women-collection.jpg"],
  },
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name", label: "Name A-Z" },
]

function CollectionBanner({ collection }: { collection: string }) {
  const info = COLLECTION_INFO[collection]
  const [currentSlide, setCurrentSlide] = useState(0)
  const banners = info?.banners || []

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }, [banners.length])

  useEffect(() => {
    if (banners.length <= 1) return
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [banners.length, nextSlide])

  if (!info) return null

  return (
    <div className="relative w-full h-[180px] md:h-[220px] overflow-hidden rounded-sm">
      {banners.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === currentSlide ? 1 : 0 }}
        >
          <Image
            src={src}
            alt={`${collection === "men" ? "Men's" : collection === "women" ? "Women's" : "Kali-ttos Little Wardrobe"} denim collection banner`}
            fill
            className="object-cover"
            priority={i === 0}
            title={`${info.label} - ${info.tagline}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
        </div>
      ))}
      <div className="relative z-10 flex items-center h-full px-8 md:px-12">
        <div>
          <p className="text-background/70 text-[10px] tracking-[0.3em] uppercase mb-1.5">Shop</p>
          <h1 className="text-background text-2xl md:text-3xl font-serif font-bold">{info.label}</h1>
          <p className="text-background/70 text-sm mt-1">{info.tagline}</p>
          {info.social && (
            <a
              href={info.social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 bg-background/20 backdrop-blur-sm text-background text-xs font-medium px-3 py-1.5 rounded-full hover:bg-background/30 transition-colors"
              title={`Follow Kali-ttos Little Wardrobe on TikTok`}
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .56.04.82.12v-3.5a6.37 6.37 0 0 0-.82-.05A6.34 6.34 0 0 0 3.15 15.3 6.34 6.34 0 0 0 9.49 21.65 6.34 6.34 0 0 0 15.83 15.3V8.76a8.3 8.3 0 0 0 4.87 1.56V6.87a4.84 4.84 0 0 1-1.11-.18Z" /></svg>
              {info.social.handle}
            </a>
          )}
        </div>
      </div>
      {banners.length > 1 && (
        <div className="absolute bottom-3 right-4 z-10 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)}
            className="p-1 bg-background/20 backdrop-blur-sm rounded-sm hover:bg-background/40 transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5 text-background" />
          </button>
          {banners.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentSlide(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentSlide ? "bg-background" : "bg-background/40"}`}
            />
          ))}
          <button
            type="button"
            onClick={nextSlide}
            className="p-1 bg-background/20 backdrop-blur-sm rounded-sm hover:bg-background/40 transition-colors"
          >
            <ChevronRight className="h-3.5 w-3.5 text-background" />
          </button>
        </div>
      )}
    </div>
  )
}

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

export function CollectionPage({ collection }: { collection: string }) {
  const info = COLLECTION_INFO[collection]
  const { data: allProducts = [] } = useSWR<Product[]>("/api/products", fetcher)
  const { data: categories = [] } = useSWR<Category[]>("/api/categories", fetcher)

  // Filter products by collection (category)
  const collectionProducts = useMemo(() => {
    console.log('[v0] Filtering by collection:', { collection, allProducts: allProducts.length })
    const filtered = allProducts.filter((p) => {
      const match = p.category?.toLowerCase() === collection.charAt(0).toUpperCase() + collection.slice(1).toLowerCase()
      if (!match) console.log('[v0] Product category mismatch:', { product: p.name, category: p.category, collection })
      return match
    })
    console.log('[v0] Filtered products:', filtered.length)
    return filtered
  }, [allProducts, collection])

  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [showNew, setShowNew] = useState(false)
  const [showOffers, setShowOffers] = useState(false)
  const maxProductPrice = collectionProducts.length > 0 ? Math.max(...collectionProducts.map((p) => p.price)) : 10000
  const maxPrice = Math.ceil(maxProductPrice / 100) * 100
  const [priceRange, setPriceRange] = useState([0, maxPrice])
  const [priceInitialized, setPriceInitialized] = useState(false)
  const [gridView, setGridView] = useState<"grid" | "list">("grid")
  const [localSearch, setLocalSearch] = useState("")

  useEffect(() => {
    if (collectionProducts.length > 0 && !priceInitialized) {
      setPriceRange([0, maxPrice])
      setPriceInitialized(true)
    }
  }, [collectionProducts.length, maxPrice, priceInitialized])

  const filtered = useMemo(() => {
    let result = [...collectionProducts]
    if (localSearch) {
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
  }, [collectionProducts, selectedCategory, showNew, showOffers, priceRange, sortBy, localSearch, maxPrice])

  const { paginatedItems, currentPage, totalPages, totalItems, itemsPerPage, goToPage, changePerPage, resetPage } = usePagination(filtered, { defaultPerPage: 12 })

  useEffect(() => { resetPage() }, [selectedCategory, showNew, showOffers, sortBy, localSearch])

  const activeFilters = [
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
        <div className="mx-auto max-w-7xl px-4 py-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              </li>
              <li><ChevronRightBreadcrumb className="h-3.5 w-3.5" /></li>
              <li>
                <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
              </li>
              <li><ChevronRightBreadcrumb className="h-3.5 w-3.5" /></li>
              <li className="text-foreground font-medium">{info?.label || "Collection"}</li>
            </ol>
          </nav>
          {/* Collection Banner */}
          <CollectionBanner collection={collection} />

          <div className="flex items-end justify-between mt-8 mb-6">
            <div>
              <h2 className="text-2xl font-serif font-bold">{info?.label || "Collection"}</h2>
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
                    if (filter === categories.find((c) => c.slug === selectedCategory)?.name) setSelectedCategory("")
                    if (filter === "New Arrivals") setShowNew(false)
                    if (filter === "On Offer") setShowOffers(false)
                    if (String(filter).includes("KSh")) setPriceRange([0, maxPrice])
                  }}><X className="h-3 w-3" /></button>
                </span>
              ))}
              <button type="button" onClick={() => { setSelectedCategory(""); setShowNew(false); setShowOffers(false); setPriceRange([0, maxPrice]); setLocalSearch("") }} className="text-xs text-muted-foreground hover:text-foreground underline">Clear All</button>
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
                  <p className="text-muted-foreground">No products found in this collection yet.</p>
                  <p className="text-sm text-muted-foreground mt-2">Check back soon for new arrivals!</p>
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
