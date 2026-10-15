import {test} from 'node:test';
import assert from 'node:assert/strict';
import { llegeixTemps, condicio, VIGENCIA } from '../../src/lib/temps.ts';
const ara=Date.parse('2026-10-15T08:00:00Z');
const mostra=(overrides={})=>({current_units:{temperature_2m:'°C'},current:{temperature_2m:0,weather_code:0,is_day:1,time:ara/1000,...overrides}});
test('zero graus és una temperatura vàlida; no es tracta com una absència',()=>{assert.equal(llegeixTemps(mostra(),ara)?.temperatura,0)});
test('dades caducades o massa futures no es mostren com a temps actual',()=>{
 assert.equal(llegeixTemps(mostra({time:(ara-VIGENCIA-1)/1000}),ara),null);
 assert.equal(llegeixTemps(mostra({time:(ara+360_000)/1000}),ara),null);
});
test('respostes incompletes i unitats incorrectes es rebutgen',()=>{
 for(const x of [null,{}, {current:mostra().current}, {...mostra(),current_units:{temperature_2m:'°F'}},mostra({temperature_2m:null}),mostra({temperature_2m:NaN}),mostra({is_day:3}),mostra({weather_code:'61'})])assert.equal(llegeixTemps(x,ara),null);
});
test('icona correcta per al codi WMO, incloent dia, nit i casos desconeguts',()=>{
 assert.equal(condicio(0,true),'sol');assert.equal(condicio(0,false),'nit');assert.equal(condicio(2,true),'clarianes');assert.equal(condicio(2,false),'clarianesNit');assert.equal(condicio(3,true),'nuvols');assert.equal(condicio(45,true),'boira');assert.equal(condicio(61,true),'pluja');assert.equal(condicio(73,true),'neu');assert.equal(condicio(95,true),'tempesta');assert.equal(condicio(10,true),'desconegut');
});
