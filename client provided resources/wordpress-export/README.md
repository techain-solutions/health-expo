# WordPress Export — Health & Beauty Expo (legacy site)

Extracted 2026-07-24 from the live site `healthandbeautyexpo.nl` as a migration/rewrite
reference for the new Next.js build.

## Contents of this folder
| File | What it is |
|---|---|
| `website-text-content-NL.md` | All public page copy (Home, Over ons, Exposanten, Tickets, Fair match, Media/Press, Contact), cleaned and annotated with flags. |
| `media-inventory.csv` | Full list of all 73 media library items — id, date, type, filename, URL. |
| `media-inventory-raw.json` | Same data, raw JSON from the WP REST API. |
| `download-media.sh` | One-command script to download every media binary into `./media/`. |
| `media/` | Destination for the downloaded image/video files (empty until you run the script). |

## Media summary (73 items)
- 59 JPEG, 10 PNG, 1 AVIF, 1 SVG images
- 2 MP4 videos (`tt-expo-health-Amsterdam.mp4`, `expo-health.mp4`)
- Includes: Rijswijk/Amsterdam/Paris event banners; sponsor & clinic logos (Acıbadem, Dentx,
  Dünyagöz, Medical Park, Medicana, Medipol, Memorial, Sleepy); venue/hall photos
  (Gorinchem-hallen series); brand logos/icons; and several placeholder/test images.

## Downloading the actual image & video files
The binary files were **not** auto-downloaded here. To pull them all into `./media/`, run
this from inside this folder:

```bash
bash download-media.sh
```

That fetches all 73 files (public URLs, no login needed). Re-runnable; each file reports OK/FAIL.

## Important scope notes (from .ai/ project docs)
- **Legacy media is NOT automatically migrated** into the new site (confirmed decision). These
  files are a *reference/selection pool* — importing any into production needs explicit approval.
- The **Fair Match** page copy describes an automated algorithm/chat/favorites/accounts —
  **out of scope**. The new Fair Match is a manual appointment-request workflow only.
- Many media items are **placeholders/test images** (e.g. `test.jpg`, `test2t`, `logo-placeholder.png`,
  `bus`, generic city photos) — not necessarily brand assets. Review before reuse.
- All existing copy is **Dutch only**; new site needs NL, TR, EN, RU, AR (+ Arabic RTL).

## Credential note
Access used the WordPress login shared in chat. Project security docs flag that credential as
compromised-by-disclosure and recommend rotating it (or using a safe export) before any further
migration work. This extraction was read-only — no site content was modified.
