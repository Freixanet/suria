// Escriu la frase «Ara a Súria» amb l'hora de Súria i la torna a calcular cada minut.
// Sense JavaScript queda el text de reserva (que no depèn de l'hora).
import { composaAra, type DadesAra } from '../lib/ara.ts';

function pinta() {
  for (const el of document.querySelectorAll<HTMLElement>('[data-ara]')) {
    const dades = JSON.parse(el.dataset.ara ?? '{}') as DadesAra;
    const enllacos = JSON.parse(el.dataset.enllacos ?? '{}') as Record<string, string>;
    const llengua = el.dataset.llengua === 'es' ? 'es' : 'ca';
    const { moment, trossos } = composaAra(dades, new Date(), llengua);
    const nous = trossos.flatMap((tros, i) => {
      const node = tros.enllac ? Object.assign(document.createElement('a'), { href: enllacos[tros.enllac] }) : document.createElement('span');
      node.textContent = tros.text;
      if (tros.enllac?.endsWith('oficial')) node.setAttribute('hreflang', 'ca');
      return i === 0 ? [node] : [document.createTextNode(' '), node];
    });
    el.replaceChildren(...nous);
    el.closest<HTMLElement>('[data-moment]')?.setAttribute('data-moment', moment);
  }
}

pinta();
setInterval(pinta, 60_000);
