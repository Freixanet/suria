// Dades de l'app en temps de compilació: dates relatives, estat d'obertura i lectura del contingut verificat.
import { getCollection } from 'astro:content';
import type { Lang } from './i18n.ts';
import { activitats, comercos, type Activitat, type Comerc, type Horari } from './demo.ts';
import { dataMadrid, diaSetmana, horaMadrid, sumaDies } from '../lib/hora-local.ts';
import { diaMes, hora } from '../lib/format.ts';

export const ARA = new Date();
export const AVUI = dataMadrid(ARA);

const diesLlargs = {
  ca: ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte'],
  es: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
};
const diesCurts = {
  ca: ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'],
  es: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
};
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const dataDe = (a: Activitat) => sumaDies(AVUI, a.dia);
export const nomDia = (data: string, l: Lang) => diesLlargs[l][diaSetmana(data)];
export const nomDiaCurt = (data: string, l: Lang) => diesCurts[l][diaSetmana(data)];
export const numDia = (data: string) => Number(data.slice(8, 10));

/** «Avui», «Demà» o «Dijous 20 de novembre». */
export function quan(data: string, l: Lang): string {
  if (data === AVUI) return l === 'ca' ? 'Avui' : 'Hoy';
  if (data === sumaDies(AVUI, 1)) return l === 'ca' ? 'Demà' : 'Mañana';
  return `${cap(nomDia(data, l))} ${diaMes(data, l)}`;
}

export const h = (x: string, l: Lang) => hora(x, l);
export const franjaH = (a: { inici: string; fi?: string }, l: Lang) =>
  a.fi ? `${hora(a.inici, l)}–${hora(a.fi, l)} h` : `${hora(a.inici, l)} h`;

export function activitatsOrdenades(): Activitat[] {
  return [...activitats].sort((a, b) => a.dia - b.dia || a.inici.localeCompare(b.inici));
}

/** Els pròxims set dies (per a la tira de dies de l'agenda). */
export function setmana(): string[] {
  return Array.from({ length: 14 }, (_, i) => sumaDies(AVUI, i));
}

export function comercPerId(id: string): Comerc | undefined {
  return comercos.find((c) => c.id === id);
}

export type EstatObert = { obert: boolean; text: Record<Lang, string> };
/** Estat segons l'horari COMUNICAT pel negoci (no és una confirmació en directe). */
export function estatComerc(horari: Horari, instant = ARA): EstatObert {
  const data = dataMadrid(instant);
  const ara = horaMadrid(instant);
  const trams = horari[diaSetmana(data) as 0] ?? [];
  for (const t of trams) {
    const [i, f] = t.split('-');
    if (ara >= i && ara < f) return { obert: true, text: { ca: `Obert fins a les ${hora(f, 'ca')} h`, es: `Abierto hasta las ${hora(f, 'es')} h` } };
  }
  const seguent = trams.map((t) => t.split('-')[0]).find((i) => i > ara);
  if (seguent) return { obert: false, text: { ca: `Obre a les ${hora(seguent, 'ca')} h`, es: `Abre a las ${hora(seguent, 'es')} h` } };
  return { obert: false, text: { ca: 'Tancat per avui', es: 'Cerrado por hoy' } };
}

export function horariText(trams: string[], l: Lang): string {
  if (trams.length === 0) return l === 'ca' ? 'Tancat' : 'Cerrado';
  return trams.map((t) => t.split('-').map((x) => hora(x, l)).join('–')).join(' · ');
}

// ——— Contingut verificat (col·leccions del lloc) ———
export async function informacio() {
  return (await getCollection('informacioPractica')).map((e) => ({ id: e.id, ...e.data })).sort((a, b) => a.ordre - b.ordre);
}
export async function passos() {
  return (await getCollection('passos')).map((e) => ({ id: e.id, ...e.data })).sort((a, b) => a.ordre - b.ordre);
}
export async function bus() {
  return (await getCollection('bus')).map((e) => e.data)[0];
}

/** Torn de farmàcia vigent en aquest moment, si el tenim verificat. */
export async function farmaciaAra() {
  const llista = await passos();
  const guardies = llista.flatMap((p) => p.guardies ?? []);
  const ara = `${AVUI} ${horaMadrid(ARA)}`;
  return guardies.find((g) => `${g.desDe.data} ${g.desDe.hora}` <= ara && ara < `${g.finsA.data} ${g.finsA.hora}`) ?? null;
}

export const URL_FARMACIES = 'https://www.suria.cat/el-municipi/serveis/farmaciesdeguardia1';
export const URL_RECICLA = 'https://www.suria.cat/recicla';
export const URL_VOLUMINOSOS = 'https://www.suria.cat/voluminosos';
export const URL_PARQUINGS = 'https://www.suria.cat/parquings';
export const URL_AGENDA = 'https://www.suria.cat/agenda';
export const URL_SEU = 'https://suria.eadministracio.cat/';
