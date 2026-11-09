"use client"

import { useMemo } from "react"
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

// Simplified world map coordinates (equirectangular projection)
// This is a basic outline - in production you'd use a proper map library
const WORLD_MAP_WIDTH = 1000
const WORLD_MAP_HEIGHT = 500

// Major city coordinates for visitor markers (lon, lat)
const CITY_COORDS: Record<string, [number, number]> = {
  "Nairobi": [36.8219, -1.2921],
  "Mombasa": [39.6682, -4.0435],
  "Kisumu": [34.7517, -0.1022],
  "Nakuru": [36.0800, -0.3031],
  "Eldoret": [35.2698, 0.5143],
  "Thika": [37.0812, -1.0332],
  "Kiambu": [36.8366, -1.1765],
  "New York": [-74.0060, 40.7128],
  "Los Angeles": [-118.2437, 34.0522],
  "London": [-0.1276, 51.5074],
  "Paris": [2.3522, 48.8566],
  "Berlin": [13.4050, 52.5200],
  "Tokyo": [139.6917, 35.6895],
  "Sydney": [151.2093, -33.8688],
  "Toronto": [-79.3832, 43.6532],
  "Vancouver": [-123.1207, 49.2827],
  "Dubai": [55.2708, 25.2048],
  "Mumbai": [72.8777, 19.0760],
  "Delhi": [77.2090, 28.6139],
  "Singapore": [103.8198, 1.3521],
  "Hong Kong": [114.1694, 22.3193],
  "Seoul": [126.9780, 37.5665],
  "Beijing": [116.4074, 39.9042],
  "Shanghai": [121.4737, 31.2304],
  "São Paulo": [-46.6333, -23.5505],
  "Buenos Aires": [-58.3816, -34.6037],
  "Mexico City": [-99.1332, 19.4326],
  "Cairo": [31.2357, 30.0444],
  "Lagos": [3.3792, 6.5244],
  "Johannesburg": [28.0473, -26.2041],
  "Cape Town": [18.4241, -33.9249],
  "Casablanca": [-7.5898, 33.5731],
  "Istanbul": [28.9784, 41.0082],
  "Moscow": [37.6173, 55.7558],
  "Amsterdam": [4.9041, 52.3676],
  "Rome": [12.4964, 41.9028],
  "Madrid": [-3.7038, 40.4168],
  "Stockholm": [18.0686, 59.3293],
  "Oslo": [10.7522, 59.9139],
  "Helsinki": [24.9384, 60.1699],
  "Copenhagen": [12.5683, 55.6761],
  "Vienna": [16.3738, 48.2082],
  "Zurich": [8.5417, 47.3769],
  "Geneva": [6.1432, 46.2044],
  "Brussels": [4.3517, 50.8503],
  "Dublin": [-6.2603, 53.3498],
  "Lisbon": [-9.1393, 38.7223],
  "Athens": [23.7275, 37.9838],
  "Warsaw": [21.0122, 52.2297],
  "Prague": [14.4378, 50.0755],
  "Budapest": [19.0402, 47.4979],
  "Bucharest": [26.1025, 44.4268],
  "Sofia": [23.3219, 42.6977],
  "Belgrade": [20.4489, 44.7866],
  "Zagreb": [15.9819, 45.8150],
  "Ljubljana": [14.5058, 46.0569],
  "Bratislava": [17.1077, 48.1486],
  "Vilnius": [25.2797, 54.6872],
  "Riga": [24.1052, 56.9496],
  "Tallinn": [24.7536, 59.4370],
  "Helsinki": [24.9384, 60.1699],
  "Oslo": [10.7522, 59.9139],
  "Stockholm": [18.0686, 59.3293],
  "Copenhagen": [12.5683, 55.6761],
  "Amsterdam": [4.9041, 52.3676],
  "Brussels": [4.3517, 50.8503],
  "Paris": [2.3522, 48.8566],
  "London": [-0.1276, 51.5074],
  "Dublin": [-6.2603, 53.3498],
  "Lisbon": [-9.1393, 38.7223],
  "Madrid": [-3.7038, 40.4168],
  "Rome": [12.4964, 41.9028],
  "Athens": [23.7275, 37.9838],
  "Istanbul": [28.9784, 41.0082],
  "Moscow": [37.6173, 55.7558],
  "Berlin": [13.4050, 52.5200],
  "Vienna": [16.3738, 48.2082],
  "Zurich": [8.5417, 47.3769],
  "Geneva": [6.1432, 46.2044],
  "Amsterdam": [4.9041, 52.3676],
  "Brussels": [4.3517, 50.8503],
  "Paris": [2.3522, 48.8566],
  "London": [-0.1276, 51.5074],
}

