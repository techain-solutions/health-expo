import "server-only";

import { createServiceRoleClient } from "@/lib/supabase/service";

export const requestPageSize = 20;

export const requestTypes = ["contact", "participation", "media", "fair_match"] as const;
export type RequestType = (typeof requestTypes)[number];

export const requestStatuses = ["new", "reviewed"] as const;
export type RequestStatus = (typeof requestStatuses)[number];

export type RequestQuery = {
  page?: number;
  type?: RequestType;
  status?: RequestStatus;
};

export async function listPublicRequests({ page = 1, type, status }: RequestQuery = {}) {
  const client = createServiceRoleClient();
  const from = (page - 1) * requestPageSize;
  let query = client
    .from("public_requests")
    .select("id, request_type, email, payload, status, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, from + requestPageSize - 1);
  if (type) query = query.eq("request_type", type);
  if (status) query = query.eq("status", status);
  const { data, error, count } = await query;
  if (error) throw error;
  return { items: data, total: count ?? 0, page };
}

export async function countNewRequests() {
  const client = createServiceRoleClient();
  const { count, error } = await client
    .from("public_requests")
    .select("id", { count: "exact", head: true })
    .eq("status", "new");
  if (error) throw error;
  return count ?? 0;
}

export async function markPublicRequestReviewed(id: string) {
  const client = createServiceRoleClient();
  const { error } = await client.from("public_requests").update({ status: "reviewed" }).eq("id", id);
  if (error) throw error;
}

/** PRIV-002: permanent erasure for data-subject deletion requests. */
export async function deletePublicRequest(id: string) {
  const client = createServiceRoleClient();
  const { error } = await client.from("public_requests").delete().eq("id", id);
  if (error) throw error;
}
