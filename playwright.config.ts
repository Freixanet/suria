// Recorreguts amb Playwright sobre el lloc construït. Fa servir el Google Chrome instal·lat:
// no es descarrega cap navegador.
import { defineConfig } from '@playwright/test';

const chrome = { channel: 'chrome' as const, locale: 'ca-ES', timezoneId: 'Europe/Madrid' };

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  // Menys processos de Chrome alhora: amb massa treballadors, axe i les càrregues superen el temps límit.
  workers: 4,
  timeout: 60_000,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'informes/playwright' }]],
  use: { trace: 'retain-on-failure' },
  projects: [
    { name: 'mobil-360', testIgnore: /e1-proves/, use: { ...chrome, viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true } },
    { name: 'escriptori-1440', testIgnore: /e1-proves/, use: { ...chrome, viewport: { width: 1440, height: 900 } } },
    { name: 'e1-proves', testMatch: /e1-proves/, use: { ...chrome, viewport: { width: 390, height: 844 }, baseURL: 'http://127.0.0.1:4341' } },
  ],
  webServer: [
    {
      command: 'ASTRO_TELEMETRY_DISABLED=1 npx astro preview --port 4329 --host 127.0.0.1',
      // Astro 7 només admet un servidor de previsualització alhora: si ja n'hi ha un, es reutilitza.
      url: 'http://127.0.0.1:4329/',
      reuseExistingServer: true,
    },
    {
      command: 'node scripts/servidor-estatic.mjs dist-proves 4341',
      url: 'http://127.0.0.1:4341/',
      reuseExistingServer: false,
    },
  ],
});
