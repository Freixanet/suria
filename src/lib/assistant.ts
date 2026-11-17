// «Pregunta a Súria»: contracte del proveïdor de respostes.
// Encara no hi ha cap model connectat. `DemoProvider` respon amb el contingut de la plataforma i,
// quan no ho sap, ho diu i proposa preguntar-ho a la comunitat.
//
// Per connectar un model: implementa `Provider` amb una crida al teu backend (que és qui guarda
// la clau de l'API) i que retorni el text per trossos (streaming). Canvia `provider` a `getProvider()`.
import type { Lang } from './store';
import { bus, events, services, shops } from './demo';
import { dayLabel, pick, time } from './i18n';
import { dateOf, nextTimes, openState } from './when';

export type Source = { title: string; url: string };
export type Action = { label: string; to: string };
export type Chunk = { text?: string; sources?: Source[]; actions?: Action[] };
export interface Turn { role: 'user' | 'ai'; text: string }

export interface Provider {
  id: string;
  connected: boolean;
  stream(history: Turn[], question: string, lang: Lang, signal: AbortSignal): AsyncIterable<Chunk>;
}

const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
/** Coincidència a l'inici d'una paraula («bus» troba «busos», no «autobusos» si no ho demanem). */
const has = (q: string, ...words: string[]) => words.some((w) => new RegExp(`(^|[^a-z0-9])${w}`).test(q));
const wait = (ms: number, signal: AbortSignal) => new Promise<void>((res, rej) => {
  const id = setTimeout(res, ms);
  signal.addEventListener('abort', () => { clearTimeout(id); rej(new DOMException('aborted', 'AbortError')); }, { once: true });
});

