import {test,expect} from '@playwright/test';
import {BASE} from './ajuda.ts';
const ara=Date.parse('2026-10-15T08:00:00Z');
const dada=(time:number,simbol:string,temp:number)=>({properties:{meta:{updated_at:new Date(time).toISOString(),units:{air_temperature:'celsius'}},timeseries:[{time:new Date(time).toISOString(),data:{instant:{details:{air_temperature:temp}},next_1_hours:{summary:{symbol_code:simbol}}}}]}});
test('temps: temperatura, icona i actualització automàtica cada quinze minuts',async({page})=>{
 await page.clock.install({time:new Date(ara)});let crides=0;
 await page.route('https://api.met.no/**',route=>{crides++;return route.fulfill({json:crides===1?dada(ara,'rain',13.6):dada(ara+15*60_000,'clearsky_night',9)})});
 await page.goto(BASE+'/');const temps=page.locator('[data-temps]');
 await expect(temps).toHaveText('14 °C');await expect(temps).toHaveAttribute('data-condicio','pluja');
 await expect(temps).toHaveAccessibleName(/Pluja.*MET Norway/);
 await expect(temps).not.toHaveAttribute('href');
 await expect(temps).toHaveAttribute('role','img');
 await expect(page.locator('.barra a[href*="met.no"], .temps-font')).toHaveCount(0);
 await expect(page.locator('.peu a[href*="open-meteo"]')).toHaveCount(0);
 await page.clock.fastForward(15*60_000);
 await expect(temps).toHaveText('9 °C');await expect(temps).toHaveAttribute('data-condicio','nit');
 expect(crides).toBe(2);
});
test('temps: error de xarxa i dada caducada sense temperatura fictícia (ES)',async({page})=>{
 await page.clock.install({time:new Date(ara)});
 await page.route('https://api.met.no/**',route=>route.fulfill({json:dada(ara-60*60_000,'clearsky_day',24)}));
 await page.goto(BASE+'/es/');const temps=page.locator('[data-temps]');
 await expect(temps).toHaveText('— °C');await expect(temps).toHaveAccessibleName(/no disponible/);
 await page.unroute('https://api.met.no/**');await page.route('https://api.met.no/**',route=>route.abort());
 await page.clock.fastForward(15*60_000);await expect(temps).toHaveText('— °C');
});
test('temps: una mostra anterior deixa de mostrar-se quan caduca',async({page})=>{
 await page.clock.install({time:new Date(ara)});let crides=0;
 await page.route('https://api.met.no/**',route=>{crides++;return crides===1?route.fulfill({json:dada(ara,'clearsky_day',22)}):route.abort()});
 await page.goto(BASE+'/');await expect(page.locator('[data-temps]')).toHaveText('22 °C');
 await page.clock.fastForward(61*60_000);await expect(page.locator('[data-temps]')).toHaveText('— °C');
});
test('serveis útils: serveis horitzontals ampliats i àncores de destí reals',async({page})=>{
 await page.route('https://api.met.no/**',r=>r.abort());
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

test('temps: respecta Expires i canvia de franja amb la resposta en memòria', async({page})=>{
 await page.clock.install({time:new Date(ara)});let crides=0;
 const raw=dada(ara,'cloudy',12);raw.properties.timeseries.push(dada(ara+60*60_000,'rain',10).properties.timeseries[0]);
 await page.route('https://api.met.no/**',route=>{crides++;return route.fulfill({json:raw,headers:{Expires:new Date(ara+90*60_000).toUTCString()}})});
 await page.goto(BASE+'/');await expect(page.locator('[data-temps]')).toHaveText('12 °C');
 await page.clock.fastForward(61*60_000);await expect(page.locator('[data-temps]')).toHaveText('10 °C');expect(crides).toBe(1);
});
