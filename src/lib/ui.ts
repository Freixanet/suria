// Petit bus d'interfície: avisos breus i el full «Entra per participar».
import { useSyncExternalStore } from 'react';
import { getState } from './store';

type UI = { toast: { id: number; text: string } | null; signIn: boolean };
let ui: UI = { toast: null, signIn: false };
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());
let timer: number | undefined;

export function toast(text: string) {
  ui = { ...ui, toast: { id: Date.now(), text } };
  emit();
  clearTimeout(timer);
  timer = window.setTimeout(() => { ui = { ...ui, toast: null }; emit(); }, 2600);
}
export function setSignIn(open: boolean) { ui = { ...ui, signIn: open }; emit(); }

/** Si no hi ha sessió, obre el full d'entrada i retorna true. */
export function needsSignIn(): boolean {
  if (getState().user) return false;
  setSignIn(true);
  return true;
}

export function useUI<T>(sel: (u: UI) => T): T {
  return useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f); }, () => sel(ui));
}

export function haptic() { try { navigator.vibrate?.(8); } catch { /* opcional */ } }
