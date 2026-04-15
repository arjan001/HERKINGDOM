import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { requireAuth, rateLimit, rateLimitResponse } from "@/lib/security"

export async function GET(request: NextRequest) {
  const rl = rateLimit(request, { limit: 30, windowSeconds: 60 })
  if (!rl.success) return rateLimitResponse()
  const auth = await requireAuth()
  if (!auth.authenticated) return auth.response!
  const supabase = await createClient()

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*, delivery_locations(name)")
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Get order items for each order
  const orderIds = (orders || []).map((o) => o.id)
  const { data: items } = await supabase
    .from("order_items")
    .select("*")
    .in("order_id", orderIds.length > 0 ? orderIds : ["none"])

  const itemsByOrder: Record<string, typeof items> = {}
  for (const item of items || []) {
    if (!itemsByOrder[item.order_id]) itemsByOrder[item.order_id] = []
    itemsByOrder[item.order_id].push(item)
  }

  const result = (orders || []).map((o) => ({
    id: o.id,
    orderNo: o.order_no || "",
    customer: o.customer_name,
    phone: o.customer_phone,
    email: o.customer_email || "",
    items: (itemsByOrder[o.id] || []).map((item) => ({
      name: item.product_name,
      qty: item.quantity,
      price: Number(item.product_price),
      variation: item.selected_variations?.type || undefined,
    })),
    subtotal: Number(o.subtotal),
    delivery: Number(o.delivery_fee),
    total: Number(o.total),
    location: o.delivery_locations?.name || o.delivery_address || "",
    address: o.delivery_address || "",
    notes: o.order_notes || "",
    status: o.status,
    orderedVia: o.ordered_via || "website",
    paymentMethod: o.payment_method || "cod",
    mpesaCode: o.mpesa_code || "",
    mpesaPhone: o.mpesa_phone || "",
    mpesaMessage: o.mpesa_message || "",
    date: o.created_at ? new Date(o.created_at).toISOString().split("T")[0] : "",
  }))

  return NextResponse.json(result)
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAuth()
  if (!auth.authenticated) return auth.response!

  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const ids = searchParams.get("ids")

  if (!ids) return NextResponse.json({ error: "Missing ids" }, { status: 400 })

  const idArray = ids.split(",")

  // Delete order items first (foreign key)
  const { error: itemsError } = await supabase
    .from("order_items")
    .delete()
    .in("order_id", idArray)

  if (itemsError) return NextResponse.json({ error: itemsError.message }, { status: 500 })

  // Delete orders
  const { error } = await supabase
    .from("orders")
    .delete()
    .in("id", idArray)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, deleted: idArray.length })
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAuth()
  if (!auth.authenticated) return auth.response!

  const supabase = await createClient()
  const body = await request.json()

  if (!body.id || !body.status) {
    return NextResponse.json({ error: "Missing id or status" }, { status: 400 })
  }

  const { error } = await supabase
    .from("orders")
    .update({ status: body.status })
    .eq("id", body.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
