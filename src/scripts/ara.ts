// Omple «Avui a Súria» amb l'hora de Súria i el torna a calcular cada minut.
// Sense JavaScript queda el text de reserva, que no depèn de l'hora.
import { composaResum, type DadesAra } from '../lib/ara.ts';
import { telefonVisible } from '../lib/format.ts';

type Textos = { senseVigent: string; fontOficial: string; fontUrl: string; agendaOficial: string; veureAgenda: string };

function el<K extends keyof HTMLElementTagNameMap>(tag: K, classe: string, text?: string, attrs: Record<string, string> = {}) {
  const node = document.createElement(tag);
  node.className = classe;
  if (text !== undefined) node.textContent = text;
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

function pinta() {
  for (const bloc of document.querySelectorAll<HTMLElement>('[data-avui-resum]')) {
    const dades = JSON.parse(bloc.dataset.avuiResum ?? '{}') as DadesAra;
    const textos = JSON.parse(bloc.dataset.textos ?? '{}') as Textos;
    const llengua = bloc.dataset.llengua === 'es' ? 'es' : 'ca';
    const r = composaResum(dades, new Date(), llengua);

    const titol = bloc.querySelector<HTMLElement>('[data-salutacio]');
    if (titol) titol.textContent = `${r.salutacio} · ${r.data}`;

    const agenda = bloc.querySelector<HTMLElement>('[data-fet-agenda]');
    if (agenda) {
      const a = r.agenda;
      const fills: HTMLElement[] = [el('p', 'fet-etiqueta', a.etiqueta)];
      if (a.tipus === 'activitat') {
        if (a.nota) fills.push(el('p', 'fet-nota', a.nota));
        fills.push(el('p', 'fet-titol', a.titol));
        fills.push(el('p', 'fet-quan', a.quan));
        if (a.lloc) fills.push(el('p', 'fet-lloc', a.lloc));
        if (a.mes) fills.push(el('p', 'fet-nota', a.mes));
        fills.push(el('a', 'accio', textos.veureAgenda, { href: a.ancora }));
        if (a.oficial) fills.push(el('a', 'accio', textos.agendaOficial, { href: 'https://www.suria.cat/agenda', hreflang: 'ca' }));
      } else {
        fills.push(el('p', 'fet-avis', a.text));
        fills.push(el('a', 'accio', textos.agendaOficial, { href: 'https://www.suria.cat/agenda', hreflang: 'ca' }));
      }
      agenda.replaceChildren(...fills);
    }

    const farmacia = bloc.querySelector<HTMLElement>('[data-fet-farmacia]');
    if (farmacia) {
      const f = r.farmacia;
      const fills: HTMLElement[] = [el('p', 'fet-etiqueta', f.etiqueta)];
      if (f.tipus === 'torn') {
        fills.push(el('p', 'fet-titol', f.nom));
        fills.push(el('p', 'fet-quan', f.fins));
        fills.push(el('p', 'fet-lloc', f.adreca));
        const trucar = el('a', 'accio', undefined, { href: `tel:${f.telefon}` });
        const text = el('span', '', `${f.nom.replace(/^Farmàcia /, '')}: `);
        text.append(el('span', 'xifres', telefonVisible(f.telefon)));
        trucar.append(text);
        fills.push(trucar);
      } else {
        fills.push(el('p', 'fet-avis', textos.senseVigent));
        fills.push(el('a', 'accio', textos.fontOficial, { href: textos.fontUrl, hreflang: 'ca' }));
      }
      farmacia.replaceChildren(...fills);
    }
  }
}

pinta();
setInterval(pinta, 60_000);
