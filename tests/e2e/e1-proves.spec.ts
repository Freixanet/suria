// E1 amb dades de prova (build SURIA_PROVES=1, que no es publica mai). Vecina que vol sopar a les 21.45.
import { test, expect } from '@playwright/test';
import { rellotge } from './ajuda.ts';

const fitxa = (page: import('@playwright/test').Page, nom: string) => page.locator('.fitxa', { hasText: nom });

test('a les 21.45: cada negoci amb el seu estat, mai «obert ara»', async ({ page }) => {
  await rellotge(page, '2026-10-12T21:45:00+02:00');
  await page.goto('/menjar-i-comprar/');
  await expect(fitxa(page, 'Restaurant de mostra A').locator('[data-estat-principal]')).toHaveText('Horari comunicat pel negoci: fins a les 23.00');
  await expect(fitxa(page, 'Restaurant de mostra A')).toContainText('El negoci ens ho va dir a les 13.05. No és una garantia en temps real.');
  await expect(fitxa(page, 'Bar de mostra B').locator('[data-estat-principal]')).toHaveText('Horari comunicat pel negoci: fins a les 1.30');
  await expect(fitxa(page, 'Forn de mostra C').locator('[data-estat-principal]')).toHaveText('Avui no serveix');
  await expect(fitxa(page, 'Botiga de mostra D').locator('[data-estat-principal]')).toHaveText('Sense confirmar');
  await expect(page.locator('main')).not.toContainText(/obert ara(?!»)/i);
});

test('la pàgina oberta passa a «Servei finalitzat» sense recarregar', async ({ page }) => {
  await rellotge(page, '2026-10-12T22:58:00+02:00');
  await page.goto('/menjar-i-comprar/');
  const a = fitxa(page, 'Restaurant de mostra A').locator('[data-estat-principal]');
  await expect(a).toHaveText(/fins a les 23.00/);
  await page.clock.runFor('03:00');
  await expect(a).toHaveText('Servei finalitzat');
});

test('després de mitjanit: el bar continua fins a la seva hora; la jornada nova és «Sense confirmar»', async ({ page }) => {
  await rellotge(page, '2026-10-13T00:30:00+02:00');
  await page.goto('/menjar-i-comprar/');
  await expect(fitxa(page, 'Bar de mostra B').locator('[data-estat-principal]')).toHaveText('Horari comunicat pel negoci: fins a les 1.30');
  await expect(fitxa(page, 'Restaurant de mostra A').locator('[data-estat-principal]')).toHaveText('Sense confirmar');
});

test('castellà: mateixos estats, formats propis', async ({ page }) => {
  await rellotge(page, '2026-10-12T21:45:00+02:00');
  await page.goto('/es/comer-y-comprar/');
  await expect(fitxa(page, 'Restaurant de mostra A').locator('[data-estat-principal]')).toHaveText('Horario comunicado por el negocio: hasta las 23:00');
  await expect(fitxa(page, 'Forn de mostra C').locator('[data-estat-principal]')).toHaveText('Hoy no sirve');
});

test.describe('sense JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('es mostra «Sense confirmar» i l’últim horari en text', async ({ page }) => {
    await page.goto('/menjar-i-comprar/');
    const a = fitxa(page, 'Restaurant de mostra A');
    await expect(a.locator('[data-estat-principal]')).toHaveText('Sense confirmar');
    await expect(a.locator('[data-sense-js]')).toContainText('Dl 12, 20.00–23.00 h (13.05)');
  });
});
