// Comunitat: publicar, respondre i veure les publicacions pròpies (desades al dispositiu en el prototip).
import { get, update } from './store.ts';
import { avisa, calEntrar, dades, esc } from './ui.ts';
import { svg } from '../icons.ts';

function targeta(p: { id: string; canal: string; text: string }, nomCanal: string, f: string): HTMLElement {
  const u = get().usuari!;
  const { t, lang } = dades();
  const el = document.createElement('article');
  el.className = 'post post--new';
  el.dataset.item = '';
  el.dataset.canal = `${p.canal} tot`;
  el.innerHTML = `
    <header class="post__head">
      <span class="avatar" data-f="${esc(u.facana)}">${esc(u.inicials)}</span>
      <div class="post__who"><strong>${esc(u.nom)}</strong><span class="muted small">${esc(t.araMateix)}</span></div>
      <span class="tag" data-f="${esc(f)}">${esc(nomCanal)}</span>
    </header>
    <p class="post__text">${esc(p.text).replace(/\n/g, '<br>')}</p>
    <footer class="post__foot">
      <span class="small muted">${lang === 'ca' ? 'Publicat des d’aquest dispositiu' : 'Publicado desde este dispositivo'}</span>
      <button class="btn btn--s btn--ghost" data-del-post="${esc(p.id)}">${svg('close', 'i-s')}${lang === 'ca' ? 'Esborra' : 'Borra'}</button>
    </footer>`;
  return el;
}

export function iniciaComunitat() {
  const feed = document.querySelector<HTMLElement>('[data-feed]');
  const form = document.querySelector<HTMLFormElement>('[data-post-form]');
  if (!feed) return;
  const canals: Record<string, { nom: string; f: string }> = JSON.parse(feed.dataset.canals ?? '{}');
  const { t, lang } = dades();

  // Publicacions pròpies
  feed.querySelectorAll('.post--new').forEach((n) => n.remove());
  const primer = feed.querySelector('[data-item]');
  if (get().usuari) {
    for (const p of [...get().posts].reverse()) {
      const c = canals[p.canal] ?? { nom: p.canal, f: 'pissarra' };
      feed.insertBefore(targeta(p, c.nom, c.f), feed.querySelector('.post--new') ?? primer);
    }
  }

  feed.onclick = (ev) => {
    const b = (ev.target as HTMLElement).closest<HTMLButtonElement>('button');
    if (!b) return;
    if (b.dataset.delPost) {
      update((e) => { e.posts = e.posts.filter((p) => p.id !== b.dataset.delPost); });
      b.closest('article')?.remove();
      return;
    }
    if (b.dataset.reply !== undefined) {
      if (calEntrar()) return;
      const art = b.closest('article')!;
      let caixa = art.querySelector<HTMLFormElement>('.reply');
      if (!caixa) {
        caixa = document.createElement('form');
        caixa.className = 'reply';
        caixa.innerHTML = `<span class="avatar avatar--s" data-f="${esc(get().usuari!.facana)}">${esc(get().usuari!.inicials)}</span>
          <label class="sr" for="r-${b.dataset.reply}">${lang === 'ca' ? 'Resposta' : 'Respuesta'}</label>
          <input class="input" id="r-${b.dataset.reply}" placeholder="${lang === 'ca' ? 'Escriu una resposta amable…' : 'Escribe una respuesta amable…'}" autocomplete="off" />
          <button class="iconbtn iconbtn--filled" aria-label="${lang === 'ca' ? 'Envia' : 'Envía'}">${svg('arrowUp', 'i-s')}</button>`;
        art.querySelector('.post__replies')?.after(caixa) ?? art.append(caixa);
        caixa.onsubmit = (e) => {
          e.preventDefault();
          const inp = caixa!.querySelector('input')!;
          if (!inp.value.trim()) return;
          const u = get().usuari!;
          const li = document.createElement('li');
          li.className = 'reply-item';
          li.innerHTML = `<span class="avatar avatar--s" data-f="${esc(u.facana)}">${esc(u.inicials)}</span><p><strong>${esc(u.nom.split(' ')[0])}</strong> ${esc(inp.value)}</p>`;
          let ul = art.querySelector('.post__replies ul');
          if (!ul) {
            const w = document.createElement('div');
            w.className = 'post__replies';
            w.innerHTML = '<ul></ul>';
            caixa!.before(w);
            ul = w.querySelector('ul');
          }
          ul!.append(li);
          inp.value = '';
          avisa(t.publicat);
        };
      }
      caixa.querySelector('input')!.focus();
    }
  };

  if (form) {
    const text = form.querySelector<HTMLTextAreaElement>('textarea')!;
    const comptador = form.querySelector<HTMLElement>('[data-count]');
    const boto = form.querySelector<HTMLButtonElement>('[type="submit"]')!;
    const pinta = () => {
      if (comptador) comptador.textContent = `${text.value.length}/600`;
      boto.disabled = text.value.trim().length < 3;
    };
    text.oninput = pinta;
    pinta();
    form.onsubmit = (ev) => {
      ev.preventDefault();
      if (calEntrar()) return;
      const canal = (form.querySelector<HTMLInputElement>('input[name="canal"]:checked')?.value) ?? 'preguntes';
      const p = { id: Math.random().toString(36).slice(2, 9), canal, text: text.value.trim().slice(0, 600), quan: Date.now() };
      update((e) => { e.posts.push(p); });
      const c = canals[canal] ?? { nom: canal, f: 'pissarra' };
      const el = targeta(p, c.nom, c.f);
      feed.insertBefore(el, feed.querySelector('[data-item]'));
      text.value = '';
      pinta();
      (form.closest('dialog') as HTMLDialogElement | null)?.close();
      document.querySelectorAll<HTMLButtonElement>('[data-filters="feed"] [data-group="canal"]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.value === 'tot')));
      document.querySelectorAll<HTMLElement>('#feed [data-item]').forEach((n) => (n.hidden = false));
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      avisa(t.publicat);
    };
    // Canal preseleccionat des d'un botó («Pregunta», «Dono un cop de mà»…)
    document.querySelectorAll<HTMLElement>('[data-open="publicar"][data-canal]').forEach((b) => b.addEventListener('click', () => {
      const r = form.querySelector<HTMLInputElement>(`input[name="canal"][value="${b.dataset.canal}"]`);
      if (r) r.checked = true;
      if (b.dataset.prompt) text.placeholder = b.dataset.prompt;
      setTimeout(() => text.focus(), 50);
    }));
  }
}
