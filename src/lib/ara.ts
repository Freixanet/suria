// «Ara a Súria»: la frase de salutació de la portada, feta només amb dades verificades del lloc.
// Funció pura (sense DOM) perquè es pugui provar amb qualsevol hora i zona horària.
// Si una dada falta o ha caducat, la frase ho diu; mai omple el buit amb una suposició.
import type { Llengua } from '../i18n/ui.ts';
import { diaLlarg, franja, hora } from './format.ts';
import { dataMadrid, horaMadrid, instantMadrid, sumaDies } from './hora-local.ts';

export interface ActivitatAra {
  titol: string;
  inici: string;
  fi?: string;
  hores: { inici: string; fi?: string }[];
}

export interface GuardiaAra {
  farmacia: string;
  desDe: { data: string; hora: string };
  finsA: { data: string; hora: string };
}

export interface DadesAra {
  setmana: { inici: string; fi: string };
  activitats: ActivitatAra[];
  guardies: GuardiaAra[];
}

export type Moment = 'mati' | 'tarda' | 'vespre';

/** Un tros de la frase; si porta enllaç, apunta a on hi ha el detall i la font. */
export interface Tros {
  text: string;
  enllac?: 'agenda' | 'agenda-oficial' | 'farmacia' | 'farmacia-oficial';
}

const textos = {
  ca: {
    mati: 'Bon dia.',
    tarda: 'Bona tarda.',
    vespre: 'Bon vespre.',
    avui: 'Avui és {dia}.',
    agenda: 'A l’agenda d’avui:',
    i: 'i',
    capActivitat: 'Avui l’agenda no té cap activitat.',
    jaPassades: 'Les activitats d’avui ja han passat.',
    senseAgenda: 'No tenim l’agenda d’aquesta setmana.',
    guardia: 'La farmàcia de guàrdia és la {farmacia}, {fins}.',
    finsAvui: 'fins avui a les {hora} h',
    finsDema: 'fins demà a les {hora} h',
    finsDia: 'fins al {dia} a les {hora} h',
    senseGuardia: 'No tenim el torn de la farmàcia de guàrdia actualitzat.',
  },
  es: {
    mati: 'Buenos días.',
    tarda: 'Buenas tardes.',
    vespre: 'Buenas noches.',
    avui: 'Hoy es {dia}.',
    agenda: 'En la agenda de hoy:',
    i: 'y',
    capActivitat: 'Hoy la agenda no tiene ninguna actividad.',
    jaPassades: 'Las actividades de hoy ya han pasado.',
    senseAgenda: 'No tenemos la agenda de esta semana.',
    guardia: 'La farmacia de guardia es la {farmacia}, {fins}.',
    finsAvui: 'hasta hoy a las {hora} h',
    finsDema: 'hasta mañana a las {hora} h',
    finsDia: 'hasta el {dia} a las {hora} h',
    senseGuardia: 'No tenemos actualizado el turno de la farmacia de guardia.',
  },
} as const;

const omple = (plantilla: string, vars: Record<string, string>) =>
  plantilla.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? '');

/** Moment del dia a Súria: matí fins a les 13 h, tarda fins a les 20 h, vespre la resta. */
export function momentDe(ara: Date): Moment {
  const h = Number(horaMadrid(ara).slice(0, 2));
  if (h >= 6 && h < 13) return 'mati';
  if (h >= 13 && h < 20) return 'tarda';
  return 'vespre';
}

function llistaNatural(elements: string[], i: string): string {
  if (elements.length <= 1) return elements.join('');
  return `${elements.slice(0, -1).join(', ')} ${i} ${elements.at(-1)}`;
}

export function composaAra(dades: DadesAra, ara: Date, ll: Llengua): { moment: Moment; trossos: Tros[] } {
  const x = textos[ll];
  const moment = momentDe(ara);
  const avui = dataMadrid(ara);
  const trossos: Tros[] = [{ text: x[moment] }, { text: omple(x.avui, { dia: diaLlarg(avui, ll) }) }];

  // Agenda: només si avui és dins de la setmana declarada.
  if (avui < dades.setmana.inici || avui > dades.setmana.fi) {
    trossos.push({ text: x.senseAgenda, enllac: 'agenda-oficial' });
  } else {
    const dAvui = dades.activitats.filter((a) => a.inici <= avui && avui <= (a.fi ?? a.inici));
    const pendents = dAvui.filter((a) => {
      const finals = a.hores.map((h) => h.fi).filter((f): f is string => !!f);
      if (finals.length === 0 || finals.length < a.hores.length) return true;
      const darrer = finals.sort().at(-1)!;
      return ara < instantMadrid(avui, darrer);
    });
    if (dAvui.length === 0) trossos.push({ text: x.capActivitat, enllac: 'agenda' });
    else if (pendents.length === 0) trossos.push({ text: x.jaPassades, enllac: 'agenda' });
    else {
      const noms = pendents.map((a) =>
        a.hores.length > 0 ? `${a.titol} (${a.hores.map((h) => franja(h.inici, h.fi, ll)).join(', ')})` : a.titol,
      );
      trossos.push({ text: `${x.agenda} ${llistaNatural(noms, x.i)}.`, enllac: 'agenda' });
    }
  }

  // Farmàcia: el torn que cobreix aquest instant, o l'avís que no el tenim.
  const vigent = dades.guardies.find(
    (g) => instantMadrid(g.desDe.data, g.desDe.hora) <= ara && ara < instantMadrid(g.finsA.data, g.finsA.hora),
  );
  if (vigent) {
    const h = hora(vigent.finsA.hora, ll);
    const fins =
      vigent.finsA.data === avui
        ? omple(x.finsAvui, { hora: h })
        : vigent.finsA.data === sumaDies(avui, 1)
          ? omple(x.finsDema, { hora: h })
          : omple(x.finsDia, { dia: diaLlarg(vigent.finsA.data, ll), hora: h });
    trossos.push({ text: omple(x.guardia, { farmacia: vigent.farmacia, fins }), enllac: 'farmacia' });
  } else {
    trossos.push({ text: x.senseGuardia, enllac: 'farmacia-oficial' });
  }

  return { moment, trossos };
}
