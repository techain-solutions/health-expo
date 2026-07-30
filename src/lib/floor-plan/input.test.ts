import { describe, expect, it } from "vitest";

import { floorPlanMaxBytes, validateFloorPlan } from "./input";

describe("floor plan upload validation", () => {
  it("accepts a supported small PDF", () => {
    const file = new File(["plan"], "expo-plan.pdf", { type: "application/pdf" });
    expect(validateFloorPlan(file)).toMatchObject({ extension: "pdf" });
  });

  it("rejects unsupported files, unsafe names and oversized files", () => {
    expect(validateFloorPlan(new File(["x"], "plan.html", { type: "text/html" }))).toBeNull();
    expect(validateFloorPlan(new File(["x"], "../plan.pdf", { type: "application/pdf" }))).toBeNull();
    expect(validateFloorPlan(new File([new Uint8Array(floorPlanMaxBytes + 1)], "plan.pdf", { type: "application/pdf" }))).toBeNull();
  });
});
