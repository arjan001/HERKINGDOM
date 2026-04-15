import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Re-export client-safe media utilities for backward compatibility in server code
export { IMAGE_TYPES, VIDEO_TYPES, MEDIA_TYPES, isVideoUrl, validateUpload, validateMediaUpload } from "@/lib/media-utils"

// ==========================================
// IN-MEMORY RATE LIMITER (per serverless instance)
// ==========================================
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

// Clean up expired entries every 60s
setInterval(() => {
  const now = Date.now()
  for (const [key, val] of rateLimitStore) {
    if (now > val.resetAt) rateLimitStore.delete(key)
  }
}, 60_000)

interface RateLimitConfig {
  /** Max requests allowed */
  limit: number
  /** Time window in seconds */
  windowSeconds: number
}

export function rateLimit(
  request: NextRequest | Request,
  config: RateLimitConfig = { limit: 30, windowSeconds: 60 }
): { success: boolean; remaining: number } {
  const ip =
    (request as NextRequest).headers?.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    (request as NextRequest).headers?.get("x-real-ip") ||
    "unknown"

  const key = `${ip}:${new URL(request.url).pathname}`
  const now = Date.now()
  const record = rateLimitStore.get(key)

  if (!record || now > record.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + config.windowSeconds * 1000 })
    return { success: true, remaining: config.limit - 1 }
  }

  record.count++
  if (record.count > config.limit) {
    return { success: false, remaining: 0 }
  }

  return { success: true, remaining: config.limit - record.count }
}

export function rateLimitResponse() {
  return NextResponse.json(
    { error: "Too many requests. Please slow down." },
    { status: 429, headers: { "Retry-After": "60" } }
  )
}

// ==========================================
// AUTH GUARD (for admin routes)
// ==========================================
export async function requireAuth(): Promise<{
  authenticated: boolean
  response?: NextResponse
}> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return {
        authenticated: false,
        response: NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        ),
      }
    }
    return { authenticated: true }
  } catch {
    return {
      authenticated: false,
      response: NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      ),
    }
  }
}

// ==========================================
// INPUT SANITIZATION
// ==========================================

/** Strip HTML tags, trim, and limit length */
export function sanitize(input: unknown, maxLength = 500): string {
  if (typeof input !== "string") return ""
  return input
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/[<>"'`;\\]/g, "") // strip dangerous chars
    .trim()
    .slice(0, maxLength)
}

/** Validate email format */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 320
}

/** Validate Kenyan phone number - accepts +254, 254, 07, 01, 011 formats */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, "")
  // Accept: +254XXXXXXXXX, 254XXXXXXXXX, 07XXXXXXXX, 01XXXXXXXX, 011XXXXXXX
  return /^(\+?254[17]\d{8}|0[17]\d{8}|011\d{7})$/.test(cleaned)
}

/** Validate M-PESA transaction code format */
export function isValidMpesaCode(code: string): boolean {
  if (!code) return true // optional field
  return /^[A-Z0-9]{8,12}$/.test(code.toUpperCase())
}

/** Sanitize phone for DB search -- prevent wildcard injection */
export function sanitizePhoneSearch(phone: string): string {
  return phone.replace(/[^0-9+]/g, "").slice(0, 15)
}

/** Validate UUID format */
export function isValidUUID(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
}

