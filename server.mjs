import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { render } from './site.mjs';
const publicMode = process.argv.includes('--public');
const port = Number(process.env.PORT || 3000);
http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const staticFiles = new Map([
    ['/style.css', ['style.css', 'text/css']],
    ['/motion.js', ['public/motion.js', 'text/javascript']],
  ]);
  if (/^\/assets\/retno-(?:introduction-v3|insurance-v3)(?:-(?:320|640)\.webp|\.png)$/.test(url.pathname) || /^\/assets\/retno-chibi-wave\.(?:png|webp)$/.test(url.pathname)) {
    staticFiles.set(url.pathname, [`public${url.pathname}`, url.pathname.endsWith('.webp') ? 'image/webp' : 'image/png']);
  }
  if (staticFiles.has(url.pathname)) {
    const [file, type] = staticFiles.get(url.pathname);
    try {
      const content = await readFile(new URL(`./${file}`, import.meta.url));
      res.writeHead(200, { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff' });
      return res.end(content);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('File not found');
    }
  }
  if (!['/', '/prudential'].includes(url.pathname)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('404 — Halaman tidak ditemukan / Page not found');
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'X-Content-Type-Options': 'nosniff' });
  res.end(render(url.pathname, url.searchParams.get('lang') === 'en' ? 'en' : 'id', !publicMode));
}).listen(port, '127.0.0.1', () => console.log(`Local preview: http://127.0.0.1:${port}${publicMode ? ' (public content)' : ' (private draft)'}`));
