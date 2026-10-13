import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dataCompleta, diaCurt, franja, rangCurt, rangSetmana, telefonVisible } from '../../src/lib/format.ts';

test('dates i hores en el format de cada llengua (24 h)', () => {
  assert.equal(diaCurt('2026-10-14', 'ca'), 'Dc 14');
  assert.equal(diaCurt('2026-10-14', 'es'), 'Mié 14');
  assert.equal(rangCurt('2026-10-16', '2026-10-18', 'ca'), 'Dv 16–dg 18');
  assert.equal(rangSetmana('2026-10-12', '2026-10-18', 'ca'), 'del dilluns 12 al diumenge 18 d’octubre');
  assert.equal(rangSetmana('2026-10-12', '2026-10-18', 'es'), 'del lunes 12 al domingo 18 de octubre');
  assert.equal(rangSetmana('2026-10-26', '2026-11-01', 'ca'), 'del dilluns 26 d’octubre al diumenge 1 de novembre');
  assert.equal(franja('16:15', '17:15', 'ca'), '16.15–17.15 h');
  assert.equal(franja('16:15', '17:15', 'es'), '16:15–17:15 h');
  assert.equal(dataCompleta('2026-10-13', 'ca'), 'Dimarts, 13 d’octubre de 2026');
  assert.equal(dataCompleta('2026-10-13', 'es'), 'Martes, 13 de octubre de 2026');
  assert.equal(telefonVisible('+34938682800'), '93 868 28 00');
});
