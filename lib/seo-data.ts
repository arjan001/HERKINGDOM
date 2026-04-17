// Core SEO Identity & Keywords — Her Kingdom Jewelry (Nairobi, Kenya)
const DEFAULT_SITE_URL = "https://herkingdom.shop"
const resolvedSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || DEFAULT_SITE_URL).replace(/\/+$/, "")

export const SITE_SEO = {
  siteName: "Her Kingdom",
  siteUrl: resolvedSiteUrl,
  siteTitle: "Her Kingdom | Curated Jewelry & Accessories for Women in Nairobi, Kenya",
  siteDescription:
    "Shop curated jewelry, necklaces, bracelets, earrings, watches & accessories at Her Kingdom Nairobi. Hypoallergenic, long-lasting pieces that complement your personal style. Order online or WhatsApp +254717264422.",
  phone: "+254717264422",
  phoneDisplay: "0717 264 422",
  email: "herkingdomlive@gmail.com",
  instagram: "@herkingdom_jewelry",
  tiktok: "@herkingdom_jewelry",
  twitter: "@herkingdom_jewelry",
  whatsapp: "254717264422",
  address: "Nairobi, Kenya",

  // 500+ SEO Keywords — comprehensive, brand-focused, product-specific for jewelry
  allKeywords: [
    // ========== BRAND KEYWORDS ==========
    "Her Kingdom",
    "Her Kingdom jewelry",
    "Her Kingdom Nairobi",
    "Her Kingdom Kenya",
    "Her Kingdom online store",
    "Her Kingdom accessories",
    "Her Kingdom necklaces",
    "Her Kingdom bracelets",
    "Her Kingdom earrings",
    "Her Kingdom watches",
    "Her Kingdom jewelry shop",
    "Her Kingdom handbags",
    "Her Kingdom gift packages",
    "Her Kingdom women jewelry",
    "Her Kingdom delivery",
    "Her Kingdom order",
    "Her Kingdom WhatsApp",
    "Her Kingdom prices",
    "Her Kingdom offers",
    "Her Kingdom new arrivals",
    "Her Kingdom sale",
    "Her Kingdom deals",
    "Her Kingdom best seller",
    "Her Kingdom reviews",
    "Her Kingdom affordable jewelry",
    "Her Kingdom quality",
    "Her Kingdom hypoallergenic",
    "Her Kingdom curated jewelry",
    "Her Kingdom contact",
    "Her Kingdom location",
    "Her Kingdom Instagram",
    "Her Kingdom TikTok",
    "herkingdom",
    "herkingdom.co.ke",
    "HerkingdomBabe",
    "Her Kingdom collection",
    "Her Kingdom catalogue",
    "Her Kingdom pieces",

    // ========== JEWELRY GENERAL ==========
    "jewelry shop Nairobi",
    "jewelry store Kenya",
    "jewelry online Kenya",
    "buy jewelry Nairobi",
    "best jewelry shop Nairobi",
    "best jewelry store Kenya",
    "affordable jewelry Kenya",
    "quality jewelry Nairobi",
    "jewelry shopping online Kenya",
    "jewelry boutique Nairobi",
    "women jewelry Kenya",
    "fashion jewelry Nairobi",
    "costume jewelry Kenya",
    "statement jewelry Nairobi",
    "everyday jewelry Kenya",
    "minimalist jewelry Nairobi",
    "trendy jewelry Kenya",
    "elegant jewelry Nairobi",
    "luxury jewelry Kenya",
    "designer jewelry Nairobi",
    "handpicked jewelry Kenya",
    "curated jewelry Nairobi",
    "hypoallergenic jewelry Kenya",
    "nickel free jewelry Nairobi",
    "long lasting jewelry Kenya",
    "durable jewelry Nairobi",

    // ========== NECKLACES ==========
    "necklaces Nairobi",
    "necklaces Kenya",
    "buy necklaces online Kenya",
    "chain necklaces Nairobi",
    "pendant necklaces Kenya",
    "layered necklaces Nairobi",
    "choker necklaces Kenya",
    "statement necklaces Nairobi",
    "gold necklaces Kenya",
    "silver necklaces Nairobi",
    "pearl necklaces Kenya",
    "beaded necklaces Nairobi",
    "necklace sets Nairobi",
    "necklace sets Kenya",
    "matching necklace set",
    "necklace and earring set",
    "men necklaces Nairobi",
    "men necklaces Kenya",
    "men chain necklace",

    // ========== BRACELETS ==========
    "bracelets Nairobi",
    "bracelets Kenya",
    "buy bracelets online Kenya",
    "charm bracelets Nairobi",
    "bangle bracelets Kenya",
    "beaded bracelets Nairobi",
    "cuff bracelets Kenya",
    "tennis bracelets Nairobi",
    "friendship bracelets Kenya",
    "gold bracelets Nairobi",
    "silver bracelets Kenya",
    "stackable bracelets Nairobi",

    // ========== EARRINGS ==========
    "earrings Nairobi",
    "earrings Kenya",
    "buy earrings online Kenya",
    "stud earrings Nairobi",
    "hoop earrings Kenya",
    "drop earrings Nairobi",
    "dangle earrings Kenya",
    "statement earrings Nairobi",
    "gold earrings Kenya",
    "silver earrings Nairobi",
    "pearl earrings Kenya",
    "clip on earrings Nairobi",
    "huggie earrings Kenya",

    // ========== WATCHES ==========
    "watches Nairobi",
    "watches Kenya",
    "buy watches online Kenya",
    "women watches Nairobi",
    "women watches Kenya",
    "men watches Nairobi",
    "men watches Kenya",
    "fashion watches Nairobi",
    "dress watches Kenya",
    "casual watches Nairobi",
    "luxury watches Kenya",
    "affordable watches Nairobi",

    // ========== HANDBAGS & ACCESSORIES ==========
    "handbags Nairobi",
    "handbags Kenya",
    "purses Nairobi",
    "purses Kenya",
    "sunglasses Nairobi",
    "sunglasses Kenya",
    "women sunglasses Nairobi",
    "men sunglasses Kenya",
    "sunglasses cases Kenya",
    "scarves Nairobi",
    "shawls Kenya",
    "ponchos Nairobi",
    "perfume Nairobi",
    "scents Kenya",
    "women accessories Nairobi",
    "fashion accessories Kenya",
    "accessories shop Nairobi",
    "accessories store Kenya",

    // ========== GIFTING ==========
    "gift packages Nairobi",
    "gift packages Kenya",
    "jewelry gifts Nairobi",
    "jewelry gifts Kenya",
    "gift for her Nairobi",
    "gift for girlfriend Kenya",
    "valentine gift Nairobi",
    "birthday gift jewelry Kenya",
    "anniversary gift Nairobi",
    "bridal jewelry Nairobi",
    "bridesmaid gifts Kenya",
    "mothers day gift jewelry",
    "christmas gift jewelry Kenya",
    "flowers Nairobi",
    "flowers and jewelry gift Kenya",

    // ========== OCCASIONS ==========
    "wedding jewelry Nairobi",
    "bridal accessories Kenya",
    "party jewelry Nairobi",
    "office jewelry Kenya",
    "casual jewelry Nairobi",
    "date night jewelry Kenya",
    "prom jewelry Nairobi",
    "graduation jewelry Kenya",

    // ========== LOCATION-BASED ==========
    "jewelry Westlands",
    "jewelry CBD Nairobi",
    "jewelry Kilimani",
    "jewelry Karen",
    "jewelry Kileleshwa",
    "jewelry Lavington",
    "jewelry South B",
    "jewelry South C",
    "jewelry Eastlands",
    "jewelry Mombasa",
    "jewelry Kisumu",
    "jewelry Nakuru",
    "jewelry Eldoret",
    "jewelry Thika",
    "jewelry delivery Nairobi",
    "jewelry delivery Kenya",
    "same day jewelry delivery Nairobi",

    // ========== PAYMENT & DELIVERY ==========
    "M-Pesa jewelry Kenya",
    "cash on delivery jewelry Nairobi",
    "buy jewelry M-Pesa",
    "order jewelry online Kenya",
    "free delivery jewelry Nairobi",
    "affordable delivery Kenya",

    // ========== TRENDING / LIFESTYLE ==========
    "trending jewelry Kenya",
    "trending accessories Nairobi",
    "celebrity jewelry Kenya",
    "influencer jewelry Nairobi",
    "Kenyan jewelry brand",
    "African jewelry Nairobi",
    "African inspired jewelry Kenya",
    "boho jewelry Nairobi",
    "vintage jewelry Kenya",
    "modern jewelry Nairobi",
    "chic accessories Kenya",
    "Instagram jewelry shop Kenya",
    "TikTok jewelry Kenya",
    "jewelry haul Kenya",
    "jewelry try on Nairobi",
    "jewelry unboxing Kenya",
    "accessories haul Kenya",
  ],
}

