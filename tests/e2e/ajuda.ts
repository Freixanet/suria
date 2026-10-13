import type { Page } from '@playwright/test';

// Servidor que es prova (per defecte, la previsualització d'Astro).
export const BASE = process.env.SURIA_BASE ?? 'http://127.0.0.1:4329';

export const pagines = [
  { ruta: '/', llengua: 'ca' },
  { ruta: '/aquesta-setmana/', llengua: 'ca' },
  { ruta: '/menjar-i-comprar/', llengua: 'ca' },
  { ruta: '/primers-passos/', llengua: 'ca' },
  { ruta: '/cap-on-anem/', llengua: 'ca' },
  { ruta: '/que-estem-provant/', llengua: 'ca' },
  { ruta: '/es/', llengua: 'es' },
  { ruta: '/es/esta-semana/', llengua: 'es' },
  { ruta: '/es/comer-y-comprar/', llengua: 'es' },
  { ruta: '/es/primeros-pasos/', llengua: 'es' },
  { ruta: '/es/hacia-donde-vamos/', llengua: 'es' },
  { ruta: '/es/que-estamos-probando/', llengua: 'es' },
] as const;

/** Fixa el rellotge del navegador a una hora de Súria (Europe/Madrid, amb el desfasament donat). */
export async function rellotge(page: Page, isoAmbZona: string) {
  await page.clock.install({ time: new Date(isoAmbZona) });
}

/** Mida i tipus de cada element interactiu visible. */
export async function objectius(page: Page) {
  return page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>('a[href], button, input, select, summary')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden' && !el.closest('[hidden]');
      })
      .map((el) => {
        const r = el.getBoundingClientRect();
        const enText = getComputedStyle(el).display === 'inline' && !!el.closest('p, figcaption, li') && (el.parentElement?.textContent?.trim().length ?? 0) > (el.textContent?.trim().length ?? 0) + 3;
        return { text: (el.textContent ?? '').trim().slice(0, 40), w: Math.round(r.width), h: Math.round(r.height), enText, saltar: el.classList.contains('saltar') };
      }),
  );
}
