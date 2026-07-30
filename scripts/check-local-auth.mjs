import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";

if (existsSync(".env.local")) process.loadEnvFile(".env.local");
if (!existsSync(".auth-test.local.json")) {
  throw new Error("Provision local role test accounts before running this check.");
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (!url || !publishableKey || !/^http:\/\/(127\.0\.0\.1|localhost):/.test(url)) {
  throw new Error("This check runs only against the loopback Supabase stack.");
}

const credentials = JSON.parse(readFileSync(".auth-test.local.json", "utf8"));
for (const credential of credentials) {
  const supabase = createClient(url, publishableKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credential.email,
    password: credential.password,
  });
  if (error || !data.user) {
    throw new Error(`Authentication failed for ${credential.role}: ${error?.message ?? "missing user"}.`);
  }

  const { data: profiles, error: profileError } = await supabase
    .from("staff_profiles")
    .select("user_id, role, is_active");
  const profile = profiles?.[0];
  if (
    profileError ||
    profiles?.length !== 1 ||
    profile?.user_id !== data.user.id ||
    profile.role !== credential.role ||
    !profile.is_active
  ) {
    throw new Error(`RLS profile lookup failed for ${credential.role}.`);
  }

  const { error: forbiddenUpdateError } = await supabase
    .from("staff_profiles")
    .update({ role: "administrator" })
    .eq("user_id", data.user.id);
  if (!forbiddenUpdateError) {
    throw new Error(`Role mutation was not rejected for ${credential.role}.`);
  }

  await supabase.auth.signOut({ scope: "local" });
  process.stdout.write(`Verified ${credential.role} authentication, RLS isolation, and immutable role.\n`);
}
