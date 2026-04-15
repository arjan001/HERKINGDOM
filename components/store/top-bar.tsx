"use client"

import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function TopBar() {
  const { data } = useSWR("/api/site-data", fetcher)
  const offers: string[] = data?.navbarOffers?.map((o: { text: string }) => o.text) || ["FREE SHIPPING on orders above KSh 5,000"]
  // Repeat offers 4 times to fill viewport and create seamless loop
  const repeated = [...offers, ...offers, ...offers, ...offers]

  return (
    <div className="bg-foreground text-background overflow-hidden">
      <div className="flex whitespace-nowrap py-2">
        <div className="animate-marquee flex gap-8">
          {repeated.map((offer, i) => (
            <span key={i} className="text-xs tracking-widest uppercase font-medium flex-shrink-0">
              {offer}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
