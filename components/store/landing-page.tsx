"use client"

import { TopBar } from "./top-bar"
import { Navbar } from "./navbar"
import { Hero } from "./hero"
import { FeaturedProducts } from "./featured-products"
import { OfferBanner } from "./offer-banner"
import { NewArrivals } from "./new-arrivals"
import { OnOfferProducts } from "./on-offer-products"
import { Newsletter } from "./newsletter"

import { Footer } from "./footer"
import { OfferModal } from "./offer-modal"
import { RecentPurchase } from "./recent-purchase"

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedProducts />
        <OfferBanner />
        <NewArrivals />
        <OnOfferProducts />
        <Newsletter />
      </main>
      <Footer />
      <OfferModal />
      <RecentPurchase />
    </div>
  )
}
