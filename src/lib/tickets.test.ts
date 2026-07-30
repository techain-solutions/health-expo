import { describe, expect, it } from "vitest";

import { safeTicketDestination } from "./tickets";

describe("safe ticket destination", () => {
  const siteUrl = "https://expo.example";

  it("allows configured HTTP(S) ticket providers", () => {
    expect(safeTicketDestination("https://tickets.example/buy", siteUrl).toString()).toBe("https://tickets.example/buy");
  });

  it("keeps missing or unsafe values on the local tickets page", () => {
    expect(safeTicketDestination(null, siteUrl).toString()).toBe("https://expo.example/en/tickets");
    expect(safeTicketDestination("javascript:alert(1)", siteUrl).toString()).toBe("https://expo.example/en/tickets");
    expect(safeTicketDestination(null, siteUrl, "ar").toString()).toBe("https://expo.example/ar/tickets");
    expect(safeTicketDestination(null, siteUrl, "xx").toString()).toBe("https://expo.example/en/tickets");
  });
});
