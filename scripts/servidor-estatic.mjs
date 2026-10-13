// Servidor estàtic mínim per a les proves locals (Astro 7 només admet una previsualització alhora).
// Ús: node scripts/servidor-estatic.mjs <carpeta> <port>. Serveix index.html de cada carpeta i 404.html amb codi 404.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const [carpeta = 'dist', port = '4342'] = process.argv.slice(2);
const arrel = resolve(carpeta);
const tipus = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2', '.avif': 'image/avif', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.txt': 'text/plain; charset=utf-8',
};

async function fitxer(ruta) {
  const cami = normalize(join(arrel, decodeURIComponent(ruta)));
  if (!cami.startsWith(arrel)) return null;
  try {
    const s = await stat(cami);
    return s.isDirectory() ? fitxer(join(ruta, 'index.html')) : cami;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const ruta = new URL(req.url ?? '/', 'http://localhost').pathname;
  const cami = await fitxer(ruta);
  const final = cami ?? join(arrel, '404.html');
  res.writeHead(cami ? 200 : 404, { 'Content-Type': tipus[extname(final)] ?? 'application/octet-stream' });
  res.end(await readFile(final));
}).listen(Number(port), '127.0.0.1', () => console.log(`Servint ${arrel} a http://127.0.0.1:${port}/`));
