/**
 * Google Analytics 4 (GA4) event tracking utilities
 * Measurement ID: G-XMGFY2BW4V
 * Stream URL: https://herkingdom.shop
 */

export function gtag(...args: unknown[]) {
  if (typeof window === 'undefined') return
  if (!(window as any).gtag) return
  ;(window as any).gtag(...args)
}

export function trackPageView(url?: string, title?: string) {
  gtag('event', 'page_view', {
    page_path: url || window.location.pathname,
    page_title: title || document.title,
    page_location: window.location.href,
  })
}

export function trackViewItem(item: {
  item_id: string
  item_name: string
  item_category?: string
  price?: number
  quantity?: number
}) {
  gtag('event', 'view_item', {
    currency: 'KES',
    value: item.price || 0,
    items: [item],
  })
}

export function trackAddToCart(item: {
  item_id: string
  item_name: string
  item_category?: string
  price?: number
  quantity?: number
}) {
  gtag('event', 'add_to_cart', {
    currency: 'KES',
    value: (item.price || 0) * (item.quantity || 1),
    items: [item],
  })
}

export function trackRemoveFromCart(item: {
  item_id: string
  item_name: string
  item_category?: string
  price?: number
  quantity?: number
}) {
  gtag('event', 'remove_from_cart', {
    currency: 'KES',
    value: (item.price || 0) * (item.quantity || 1),
    items: [item],
  })
}

export function trackBeginCheckout(orderTotal: number, items: Array<{
  item_id: string
  item_name: string
  price?: number
  quantity?: number
}>) {
  gtag('event', 'begin_checkout', {
    currency: 'KES',
    value: orderTotal,
    items: items.map(item => ({
      item_id: item.item_id,
      item_name: item.item_name,
      price: item.price,
      quantity: item.quantity,
    })),
  })
}

export function trackPurchase(orderNumber: string, orderTotal: number, items: Array<{
  item_id: string
  item_name: string
  price?: number
  quantity?: number
}>) {
  gtag('event', 'purchase', {
    transaction_id: orderNumber,
    currency: 'KES',
    value: orderTotal,
    items: items.map(item => ({
      item_id: item.item_id,
      item_name: item.item_name,
      price: item.price,
      quantity: item.quantity,
    })),
  })
}

export function trackSearch(searchTerm: string) {
  gtag('event', 'search', {
    search_term: searchTerm,
  })
}

export function trackSelectItem(item: {
  item_id: string
  item_name: string
  item_category?: string
  price?: number
  quantity?: number
}) {
  gtag('event', 'select_item', {
    currency: 'KES',
    value: item.price || 0,
    items: [item],
  })
}

export function trackAddPaymentInfo(paymentType: string, orderTotal: number) {
  gtag('event', 'add_payment_info', {
    currency: 'KES',
    value: orderTotal,
    payment_type: paymentType,
  })
}

export function trackAddShippingInfo(shippingTier: string, orderTotal: number) {
  gtag('event', 'add_shipping_info', {
    currency: 'KES',
    value: orderTotal,
    shipping_tier: shippingTier,
  })
}
