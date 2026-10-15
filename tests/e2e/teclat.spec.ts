// Recorregut amb teclat (Tab, Maj+Tab, Retorn) en Chrome real: ordre, focus visible, sense trampes.
// No substitueix una prova amb lector de pantalla ni amb persones.
import { test, expect, type Page } from '@playwright/test';
import { BASE } from './ajuda.ts';

type Parada = { text: string; href: string | null; y: number; x: number; visible: boolean; contorn: string; contrast: number };

async function recorre(page: Page, maxim = 80): Promise<Parada[]> {
  const parades: Parada[] = [];
  for (let i = 0; i < maxim; i++) {
    await page.keyboard.press('Tab');
    // El lloc fa servir desplaçament suau: s'espera que el desplaçament s'aturi abans de mesurar.
    await page.evaluate(async () => {
      let abans = -1;
      for (let i = 0; i < 40 && abans !== window.scrollY; i++) {
        abans = window.scrollY;
        await new Promise((r) => setTimeout(r, 50));
      }
    });
    const p = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      // Contrast del contorn de focus amb el fons real (primer avantpassat amb fons opac).
      const rgb = (c: string) => (c.match(/[\d.]+/g) ?? []).map(Number);
      const lum = ([r, g, b]: number[]) => {
        const f = (v: number) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      };
      let fons = 'rgb(238,240,240)';
      // El contorn es dibuixa fora de l'element (outline-offset 3px): es compara amb el fons del contenidor.
      for (let n: HTMLElement | null = el.parentElement; n; n = n.parentElement) {
        const bg = getComputedStyle(n).backgroundColor;
        const a = rgb(bg); if (a.length >= 3 && (a.length < 4 || a[3] > 0.5)) { fons = bg; break; }
      }
      const l1 = lum(rgb(cs.outlineColor)), l2 = lum(rgb(fons));
      const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      return {
        text: (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 45),
        href: el.getAttribute('href'),
        y: Math.round(r.top + window.scrollY), x: Math.round(r.left),
        visible: r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight,
        contorn: `${cs.outlineStyle} ${cs.outlineWidth}`,
        contrast: Math.round(contrast * 10) / 10,
      };
    });
    if (!p) break;
    if (parades.length && p.href === parades[0].href && p.text === parades[0].text) break;
    parades.push(p);
  }
  return parades;
}

for (const ruta of ['/', '/aquesta-setmana/', '/es/primeros-pasos/']) {
  test(`teclat: ${ruta} — totes les parades visibles, amb contorn i sense trampes`, async ({ page }, info) => {
    await page.goto(`${BASE}${ruta}`);
    const parades = await recorre(page);
    await info.attach(`ordre-tab${ruta.replaceAll('/', '_')}.json`, { body: JSON.stringify(parades, null, 2), contentType: 'application/json' });
    expect(parades.length).toBeGreaterThan(8);
    expect(parades[0].text).toMatch(/Ves al contingut|Ir al contenido/);
    for (const p of parades) {
      expect(p.visible, `${p.text}: no es veu en rebre el focus`).toBe(true);
      expect(p.contorn, `${p.text}: sense contorn de focus`).toMatch(/^solid (3|4)px$/);
      expect(p.contrast, `${p.text}: contorn amb contrast ${p.contrast}:1`).toBeGreaterThanOrEqual(3);
    }
  });
}

test('teclat: canviar de llengua i entrar en una tasca només amb el teclat', async ({ page }) => {
  await page.goto(`${BASE}/`);
  // Tab fins a «ES» i Retorn.
  for (let i = 0; i < 15; i++) {
    await page.keyboard.press('Tab');
    if ((await page.evaluate(() => document.activeElement?.getAttribute('aria-expanded'))) === 'false') await page.keyboard.press('Enter');
    if ((await page.evaluate(() => document.activeElement?.getAttribute('lang'))) === 'es') break;
  }
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(`${BASE}/es/`);
  // Al mòbil, les tasques són dins del botó «Menú»: Retorn l'obre i el Tab següent entra a les tasques.
  for (let i = 0; i < 15; i++) {
    await page.keyboard.press('Tab');
    const actiu = await page.evaluate(() => ({ text: document.activeElement?.textContent?.trim(), menu: document.activeElement?.getAttribute('aria-expanded') }));
    if (actiu.menu === 'false') await page.keyboard.press('Enter');
    if (actiu.text === 'Primeros pasos') break;
  }
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(`${BASE}/es/primeros-pasos/`);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Primeros pasos en Súria');
  // Maj+Tab torna enrere sense quedar atrapat.
  await page.keyboard.press('Shift+Tab');
  const enrere = await page.evaluate(() => document.activeElement?.tagName);
  expect(enrere).toBeTruthy();
});
