# Verification — 18 October 2026

- `npm test`: 9 passing checks, covering server-rendered language output, one primary heading, anchor destinations, absence of collection/tracking or invented external contacts, draft noindex, and omission of unresolved public content.
- Text palette contrast: ink, muted ink, and action blue exceed 4.5:1 against canvas, white, pink, sky, lilac, and draft surface endpoints. White primary-button text uses ink/action-blue backgrounds. Focus indicators are explicit blue outlines.
- `npm run build`: passed; public HTML snapshots produced locally. Production query-language routing requires the Node server, as documented.
- `npx playwright test`: 18 passing Chromium checks. Both pages in ID and EN at 360, 390, 768, and 1440px; no horizontal overflow. Verified direct HTTP loading, valid in-page destinations, skip-link keyboard use, reduced-motion CSS, language-preserving page navigation and refresh, language switch, and keyboard FAQ operation.
- Eight full-page screenshots inspected: both pages × both languages × 360/1440px. Files are in ignored `artifacts/screenshots/`. No observed clipped content or overlapping layout.
- No runtime dependencies, remote assets, browser JavaScript, forms, storage, analytics, tracking, contact destinations, corporate logo, or domain connection.

## Limits

Chromium desktop with mobile viewport emulation was used; physical devices, Safari/Firefox, and a full screen-reader audit were not tested. Contrast checks cover the designed palette and gradient endpoints, not an independent automated accessibility certification. The reference websites were inaccessible through the web reader; the supplied guide's reference structure was followed. Copy, personal evidence, credentials, service scope, and actual contact destinations require the owner review in EDITORIAL.md. Static snapshots must not be hosted as if they support query-language routing. Nothing was pushed or deployed.
