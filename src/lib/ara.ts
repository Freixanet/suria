// «Avui a Súria»: el resum de la portada, fet només amb dades verificades del lloc.
// Funció pura (sense DOM) perquè es pugui provar amb qualsevol hora i zona horària.
// Si una dada falta o ha caducat, el resum ho diu; mai omple el buit amb una suposició.
// Si les activitats d'avui ja han acabat, el protagonisme és per a la pròxima confirmada, amb la seva data.
import type { Llengua } from '../i18n/ui.ts';
import { diaLlarg, diaMes, franja, hora } from './format.ts';
import { dataMadrid, horaMadrid, instantMadrid, sumaDies } from './hora-local.ts';

export interface ActivitatAra {
  titol: string;
  inici: string;
  fi?: string;
  hores: { inici: string; fi?: string }[];
  lloc?: string;
  /** On és el detall a la mateixa pàgina (agenda o pròximament). */
  ancora: string;
}

export interface GuardiaAra {
  farmacia: string;
  adreca: string;
  telefon: string;
  desDe: { data: string; hora: string };
  finsA: { data: string; hora: string };
}

export interface DadesAra {
  setmana: { inici: string; fi: string };
  /** Activitats de la setmana i de pròximament, en qualsevol ordre. */
  activitats: ActivitatAra[];
  guardies: GuardiaAra[];
}

export type Moment = 'mati' | 'tarda' | 'vespre';

export interface ResumAra {
  moment: Moment;
  salutacio: string;
  data: string;
  agenda:
    | { tipus: 'activitat'; etiqueta: string; titol: string; ancora: string; quan: string; lloc?: string; nota?: string; mes?: string; oficial?: boolean }
    | { tipus: 'avis'; etiqueta: string; text: string };
  farmacia:
    | { tipus: 'torn'; etiqueta: string; nom: string; detall: string; telefon: string }
    | { tipus: 'avis'; etiqueta: string };
}

const textos = {
  ca: {
    mati: 'Bon dia',
    tarda: 'Bona tarda',
    vespre: 'Bon vespre',
    avuiAgenda: 'Avui a l’agenda',
    proxima: 'Pròxima activitat',
    agenda: 'Agenda',
    avui: 'Avui',
    jaPassades: 'Les d’avui ja han passat.',
    mesUna: 'I 1 activitat més avui',
    mesVaries: 'I {n} activitats més avui',
    senseAgenda: 'No tenim l’agenda d’aquesta setmana.',
    senseProxima: 'No tenim més activitats confirmades.',
    farmacia: 'Farmàcia de guàrdia',
    finsAvui: 'fins avui a les {hora} h',
    finsDema: 'fins demà a les {hora} h',
    finsDia: 'fins al {dia} a les {hora} h',
    finsAl: 'fins al {dia}',
  },
  es: {
    mati: 'Buenos días',
    tarda: 'Buenas tardes',
    vespre: 'Buenas noches',
    avuiAgenda: 'Hoy en la agenda',
    proxima: 'Próxima actividad',
    agenda: 'Agenda',
    avui: 'Hoy',
    jaPassades: 'Las de hoy ya han pasado.',
    mesUna: 'Y 1 actividad más hoy',
    mesVaries: 'Y {n} actividades más hoy',
    senseAgenda: 'No tenemos la agenda de esta semana.',
    senseProxima: 'No tenemos más actividades confirmadas.',
    farmacia: 'Farmacia de guardia',
    finsAvui: 'hasta hoy a las {hora} h',
    finsDema: 'hasta mañana a las {hora} h',
    finsDia: 'hasta el {dia} a las {hora} h',
    finsAl: 'hasta el {dia}',
  },
} as const;

const omple = (plantilla: string, vars: Record<string, string>) =>
  plantilla.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? '');
const majuscula = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Moment del dia a Súria: matí fins a les 13 h, tarda fins a les 20 h, vespre la resta. */
export function momentDe(ara: Date): Moment {
  const h = Number(horaMadrid(ara).slice(0, 2));
  if (h >= 6 && h < 13) return 'mati';
  if (h >= 13 && h < 20) return 'tarda';
  return 'vespre';
}

/** L'activitat encara no ha acabat avui (sense hora de final, compta fins a mitjanit). */
function pendentAvui(a: ActivitatAra, avui: string, ara: Date): boolean {
  if (a.hores.length === 0 || a.hores.some((h) => !h.fi)) return true;
  const darrer = a.hores.map((h) => h.fi!).sort().at(-1)!;
  return ara < instantMadrid(avui, darrer);
}

