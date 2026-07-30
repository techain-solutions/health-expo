import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { hashRequestRateLimitKey, takePublicRequestRateLimit } from "./rate-limit";

describe("public request rate limit", () => {
  beforeAll(() => vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "test-service-role-secret"));
  afterAll(() => vi.unstubAllEnvs());

  it("stores a keyed digest rather than personal identifiers", () => {
    const digest = hashRequestRateLimitKey(
      "identity:203.0.113.10:visitor@example.test",
      "test-service-role-secret",
    );
    expect(digest).toMatch(/^[0-9a-f]{64}$/);
    expect(digest).not.toContain("203.0.113.10");
    expect(digest).not.toContain("visitor@example.test");
  });

  it("checks the shared network and identity windows", async () => {
    const rpc = vi
      .fn()
      .mockResolvedValueOnce({ data: [{ allowed: true, retry_after_seconds: 0 }], error: null })
      .mockResolvedValueOnce({ data: [{ allowed: false, retry_after_seconds: 321 }], error: null });
    const client = { rpc } as never;
    const request = new Request("http://localhost/api/requests", {
      headers: { "x-forwarded-for": "203.0.113.10, 198.51.100.8" },
    });

    const result = await takePublicRequestRateLimit(
      client,
      request,
      "Visitor@Example.test",
      new Date("2026-07-30T12:00:00Z"),
    );

    expect(result).toEqual({ allowed: false, retryAfterSeconds: 321 });
    expect(rpc).toHaveBeenCalledTimes(2);
    expect(rpc.mock.calls[0]?.[1]).toMatchObject({
      p_maximum_requests: 30,
      p_window_seconds: 600,
    });
    expect(rpc.mock.calls[1]?.[1]).toMatchObject({
      p_maximum_requests: 5,
      p_window_seconds: 600,
    });
    expect(JSON.stringify(rpc.mock.calls)).not.toContain("Visitor@Example.test");
    expect(JSON.stringify(rpc.mock.calls)).not.toContain("203.0.113.10");
  });

  it("does not consume an identity slot after the network limit is reached", async () => {
    const rpc = vi
      .fn()
      .mockResolvedValueOnce({ data: [{ allowed: false, retry_after_seconds: 60 }], error: null });
    const client = { rpc } as never;

    const result = await takePublicRequestRateLimit(
      client,
      new Request("http://localhost/api/requests"),
      "visitor@example.test",
    );

    expect(result.allowed).toBe(false);
    expect(rpc).toHaveBeenCalledTimes(1);
  });
});
