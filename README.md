# Retno Safinaeni — personal website

Server-rendered Node website with no runtime dependencies. Requires Node 22 or newer.

```sh
npm install
npm run dev
```

Private preview: http://127.0.0.1:3000. Indonesian: `/`, `/prudential`. English: `/?lang=en`, `/prudential?lang=en`. Language is carried in links, including the logo, so direct loads and refreshes require no cookies or browser storage. Section navigation uses native anchors; FAQ uses native details elements. No remote fonts, tracking, forms, or external assets.

`public/motion.js` progressively enhances the visible HTML with one-time IntersectionObserver reveals (CSS transitions on opacity and transform) and a single scroll listener for header and active section states. Only groups still off-screen when the script runs are hidden, so painted content is never hidden again; focused content appears immediately. CSS provides the staggered hero entrance, transform-only atmospheric drift, hover feedback, and process connector. Reduced-motion preferences are respected both on load and when changed. Content and native controls work without JavaScript or the animation APIs.

Selected originals are retained in `public/assets/`: `retno-introduction-v3.png`, `retno-insurance-v3.png`, and `retno-chibi-wave.png`. Responsive WebP derivatives retain the entire portrait image and its headroom; the chibi derivative is lossless with alpha. Run `node scripts/prepare-images.mjs` to reproduce derivatives using the development-only Sharp dependency. Runtime URLs never depend on local Windows paths.

`npm start` serves public content with unresolved draft sections omitted. It is **not launch approval**: the remaining copy and affiliation still need owner review. `npm run build` creates public-content HTML snapshots in `dist/`; these are review/export artifacts, not a query-routing static deployment. Use the Node server to retain server-rendered `?lang=en` behavior. No domain or hosting has been configured; canonical/domain metadata is deliberately deferred.

`npm test` runs rendering checks. `npx playwright test` runs browser verification against the local preview (start it first). `npx playwright install chromium` may be needed once. Screenshots and test results are local artifacts excluded from Git.

See [EDITORIAL.md](EDITORIAL.md) for outstanding content. Source copy is in `site.mjs`; shared styling is in `style.css`.

The experience section is a reusable renderer in `experience.mjs`. Confirmed independent work is kept separate from externally sourced company/product context. Entries with missing personal contributions appear only as labeled private drafts. Source notes are in [EXPERIENCE-SOURCES.md](EXPERIENCE-SOURCES.md), with bilingual copy in [EXPERIENCE-COPY.md](EXPERIENCE-COPY.md). Fill contribution/connection fields only from Retno's supplied account; source websites cannot establish these facts.
