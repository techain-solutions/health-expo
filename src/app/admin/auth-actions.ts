"use server";

import { redirect } from "next/navigation";

import { resolveStaffIdentity } from "@/lib/auth/session";
import { hasSupabaseEnvironment } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

function loginRedirect(error: "configuration" | "invalid", nextPath?: string): never {
  const search = new URLSearchParams({ error });
  if (nextPath) search.set("next", nextPath);
  redirect(`/admin/login?${search.toString()}`);
}

function safeAdminPath(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "/admin";
  if (!/^\/admin(?:\/[a-z-]+)?$/.test(value) || value === "/admin/login") return "/admin";
  return value;
}

export async function loginAction(formData: FormData) {
  const nextPath = safeAdminPath(formData.get("next"));
  if (!hasSupabaseEnvironment()) loginRedirect("configuration", nextPath);

  const email = formData.get("email");
  const password = formData.get("password");
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    email.length > 254 ||
    !email.includes("@") ||
    password.length < 12 ||
    password.length > 1024
  ) {
    loginRedirect("invalid", nextPath);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) loginRedirect("invalid", nextPath);

  const { data: profile, error: profileError } = await supabase
    .from("staff_profiles")
    .select("user_id, display_name, role, is_active")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (profileError || !resolveStaffIdentity(data.user, profile)) {
    await supabase.auth.signOut({ scope: "local" });
    loginRedirect("invalid", nextPath);
  }

  redirect(nextPath);
}

export async function signOutAction() {
  if (hasSupabaseEnvironment()) {
    const supabase = await createClient();
    await supabase.auth.signOut({ scope: "local" });
  }
  redirect("/admin/login?signedOut=1");
}
