// Recorreguts principals de l'especificació UX §6, en català i castellà.
import { test, expect } from '@playwright/test';
import { BASE, obreMenu, objectius, pagines, rellotge } from './ajuda.ts';

test.describe('portada', () => {
  test('identitat, avís d’independència i les tres tasques abans de res més', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.locator('html')).toHaveAttribute('lang', 'ca');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Súria');
    await expect(page.locator('.avis')).toContainText('No és una web de l’Ajuntament');
    await obreMenu(page);
    const nav = page.getByRole('navigation', { name: 'Tasques' });
    for (const nom of ['Aquesta setmana', 'Menjar i comprar', 'Primers passos', 'Cap on anem']) {
      await expect(nav.getByRole('link', { name: nom })).toBeVisible();
    }
    // «Façanes»: a la primera pantalla, la foto amb el nom, les tasques i el resum d'avui (agenda i farmàcia).
    await rellotge(page, '2026-10-14T11:20:00+02:00');
    await page.reload();
    const alt = page.viewportSize()!.height;
    const posicio = (sel: string) => page.locator(sel).evaluate((el) => el.getBoundingClientRect().top);
    // La foto té prioritat de qualitat (14/10/2026; a l'escriptori, més alta a petició del promotor): el títol del
    // resum d'avui, dins de la primera pantalla.
    expect(await posicio('#h-avui')).toBeLessThan(alt);
    await expect(page.locator('[data-fet-agenda] a.accio')).toHaveAttribute('href', '#h-setmana');
    // La reixa no fa esperar l'agenda fins al final de la columna de serveis en escriptori.
    const resum = await page.locator('.avui-esquerra').boundingBox();
    const targetes = await page.locator('.avui-targetes').boundingBox();
    const agendaY = await posicio('#h-setmana');
    if (page.viewportSize()!.width > 900) {
      expect(agendaY - (resum!.y + resum!.height)).toBeLessThan(70);
      expect(agendaY).toBeLessThan(targetes!.y + targetes!.height);
    } else {
      expect(agendaY).toBeGreaterThan(targetes!.y + targetes!.height);
      expect(agendaY - (targetes!.y + targetes!.height)).toBeLessThan(70);
    }
  });

  test('«Aquesta setmana» només conté activitats de la setmana; la resta va a «Pròximament»', async ({ page }) => {
    await rellotge(page, '2026-10-13T10:00:00+02:00');
    await page.goto(`${BASE}/`);
    const setmana = page.locator('.setmana .llista > li');
    await expect(setmana).toHaveCount(4);
    await expect(page.locator('.setmana .llista')).not.toContainText('Setmana de la Gent Gran');
    await expect(page.locator('.proximament')).toContainText('Setmana de la Gent Gran');
    await expect(page.locator('.setmana .vigencia')).toHaveText('Del dilluns 12 al diumenge 18 d’octubre');
  });

  test('portada densa: per actuar n’hi ha prou amb el que es veu; les explicacions, al detall', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const taller = page.locator('.setmana .llista > li', { hasText: 'Taller d’estimulació cognitiva' });
    await expect(taller.locator('.dia time').first()).toHaveText('Dijous 15');
    await expect(taller.locator('.hores')).toHaveText('15.30 – 16.45 h');
    await expect(taller).toContainText('Escola Municipal de Formació d’Adults');
    await expect(taller).toContainText('Més de 60 anys');
    await expect(taller.getByRole('link', { name: 'Taller d’estimulació cognitiva' })).toBeVisible();
    await expect(taller).not.toContainText('cada dijous feiner');
    // Procedència i vigència, visibles a la portada.
    await expect(page.locator('.setmana .vigencia')).toBeVisible();
    await expect(page.locator('.setmana .agenda-font')).toHaveCount(0);
    await expect(taller.locator('.titol-peca a')).toHaveCSS('text-decoration-line', 'none');
    // Sense etiqueta «En prova» ni data de consulta a la vista (decisió del promotor, 14/10/2026).
    await expect(page.locator('.setmana .maduresa')).toHaveCount(0);
    // L'explicació llarga és a la pàgina de detall.
    await obreMenu(page);
    await page.getByRole('navigation', { name: 'Tasques' }).getByRole('link', { name: 'Aquesta setmana' }).click();
    await expect(page.locator('.llista > li', { hasText: 'Taller' })).toContainText('cada dijous feiner');
  });

  test('«Pròximament» a la portada: compacte, després de l’agenda i abans dels serveis, amb enllaç al programa', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const ordre = await page.evaluate(() => {
      const tots = [...document.querySelectorAll('#h-setmana, #h-serveis, .proximament, #h-passos, #h-menjar')];
      return tots.map((e) => e.id || e.className.split(' ')[0]);
    });
    expect(ordre).toEqual(['h-setmana', 'proximament', 'h-serveis']);
    const proxim = page.locator('.proximament');
    await expect(proxim).toContainText('Inscripció oberta');
    await expect(proxim).not.toContainText('Caminada');
    await proxim.getByRole('link', { name: 'Programa i detalls' }).click();
    await expect(page).toHaveURL(`${BASE}/aquesta-setmana/#proximament`);
    await expect(page.locator('#proximament')).toContainText('Caminada de la Gent Gran');
  });

  test('farmàcia de guàrdia a la portada: el resum mostra només el torn vigent', async ({ page }) => {
    await rellotge(page, '2026-10-15T10:00:00+02:00');
    await page.goto(`${BASE}/`);
    const farmacia = page.locator('[data-fet-farmacia]');
    await expect(farmacia).toContainText('Farmàcia Ripoll');
    await expect(farmacia).toContainText('9.00 – 24.00 h');
    await expect(farmacia).not.toContainText('Massó');
    await expect(farmacia.getByRole('link', { name: /Trucar/ })).toHaveAttribute('href', 'tel:+34938694163');
    await expect(farmacia.getByRole('link', { name: 'Com arribar-hi' })).toHaveAttribute('href', /google\.com\/maps\/dir\/.*Ripoll/);
  });

  test('resum d’avui: si les activitats d’avui ja han passat, la pròxima amb la seva data', async ({ page }) => {
    await rellotge(page, '2026-10-14T21:30:00+02:00');
    await page.goto(`${BASE}/`);
    const agenda = page.locator('[data-fet-agenda]');
    await expect(agenda).toContainText('Pròxima activitat');
    await expect(agenda).toContainText('Les d’avui ja han passat.');
    await expect(agenda).toContainText('Unitat Mòbil d’Informació al Consumidor');
    await expect(agenda).toContainText('Dijous 15 d’octubre · 10.30 – 11.30 h');
    await expect(agenda.locator('a.fet-titol')).toHaveAttribute('href', await page.locator('.setmana .titol-peca a', {hasText:'Unitat Mòbil'}).getAttribute('href') as string);
    await expect(page.locator('.avui-agenda > .font, .proximament .font, .proximament .procedencia')).toHaveCount(0);
    await expect(page.locator('#h-avui')).toHaveText('Avui a Súria');
    await expect(page.locator('[data-data-avui]')).toHaveText('Dimecres 14 d’octubre');
  });

  test('resum d’avui: setmana caducada, l’activitat verificada en curs i la nota amb l’agenda municipal (en castellà)', async ({ page }) => {
    await rellotge(page, '2026-10-23T10:00:00+02:00');
    await page.goto(`${BASE}/es/`);
    const agenda = page.locator('[data-fet-agenda]');
    await expect(agenda.locator('.fet-titol')).toContainText('Setmana de la Gent Gran');
    await expect(agenda.locator('.fet-quan')).toHaveText('Hasta el domingo 8 de noviembre');
    await expect(agenda.locator('.fet-nota')).toHaveText('No tenemos la agenda de esta semana.');
    await expect(agenda.getByRole('link', { name: 'Agenda de suria.cat' })).toHaveAttribute('href', 'https://www.suria.cat/agenda');
    await expect(page.locator('[data-fet-farmacia]')).toContainText('No tenemos el turno de guardia actualizado.');
  });

  test('farmàcia sense cap torn vigent: ho diu i porta a la font oficial (portada i detall)', async ({ page }) => {
    await rellotge(page, '2026-10-22T10:00:00+02:00');
    for (const ruta of ['/', '/primers-passos/']) {
      await page.goto(`${BASE}${ruta}`);
      const avis = page.getByText('No tenim el torn de guàrdia actualitzat. Consulta’l a la font oficial.');
      await expect(avis).toBeVisible();
      await expect(page.getByRole('link', { name: 'Farmàcies de guàrdia a suria.cat' })).toHaveAttribute('href', 'https://www.suria.cat/el-municipi/serveis/farmaciesdeguardia1');
    }
  });

  test('farmàcia amb torn vigent: sense avís de manca d’informació', async ({ page }) => {
    await rellotge(page, '2026-10-21T10:00:00+02:00');
    await page.goto(`${BASE}/`);
    await expect(page.getByText('No tenim el torn de guàrdia actualitzat.', { exact: false })).toBeHidden();
    await expect(page.locator('[data-fet-farmacia]')).toContainText('Farmàcia Ripoll');
  });

  test('les hores dins del text es componen en la lletra de dades', async ({ page }) => {
    await page.goto(`${BASE}/primers-passos/`);
    const hora = page.locator('.passos .hora').first();
    await expect(hora).toHaveText('9.00 – 14.00 h');
    expect(await hora.evaluate((e) => getComputedStyle(e).fontFamily)).toContain('Bricolage');
  });

  test('cada activitat té dia, hora, lloc i enllaç a la seva fitxa', async ({ page }) => {
    await rellotge(page, '2026-10-13T10:00:00+02:00');
    await page.goto(`${BASE}/aquesta-setmana/`);
    for (const li of await page.locator('.llista > li').all()) {
      await expect(li.locator('.dia')).not.toBeEmpty();
      await expect(li.locator('.hores')).toContainText(' h');
      await expect(li.getByRole('link')).toHaveAttribute('href', /^https:\/\/www\.suria\.cat\//);
      await expect(li.locator('.titol-peca a')).toHaveCount(1);
      await expect(li.locator('.accio, .procedencia')).toHaveCount(0);
    }
  });

  test('empadronar-se porta al tràmit d’alta al Padró', async ({ page }) => {
    await page.goto(`${BASE}/primers-passos/`);
    await expect(page.getByRole('link', { name: 'Tràmit d’alta en línia' })).toHaveAttribute(
      'href',
      'https://suria.eadministracio.cat/catalog/t/d120f65c-c936-4a95-bd50-e7ae970ca149',
    );
    await expect(page.getByRole('link', { name: /Trucar a l’OAC/ }).first()).toHaveAttribute('href', 'tel:+34938682800');
  });

  test('cap enllaç apunta a # ni queda buit', async ({ page }) => {
    for (const { ruta } of pagines) {
      await page.goto(`${BASE}${ruta}`);
      const dolents = await page.locator('a[href="#"], a[href=""], a:not([href])').count();
      expect(dolents, ruta).toBe(0);
    }
  });
});

