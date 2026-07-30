import { isManagedStaffRole, type ManagedStaffRole } from "@/lib/auth/permissions";

export type CreateStaffAccountInput = {
  displayName: string;
  email: string;
  password: string;
  role: ManagedStaffRole;
};

export type StaffManagementInput = {
  displayName: unknown;
  email: unknown;
  password: unknown;
  role: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUserId(value: unknown): value is string {
  return typeof value === "string" && uuidPattern.test(value);
}

export function canManageStaffAccount(role: unknown) {
  return isManagedStaffRole(role);
}

export function parseCreateStaffAccountInput(input: StaffManagementInput): CreateStaffAccountInput | null {
  if (
    typeof input.displayName !== "string" ||
    typeof input.email !== "string" ||
    typeof input.password !== "string" ||
    !isManagedStaffRole(input.role)
  ) {
    return null;
  }

  const displayName = input.displayName.trim().replace(/\s+/g, " ");
  const email = input.email.trim().toLowerCase();
  if (
    displayName.length < 2 ||
    displayName.length > 100 ||
    email.length > 254 ||
    !emailPattern.test(email) ||
    input.password.length < 12 ||
    input.password.length > 1024
  ) {
    return null;
  }

  return { displayName, email, password: input.password, role: input.role };
}
