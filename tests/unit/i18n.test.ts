// Les dues llengües han d'existir senceres: cap text en una sola llengua.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ui } from '../../src/i18n/ui.ts';
import { provant } from '../../src/i18n/textos-pagines.ts';

test('mateixes claus en català i castellà, cap de buida', () => {
  assert.deepEqual(Object.keys(ui.es).sort(), Object.keys(ui.ca).sort());
  for (const ll of ['ca', 'es'] as const) for (const [k, v] of Object.entries(ui[ll])) assert.ok(v.trim().length > 0, `${ll}:${k}`);
});

test('les variables {x} coincideixen entre llengües', () => {
  const vars = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort().join(',');
  for (const k of Object.keys(ui.ca) as (keyof typeof ui.ca)[]) assert.equal(vars(ui.es[k]), vars(ui.ca[k]), k);
});

test('«Què estem provant» té la mateixa estructura en les dues llengües', () => {
  assert.deepEqual(Object.keys(provant.es).sort(), Object.keys(provant.ca).sort());
  assert.deepEqual(provant.es.proves.map((p) => p.tasca), provant.ca.proves.map((p) => p.tasca));
});
