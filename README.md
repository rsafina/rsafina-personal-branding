# Retno Safinaeni — personal website

Dependency-free, server-rendered Node website. Requires Node 22 or newer.

```sh
npm install
npm run dev
```

Private preview: http://127.0.0.1:3000. Indonesian: `/`, `/prudential`. English: `/?lang=en`, `/prudential?lang=en`. Language is carried in links, including the logo, so direct loads and refreshes require no cookies or browser storage. Section navigation uses native anchors; FAQ uses native details elements. No client JavaScript, remote fonts, tracking, forms, or external assets.

`npm start` serves public content with unresolved draft sections omitted. It is **not launch approval**: the remaining copy and affiliation still need owner review. `npm run build` creates public-content HTML snapshots in `dist/`; these are review/export artifacts, not a query-routing static deployment. Use the Node server to retain server-rendered `?lang=en` behavior. No domain or hosting has been configured; canonical/domain metadata is deliberately deferred.

`npm test` runs rendering checks. `npx playwright test` runs browser verification against the local preview (start it first). `npx playwright install chromium` may be needed once. Screenshots and test results are local artifacts excluded from Git.

See [EDITORIAL.md](EDITORIAL.md) for outstanding content. Source copy is in `site.mjs`; shared styling is in `style.css`.
