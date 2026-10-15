// Selector CA/ES: a cada pàgina porta a la pàgina equivalent de l'altra llengua, i torna.
// (Les etiquetes hreflang absolutes depenen del domini definitiu: aquí només es comprova que apunten a pàgines que existeixen.)
import { test, expect } from '@playwright/test';
import { BASE, obreMenu } from './ajuda.ts';

const parelles = [
  ['/', '/es/'],
  ['/aquesta-setmana/', '/es/esta-semana/'],
  ['/menjar-i-comprar/', '/es/comer-y-comprar/'],
  ['/primers-passos/', '/es/primeros-pasos/'],
  ['/cap-on-anem/', '/es/hacia-donde-vamos/'],
  ['/que-estem-provant/', '/es/que-estamos-probando/'],
] as const;

for (const [ca, es] of parelles) {
  test(`CA ⇄ ES: ${ca} ⇄ ${es}`, async ({ page }) => {
    await page.goto(`${BASE}${ca}`);
    await obreMenu(page);
    await page.getByRole('navigation', { name: 'Llengua' }).getByRole('link', { name: 'Castellano' }).click();
    await expect(page).toHaveURL(`${BASE}${es}`);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await obreMenu(page);
    await expect(page.getByRole('navigation', { name: 'Idioma' }).getByRole('link', { name: 'Castellano' })).toHaveAttribute('aria-current', 'true');
    await page.getByRole('navigation', { name: 'Idioma' }).getByRole('link', { name: 'Català' }).click();
    await expect(page).toHaveURL(`${BASE}${ca}`);
    await expect(page.locator('html')).toHaveAttribute('lang', 'ca');
  });
}

test('les alternatives hreflang apunten a pàgines que existeixen (relatives fins que hi hagi domini)', async ({ page, request }) => {
  for (const [ca] of parelles) {
    await page.goto(`${BASE}${ca}`);
    const alternatives = await page.locator('link[rel="alternate"][hreflang]').evaluateAll((ls) => ls.map((l) => [l.getAttribute('hreflang'), l.getAttribute('href')]));
    expect(alternatives.map((a) => a[0]).sort()).toEqual(['ca', 'es']);
    for (const [, href] of alternatives) expect((await request.get(`${BASE}${href}`)).status(), href!).toBe(200);
  }
});

test('pàgina no trobada: el selector porta a l’inici de cada llengua', async ({ page }) => {
  await page.goto(`${BASE}/no-existeix/`);
  await obreMenu(page);
  await page.getByRole('navigation', { name: 'Llengua' }).getByRole('link', { name: 'Castellano' }).click();
  await expect(page).toHaveURL(`${BASE}/es/`);
});
