// «Pregunta a Súria»: interfície completa de xat.
// El model d'IA encara no està connectat. `ProveidorDemo` respon només amb dades del lloc
// (horari real del bus, gestions i primers passos verificats) i diu clarament quan no ho sap.
// Per connectar un model, cal implementar `Proveidor` (p. ej. amb streaming des d'un backend propi)
// i substituir `proveidor` a `iniciaXat`. La resta de la interfície no canvia.
import { composaBus, type DadesBus } from '../../lib/bus.ts';
import { get, update, type Missatge, type Xat } from './store.ts';
import { avisa, dades, esc } from './ui.ts';
import { svg } from '../icons.ts';

type Lang = 'ca' | 'es';
type Font = { nom: string; url: string };
type Tros = { text?: string; fonts?: Font[]; accions?: { text: string; url: string }[] };

export interface Proveidor {
  connectat: boolean;
  respon(historial: Missatge[], pregunta: string, signal: AbortSignal): AsyncIterable<Tros>;
}

interface Coneixement {
  lang: Lang;
  bus: DadesBus & { fonts: Font[] };
  info: { titol: string; descripcio: string; enllacos: Font[]; paraules: string }[];
  passos: { id: string; titol: string; text: string; accions: Font[]; fonts: Font[] }[];
  activitats: { titol: string; quan: string; hora: string; lloc: string; url: string }[];
  comercos: { nom: string; tipus: string; horari: Record<string, string[]>; url: string }[];
  urls: Record<string, string>;
}

