export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  categorySlug: string
  description: string
  variations?: ProductVariation[]
  tags: string[]
  isNew?: boolean
  isOnOffer?: boolean
  offerPercentage?: number
  inStock: boolean
  collection?: string
  createdAt: string
}

export interface HeroBanner {
  id: string
  title: string
  subtitle: string
  collection: string
  bannerImage: string
  linkUrl: string
  buttonText: string
  sortOrder: number
}

export interface ProductVariation {
  type: string
  options: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  productCount: number
}

export interface CartItem {
  product: Product
  quantity: number
  selectedVariations?: Record<string, string>
}

export interface Offer {
  id: string
  title: string
  description: string
  discount: string
  image: string
  validUntil: string
}

export interface DeliveryLocation {
  id: string
  name: string
  fee: number
  estimatedDays: string
}
