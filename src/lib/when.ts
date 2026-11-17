// Utilitats de temps del prototip: dates relatives i estat d'obertura segons l'horari comunicat.
import type { EventItem, Hours } from './demo';
import type { Lang } from './store';
import { time } from './i18n';

export const dateOf = (e: EventItem, now = new Date()) => {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + e.day);
  return d;
};
const hm = (d: Date) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

export type OpenState = { open: boolean; label: string; soon?: boolean };
export function openState(hours: Hours, lang: Lang, now = new Date()): OpenState {
  const ara = hm(now);
  const trams = hours[now.getDay()] ?? [];
  for (const t of trams) {
    const [a, b] = t.split('-');
    if (ara >= a && ara < b) {
      const mins = (Number(b.slice(0, 2)) * 60 + Number(b.slice(3))) - (now.getHours() * 60 + now.getMinutes());
      return { open: true, soon: mins <= 30, label: lang === 'ca' ? `Obert · tanca a les ${time(b, lang)}` : `Abierto · cierra a las ${time(b, lang)}` };
    }
  }
  const next = trams.map((t) => t.split('-')[0]).find((a) => a > ara);
  if (next) return { open: false, label: lang === 'ca' ? `Tancat · obre a les ${time(next, lang)}` : `Cerrado · abre a las ${time(next, lang)}` };
  return { open: false, label: lang === 'ca' ? 'Tancat per avui' : 'Cerrado por hoy' };
}

/** Pròximes sortides d'un horari 'HH:MM' a partir d'ara. */
export function nextTimes(list: string[], now = new Date(), n = 3) {
  const ara = hm(now);
  return list.filter((x) => x >= ara).slice(0, n);
}
export function minsUntil(hhmm: string, now = new Date()) {
  return Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3)) - (now.getHours() * 60 + now.getMinutes());
}

/** Rellotge que es refresca cada 30 s (salutació, bus, obert/tancat). */
import { useEffect, useState } from 'react';
export function useNow(ms = 30_000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), ms);
    return () => clearInterval(id);
  }, [ms]);
  return now;
}
