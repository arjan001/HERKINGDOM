import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from("policies")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: "Policy not found" }, { status: 404 })
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching policy:", error)
    return NextResponse.json({ error: "Failed to fetch policy" }, { status: 500 })
  }
}
