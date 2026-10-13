// Accessibilitat automàtica amb axe-core (WCAG 2.0, 2.1 i 2.2, nivells A i AA).
// Passar axe no vol dir que la web sigui accessible: queden pendents les proves manuals.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { BASE, pagines } from './ajuda.ts';

for (const { ruta } of [...pagines, { ruta: '/no-existeix/' }]) {
  test(`axe sense infraccions: ${ruta}`, async ({ page }) => {
    await page.goto(`${BASE}${ruta}`);
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
    const resum = r.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).slice(0, 4).join(' | ')}`);
    expect(resum).toEqual([]);
  });
}

test('teclat: el primer Tab mostra «Ves al contingut» i el focus és visible', async ({ page }) => {
  await page.goto(`${BASE}/`);
  await page.keyboard.press('Tab');
  const saltar = page.getByRole('link', { name: 'Ves al contingut' });
  await expect(saltar).toBeFocused();
  await expect(saltar).toBeInViewport();
  await page.keyboard.press('Enter');
  await expect(page.locator('#contingut')).toBeFocused();
  await page.keyboard.press('Tab');
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle);
  expect(outline).not.toBe('none');
});
