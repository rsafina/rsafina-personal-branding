import { mkdir, writeFile, copyFile, cp } from 'node:fs/promises';
import { render } from './site.mjs';
await mkdir('dist/prudential', { recursive: true });
await copyFile('style.css', 'dist/style.css');
await cp('public', 'dist', { recursive: true });

// Snapshots use relative paths so they open directly from disk (double-click) with images,
// styles and page links working. Use the Node server for query-based bilingual routing.
const pages = { '/': 'index.html', '/?lang=en': 'index.en.html', '/prudential': 'prudential/index.html', '/prudential?lang=en': 'prudential/index.en.html' };
function relative(html, prefix) {
  return html
    .replace(/(["\s,])\/(assets\/|style\.css|motion\.js)/g, `$1${prefix}$2`)
    .replace(/href="(\/(?:prudential)?(?:\?lang=en)?)(#[^"]*)?"/g, (match, page, hash = '') => pages[page] ? `href="${prefix}${pages[page]}${hash}"` : match);
}
for (const [path, directory, prefix] of [['/', 'dist', ''], ['/prudential', 'dist/prudential', '../']]) {
  for (const lang of ['id', 'en']) await writeFile(`${directory}/${lang === 'id' ? 'index' : 'index.en'}.html`, relative(render(path, lang, false), prefix));
}
console.log('Public-content snapshots built in dist/. Open dist/index.html directly, or run npm start for bilingual query routing.');
