// Estat de l'app al dispositiu (sense servidor en aquesta fase).
// Quan hi hagi backend, només cal substituir aquest mòdul per crides a l'API.
import { useSyncExternalStore } from 'react';

export type Lang = 'ca' | 'es';
export type Role = 'resident' | 'newcomer' | 'business' | 'visitor';
export interface User {
  name: string;
  email: string;
  initials: string;
  tone: string;
  role: Role;
  interests: string[];
  neighbourhood: string;
  since: string;
}
export interface Prefs {
  lang: Lang;
  text: 'm' | 'l' | 'xl';
  theme: 'system' | 'light' | 'dark';
  contrast: boolean;
  notify: Record<string, boolean>;
}
export interface ChatMsg { role: 'user' | 'ai'; text: string; sources?: { title: string; url: string }[]; actions?: { label: string; to: string }[]; at: number }
export interface Chat { id: string; title: string; msgs: ChatMsg[]; at: number }
export interface MyPost { id: string; channel: string; text: string; at: number }
export interface Report { id: string; kind: string; where: string; text: string; at: number; status: 'rebuda' | 'en-curs' | 'resolta' }

export interface State {
  user: User | null;
  prefs: Prefs;
  going: Record<string, number>;
  buddy: Record<string, number>;
  saved: Record<string, number>;
  thanks: Record<string, number>;
  follows: Record<string, number>;
  votes: Record<string, string>;
  steps: Record<string, number>;
  posts: MyPost[];
  reports: Report[];
  chats: Chat[];
  readNotes: Record<string, number>;
  onboarded: boolean;
}

const KEY = 'suria:v1';
const fresh = (): State => ({
  user: null,
  prefs: { lang: 'ca', text: 'm', theme: 'system', contrast: false, notify: { events: true, alerts: true, replies: true, offers: false } },
  going: {}, buddy: {}, saved: {}, thanks: {}, follows: {}, votes: {}, steps: {},
  posts: [], reports: [], chats: [], readNotes: {}, onboarded: false,
});

function load(): State {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    if (raw && typeof raw === 'object') {
      const f = fresh();
      return { ...f, ...raw, prefs: { ...f.prefs, ...raw.prefs, notify: { ...f.prefs.notify, ...raw.prefs?.notify } } };
    }
  } catch { /* sense emmagatzematge: l'app funciona igual però no recorda res */ }
  return fresh();
}

let state = load();
const subs = new Set<() => void>();

export function getState() { return state; }
export function setState(fn: (s: State) => State) {
  state = fn(state);
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* opcional */ }
  subs.forEach((f) => f());
}
function subscribe(f: () => void) {
  subs.add(f);
  return () => subs.delete(f);
}
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) { state = load(); subs.forEach((f) => f()); }
  });
}

export function useStore<T>(sel: (s: State) => T): T {
  return useSyncExternalStore(subscribe, () => sel(state));
}

type MapKey = 'going' | 'buddy' | 'saved' | 'thanks' | 'follows' | 'steps';
export function toggle(map: MapKey, id: string): boolean {
  const on = !state[map][id];
  setState((s) => {
    const m = { ...s[map] };
    if (on) m[id] = Date.now(); else delete m[id];
    return { ...s, [map]: m };
  });
  return on;
}

export function setPrefs(p: Partial<Prefs>) {
  setState((s) => ({ ...s, prefs: { ...s.prefs, ...p } }));
}

export const initialsOf = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase() || '·';
};

export const uid = () => Math.random().toString(36).slice(2, 10);

/** Esborra tot el que l'app ha guardat en aquest dispositiu. */
export function resetAll() {
  try { localStorage.removeItem(KEY); } catch { /* opcional */ }
  state = fresh();
  subs.forEach((f) => f());
}
