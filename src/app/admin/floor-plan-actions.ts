"use server";

import { revalidatePath } from "next/cache";
import { forbidden, redirect } from "next/navigation";

import { getStaffAuthState } from "@/lib/auth/dal";
import { replaceFloorPlan } from "@/lib/floor-plan/service";

export async function replaceFloorPlanAction(formData: FormData) {
  const { staff } = await getStaffAuthState();
  if (!staff || staff.role === "organizer") forbidden();
  const file = formData.get("floorPlan");
  if (!(file instanceof File)) redirect("/admin/floor-plan?notice=error");
  try {
    await replaceFloorPlan(staff.userId, file);
  } catch {
    redirect("/admin/floor-plan?notice=error");
  }
  revalidatePath("/admin/floor-plan");
  revalidatePath("/en/floor-plan");
  redirect("/admin/floor-plan?notice=saved");
}