function getCoordinates(city: string, country: string): [number, number] | null {
  // Try city lookup first
  const cityKey = Object.keys(CITY_COORDS).find(k => k.toLowerCase() === city.toLowerCase())
  if (cityKey) return CITY_COORDS[cityKey]
  
  // Try country capital as fallback
  const countryCapitals: Record<string, [number, number]> = {
    "KE": [36.8219, -1.2921], // Kenya - Nairobi
    "US": [-74.0060, 40.7128], // USA - New York
    "GB": [-0.1276, 51.5074], // UK - London
    "CA": [-79.3832, 43.6532], // Canada - Toronto
    "AU": [151.2093, -33.8688], // Australia - Sydney
    "DE": [13.4050, 52.5200], // Germany - Berlin
    "FR": [2.3522, 48.8566], // France - Paris
    "JP": [139.6917, 35.6895], // Japan - Tokyo
    "CN": [116.4074, 39.9042], // China - Beijing
    "IN": [77.2090, 28.6139], // India - Delhi
    "BR": [-46.6333, -23.5505], // Brazil - São Paulo
    "MX": [-99.1332, 19.4326], // Mexico - Mexico City
    "AE": [55.2708, 25.2048], // UAE - Dubai
    "ZA": [28.0473, -26.2041], // South Africa - Johannesburg
    "EG": [31.2357, 30.0444], // Egypt - Cairo
    "NG": [3.3792, 6.5244], // Nigeria - Lagos
    "TR": [28.9784, 41.0082], // Turkey - Istanbul
    "RU": [37.6173, 55.7558], // Russia - Moscow
    "IT": [12.4964, 41.9028], // Italy - Rome
    "ES": [-3.7038, 40.4168], // Spain - Madrid
    "NL": [4.9041, 52.3676], // Netherlands - Amsterdam
    "SE": [18.0686, 59.3293], // Sweden - Stockholm
    "NO": [10.7522, 59.9139], // Norway - Oslo
    "FI": [24.9384, 60.1699], // Finland - Helsinki
    "DK": [12.5683, 55.6761], // Denmark - Copenhagen
    "CH": [8.5417, 47.3769], // Switzerland - Zurich
    "AT": [16.3738, 48.2082], // Austria - Vienna
    "BE": [4.3517, 50.8503], // Belgium - Brussels
    "IE": [-6.2603, 53.3498], // Ireland - Dublin
    "PT": [-9.1393, 38.7223], // Portugal - Lisbon
    "GR": [23.7275, 37.9838], // Greece - Athens
    "PL": [21.0122, 52.2297], // Poland - Warsaw
    "CZ": [14.4378, 50.0755], // Czech Republic - Prague
    "HU": [19.0402, 47.4979], // Hungary - Budapest
    "RO": [26.1025, 44.4268], // Romania - Bucharest
    "BG": [23.3219, 42.6977], // Bulgaria - Sofia
    "RS": [20.4489, 44.7866], // Serbia - Belgrade
    "HR": [15.9819, 45.8150], // Croatia - Zagreb
    "SI": [14.5058, 46.0569], // Slovenia - Ljubljana
    "SK": [17.1077, 48.1486], // Slovakia - Bratislava
    "LT": [25.2797, 54.6872], // Lithuania - Vilnius
    "LV": [24.1052, 56.9496], // Latvia - Riga
    "EE": [24.7536, 59.4370], // Estonia - Tallinn
    "SG": [103.8198, 1.3521], // Singapore
    "HK": [114.1694, 22.3193], // Hong Kong
    "KR": [126.9780, 37.5665], // South Korea - Seoul
    "TH": [100.5018, 13.7563], // Thailand - Bangkok
    "MY": [101.6869, 3.1390], // Malaysia - Kuala Lumpur
    "ID": [106.8456, -6.2088], // Indonesia - Jakarta
    "PH": [120.9842, 14.5995], // Philippines - Manila
    "VN": [105.8342, 21.0278], // Vietnam - Hanoi
    "PK": [73.0479, 33.6844], // Pakistan - Islamabad
    "BD": [90.4125, 23.8103], // Bangladesh - Dhaka
    "LK": [79.8612, 6.9271], // Sri Lanka - Colombo
    "NP": [85.3240, 27.7172], // Nepal - Kathmandu
    "MM": [96.1561, 16.8409], // Myanmar - Yangon
    "KH": [104.9160, 11.5564], // Cambodia - Phnom Penh
    "LA": [102.4955, 17.9757], // Laos - Vientiane
    "MN": [106.9057, 47.8864], // Mongolia - Ulaanbaatar
    "KZ": [71.4491, 51.1694], // Kazakhstan - Astana
    "UZ": [69.2401, 41.2995], // Uzbekistan - Tashkent
    "AZ": [49.8671, 40.4093], // Azerbaijan - Baku
    "GE": [44.8271, 41.7151], // Georgia - Tbilisi
    "AM": [44.5152, 40.1792], // Armenia - Yerevan
    "BY": [27.5615, 53.9045], // Belarus - Minsk
    "UA": [30.5234, 50.4501], // Ukraine - Kyiv
    "MD": [28.8638, 47.0105], // Moldova - Chișinău
    "SA": [46.6753, 24.7136], // Saudi Arabia - Riyadh
    "QA": [51.5310, 25.2854], // Qatar - Doha
    "KW": [47.4818, 29.3759], // Kuwait - Kuwait City
    "BH": [50.5860, 26.2285], // Bahrain - Manama
    "OM": [58.3829, 23.5880], // Oman - Muscat
    "YE": [44.1910, 15.3694], // Yemen - Sana'a
    "IQ": [44.3661, 33.3152], // Iraq - Baghdad
    "IR": [51.3890, 35.6892], // Iran - Tehran
    "AF": [69.2075, 34.5553], // Afghanistan - Kabul
    "PK": [73.0479, 33.6844], // Pakistan - Islamabad
    "IN": [77.2090, 28.6139], // India - Delhi
    "NP": [85.3240, 27.7172], // Nepal - Kathmandu
    "BT": [89.6390, 27.4707], // Bhutan - Thimphu
    "BD": [90.4125, 23.8103], // Bangladesh - Dhaka
    "LK": [79.8612, 6.9271], // Sri Lanka - Colombo
    "MV": [73.5093, 4.1755], // Maldives - Malé
    "AU": [151.2093, -33.8688], // Australia - Sydney
    "NZ": [174.7633, -41.2865], // New Zealand - Wellington
    "FJ": [178.4419, -17.7134], // Fiji - Suva
    "PG": [147.1803, -9.4438], // Papua New Guinea - Port Moresby
    "SB": [160.1562, -9.4456], // Solomon Islands - Honiara
    "VU": [168.3273, -17.7333], // Vanuatu - Port Vila
    "NC": [165.6180, -22.2758], // New Caledonia - Nouméa
    "PF": [-149.4260, -17.6797], // French Polynesia - Papeete
    "WS": [-171.7850, -13.7590], // Samoa - Apia
    "TO": [-175.2048, -21.1393], // Tonga - Nuku'alofa
    "KI": [173.0357, 1.3290], // Kiribati - Tarawa
    "TV": [179.1940, -8.5241], // Tuvalu - Funafuti
    "NR": [166.9201, -0.5478], // Nauru - Yaren
    "PW": [134.5825, 7.5149], // Palau - Ngerulmud
    "FM": [158.0138, 6.9247], // Micronesia - Palikir
    "MH": [171.1845, 7.1315], // Marshall Islands - Majuro
    "TV": [179.1940, -8.5241], // Tuvalu - Funafuti
  }
  if (countryCapitals[country]) return countryCapitals[country]
  
  return null
}

