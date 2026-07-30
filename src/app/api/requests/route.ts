import { createHash } from "node:crypto";

import { NextResponse } from "next/server";

import {
  isAllowedRequestOrigin,
  maxRequestBodyBytes,
  parsePublicRequest,
} from "@/lib/requests/input";
import { processRequestNotificationOutbox } from "@/lib/requests/notifications";
import { takePublicRequestRateLimit } from "@/lib/requests/rate-limit";
import { createServiceRoleClient } from "@/lib/supabase/service";
import type { Json } from "@/lib/supabase/database.types";

export async function POST(request: Request) {
  if (!isAllowedRequestOrigin(request)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const declaredLength = Number.parseInt(request.headers.get("content-length") ?? "0", 10);
  if (Number.isFinite(declaredLength) && declaredLength > maxRequestBodyBytes) {
    return NextResponse.json({ error: "too_large" }, { status: 413 });
  }
  try {
    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > maxRequestBodyBytes) {
      return NextResponse.json({ error: "too_large" }, { status: 413 });
    }
    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }
    const body = parsePublicRequest(parsedJson);
    if (!body) return NextResponse.json({ error: "invalid" }, { status: 400 });
    const client = createServiceRoleClient();
    const rateLimit = await takePublicRequestRateLimit(client, request, body.email);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "rate_limited" },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }
    const dedupeKey = createHash("sha256")
      .update(`${body.type}:${body.email}:${JSON.stringify(body.fields)}`)
      .digest("hex");
    const { data, error } = await client
      .from("public_requests")
      .insert({
        request_type: body.type,
        email: body.email,
        payload: body.fields as Json,
        dedupe_key: dedupeKey,
      })
      .select("id")
      .single();
    if (error?.code === "23505") return NextResponse.json({ ok: true, duplicate: true });
    if (error || !data) throw error ?? new Error("request unavailable");
    const { error: outboxError } = await client.from("request_notification_outbox").insert({ request_id: data.id });
    if (outboxError) throw outboxError;
    await processRequestNotificationOutbox();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
