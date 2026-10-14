import type { Pagina } from '../i18n/rutes.ts';

/** Color de façana de cada mena de contingut. Sempre acompanya un text: mai és l'únic senyal. */
export type Facana = 'ocre' | 'cel' | 'teula' | 'turo';

export const facanaDe: Partial<Record<Pagina, Facana>> = {
  setmana: 'ocre',
  passos: 'cel',
  menjar: 'teula',
  cap: 'turo',
};
