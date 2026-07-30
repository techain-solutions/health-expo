import { createClient } from "@supabase/supabase-js";
import { existsSync } from "node:fs";

if (existsSync(".env.local")) process.loadEnvFile(".env.local");

const allowedRoles = new Set(["administrator", "staff", "organizer"]);
const args = new Map();
for (let index = 2; index < process.argv.length; index += 2) {
  const key = process.argv[index];
  const value = process.argv[index + 1];
  if (!key?.startsWith("--") || !value) {
    throw new Error("Use --email, --name, and --role arguments.");
  }
  args.set(key.slice(2), value);
}

const email = args.get("email");
const displayName = args.get("name");
const role = args.get("role");
const password = process.env.STAFF_PROVISION_PASSWORD;
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!email || email.length > 254 || !email.includes("@")) {
  throw new Error("A valid --email value is required.");
}
if (!displayName || displayName.trim().length < 2 || displayName.length > 100) {
  throw new Error("A --name between 2 and 100 characters is required.");
}
if (!role || !allowedRoles.has(role)) {
  throw new Error("--role must be administrator, staff, or organizer.");
}
if (!password || password.length < 12) {
  throw new Error("STAFF_PROVISION_PASSWORD must contain at least 12 characters.");
}
if (!url || !serviceRoleKey) {
  throw new Error("Run `npm run supabase:env` before provisioning local staff.");
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data, error } = await supabase.auth.admin.createUser({
  email,
  email_confirm: true,
  password,
});

if (error || !data.user) {
  throw new Error("The staff account could not be provisioned. Verify that the email is not already in use.");
}

const { error: profileError } = await supabase.from("staff_profiles").insert({
  display_name: displayName.trim(),
  role,
  user_id: data.user.id,
});

if (profileError) {
  await supabase.auth.admin.deleteUser(data.user.id);
  throw new Error("The staff profile could not be created; the new Auth user was rolled back.");
}

process.stdout.write(`Provisioned ${role} staff account for ${email}.\n`);
