import { describe, expect, it } from "vitest";

import { canManageStaffAccount, isUserId, parseCreateStaffAccountInput } from "@/lib/auth/staff-management-input";

describe("staff account management input", () => {
  it("normalizes a valid non-administrator account", () => {
    expect(
      parseCreateStaffAccountInput({
        displayName: "  Expo   Organizer ",
        email: " ORGANIZER@EXAMPLE.TEST ",
        password: "SafeInitialPassword1!",
        role: "organizer",
      }),
    ).toEqual({
      displayName: "Expo Organizer",
      email: "organizer@example.test",
      password: "SafeInitialPassword1!",
      role: "organizer",
    });
  });

  it.each([
    { displayName: "A", email: "staff@example.test", password: "SafeInitialPassword1!", role: "staff" },
    { displayName: "Expo Staff", email: "not-an-email", password: "SafeInitialPassword1!", role: "staff" },
    { displayName: "Expo Staff", email: "staff@example.test", password: "short", role: "staff" },
    { displayName: "Expo Staff", email: "staff@example.test", password: "SafeInitialPassword1!", role: "administrator" },
  ])("rejects invalid or privileged input", (input) => {
    expect(parseCreateStaffAccountInput(input)).toBeNull();
  });

  it("accepts only canonical user identifiers for mutation targets", () => {
    expect(isUserId("5180d20b-d364-4e36-921d-702bac67291d")).toBe(true);
    expect(isUserId("not-a-user-id")).toBe(false);
  });

  it("protects administrator accounts from managed-account actions", () => {
    expect(canManageStaffAccount("administrator")).toBe(false);
    expect(canManageStaffAccount("staff")).toBe(true);
    expect(canManageStaffAccount("organizer")).toBe(true);
  });
});
