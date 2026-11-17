// Comportament comú de l'app. Delegació d'esdeveniments al document perquè funcioni
// amb el router de vistes d'Astro sense tornar a enganxar res a cada navegació.
import { get, toggle, update, inicials } from './store.ts';
import { iniciaXat } from './chat.ts';
import { iniciaCompte } from './compte.ts';
import { iniciaComunitat } from './feed.ts';
import { iniciaViu } from './live.ts';
import { navigate } from 'astro:transitions/client';
import { dades, avisa, calEntrar, aplicaAjustos } from './ui.ts';

matchMedia('(prefers-color-scheme: dark)').addEventListener('change', aplicaAjustos);
document.addEventListener('astro:after-swap', aplicaAjustos);

function pintaSessio() {
  const u = get().usuari;
  const t = dades().t;
  document.querySelectorAll<HTMLElement>('[data-avatar]').forEach((a) => {
    if (u) {
      a.classList.remove('avatar--guest');
      a.dataset.f = u.facana;
      a.textContent = u.inicials;
    } else if (!a.classList.contains('avatar--guest')) {
      a.classList.add('avatar--guest');
      delete a.dataset.f;
      a.innerHTML = '<svg class="i-s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c.8-4.4 3.9-7 8-7s7.2 2.6 8 7"/></svg>';
    }
  });
  document.querySelectorAll<HTMLElement>('[data-user-name]').forEach((n) => {
    n.textContent = u ? u.nom.split(' ')[0] : (n.dataset.guestText ?? '');
  });
  document.querySelectorAll<HTMLElement>('[data-user-sub]').forEach((n) => {
    if (u) n.textContent = u.correu;
  });
  document.querySelectorAll<HTMLElement>('[data-auth-only]').forEach((n) => (n.hidden = !u));
  document.querySelectorAll<HTMLElement>('[data-guest-only]').forEach((n) => (n.hidden = !!u));
  void t;
}

// ——— Participació (apuntar-se, companyia, gràcies, desar) ———
function pintaParticipacio() {
  const e = get();
  const mapes = { rsvp: e.apuntat, buddy: e.companyia, thanks: e.gracies, save: e.desat } as const;
  (Object.keys(mapes) as (keyof typeof mapes)[]).forEach((tipus) => {
    document.querySelectorAll<HTMLButtonElement>(`[data-${tipus}]`).forEach((b) => {
      const id = b.dataset[tipus]!;
      const on = !!mapes[tipus][id];
      b.setAttribute('aria-pressed', String(on));
      const lbl = b.querySelector<HTMLElement>('[data-lbl]');
      if (lbl && b.dataset.on && b.dataset.off) lbl.textContent = on ? b.dataset.on : b.dataset.off;
    });
    document.querySelectorAll<HTMLElement>(`[data-${tipus}-count]`).forEach((c) => {
      const id = c.dataset[`${tipus}Count` as 'rsvpCount']!;
      const base = Number(c.dataset.base ?? 0);
      c.textContent = String(base + (mapes[tipus][id] ? 1 : 0));
    });
  });
  // Primers passos
  const passos = e.passos;
  document.querySelectorAll<HTMLInputElement>('[data-step]').forEach((c) => (c.checked = !!passos[c.dataset.step!]));
  document.querySelectorAll<HTMLElement>('[data-progress]').forEach((p) => {
    const total = Number(p.dataset.total ?? 1);
    const fets = Object.keys(passos).length;
    p.style.setProperty('--p', String(Math.min(1, fets / total)));
    const n = p.querySelector('[data-progress-n]');
    if (n) n.textContent = String(Math.min(fets, total));
  });
}

const missatgeToggle: Record<string, [string, string]> = {
  rsvp: ['apuntat', 'desapuntat'],
  buddy: ['companyia', ''],
  save: ['desat', 'tretDesat'],
};

