"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import type { CartItem, Product } from "./types"

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, variations?: Record<string, string>) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
}

const CART_KEY = "classy-collections-cart"

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    const stored = sessionStorage.getItem(CART_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return
  try {
    sessionStorage.setItem(CART_KEY, JSON.stringify(items))
  } catch {
    // silently fail
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from sessionStorage on mount
  useEffect(() => {
    const stored = loadCart()
    if (stored.length > 0) {
      setItems(stored)
    }
    setHydrated(true)
  }, [])

  // Persist to sessionStorage whenever items change (after hydration)
  useEffect(() => {
    if (hydrated) {
      saveCart(items)
    }
  }, [items, hydrated])

  const addItem = useCallback((product: Product, quantity = 1, variations?: Record<string, string>) => {
    setItems((prev) => {
      const variationKey = variations ? JSON.stringify(variations) : ""
      const existing = prev.find(
        (item) => item.product.id === product.id && JSON.stringify(item.selectedVariations || {}) === (variationKey || "{}")
      )
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && JSON.stringify(item.selectedVariations || {}) === (variationKey || "{}")
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { product, quantity, selectedVariations: variations }]
    })
    setIsCartOpen(true)
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId))
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
