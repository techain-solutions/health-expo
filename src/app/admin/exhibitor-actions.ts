"use server";

import { revalidatePath } from "next/cache";
import { forbidden, redirect } from "next/navigation";

import { getStaffAuthState } from "@/lib/auth/dal";
import { parseExhibitorInput } from "@/lib/exhibitors/input";
import { deleteExhibitor, saveExhibitor } from "@/lib/exhibitors/service";

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function requireEditor() {
  const { staff } = await getStaffAuthState();
  if (!staff || staff.role === "organizer") forbidden();
  return staff;
}

function revalidatePublicExhibitors() {
  revalidatePath("/admin/exhibitors");
  revalidatePath("/api/exhibitors");
  revalidatePath("/[locale]/[[...slug]]", "page");
}

export async function saveExhibitorAction(formData: FormData) {
  await requireEditor();
  const rawId = formData.get("id");
  const id = typeof rawId === "string" && uuid.test(rawId) ? rawId : undefined;
  const input = parseExhibitorInput(Object.fromEntries(formData));
  if (!input) redirect(`/admin/exhibitors?notice=error${id ? `&id=${id}` : "&new=1"}`);
  try {
    await saveExhibitor(input, id);
  } catch {
    redirect(`/admin/exhibitors?notice=${id ? "error" : "duplicate"}${id ? `&id=${id}` : "&new=1"}`);
  }
  revalidatePublicExhibitors();
  redirect("/admin/exhibitors?notice=saved");
}

export async function deleteExhibitorAction(formData: FormData) {
  await requireEditor();
  const id = formData.get("id");
  if (typeof id !== "string" || !uuid.test(id)) redirect("/admin/exhibitors?notice=error");
  try {
    await deleteExhibitor(id);
  } catch {
    redirect("/admin/exhibitors?notice=error");
  }
  revalidatePublicExhibitors();
  redirect("/admin/exhibitors?notice=deleted");
}
