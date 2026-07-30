import { describe, expect, it } from "vitest";

import { resolveStaffIdentity } from "@/lib/auth/session";

const user = { email: "staff@example.test", id: "user-1" };

describe("staff identity resolution", () => {
  it("returns a minimal identity for an active valid profile", () => {
    expect(
      resolveStaffIdentity(user, {
        display_name: "Expo Staff",
        is_active: true,
        role: "staff",
        user_id: "user-1",
      }),
    ).toEqual({
      displayName: "Expo Staff",
      email: "staff@example.test",
      role: "staff",
      userId: "user-1",
    });
  });

  it.each([
    ["missing profile", null],
    [
      "inactive profile",
      { display_name: "Expo Staff", is_active: false, role: "staff", user_id: "user-1" },
    ],
    [
      "unknown role",
      { display_name: "Expo Staff", is_active: true, role: "owner", user_id: "user-1" },
    ],
    [
      "another user's profile",
      { display_name: "Expo Staff", is_active: true, role: "staff", user_id: "user-2" },
    ],
  ])("denies an authenticated user with a %s", (_case, profile) => {
    expect(resolveStaffIdentity(user, profile)).toBeNull();
  });
});
