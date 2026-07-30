import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";
import { existsSync, writeFileSync } from "node:fs";

if (existsSync(".env.local")) process.loadEnvFile(".env.local");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceRoleKey || !/^http:\/\/(127\.0\.0\.1|localhost):/.test(url)) {
  throw new Error("This helper runs only against the loopback Supabase stack.");
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});
const accounts = [
  { displayName: "Local Administrator", email: "administrator@health-expo.test", role: "administrator" },
  { displayName: "Local Staff", email: "staff@health-expo.test", role: "staff" },
  { displayName: "Local Organizer", email: "organizer@health-expo.test", role: "organizer" },
];
const credentials = [];

const { data: existingUsers, error: existingUsersError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
if (existingUsersError) throw new Error("Could not inspect local test staff accounts.");
for (const user of existingUsers.users) {
  if (accounts.some((account) => account.email === user.email)) {
    const { error } = await supabase.auth.admin.deleteUser(user.id);
    if (error) throw new Error("Could not reset local test staff accounts.");
  }
}

for (const account of accounts) {
  const password = `T7-${randomBytes(18).toString("base64url")}aZ`;
  const { data, error } = await supabase.auth.admin.createUser({
    email: account.email,
    email_confirm: true,
    password,
  });
  if (error || !data.user) throw new Error(`Could not provision ${account.role} test staff.`);

  const { error: profileError } = await supabase.from("staff_profiles").insert({
    display_name: account.displayName,
    role: account.role,
    user_id: data.user.id,
  });
  if (profileError) {
    await supabase.auth.admin.deleteUser(data.user.id);
    throw new Error(`Could not provision ${account.role} test profile.`);
  }

  credentials.push({ email: account.email, password, role: account.role });
}

writeFileSync(".auth-test.local.json", `${JSON.stringify(credentials, null, 2)}\n`, {
  encoding: "utf8",
  mode: 0o600,
});
process.stdout.write("Provisioned three loopback-only role test accounts.\n");
