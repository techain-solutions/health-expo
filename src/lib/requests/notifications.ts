import "server-only";

import { createServiceRoleClient } from "@/lib/supabase/service";
import type { Json } from "@/lib/supabase/database.types";

type RequestNotification = {
  id: string;
  request_type: string;
  email: string;
  payload: Json;
};

function configuration() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.FORM_NOTIFICATION_FROM?.trim();
  const recipients = process.env.FORM_NOTIFICATION_TO?.split(",").map((value) => value.trim()).filter(Boolean);
  return apiKey && from && recipients?.length ? { apiKey, from, recipients } : null;
}

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function payloadRows(payload: Json) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return "";
  return Object.entries(payload)
    .filter((entry): entry is [string, string] => typeof entry[1] === "string")
    .map(([key, value]) => `<tr><th align="left">${escapeHtml(key)}</th><td>${escapeHtml(value)}</td></tr>`)
    .join("");
}

async function sendNotification(request: RequestNotification) {
  const config = configuration();
  if (!config) return "unconfigured" as const;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${config.apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: config.recipients,
      reply_to: request.email,
      subject: `Health & Beauty Expo — ${request.request_type.replaceAll("_", " ")} request`,
      html: `<h1>New website request</h1><p><strong>Reply to:</strong> ${escapeHtml(request.email)}</p><table>${payloadRows(request.payload)}</table>`,
    }),
  });
  return response.ok ? ("sent" as const) : ("provider_error" as const);
}

/**
 * Delivers a small batch on every successful submission. A failed or
 * interrupted attempt remains in the outbox and is retried by a later
 * submission, up to five attempts. Missing provider configuration deliberately
 * leaves items pending so the staff inbox remains the safe fallback.
 */
export async function processRequestNotificationOutbox(limit = 5) {
  if (!configuration()) return { sent: 0, pending: true };
  const client = createServiceRoleClient();
  const { data: outbox, error } = await client
    .from("request_notification_outbox")
    .select("id, request_id, attempts")
    .in("status", ["pending", "failed"])
    .lt("attempts", 5)
    .order("created_at")
    .limit(limit);
  if (error) return { sent: 0, pending: true };

  let sent = 0;
  for (const item of outbox) {
    const { data: request } = await client
      .from("public_requests")
      .select("id, request_type, email, payload")
      .eq("id", item.request_id)
      .maybeSingle();
    if (!request) continue;
    let outcome: "sent" | "provider_error" = "provider_error";
    try {
      const delivery = await sendNotification(request);
      outcome = delivery === "sent" ? "sent" : "provider_error";
    } catch {
      outcome = "provider_error";
    }
    const succeeded = outcome === "sent";
    await client
      .from("request_notification_outbox")
      .update({
        attempts: item.attempts + 1,
        last_error: succeeded ? null : outcome,
        sent_at: succeeded ? new Date().toISOString() : null,
        status: succeeded ? "sent" : "failed",
      })
      .eq("id", item.id);
    if (succeeded) sent += 1;
  }
  return { sent, pending: false };
}
