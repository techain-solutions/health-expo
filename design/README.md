# Health & Beauty Expo - Design Validation Package

This is a standalone, production-buildable design prototype for cofounder and client validation. It is not the gated Next.js/Supabase implementation and contains no real authentication, database, upload, email, or form-processing behavior.

## Open the designs

- Open `index.html` for the public website. Use the navigation to review all public pages.
- Open `admin.html` for the static administration dashboard preview.

For a local server (recommended for the most reliable preview), run:

```bash
npm run dev
```

Then open `http://127.0.0.1:4173`.

## Validate and build

```bash
npm run check
npm run build
```

The production-ready static output is written to `dist/`. Do not edit `dist/` directly; edit the source files in this folder and rebuild.

## Included resources

- Original Health & Beauty Expo logo crop from the supplied PDFs.
- Bespoke editorial expo hero image created for this static approval prototype; replace or license final campaign photography before production.
- Supplied floor plan, English and Turkish posters, and stand visual references.
- Other decorative photography is temporary direction imagery and must be replaced with final client-supplied photos before production. All imagery is self-hosted in `assets/`, so the package renders identically offline and from a zip.
- A five-flag language switcher (English, Nederlands, Türkçe, Русский, العربية) using inline SVG flag artwork, keyboard accessible and mirrored for right-to-left.
- Fair Match is presented as the agreed manual flow: the page lists the participating clinics, and the request form lets a visitor choose a clinic and propose a preferred date and time. There is no automated matching, availability, booking calendar, chat or calendar sync.
- Contact and venue details are populated from the supplied client documents (De Broodfabriek, Volmerlaan 12, 2288 GD Rijswijk; info@expofuar.nl; +31 (0)570 238 100) and flagged to confirm before launch.
- Original participant manual (Dutch), English exhibitor manual, exhibitor agreement, stand pricing, and floor-plan PDFs in `downloads/`, linked from the footer `Documents` menu.
- Static forms and dashboard actions for interaction design only; they do not send or save data.
- A focused administration preview for event information, exhibitors, photos/videos, website-form requests, and an external ticketing link.
- Role previews for Administrator, Employee/Staff, and Organizer.
- Five-language direction preview. Only the shared navigation, footer labels and homepage hero are translated; all other page copy remains English in every language. See `Known gaps in this build` below.

## Known gaps in this build

State these plainly when sharing the package. They are deliberate, not oversights.

- **Translation is navigation-level only.** Navigation, footer labels and the homepage hero are translated into Dutch, Turkish, Russian and Arabic. All other page copy is still English in every language, so a non-English selection shows a mixed-language page. In Arabic the right-to-left layout additionally renders English sentences with their closing punctuation on the wrong side. Full translation is a separate pass.
- **The temporary exhibitor list supplied on 26 July is not yet integrated.** Exhibitor records, and the Fair Match clinic list derived from them, are still illustrative placeholders pending that list in a structured format (name, category, description, logo, contact).
- **The English agreement is not published.** Only the Dutch `HB Overeenkomst` appears in the footer `Documents` menu. The three-part English agreement supplied on 26 July still needs to be merged and added.
- **Social links are placeholders.** The Instagram, Facebook and LinkedIn icons point at `#` pending the real profile URLs.
- **Public contact details are unverified.** `info@expofuar.nl` and `+31 (0)570 238 100` are shown site-wide; note that 0570 is the Deventer dialling code, not Rijswijk.

## Client confirmation items

- Final ticketing URL and ticket information.
- Official venue address and public contact details.
- Final exhibitor and clinic records, as a structured list.
- The three-part English agreement, for the `Documents` menu.
- Instagram and Facebook profile URLs.
- Legal-page content and form recipients.
- Reviewed translations for Dutch, Turkish, English, Russian, and Arabic.
- Final speaker names, portraits, roles, and biographies.
- Approval or removal of the public participant manual, agreement, and stand-price downloads.
- A vector or transparent high-resolution master logo.

See `DESIGN_REVIEW.md` for the cofounder review checklist and the exact approval questions to send to the client.