// Page-specific SEO metadata
export const PAGE_SEO = {
  home: {
    title: "Her Kingdom | Curated Jewelry & Accessories in Nairobi, Kenya",
    description:
      "Shop curated jewelry, necklaces, bracelets, earrings, watches & accessories at Her Kingdom Nairobi. Hypoallergenic, long-lasting pieces. Free delivery on orders over KSh 5,000. WhatsApp +254717264422.",
  },
  shop: {
    title: "Shop All Jewelry & Accessories | Her Kingdom Nairobi",
    description:
      "Browse our full collection of curated necklaces, bracelets, earrings, watches, handbags & accessories. Affordable, hypoallergenic jewelry delivered across Kenya.",
  },
  womenCollection: {
    title: "Women's Jewelry & Accessories | Her Kingdom Nairobi",
    description:
      "Discover curated women's necklaces, bracelets, earrings, watches, handbags & accessories at Her Kingdom. Elegant, hypoallergenic pieces for every occasion. Delivery across Kenya.",
  },
  menCollection: {
    title: "Men's Jewelry & Accessories | Her Kingdom Nairobi",
    description:
      "Shop men's necklaces, watches, sunglasses & accessories at Her Kingdom Nairobi. Quality, stylish pieces for the modern man. Delivery across Kenya.",
  },
  babyShop: {
    title: "Gift Packages & Flowers | Her Kingdom Nairobi",
    description:
      "Explore curated gift packages, flowers & accessories at Her Kingdom. Perfect gifts for birthdays, anniversaries, Valentine's Day & special occasions. Delivery across Kenya.",
  },
  newArrivals: {
    title: "New Arrivals - Latest Jewelry & Accessories | Her Kingdom",
    description:
      "Discover the latest jewelry arrivals at Her Kingdom Nairobi. New necklaces, bracelets, earrings, watches & accessories added weekly. Shop the newest pieces first.",
  },
  offers: {
    title: "Jewelry Offers & Deals | Her Kingdom Nairobi",
    description:
      "Don't miss the best jewelry deals at Her Kingdom. Shop discounted necklaces, bracelets, earrings & accessories. Affordable luxury delivered across Kenya.",
  },
  trackOrder: {
    title: "Track Your Order | Her Kingdom",
    description: "Track your Her Kingdom jewelry order in real-time. Enter your order number to see delivery status and estimated arrival.",
  },
  delivery: {
    title: "Delivery Locations & Fees | Her Kingdom",
    description: "Her Kingdom delivers jewelry & accessories across Kenya. Check delivery fees for Nairobi, Mombasa, Kisumu, Nakuru & more locations.",
  },
  wishlist: {
    title: "My Wishlist | Her Kingdom",
    description: "View your saved jewelry pieces and accessories from Her Kingdom. Add items to your wishlist and shop them later.",
  },
  privacyPolicy: {
    title: "Privacy Policy | Her Kingdom",
    description: "Read Her Kingdom's privacy policy. Learn how we protect your personal data and information when shopping with us.",
  },
  termsOfService: {
    title: "Terms of Service | Her Kingdom",
    description: "Read Her Kingdom's terms and conditions for online jewelry purchases, delivery, returns and refund policies.",
  },
  refundPolicy: {
    title: "Refund Policy | Her Kingdom",
    description: "Learn about Her Kingdom's refund and exchange policy for jewelry and accessories. Customer satisfaction guaranteed.",
  },
  paymentsPolicy: {
    title: "Payments Policy | Her Kingdom — M-PESA, Card & Cash on Delivery",
    description:
      "How payments work at Her Kingdom — M-PESA Lipa Na, card payments, processing times, gift packaging, free delivery above KSh 7,000, receipts, and WhatsApp support.",
  },
  checkout: {
    title: "Checkout | Her Kingdom",
    description: "Complete your Her Kingdom jewelry order. Secure checkout with M-Pesa and cash on delivery options.",
  },
}

