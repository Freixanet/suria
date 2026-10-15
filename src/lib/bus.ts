// «Bus» de la portada: les pròximes sortides de cada sentit a partir de l'horari programat de l'operador.
// Funció pura (sense DOM) perquè es pugui provar amb qualsevol hora i zona horària.
// No és temps real. En un festiu (l'operador no diu quin horari hi aplica), no s'ensenya cap hora.
import type { Llengua } from '../i18n/ui.ts';
import { diaLlarg, hora } from './format.ts';
import { dataMadrid, horaMadrid, instantMadrid, sumaDies } from './hora-local.ts';

type Dia = 'dl' | 'dt' | 'dc' | 'dj' | 'dv' | 'ds' | 'dg';
type Sortida = string | { hora: string; des?: string; fins?: string };

export interface DadesBus {
  sentits: { id: string; etiqueta: string; horaris: { dies: Dia[]; sortides: Sortida[] }[] }[];
  festius: string[];
}

export type SentitAra =
  | { estat: 'propers'; id: string; etiqueta: string; propera: string; minuts?: number; despres: string[] }
  | { estat: 'acabat'; id: string; etiqueta: string; primer?: string }
  | { estat: 'festiu'; id: string; etiqueta: string };

export interface ResumBus {
  festiu: boolean;
  sentits: SentitAra[];
}

const textos = {
  ca: { demaA: 'demà a les {hora} h', diaA: 'el {dia} a les {hora} h' },
  es: { demaA: 'mañana a las {hora} h', diaA: 'el {dia} a las {hora} h' },
} as const;

const DIES: Dia[] = ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'];
const diaDe = (data: string): Dia => {
  const [a, m, d] = data.split('-').map(Number);
  return DIES[new Date(Date.UTC(a, m - 1, d)).getUTCDay()];
};
const omple = (plantilla: string, vars: Record<string, string>) =>
  plantilla.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? '');

/** Hores de sortida d'un dia ('HH:MM', ordenades i sense repetir), o null si és festiu (horari sense confirmar). */
export function sortidesDe(horaris: DadesBus['sentits'][number]['horaris'], festius: string[], data: string): string[] | null {
  if (festius.includes(data)) return null;
  const dia = diaDe(data);
  const hores = horaris
    .filter((h) => h.dies.includes(dia))
    .flatMap((h) => h.sortides)
    .filter((s) => typeof s === 'string' || ((!s.des || s.des <= data) && (!s.fins || data <= s.fins)))
    .map((s) => (typeof s === 'string' ? s : s.hora));
  return [...new Set(hores)].sort();
}

export function composaBus(dades: DadesBus, ara: Date, ll: Llengua, quantes = 2): ResumBus {
  const avui = dataMadrid(ara);
  const ara_ = horaMadrid(ara);
  const festiu = dades.festius.includes(avui);

  const sentits = dades.sentits.map((s): SentitAra => {
    const base = { id: s.id, etiqueta: s.etiqueta };
    const dAvui = sortidesDe(s.horaris, dades.festius, avui);
    if (dAvui === null) return { estat: 'festiu', ...base };
    const pendents = dAvui.filter((h) => h >= ara_);
    if (pendents.length > 0) {
      const [propera, ...resta] = pendents;
      const minuts = Math.round((instantMadrid(avui, propera).getTime() - ara.getTime()) / 60000);
      return {
        estat: 'propers',
        ...base,
        propera: `${hora(propera, ll)} h`,
        ...(minuts < 60 && { minuts: Math.max(0, minuts) }),
        despres: resta.slice(0, quantes).map((h) => hora(h, ll)),
      };
    }
    // Avui ja no en surt cap: el primer dels dies següents, si l'horari d'aquell dia és conegut (no festiu).
    for (let i = 1; i <= 7; i++) {
      const data = sumaDies(avui, i);
      const hores = sortidesDe(s.horaris, dades.festius, data);
      if (hores === null) return { estat: 'acabat', ...base };
      if (hores.length > 0) {
        const h = hora(hores[0], ll);
        const primer = i === 1 ? omple(textos[ll].demaA, { hora: h }) : omple(textos[ll].diaA, { dia: diaLlarg(data, ll), hora: h });
        return { estat: 'acabat', ...base, primer };
      }
    }
    return { estat: 'acabat', ...base };
  });

  return { festiu, sentits };
}
