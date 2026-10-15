// Bus de la portada: només hores de l'horari programat, en hora de Súria; en festiu, cap hora.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { composaBus, sortidesDe, type DadesBus } from '../../src/lib/bus.ts';

const dades: DadesBus = {
  sentits: [
    {
      id: 'suria-manresa',
      etiqueta: 'Cap a Manresa',
      horaris: [
        { dies: ['dl', 'dt', 'dc', 'dj', 'dv'], sortides: ['06:53', '10:55', '12:05', '13:05', '19:45'] },
        { dies: ['ds'], sortides: ['07:55'] },
        { dies: ['dg'], sortides: ['08:36'] },
      ],
    },
    {
      id: 'manresa-suria',
      etiqueta: 'Des de Manresa',
      horaris: [{ dies: ['dl', 'dt', 'dc', 'dj', 'dv'], sortides: ['19:30', { hora: '20:00', des: '2026-10-01', fins: '2026-12-21' }] }],
    },
  ],
  festius: ['2026-12-08'],
};
const resum = (iso: string, ll: 'ca' | 'es' = 'ca') => composaBus(dades, new Date(iso), ll);

test('dimecres al matí: la pròxima sortida, quant falta si és abans d’una hora, i les dues següents', () => {
  const [anada] = resum('2026-10-14T10:20:00+02:00').sentits;
  assert.deepEqual(anada, { estat: 'propers', id: 'suria-manresa', etiqueta: 'Cap a Manresa', propera: '10.55 h', minuts: 35, despres: ['12.05', '13.05'] });
});

test('més d’una hora d’espera: no es diu quant falta', () => {
  const [anada] = resum('2026-10-14T07:00:00+02:00').sentits;
  assert.equal(anada.estat === 'propers' && anada.minuts, undefined);
});

test('la sortida del mateix minut encara compta', () => {
  const [anada] = resum('2026-10-14T10:55:00+02:00').sentits;
  assert.equal(anada.estat === 'propers' && `${anada.propera} ${anada.minuts}`, '10.55 h 0');
});

test('sense més busos avui: el primer de demà; el divendres al vespre, el del dissabte', () => {
  const [anada] = resum('2026-10-14T21:00:00+02:00').sentits;
  assert.deepEqual(anada, { estat: 'acabat', id: 'suria-manresa', etiqueta: 'Cap a Manresa', primer: 'demà a les 6.53 h' });
  const [divendres] = resum('2026-10-16T21:00:00+02:00', 'es').sentits;
  assert.equal(divendres.estat === 'acabat' && divendres.primer, 'mañana a las 7:55 h');
});

test('un reforç temporal només surt dins de la seva vigència', () => {
  assert.deepEqual(sortidesDe(dades.sentits[1].horaris, [], '2026-12-21'), ['19:30', '20:00']);
  assert.deepEqual(sortidesDe(dades.sentits[1].horaris, [], '2026-12-22'), ['19:30']);
});

test('festiu: cap hora (l’operador no diu quin horari hi aplica)', () => {
  const r = resum('2026-12-08T10:00:00+01:00');
  assert.equal(r.festiu, true);
  assert.deepEqual(r.sentits.map((s) => s.estat), ['festiu', 'festiu']);
});

test('si l’endemà és festiu, no s’anuncia cap primer bus', () => {
  const [anada] = resum('2026-12-07T21:00:00+01:00').sentits;
  assert.deepEqual(anada, { estat: 'acabat', id: 'suria-manresa', etiqueta: 'Cap a Manresa' });
});
