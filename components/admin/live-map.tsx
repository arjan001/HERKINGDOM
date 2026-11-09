"use client"

import { useMemo, useState } from "react"
import { Globe } from "lucide-react"

interface LiveMapProps {
  data?: {
    activeVisitors: number
    windowMinutes: number
    cells: { country: string; countryName: string; region: string; city: string; visitors: number; views: number; latest: string }[]
    byCountry: { country: string; countryName: string; visitors: number }[]
  }
  realTimeUsers: number
}

export function LiveMap({ data, realTimeUsers }: LiveMapProps) {
  const [selectedCountry, setSelectedCountry] = useState<{ country: string; countryName: string; visitors: number } | null>(null)

  const markers = useMemo(() => {
    if (!data?.cells) return []
    
    return data.cells
      .map(cell => {
        const coords = getCoordinates(cell.city, cell.country)
        if (!coords) return null
        return {
          x: coords[0],
          y: coords[1],
          city: cell.city,
          country: cell.country,
          countryName: cell.countryName,
          visitors: cell.visitors,
          views: cell.views,
          latest: cell.latest,
        }
      })
      .filter(Boolean) as { x: number; y: number; city: string; country: string; countryName: string; visitors: number; views: number; latest: string }[]
  }, [data])

  const topCountries = useMemo(() => {
    if (!data?.byCountry) return []
    return data.byCountry.slice(0, 10)
  }, [data])

  const handleCountryClick = (countryCode: string, countryName: string) => {
    const countryData = data?.byCountry.find(c => c.country === countryCode)
    if (countryData) {
      setSelectedCountry({ country: countryCode, countryName, visitors: countryData.visitors })
    }
  }

  const countryVisitors = useMemo(() => {
    if (!data?.byCountry) return {}
    const map: Record<string, number> = {}
    data.byCountry.forEach(c => {
      map[c.country] = c.visitors
    })
    return map
  }, [data])

  return (
    <div className="border border-border rounded-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-3.5 w-3.5" />
          <h2 className="text-sm font-semibold">Live Visitor Map</h2>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
            Active Visitors
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-purple-500 rounded-full" />
            Orders
          </span>
          <span className="text-muted-foreground">{realTimeUsers} online</span>
        </div>
      </div>
      
      <div className="relative bg-secondary/20" style={{ height: "400px" }}>
        <img
          src="/world.svg"
          alt="World Map"
          className="w-full h-full object-contain"
          style={{ maxHeight: "400px", opacity: 0.8 }}
          useMap="#world-map"
        />
        
        <map name="world-map">
          {/* Major clickable regions - simplified for SVG overlay */}
          <area shape="rect" coords="45,35 65,55" alt="Africa" onClick={() => handleCountryClick("KE", "Kenya")} className="cursor-pointer" />
          <area shape="rect" coords="20,30 35,45" alt="Europe" onClick={() => handleCountryClick("GB", "United Kingdom")} className="cursor-pointer" />
          <area shape="rect" coords="10,35 30,50" alt="North America" onClick={() => handleCountryClick("US", "United States")} className="cursor-pointer" />
          <area shape="rect" coords="75,30 95,50" alt="Asia" onClick={() => handleCountryClick("JP", "Japan")} className="cursor-pointer" />
          <area shape="rect" coords="85,70 100,85" alt="Australia" onClick={() => handleCountryClick("AU", "Australia")} className="cursor-pointer" />
        </map>
        
        {/* Visitor markers overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {markers.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
              No visitor data yet
            </div>
          ) : markers.map((marker, i) => {
            const size = Math.max(4, Math.min(20, marker.visitors * 3))
            const opacity = Math.min(1, 0.3 + marker.visitors * 0.1)
            
            return (
              <div
                key={i}
                className="absolute pointer-events-auto cursor-pointer"
                style={{
                  left: `${marker.x}%`,
                  top: `${marker.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => handleCountryClick(marker.country, marker.countryName)}
                title={`${marker.city}, ${marker.country} - ${marker.visitors} visitors, ${marker.views} views`}
              >
                {/* Pulse animation */}
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 animate-ping"
                  style={{
                    width: `${size * 2}px`,
                    height: `${size * 2}px`,
                    opacity: opacity * 0.5,
                  }}
                />
                {/* Main marker */}
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    opacity,
                  }}
                />
              </div>
            )
          })}
        </div>
        
        {/* Country detail panel */}
        {selectedCountry && (
          <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm border border-border rounded-sm p-4 shadow-lg max-w-xs">
            <button
              onClick={() => setSelectedCountry(null)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
            <h3 className="font-semibold text-sm">{selectedCountry.countryName}</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">{selectedCountry.visitors}</p>
            <p className="text-xs text-muted-foreground">visitors</p>
          </div>
        )}
        
        {/* Legend overlay */}
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm border border-border rounded-sm p-3 text-xs space-y-2 max-w-[200px]">
          <p className="font-medium text-foreground">Top Locations</p>
          {topCountries.length === 0 ? (
            <p className="text-muted-foreground">No data yet</p>
          ) : (
            topCountries.map((c, i) => (
              <div
                key={c.country}
                className="flex items-center justify-between gap-4 cursor-pointer hover:bg-secondary/50 rounded-sm px-2 py-1"
                onClick={() => handleCountryClick(c.country, c.countryName)}
              >
                <span className="text-muted-foreground truncate flex-1">{c.countryName}</span>
                <span className="font-medium">{c.visitors}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

// Simplified coordinate lookup (for SVG map positioning - 0-100 range)
function getCoordinates(city: string, country: string): [number, number] | null {
  const cityCoords: Record<string, [number, number]> = {
    "Nairobi": [55, 45],
    "Mombasa": [58, 50],
    "Kisumu": [53, 42],
    "Nakuru": [54, 44],
    "Eldoret": [52, 43],
    "Thika": [55, 45],
    "Kiambu": [55, 45],
    "New York": [25, 35],
    "Los Angeles": [12, 38],
    "London": [48, 28],
    "Paris": [50, 30],
    "Berlin": [52, 28],
    "Tokyo": [88, 38],
    "Sydney": [92, 78],
    "Toronto": [26, 32],
    "Vancouver": [14, 32],
    "Dubai": [65, 35],
    "Mumbai": [70, 42],
    "Delhi": [72, 40],
    "Singapore": [80, 50],
    "Hong Kong": [82, 45],
    "Seoul": [85, 38],
    "Beijing": [82, 38],
    "Shanghai": [84, 40],
    "São Paulo": [35, 68],
    "Buenos Aires": [32, 75],
    "Mexico City": [18, 42],
    "Cairo": [58, 32],
    "Lagos": [50, 48],
    "Johannesburg": [55, 72],
    "Cape Town": [54, 75],
    "Casablanca": [45, 35],
    "Istanbul": [55, 32],
    "Moscow": [60, 25],
    "Amsterdam": [49, 28],
    "Rome": [52, 32],
    "Madrid": [45, 32],
    "Stockholm": [53, 25],
    "Oslo": [52, 22],
    "Helsinki": [55, 24],
    "Copenhagen": [52, 26],
    "Vienna": [53, 30],
    "Zurich": [50, 30],
    "Geneva": [50, 31],
    "Brussels": [48, 29],
    "Dublin": [47, 26],
    "Lisbon": [43, 34],
    "Athens": [54, 33],
    "Warsaw": [54, 28],
    "Prague": [52, 29],
    "Budapest": [53, 31],
    "Bucharest": [55, 32],
    "Sofia": [54, 32],
    "Belgrade": [53, 32],
    "Zagreb": [52, 31],
    "Ljubljana": [51, 31],
    "Bratislava": [53, 30],
    "Vilnius": [56, 27],
    "Riga": [55, 26],
    "Tallinn": [54, 25],
  }
  
  const countryCapitals: Record<string, [number, number]> = {
    "KE": [55, 45],
    "US": [25, 35],
    "GB": [48, 28],
    "CA": [26, 32],
    "AU": [92, 78],
    "DE": [52, 28],
    "FR": [50, 30],
    "JP": [88, 38],
    "CN": [82, 38],
    "IN": [72, 40],
    "BR": [35, 68],
    "MX": [18, 42],
    "AE": [65, 35],
    "ZA": [55, 72],
    "EG": [58, 32],
    "NG": [50, 48],
    "TR": [55, 32],
    "RU": [60, 25],
    "IT": [52, 32],
    "ES": [45, 32],
    "NL": [49, 28],
    "SE": [53, 25],
    "NO": [52, 22],
    "FI": [55, 24],
    "DK": [52, 26],
    "CH": [50, 30],
    "AT": [53, 30],
    "BE": [48, 29],
    "IE": [47, 26],
    "PT": [43, 34],
    "GR": [54, 33],
    "PL": [54, 28],
    "CZ": [52, 29],
    "HU": [53, 31],
    "RO": [55, 32],
    "BG": [54, 32],
    "RS": [53, 32],
    "HR": [52, 31],
    "SI": [51, 31],
    "SK": [53, 30],
    "LT": [56, 27],
    "LV": [55, 26],
    "EE": [54, 25],
    "SG": [80, 50],
    "HK": [82, 45],
    "KR": [85, 38],
    "TH": [80, 50],
    "MY": [78, 45],
    "ID": [85, 40],
    "PH": [85, 50],
    "VN": [82, 42],
    "PK": [70, 38],
    "BD": [75, 45],
    "LK": [78, 48],
    "NP": [76, 42],
    "MM": [80, 42],
    "KH": [82, 48],
    "LA": [80, 45],
    "MN": [78, 40],
    "KZ": [70, 38],
    "UZ": [70, 40],
    "AZ": [68, 42],
    "GE": [60, 42],
    "AM": [64, 42],
    "BY": [58, 40],
    "UA": [58, 42],
    "MD": [55, 42],
    "SA": [60, 40],
    "QA": [65, 42],
    "KW": [62, 42],
    "BH": [64, 42],
    "OM": [68, 42],
    "YE": [68, 48],
    "IQ": [62, 40],
    "IR": [65, 40],
    "AF": [70, 42],
  }
  
  const cityKey = Object.keys(cityCoords).find(k => k.toLowerCase() === city.toLowerCase())
  if (cityKey) return cityCoords[cityKey]
  if (countryCapitals[country]) return countryCapitals[country]
  return null
}
