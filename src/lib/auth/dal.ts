import "server-only";

import type { User } from "@supabase/supabase-js";

import { resolveStaffIdentity, type StaffIdentity } from "@/lib/auth/session";
import { hasSupabaseEnvironment } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export type StaffAuthState = {
  staff: StaffIdentity | null;
  user: Pick<User, "email" | "id"> | null;
};

export async function getStaffAuthState(): Promise<StaffAuthState> {
  if (!hasSupabaseEnvironment()) return { staff: null, user: null };

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return { staff: null, user: null };

  const { data: profile, error: profileError } = await supabase
    .from("staff_profiles")
    .select("user_id, display_name, role, is_active")
    .eq("user_id", user.id)
    .maybeSingle();

  return {
    staff: profileError ? null : resolveStaffIdentity(user, profile),
    user: { email: user.email, id: user.id },
  };
}
