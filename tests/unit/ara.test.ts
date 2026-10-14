// «Avui a Súria»: la frase de la portada només diu el que les dades permeten dir, en hora de Súria.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { composaAra, momentDe, type DadesAra } from '../../src/lib/ara.ts';

const dades: DadesAra = {
  setmana: { inici: '2026-10-12', fi: '2026-10-18' },
  activitats: [
    { titol: 'Deixalleria mòbil', inici: '2026-10-14', hores: [{ inici: '16:15', fi: '17:15' }] },
    { titol: 'Exposició', inici: '2026-10-16', fi: '2026-10-18', hores: [] },
  ],
  guardies: [
    { farmacia: 'Farmàcia Massó', desDe: { data: '2026-10-08', hora: '09:00' }, finsA: { data: '2026-10-15', hora: '09:00' } },
    { farmacia: 'Farmàcia Ripoll', desDe: { data: '2026-10-15', hora: '09:00' }, finsA: { data: '2026-10-22', hora: '09:00' } },
  ],
};
const text = (iso: string, ll: 'ca' | 'es' = 'ca') => composaAra(dades, new Date(iso), ll).trossos.map((t) => t.text).join(' ');

test('matí: salutació, data, activitat pendent i farmàcia fins demà', () => {
  assert.equal(
    text('2026-10-14T11:20:00+02:00'),
    'Bon dia. Avui és dimecres 14 d’octubre. A l’agenda d’avui: Deixalleria mòbil (16.15–17.15 h). La farmàcia de guàrdia és la Farmàcia Massó, fins demà a les 9.00 h.',
  );
});

test('quan l’activitat ja ha acabat, ho diu en lloc d’anunciar-la', () => {
  assert.match(text('2026-10-14T18:00:00+02:00'), /^Bona tarda\..*Les activitats d’avui ja han passat\./);
});

test('dia sense activitats i canvi de torn a les 9.00 h', () => {
  const t = text('2026-10-15T08:30:00+02:00');
  assert.match(t, /Avui l’agenda no té cap activitat\./);
  assert.match(t, /Farmàcia Massó, fins avui a les 9\.00 h\./);
  assert.match(text('2026-10-15T09:00:00+02:00'), /Farmàcia Ripoll, fins al dijous 22 d’octubre a les 9\.00 h\./);
});

test('activitat de diversos dies sense hores: surt cada dia', () => {
  assert.match(text('2026-10-17T12:00:00+02:00'), /A l’agenda d’avui: Exposició\./);
});

test('fora de la setmana declarada i sense torn vigent: avisos honestos', () => {
  const t = composaAra(dades, new Date('2026-10-23T10:00:00+02:00'), 'ca').trossos;
  assert.deepEqual(
    t.slice(2).map((x) => [x.text, x.enllac]),
    [
      ['No tenim l’agenda d’aquesta setmana.', 'agenda-oficial'],
      ['No tenim el torn de la farmàcia de guàrdia actualitzat.', 'farmacia-oficial'],
    ],
  );
});

test('castellà complet', () => {
  assert.equal(
    text('2026-10-14T21:30:00+02:00', 'es'),
    'Buenas noches. Hoy es miércoles 14 de octubre. Las actividades de hoy ya han pasado. La farmacia de guardia es la Farmàcia Massó, hasta mañana a las 9:00 h.',
  );
});

test('el moment del dia és el de Súria, sigui quina sigui la zona del navegador', () => {
  assert.equal(momentDe(new Date('2026-10-14T04:30:00Z')), 'mati');
  assert.equal(momentDe(new Date('2026-10-14T11:30:00Z')), 'tarda');
  assert.equal(momentDe(new Date('2026-10-14T19:30:00Z')), 'vespre');
});
