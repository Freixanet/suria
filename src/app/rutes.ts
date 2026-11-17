// Totes les pantalles de l'app per a getStaticPaths (català a /app/, castellà a /es/app/).
import { slugs, type Lang, type Ruta } from './i18n.ts';
import { activitats, comercos } from './demo.ts';

export interface Pantalla { ruta: Ruta; id?: string }

export function camins(lang: Lang) {
  const llista: { params: { cami: string | undefined }; props: Pantalla }[] = [];
  for (const ruta of Object.keys(slugs) as Ruta[]) {
    const slug = slugs[ruta][lang];
    llista.push({ params: { cami: slug || undefined }, props: { ruta } });
  }
  for (const a of activitats) llista.push({ params: { cami: `${slugs.agenda[lang]}/${a.id}` }, props: { ruta: 'agenda', id: a.id } });
  for (const c of comercos) llista.push({ params: { cami: `${slugs.comerc[lang]}/${c.id}` }, props: { ruta: 'comerc', id: c.id } });
  return llista;
}
