import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { requireAuth, rateLimit, rateLimitResponse } from "@/lib/security"

export async function GET(request: NextRequest) {
  const rl = rateLimit(request, { limit: 30, windowSeconds: 60 })
  if (!rl.success) return rateLimitResponse()
  const auth = await requireAuth()
  if (!auth.authenticated) return auth.response!
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(request: NextRequest) {
  const auth = await requireAuth()
  if (!auth.authenticated) return auth.response!
  const supabase = await createClient()
  const body = await request.json()

  const { data: current } = await supabase.from("site_settings").select("id").limit(1).single()
  if (!current) return NextResponse.json({ error: "No settings row found" }, { status: 404 })

  const { error } = await supabase
    .from("site_settings")
    .update({
      store_name: body.storeName,
      store_email: body.storeEmail,
      store_phone: body.storePhone,
      whatsapp_number: body.whatsappNumber,
      currency_symbol: body.currency,
      free_shipping_threshold: body.freeShippingThreshold,
      enable_whatsapp_checkout: body.enableWhatsappCheckout,
      maintenance_mode: body.maintenanceMode,
      site_title: body.metaTitle,
      site_description: body.metaDescription,
      meta_keywords: body.metaKeywords,
      primary_color: body.primaryColor,
      logo_image_url: body.logoUrl,
      favicon_url: body.faviconUrl,
      footer_description: body.footerText,
      footer_instagram: body.socialInstagram,
      footer_tiktok: body.socialTiktok,
      footer_twitter: body.socialTwitter,
      show_newsletter: body.enableNewsletter,
    })
    .eq("id", current.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