// Page-specific keyword groups
export const PAGE_KEYWORDS = {
  home: [
    "Her Kingdom", "jewelry Nairobi", "jewelry Kenya", "necklaces", "bracelets", "earrings",
    "watches", "handbags", "accessories", "curated jewelry", "hypoallergenic jewelry",
    "affordable jewelry Kenya", "jewelry online Kenya", "women jewelry Nairobi",
    "gift packages Kenya", "jewelry delivery Nairobi", "HerkingdomBabe",
  ],
  shop: [
    "shop jewelry Kenya", "buy jewelry online", "necklaces", "bracelets", "earrings",
    "watches", "handbags", "accessories Nairobi", "affordable jewelry",
    "jewelry store Kenya", "fashion accessories", "statement jewelry",
  ],
  womenCollection: [
    "women jewelry Kenya", "women necklaces", "women bracelets", "women earrings",
    "women watches", "women accessories", "women handbags", "women sunglasses",
    "scarves", "shawls", "curated jewelry women", "hypoallergenic earrings",
    "Her Kingdom women", "ladies jewelry Nairobi",
  ],
  menCollection: [
    "men jewelry Kenya", "men necklaces", "men watches", "men sunglasses",
    "men accessories", "men chains", "men bracelets", "Her Kingdom men",
    "men fashion accessories Nairobi",
  ],
  babyShop: [
    "gift packages Kenya", "flowers Nairobi", "jewelry gifts", "gift for her",
    "birthday gift jewelry", "valentine gift", "anniversary gift",
    "bridesmaid gifts Kenya", "Her Kingdom gifts",
  ],
  newArrivals: [
    "new jewelry Kenya", "latest necklaces", "new earrings", "new bracelets",
    "new arrivals jewelry", "trending jewelry Kenya", "Her Kingdom new",
  ],
  offers: [
    "jewelry deals Kenya", "jewelry offers Nairobi", "discounted jewelry",
    "affordable jewelry sale", "Her Kingdom offers", "jewelry clearance Kenya",
  ],
  trackOrder: [
    "track order Her Kingdom", "order tracking Kenya", "jewelry delivery status",
  ],
  delivery: [
    "jewelry delivery Nairobi", "delivery locations Kenya", "delivery fees jewelry",
    "same day delivery Nairobi", "Her Kingdom delivery",
  ],
  wishlist: [
    "jewelry wishlist", "saved jewelry", "Her Kingdom wishlist",
  ],
  paymentsPolicy: [
    "payments policy", "Her Kingdom payments", "M-PESA Lipa Na", "Lipa Na M-PESA Kenya",
    "Kenya jewelry payments", "pay jewelry online Kenya", "card payment jewelry Kenya",
    "cash on delivery jewelry Nairobi", "delivery policy Kenya", "free delivery above KSh 7000",
    "Her Kingdom payment methods", "jewelry receipt Her Kingdom",
  ],
}

