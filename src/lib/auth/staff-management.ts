import "server-only";

import type { ManagedStaffRole, StaffRole } from "@/lib/auth/permissions";
import { canManageStaffAccount, type CreateStaffAccountInput } from "@/lib/auth/staff-management-input";
import { createServiceRoleClient } from "@/lib/supabase/service";

export type ManagedStaffAccount = {
  createdAt: string;
  displayName: string;
  email: string;
  isActive: boolean;
  role: StaffRole;
  userId: string;
};

async function getManagedProfile(userId: string) {
  const service = createServiceRoleClient();
  const { data, error } = await service
    .from("staff_profiles")
    .select("user_id, role, is_active")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data || !canManageStaffAccount(data.role)) return null;
  return { service, profile: data };
}

async function recordEvent(
  service: ReturnType<typeof createServiceRoleClient>,
  actorUserId: string,
  targetUserId: string,
  action: "created" | "role_changed" | "deactivated" | "reactivated",
) {
  const { error } = await service.from("staff_account_events").insert({
    action,
    actor_user_id: actorUserId,
    target_user_id: targetUserId,
  });
  if (error) throw new Error("Could not record staff account event.");
}

export async function listManagedStaffAccounts(): Promise<ManagedStaffAccount[]> {
  const service = createServiceRoleClient();
  const [{ data: profiles, error: profilesError }, { data: usersPage, error: usersError }] = await Promise.all([
    service.from("staff_profiles").select("user_id, display_name, role, is_active, created_at").order("created_at"),
    service.auth.admin.listUsers({ page: 1, perPage: 1000 }),
  ]);
  if (profilesError || usersError || !profiles || !usersPage) {
    throw new Error("Could not load staff accounts.");
  }

  const emailsByUserId = new Map(usersPage.users.map((user) => [user.id, user.email ?? ""]));
  return profiles.map((profile) => ({
    createdAt: profile.created_at,
    displayName: profile.display_name,
    email: emailsByUserId.get(profile.user_id) ?? "Unavailable",
    isActive: profile.is_active,
    role: profile.role,
    userId: profile.user_id,
  }));
}

export async function createManagedStaffAccount(actorUserId: string, input: CreateStaffAccountInput) {
  const service = createServiceRoleClient();
  const { data, error } = await service.auth.admin.createUser({
    email: input.email,
    email_confirm: true,
    password: input.password,
  });
  if (error || !data.user) throw new Error("Could not create staff account.");

  const userId = data.user.id;
  try {
    const { error: profileError } = await service.from("staff_profiles").insert({
      display_name: input.displayName,
      role: input.role,
      user_id: userId,
    });
    if (profileError) throw new Error("Could not create staff profile.");
    await recordEvent(service, actorUserId, userId, "created");
  } catch (error) {
    await service.auth.admin.deleteUser(userId);
    throw error;
  }
}

export async function updateManagedStaffRole(actorUserId: string, userId: string, role: ManagedStaffRole) {
  const target = await getManagedProfile(userId);
  if (!target) throw new Error("Managed staff account not found.");
  const { error } = await target.service.from("staff_profiles").update({ role }).eq("user_id", userId);
  if (error) throw new Error("Could not update staff role.");
  await recordEvent(target.service, actorUserId, userId, "role_changed");
}

export async function setManagedStaffActiveState(actorUserId: string, userId: string, isActive: boolean) {
  const target = await getManagedProfile(userId);
  if (!target) throw new Error("Managed staff account not found.");
  const { error } = await target.service.from("staff_profiles").update({ is_active: isActive }).eq("user_id", userId);
  if (error) throw new Error("Could not update staff access.");
  await recordEvent(target.service, actorUserId, userId, isActive ? "reactivated" : "deactivated");
}
