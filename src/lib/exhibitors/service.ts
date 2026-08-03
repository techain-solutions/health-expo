import "server-only";

import { createServiceRoleClient } from "@/lib/supabase/service";

import type { ExhibitorInput } from "./input";
import { validateExhibitorImage } from "./image";

const imageBucket = "exhibitor-images";

export async function listExhibitors(publicOnly = false) {
  const client = createServiceRoleClient();
  let query = client.from("exhibitors").select("*").order("display_order").order("name");
  if (publicOnly) query = query.eq("is_active", true);
  const { data, error } = await query;
  if (error) throw error;
  return data.map((item) => ({
    ...item,
    image_url: item.image_path
      ? client.storage.from(imageBucket).getPublicUrl(item.image_path).data.publicUrl
      : null,
  }));
}

async function uploadExhibitorImage(client: ReturnType<typeof createServiceRoleClient>, id: string, file: File) {
  const image = validateExhibitorImage(file);
  if (!image) return null;
  const path = `${id}/profile.${image.extension}`;
  const { error } = await client.storage.from(imageBucket).upload(path, await file.arrayBuffer(), {
    contentType: image.contentType,
    upsert: true,
  });
  if (error) throw error;
  const stalePaths = ["jpg", "png", "webp"].map((extension) => `${id}/profile.${extension}`).filter((item) => item !== path);
  await client.storage.from(imageBucket).remove(stalePaths);
  return { image_content_type: image.contentType, image_path: path };
}

export async function saveExhibitor(input: ExhibitorInput, id?: string, imageFile?: File) {
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
  if (id) {
    const image = imageFile ? await uploadExhibitorImage(client, id, imageFile) : null;
    const result = await client.from("exhibitors").update({ ...row, ...(image ?? {}) }).eq("id", id);
    if (result.error) throw result.error;
    return id;
  }
  const result = await client.from("exhibitors").insert(row).select("id").single();
  if (result.error || !result.data) throw result.error ?? new Error("Could not create exhibitor");
  try {
    const image = imageFile ? await uploadExhibitorImage(client, result.data.id, imageFile) : null;
    if (image) {
      const updated = await client.from("exhibitors").update(image).eq("id", result.data.id);
      if (updated.error) throw updated.error;
    }
  } catch (error) {
    await client.from("exhibitors").delete().eq("id", result.data.id);
    throw error;
  }
  return result.data.id;
}

export async function deleteExhibitor(id: string) {
  const client = createServiceRoleClient();
  const { data } = await client.from("exhibitors").select("image_path").eq("id", id).maybeSingle();
  const { error } = await client.from("exhibitors").delete().eq("id", id);
  if (error) throw error;
  if (data?.image_path) await client.storage.from(imageBucket).remove([data.image_path]);
}