test.describe('navegació i llengua', () => {
  test('cada tasca té la seva pàgina, marcada com a actual', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await obreMenu(page);
    await page.getByRole('navigation', { name: 'Tasques' }).getByRole('link', { name: 'Primers passos' }).click();
    await expect(page).toHaveURL(`${BASE}/primers-passos/`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Primers passos a Súria');
    await obreMenu(page);
    await expect(page.getByRole('link', { name: 'Primers passos', exact: true }).first()).toHaveAttribute('aria-current', 'page');
  });

  test('al mòbil, «Menú» obre i tanca les tasques (també amb Esc); a l’escriptori, sempre a la vista', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const boto = page.getByRole('button', { name: 'Menú' });
    const tasca = page.getByRole('navigation', { name: 'Tasques' }).getByRole('link', { name: 'Primers passos' });
    if (page.viewportSize()!.width >= 1152) {
      await expect(boto).toBeHidden();
      await expect(tasca).toBeVisible();
      return;
    }
    await expect(boto).toHaveAttribute('aria-expanded', 'false');
    await expect(tasca).toBeHidden();
    await boto.click();
    await expect(boto).toHaveAttribute('aria-expanded', 'true');
    await expect(tasca).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(boto).toHaveAttribute('aria-expanded', 'false');
    await expect(boto).toBeFocused();
    await expect(tasca).toBeHidden();
  });

  test('sense JavaScript, les tasques es veuen sempre i no hi ha botó «Menú»', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(`${BASE}/es/`);
    await expect(page.getByRole('button', { name: 'Menú' })).toBeHidden();
    await expect(page.getByRole('navigation', { name: 'Tareas' }).getByRole('link', { name: 'Primeros pasos' })).toBeVisible();
    await context.close();
  });

  test('canviar a castellà es queda a la mateixa secció i es recorda', async ({ page }) => {
    await page.goto(`${BASE}/aquesta-setmana/`);
    await obreMenu(page);
    await page.getByRole('navigation', { name: 'Llengua' }).getByRole('link', { name: 'Castellano' }).click();
    await expect(page).toHaveURL(`${BASE}/es/esta-semana/`);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Esta semana en Súria');
    // Tornar a entrar des de fora per l'adreça catalana porta a la castellana.
    await page.goto(`${BASE}/primers-passos/`);
    await expect(page).toHaveURL(`${BASE}/es/primeros-pasos/`);
    // I es pot tornar al català, que també es recorda.
    await obreMenu(page);
    await page.getByRole('navigation', { name: 'Idioma' }).getByRole('link', { name: 'Català' }).click();
    await expect(page).toHaveURL(`${BASE}/primers-passos/`);
  });

  test('pàgina no trobada en les dues llengües, amb sortides', async ({ page }) => {
    const r = await page.goto(`${BASE}/no-existeix/`);
    expect(r?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Aquesta pàgina no existeix');
    await expect(page.getByRole('heading', { name: 'Esta página no existe' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Aquesta setmana' }).last()).toBeVisible();
  });

  test('totes les pàgines porten noindex i declaren la llengua', async ({ page }) => {
    for (const { ruta, llengua } of pagines) {
      await page.goto(`${BASE}${ruta}`);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
      await expect(page.locator('html')).toHaveAttribute('lang', llengua);
    }
  });
});

test.describe('vigència', () => {
  test('els dies passats no apareixen i les activitats de diversos dies continuen visibles', async ({ page }) => {
    await rellotge(page, '2026-10-16T10:00:00+02:00');
    await page.goto(`${BASE}/aquesta-setmana/`);
    const deixalleria = page.locator('.llista > li', { hasText: 'Deixalleria mòbil' });
    await expect(deixalleria).toBeHidden();
    const exposicio = page.locator('.llista > li', { hasText: 'Diversitat' });
    await expect(exposicio).toBeVisible();
    await page.clock.fastForward(3 * 24 * 60 * 60_000);
    await expect(exposicio).toBeHidden();
  });

  test('una activitat es marca com a passada quan acaba la seva hora, no a mitjanit', async ({ page }) => {
    await rellotge(page, '2026-10-14T18:30:00+02:00');
    await page.goto(`${BASE}/`);
    const deixalleria = page.locator('.setmana .llista > li', { hasText: 'Deixalleria mòbil' });
    await expect(deixalleria.getByText('Ja ha passat')).toBeVisible();
    await rellotge(page, '2026-10-14T17:00:00+02:00');
    await page.reload();
    await expect(deixalleria.getByText('Ja ha passat')).toBeHidden();
  });

  test('acabada la setmana, l’agenda avisa que és antiga i porta a la municipal', async ({ page }) => {
    await rellotge(page, '2026-10-19T09:00:00+02:00');
    await page.goto(`${BASE}/`);
    await expect(page.locator('.setmana .caducada')).toBeVisible();
    await expect(page.locator('.setmana .caducada')).toContainText('Aquesta agenda era de la setmana');
  });

  test('el torn de farmàcia acabat es marca', async ({ page }) => {
    await rellotge(page, '2026-10-15T10:00:00+02:00');
    await page.goto(`${BASE}/primers-passos/`);
    const masso = page.locator('.guardies li', { hasText: 'Farmàcia Massó' });
    await expect(masso.getByText('Aquest torn ja ha acabat.')).toBeVisible();
    const ripoll = page.locator('.guardies li', { hasText: 'Farmàcia Ripoll' });
    await expect(ripoll.getByText('Aquest torn ja ha acabat.')).toBeHidden();
  });
});

test.describe('mida i adaptació', () => {
  test('cap scroll horitzontal i objectius tàctils de navegació i acció ≥ 44 px', async ({ page }) => {
    for (const { ruta } of pagines) {
      await page.goto(`${BASE}${ruta}`);
      const desborda = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(desborda, `${ruta}: desbordament horitzontal`).toBeLessThanOrEqual(0);
      const petits = (await objectius(page)).filter((o) => !o.enText && !o.saltar && (o.h < 44 || o.w < 24));
      expect(petits, `${ruta}: objectius petits`).toEqual([]);
    }
  });

  test('amb el text al 200 % no es perd contingut ni apareix scroll horitzontal', async ({ page }) => {
    for (const { ruta } of pagines) {
      await page.goto(`${BASE}${ruta}`);
      await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
      const desborda = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(desborda, ruta).toBeLessThanOrEqual(0);
      // Cap text tallat: cap element amb overflow ocult que amagui contingut.
      const tallats = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>('main *, header *, nav *')]
          // El text només per a lectors de pantalla es retalla a propòsit.
          .filter((el) => !el.closest('.visually-hidden'))
          .filter((el) => el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX === 'hidden')
          .map((el) => el.className || el.tagName),
      );
      expect(tallats, ruta).toEqual([]);
    }
  });

  test('cap text per sota de 14 px', async ({ page }) => {
    for (const { ruta } of pagines) {
      await page.goto(`${BASE}${ruta}`);
      const petits = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>('body *')]
          .filter((el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent!.trim()))
          .filter((el) => el.getClientRects().length && !el.closest('.visually-hidden'))
          .filter((el) => parseFloat(getComputedStyle(el).fontSize) < 14)
          .map((el) => `${el.tagName}.${el.className}: ${el.textContent!.trim().slice(0, 30)}`),
      );
      expect(petits, ruta).toEqual([]);
    }
  });
});
