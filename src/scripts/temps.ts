import { TEMPS_URL, REFRESC, llegeixTemps, condicio, iconesTemps, type MostraTemps } from '../lib/temps.ts';
const root = document.querySelector<HTMLElement>('[data-temps]');
if (root) {
  const es = root.dataset.llengua === 'es';
  const svg = root.querySelector<SVGElement>('[data-temps-icona]')!;
  const valor = root.querySelector<HTMLElement>('[data-temps-valor]')!;
  const noms = es
    ? { sol:'Despejado', nit:'Noche despejada', clarianes:'Parcialmente nuboso', clarianesNit:'Noche parcialmente nubosa', nuvols:'Nublado', boira:'Niebla', pluja:'Lluvia', neu:'Nieve', tempesta:'Tormenta', desconegut:'Tiempo' }
    : { sol:'Serè', nit:'Nit serena', clarianes:'Clarianes', clarianesNit:'Nit amb clarianes', nuvols:'Ennuvolat', boira:'Boira', pluja:'Pluja', neu:'Neu', tempesta:'Tempesta', desconegut:'Temps' };
  let mostra: MostraTemps | null = null;
  let rawActual: unknown = null;
  let properIntent = 0;
  let pendent = false;
  function pinta() {
    mostra = llegeixTemps(rawActual);
    if (!mostra) {
      valor.textContent = '— °C'; svg.replaceChildren(); root!.removeAttribute('data-condicio');
      const text = es ? 'Tiempo en Súria no disponible · MET Norway' : 'Temps a Súria no disponible · MET Norway';
      root!.setAttribute('aria-label', text); root!.title = text; return;
    }
    const tipus = condicio(mostra.simbol);
    // Només SVG locals; cap contingut rebut de l'API s'insereix com a HTML.
    svg.innerHTML = iconesTemps[tipus]; root!.dataset.condicio = tipus;
    const graus = `${Math.round(mostra.temperatura)} °C`;
    valor.textContent = graus;
    const hora = new Intl.DateTimeFormat(es ? 'es-ES' : 'ca-ES', { hour:'2-digit', minute:'2-digit', timeZone:'Europe/Madrid' }).format(mostra.actualitzat);
    const text = `${es ? 'Tiempo en Súria' : 'Temps a Súria'}: ${noms[tipus]}, ${graus}. MET Norway · ${es ? 'estimación actualizada' : 'estimació actualitzada'} ${hora}`;
    root!.setAttribute('aria-label', text); root!.title = text;
  }
  try {
    const cache = JSON.parse(sessionStorage.getItem('suria-temps-met-v2') ?? 'null');
    if (cache && typeof cache.savedAt === 'number' && cache.savedAt <= Date.now()) {
      rawActual = cache.raw;
      if (llegeixTemps(rawActual) && typeof cache.properIntent === 'number' && cache.properIntent <= Date.now() + 24 * 60 * 60_000) properIntent = cache.properIntent;
    }
  } catch { /* El temps funciona també sense emmagatzematge. */ }
  pinta();
  async function actualitza() {
    pinta();
    if (pendent || Date.now() < properIntent) return;
    pendent = true; properIntent = Date.now() + REFRESC;
    try {
      const resposta = await fetch(TEMPS_URL, { signal: AbortSignal.timeout(8000), credentials:'omit', referrerPolicy:'no-referrer', cache:'default' });
      if (!resposta.ok) throw new Error('temps');
      const raw: unknown = await resposta.json();
      const nova = llegeixTemps(raw);
      if (!nova) throw new Error('temps caducat o invàlid');
      rawActual = raw;
      const expires = Date.parse(resposta.headers.get('Expires') ?? '');
      // Respectem Expires; el navegador gestiona la validació HTTP sense capçalera custom/preflight.
      if (Number.isFinite(expires)) properIntent = Math.max(properIntent, expires + Math.random() * 30_000);
      try { sessionStorage.setItem('suria-temps-met-v2', JSON.stringify({ raw, savedAt: Date.now(), properIntent })); } catch { /* Opcional. */ }
    } catch { /* Es conserva una mostra recent; mai dades caducades com si fossin actuals. */ }
    finally { pendent = false; pinta(); }
  }
  void actualitza();
  setInterval(() => { pinta(); if (document.visibilityState === 'visible') void actualitza(); }, 60_000);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') void actualitza(); });
  window.addEventListener('pageshow', () => { void actualitza(); });
  window.addEventListener('online', () => { void actualitza(); });
}
