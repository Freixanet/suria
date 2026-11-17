// Estat local del prototip (sense servidor): sessió simulada, participació i preferències.
// Quan hi hagi backend, aquest mòdul és l'única peça que cal substituir per crides a l'API.

export type Perfil = 'veinat' | 'nouvingut' | 'negoci' | 'visita';
export interface Usuari {
  nom: string;
  correu: string;
  inicials: string;
  facana: string;
  perfil: Perfil;
  interessos: string[];
  desDe: string;
}
export interface PostLocal { id: string; canal: string; text: string; quan: number }
export interface Missatge { rol: 'jo' | 'ai'; text: string; fonts?: { nom: string; url: string }[]; quan: number }
export interface Xat { id: string; titol: string; missatges: Missatge[]; quan: number }
export interface Ajustos { text: 'm' | 'l' | 'xl'; theme: 'system' | 'light' | 'dark'; avisos: Record<string, boolean> }

export interface Estat {
  usuari: Usuari | null;
  apuntat: Record<string, true>;
  companyia: Record<string, true>;
  gracies: Record<string, true>;
  desat: Record<string, true>;
  posts: PostLocal[];
  passos: Record<string, true>;
  xats: Xat[];
  settings: Ajustos;
}

const CLAU = 'suria-app';
const buit = (): Estat => ({
  usuari: null,
  apuntat: {},
  companyia: {},
  gracies: {},
  desat: {},
  posts: [],
  passos: {},
  xats: [],
  settings: { text: 'm', theme: 'system', avisos: { agenda: true, comunitat: true, comerc: false, avisos: true } },
});

let estat: Estat = carrega();

function carrega(): Estat {
  try {
    const raw = JSON.parse(localStorage.getItem(CLAU) ?? 'null');
    if (raw && typeof raw === 'object') {
      const b = buit();
      return { ...b, ...raw, settings: { ...b.settings, ...(raw.settings ?? {}), avisos: { ...b.settings.avisos, ...(raw.settings?.avisos ?? {}) } } };
    }
  } catch {
    /* Sense emmagatzematge: l'app funciona igual, però no recorda res. */
  }
  return buit();
}

function desa() {
  try {
    localStorage.setItem(CLAU, JSON.stringify(estat));
  } catch {
    /* Opcional. */
  }
  document.dispatchEvent(new CustomEvent('suria:estat'));
}

export const get = () => estat;

export function update(fn: (e: Estat) => void) {
  fn(estat);
  desa();
}

export function toggle(map: 'apuntat' | 'companyia' | 'gracies' | 'desat' | 'passos', id: string): boolean {
  let actiu = false;
  update((e) => {
    if (e[map][id]) delete e[map][id];
    else {
      e[map][id] = true;
      actiu = true;
    }
  });
  return actiu;
}

export function inicials(nom: string): string {
  const parts = nom.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase() || '·';
}

export function surt() {
  update((e) => {
    e.usuari = null;
  });
}

// Altres pestanyes: mantenim l'estat sincronitzat.
window.addEventListener('storage', (ev) => {
  if (ev.key === CLAU) {
    estat = carrega();
    document.dispatchEvent(new CustomEvent('suria:estat'));
  }
});
