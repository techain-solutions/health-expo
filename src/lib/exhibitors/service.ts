import "server-only";

import { createServiceRoleClient } from "@/lib/supabase/service";

import type { ExhibitorInput } from "./input";

export async function listExhibitors(publicOnly = false) {
  const client = createServiceRoleClient();
  let query = client.from("exhibitors").select("*").order("display_order").order("name");
  if (publicOnly) query = query.eq("is_active", true);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function saveExhibitor(input: ExhibitorInput, id?: string) {
  const client = createServiceRoleClient();
  const row = {
    name: input.name,
    slug: input.slug,
    category: input.category,
    description: input.description,
    website_url: input.websiteUrl || null,
    is_active: input.isActive,
    is_featured: input.isFeatured,
    display_order: input.displayOrder,
  };
  const result = id
    ? await client.from("exhibitors").update(row).eq("id", id)
    : await client.from("exhibitors").insert(row);
  if (result.error) throw result.error;
}

export async function deleteExhibitor(id: string) {
  const client = createServiceRoleClient();
  const { error } = await client.from("exhibitors").delete().eq("id", id);
  if (error) throw error;
}
