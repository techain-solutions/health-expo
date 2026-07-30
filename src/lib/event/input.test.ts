import { describe, expect, it } from "vitest";

import { normalizeTime, parseEventInput } from "./input";

const good = {
  title: "Expo",
  startsOn: "2026-10-24",
  endsOn: "2026-10-25",
  opensAt: "10:00",
  closesAt: "18:00",
  venue: "Venue",
  city: "Rijswijk",
  address: "Volmerlaan 12",
  description: "A sufficiently long event description.",
  visitorInformation: "",
  ticketUrl: "https://example.test",
};

describe("event input", () => {
  it("accepts valid input", () => {
    expect(parseEventInput(good)).not.toBeNull();
  });

  it("accepts the HH:MM:SS times Postgres returns and normalizes them", () => {
    const parsed = parseEventInput({ ...good, opensAt: "10:00:00", closesAt: "18:00:00" });
    expect(parsed).not.toBeNull();
    expect(parsed?.opensAt).toBe("10:00");
    expect(parsed?.closesAt).toBe("18:00");
  });

  it("rejects invalid chronology and urls", () => {
    expect(parseEventInput({ ...good, endsOn: "2026-10-20" })).toBeNull();
    expect(parseEventInput({ ...good, ticketUrl: "ftp://x.test" })).toBeNull();
    expect(parseEventInput({ ...good, closesAt: "09:00:00" })).toBeNull();
  });

  it("rejects out-of-range and malformed times", () => {
    expect(normalizeTime("24:00")).toBeNull();
    expect(normalizeTime("10:60")).toBeNull();
    expect(normalizeTime("1:00")).toBeNull();
    expect(normalizeTime("10:00:00")).toBe("10:00");
  });
});
