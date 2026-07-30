import { describe, expect, it } from "vitest";

import { localeMeta, pageHref, resolvePublicRoute } from "./site";

describe("public routing and locale direction", () => {
  it("resolves every route shape used by the static design", () => {
    expect(resolvePublicRoute([])).toEqual({ page: "home" });
    expect(resolvePublicRoute(["floor-plan"])).toEqual({ page: "floor-plan" });
    expect(resolvePublicRoute(["exhibitors", "nova-medical-group"])).toEqual({
      page: "exhibitor-detail",
      detail: "nova-medical-group",
    });
    expect(resolvePublicRoute(["legal", "terms"])).toEqual({
      page: "legal",
      legalTab: "terms",
    });
    expect(resolvePublicRoute(["unknown"])).toBeNull();
  });

  it("preserves equivalent paths while switching locale", () => {
    expect(pageHref("ar", "floor-plan")).toBe("/ar/floor-plan");
    expect(pageHref("nl", "legal", "privacy")).toBe("/nl/legal/privacy");
    expect(localeMeta.ar.dir).toBe("rtl");
    expect(localeMeta.en.dir).toBe("ltr");
  });
});
