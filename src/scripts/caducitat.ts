// Vigència explícita: quan una peça deixa de valer, la pàgina ho diu sense haver de publicar de nou.
// Cada element amb data-caduca="<instant ISO>" rep data-caducat i mostra el seu avís [data-avis-caducat].
import { dataMadrid } from '../lib/hora-local.ts';

function revisa() {
  const avui = dataMadrid(new Date());
  for (const activitat of document.querySelectorAll<HTMLElement>('[data-ultim-dia]')) {
    activitat.hidden = (activitat.dataset.ultimDia ?? '') < avui;
  }
  for (const agenda of document.querySelectorAll<HTMLElement>('.agenda')) {
    const avis = agenda.querySelector<HTMLElement>('[data-agenda-esgotada]');
    if (avis) avis.hidden = !!agenda.querySelector('[data-ultim-dia]:not([hidden])') || Date.now() >= Date.parse(agenda.dataset.caduca ?? '');
  }
  const ara = Date.now();
  for (const el of document.querySelectorAll<HTMLElement>('[data-caduca]')) {
    const caduca = Date.parse(el.dataset.caduca ?? '');
    if (Number.isNaN(caduca) || ara < caduca) continue;
    el.dataset.caducat = '';
    const avis = el.querySelector<HTMLElement>(':scope > [data-avis-caducat], :scope [data-avis-caducat]');
    if (avis) avis.hidden = false;
  }
}
revisa();
setInterval(revisa, 60_000);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') revisa(); });
window.addEventListener('pageshow', revisa);
