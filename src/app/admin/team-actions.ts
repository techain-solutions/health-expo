"use server";

import { forbidden, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { isManagedStaffRole } from "@/lib/auth/permissions";
import {
  createManagedStaffAccount,
  setManagedStaffActiveState,
  updateManagedStaffRole,
} from "@/lib/auth/staff-management";
import { isUserId, parseCreateStaffAccountInput } from "@/lib/auth/staff-management-input";
import { getStaffAuthState } from "@/lib/auth/dal";

function teamRedirect(notice: "created" | "updated" | "state" | "error"): never {
  redirect(`/admin/team?notice=${notice}`);
}

async function requireAdministrator() {
  const { staff } = await getStaffAuthState();
  if (!staff || staff.role !== "administrator") forbidden();
  return staff;
}

export async function createStaffAccountAction(formData: FormData) {
  const administrator = await requireAdministrator();
  const input = parseCreateStaffAccountInput({
    displayName: formData.get("displayName"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });
  if (!input) teamRedirect("error");

  try {
    await createManagedStaffAccount(administrator.userId, input);
  } catch {
    teamRedirect("error");
  }
  revalidatePath("/admin/team");
  teamRedirect("created");
}

export async function updateStaffRoleAction(formData: FormData) {
  const administrator = await requireAdministrator();
  const userId = formData.get("userId");
  const role = formData.get("role");
  if (!isUserId(userId) || !isManagedStaffRole(role)) teamRedirect("error");

  try {
    await updateManagedStaffRole(administrator.userId, userId, role);
  } catch {
    teamRedirect("error");
  }
  revalidatePath("/admin/team");
  teamRedirect("updated");
}

export async function setStaffAccountStateAction(formData: FormData) {
  const administrator = await requireAdministrator();
  const userId = formData.get("userId");
  const activeState = formData.get("activeState");
  if (!isUserId(userId) || (activeState !== "active" && activeState !== "inactive")) teamRedirect("error");

  try {
    await setManagedStaffActiveState(administrator.userId, userId, activeState === "active");
  } catch {
    teamRedirect("error");
  }
  revalidatePath("/admin/team");
  teamRedirect("state");
}
