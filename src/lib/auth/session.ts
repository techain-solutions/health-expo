import type { User } from "@supabase/supabase-js";

import { isStaffRole, type StaffRole } from "@/lib/auth/permissions";

export type StaffProfileRecord = {
  display_name: string;
  is_active: boolean;
  role: unknown;
  user_id: string;
};

export type StaffIdentity = {
  displayName: string;
  email: string;
  role: StaffRole;
  userId: string;
};

export function resolveStaffIdentity(
  user: Pick<User, "email" | "id"> | null,
  profile: StaffProfileRecord | null,
): StaffIdentity | null {
  if (
    !user ||
    !profile ||
    !profile.is_active ||
    profile.user_id !== user.id ||
    !isStaffRole(profile.role)
  ) {
    return null;
  }

  const displayName = profile.display_name.trim();
  if (displayName.length < 2) return null;

  return {
    displayName,
    email: user.email ?? "",
    role: profile.role,
    userId: user.id,
  };
}