const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
// Coincidència a l'inici de paraula; amb «!» al final, paraula sencera (p. ex. «pa!» no troba «campanar»).
const te = (q: string, ...paraules: string[]) =>
  paraules.some((p) => {
    const sencera = p.endsWith('!');
    const arrel = p.replace(/!$/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^a-z0-9])${arrel}${sencera ? '(?![a-z0-9])' : ''}`).test(q);
  });
const espera = (ms: number, signal: AbortSignal) =>
  new Promise<void>((res, rej) => {
    const t = setTimeout(res, ms);
    signal.addEventListener('abort', () => { clearTimeout(t); rej(new DOMException('abort', 'AbortError')); }, { once: true });
  });

class ProveidorDemo implements Proveidor {
  connectat = false;
  constructor(private kb: Coneixement) {}

  private resposta(pregunta: string): Tros & { text: string } {
    const { kb } = this;
    const l = kb.lang;
    const q = norm(pregunta);
    const ca = l === 'ca';

    if (te(q, 'bus', 'autobus', 'manresa', 'alsa', 'barcelona')) {
      const r = composaBus(kb.bus, new Date(), l, 3);
      const linies = r.sentits.map((s) => {
        if (s.estat === 'propers') {
          const min = s.minuts !== undefined ? (ca ? ` (d’aquí a ${s.minuts} min)` : ` (en ${s.minuts} min)`) : '';
          const desp = s.despres.length ? (ca ? `; després, ${s.despres.join(', ')} h` : `; después, ${s.despres.join(', ')} h`) : '';
          return `- **${s.etiqueta}:** ${s.propera}${min}${desp}.`;
        }
        if (s.estat === 'acabat') return `- **${s.etiqueta}:** ${ca ? 'avui ja no en surten més' : 'hoy ya no salen más'}${s.primer ? (ca ? `; el pròxim, ${s.primer}` : `; el próximo, ${s.primer}`) : ''}.`;
        return `- **${s.etiqueta}:** ${ca ? 'avui és festiu i l’operador no confirma horari' : 'hoy es festivo y el operador no confirma horario'}.`;
      });
      return {
        text: (ca
          ? 'Segons l’horari programat d’Alsa (no és seguiment en directe):\n'
          : 'Según el horario programado de Alsa (no es seguimiento en directo):\n') + linies.join('\n') +
          (ca ? '\n\nLa parada és a l’estació d’autobusos de Súria.' : '\n\nLa parada está en la estación de autobuses de Súria.'),
        fonts: kb.bus.fonts.slice(0, 2),
      };
    }

    if (te(q, 'farmac', 'guardia', 'medicament')) {
      return {
        text: ca
          ? 'Ara mateix no tinc verificat el torn de guàrdia d’avui, i no me l’inventaré: és una dada que ha de ser exacta. El torn oficial és a la pàgina de farmàcies de l’Ajuntament.\n\nSi és una urgència mèdica, truca al **112**.'
          : 'Ahora mismo no tengo verificado el turno de guardia de hoy, y no me lo voy a inventar: es un dato que tiene que ser exacto. El turno oficial está en la página de farmacias del Ayuntamiento.\n\nSi es una urgencia médica, llama al **112**.',
        fonts: [{ nom: ca ? 'suria.cat · Farmàcies de guàrdia' : 'suria.cat · Farmacias de guardia', url: kb.urls.farmacies }],
      };
    }

    if (te(q, 'empadron', 'padro', 'padron', 'censar')) {
      const p = kb.passos.find((x) => x.id.includes('empadron'));
      if (p) return { text: `${ca ? '**Per empadronar-te:**' : '**Para empadronarte:**'} ${p.text}`, fonts: p.fonts, accions: p.accions.filter((a) => a.url.startsWith('http')) };
    }

    if (te(q, 'moble', 'mueble', 'sofa', 'matalas', 'colchon', 'voluminos', 'trasto', 'poda')) {
      const p = kb.passos.find((x) => x.id.includes('mobles'));
      if (p) return { text: `${ca ? '**Mobles i restes de poda:**' : '**Muebles y restos de poda:**'} ${p.text}`, fonts: p.fonts, accions: p.accions.filter((a) => a.url.startsWith('http')) };
    }

    if (te(q, 'emergenc', '112', 'policia', 'urgenc', 'accident', 'foc', 'fuego', 'incendi')) {
      return {
        text: ca
          ? 'En una emergència, truca al **112** (gratuït, 24 hores, també sense cobertura del teu operador). Per a temes de seguretat que no són urgents, contacta amb la Policia Local.'
          : 'En una emergencia, llama al **112** (gratuito, 24 horas, también sin cobertura de tu operador). Para temas de seguridad que no son urgentes, contacta con la Policía Local.',
        fonts: [{ nom: 'suria.cat · Policia Local', url: 'https://www.suria.cat/policialocal' }],
        accions: [{ text: ca ? 'Truca al 112' : 'Llama al 112', url: 'tel:112' }],
      };
    }

    if (te(q, 'aparca', 'parking', 'parquing', 'cotxe', 'coche', 'visita', 'turis')) {
      return {
        text: ca
          ? 'Si véns de visita, deixa el cotxe als aparcaments públics i puja a peu: el Poble Vell és un barri on viu gent i els carrers són estrets. Gràcies per visitar Súria amb calma.'
          : 'Si vienes de visita, deja el coche en los aparcamientos públicos y sube a pie: el Poble Vell es un barrio donde vive gente y las calles son estrechas. Gracias por visitar Súria con calma.',
        fonts: [{ nom: ca ? 'suria.cat · Aparcaments' : 'suria.cat · Aparcamientos', url: kb.urls.parquings }],
      };
    }

    if (te(q, 'que fer', 'que hacer', 'agenda', 'activitat', 'actividad', 'cap de setmana', 'fin de semana', 'avui', 'hoy', 'concert', 'plan')) {
      const llista = kb.activitats.slice(0, 4).map((a) => `- **${a.titol}** · ${a.quan}, ${a.hora} · ${a.lloc}`).join('\n');
      return {
        text: (ca ? 'Això és el que hi ha aviat (activitats d’exemple del prototip):\n' : 'Esto es lo que hay pronto (actividades de ejemplo del prototipo):\n') + llista +
          (ca ? '\n\nSi és la primera vegada que hi vas, a cada fitxa t’expliquem què passarà i pots dir que busques companyia.' : '\n\nSi es la primera vez que vas, en cada ficha te explicamos qué pasará y puedes decir que buscas compañía.'),
        accions: [{ text: ca ? 'Obre l’agenda' : 'Abre la agenda', url: kb.urls.agenda }],
      };
    }

    if (te(q, 'obert', 'abierto', 'sopar', 'cenar', 'dinar', 'comer', 'menu', 'pa!', 'pan!', 'botiga', 'tienda', 'comerc', 'restaur', 'tapes', 'tapas', 'cafe', 'bar!', 'bars!')) {
      const llista = kb.comercos.slice(0, 4).map((c) => `- **${c.nom}** · ${c.tipus}`).join('\n');
      return {
        text: (ca
          ? 'Aquests comerços comuniquen el seu horari a la plataforma (són d’exemple en el prototip). Mostrem l’horari que ens diu el negoci, i quan la cuina tanca abans, ho diem:\n'
          : 'Estos comercios comunican su horario en la plataforma (son de ejemplo en el prototipo). Mostramos el horario que nos dice el negocio, y cuando la cocina cierra antes, lo decimos:\n') + llista,
        accions: [{ text: ca ? 'Mira què és obert ara' : 'Mira qué está abierto ahora', url: kb.urls.comerc }],
      };
    }

    // Cerca a la informació pràctica verificada.
    const paraules = q.split(/[^a-z0-9]+/).filter((p) => p.length > 3);
    let millor: Coneixement['info'][number] | null = null;
    let punts = 0;
    for (const it of kb.info) {
      const p = paraules.filter((w) => it.paraules.includes(w.slice(0, 5))).length;
      if (p > punts) { punts = p; millor = it; }
    }
    if (millor && punts > 0) {
      return {
        text: `**${millor.titol}.** ${millor.descripcio}\n\n${ca ? 'Aquí tens els enllaços oficials:' : 'Aquí tienes los enlaces oficiales:'}`,
        fonts: millor.enllacos.filter((e) => e.url.startsWith('http')).slice(0, 3),
      };
    }

    return {
      text: ca
        ? 'Encara no tinc aquesta resposta. Ara funciono en **mode demostració**, sense model d’IA connectat, i només responc amb dades verificades del poble.\n\nPots preguntar-ho a la comunitat: sovint algú del poble ho sap.'
        : 'Todavía no tengo esta respuesta. Ahora funciono en **modo demostración**, sin modelo de IA conectado, y solo respondo con datos verificados del pueblo.\n\nPuedes preguntarlo en la comunidad: a menudo alguien del pueblo lo sabe.',
      accions: [{ text: ca ? 'Pregunta a la comunitat' : 'Pregunta en la comunidad', url: kb.urls.comunitat }],
    };
  }

  async *respon(_h: Missatge[], pregunta: string, signal: AbortSignal): AsyncIterable<Tros> {
    const r = this.resposta(pregunta);
    await espera(550, signal);
    const trossos = r.text.match(/\S+\s*/g) ?? [];
    for (const t of trossos) {
      await espera(14 + Math.random() * 26, signal);
      yield { text: t };
    }
    if (r.fonts?.length || r.accions?.length) yield { fonts: r.fonts, accions: r.accions };
  }
}

// ——— Presentació ———
function markdown(text: string): string {
  const linies = esc(text).split('\n');
  let html = '';
  let llista = false;
  for (const l of linies) {
    const fmt = l.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    if (l.startsWith('- ')) {
      if (!llista) { html += '<ul>'; llista = true; }
      html += `<li>${fmt.slice(2)}</li>`;
    } else {
      if (llista) { html += '</ul>'; llista = false; }
      if (l.trim()) html += `<p>${fmt}</p>`;
    }
  }
  if (llista) html += '</ul>';
  return html;
}

const titolDe = (text: string) => (text.length > 48 ? text.slice(0, 46).trimEnd() + '…' : text);
const nouId = () => Math.random().toString(36).slice(2, 10);

let controlador: AbortController | null = null;

export function iniciaXat() {
  const root = document.querySelector<HTMLElement>('[data-chat]');
  if (!root) return;
  const kb: Coneixement = JSON.parse(root.querySelector('#kb')!.textContent!);
  const l = kb.lang;
  const ca = l === 'ca';
  const proveidor: Proveidor = new ProveidorDemo(kb);

  const log = root.querySelector<HTMLElement>('[data-chat-log]')!;
  const buit = root.querySelector<HTMLElement>('[data-chat-empty]')!;
  const form = root.querySelector<HTMLFormElement>('[data-chat-form]')!;
  const input = root.querySelector<HTMLTextAreaElement>('[data-chat-input]')!;
  const enviar = root.querySelector<HTMLButtonElement>('[data-chat-send]')!;
  const mic = root.querySelector<HTMLButtonElement>('[data-chat-mic]')!;
  const adjunt = root.querySelector<HTMLInputElement>('[data-chat-file]')!;
  const adjunts = root.querySelector<HTMLElement>('[data-chat-attachments]')!;
  const historial = document.getElementById('historial') as HTMLDialogElement | null;
  const llistaHist = historial?.querySelector<HTMLElement>('[data-hist-list]');

  let xat: Xat | null = null;
  let fitxer: File | null = null;
  try {
    const id = sessionStorage.getItem('suria-xat');
    xat = get().xats.find((x) => x.id === id) ?? null;
  } catch { /* opcional */ }

  const desaXat = () => {
    if (!xat) return;
    const x = xat;
    update((e) => {
      e.xats = [x, ...e.xats.filter((y) => y.id !== x.id)].slice(0, 30);
    });
    try { sessionStorage.setItem('suria-xat', x.id); } catch { /* opcional */ }
  };

  const ajusta = () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 200) + 'px';
    enviar.disabled = !input.value.trim() && !controlador;
  };

  const baixa = () => requestAnimationFrame(() => window.scrollTo({ top: document.body.scrollHeight, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));

  function bombollaJo(m: Missatge) {
    const el = document.createElement('div');
    el.className = 'msg msg--jo';
    el.innerHTML = `<div class="msg__bubble">${esc(m.text).replace(/\n/g, '<br>')}</div>`;
    log.append(el);
  }

  function bombollaAi(m: Missatge | null): { cos: HTMLElement; peu: HTMLElement; el: HTMLElement } {
    const el = document.createElement('div');
    el.className = 'msg msg--ai';
    el.innerHTML = `<div class="msg__who">${svg('spark', 'i-s')}<span>Súria</span></div><div class="msg__body" aria-live="polite"></div><div class="msg__extra"></div><div class="msg__tools"></div>`;
    const cos = el.querySelector<HTMLElement>('.msg__body')!;
    const peu = el.querySelector<HTMLElement>('.msg__extra')!;
    if (m) {
      cos.innerHTML = markdown(m.text);
      if (m.fonts?.length) pintaFonts(peu, m.fonts, []);
      eines(el, m.text);
    }
    log.append(el);
    return { cos, peu, el };
  }

  function pintaFonts(peu: HTMLElement, fonts: Font[], accions: { text: string; url: string }[]) {
    let html = '';
    if (accions.length) html += `<div class="msg__actions">${accions.map((a) => `<a class="btn btn--s ${a.url.startsWith('tel:') ? '' : 'btn--soft'}" href="${esc(a.url)}"${a.url.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${esc(a.text)}${svg('arrow', 'i-s')}</a>`).join('')}</div>`;
    if (fonts.length) html += `<div class="msg__sources"><span class="kicker">${ca ? 'Fonts' : 'Fuentes'}</span>${fonts.map((f, i) => `<a class="source" href="${esc(f.url)}" target="_blank" rel="noopener"><span class="source__n">${i + 1}</span>${esc(f.nom)}${svg('external', 'i-s')}</a>`).join('')}</div>`;
    peu.innerHTML = html;
  }

  function eines(el: HTMLElement, text: string) {
    const t = el.querySelector<HTMLElement>('.msg__tools')!;
    t.innerHTML = `
      <button class="iconbtn" data-copy aria-label="${ca ? 'Copia' : 'Copia'}">${svg('copy', 'i-s')}</button>
      <button class="iconbtn" data-vote="up" aria-pressed="false" aria-label="${ca ? 'Resposta útil' : 'Respuesta útil'}">${svg('thumbUp', 'i-s')}</button>
      <button class="iconbtn" data-vote="down" aria-pressed="false" aria-label="${ca ? 'Resposta poc útil' : 'Respuesta poco útil'}">${svg('thumbDown', 'i-s')}</button>
      <button class="iconbtn" data-regen aria-label="${ca ? 'Torna a respondre' : 'Vuelve a responder'}">${svg('refresh', 'i-s')}</button>`;
    t.querySelector('[data-copy]')!.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(text); avisa(ca ? 'Resposta copiada' : 'Respuesta copiada'); } catch { /* sense porta-retalls */ }
    });
    t.querySelectorAll<HTMLButtonElement>('[data-vote]').forEach((b) => b.addEventListener('click', () => {
      t.querySelectorAll('[data-vote]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      avisa(ca ? 'Gràcies, ens ajuda a millorar' : 'Gracias, nos ayuda a mejorar');
    }));
    t.querySelector('[data-regen]')!.addEventListener('click', () => {
      if (!xat || controlador) return;
      const ultimaJo = [...xat.missatges].reverse().find((m) => m.rol === 'jo');
      if (!ultimaJo) return;
      xat.missatges = xat.missatges.slice(0, xat.missatges.lastIndexOf(ultimaJo) + 1);
      el.remove();
      void genera(ultimaJo.text);
    });
  }

  function pintaTot() {
    log.replaceChildren();
    const hi = !!xat?.missatges.length;
    buit.hidden = hi;
    root!.toggleAttribute('data-conversa', hi);
    xat?.missatges.forEach((m) => (m.rol === 'jo' ? bombollaJo(m) : bombollaAi(m)));
  }

  async function genera(pregunta: string) {
    const { cos, peu, el } = bombollaAi(null);
    el.classList.add('msg--thinking');
    cos.innerHTML = `<span class="thinking"><span></span><span></span><span></span><span class="sr">${ca ? 'Pensant…' : 'Pensando…'}</span></span>`;
    controlador = new AbortController();
    root!.dataset.generant = '';
    enviar.disabled = false;
    enviar.setAttribute('aria-label', ca ? 'Atura la resposta' : 'Detén la respuesta');
    let text = '';
    let fonts: Font[] = [];
    let accions: { text: string; url: string }[] = [];
    try {
      for await (const tros of proveidor.respon(xat!.missatges, pregunta, controlador.signal)) {
        if (tros.text) {
          if (!text) el.classList.remove('msg--thinking');
          text += tros.text;
          cos.innerHTML = markdown(text) ;
          cos.lastElementChild?.insertAdjacentHTML('beforeend', '<span class="caret" aria-hidden="true"></span>');
        }
        if (tros.fonts) fonts = tros.fonts;
        if (tros.accions) accions = tros.accions;
        baixa();
      }
    } catch (e) {
      if ((e as Error).name !== 'AbortError') text ||= ca ? 'No he pogut respondre. Torna-ho a provar.' : 'No he podido responder. Vuelve a intentarlo.';
      else text ||= ca ? '(Resposta aturada)' : '(Respuesta detenida)';
    } finally {
      el.classList.remove('msg--thinking');
      controlador = null;
      delete root!.dataset.generant;
      enviar.setAttribute('aria-label', ca ? 'Envia' : 'Envía');
      cos.innerHTML = markdown(text);
      pintaFonts(peu, fonts, accions);
      eines(el, text);
      xat!.missatges.push({ rol: 'ai', text, fonts, quan: Date.now() });
      desaXat();
      ajusta();
      baixa();
    }
  }

  async function envia(text: string) {
    text = text.trim();
    if (!text) return;
    if (!xat) xat = { id: nouId(), titol: titolDe(text), missatges: [], quan: Date.now() };
    const amb = fitxer ? `${text}\n📎 ${fitxer.name}` : text;
    const m: Missatge = { rol: 'jo', text: amb, quan: Date.now() };
    xat.missatges.push(m);
    xat.quan = Date.now();
    buit.hidden = true;
    root!.setAttribute('data-conversa', '');
    bombollaJo(m);
    input.value = '';
    fitxer = null;
    adjunts.replaceChildren();
    ajusta();
    baixa();
    desaXat();
    await genera(text);
  }

  form.onsubmit = (ev) => {
    ev.preventDefault();
    if (controlador) { controlador.abort(); return; }
    void envia(input.value);
  };
  input.oninput = ajusta;
  input.onkeydown = (ev) => {
    if (ev.key === 'Enter' && !ev.shiftKey && !ev.isComposing) {
      ev.preventDefault();
      form.requestSubmit();
    }
  };
  root.querySelectorAll<HTMLButtonElement>('[data-suggest]').forEach((b) => (b.onclick = () => void envia(b.dataset.suggest!)));

  root.querySelector<HTMLButtonElement>('[data-chat-new]')?.addEventListener('click', () => {
    controlador?.abort();
    xat = null;
    try { sessionStorage.removeItem('suria-xat'); } catch { /* opcional */ }
    pintaTot();
    input.focus();
  });
  document.querySelectorAll<HTMLButtonElement>('[data-chat-new-top]').forEach((b) => (b.onclick = () => root.querySelector<HTMLButtonElement>('[data-chat-new]')?.click()));

  // Adjunts: es mostren al compositor; el model els podrà llegir quan estigui connectat.
  root.querySelector<HTMLButtonElement>('[data-chat-attach]')!.onclick = () => adjunt.click();
  adjunt.onchange = () => {
    fitxer = adjunt.files?.[0] ?? null;
    adjunt.value = '';
    if (!fitxer) return;
    adjunts.innerHTML = `<span class="attach">${svg('paperclip', 'i-s')}<span>${esc(fitxer.name)}</span><button type="button" class="attach__x" aria-label="${ca ? 'Treu l’adjunt' : 'Quita el adjunto'}">${svg('close', 'i-s')}</button></span>`;
    adjunts.querySelector('button')!.addEventListener('click', () => { fitxer = null; adjunts.replaceChildren(); });
    input.focus();
  };

  // Dictat per veu (Web Speech API), si el navegador el té.
  const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
  let reconeixement: any = null;
  mic.onclick = () => {
    if (!SR) { avisa(ca ? 'Aquest navegador no permet dictar. Prova-ho amb Chrome o Safari.' : 'Este navegador no permite dictar. Pruébalo con Chrome o Safari.'); return; }
    if (reconeixement) { reconeixement.stop(); return; }
    reconeixement = new SR();
    reconeixement.lang = ca ? 'ca-ES' : 'es-ES';
    reconeixement.interimResults = true;
    const base = input.value ? input.value.trimEnd() + ' ' : '';
    mic.setAttribute('aria-pressed', 'true');
    root!.dataset.escoltant = '';
    reconeixement.onresult = (e: any) => {
      input.value = base + Array.from(e.results).map((r: any) => r[0].transcript).join('');
      ajusta();
    };
    reconeixement.onend = () => { reconeixement = null; mic.setAttribute('aria-pressed', 'false'); delete root!.dataset.escoltant; input.focus(); };
    reconeixement.onerror = reconeixement.onend;
    reconeixement.start();
  };

  // Historial
  function pintaHistorial() {
    if (!llistaHist) return;
    const xats = get().xats;
    if (!xats.length) {
      llistaHist.innerHTML = `<p class="muted" style="padding:1rem 0">${ca ? 'Encara no hi ha converses.' : 'Todavía no hay conversaciones.'}</p>`;
      return;
    }
    const fmt = new Intl.DateTimeFormat(ca ? 'ca' : 'es', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' });
    llistaHist.innerHTML = xats.map((x) => `
      <div class="row hist">
        <button class="row__body hist__open" data-hist="${x.id}"><span class="row__title">${esc(x.titol)}</span><span class="row__sub">${fmt.format(x.quan)} · ${x.missatges.length} ${ca ? 'missatges' : 'mensajes'}</span></button>
        <button class="iconbtn" data-hist-del="${x.id}" aria-label="${ca ? 'Esborra la conversa' : 'Borra la conversación'}">${svg('close', 'i-s')}</button>
      </div>`).join('');
    llistaHist.querySelectorAll<HTMLButtonElement>('[data-hist]').forEach((b) => (b.onclick = () => {
      xat = get().xats.find((x) => x.id === b.dataset.hist) ?? null;
      try { sessionStorage.setItem('suria-xat', xat?.id ?? ''); } catch { /* opcional */ }
      pintaTot();
      historial?.close();
      baixa();
    }));
    llistaHist.querySelectorAll<HTMLButtonElement>('[data-hist-del]').forEach((b) => (b.onclick = () => {
      update((e) => { e.xats = e.xats.filter((x) => x.id !== b.dataset.histDel); });
      if (xat?.id === b.dataset.histDel) { xat = null; pintaTot(); }
      pintaHistorial();
    }));
  }
  historial?.addEventListener('toggle', pintaHistorial);
  document.querySelectorAll('[data-open="historial"]').forEach((b) => b.addEventListener('click', pintaHistorial));

  pintaTot();
  ajusta();
  const q = new URLSearchParams(location.search).get('q');
  if (q) {
    history.replaceState(history.state, '', location.pathname);
    if (!controlador) {
      xat = null;
      pintaTot();
      void envia(q);
    }
  } else if (xat?.missatges.length) baixa();
  void dades;
}
