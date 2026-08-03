import { describe, expect, it } from "vitest";

import { exhibitorImageMaxBytes, validateExhibitorImage } from "./image";

describe("exhibitor image validation", () => {
  it("accepts supported image types", () => {
    expect(validateExhibitorImage(new File(["image"], "profile.webp", { type: "image/webp" }))).toEqual({
      contentType: "image/webp",
      extension: "webp",
    });
  });

  it("allows an omitted image and rejects unsafe files", () => {
    expect(validateExhibitorImage(null)).toBeNull();
    expect(() => validateExhibitorImage(new File(["html"], "profile.html", { type: "text/html" }))).toThrow();
    expect(() =>
      validateExhibitorImage(
        new File([new Uint8Array(exhibitorImageMaxBytes + 1)], "profile.jpg", { type: "image/jpeg" }),
      ),
    ).toThrow();
  });
});
