// Vigència explícita: quan una peça deixa de valer, la pàgina ho diu sense haver de publicar de nou.
// Cada element amb data-caduca="<instant ISO>" rep data-caducat i mostra el seu avís [data-avis-caducat].
function revisa() {
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
