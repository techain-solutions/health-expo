import "server-only";

import { createServiceRoleClient } from "@/lib/supabase/service";

import { validateFloorPlan } from "./input";

const bucket = "floor-plans";

export type FloorPlanAsset = {
  contentType: string;
  originalName: string;
  publicUrl: string;
  storagePath: string;
  updatedAt: string;
};

export async function getFloorPlan(): Promise<FloorPlanAsset | null> {
  const client = createServiceRoleClient();
  const { data, error } = await client.from("floor_plan_assets").select("*").eq("id", "current").maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const { data: publicUrl } = client.storage.from(bucket).getPublicUrl(data.storage_path);
  return { contentType: data.content_type, originalName: data.original_name, publicUrl: publicUrl.publicUrl, storagePath: data.storage_path, updatedAt: data.updated_at };
}

export async function replaceFloorPlan(actorUserId: string, file: File) {
  const valid = validateFloorPlan(file);
  if (!valid) throw new Error("Invalid floor plan file");
  const storagePath = `current.${valid.extension}`;
  const client = createServiceRoleClient();
  const { error: uploadError } = await client.storage.from(bucket).upload(storagePath, await file.arrayBuffer(), {
    contentType: valid.contentType,
    upsert: true,
  });
  if (uploadError) throw uploadError;
  const { error: databaseError } = await client.from("floor_plan_assets").upsert({
    id: "current",
    storage_path: storagePath,
    content_type: valid.contentType,
    original_name: valid.originalName,
    updated_by: actorUserId,
    updated_at: new Date().toISOString(),
  });
  if (databaseError) throw databaseError;
}
