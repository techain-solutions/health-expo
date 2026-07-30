import { randomUUID } from "node:crypto";

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error("Load .env.local before running the local request integration check.");
}
if (!/^https?:\/\/(127\.0\.0\.1|localhost)(?::\d+)?/.test(url)) {
  throw new Error("This verification command is restricted to a loopback Supabase project.");
}

const client = createClient(url, serviceRoleKey, { auth: { persistSession: false } });
const marker = randomUUID();
const { data, error } = await client
  .from("public_requests")
  .insert({
    request_type: "fair_match",
    email: "integration-fair-match@example.test",
    payload: { request: "Local Fair Match persistence verification" },
    dedupe_key: marker,
  })
  .select("id, request_type")
  .single();

if (error || data?.request_type !== "fair_match") {
  throw error ?? new Error("Fair Match request did not persist with the expected type.");
}

const { error: deleteError } = await client.from("public_requests").delete().eq("id", data.id);
if (deleteError) throw deleteError;

console.log("Local Fair Match request insert/read/delete passed.");
