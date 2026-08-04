import { describe, expect, it } from "vitest";

import { localizeExhibitor } from "./localize";

const exhibitor = {
  slug: "nova-medical-group",
  category: "Medical tourism",
  text: "International care pathways and specialist hospital services.",
};

describe("localizeExhibitor", () => {
  it("localizes public exhibitor content while preserving its filter category", () => {
    expect(localizeExhibitor(exhibitor, "ar")).toMatchObject({
      category: "السياحة العلاجية",
      text: "مسارات رعاية دولية وخدمات مستشفيات متخصصة.",
      filterCategory: "Medical tourism",
    });
  });

  it("keeps the English source content unchanged", () => {
    expect(localizeExhibitor(exhibitor, "en")).toEqual(exhibitor);
  });
});