// Generate product-specific keywords
export function generateProductKeywords(name: string, category: string, tags: string[]): string[] {
  const base = [
    name,
    `${name} Her Kingdom`,
    `${name} Nairobi`,
    `${name} Kenya`,
    `buy ${name} online`,
    `${category} Nairobi`,
    `${category} Kenya`,
    `${category} Her Kingdom`,
    "jewelry Nairobi",
    "jewelry Kenya",
    "Her Kingdom",
    "HerkingdomBabe",
    ...tags,
  ]
  return [...new Set(base.filter(Boolean))]
}

// Generate category-specific keywords for category-filtered shop views
export function generateCategoryKeywords(name: string): string[] {
  const lower = name.toLowerCase()
  const base = [
    lower,
    `${lower} Kenya`,
    `${lower} Nairobi`,
    `buy ${lower} online`,
    `${lower} Her Kingdom`,
    `affordable ${lower} Kenya`,
    `${lower} delivery Nairobi`,
    `shop ${lower}`,
    "jewelry Nairobi",
    "jewelry Kenya",
    "Her Kingdom",
    "HerkingdomBabe",
  ]
  return [...new Set(base.filter(Boolean))]
}

// Build a category-specific page title/description pair
export function buildCategorySeo(name: string, description: string, productCount: number) {
  const title = `${name} | Shop ${name} Jewelry & Accessories at Her Kingdom Nairobi`
  const fallbackDescription = `Shop ${name.toLowerCase()} at Her Kingdom Nairobi. ${
    productCount > 0 ? `Browse ${productCount} curated ${name.toLowerCase()} pieces. ` : ""
  }Hypoallergenic, long-lasting jewelry & accessories delivered across Kenya. WhatsApp +254717264422.`
  return {
    title,
    description: (description && description.trim().length > 0 ? description : fallbackDescription).slice(0, 300),
  }
}
