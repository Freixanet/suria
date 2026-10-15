// «Avui a Súria»: el resum de la portada només diu el que les dades permeten dir, en hora de Súria.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { composaResum, momentDe, type DadesAra } from '../../src/lib/ara.ts';

const dades: DadesAra = {
  setmana: { inici: '2026-10-12', fi: '2026-10-18' },
  activitats: [
    { titol: 'Exposició', inici: '2026-10-16', fi: '2026-10-18', hores: [], ancora: '#h-setmana' },
    { titol: 'Deixalleria mòbil', inici: '2026-10-14', hores: [{ inici: '16:15', fi: '17:15' }], lloc: 'Escoles', ancora: '#h-setmana' },
    { titol: 'Taller', inici: '2026-10-15', hores: [{ inici: '15:30', fi: '16:45' }], ancora: '#h-setmana' },
    { titol: 'Setmana de la Gent Gran', inici: '2026-10-19', fi: '2026-11-08', hores: [], ancora: '#h-proximament' },
  ],
  guardies: [
    { farmacia: 'Farmàcia Massó', adreca: 'c. Pompeu Fabra, 1', telefon: '+34938682289', desDe: { data: '2026-10-08', hora: '09:00' }, finsA: { data: '2026-10-15', hora: '09:00' } },
    { farmacia: 'Farmàcia Ripoll', adreca: 'c. Salvador Vancell, 8', telefon: '+34938694163', desDe: { data: '2026-10-15', hora: '09:00' }, finsA: { data: '2026-10-22', hora: '09:00' } },
  ],
};
const resum = (iso: string, ll: 'ca' | 'es' = 'ca') => composaResum(dades, new Date(iso), ll);

test('matí: salutació, data, activitat d’avui i farmàcia fins demà', () => {
  const r = resum('2026-10-14T11:20:00+02:00');
  assert.equal(r.salutacio, 'Bon dia');
  assert.equal(r.data, 'Dimecres 14 d’octubre');
  assert.deepEqual(r.agenda, { tipus: 'activitat', etiqueta: 'Agenda', titol: 'Deixalleria mòbil', ancora: '#h-setmana', quan: '16.15 – 17.15 h', lloc: 'Escoles', mes: undefined });
  assert.deepEqual(r.farmacia, { tipus: 'torn', etiqueta: 'Farmàcia de guàrdia', nom: 'Farmàcia Massó', fins: 'Fins demà a les 9.00 h', horari: '0.00 – 24.00 h', adreca: 'c/ Pompeu Fabra, 1', telefon: '+34938682289', seguent: { nom: 'Farmàcia Ripoll', desDe: 'Des de demà a les 9.00 h' } });
});

test('activitats d’avui acabades: protagonisme per a la pròxima, amb la seva data, i una nota discreta', () => {
  const r = resum('2026-10-14T18:00:00+02:00');
  assert.equal(r.salutacio, 'Bona tarda');
  assert.equal(r.agenda.tipus, 'activitat');
  if (r.agenda.tipus !== 'activitat') return;
  assert.equal(r.agenda.etiqueta, 'Pròxima activitat');
  assert.equal(r.agenda.nota, 'Les d’avui ja han passat.');
  assert.equal(r.agenda.titol, 'Taller');
  assert.equal(r.agenda.quan, 'Dijous 15 d’octubre · 15.30 – 16.45 h');
});

test('canvi de torn a les 9.00 h: fins avui i, després, el torn nou', () => {
  const abans = resum('2026-10-15T08:30:00+02:00').farmacia;
  assert.equal(abans.tipus === 'torn' && abans.fins, 'Fins avui a les 9.00 h');
  const despres = resum('2026-10-15T09:00:00+02:00').farmacia;
  assert.equal(despres.tipus === 'torn' && despres.nom, 'Farmàcia Ripoll');
  // L'últim torn que tenim no anuncia cap torn següent.
  assert.equal(despres.tipus === 'torn' && despres.seguent, undefined);
});

test('activitat de diversos dies sense hores: compta tot el dia i diu fins quan', () => {
  const r = resum('2026-10-17T20:00:00+02:00').agenda;
  assert.equal(r.tipus === 'activitat' && `${r.etiqueta}: ${r.titol} (${r.quan})`, 'Agenda: Exposició (Fins al diumenge 18 d’octubre)');
});

test('última activitat de la setmana acabada: la pròxima és la de pròximament', () => {
  const dissabte = { ...dades, activitats: dades.activitats.filter((a) => a.titol !== 'Exposició') };
  const r = composaResum(dissabte, new Date('2026-10-17T12:00:00+02:00'), 'ca').agenda;
  assert.equal(r.tipus === 'activitat' && `${r.titol} · ${r.quan} · ${r.ancora}`, 'Setmana de la Gent Gran · Dilluns 19 d’octubre – 8 de novembre · #h-proximament');
});

test('setmana caducada: l’activitat verificada en curs mana i l’absència és una nota amb l’agenda oficial', () => {
  const r = resum('2026-10-23T10:00:00+02:00');
  assert.deepEqual(r.agenda, { tipus: 'activitat', etiqueta: 'Agenda', titol: 'Setmana de la Gent Gran', ancora: '#h-proximament', quan: 'Fins al diumenge 8 de novembre', lloc: undefined, nota: 'No tenim l’agenda d’aquesta setmana.', oficial: true });
  assert.deepEqual(r.farmacia, { tipus: 'avis', etiqueta: 'Farmàcia de guàrdia' });
});

test('sense cap activitat verificada per davant: l’avís, sol', () => {
  const r = resum('2026-11-20T10:00:00+01:00').agenda;
  assert.deepEqual(r, { tipus: 'avis', etiqueta: 'Agenda', text: 'No tenim l’agenda d’aquesta setmana.' });
});

test('castellà complet', () => {
  const r = resum('2026-10-14T21:30:00+02:00', 'es');
  assert.equal(`${r.salutacio} · ${r.data}`, 'Buenas noches · Miércoles 14 de octubre');
  assert.equal(r.agenda.tipus === 'activitat' && `${r.agenda.etiqueta} | ${r.agenda.nota} | ${r.agenda.quan}`, 'Próxima actividad | Las de hoy ya han pasado. | Jueves 15 de octubre · 15:30 – 16:45 h');
  assert.equal(r.farmacia.tipus === 'torn' && r.farmacia.fins, 'Hasta mañana a las 9:00 h');
});

test('el moment del dia és el de Súria, sigui quina sigui la zona del navegador', () => {
  assert.equal(momentDe(new Date('2026-10-14T04:30:00Z')), 'mati');
  assert.equal(momentDe(new Date('2026-10-14T11:30:00Z')), 'tarda');
  assert.equal(momentDe(new Date('2026-10-14T19:30:00Z')), 'vespre');
});

 test('el torn es mostra només dins de les hores del dia actual', () => {
  const abans = resum('2026-10-15T08:30:00+02:00').farmacia;
  const despres = resum('2026-10-15T09:00:00+02:00').farmacia;
  assert.equal(abans.tipus === 'torn' && abans.horari, '0.00 – 9.00 h');
  assert.equal(despres.tipus === 'torn' && despres.horari, '9.00 – 24.00 h');
});
