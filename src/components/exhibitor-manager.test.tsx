import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

describe("exhibitor manager edit dialog", () => {
  it("opens editing locally instead of relying on a same-page navigation", () => {
    const source = readFileSync("src/components/exhibitor-manager.tsx", "utf8");

    expect(source).toContain("const [editingId, setEditingId]");
    expect(source).toContain("onClick={() => { setEditingId(item.id); setFormOpen(true); }}");
    expect(source).not.toContain("href={`/admin/exhibitors?id=${item.id}`}");
  });
});