function answer(question: string, lang: Lang): Required<Chunk> {
  const q = norm(question);
  const ca = lang === 'ca';
  const T = (a: string, b: string) => (ca ? a : b);
  const none = { sources: [] as Source[], actions: [] as Action[] };

  if (has(q, 'bus', 'autobus', 'manresa', 'barcelona', 'transport')) {
    const now = new Date();
    const wk = now.getDay() === 0 || now.getDay() === 6 ? bus.weekend : bus.weekday;
    const out = nextTimes(wk.out, now, 3).map((x) => time(x, lang));
    const inn = nextTimes(wk.in, now, 3).map((x) => time(x, lang));
    return {
      ...none,
      text: T('Segons l’horari (d’exemple en aquest prototip):', 'Según el horario (de ejemplo en este prototipo):') +
        `\n- **${pick(bus.out, lang)}:** ${out.length ? out.join(', ') : T('avui ja no en surten més', 'hoy ya no salen más')}` +
        `\n- **${pick(bus.in, lang)}:** ${inn.length ? inn.join(', ') : T('avui ja no en surten més', 'hoy ya no salen más')}` +
        T('\n\nQuan hi hagi dades de l’operador, et diré també si va amb retard.', '\n\nCuando haya datos del operador, te diré también si va con retraso.'),
      actions: [{ label: T('Veure-ho a l’inici', 'Verlo en el inicio'), to: '/' }],
    };
  }

  if (has(q, 'farmac', 'guardia', 'medicament')) {
    return {
      ...none,
      text: T('La farmàcia de guàrdia d’avui (dada d’exemple) és la **Farmàcia de la Plaça**, fins demà a les 9.00 h.\n\nSi és una urgència, truca al **112**.', 'La farmacia de guardia de hoy (dato de ejemplo) es la **Farmacia de la Plaza**, hasta mañana a las 9:00 h.\n\nSi es una urgencia, llama al **112**.'),
    };
  }

  for (const area of services) for (const task of area.tasks) {
    const keys: Record<string, string[]> = {
      padro: ['empadron', 'padro', 'padron', 'censar', 'cens'],
      cap: ['metge', 'medico', 'cap(?![a-z])(?! de setmana)', 'targeta sanitaria', 'tarjeta sanitaria', 'salut', 'salud'],
      mobles: ['moble', 'mueble', 'sofa', 'matalas', 'colchon', 'trasto', 'voluminos'],
      deixalleria: ['deixalleria', 'punto limpio', 'pintura', 'piles', 'pilas', 'runa', 'escombro'],
      escola: ['escola', 'escuela', 'colegio', 'matricul', 'preinscrip', 'institut'],
      ajuts: ['ajut', 'ayuda', 'subvenc', 'servei social', 'servicios social'],
      ibi: ['ibi', 'impost', 'impuesto', 'tribut', 'contribuc'],
    };
    if ((keys[task.id] ?? []).some((k) => has(q, k))) {
      return {
        ...none,
        text: `**${pick(task.title, lang)}.** ${pick(task.short, lang)}\n\n` +
          task.steps.map((s, i) => `${i + 1}. ${pick(s, lang)}`).join('\n') +
          (task.needs.length ? `\n\n${T('Necessitaràs:', 'Necesitarás:')} ${task.needs.map((n) => pick(n, lang)).join(', ')}.` : '') +
          `\n\n${T('Temps aproximat:', 'Tiempo aproximado:')} ${pick(task.time, lang)}.`,
        actions: [{ label: T('Obre la guia pas a pas', 'Abre la guía paso a paso'), to: `/poble/tramits#${task.id}` }],
      };
    }
  }

  if (has(q, 'obert', 'abierto', 'sopar', 'cenar', 'dinar', 'comer', 'menu', 'pa(?![a-z])', 'pan(?![a-z])', 'forn', 'botig', 'tienda', 'comerc', 'restaur', 'tapes', 'tapas', 'cafe', 'bar(?![a-z])', 'bars(?![a-z])', 'ferreteria', 'perruq', 'peluq')) {
    const open = shops.filter((s) => openState(s.hours, lang).open);
    const list = (open.length ? open : shops).slice(0, 4);
    return {
      ...none,
      text: (open.length ? T('Ara mateix, segons l’horari que comuniquen (comerços d’exemple):', 'Ahora mismo, según el horario que comunican (comercios de ejemplo):') : T('Ara està tot tancat. Aquests obren aviat (comerços d’exemple):', 'Ahora está todo cerrado. Estos abren pronto (comercios de ejemplo):')) + '\n' +
        list.map((s) => `- **${s.name}** · ${openState(s.hours, lang).label}`).join('\n'),
      actions: list.slice(0, 2).map((s) => ({ label: s.name, to: `/poble/comerc/${s.id}` })).concat([{ label: T('Tot el comerç', 'Todo el comercio'), to: '/poble/comerc' }]),
    };
  }

  if (has(q, 'que fer', 'que faig', 'que hacer', 'que hago', 'agenda', 'activitat', 'actividad', 'cap de setmana', 'fin de semana', 'plan', 'concert', 'avui', 'hoy', 'dema', 'manana')) {
    const list = [...events].sort((a, b) => a.day - b.day || a.start.localeCompare(b.start)).slice(0, 4);
    return {
      ...none,
      text: T('Això és el que hi ha aviat (activitats d’exemple):', 'Esto es lo que hay pronto (actividades de ejemplo):') + '\n' +
        list.map((e) => `- **${pick(e.title, lang)}** · ${dayLabel(dateOf(e), lang)}, ${time(e.start, lang)} · ${pick(e.place, lang)}`).join('\n') +
        T('\n\nA cada activitat t’expliquem què passarà i pots dir que busques companyia.', '\n\nEn cada actividad te explicamos qué pasará y puedes decir que buscas compañía.'),
      actions: list.slice(0, 2).map((e) => ({ label: pick(e.title, lang), to: `/agenda/${e.id}` })).concat([{ label: T('Tota l’agenda', 'Toda la agenda'), to: '/agenda' }]),
    };
  }

  if (has(q, 'incidenc', 'fanal', 'farola', 'forat', 'bache', 'brut', 'sucio', 'avaria', 'averia', 'trencat', 'roto')) {
    return {
      ...none,
      text: T('Pots avisar-ne en un minut: fes una foto, marca on és i tria què passa. Et direm quan l’hagin rebut i quan estigui resolt.', 'Puedes avisar en un minuto: haz una foto, marca dónde está y elige qué pasa. Te diremos cuándo la hayan recibido y cuándo esté resuelta.'),
      actions: [{ label: T('Avisa d’una incidència', 'Avisa de una incidencia'), to: '/poble/incidencia' }],
    };
  }

  if (has(q, '112', 'emergenc', 'urgenc', 'policia', 'incendi', 'accident')) {
    return { ...none, text: T('En una emergència, truca al **112**. És gratuït i funciona les 24 hores, fins i tot sense cobertura del teu operador.', 'En una emergencia, llama al **112**. Es gratuito y funciona las 24 horas, incluso sin cobertura de tu operador.'), actions: [{ label: T('Truca al 112', 'Llama al 112'), to: 'tel:112' }] };
  }

  if (has(q, 'nou', 'nuevo', 'acabo d', 'acabo de', 'arribat', 'llegado', 'coneixer gent', 'conocer gente', 'amics', 'amigos')) {
    return {
      ...none,
      text: T('Benvingut! Tens una guia dels primers 30 dies i, aquesta setmana, un **sopar de benvinguda** on algú t’esperarà a la porta per presentar-te gent.', '¡Bienvenido! Tienes una guía de los primeros 30 días y, esta semana, una **cena de bienvenida** donde alguien te esperará en la puerta para presentarte gente.'),
      actions: [{ label: T('Els meus primers 30 dies', 'Mis primeros 30 días'), to: '/poble/benvinguda' }, { label: T('Sopar de benvinguda', 'Cena de bienvenida'), to: '/agenda/sopar-nous' }],
    };
  }

  return {
    ...none,
    text: T('Encara no tinc aquesta resposta. Ara funciono en **mode demostració**, sense cap model d’IA connectat, i només responc amb el que hi ha a la plataforma.\n\nPots preguntar-ho a la comunitat: sovint algú del poble ho sap.', 'Todavía no tengo esta respuesta. Ahora funciono en **modo demostración**, sin ningún modelo de IA conectado, y solo respondo con lo que hay en la plataforma.\n\nPuedes preguntarlo en la comunidad: a menudo alguien del pueblo lo sabe.'),
    actions: [{ label: T('Pregunta-ho a la comunitat', 'Pregúntalo en la comunidad'), to: '/comunitat?nou=preguntes' }],
  };
}

export const DemoProvider: Provider = {
  id: 'demo',
  connected: false,
  async *stream(_h, question, lang, signal) {
    const a = answer(question, lang);
    await wait(650, signal);
    for (const w of a.text.match(/\S+\s*/g) ?? []) {
      await wait(12 + Math.random() * 28, signal);
      yield { text: w };
    }
    yield { sources: a.sources, actions: a.actions };
  },
};

export function getProvider(): Provider {
  return DemoProvider;
}
