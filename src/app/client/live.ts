// Dades que depenen del moment: salutació, pròxim bus (horari programat real), estat dels comerços i temps.
import { composaBus, type DadesBus } from '../../lib/bus.ts';
import { dataMadrid, diaSetmana, horaMadrid } from '../../lib/hora-local.ts';
import { TEMPS_URL, llegeixTemps, condicio, iconesTemps } from '../../lib/temps.ts';
import { get } from './store.ts';
import { dades } from './ui.ts';

const hora = (h: string, l: 'ca' | 'es') => (l === 'ca' ? h.replace(':', '.') : h);

function salutacio() {
  const { lang } = dades();
  const h = Number(horaMadrid(new Date()).slice(0, 2));
  const moment = h < 6 ? 'nit' : h < 14 ? 'mati' : h < 20 ? 'tarda' : 'vespre';
  const textos = {
    ca: { nit: 'Bona nit', mati: 'Bon dia', tarda: 'Bona tarda', vespre: 'Bon vespre' },
    es: { nit: 'Buenas noches', mati: 'Buenos días', tarda: 'Buenas tardes', vespre: 'Buenas noches' },
  }[lang];
  const u = get().usuari;
  document.querySelectorAll<HTMLElement>('[data-greet]').forEach((g) => {
    g.textContent = u ? `${textos[moment]}, ${u.nom.split(' ')[0]}.` : `${textos[moment]}.`;
  });
  document.querySelectorAll<HTMLElement>('[data-moment]').forEach((m) => (m.dataset.moment = moment));
}

function bus() {
  const { lang } = dades();
  document.querySelectorAll<HTMLElement>('[data-bus]').forEach((root) => {
    const raw = root.querySelector('script[type="application/json"]')?.textContent;
    if (!raw) return;
    const d: DadesBus = JSON.parse(raw);
    const r = composaBus(d, new Date(), lang, 2);
    const cap = r.sentits.find((s) => s.id === 'suria-manresa');
    document.querySelectorAll<HTMLElement>('[data-hero-bus]').forEach((el) => {
      if (cap?.estat === 'propers') {
        const min = cap.minuts !== undefined ? (lang === 'ca' ? `, d’aquí a ${cap.minuts} min` : `, en ${cap.minuts} min`) : '';
        el.textContent = lang === 'ca' ? `El pròxim bus a Manresa surt a les ${cap.propera}${min}.` : `El próximo bus a Manresa sale a las ${cap.propera}${min}.`;
      } else if (cap?.estat === 'acabat' && cap.primer) {
        el.textContent = lang === 'ca' ? `Avui ja no hi ha més busos a Manresa; el pròxim, ${cap.primer}.` : `Hoy ya no hay más buses a Manresa; el próximo, ${cap.primer}.`;
      }
    });
    for (const s of r.sentits) {
      const el = root.querySelector<HTMLElement>(`[data-sentit="${s.id}"]`);
      if (!el) continue;
      const gran = el.querySelector<HTMLElement>('[data-gran]');
      const sub = el.querySelector<HTMLElement>('[data-sub]');
      if (!gran || !sub) continue;
      if (s.estat === 'propers') {
        gran.textContent = s.propera;
        const min = s.minuts !== undefined ? (lang === 'ca' ? `d’aquí a ${s.minuts} min` : `en ${s.minuts} min`) : '';
        const despres = s.despres.length ? (lang === 'ca' ? `després, ${s.despres.join(', ')} h` : `después, ${s.despres.join(', ')} h`) : '';
        sub.textContent = [min, despres].filter(Boolean).join(' · ');
      } else if (s.estat === 'acabat') {
        gran.textContent = lang === 'ca' ? 'Avui ja no' : 'Hoy ya no';
        sub.textContent = s.primer ? (lang === 'ca' ? `Pròxim: ${s.primer}` : `Próximo: ${s.primer}`) : '';
      } else {
        gran.textContent = lang === 'ca' ? 'Festiu' : 'Festivo';
        sub.textContent = lang === 'ca' ? 'Consulta l’operador' : 'Consulta al operador';
      }
    }
  });
}

function comercos() {
  const { lang } = dades();
  const ara = new Date();
  const dia = diaSetmana(dataMadrid(ara));
  const h = horaMadrid(ara);
  document.querySelectorAll<HTMLElement>('[data-horari]').forEach((el) => {
    const horari: Record<string, string[]> = JSON.parse(el.dataset.horari!);
    const trams = horari[dia] ?? [];
    let text = lang === 'ca' ? 'Tancat per avui' : 'Cerrado por hoy';
    let obert = false;
    for (const t of trams) {
      const [i, f] = t.split('-');
      if (h >= i && h < f) {
        obert = true;
        text = lang === 'ca' ? `Obert fins a les ${hora(f, lang)} h` : `Abierto hasta las ${hora(f, lang)} h`;
      }
    }
    if (!obert) {
      const seg = trams.map((t) => t.split('-')[0]).find((i) => i > h);
      if (seg) text = lang === 'ca' ? `Obre a les ${hora(seg, lang)} h` : `Abre a las ${hora(seg, lang)} h`;
    }
    el.classList.toggle('tag--ok', obert);
    el.classList.toggle('tag--off', !obert);
    const lbl = el.querySelector('[data-lbl]');
    if (lbl) lbl.textContent = text;
    const item = el.closest<HTMLElement>('[data-item]');
    if (item) item.dataset.ara = obert ? 'obert tot' : 'tancat tot';
  });
}

async function temps() {
  const el = document.querySelector<HTMLElement>('[data-weather]');
  if (!el) return;
  const pinta = (raw: unknown) => {
    const m = llegeixTemps(raw);
    if (!m) return false;
    const tipus = condicio(m.simbol);
    el.querySelector('svg')!.innerHTML = iconesTemps[tipus];
    el.querySelector('[data-weather-t]')!.textContent = `${Math.round(m.temperatura)}°`;
    el.hidden = false;
    return true;
  };
  try {
    const cache = JSON.parse(sessionStorage.getItem('suria-temps-app') ?? 'null');
    if (cache && Date.now() - cache.quan < 15 * 60_000 && pinta(cache.raw)) return;
  } catch { /* opcional */ }
  try {
    const r = await fetch(TEMPS_URL, { signal: AbortSignal.timeout(8000), credentials: 'omit', referrerPolicy: 'no-referrer' });
    if (!r.ok) return;
    const raw = await r.json();
    if (pinta(raw)) {
      try { sessionStorage.setItem('suria-temps-app', JSON.stringify({ raw, quan: Date.now() })); } catch { /* opcional */ }
    }
  } catch { /* Sense temps: el xip queda amagat. */ }
}

let rellotge: number | undefined;
export function iniciaViu() {
  salutacio();
  bus();
  comercos();
  void temps();
  clearInterval(rellotge);
  rellotge = window.setInterval(() => {
    salutacio();
    bus();
    comercos();
  }, 30_000);
}
document.addEventListener('suria:estat', salutacio);
