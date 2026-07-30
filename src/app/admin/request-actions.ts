"use server";

import { revalidatePath } from "next/cache";
import { forbidden, redirect } from "next/navigation";

import { getStaffAuthState } from "@/lib/auth/dal";
import { deletePublicRequest, markPublicRequestReviewed } from "@/lib/requests/service";

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function requireReviewer() {
  const { staff } = await getStaffAuthState();
  if (!staff || staff.role === "organizer") forbidden();
  return staff;
}

function requestId(formData: FormData) {
  const id = formData.get("id");
  if (typeof id !== "string" || !uuid.test(id)) redirect("/admin/requests?notice=error");
  return id;
}

/** Keeps the operator on the same filtered page after an action. */
function backTo(formData: FormData, notice: string): never {
  const query = formData.get("query");
  const suffix = typeof query === "string" && query ? `&${query}` : "";
  redirect(`/admin/requests?notice=${notice}${suffix}`);
}

export async function markRequestReviewedAction(formData: FormData) {
  await requireReviewer();
  const id = requestId(formData);
  try {
    await markPublicRequestReviewed(id);
  } catch {
    backTo(formData, "error");
  }
  revalidatePath("/admin/requests");
  backTo(formData, "reviewed");
}

export async function deleteRequestAction(formData: FormData) {
  const staff = await requireReviewer();
  // Erasure is irreversible, so it stays with the Administrator role.
  if (staff.role !== "administrator") forbidden();
  const id = requestId(formData);
  try {
    await deletePublicRequest(id);
  } catch {
    backTo(formData, "error");
  }
  revalidatePath("/admin/requests");
  backTo(formData, "deleted");
}
