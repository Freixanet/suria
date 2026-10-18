// Omple «Avui a Súria» amb l'hora de Súria i el torna a calcular cada minut.
// Sense JavaScript queda el text de reserva, que no depèn de l'hora.
import { composaResum, type DadesAra } from '../lib/ara.ts';
import { composaBus, type DadesBus } from '../lib/bus.ts';
import { telefonVisible } from '../lib/format.ts';
import { dataMadrid } from '../lib/hora-local.ts';

type Textos = {
  senseVigent: string;
  fontOficial: string;
  fontUrl: string;
  agendaOficial: string;
  veureAgenda: string;
  trucar: string;
  comArribar: string;
  seguentTorn: string;
};

// Icones de traç (24 × 24), com les de les tasques.
const ICONES = {
  rellotge: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  telefon: '<path d="M6.6 3.5h2.6l1.5 4-2 1.3a11 11 0 0 0 6.5 6.5l1.3-2 4 1.5v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z"/>',
  lloc: '<path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
};
function icona(nom: keyof typeof ICONES) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('class', 'ic');
  svg.innerHTML = ICONES[nom];
  return svg;
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, classe: string, text?: string, attrs: Record<string, string> = {}) {
  const node = document.createElement(tag);
  node.className = classe;
  if (text !== undefined) node.textContent = text;
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

function ajustaTargetes(agenda: HTMLElement) {
  const gap = parseFloat(getComputedStyle(agenda).columnGap) || 0;
  const capacitat = Math.max(1, Math.floor((agenda.clientWidth + gap) / (288 + gap)));
  const targetes = Array.from(agenda.children) as HTMLElement[];
  agenda.style.setProperty('--targetes-visibles', String(Math.min(capacitat, targetes.length) || 1));
  targetes.forEach((targeta, index) => { targeta.hidden = index >= capacitat; });
}

function pinta() {
  for (const bloc of document.querySelectorAll<HTMLElement>('[data-avui-resum]')) {
    const dadesBase = JSON.parse(bloc.dataset.avuiResum ?? '{}') as DadesAra;
    const avui = dataMadrid(new Date());
    const mode = bloc.dataset.agendaMode;
    const dades = { ...dadesBase, activitats: dadesBase.activitats.filter((activitat) =>
      mode === 'avui' ? activitat.inici <= avui && (activitat.fi ?? activitat.inici) >= avui :
      mode === 'properes' ? activitat.inici > avui : true,
    ) };
    const textos = JSON.parse(bloc.dataset.textos ?? '{}') as Textos;
    const llengua = bloc.dataset.llengua === 'es' ? 'es' : 'ca';
    const r = composaResum(dades, new Date(), llengua);

    const titol = bloc.querySelector<HTMLElement>('[data-data-avui]');
    if (titol) titol.textContent = r.data;

    const agenda = bloc.querySelector<HTMLElement>('[data-agenda-targetes]');
    if (agenda) {
      const plantilla = agenda.querySelector<HTMLElement>('[data-fet-agenda]');
      let disponibles = [...dades.activitats];
      const targetes: HTMLElement[] = [];
      for (let i = 0; i < (mode === 'avui' ? 1 : 6); i++) {
        const a = i === 0 ? r.agenda : composaResum({ ...dades, activitats: disponibles }, new Date(), llengua).agenda;
        if (i > 0 && a.tipus !== 'activitat') break;
        const targeta = plantilla ? plantilla.cloneNode(false) as HTMLElement : el('article', 'fet', undefined, { 'data-facana': 'ocre' });
        targeta.removeAttribute('data-fet-agenda');
        targeta.classList.remove('fet-amb-imatge');
        if (i === 0) targeta.setAttribute('data-fet-agenda', '');
      const fills: HTMLElement[] = a.etiqueta === 'Agenda' ? [] : [el('p', 'fet-etiqueta', a.etiqueta)];
      if (a.tipus === 'activitat') {
        const original = disponibles.find((activitat) => activitat.titol === a.titol && activitat.enllac === a.enllac);
        if (original?.imatge) {
          const imatge = el('img', 'fet-imatge', undefined, { src: original.imatge.src, alt: original.imatge.alt, loading: 'lazy', decoding: 'async', width: '800', height: '450' });
          fills.unshift(imatge);
          targeta.classList.add('fet-amb-imatge');
        }
        if (original && mode !== 'avui') {
          const avui = dataMadrid(new Date());
          const dia = original.inici <= avui && avui <= (original.fi ?? original.inici) ? avui : original.inici;
          const instant = new Date(`${dia}T12:00:00Z`);
          const data = el('time', 'fet-data', undefined, {
            datetime: dia,
            'aria-label': new Intl.DateTimeFormat(llengua, { dateStyle: 'full', timeZone: 'Europe/Madrid' }).format(instant),
          });
          data.append(
            el('span', 'fet-dia', String(Number(dia.slice(8)))),
            el('span', 'fet-mes', new Intl.DateTimeFormat(llengua, { month: 'short', timeZone: 'Europe/Madrid' }).format(instant).replace(/\.$/, '')),
          );
          fills.unshift(data);
        }
        if (a.nota) fills.push(el('p', 'fet-nota', a.nota));
        fills.push(a.enllac ? el('a', 'fet-titol', a.titol, { href: a.enllac, hreflang: 'ca' }) : el('p', 'fet-titol', a.titol));
        fills.push(el('p', 'fet-quan', a.quan));
        if (a.lloc) fills.push(el('p', 'fet-lloc', a.lloc));
        if (a.oficial) fills.push(el('a', 'accio', textos.agendaOficial, { href: 'https://www.suria.cat/agenda', hreflang: 'ca' }));
        fills.push(el('a', 'accio fet-accio', textos.veureAgenda, { href: mode === 'properes' ? (bloc.dataset.agendaUrl ?? '#h-setmana') : '#h-setmana' }));
      } else {
        fills.push(el('p', 'fet-avis', a.text));
        fills.push(el('a', 'accio', textos.agendaOficial, { href: 'https://www.suria.cat/agenda', hreflang: 'ca' }));
      }
        if (mode === 'avui' && a.tipus === 'activitat') {
          const imatge = fills.find((node) => node.tagName === 'IMG');
          const cos = el('div', 'fet-cos');
          cos.append(...fills.filter((node) => node !== imatge));
          targeta.replaceChildren(...(imatge ? [imatge, cos] : [cos]));
        } else if (mode === 'properes') {
          targeta.classList.remove('fet-amb-imatge');
          targeta.replaceChildren(...fills.filter((node) => node.classList.contains('fet-data')));
        } else {
          targeta.replaceChildren(...fills);
        }
        targetes.push(targeta);
        if (a.tipus !== 'activitat') break;
        disponibles = disponibles.filter((activitat) => activitat.titol !== a.titol || activitat.enllac !== a.enllac);
      }
      agenda.replaceChildren(...targetes);
      ajustaTargetes(agenda);
    }

    const farmacia = bloc.querySelector<HTMLElement>('[data-fet-farmacia]');
    if (farmacia) {
      const f = r.farmacia;
      // L'etiqueta és la capçalera fixa de la targeta.
      const fills: HTMLElement[] = [];
      if (f.tipus === 'torn') {
        fills.push(el('p', 'targeta-nom', f.nom));
        fills.push(el('p', 'targeta-adreca', f.adreca));
        const hora = el('p', 'targeta-hora');
        hora.append(icona('rellotge'), el('span', '', f.horari));
        fills.push(hora);
        const botons = el('div', 'targeta-botons');
        const trucar = el('a', 'boto boto-ple', undefined, { href: `tel:${f.telefon}`, 'aria-label': `${textos.trucar} ${telefonVisible(f.telefon)}` });
        trucar.append(icona('telefon'), el('span', '', textos.trucar), el('span', 'xifres', telefonVisible(f.telefon)));
        const desti = encodeURIComponent(`${f.nom}, ${f.adreca}, Súria`);
        const arribar = el('a', 'boto boto-buit boto-mapa', undefined, { href: `https://www.google.com/maps/dir/?api=1&destination=${desti}`, 'aria-label': textos.comArribar, title: textos.comArribar });
        arribar.append(icona('lloc'));
        botons.append(trucar, arribar);
        fills.push(botons);
      } else {
        fills.push(el('p', 'fet-avis', textos.senseVigent));
        fills.push(el('a', 'accio', textos.fontOficial, { href: textos.fontUrl, hreflang: 'ca' }));
      }
      farmacia.replaceChildren(...fills);
    }
  }
}

type TextosBus = {
  propera: string;
  minuts: string;
  despres: string;
  acabat: string;
  primer: string;
  senseConfirmar: string;
  festiu: string;
  festiuText: string;
};
const omple = (plantilla: string, vars: Record<string, string>) => plantilla.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? '');

