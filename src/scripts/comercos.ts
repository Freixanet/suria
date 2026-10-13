// E1: estat de cada negoci calculat amb l'hora actual de Súria, en carregar i cada minut (D4-9).
// Sense JavaScript, la pàgina ja diu «Sense confirmar» amb l'últim horari en text (D4-7).
import { estatServei, type Confirmacio } from '../lib/estat-servei.ts';
import { horaInstant } from '../lib/format.ts';

type Textos = Record<string, string>;

const omple = (plantilla: string, vars: Record<string, string>) =>
  plantilla.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? '');

function pinta(llista: HTMLElement) {
  const ll = llista.dataset.llengua === 'es' ? 'es' : 'ca';
  const textos: Textos = JSON.parse(llista.dataset.textos ?? '{}');
  for (const fitxa of llista.querySelectorAll<HTMLElement>('[data-confirmacions]')) {
    const confirmacions: Confirmacio[] = JSON.parse(fitxa.dataset.confirmacions ?? '[]');
    const estat = estatServei(confirmacions, new Date());
    const principal = fitxa.querySelector<HTMLElement>('[data-estat-principal]');
    const explicacio = fitxa.querySelector<HTMLElement>('[data-estat-explicacio]');
    const sensejs = fitxa.querySelector<HTMLElement>('[data-sense-js]');
    if (!principal || !explicacio) continue;
    if (sensejs) sensejs.hidden = true;
    fitxa.dataset.estat = estat.tipus;
    if (estat.tipus === 'sense-confirmar') {
      principal.textContent = textos.sense;
      explicacio.textContent = textos.senseExp;
    } else if (estat.tipus === 'cancelat') {
      principal.textContent = textos.cancelat;
      explicacio.textContent = omple(textos.cancelatExp, { rebut: horaInstant(estat.rebutA, ll) });
    } else {
      const vars = {
        inici: horaInstant(estat.inici, ll),
        fi: horaInstant(estat.fi, ll),
        rebut: horaInstant(estat.rebutA, ll),
      };
      if (estat.tipus === 'finalitzat') {
        principal.textContent = textos.finalitzat;
        explicacio.textContent = omple(textos.finalitzatExp, vars);
      } else {
        principal.textContent = omple(estat.tipus === 'durant' ? textos.durant : textos.abans, vars);
        explicacio.textContent = omple(textos.comunicatExp, vars);
      }
    }
  }
}

for (const llista of document.querySelectorAll<HTMLElement>('[data-comercos]')) {
  pinta(llista);
  setInterval(() => pinta(llista), 60_000);
}
