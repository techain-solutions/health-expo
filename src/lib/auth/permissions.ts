import type { AdminPage } from "@/lib/site";

export const staffRoles = ["administrator", "staff", "organizer"] as const;
export type StaffRole = (typeof staffRoles)[number];

const rolePermissions: Record<StaffRole, readonly AdminPage[]> = {
  administrator: ["dashboard", "event", "exhibitors", "floor-plan", "requests", "team"],
  staff: ["dashboard", "event", "exhibitors", "floor-plan", "requests"],
  organizer: ["dashboard", "event", "exhibitors", "floor-plan"],
};

export const managedStaffRoles = ["staff", "organizer"] as const;
export type ManagedStaffRole = (typeof managedStaffRoles)[number];

export const staffRoleLabels: Record<StaffRole, string> = {
  administrator: "Administrator",
  staff: "Employee / Staff",
  organizer: "Organizer",
};

export function isStaffRole(value: unknown): value is StaffRole {
  return typeof value === "string" && staffRoles.includes(value as StaffRole);
}

export function isManagedStaffRole(value: unknown): value is ManagedStaffRole {
  return typeof value === "string" && managedStaffRoles.includes(value as ManagedStaffRole);
}

export function allowedAdminPages(role: StaffRole): readonly AdminPage[] {
  return rolePermissions[role];
}

export function canAccessAdminPage(role: StaffRole, page: AdminPage): boolean {
  return rolePermissions[role].includes(page);
}