export function composaResum(dades: DadesAra, ara: Date, ll: Llengua): ResumAra {
  const x = textos[ll];
  const moment = momentDe(ara);
  const avui = dataMadrid(ara);
  const hores = (a: ActivitatAra) => a.hores.map((h) => franja(h.inici, h.fi, ll)).join(', ');
  const ambHores = (dia: string, a: ActivitatAra) => (a.hores.length > 0 ? `${dia} · ${hores(a)}` : dia);


  // Agenda: avui (el que encara no ha acabat) o, si no, la pròxima confirmada amb la seva data.
  const ordenades = [...dades.activitats].sort((a, b) => a.inici.localeCompare(b.inici));
  const actiu = (a: ActivitatAra) => a.inici <= avui && avui <= (a.fi ?? a.inici);
  /** Avui, dins d'una activitat de diversos dies: «Avui · fins al diumenge 18 d'octubre». */
  const quanAvui = (a: ActivitatAra) => ambHores(a.fi && a.fi !== avui ? `${x.avui} · ${omple(x.finsAl, { dia: diaLlarg(a.fi, ll) })}` : x.avui, a);
  const quanDia = (a: ActivitatAra) =>
    ambHores(majuscula(a.fi ? `${diaLlarg(a.inici, ll)} – ${diaMes(a.fi, ll)}` : diaLlarg(a.inici, ll)), a);
  const fitxa = (a: ActivitatAra, etiqueta: string, quan: string) =>
    ({ tipus: 'activitat', etiqueta, titol: a.titol, ancora: a.ancora, quan, lloc: a.lloc }) as const;

  // Agenda: avui (el que encara no ha acabat) o, si no, la pròxima confirmada amb la seva data.
  // Una absència (setmana caducada, activitats ja passades) és una nota, no el missatge principal.
  let agenda: ResumAra['agenda'];
  if (avui < dades.setmana.inici || avui > dades.setmana.fi) {
    // Sense l'agenda d'aquesta setmana: només el que té dates pròpies verificades (en curs o futur).
    const enCurs = ordenades.find((a) => a.fi && actiu(a));
    const seguent = ordenades.find((a) => a.inici > avui);
    agenda = enCurs
      ? { ...fitxa(enCurs, x.avuiAgenda, quanAvui(enCurs)), nota: x.senseAgenda, oficial: true }
      : seguent
        ? { ...fitxa(seguent, x.proxima, quanDia(seguent)), nota: x.senseAgenda, oficial: true }
        : { tipus: 'avis', etiqueta: x.agenda, text: x.senseAgenda };
  } else {
    const dAvui = ordenades.filter(actiu);
    const pendents = dAvui.filter((a) => pendentAvui(a, avui, ara));
    if (pendents.length > 0) {
      const [a, ...resta] = pendents;
      agenda = {
        ...fitxa(a, x.avuiAgenda, quanAvui(a)),
        mes: resta.length === 0 ? undefined : resta.length === 1 ? x.mesUna : omple(x.mesVaries, { n: String(resta.length) }),
      };
    } else {
      const seguent = ordenades.find((a) => a.inici > avui);
      const nota = dAvui.length > 0 ? x.jaPassades : undefined;
      agenda = seguent
        ? { ...fitxa(seguent, x.proxima, quanDia(seguent)), nota }
        : { tipus: 'avis', etiqueta: x.agenda, text: nota ? `${nota} ${x.senseProxima}` : x.senseProxima };
    }
  }

  // Farmàcia: el torn que cobreix aquest instant, o l'avís que no el tenim.
  const vigent = dades.guardies.find(
    (g) => instantMadrid(g.desDe.data, g.desDe.hora) <= ara && ara < instantMadrid(g.finsA.data, g.finsA.hora),
  );
  let farmacia: ResumAra['farmacia'] = { tipus: 'avis', etiqueta: x.farmacia };
  if (vigent) {
    const h = hora(vigent.finsA.hora, ll);
    const fins =
      vigent.finsA.data === avui
        ? omple(x.finsAvui, { hora: h })
        : vigent.finsA.data === sumaDies(avui, 1)
          ? omple(x.finsDema, { hora: h })
          : omple(x.finsDia, { dia: diaLlarg(vigent.finsA.data, ll), hora: h });
    farmacia = { tipus: 'torn', etiqueta: x.farmacia, nom: vigent.farmacia, detall: `${vigent.adreca} · ${fins}`, telefon: vigent.telefon };
  }

  return { moment, salutacio: x[moment], data: majuscula(diaLlarg(avui, ll)), agenda, farmacia };
}
