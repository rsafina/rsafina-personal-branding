import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { render } from './site.mjs';
const publicMode = process.argv.includes('--public');
const port = Number(process.env.PORT || 3000);
http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/style.css') {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    return res.end(await readFile(new URL('./style.css', import.meta.url)));
  }
  if (!['/', '/prudential'].includes(url.pathname)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('404 — Halaman tidak ditemukan / Page not found');
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'X-Content-Type-Options': 'nosniff' });
  res.end(render(url.pathname, url.searchParams.get('lang') === 'en' ? 'en' : 'id', !publicMode));
}).listen(port, '127.0.0.1', () => console.log(`Local preview: http://127.0.0.1:${port}${publicMode ? ' (public content)' : ' (private draft)'}`));
