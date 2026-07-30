import { describe, expect, it } from "vitest";

import { isAllowedRequestOrigin, parsePublicRequest } from "./input";

const contact = {
  type: "contact",
  email: "Visitor@Example.com",
  consent: true,
  website: "",
  fields: {
    name: "Visitor Name",
    subject: "Visitor information",
    message: "Please send practical information.",
  },
};

describe("public request input", () => {
  it("normalizes a complete request", () => {
    expect(parsePublicRequest(contact)).toEqual({
      type: "contact",
      email: "visitor@example.com",
      fields: contact.fields,
    });
  });

  it("rejects missing required fields, consent and honeypot submissions", () => {
    expect(parsePublicRequest({ ...contact, fields: { ...contact.fields, name: "" } })).toBeNull();
    expect(parsePublicRequest({ ...contact, consent: false })).toBeNull();
    expect(parsePublicRequest({ ...contact, website: "spam.example" })).toBeNull();
  });

  it("rejects too many, oversized and unsafe fields", () => {
    expect(
      parsePublicRequest({
        ...contact,
        fields: Object.fromEntries(Array.from({ length: 26 }, (_, index) => [`field-${index}`, "value"])),
      }),
    ).toBeNull();
    expect(parsePublicRequest({ ...contact, fields: { ...contact.fields, message: "x".repeat(2_001) } })).toBeNull();
    expect(parsePublicRequest({ ...contact, fields: { ...contact.fields, "unsafe key": "value" } })).toBeNull();
  });

  it("validates the request origin against the application origin", () => {
    expect(
      isAllowedRequestOrigin(
        new Request("https://expo.example/api/requests", { headers: { origin: "https://expo.example" } }),
      ),
    ).toBe(true);
    expect(
      isAllowedRequestOrigin(
        new Request("https://expo.example/api/requests", { headers: { origin: "https://attacker.example" } }),
      ),
    ).toBe(false);
    expect(isAllowedRequestOrigin(new Request("https://expo.example/api/requests"))).toBe(false);
  });
});
