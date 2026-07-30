import { describe, expect, it } from "vitest";

import { allowedAdminPages, canAccessAdminPage } from "@/lib/auth/permissions";

describe("staff role permissions", () => {
  it("gives the administrator every existing administration route", () => {
    expect(allowedAdminPages("administrator")).toEqual([
      "dashboard",
      "event",
      "exhibitors",
      "floor-plan",
      "requests",
      "team",
    ]);
  });

  it("gives staff the operational sections", () => {
    expect(canAccessAdminPage("staff", "requests")).toBe(true);
    expect(canAccessAdminPage("staff", "event")).toBe(true);
  });

  it("limits organizers to read-only operational pages", () => {
    expect(allowedAdminPages("organizer")).toEqual(["dashboard", "event", "exhibitors", "floor-plan"]);
    expect(canAccessAdminPage("organizer", "requests")).toBe(false);
  });

  it("reserves staff-account management for administrators", () => {
    expect(canAccessAdminPage("administrator", "team")).toBe(true);
    expect(canAccessAdminPage("staff", "team")).toBe(false);
    expect(canAccessAdminPage("organizer", "team")).toBe(false);
  });
});