function pintaBus() {
  for (const targeta of document.querySelectorAll<HTMLElement>('[data-bus]')) {
    const cos = targeta.querySelector<HTMLElement>('[data-bus-cos]');
    if (!cos) continue;
    const dades = JSON.parse(targeta.dataset.bus ?? '{}') as DadesBus;
    const x = JSON.parse(targeta.dataset.textosBus ?? '{}') as TextosBus;
    const llengua = document.documentElement.lang === 'es' ? 'es' : 'ca';
    const r = composaBus(dades, new Date(), llengua);
    if (r.festiu) {
      const avis = el('div', 'bus-festiu');
      avis.append(el('p', 'bus-fora', x.festiu), el('p', 'bus-despres', x.festiuText));
      cos.replaceChildren(avis);
      continue;
    }
    cos.replaceChildren(
      ...r.sentits.map((s) => {
        const bloc = el('div', 'bus-sentit');
        const info = el('div', 'bus-info');
        info.append(el('p', 'bus-etiqueta', s.etiqueta));
        bloc.append(info);
        if (s.estat === 'propers') {
          const linia = el('p', 'bus-hora');
          linia.append(el('span', 'xifres', s.propera));
          if (s.minuts !== undefined) linia.append(el('span', 'bus-minuts', omple(x.minuts, { n: String(s.minuts) })));
          bloc.append(linia);
          if (s.despres.length > 0) info.append(el('p', 'bus-despres', omple(x.despres, { hores: s.despres.join(' · ') })));
        } else if (s.estat === 'acabat') {
          bloc.append(el('p', 'bus-fora', x.acabat));
          bloc.append(el('p', 'bus-despres', s.primer ? omple(x.primer, { quan: s.primer }) : x.senseConfirmar));
        } else {
          bloc.append(el('p', 'bus-fora', x.festiu));
        }
        return bloc;
      }),
    );
  }
}

function tot() {
  pinta();
  pintaBus();
}

const observadorTargetes = new ResizeObserver((entries) => {
  entries.forEach(({ target }) => ajustaTargetes(target as HTMLElement));
});
document.querySelectorAll<HTMLElement>('[data-agenda-targetes], [data-targetes-fila]').forEach((agenda) => observadorTargetes.observe(agenda));

tot();
setInterval(tot, 60_000);
