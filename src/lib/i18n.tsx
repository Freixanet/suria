// Català per defecte i castellà complet. Els textos viuen al costat de cada pantalla: t('català', 'castellano').
import { useCallback } from 'react';
import { useStore, type Lang } from './store';

export type Bi = { ca: string; es: string };

export function useLang(): Lang {
  return useStore((s) => s.prefs.lang);
}

export function useT() {
  const lang = useLang();
  return useCallback((ca: string, es: string) => (lang === 'es' ? es : ca), [lang]);
}

export function pick(b: Bi, lang: Lang) {
  return lang === 'es' ? b.es : b.ca;
}

const WEEKDAYS: Record<Lang, string[]> = {
  ca: ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte'],
  es: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
};
const WD_SHORT: Record<Lang, string[]> = {
  ca: ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'],
  es: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
};
const MONTHS: Record<Lang, string[]> = {
  ca: ['de gener', 'de febrer', 'de març', 'd’abril', 'de maig', 'de juny', 'de juliol', 'd’agost', 'de setembre', 'd’octubre', 'de novembre', 'de desembre'],
  es: ['de enero', 'de febrero', 'de marzo', 'de abril', 'de mayo', 'de junio', 'de julio', 'de agosto', 'de septiembre', 'de octubre', 'de noviembre', 'de diciembre'],
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/** «Avui», «Demà» o «Dijous 20 de novembre». */
export function dayLabel(d: Date, lang: Lang, now = new Date()) {
  const tomorrow = new Date(now); tomorrow.setDate(now.getDate() + 1);
  if (sameDay(d, now)) return lang === 'ca' ? 'Avui' : 'Hoy';
  if (sameDay(d, tomorrow)) return lang === 'ca' ? 'Demà' : 'Mañana';
  return `${cap(WEEKDAYS[lang][d.getDay()])} ${d.getDate()} ${MONTHS[lang][d.getMonth()]}`;
}
export const longDate = (d: Date, lang: Lang) => `${cap(WEEKDAYS[lang][d.getDay()])} ${d.getDate()} ${MONTHS[lang][d.getMonth()]}`;
export const weekdayShort = (d: Date, lang: Lang) => WD_SHORT[lang][d.getDay()];
export const weekdayLong = (d: Date, lang: Lang) => WEEKDAYS[lang][d.getDay()];

/** 24 h: «18.30 h» en català, «18:30 h» en castellà. */
export function time(hhmm: string, lang: Lang) {
  return `${lang === 'ca' ? hhmm.replace(':', '.') : hhmm} h`;
}
export function timeRange(a: string, b: string | undefined, lang: Lang) {
  const f = (x: string) => (lang === 'ca' ? x.replace(':', '.') : x);
  return b ? `${f(a)}–${f(b)} h` : `${f(a)} h`;
}
export function ago(ms: number, lang: Lang) {
  const m = Math.round((Date.now() - ms) / 60000);
  if (m < 1) return lang === 'ca' ? 'ara mateix' : 'ahora mismo';
  if (m < 60) return lang === 'ca' ? `fa ${m} min` : `hace ${m} min`;
  const h = Math.round(m / 60);
  if (h < 24) return lang === 'ca' ? `fa ${h} h` : `hace ${h} h`;
  const d = Math.round(h / 24);
  if (d === 1) return lang === 'ca' ? 'ahir' : 'ayer';
  return lang === 'ca' ? `fa ${d} dies` : `hace ${d} días`;
}
