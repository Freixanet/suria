// Plataforma (app): accessibilitat automàtica i recorreguts principals.
// Passar axe no vol dir que sigui accessible: queden pendents les proves manuals i amb lector de pantalla.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { BASE } from './ajuda.ts';

const ca = ['', 'agenda/', 'agenda/sopar-benvinguda/', 'comunitat/', 'comerc/', 'comerc/taverna-turo/', 'pregunta/', 'gestions/', 'benvinguda/', 'compte/', 'mes/', 'per-a-negocis/', 'descobreix/'].map((r) => `/app/${r}`);
const es = ['', 'agenda/', 'comunidad/', 'comercio/', 'pregunta/', 'gestiones/', 'bienvenida/', 'cuenta/', 'mas/'].map((r) => `/es/app/${r}`);

for (const ruta of [...ca, ...es]) {
  test(`app · axe sense infraccions: ${ruta}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.route('https://api.met.no/**', (r) => r.abort());
    await page.goto(`${BASE}${ruta}`);
    await page.waitForTimeout(1500); // les animacions d'entrada han acabat
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    const resum = r.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).slice(0, 4).join(' | ')}`);
    expect(resum).toEqual([]);
    expect(errors).toEqual([]);
    const sw = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(sw).toBeLessThanOrEqual(0);
  });
}

test('app · «Pregunta a Súria» respon el bus amb l’horari real i en cita la font', async ({ page }) => {
  await page.goto(`${BASE}/app/pregunta/`);
  await page.getByRole('button', { name: /pròxim bus a Manresa/ }).click();
  const resposta = page.locator('.msg--ai').last();
  await expect(resposta.locator('.msg__sources .source').first()).toBeVisible({ timeout: 15_000 });
  await expect(resposta).toContainText('Alsa');
  await expect(resposta.locator('.source').first()).toHaveAttribute('href', /alsa\.es/);
});

test('app · sense dades verificades, l’assistent ho diu i no s’inventa la resposta', async ({ page }) => {
  await page.goto(`${BASE}/app/pregunta/`);
  await page.locator('[data-chat-input]').fill('Quants anys té el campanar?');
  await page.keyboard.press('Enter');
  await expect(page.locator('.msg--ai').last()).toContainText('mode demostració', { timeout: 15_000 });
});

test('app · apuntar-se demana compte; després de crear-lo, compta l’assistència', async ({ page }) => {
  await page.goto(`${BASE}/app/agenda/`);
  const boto = page.locator('[data-rsvp="mobil-sense-por"]');
  await boto.click();
  await expect(page.locator('#entrar')).toBeVisible();
  await page.locator('#entrar [data-entrar-link]').click();
  await page.locator('#correu').fill('veina@exemple.cat');
  await page.locator('[data-form="correu"] button[type=submit]').click();
  await page.locator('[data-otp] input').first().focus();
  await page.keyboard.type('123456');
  await page.locator('#nom').fill('Marta Puig');
  await page.locator('[data-form="perfil"] button[type=submit]').click();
  await expect(page).toHaveURL(/\/app\/agenda\/$/);
  const count = page.locator('[data-rsvp-count="mobil-sense-por"]');
  const abans = Number(await count.textContent());
  await page.locator('[data-rsvp="mobil-sense-por"]').click();
  await expect(page.locator('[data-rsvp="mobil-sense-por"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(count).toHaveText(String(abans + 1));
});

test('app · la mida de text s’aplica a tota l’app i es recorda', async ({ page }) => {
  await page.goto(`${BASE}/app/mes/`);
  await page.locator('[data-set-text="xl"]').first().click();
  await expect(page.locator('html')).toHaveAttribute('data-text', 'xl');
  await page.goto(`${BASE}/app/agenda/`);
  await expect(page.locator('html')).toHaveAttribute('data-text', 'xl');
});
