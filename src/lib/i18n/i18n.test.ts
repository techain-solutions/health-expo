import { describe, expect, it } from "vitest";

import { dictionaries } from "./index";

import { locales } from "../site";

describe("public dictionaries", () => {
  it("provides every supported locale", () => {
    expect(Object.keys(dictionaries).sort()).toEqual([...locales].sort());
  });

  it("localizes representative body, form and legal content outside English", () => {
    for (const locale of ["nl", "tr", "ru", "ar"] as const) {
      expect(dictionaries[locale].about.positioning.title).not.toBe(dictionaries.en.about.positioning.title);
      expect(dictionaries[locale].contact.form.title).not.toBe(dictionaries.en.contact.form.title);
      expect(dictionaries[locale].legal.tabs.privacy.heading).not.toBe(dictionaries.en.legal.tabs.privacy.heading);
    }
  });

  it("contains no public prototype ribbon or admin-preview labels", () => {
    const serialized = JSON.stringify(dictionaries);
    expect(serialized).not.toMatch(/client validation prototype|preview admin dashboard/i);
  });
});
