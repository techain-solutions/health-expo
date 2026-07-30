import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { AdminPreview } from "./admin-preview";
import { PublicPageContent } from "./public-pages";
import { PublicShell } from "./public-shell";

const dashboardStatus = {
  eventPublished: true,
  exhibitorCount: 3,
  floorPlanPublished: true,
  newRequests: 2,
  ticketUrlSet: false,
};

describe("public and administration presentation", () => {
  it("renders the contact form with required fields and truthful consent", () => {
    const html = renderToStaticMarkup(<PublicPageContent locale="en" page="contact" />);

    expect(html).toContain('data-static-form="true"');
    expect(html).not.toContain('action="');
    expect(html).toContain('name="consent"');
    expect(html).toContain("I agree that my details may be used");
    expect(html).not.toContain("no details will be sent");
  });

  it("renders the authenticated administration with live status", () => {
    const html = renderToStaticMarkup(
      <AdminPreview
        page="dashboard"
        staff={{
          displayName: "Admin Demo",
          email: "admin@example.test",
          role: "administrator",
          userId: "user-1",
        }}
        status={dashboardStatus}
      />,
    );

    expect(html).toContain('data-authenticated-admin="true"');
    expect(html).toContain("Administration panel");
    expect(html).toContain("Published");
    expect(html).not.toContain("presentation-only");
  });

  it("uses the approved Material Symbols icons instead of Unicode substitutes", () => {
    const publicHtml = renderToStaticMarkup(<PublicPageContent locale="en" page="home" />);
    const adminHtml = renderToStaticMarkup(
      <AdminPreview
        page="dashboard"
        staff={{
          displayName: "Admin Demo",
          email: "admin@example.test",
          role: "administrator",
          userId: "user-1",
        }}
        status={dashboardStatus}
      />,
    );

    expect(publicHtml).toContain('class="material-symbols-rounded');
    expect(publicHtml).toContain(">arrow_forward</span>");
    expect(publicHtml).toContain(">location_on</span>");
    expect(adminHtml).toContain(">space_dashboard</span>");
    expect(adminHtml).toContain(">inbox</span>");
    expect(`${publicHtml}${adminHtml}`).not.toMatch(/[↗→⌄●▦□▧◷✉↪☰]/u);
  });

  it("uses the approved SVG flag sprite and language-control structure", () => {
    const html = renderToStaticMarkup(
      <PublicShell locale="en" page="home">
        <div>Preview</div>
      </PublicShell>,
    );

    expect(html).toContain('id="flag-gb"');
    expect(html).toContain('href="#flag-gb"');
    expect(html).toContain('class="language-trigger"');
    expect(html).toContain('class="language-menu"');
    expect(html).not.toMatch(/[🇬🇧🇳🇱🇹🇷🇷🇺🇸🇦]/u);
  });

  it("does not publish illustrative programme sessions before confirmation", () => {
    const html = renderToStaticMarkup(<PublicPageContent locale="en" page="program" />);

    expect(html).toContain("programme is being finalised");
    expect(html).not.toContain("Main stage");
    expect(html).not.toContain("Beauty stage");
    expect(html).not.toContain("Wellness corner");
  });

  it("keeps destructive row actions visibly styled and unconstrained", () => {
    const css = readFileSync("src/app/admin/admin.css", "utf8");
    const legacyRule = css.indexOf(".row-actions button{width:28px");
    const repairRule = css.indexOf(".row-actions .admin-btn--danger{");

    expect(legacyRule).toBeGreaterThanOrEqual(0);
    expect(repairRule).toBeGreaterThan(legacyRule);
    expect(css.slice(repairRule)).toContain("background:var(--red)");
    expect(css).toContain(".row-actions .admin-btn{width:auto;height:auto");
  });
});
