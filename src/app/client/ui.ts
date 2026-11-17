// Utilitats d'interfície compartides pels mòduls del navegador.
import { get } from './store.ts';

export type Dades = { lang: 'ca' | 'es'; t: Record<string, string>; compte: string; pregunta: string };
export function dades(): Dades {
  const el = document.getElementById('app-dades');
  return JSON.parse(el?.textContent ?? '{}');
}

let temps: number | undefined;
export function avisa(text: string) {
  const el = document.querySelector<HTMLElement>('[data-toast]');
  const span = el?.querySelector<HTMLElement>('[data-toast-text]');
  if (!el || !span) return;
  span.textContent = text;
  el.dataset.show = '';
  clearTimeout(temps);
  temps = window.setTimeout(() => delete el.dataset.show, 2800);
}

/** Si no hi ha sessió, obre el full «Entra per participar» i retorna true. */
export function calEntrar(): boolean {
  if (get().usuari) return false;
  const dlg = document.getElementById('entrar') as HTMLDialogElement | null;
  const link = dlg?.querySelector<HTMLAnchorElement>('[data-entrar-link]');
  if (link) link.href = `${dades().compte}?seguent=${encodeURIComponent(location.pathname + location.hash)}`;
  dlg?.showModal();
  return true;
}

export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

// ——— Preferències ———
export function aplicaAjustos() {
  const s = get().settings;
  const d = document.documentElement;
  if (s.text && s.text !== 'm') d.dataset.text = s.text;
  else delete d.dataset.text;
  const fosc = s.theme === 'dark' || (s.theme !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);
  if (fosc) d.dataset.theme = 'dark';
  else delete d.dataset.theme;
}
