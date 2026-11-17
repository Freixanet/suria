// Compte: accés per correu amb codi (simulat), creació del perfil i ajustos.
// Sense backend: la sessió es desa al dispositiu. Cap dada surt del navegador.
import { get, update, inicials, surt, type Perfil } from './store.ts';
import { aplicaAjustos, avisa, dades } from './ui.ts';
import { navigate } from 'astro:transitions/client';

const FACANES = ['ocre', 'teula', 'rosa', 'cel', 'turo'];

export function iniciaCompte() {
  const root = document.querySelector<HTMLElement>('[data-compte]');
  if (!root) {
    ajustosGlobals();
    return;
  }
  const { lang, t } = dades();
  const ca = lang === 'ca';
  const passos = root.querySelectorAll<HTMLElement>('[data-pas]');
  const mostra = (nom: string) => {
    passos.forEach((p) => (p.hidden = p.dataset.pas !== nom));
    const actiu = root.querySelector<HTMLElement>(`[data-pas="${nom}"]`);
    actiu?.querySelector<HTMLElement>('input:not([type="radio"]):not([type="checkbox"]), [data-focus]')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  };
  let correu = '';

  const pinta = () => {
    const u = get().usuari;
    if (u) {
      mostra('tauler');
      tauler();
    } else if (!root.querySelector('[data-pas]:not([hidden])') || root.querySelector('[data-pas="tauler"]:not([hidden])')) mostra('correu');
  };

  // 1. Correu
  const fCorreu = root.querySelector<HTMLFormElement>('[data-form="correu"]')!;
  fCorreu.onsubmit = (ev) => {
    ev.preventDefault();
    const inp = fCorreu.querySelector<HTMLInputElement>('input')!;
    const err = fCorreu.querySelector<HTMLElement>('[data-err]')!;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim())) {
      err.hidden = false;
      inp.setAttribute('aria-invalid', 'true');
      inp.focus();
      return;
    }
    err.hidden = true;
    inp.removeAttribute('aria-invalid');
    correu = inp.value.trim();
    root.querySelectorAll('[data-correu]').forEach((n) => (n.textContent = correu));
    mostra('codi');
  };
  root.querySelectorAll<HTMLButtonElement>('[data-social]').forEach((b) => (b.onclick = () => {
    correu = b.dataset.social === 'apple' ? 'privat@icloud.com' : 'tu@gmail.com';
    mostra('perfil');
  }));

  // 2. Codi de 6 xifres
  const caselles = [...root.querySelectorAll<HTMLInputElement>('[data-otp] input')];
  const fCodi = root.querySelector<HTMLFormElement>('[data-form="codi"]')!;
  const comprova = () => {
    const codi = caselles.map((c) => c.value).join('');
    fCodi.querySelector<HTMLButtonElement>('[type="submit"]')!.disabled = codi.length < 6;
    return codi.length === 6;
  };
  caselles.forEach((c, i) => {
    c.oninput = () => {
      c.value = c.value.replace(/\D/g, '').slice(-1);
      if (c.value && caselles[i + 1]) caselles[i + 1].focus();
      if (comprova()) fCodi.requestSubmit();
    };
    c.onkeydown = (e) => {
      if (e.key === 'Backspace' && !c.value && caselles[i - 1]) caselles[i - 1].focus();
    };
    c.onpaste = (e) => {
      const txt = (e.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, 6);
      if (!txt) return;
      e.preventDefault();
      txt.split('').forEach((d, j) => caselles[j] && (caselles[j].value = d));
      caselles[Math.min(txt.length, 5)].focus();
      if (comprova()) fCodi.requestSubmit();
    };
  });
  fCodi.onsubmit = (ev) => {
    ev.preventDefault();
    if (!comprova()) return;
    mostra('perfil');
  };
  root.querySelector<HTMLButtonElement>('[data-reenvia]')?.addEventListener('click', () => avisa(ca ? 'T’hem tornat a enviar el codi' : 'Te hemos vuelto a enviar el código'));
  root.querySelectorAll<HTMLButtonElement>('[data-torna]').forEach((b) => (b.onclick = () => mostra(b.dataset.torna!)));

  // 3. Perfil
  const fPerfil = root.querySelector<HTMLFormElement>('[data-form="perfil"]')!;
  fPerfil.onsubmit = (ev) => {
    ev.preventDefault();
    const fd = new FormData(fPerfil);
    const nom = String(fd.get('nom') ?? '').trim();
    const err = fPerfil.querySelector<HTMLElement>('[data-err]')!;
    if (nom.length < 2) {
      err.hidden = false;
      fPerfil.querySelector<HTMLInputElement>('[name="nom"]')!.focus();
      return;
    }
    const perfil = (fd.get('perfil') as Perfil) ?? 'veinat';
    const text = (fd.get('text') as 'm' | 'l' | 'xl') ?? 'm';
    update((e) => {
      e.usuari = {
        nom,
        correu: correu || 'tu@correu.cat',
        inicials: inicials(nom),
        facana: FACANES[nom.length % FACANES.length],
        perfil,
        interessos: fd.getAll('interes').map(String),
        desDe: new Date().toISOString().slice(0, 10),
      };
      e.settings.text = text;
    });
    aplicaAjustos();
    avisa(t.benvingut.replace('{nom}', nom.split(' ')[0]));
    const seguent = new URLSearchParams(location.search).get('seguent');
    if (seguent && seguent.startsWith('/')) void navigate(seguent);
    else if (perfil === 'nouvingut') void navigate(root.dataset.benvinguda!);
    else pinta();
  };
  fPerfil.querySelectorAll<HTMLInputElement>('input[name="text"]').forEach((r) => (r.onchange = () => {
    document.documentElement.dataset.text = r.value === 'm' ? '' : r.value;
    if (r.value === 'm') delete document.documentElement.dataset.text;
  }));

  // Tauler
  function tauler() {
    const u = get().usuari!;
    const e = get();
    const etiquetes: Record<Perfil, string> = ca
      ? { veinat: 'Veí o veïna de Súria', nouvingut: 'Nou a Súria', negoci: 'Comerç local', visita: 'De visita' }
      : { veinat: 'Vecino o vecina de Súria', nouvingut: 'Nuevo en Súria', negoci: 'Comercio local', visita: 'De visita' };
    root!.querySelectorAll<HTMLElement>('[data-u="nom"]').forEach((n) => (n.textContent = u.nom));
    root!.querySelectorAll<HTMLElement>('[data-u="perfil"]').forEach((n) => (n.textContent = etiquetes[u.perfil]));
    root!.querySelectorAll<HTMLElement>('[data-u="correu"]').forEach((n) => (n.textContent = u.correu));
    root!.querySelectorAll<HTMLElement>('[data-u="avatar"]').forEach((n) => { n.textContent = u.inicials; n.dataset.f = u.facana; });
    root!.querySelector('[data-stat="apuntat"]')!.textContent = String(Object.keys(e.apuntat).length);
    root!.querySelector('[data-stat="gracies"]')!.textContent = String(Object.keys(e.gracies).length);
    root!.querySelector('[data-stat="posts"]')!.textContent = String(e.posts.length);
    // Les meves activitats
    root!.querySelectorAll<HTMLElement>('[data-meva]').forEach((r) => (r.hidden = !e.apuntat[r.dataset.meva!]));
    const capAct = root!.querySelector<HTMLElement>('[data-meves-buit]');
    if (capAct) capAct.hidden = Object.keys(e.apuntat).length > 0;
    root!.querySelectorAll<HTMLElement>('[data-desat-item]').forEach((r) => (r.hidden = !e.desat[r.dataset.desatItem!]));
    const capDesat = root!.querySelector<HTMLElement>('[data-desats-buit]');
    if (capDesat) capDesat.hidden = Object.keys(e.desat).length > 0;
  }

  root.querySelector<HTMLButtonElement>('[data-surt]')?.addEventListener('click', () => {
    surt();
    avisa(t.sortit);
    mostra('correu');
  });
  root.querySelector<HTMLButtonElement>('[data-esborra]')?.addEventListener('click', (ev) => {
    const b = ev.currentTarget as HTMLButtonElement;
    if (!b.dataset.confirm) {
      b.dataset.confirm = '1';
      b.querySelector('[data-lbl]')!.textContent = ca ? 'Toca de nou per confirmar' : 'Toca de nuevo para confirmar';
      return;
    }
    try { localStorage.removeItem('suria-app'); } catch { /* opcional */ }
    location.reload();
  });
  root.querySelector<HTMLButtonElement>('[data-exporta]')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(get(), null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'suria-les-meves-dades.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });

  ajustosGlobals();
  document.addEventListener('suria:estat', () => get().usuari && root.querySelector('[data-pas="tauler"]:not([hidden])') && tauler());
  pinta();
}

/** Controls d'ajustos (poden aparèixer en més d'una pantalla). */
function ajustosGlobals() {
  const s = get().settings;
  document.querySelectorAll<HTMLButtonElement>('[data-set-text]').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.setText === s.text));
    b.onclick = () => {
      update((e) => { e.settings.text = b.dataset.setText as 'm'; });
      aplicaAjustos();
      ajustosGlobals();
    };
  });
  document.querySelectorAll<HTMLButtonElement>('[data-set-theme]').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.setTheme === s.theme));
    b.onclick = () => {
      update((e) => { e.settings.theme = b.dataset.setTheme as 'system'; });
      aplicaAjustos();
      ajustosGlobals();
    };
  });
  document.querySelectorAll<HTMLInputElement>('[data-notif]').forEach((c) => {
    c.checked = !!s.avisos[c.dataset.notif!];
    c.onchange = () => {
      update((e) => { e.settings.avisos[c.dataset.notif!] = c.checked; });
      avisa(dades().t.ajust);
    };
  });
}
