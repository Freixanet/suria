import {test,expect} from '@playwright/test';
import {BASE} from './ajuda.ts';
const ara=Date.parse('2026-10-15T08:00:00Z');
const dada=(time:number,codi:number,temp:number,dia=1)=>({current_units:{temperature_2m:'°C'},current:{time:time/1000,temperature_2m:temp,weather_code:codi,is_day:dia}});
test('temps: temperatura, icona i actualització automàtica cada quinze minuts',async({page})=>{
 await page.clock.install({time:new Date(ara)});let crides=0;
 await page.route('https://api.open-meteo.com/**',route=>{crides++;return route.fulfill({json:crides===1?dada(ara,61,13.6):dada(ara+15*60_000,0,9,0)})});
 await page.goto(BASE+'/');const temps=page.locator('[data-temps]');
 await expect(temps).toHaveText('14 °C');await expect(temps).toHaveAttribute('data-condicio','pluja');
 await expect(temps).toHaveAccessibleName(/Pluja.*Open-Meteo/);
 await expect(temps).not.toHaveAttribute('href');
 await expect(temps).toHaveAttribute('role','img');
 await expect(page.locator('.peu a[href*="open-meteo"]')).toHaveCount(0);
 await page.clock.fastForward(15*60_000);
 await expect(temps).toHaveText('9 °C');await expect(temps).toHaveAttribute('data-condicio','nit');
 expect(crides).toBe(2);
});
test('temps: error de xarxa i dada caducada sense temperatura fictícia (ES)',async({page})=>{
 await page.clock.install({time:new Date(ara)});
 await page.route('https://api.open-meteo.com/**',route=>route.fulfill({json:dada(ara-60*60_000,0,24)}));
 await page.goto(BASE+'/es/');const temps=page.locator('[data-temps]');
 await expect(temps).toHaveText('— °C');await expect(temps).toHaveAccessibleName(/no disponible/);
 await page.unroute('https://api.open-meteo.com/**');await page.route('https://api.open-meteo.com/**',route=>route.abort());
 await page.clock.fastForward(15*60_000);await expect(temps).toHaveText('— °C');
});
test('temps: una mostra anterior deixa de mostrar-se quan caduca',async({page})=>{
 await page.clock.install({time:new Date(ara)});let crides=0;
 await page.route('https://api.open-meteo.com/**',route=>{crides++;return crides===1?route.fulfill({json:dada(ara,0,22)}):route.abort()});
 await page.goto(BASE+'/');await expect(page.locator('[data-temps]')).toHaveText('22 °C');
 await page.clock.fastForward(46*60_000);await expect(page.locator('[data-temps]')).toHaveText('— °C');
});
test('serveis útils: serveis horitzontals ampliats i àncores de destí reals',async({page})=>{
 await page.route('https://api.open-meteo.com/**',r=>r.abort());
 await page.goto(BASE+'/');const serveis=page.getByRole('region',{name:'Serveis útils'});
 await expect(serveis.getByRole('link')).toHaveCount(10);
 for (const nom of ['Ajuntament','CAP','Biblioteca','Correos']) await expect(serveis.getByRole('link',{name:nom,exact:true})).toHaveCount(1);
 expect((await serveis.getByRole('link').first().boundingBox())!.width).toBeGreaterThanOrEqual(208);
 const colors=await serveis.getByRole('link').evaluateAll(es=>es.map(e=>getComputedStyle(e).backgroundColor));
 expect(new Set(colors).size).toBeGreaterThanOrEqual(7);
 await expect(serveis.locator('ul')).toHaveCSS('scrollbar-width','none');
 const y=await serveis.getByRole('link').evaluateAll(es=>es.map(e=>Math.round(e.getBoundingClientRect().y)));
 expect(new Set(y).size).toBe(1);
 await serveis.getByRole('link',{name:'Mobles i poda'}).click();
 await expect(page).toHaveURL(/primers-passos\/#mobles-i-poda$/);await expect(page.locator('#mobles-i-poda')).toBeVisible();
});
