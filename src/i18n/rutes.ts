// Adreces de cada pàgina en cada llengua. El català va a l'arrel; el castellà, a /es/.
import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Llengua } from './ui.ts';

export const rutes = {
  inici: { ca: '', es: '' },
  practica: { ca: 'informacio-practica', es: 'informacion-practica' },
  setmana: { ca: 'aquesta-setmana', es: 'esta-semana' },
  menjar: { ca: 'menjar-i-comprar', es: 'comer-y-comprar' },
  passos: { ca: 'primers-passos', es: 'primeros-pasos' },
  cap: { ca: 'cap-on-anem', es: 'hacia-donde-vamos' },
  provant: { ca: 'que-estem-provant', es: 'que-estamos-probando' },
} as const;

export type Pagina = keyof typeof rutes;

export function urlDe(pagina: Pagina, llengua: Llengua): string {
  return getRelativeLocaleUrl(llengua, rutes[pagina][llengua]);
}
