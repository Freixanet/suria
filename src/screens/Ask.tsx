import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Icon } from '../components/Icon';
import { getProvider, type Action, type Source } from '../lib/assistant';
import { useLang, useT } from '../lib/i18n';
import { getState, setState, uid, useStore, type Chat, type ChatMsg } from '../lib/store';
import { toast } from '../lib/ui';

/** Markdown mínim i segur: **negreta**, llistes «- » i «1. », paràgrafs. */
function Rich({ text, typing }: { text: string; typing?: boolean }) {
  const blocks: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  const inline = (s: string, k: string) => s.split(/(\*\*[^*]+\*\*)/g).map((p, i) => (p.startsWith('**') ? <strong key={`${k}-${i}`}>{p.slice(2, -2)}</strong> : <Fragment key={`${k}-${i}`}>{p}</Fragment>));
  const flush = () => {
    if (!list) return;
    const L = list;
    blocks.push(L.ordered
      ? <ol key={blocks.length}>{L.items.map((x, i) => <li key={i}>{inline(x, `o${i}`)}</li>)}</ol>
      : <ul key={blocks.length}>{L.items.map((x, i) => <li key={i}>{inline(x, `u${i}`)}</li>)}</ul>);
    list = null;
  };
  text.split('\n').forEach((line, i) => {
    const ul = line.match(/^- (.*)/);
    const ol = line.match(/^\d+\. (.*)/);
    if (ul || ol) {
      const ordered = !!ol;
      if (!list || list.ordered !== ordered) { flush(); list = { ordered, items: [] }; }
      list.items.push((ul ?? ol)![1]);
    } else {
      flush();
      if (line.trim()) blocks.push(<p key={`p${i}`}>{inline(line, `p${i}`)}</p>);
    }
  });
  flush();
  return <div className="msg__rich">{blocks}{typing && <span className="caret" aria-hidden="true" />}</div>;
}

