/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    cpus: 2,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "cuoriplmfomxhguikxcv.supabase.co" },
      { protocol: "https", hostname: "egxwrxzhcckraclbwipf.supabase.co" },
    ],
  },
}

export default nextConfig
