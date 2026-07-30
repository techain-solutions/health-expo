import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("root page", () => {
  it("renders the approved public design", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toContain("Health &amp; Beauty Expo");
    expect(html).toContain("Where health, beauty and");
    expect(html).not.toContain("Client validation prototype");
    expect(html).not.toContain("Preview admin dashboard");
    expect(html).not.toContain("The event platform is being prepared.");
  });
});
