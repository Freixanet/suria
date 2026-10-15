import {test} from 'node:test';
import assert from 'node:assert/strict';
import {llegeixTemps,condicio,VIGENCIA,EDAT_MODEL} from '../../src/lib/temps.ts';
const ara=Date.parse('2026-10-15T08:30:00Z');
const punt=(time=ara-30*60_000,temp:unknown=0,simbol='clearsky_day')=>({time:new Date(time).toISOString(),data:{instant:{details:{air_temperature:temp}},next_1_hours:{summary:{symbol_code:simbol}}}});
const mostra=(punts=[punt()],updated=ara-3*60*60_000)=>({properties:{meta:{updated_at:new Date(updated).toISOString(),units:{air_temperature:'celsius'}},timeseries:punts}});
test('zero graus és vàlid i la data del model no es confon amb l’hora vigent',()=>{
 const r=llegeixTemps(mostra(),ara);assert.equal(r?.temperatura,0);assert.equal(r?.instant,ara-30*60_000);assert.equal(r?.actualitzat,ara-3*60*60_000);
});
test('selecciona l’última hora vigent encara que no vingui ordenada; no mostra el futur',()=>{
 const raw=mostra([punt(ara+30*60_000,10),punt(ara-90*60_000,3),punt(ara-30*60_000,7)]);
 assert.equal(llegeixTemps(raw,ara)?.temperatura,7);assert.equal(llegeixTemps(raw,ara+31*60_000)?.temperatura,10);
 assert.equal(llegeixTemps(mostra([punt(ara+30*60_000)]),ara),null);
});
test('rebutja models antics o futurs i hores que ja no corresponen al moment actual',()=>{
 assert.equal(llegeixTemps(mostra([punt(ara-VIGENCIA)]),ara),null);
 assert.equal(llegeixTemps(mostra([punt()],ara-EDAT_MODEL-1),ara),null);
 assert.equal(llegeixTemps(mostra([punt()],ara+360_000),ara),null);
});
test('rebutja formats incomplets, unitats incorrectes i valors no finits',()=>{
 const wrong=mostra();wrong.properties.meta.units.air_temperature='fahrenheit';
 for(const x of [null,{}, {properties:{}},wrong,mostra([]),mostra([punt(ara,null)]),mostra([punt(ara,NaN)]),mostra([punt(ara,99)]),mostra([punt(ara,8,'<script>')])])assert.equal(llegeixTemps(x,ara),null);
});
test('símbols de MET: dia, nit, boira, precipitació i tempesta',()=>{
 for(const [s,c] of Object.entries({clearsky_day:'sol',clearsky_night:'nit',partlycloudy_day:'clarianes',partlycloudy_night:'clarianesNit',cloudy:'nuvols',fog:'boira',lightrainshowers_day:'pluja',sleet:'neu',snow:'neu',heavysnowandthunder:'tempesta',unknown:'desconegut'}))assert.equal(condicio(s),c);
});
