import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elani Beauty Hub Admin Dashboard",
  description: "Admin dashboard for managing beauty products, orders, categories, inventory, and store settings.",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