function projectToMap(lon: number, lat: number): { x: number; y: number } {
  // Equirectangular projection
  const x = ((lon + 180) / 360) * WORLD_MAP_WIDTH
  const y = ((90 - lat) / 180) * WORLD_MAP_HEIGHT
  return { x, y }
}

export function LiveMap({ data, realTimeUsers }: LiveMapProps) {
  const markers = useMemo(() => {
    if (!data?.cells) return []
    
    return data.cells
      .map(cell => {
        const coords = getCoordinates(cell.city, cell.country)
        if (!coords) return null
        const [lon, lat] = coords
        const { x, y } = projectToMap(lon, lat)
        return {
          x,
          y,
          city: cell.city,
          country: cell.countryName,
          visitors: cell.visitors,
          views: cell.views,
          latest: cell.latest,
        }
      })
      .filter(Boolean) as { x: number; y: number; city: string; country: string; visitors: number; views: number; latest: string }[]
  }, [data])

  const topCountries = useMemo(() => {
    if (!data?.byCountry) return []
    return data.byCountry.slice(0, 10)
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
        <svg
          viewBox={`0 0 ${WORLD_MAP_WIDTH} ${WORLD_MAP_HEIGHT}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Simplified world outline (basic continents) */}
          <g fill="currentColor" opacity="0.05">
            {/* Africa */}
            <path d="M 500 200 Q 600 150 700 200 Q 750 300 700 400 Q 600 450 500 400 Q 450 300 500 200 Z" />
            {/* Europe */}
            <path d="M 400 100 Q 500 50 600 100 Q 650 150 600 200 Q 500 250 400 200 Q 350 150 400 100 Z" />
            {/* Asia */}
            <path d="M 600 100 Q 800 50 1000 100 Q 950 200 800 250 Q 650 200 600 100 Z" />
            {/* North America */}
            <path d="M 100 100 Q 200 50 300 100 Q 350 200 300 300 Q 200 350 100 300 Q 50 200 100 100 Z" />
            {/* South America */}
            <path d="M 200 350 Q 300 300 400 350 Q 450 450 400 500 Q 300 550 200 500 Q 150 450 200 350 Z" />
            {/* Australia */}
            <path d="M 800 400 Q 900 350 1000 400 Q 950 500 800 500 Q 750 450 800 400 Z" />
          </g>
          
          {/* Visitor markers */}
          {markers.map((marker, i) => {
            const size = Math.max(4, Math.min(20, marker.visitors * 3))
            const opacity = Math.min(1, 0.3 + marker.visitors * 0.1)
            
            return (
              <g key={i}>
                {/* Pulse animation */}
                <circle
                  cx={marker.x}
                  cy={marker.y}
                  r={size * 2}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="1"
                  opacity={opacity * 0.5}
                  className="animate-ping"
                />
                {/* Main marker */}
                <circle
                  cx={marker.x}
                  cy={marker.y}
                  r={size}
                  fill="#3b82f6"
                  opacity={opacity}
                />
                {/* Tooltip */}
                <title>{`${marker.city}, ${marker.country} - ${marker.visitors} visitors, ${marker.views} views`}</title>
              </g>
            )
          })}
        </svg>
        
        {/* Legend overlay */}
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm border border-border rounded-sm p-3 text-xs space-y-2">
          <p className="font-medium text-foreground">Top Locations</p>
          {topCountries.length === 0 ? (
            <p className="text-muted-foreground">No data yet</p>
          ) : (
            topCountries.map((c, i) => (
              <div key={c.country} className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground truncate max-w-[120px]">{c.countryName}</span>
                <span className="font-medium">{c.visitors}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
