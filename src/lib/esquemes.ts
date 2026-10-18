// Regles de publicació (T1, T2): si una peça no les compleix, el build falla i no es publica.
// - Tot text existeix en català i castellà (no es publica un idioma sense l'altre).
// - Tota peça diu d'on surt, quan es va consultar i qui en respon.
// - Cap telèfon dins dels textos. Només s'admeten telèfons de servei públic
//   en camps propis (accions de «Primers passos» i farmàcies), mai als comerços.
import { z } from 'astro/zod';

const TELEFON_EN_TEXT = /(?<!\d)(?:\+?\s?34[\s.-]?)?(?:\d[\s.-]?){8}\d(?!\d)/;

export function contéTelefon(text: string): boolean {
  return TELEFON_EN_TEXT.test(text);
}

const textNet = z
  .string({ error: 'Falta un text: cal en català (ca) i en castellà (es).' })
  .trim()
  .min(1, 'El text no pot estar buit.')
  .refine((t) => !contéTelefon(t), {
    message: 'Hi ha un número de telèfon dins del text. Els telèfons no es publiquen dins dels textos.',
  });

/** Text en les dues llengües. Si en falta una, la peça no es publica. */
export const bilingue = z.object({ ca: textNet, es: textNet }, {
  error: 'Cal el text en català (ca) i en castellà (es).',
});

/** Data 'AAAA-MM-DD'. */
export const dataISO = z.union([
  z.date().transform((d) => d.toISOString().slice(0, 10)),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'La data ha de ser AAAA-MM-DD, per exemple 2026-10-12.'),
]);

/** Hora de rellotge de Súria 'HH:MM' (24 h). */
export const hora = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "L'hora ha de ser HH:MM entre cometes, per exemple '16:15'.");

/** Moment en hora de Súria: data i hora per separat, per evitar errors de zona horària. */
export const momentLocal = z.object({ data: dataISO, hora });

/** Telèfon de servei públic en format internacional, per exemple +34938682800. */
export const telefonPublic = z.string().regex(/^\+34\d{9}$/, 'El telèfon ha de ser +34 seguit de 9 xifres, sense espais.');

export const maduresa = z.enum(['Real', 'En prova', 'Demo', 'Idea']);

export const font = z.object({
  nom: bilingue,
  url: z.url({ protocol: /^https$/ }),
});

/** Procedència obligatòria de tota peça publicada. */
export const procedencia = {
  fonts: z.array(font).min(1, 'Cal almenys una font.'),
  consultat: dataISO,
  responsable: z.string().min(1, 'Cal dir qui en respon (rol o negoci, mai una persona particular).'),
};

const enllac = z.object({ url: z.url({ protocol: /^https$/ }), text: bilingue });

export const esquemaSetmana = z.object({
  inici: dataISO,
  fi: dataISO,
  ...procedencia,
});

export const esquemaActivitat = z.object({
  titol: bilingue,
  imatge: z.object({ src: z.string().startsWith('/imatges/agenda/'), alt: bilingue, font: z.url() }).optional(),
  dies: z.object({ inici: dataISO, fi: dataISO.optional() }),
  hores: z.array(z.object({ inici: hora, fi: hora.optional() })).default([]),
  lloc: bilingue.optional(),
  /** Requisit essencial per actuar (portada i detall): edat, inscripció, horari especial. Breu. */
  requisit: bilingue.optional(),
  /** Explicació llarga: només a la pàgina de detall. */
  nota: bilingue.optional(),
  /** Punts d'un esdeveniment llarg. `portada: true` = es mostra també a la portada (p. ex. un termini). */
  punts: z.array(z.object({ destacat: bilingue.optional(), text: bilingue, portada: z.boolean().default(false) })).default([]),
  enllac,
  maduresa: maduresa.optional(),
  ...procedencia,
});

const accio = z.discriminatedUnion('tipus', [
  z.object({ tipus: z.literal('web'), url: z.url({ protocol: /^https$/ }), text: bilingue }),
  z.object({ tipus: z.literal('telefon'), telefon: telefonPublic, text: bilingue }),
]);

const guardia = z.object({
  farmacia: z.string().min(1),
  adreca: z.string().min(1),
  telefon: telefonPublic,
  desDe: momentLocal,
  finsA: momentLocal,
});

export const esquemaPas = z.object({
  ordre: z.number().int().positive(),
  titol: bilingue,
  /** Versió breu per a la portada: on, quan i què cal. Si no n'hi ha, es mostra el text sencer. */
  resum: bilingue.optional(),
  /** Text complet: pàgina de detall. */
  text: bilingue,
  accions: z.array(accio).default([]),
  guardies: z.array(guardia).default([]),
  maduresa: maduresa.optional(),
  ...procedencia,
});

const confirmacio = z.object({
  dataServei: dataISO,
  inici: hora.optional(),
  fi: hora.optional(),
  estat: z.enum(['confirmat', 'canvi', 'cancelat']),
  rebutA: momentLocal,
});

// Comerços (E1): cap camp de telèfon ni de persona; el nom no pot contenir números de telèfon.
export const esquemaComerc = z
  .object({
    nom: textNet,
    activitat: bilingue,
    adreca: textNet.optional(),
    confirmacions: z.array(confirmacio).default([]),
    maduresa: z.enum(['Real', 'En prova', 'Demo']),
    ...procedencia,
  })
  .strict();

export const esquemaIdea = z.object({
  ordre: z.number().int().positive(),
  text: bilingue,
  maduresa: z.enum(['Idea', 'Demo']),
});

/** Bus interurbà: sortides per dies de la setmana. Una sortida pot tenir vigència pròpia (reforç temporal).
 *  Els `festius` són els dies en què l'horari no està confirmat: la targeta no hi mostra cap hora. */
export const diaSetmana = z.enum(['dl', 'dt', 'dc', 'dj', 'dv', 'ds', 'dg']);
const sortidaBus = z.union([hora, z.object({ hora, des: dataISO.optional(), fins: dataISO.optional() })]);
export const esquemaBus = z.object({
  operador: z.string().min(1),
  linia: bilingue,
  parada: bilingue,
  sentits: z
    .array(
      z.object({
        id: z.string().min(1),
        etiqueta: bilingue,
        horaris: z.array(z.object({ dies: z.array(diaSetmana).min(1), sortides: z.array(sortidaBus).min(1) })).min(1),
      }),
    )
    .min(1),
  festius: z.array(dataISO).default([]),
  enllac: z.url({ protocol: /^https$/ }),
  ...procedencia,
});

export const esquemaInformacioPractica = z.object({
  ordre: z.number().int().positive(),
  titol: bilingue,
  descripcio: bilingue,
  icona: z.enum(['document','bus','health','shield','recycle','school','home','care','work','receipt','people','book','drop','street','building','welcome']),
  color: z.enum(['ocre','cel','turo','teula','rosa','lavanda','pedra']),
  enllacos: z.array(z.object({ text: bilingue, url: z.union([z.url({ protocol: /^https$/ }), z.literal('tel:112')]) })).min(1).max(3),
  ...procedencia,
});

export const esquemaNoticia = z.object({
  titol: bilingue,
  resum: bilingue,
  categoria: bilingue,
  publicat: dataISO,
  imatge: z.object({ src: z.string().startsWith('/imatges/noticies/'), alt: bilingue, original: z.url({ protocol: /^https$/ }) }),
  enllac: z.url({ protocol: /^https$/ }),
  ...procedencia,
});