/** sessionStorage pot no estar disponible (navegació privada, iframes): mai ha de trencar el xat. */
const ss = {
  get: (k: string) => { try { return sessionStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { sessionStorage.setItem(k, v); } catch { /* opcional */ } },
  del: (k: string) => { try { sessionStorage.removeItem(k); } catch { /* opcional */ } },
};

const titleOf = (s: string) => (s.length > 52 ? s.slice(0, 50).trimEnd() + '…' : s);

export default function Ask() {
  const t = useT();
  const lang = useLang();
  const [params, setParams] = useSearchParams();
  const chats = useStore((s) => s.chats);
  const [chatId, setChatId] = useState<string | null>(() => ss.get('suria:xat'));
  const chat = chats.find((c) => c.id === chatId) ?? null;
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [live, setLive] = useState<{ text: string; sources: Source[]; actions: Action[] } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [listening, setListening] = useState(false);
  const [history, setHistory] = useState(false);
  const [votes, setVotes] = useState<Record<number, 'up' | 'down'>>({});
  const ctrl = useRef<AbortController | null>(null);
  const box = useRef<HTMLTextAreaElement>(null);
  const fileIn = useRef<HTMLInputElement>(null);
  const rec = useRef<{ stop(): void } | null>(null);
  const end = useRef<HTMLDivElement>(null);
  const provider = getProvider();

  const save = (c: Chat) => {
    setState((s) => ({ ...s, chats: [c, ...s.chats.filter((x) => x.id !== c.id)].slice(0, 40) }));
    ss.set('suria:xat', c.id);
    setChatId(c.id);
  };
  const scroll = () => requestAnimationFrame(() => end.current?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'end' }));

  async function run(base: Chat, question: string) {
    setBusy(true);
    setLive({ text: '', sources: [], actions: [] });
    ctrl.current = new AbortController();
    let text = '';
    let sources: Source[] = [];
    let actions: Action[] = [];
    try {
      const turns = base.msgs.map((m) => ({ role: m.role, text: m.text }));
      for await (const ch of provider.stream(turns, question, lang, ctrl.current.signal)) {
        if (ch.text) text += ch.text;
        if (ch.sources) sources = ch.sources;
        if (ch.actions) actions = ch.actions;
        setLive({ text, sources, actions });
        scroll();
      }
    } catch (e) {
      text ||= (e as Error).name === 'AbortError' ? t('(Resposta aturada)', '(Respuesta detenida)') : t('No he pogut respondre. Torna-ho a provar.', 'No he podido responder. Vuelve a intentarlo.');
    }
    const msg: ChatMsg = { role: 'ai', text, sources, actions: actions.map((a) => ({ label: a.label, to: a.to })), at: Date.now() };
    const latest = getState().chats.find((c) => c.id === base.id) ?? base;
    save({ ...latest, msgs: [...latest.msgs, msg], at: Date.now() });
    setLive(null);
    setBusy(false);
    ctrl.current = null;
    scroll();
  }

  function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const shown = file ? `${q}\n📎 ${file.name}` : q;
    const base: Chat = chat ?? { id: uid(), title: titleOf(q), msgs: [], at: Date.now() };
    const next = { ...base, msgs: [...base.msgs, { role: 'user' as const, text: shown, at: Date.now() }], at: Date.now() };
    save(next);
    setDraft('');
    setFile(null);
    scroll();
    void run(next, q);
  }

  function regenerate() {
    if (!chat || busy) return;
    const lastUser = [...chat.msgs].reverse().find((m) => m.role === 'user');
    if (!lastUser) return;
    const idx = chat.msgs.lastIndexOf(lastUser);
    const trimmed = { ...chat, msgs: chat.msgs.slice(0, idx + 1) };
    save(trimmed);
    void run(trimmed, lastUser.text.split('\n📎')[0]);
  }

  function newChat() {
    ctrl.current?.abort();
    ss.del('suria:xat');
    setChatId(null);
    setLive(null);
    setVotes({});
    box.current?.focus();
  }

  // Pregunta que arriba des d'una altra pantalla (?q=)
  const asked = useRef(false);
  useEffect(() => {
    const q = params.get('q');
    if (q && !asked.current) {
      asked.current = true;
      setParams({}, { replace: true });
      ss.del('suria:xat');
      setChatId(null);
      setTimeout(() => {
        const base: Chat = { id: uid(), title: titleOf(q), msgs: [{ role: 'user', text: q, at: Date.now() }], at: Date.now() };
        save(base);
        void run(base, q);
      }, 0);
    } else if (chat?.msgs.length) scroll();
    return () => ctrl.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
  }, [draft]);

  function dictate() {
    type SR = { new (): { lang: string; interimResults: boolean; onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void; onend: () => void; onerror: () => void; start(): void; stop(): void } };
    const w = window as unknown as { SpeechRecognition?: SR; webkitSpeechRecognition?: SR };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Ctor) { toast(t('Aquest navegador no permet dictar', 'Este navegador no permite dictar')); return; }
    if (rec.current) { rec.current.stop(); return; }
    const r = new Ctor();
    r.lang = lang === 'ca' ? 'ca-ES' : 'es-ES';
    r.interimResults = true;
    const before = draft ? draft.trimEnd() + ' ' : '';
    r.onresult = (e) => setDraft(before + Array.from(e.results).map((x) => x[0].transcript).join(''));
    r.onend = r.onerror = () => { rec.current = null; setListening(false); box.current?.focus(); };
    rec.current = r;
    setListening(true);
    r.start();
  }

  const suggestions = [
    { icon: 'Bus', tone: 'accent', text: t('Quan surt el pròxim bus a Manresa?', '¿Cuándo sale el próximo bus a Manresa?') },
    { icon: 'House', tone: 'sky', text: t('Com m’empadrono?', '¿Cómo me empadrono?') },
    { icon: 'CalendarDays', tone: 'sun', text: t('Què faig aquest cap de setmana?', '¿Qué hago este fin de semana?') },
    { icon: 'UtensilsCrossed', tone: 'coral', text: t('On puc sopar avui?', '¿Dónde puedo cenar hoy?') },
    { icon: 'Recycle', tone: 'mint', text: t('On llenço un matalàs vell?', '¿Dónde tiro un colchón viejo?') },
    { icon: 'Hand', tone: 'lilac', text: t('Acabo d’arribar. Per on començo?', 'Acabo de llegar. ¿Por dónde empiezo?') },
  ];
  const msgs = chat?.msgs ?? [];
  const empty = msgs.length === 0 && !live;
  const lastAi = msgs.map((m) => m.role).lastIndexOf('ai');

  return (
    <div className="chat" data-busy={busy || undefined}>
      <div className="chat__tools">
        <button className="btn btn--sm btn--soft" onClick={() => setHistory(true)}><Icon name="MessagesSquare" size={16} />{t('Converses', 'Conversaciones')}</button>
        {!empty && <button className="btn btn--sm btn--soft" onClick={newChat}><Icon name="SquarePen" size={16} />{t('Nova', 'Nueva')}</button>}
      </div>

      <div className="chat__scroll">
        {empty ? (
          <div className="chat__empty">
            <motion.div className="orb" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }} aria-hidden="true"><Icon name="Sparkles" size={34} /></motion.div>
            <h1 className="h1 chat__title">{t('Què vols saber', '¿Qué quieres saber')} <em>{t('de Súria?', 'de Súria?')}</em></h1>
            <p className="muted chat__intro">{t('Pregunta com ho faries a un veí, escrivint o parlant. Et respondré amb el que sap el poble i et diré d’on ho trec.', 'Pregunta como lo harías a un vecino, escribiendo o hablando. Te responderé con lo que sabe el pueblo y te diré de dónde lo saco.')}</p>
            <span className="status"><span className="status__dot" />{provider.connected ? t('Connectat', 'Conectado') : t('Mode demostració · el model d’IA encara no està connectat', 'Modo demostración · el modelo de IA aún no está conectado')}</span>
            <div className="suggest">
              {suggestions.map((s, i) => (
                <motion.button key={s.text} type="button" onClick={() => send(s.text)} data-tone={s.tone} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                  <span className="row__ico"><Icon name={s.icon} size={18} /></span>{s.text}
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div className="chat__log" role="log" aria-live="polite" aria-label={t('Conversa', 'Conversación')}>
            {msgs.map((m, i) => (m.role === 'user' ? (
              <motion.div key={i} className="msg msg--me" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><div className="msg__bubble">{m.text}</div></motion.div>
            ) : (
              <div key={i} className="msg msg--ai">
                <div className="msg__who"><span className="msg__av"><Icon name="Sparkles" size={14} /></span>Súria</div>
                <Rich text={m.text} />
                <Extras sources={m.sources ?? []} actions={m.actions ?? []} />
                <div className="msg__tools">
                  <button className="icon-btn" aria-label={t('Copia', 'Copia')} onClick={async () => { try { await navigator.clipboard.writeText(m.text); toast(t('Copiat', 'Copiado')); } catch { /* sense porta-retalls */ } }}><Icon name="Copy" size={17} /></button>
                  <button className="icon-btn" aria-pressed={votes[i] === 'up'} aria-label={t('Útil', 'Útil')} onClick={() => { setVotes({ ...votes, [i]: 'up' }); toast(t('Gràcies per dir-ho', 'Gracias por decirlo')); }}><Icon name="ThumbsUp" size={17} /></button>
                  <button className="icon-btn" aria-pressed={votes[i] === 'down'} aria-label={t('Poc útil', 'Poco útil')} onClick={() => { setVotes({ ...votes, [i]: 'down' }); toast(t('Ho revisarem', 'Lo revisaremos')); }}><Icon name="ThumbsDown" size={17} /></button>
                  {i === lastAi && !busy && <button className="icon-btn" aria-label={t('Torna a respondre', 'Vuelve a responder')} onClick={regenerate}><Icon name="RotateCcw" size={17} /></button>}
                </div>
              </div>
            )))}
            {live && (
              <div className="msg msg--ai">
                <div className="msg__who"><span className="msg__av msg__av--live"><Icon name="Sparkles" size={14} /></span>Súria</div>
                {live.text ? <Rich text={live.text} typing /> : <span className="thinking" aria-label={t('Pensant', 'Pensando')}><i /><i /><i /></span>}
                <Extras sources={live.sources} actions={live.actions} />
              </div>
            )}
            <div ref={end} />
          </div>
        )}
      </div>

      <div className="dock">
        <form className="composer" onSubmit={(e) => { e.preventDefault(); if (busy) ctrl.current?.abort(); else send(draft); }}>
          {file && (
            <span className="attach"><Icon name="Paperclip" size={14} /><span>{file.name}</span><button type="button" onClick={() => setFile(null)} aria-label={t('Treu l’adjunt', 'Quita el adjunto')}><Icon name="X" size={14} /></button></span>
          )}
          <label className="sr-only" htmlFor="ask">{t('Escriu la teva pregunta', 'Escribe tu pregunta')}</label>
          <textarea
            id="ask" ref={box} data-ask-input rows={1} value={draft} onChange={(e) => setDraft(e.target.value)} enterKeyHint="send"
            placeholder={listening ? t('T’escolto…', 'Te escucho…') : t('Pregunta el que vulguis sobre Súria…', 'Pregunta lo que quieras sobre Súria…')}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); send(draft); } }}
          />
          <div className="composer__bar">
            <button type="button" className="icon-btn" onClick={() => fileIn.current?.click()} aria-label={t('Adjunta una foto o un document', 'Adjunta una foto o un documento')}><Icon name="Plus" size={20} /></button>
            <input ref={fileIn} type="file" accept="image/*,.pdf" hidden onChange={(e) => { setFile(e.target.files?.[0] ?? null); e.target.value = ''; }} />
            <button type="button" className={`icon-btn ${listening ? 'is-on' : ''}`} onClick={dictate} aria-pressed={listening} aria-label={t('Dicta amb la veu', 'Dicta con la voz')}><Icon name="Mic" size={20} /></button>
            <span className="composer__hint">{t('Retorn per enviar · Maj+Retorn per a línia nova', 'Intro para enviar · Mayús+Intro para nueva línea')}</span>
            <button className="send" disabled={!busy && !draft.trim()} aria-label={busy ? t('Atura', 'Detén') : t('Envia', 'Envía')}>
              <Icon name={busy ? 'Square' : 'ArrowUp'} size={busy ? 14 : 20} fill={busy ? 'currentColor' : 'none'} />
            </button>
          </div>
        </form>
        <p className="disclaimer">{t('Pot equivocar-se. Comprova les dades importants a la font oficial.', 'Puede equivocarse. Comprueba los datos importantes en la fuente oficial.')}</p>
      </div>

      <AnimatePresence>
        {history && (
          <>
            <motion.div className="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setHistory(false)} />
            <motion.div className="sheet" role="dialog" aria-modal="true" aria-labelledby="hist-t" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}>
              <div className="sheet__grab" />
              <div className="sheet__head">
                <h2 className="h2" id="hist-t">{t('Converses', 'Conversaciones')}</h2>
                <button className="icon-btn" onClick={() => setHistory(false)} aria-label={t('Tanca', 'Cierra')} autoFocus><Icon name="X" /></button>
              </div>
              <button className="btn btn--accent btn--block" onClick={() => { newChat(); setHistory(false); }}><Icon name="SquarePen" size={18} />{t('Conversa nova', 'Conversación nueva')}</button>
              <div className="list" style={{ marginTop: '.75rem' }}>
                {chats.length === 0 && <p className="muted" style={{ padding: '1rem 0' }}>{t('Encara no hi ha converses.', 'Todavía no hay conversaciones.')}</p>}
                {chats.map((c) => (
                  <div key={c.id} className="row" style={{ gap: '.25rem' }}>
                    <button className="row__body" style={{ border: 0, background: 'none', textAlign: 'left', padding: 0 }} onClick={() => { setChatId(c.id); ss.set('suria:xat', c.id); setHistory(false); scroll(); }}>
                      <span className="row__title">{c.title}</span>
                      <span className="row__sub">{new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(c.at)} · {c.msgs.length} {t('missatges', 'mensajes')}</span>
                    </button>
                    <button className="icon-btn" aria-label={t('Esborra', 'Borra')} onClick={() => { setState((s) => ({ ...s, chats: s.chats.filter((x) => x.id !== c.id) })); if (c.id === chatId) newChat(); }}><Icon name="Trash2" size={18} /></button>
                  </div>
                ))}
              </div>
              <p className="hint" style={{ marginTop: '1rem', display: 'flex', gap: '.5rem', alignItems: 'center' }}><Icon name="Lock" size={14} />{t('Les converses només es guarden en aquest dispositiu.', 'Las conversaciones solo se guardan en este dispositivo.')}</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function Extras({ sources, actions }: { sources: Source[]; actions: Action[] }) {
  const t = useT();
  if (!sources.length && !actions.length) return null;
  return (
    <div className="msg__extras">
      {actions.length > 0 && (
        <div className="msg__actions">
          {actions.map((a) => (a.to.startsWith('tel:') || a.to.startsWith('http')
            ? <a key={a.to} className="btn btn--sm btn--accent" href={a.to}>{a.label}<Icon name="ArrowRight" size={16} /></a>
            : <Link key={a.to} className="btn btn--sm btn--soft" to={a.to}>{a.label}<Icon name="ArrowRight" size={16} /></Link>))}
        </div>
      )}
      {sources.length > 0 && (
        <div className="msg__sources"><span className="eyebrow">{t('Fonts', 'Fuentes')}</span>
          {sources.map((s, i) => <a key={s.url} className="source" href={s.url} target="_blank" rel="noopener"><b>{i + 1}</b>{s.title}</a>)}
        </div>
      )}
    </div>
  );
}