// ——— Filtres i cerca de llistes ———
function filtra(llistaId: string) {
  const llista = document.getElementById(llistaId);
  if (!llista) return;
  const actius: Record<string, string> = {};
  document.querySelectorAll<HTMLButtonElement>(`[data-filters="${llistaId}"] [aria-pressed="true"][data-group]`).forEach((b) => {
    actius[b.dataset.group!] = b.dataset.value!;
  });
  const q = (document.querySelector<HTMLInputElement>(`[data-search-for="${llistaId}"]`)?.value ?? '')
    .normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();
  let visibles = 0;
  llista.querySelectorAll<HTMLElement>('[data-item]').forEach((it) => {
    let ok = Object.entries(actius).every(([g, v]) => v === 'tot' || (it.dataset[g] ?? '').split(' ').includes(v));
    if (ok && q) ok = (it.dataset.text ?? it.textContent ?? '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().includes(q);
    it.hidden = !ok;
    if (ok) visibles++;
  });
  llista.querySelectorAll<HTMLElement>('[data-hide-empty]').forEach((g) => {
    g.hidden = !g.querySelector('[data-item]:not([hidden])');
  });
  const buit = document.querySelector<HTMLElement>(`[data-empty-for="${llistaId}"]`);
  if (buit) buit.hidden = visibles > 0;
}

// ——— Calendari ———
function descarregaIcs(b: HTMLElement) {
  const { titol = '', data = '', inici = '10:00', fi, lloc = '' } = b.dataset;
  const d = data.replaceAll('-', '');
  const hh = (x: string) => x.replace(':', '') + '00';
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Suria//App//CA', 'BEGIN:VEVENT',
    `UID:${d}-${hh(inici)}-${titol.length}@suria`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART;TZID=Europe/Madrid:${d}T${hh(inici)}`,
    `DTEND;TZID=Europe/Madrid:${d}T${hh(fi || inici)}`,
    `SUMMARY:${titol.replace(/[,;]/g, '\\$&')}`,
    `LOCATION:${lloc.replace(/[,;]/g, '\\$&')}, Súria`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `${titol || 'activitat'}.ics`;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  avisa(dades().t.calendari);
}

document.addEventListener('click', async (ev) => {
  const el = (ev.target as HTMLElement).closest<HTMLElement>('button, a, [data-open]');
  if (!el) {
    const dlg = (ev.target as HTMLElement).closest('dialog');
    if (dlg && ev.target === dlg) (dlg as HTMLDialogElement).close();
    return;
  }
  const t = dades().t;

  if (el.matches('[data-close]')) {
    el.closest('dialog')?.close();
    return;
  }
  if (el.dataset.open) {
    ev.preventDefault();
    if (el.hasAttribute('data-requires-auth') && calEntrar()) return;
    (document.getElementById(el.dataset.open) as HTMLDialogElement | null)?.showModal();
    return;
  }
  if (el.hasAttribute('data-requires-auth') && calEntrar()) {
    ev.preventDefault();
    return;
  }

  for (const [tipus, mapa] of [['rsvp', 'apuntat'], ['buddy', 'companyia'], ['thanks', 'gracies'], ['save', 'desat']] as const) {
    const id = el.dataset[tipus];
    if (id === undefined) continue;
    ev.preventDefault();
    if (calEntrar()) return;
    const on = toggle(mapa, id);
    pintaParticipacio();
    const m = missatgeToggle[tipus]?.[on ? 0 : 1];
    if (m && t[m]) avisa(t[m]);
    if (on && navigator.vibrate) navigator.vibrate(8);
    return;
  }

  if (el.dataset.group && el.closest('[data-filters]')) {
    const grup = el.closest<HTMLElement>('[data-filters]')!;
    const g = el.dataset.group;
    // Tornar a tocar un filtre actiu el desactiva (torna a «tot»).
    const tot = grup.querySelector<HTMLButtonElement>(`[data-group="${g}"][data-value="tot"]`);
    const objectiu = el.getAttribute('aria-pressed') === 'true' && el.dataset.value !== 'tot' && tot ? tot : el;
    grup.querySelectorAll<HTMLButtonElement>(`[data-group="${g}"]`).forEach((b) => b.setAttribute('aria-pressed', String(b === objectiu)));
    if (el.dataset.reset) grup.querySelectorAll<HTMLButtonElement>(`[data-group="${el.dataset.reset}"]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.value === 'tot')));
    filtra(grup.dataset.filters!);
    return;
  }

  if (el.hasAttribute('data-share')) {
    ev.preventDefault();
    const url = el.dataset.url ? new URL(el.dataset.url, location.href).href : location.href;
    const title = el.dataset.title ?? document.title;
    try {
      if (navigator.share) await navigator.share({ title, url });
      else {
        await navigator.clipboard.writeText(url);
        avisa(t.copiat);
      }
    } catch {
      /* Cancel·lat. */
    }
    return;
  }

  if (el.hasAttribute('data-ics')) {
    ev.preventDefault();
    descarregaIcs(el);
    return;
  }

  if (el.dataset.seg) {
    el.parentElement?.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === el)));
  }
});

