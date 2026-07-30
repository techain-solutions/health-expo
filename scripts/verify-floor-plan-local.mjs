import { readFile } from "node:fs/promises";

import { createClient } from "@supabase/supabase-js";

const values = Object.fromEntries(
  (await readFile(".env.local", "utf8"))
    .split("\n")
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => line.split("=", 2)),
);
const client = createClient(values.NEXT_PUBLIC_SUPABASE_URL, values.SUPABASE_SERVICE_ROLE_KEY);
const { data: administrator, error: staffError } = await client.from("staff_profiles").select("user_id").eq("role", "administrator").limit(1).single();
if (staffError || !administrator) throw staffError ?? new Error("No local administrator");
const bytes = await readFile("public/assets/expo-floor-plan.jpg");
const { error: uploadError } = await client.storage.from("floor-plans").upload("current.jpg", bytes, { contentType: "image/jpeg", upsert: true });
if (uploadError) throw uploadError;
const { error: referenceError } = await client.from("floor_plan_assets").upsert({
  id: "current",
  storage_path: "current.jpg",
  content_type: "image/jpeg",
  original_name: "local-verification-plan.jpg",
  updated_by: administrator.user_id,
  updated_at: new Date().toISOString(),
});
if (referenceError) throw referenceError;
const { data, error: readError } = await client.from("floor_plan_assets").select("storage_path").eq("id", "current").single();
if (readError || data?.storage_path !== "current.jpg") throw readError ?? new Error("Floor plan reference mismatch");
console.log("Verified local floor-plan storage upload and public reference.");
