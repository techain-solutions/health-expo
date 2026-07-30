import { createHmac } from "node:crypto";

import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/supabase/database.types";

const windowSeconds = 10 * 60;
const identityMaximumRequests = 5;
const networkMaximumRequests = 30;

export type RequestRateLimit = {
  allowed: boolean;
  retryAfterSeconds: number;
};

export function requestRateLimitKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

export function hashRequestRateLimitKey(key: string, secret?: string) {
  const signingSecret = secret ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!signingSecret) throw new Error("Request throttle signing secret is not configured.");
  return createHmac("sha256", signingSecret).update(key).digest("hex");
}

async function takeRequestRateLimit(
  client: SupabaseClient<Database>,
  key: string,
  maximumRequests: number,
  now = new Date(),
): Promise<RequestRateLimit> {
  const { data, error } = await client.rpc("take_request_rate_limit", {
    p_key_hash: hashRequestRateLimitKey(key),
    p_now: now.toISOString(),
    p_window_seconds: windowSeconds,
    p_maximum_requests: maximumRequests,
  });
  if (error) throw error;
  const result = data[0];
  if (!result) throw new Error("Request throttle returned no result.");
  return {
    allowed: result.allowed,
    retryAfterSeconds: result.retry_after_seconds,
  };
}

export async function takePublicRequestRateLimit(
  client: SupabaseClient<Database>,
  request: Request,
  email: string,
  now = new Date(),
): Promise<RequestRateLimit> {
  const network = requestRateLimitKey(request);
  const networkLimit = await takeRequestRateLimit(
    client,
    `network:${network}`,
    networkMaximumRequests,
    now,
  );
  if (!networkLimit.allowed) return networkLimit;

  return takeRequestRateLimit(
    client,
    `identity:${network}:${email.trim().toLowerCase()}`,
    identityMaximumRequests,
    now,
  );
}
