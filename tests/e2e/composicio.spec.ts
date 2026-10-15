// Regressions de la cabecera ampla i de l'ordre útil de portada.
import { test, expect } from '@playwright/test';
import { BASE } from './ajuda.ts';

test('cabecera estable en les dues llengües, incloent pantalles amples', async ({ page }) => {
  for (const ruta of ['/', '/es/', '/aquesta-setmana/', '/es/esta-semana/']) {
    for (const width of [360, 390, 768, 1024, 1279, 1280, 1440, 1792, 1920, 2560]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${BASE}${ruta}`);
      await page.evaluate(() => document.fonts.ready);
      const estat = await page.evaluate(() => {
        const marca = document.querySelector('.marca')!;
        const estil = getComputedStyle(marca);
        const r = marca.getBoundingClientRect();
        const links = [...document.querySelectorAll('.mast .tasques li:not(.inici) a')];
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          marcaUnaLinia: r.height < parseFloat(estil.fontSize) * 1.5,
          files: new Set(links.map(el => Math.round(el.getBoundingClientRect().top))).size,
          linksVisibles: links.every(el => el.getBoundingClientRect().width > 0),
        };
      });
      expect(estat.overflow, `${ruta} @ ${width}`).toBe(false);
      expect(estat.marcaUnaLinia, `${ruta} @ ${width}: marca partida`).toBe(true);
      if (width >= 1280) {
        expect(estat.linksVisibles).toBe(true);
        expect(estat.files, `${ruta} @ ${width}: tasca òrfena`).toBe(1);
      }
    }
  }
});

test('rang de dates complet i llegible, sense partir dies', async ({ page }) => {
  await page.goto(`${BASE}/`);
  const rang = page.locator('.setmana .dia').filter({ has: page.locator('time[datetime="2026-10-18"]') });
  await expect(rang.locator('time')).toHaveCount(2);
  await expect(rang.locator('.visually-hidden')).toContainText('2026');
  for (const endpoint of await rang.locator('time').all()) {
    expect(await endpoint.evaluate(e => e.scrollWidth <= e.clientWidth + 1)).toBe(true);
  }
});

test('cabecera amb lletra al 200% en amplades intermèdies', async ({ page }) => {
  for (const ruta of ['/', '/es/']) for (const width of [768, 1280, 1440, 1920]) {
    await page.setViewportSize({width, height: 900});
    await page.goto(`${BASE}${ruta}`);
    await page.addStyleTag({content: 'html { font-size: 200% !important; }'});
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${ruta} ${width}`).toBe(false);
    const menu = page.locator('[data-menu-boto]');
    await expect(menu).toBeVisible();
    await menu.click();
    await expect(page.locator('.mast .tasques')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toBeFocused();
  }
});

test('geometria de capçalera, idiomes i serveis', async ({page}) => {
  await page.clock.install({ time: new Date('2026-10-15T06:00:00Z') });
  for (const width of [390, 960, 1024, 1100, 1440]) {
    await page.setViewportSize({width, height: 900});
    await page.goto(`${BASE}/`);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('.barra .llengua')).toHaveCount(0);
    const botons = page.locator('.targeta-botons a');
    const trucar = await botons.nth(0).boundingBox();
    const mapa = await botons.nth(1).boundingBox();
    expect(mapa!.x).toBeGreaterThan(trucar!.x + trucar!.width);
    expect(Math.abs(mapa!.y - trucar!.y)).toBeLessThan(1);
    expect(Math.abs(mapa!.height - trucar!.height)).toBeLessThan(1);
    await expect(botons.nth(1)).toHaveAccessibleName('Com arribar-hi');
    await expect(botons.nth(1)).toHaveText('');
    const geometry = await page.locator('.targeta').first().evaluate(el => {
      const cs = getComputedStyle(el); const child = getComputedStyle(el.querySelector('.boto')!);
      return {radius: parseFloat(cs.borderRadius), padding: parseFloat(cs.paddingLeft), border: parseFloat(child.borderTopWidth), child: parseFloat(child.borderRadius)};
    });
    expect(geometry.padding).toBe(Math.max(16, geometry.radius * .75));
    expect(geometry.child).toBe(12); // Botó independent: excepció visual autoritzada pel promotor.
    for (const sentit of await page.locator('.bus-sentit').all()) {
      const left = await sentit.locator('.bus-info').boundingBox();
      const right = await sentit.locator('.bus-hora').boundingBox();
      expect(Math.abs(left!.y + left!.height/2 - right!.y - right!.height/2)).toBeLessThan(1);
    }
    if(width===390) {
      await expect(botons.nth(0).locator('.xifres')).toBeHidden();
      const marca = await page.locator('.capcalera > .mast .marca').boundingBox();
      const menu = page.locator('[data-menu-boto]'); const rect = await menu.boundingBox();
      expect(Math.abs(marca!.y + marca!.height/2 - rect!.y - rect!.height/2)).toBeLessThan(1);
      await expect(page.locator('.llengua-mast')).toBeHidden();
      await menu.click();
      await expect(page.locator('.llengua-mast')).toBeVisible();
      const ultim = await page.locator('.tasques li').last().boundingBox();
      const llengua = await page.locator('.llengua-mast').boundingBox();
      expect(llengua!.y).toBeGreaterThanOrEqual(ultim!.y + ultim!.height);
    } else if (width >= 1280) await expect(botons.nth(0).locator('.xifres')).toBeVisible();
    else await expect(botons.nth(0).locator('.xifres')).toBeHidden();
  }
});
