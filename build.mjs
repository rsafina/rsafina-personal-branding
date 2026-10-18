import { mkdir, writeFile, copyFile, cp } from 'node:fs/promises';
import { render } from './site.mjs';
await mkdir('dist/prudential', { recursive: true });
await copyFile('style.css', 'dist/style.css');
await cp('public', 'dist', { recursive: true });
// Static snapshots are review artifacts. Use the Node server for query-based bilingual routing.
for (const [path, directory] of [['/', 'dist'], ['/prudential', 'dist/prudential']]) {
  for (const lang of ['id', 'en']) await writeFile(`${directory}/${lang === 'id' ? 'index' : 'index.en'}.html`, render(path, lang, false));
}
console.log('Public-content snapshots built. Run npm start for bilingual query routing.');
