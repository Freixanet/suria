// Lighthouse sobre el lloc construït (local, sense serveis externs). Fa servir el Google Chrome instal·lat.
// Ús: node scripts/lighthouse.mjs [base=http://127.0.0.1:4329] [nom=v3]
// Desa els informes complets a informes/lighthouse/ i escriu un resum per pantalla.
import { mkdir, writeFile } from 'node:fs/promises';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const base = process.argv[2] ?? 'http://127.0.0.1:4329';
const nom = process.argv[3] ?? 'portada';
const rutes = ['/', '/aquesta-setmana/', '/primers-passos/', '/es/', '/cap-on-anem/'];
const sortida = `informes/lighthouse/${nom}`;
await mkdir(sortida, { recursive: true });

const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new', '--no-first-run'] });
const files = [];
try {
  for (const formFactor of ['mobile', 'desktop']) {
    for (const ruta of rutes) {
      const config = formFactor === 'desktop' ? (await import('lighthouse/core/config/desktop-config.js')).default : undefined;
      const r = await lighthouse(`${base}${ruta}`, {
        port: chrome.port,
        output: 'html',
        logLevel: 'error',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      }, config);
      const lhr = r.lhr;
      const fitxer = `${sortida}/${formFactor}${ruta.replaceAll('/', '_') || '_'}.html`;
      await writeFile(fitxer, r.report);
      const p = (c) => Math.round((lhr.categories[c]?.score ?? 0) * 100);
      const fallades = Object.values(lhr.audits)
        .filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'informative' && a.scoreDisplayMode !== 'notApplicable' && a.scoreDisplayMode !== 'manual')
        .map((a) => `${a.id}${a.displayValue ? ` (${a.displayValue})` : ''}`);
      files.push({
        formFactor, ruta,
        rendiment: p('performance'), accessibilitat: p('accessibility'), bonesPractiques: p('best-practices'), seo: p('seo'),
        LCP: lhr.audits['largest-contentful-paint'].displayValue, CLS: lhr.audits['cumulative-layout-shift'].displayValue, TBT: lhr.audits['total-blocking-time'].displayValue,
        pes: lhr.audits['total-byte-weight'].displayValue,
        fallades,
      });
    }
  }
} finally {
  await chrome.kill();
}
await writeFile(`${sortida}/resum.json`, JSON.stringify(files, null, 2));
for (const f of files) {
  console.log(`${nom} ${f.formFactor.padEnd(7)} ${f.ruta.padEnd(20)} R${f.rendiment} A${f.accessibilitat} BP${f.bonesPractiques} SEO${f.seo} · LCP ${f.LCP} · CLS ${f.CLS} · TBT ${f.TBT} · ${f.pes}`);
  if (f.fallades.length) console.log(`   ↳ ${f.fallades.join(', ')}`);
}
