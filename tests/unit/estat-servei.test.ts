// Comportaments de D4 (revisió d'enginyeria): validesa per període de servei, en hora de Súria.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { estatServei, type Confirmacio } from '../../src/lib/estat-servei.ts';

const c = (dataServei: string, inici: string | undefined, fi: string | undefined, rebut: string, estat: Confirmacio['estat'] = 'confirmat', dataRebut = dataServei): Confirmacio => ({
  dataServei,
  inici,
  fi,
  estat,
  rebutA: { data: dataRebut, hora: rebut },
});
// Instants escrits en UTC per no dependre de la zona de qui executa la prova.
const utc = (iso: string) => new Date(`${iso}Z`);
const tipus = (conf: Confirmacio[], iso: string) => estatServei(conf, utc(iso)).tipus;

test('sense cap missatge: Sense confirmar', () => {
  assert.equal(tipus([], '2026-10-12T19:45:00'), 'sense-confirmar');
});

test('sense període exacte (falta la fi): no es presenta com a confirmat', () => {
  assert.equal(tipus([c('2026-10-12', '20:00', undefined, '13:00')], '2026-10-12T19:45:00'), 'sense-confirmar');
});

test('abans, durant i després del servei (12/10, horari d’estiu, UTC+2)', () => {
  const conf = [c('2026-10-12', '20:00', '23:00', '13:05')];
  assert.equal(tipus(conf, '2026-10-12T17:59:00'), 'abans'); // 19.59 a Súria
  assert.equal(tipus(conf, '2026-10-12T19:45:00'), 'durant'); // 21.45
  assert.equal(tipus(conf, '2026-10-12T20:59:00'), 'durant'); // 22.59
  assert.equal(tipus(conf, '2026-10-12T21:00:00'), 'finalitzat'); // 23.00
});

test('una confirmació no val per a la jornada següent', () => {
  const conf = [c('2026-10-12', '08:00', '14:00', '07:30')];
  assert.equal(tipus(conf, '2026-10-13T08:00:00'), 'sense-confirmar'); // dimarts 10.00
});

test('fi després de mitjanit (23.00→01.30): continua comunicat fins a la fi', () => {
  const conf = [c('2026-10-12', '20:00', '01:30', '18:40')];
  assert.equal(tipus(conf, '2026-10-12T22:30:00'), 'durant'); // 00.30 del 13
  assert.equal(tipus(conf, '2026-10-12T23:29:00'), 'durant'); // 01.29
  // Passada la fi, la jornada nova no té confirmació.
  assert.equal(tipus(conf, '2026-10-12T23:31:00'), 'sense-confirmar'); // 01.31
});

test('una cancel·lació posterior invalida l’horari anterior a l’instant', () => {
  const conf = [c('2026-10-12', '07:00', '14:00', '06:50'), c('2026-10-12', undefined, undefined, '10:10', 'cancelat')];
  assert.equal(tipus(conf, '2026-10-12T08:30:00'), 'cancelat'); // 10.30, després del missatge de les 10.10
});

test('la cancel·lació només compta des que es rep', () => {
  const conf = [c('2026-10-12', '07:00', '14:00', '06:50'), c('2026-10-12', undefined, undefined, '10:10', 'cancelat')];
  assert.equal(tipus(conf, '2026-10-12T07:59:00'), 'durant'); // 09.59: encara no s'havia rebut
  assert.equal(tipus(conf, '2026-10-12T08:11:00'), 'cancelat'); // 10.11
});

test('un canvi substitueix l’horari anterior', () => {
  const conf = [c('2026-10-12', '20:00', '23:00', '13:00'), c('2026-10-12', '20:00', '22:00', '19:00', 'canvi')];
  assert.equal(tipus(conf, '2026-10-12T20:30:00'), 'finalitzat'); // 22.30: el canvi diu fins a les 22.00
});

test('canvi d’hora d’octubre (25/10/2026, passa a UTC+1)', () => {
  const conf = [c('2026-10-25', '20:00', '23:00', '12:00')];
  assert.equal(tipus(conf, '2026-10-25T21:59:00'), 'durant'); // 22.59 a Súria
  assert.equal(tipus(conf, '2026-10-25T22:01:00'), 'finalitzat'); // 23.01
});

test('canvi d’hora de març (29/03/2026, passa a UTC+2)', () => {
  const conf = [c('2026-03-29', '20:00', '23:00', '12:00')];
  assert.equal(tipus(conf, '2026-03-29T20:59:00'), 'durant'); // 22.59
  assert.equal(tipus(conf, '2026-03-29T21:01:00'), 'finalitzat'); // 23.01
});

test('l’estat no depèn de la zona horària del dispositiu', () => {
  // Aquesta prova s'executa també amb TZ=Pacific/Auckland i TZ=America/New_York (vegeu package.json).
  const conf = [c('2026-10-12', '20:00', '23:00', '13:05')];
  const e = estatServei(conf, utc('2026-10-12T19:45:00'));
  assert.equal(e.tipus, 'durant');
  if (e.tipus === 'durant') assert.equal(e.fi.toISOString(), '2026-10-12T21:00:00.000Z');
});
