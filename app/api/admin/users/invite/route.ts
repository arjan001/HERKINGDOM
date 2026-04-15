import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  // Verify requesting user is admin or higher (admin, super_admin, or editor)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data: currentUser } = await supabase
    .from("admin_users")
    .select("role")
    .eq("email", user.email)
    .single()

  // Allow admin, super_admin, and editor roles to register users
  const allowedRoles = ["super_admin", "admin", "editor"]
  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    return NextResponse.json({ error: "Only admins and editors can add users" }, { status: 403 })
  }

  const { email, displayName, password, role } = await request.json()

  if (!email || !displayName || !password || !role) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 })
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
  }

  // Editors can only create viewers
  if (currentUser.role === "editor" && role !== "viewer") {
    return NextResponse.json({ error: "Editors can only create viewer accounts" }, { status: 403 })
  }

  const adminClient = createAdminClient()

  // Check if user already exists in auth
  const { data: existingUsers } = await adminClient.auth.admin.listUsers()
  const existingAuth = existingUsers?.users?.find((u) => u.email === email)

  if (existingAuth) {
    return NextResponse.json({ error: "A user with this email already exists" }, { status: 400 })
  }

  // Create auth user with service role (doesn't affect admin's session)
  const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      display_name: displayName,
      role,
    },
  })

  if (createError) {
    return NextResponse.json({ error: createError.message }, { status: 400 })
  }

  // The trigger creates admin_users row, but update to ensure correct role
  // Use email match since the trigger generates its own UUID for admin_users.id
  if (newUser?.user) {
    // Small delay to let trigger complete
    await new Promise((r) => setTimeout(r, 500))

    const { error: updateError } = await adminClient
      .from("admin_users")
      .update({ role, display_name: displayName, is_active: true })
      .eq("email", email)

    // If trigger didn't fire or row doesn't exist, insert directly
    if (updateError) {
      await adminClient
        .from("admin_users")
        .insert({ id: crypto.randomUUID(), email, display_name: displayName, role, is_active: true })
    }
  }

  return NextResponse.json({ success: true })
}