document.addEventListener('change', (ev) => {
  const c = ev.target as HTMLInputElement;
  if (c.dataset.step) {
    const on = toggle('passos', c.dataset.step);
    pintaParticipacio();
    if (on) avisa(dades().t.pas);
  }
});

document.addEventListener('input', (ev) => {
  const c = ev.target as HTMLInputElement;
  if (c.dataset.searchFor) filtra(c.dataset.searchFor);
});

// Drecera: «/» obre «Pregunta a Súria».
document.addEventListener('keydown', (ev) => {
  if (ev.key !== '/' || ev.metaKey || ev.ctrlKey) return;
  const tgt = ev.target as HTMLElement;
  if (tgt.closest('input, textarea, [contenteditable]')) return;
  ev.preventDefault();
  const camp = document.querySelector<HTMLTextAreaElement>('[data-chat-input]');
  if (camp) camp.focus();
  else void navigate(dades().pregunta);
});

// ——— Navegació persistent ———
function sincronitzaNav() {
  const ruta = document.querySelector<HTMLElement>('main[data-ruta]')?.dataset.ruta ?? '';
  const mes = ['mes', 'comerc', 'gestions', 'benvinguda', 'compte', 'negocis', 'descobreix'];
  const tab = mes.includes(ruta) ? 'mes' : ruta;
  document.querySelectorAll<HTMLElement>('[data-tab]').forEach((a) => {
    if (a.dataset.tab === tab) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  document.querySelectorAll<HTMLElement>('[data-side-link]').forEach((a) => {
    if (a.dataset.sideLink === ruta) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

function barraSuperior() {
  const top = document.querySelector<HTMLElement>('[data-top]');
  if (!top) return;
  const pinta = () => (window.scrollY > 8 ? (top.dataset.scrolled = '') : delete top.dataset.scrolled);
  pinta();
  window.removeEventListener('scroll', (window as any).__suriaScroll);
  (window as any).__suriaScroll = pinta;
  window.addEventListener('scroll', pinta, { passive: true });
}

function obreAncora() {
  if (!location.hash) return;
  const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (el instanceof HTMLDetailsElement) {
    el.open = true;
    requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
  }
}
window.addEventListener('hashchange', obreAncora);

function totAlDia() {
  pintaSessio();
  pintaParticipacio();
}
document.addEventListener('suria:estat', totAlDia);

document.addEventListener('astro:page-load', () => {
  aplicaAjustos();
  sincronitzaNav();
  barraSuperior();
  totAlDia();
  document.querySelectorAll<HTMLElement>('[data-filters]').forEach((f) => filtra(f.dataset.filters!));
  obreAncora();
  iniciaViu();
  iniciaComunitat();
  iniciaCompte();
  iniciaXat();
});

void update; void inicials;
