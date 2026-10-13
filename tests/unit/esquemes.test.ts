// Comprovació prèvia a publicar (T2): peces incompletes o amb telèfons no passen.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { esquemaActivitat, esquemaComerc, esquemaPas, contéTelefon } from '../../src/lib/esquemes.ts';

const font = [{ nom: { ca: 'suria.cat', es: 'suria.cat' }, url: 'https://www.suria.cat/agenda' }];
const activitatValida = {
  titol: { ca: 'Deixalleria mòbil', es: 'Deixalleria mòbil' },
  dies: { inici: '2026-10-14' },
  hores: [{ inici: '16:15', fi: '17:15' }],
  enllac: { url: 'https://www.suria.cat/agenda', text: { ca: 'Fitxa', es: 'Ficha' } },
  fonts: font,
  consultat: '2026-10-12',
  responsable: 'Promotor del prototip',
};

test('una activitat completa es publica', () => {
  assert.equal(esquemaActivitat.safeParse(activitatValida).success, true);
});

for (const camp of ['fonts', 'consultat', 'responsable'] as const) {
  test(`sense ${camp}, no es publica`, () => {
    const { [camp]: _, ...resta } = activitatValida;
    assert.equal(esquemaActivitat.safeParse(resta).success, false);
  });
}

test('sense la versió en castellà, no es publica', () => {
  const r = esquemaActivitat.safeParse({ ...activitatValida, titol: { ca: 'Deixalleria mòbil' } });
  assert.equal(r.success, false);
});

test('un telèfon dins d’un text bloqueja la publicació', () => {
  const r = esquemaActivitat.safeParse({ ...activitatValida, nota: { ca: 'Truca al 93 868 28 00', es: 'Llama al 93 868 28 00' } });
  assert.equal(r.success, false);
});

test('una font sense https no s’accepta', () => {
  const r = esquemaActivitat.safeParse({ ...activitatValida, fonts: [{ ...font[0], url: 'http://www.suria.cat/' }] });
  assert.equal(r.success, false);
});

test('una hora mal escrita no s’accepta', () => {
  const r = esquemaActivitat.safeParse({ ...activitatValida, hores: [{ inici: '16.15' }] });
  assert.equal(r.success, false);
});

test('els telèfons públics només en el camp propi, amb format internacional', () => {
  const pas = {
    ordre: 1,
    titol: { ca: 'OAC', es: 'OAC' },
    text: { ca: 'Casa de la Vila.', es: 'Casa de la Vila.' },
    accions: [{ tipus: 'telefon', telefon: '+34938682800', text: { ca: 'Trucar', es: 'Llamar' } }],
    fonts: font,
    consultat: '2026-10-12',
    responsable: 'Promotor del prototip',
  };
  assert.equal(esquemaPas.safeParse(pas).success, true);
  const malament = { ...pas, accions: [{ ...pas.accions[0], telefon: '93 868 28 00' }] };
  assert.equal(esquemaPas.safeParse(malament).success, false);
});

test('un comerç no pot tenir cap camp de telèfon', () => {
  const comerc = {
    nom: 'Bar de prova',
    activitat: { ca: 'Bar', es: 'Bar' },
    maduresa: 'En prova',
    fonts: font,
    consultat: '2026-10-12',
    responsable: 'Bar de prova',
  };
  assert.equal(esquemaComerc.safeParse(comerc).success, true);
  assert.equal(esquemaComerc.safeParse({ ...comerc, telefon: '+34938682800' }).success, false);
  assert.equal(esquemaComerc.safeParse({ ...comerc, nom: 'Bar 938682800' }).success, false);
});

test('el detector de telèfons no confon dates, hores ni codis postals', () => {
  for (const t of ['2026-10-12', '16.15–17.15 h', 'c. Ernest Solvay, 13. 08260', 'Del 12 al 18']) assert.equal(contéTelefon(t), false, t);
  for (const t of ['93 868 28 00', '938682800', '+34 938 682 800', '93.868.28.00']) assert.equal(contéTelefon(t), true, t);
});
