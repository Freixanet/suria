import { useState } from 'react';
import { Link } from 'react-router';
import { Icon } from './Icon';
import { Avatar, Faces } from './Bits';
import { channels, eventCats, shopKinds, type EventItem, type Post, type Shop } from '../lib/demo';
import { dayLabel, pick, timeRange, useLang, useT } from '../lib/i18n';
import { toggle, useStore, uid } from '../lib/store';
import { haptic, needsSignIn, toast } from '../lib/ui';
import { dateOf, openState } from '../lib/when';

/** Botó «Hi vaig»: demana compte si cal, compta i avisa. */
export function GoingButton({ id, size = 'sm', block }: { id: string; size?: 'sm' | 'lg'; block?: boolean }) {
  const t = useT();
  const on = useStore((s) => !!s.going[id]);
  return (
    <button
      className={`btn btn--toggle ${on ? '' : 'btn--accent'} ${size === 'lg' ? 'btn--lg' : 'btn--sm'} ${block ? 'btn--block' : ''} above`}
      aria-pressed={on}
      onClick={(e) => {
        e.preventDefault();
        if (needsSignIn()) return;
        const now = toggle('going', id);
        haptic();
        toast(now ? t('Apuntat! Te’n recordarem el dia abans.', '¡Apuntado! Te lo recordaremos el día antes.') : t('Ja no hi vas.', 'Ya no vas.'));
      }}
    >
      <Icon name={on ? 'Check' : 'Plus'} size={18} />
      {on ? t('Hi vas', 'Vas') : t('Hi vaig', 'Voy')}
    </button>
  );
}

export function useGoingCount(e: EventItem) {
  return useStore((s) => e.going + (s.going[e.id] ? 1 : 0));
}

export function EventCard({ e, showDay = true, variant = 'tile' }: { e: EventItem; showDay?: boolean; variant?: 'tile' | 'row' }) {
  const t = useT();
  const lang = useLang();
  const cat = eventCats[e.cat];
  const count = useGoingCount(e);
  const d = dateOf(e);
  return (
    <article className={`ev ev--${variant}`} data-tone={cat.tone}>
      <div className="ev__date" aria-hidden="true">
        <span className="ev__dow">{showDay ? dayLabel(d, lang).split(' ')[0] : ''}</span>
        <span className="ev__time num">{timeRange(e.start, undefined, lang).replace(' h', '')}</span>
      </div>
      <div className="ev__body">
        <div className="ev__meta">
          <span className="tag"><Icon name={cat.icon} size={14} />{pick(cat.label, lang)}</span>
          {e.firstTime && <span className="tag tag--plain" title={t('Ideal per anar-hi per primera vegada', 'Ideal para ir por primera vez')}><Icon name="Hand" size={14} />{t('1a vegada', '1ª vez')}</span>}
        </div>
        <h3 className="ev__title"><Link to={`/agenda/${e.id}`} className="stretch">{pick(e.title, lang)}</Link></h3>
        <p className="ev__where"><span className="sr-only">{dayLabel(d, lang)}, {timeRange(e.start, e.end, lang)}. </span><Icon name="MapPin" size={15} />{pick(e.place, lang)}</p>
        <div className="ev__foot">
          <span className="ev__count"><Faces list={[['RM', 'coral'], ['PG', 'sun'], ['IV', 'sky']]} /><b className="num">{count}</b> {t('hi van', 'van')}</span>
          <GoingButton id={e.id} />
        </div>
      </div>
    </article>
  );
}

export function PostCard({ p, compact }: { p: Post; compact?: boolean }) {
  const t = useT();
  const lang = useLang();
  const ch = channels[p.channel];
  const thanked = useStore((s) => !!s.thanks[p.id]);
  const user = useStore((s) => s.user);
  const [replies, setReplies] = useState(p.replies);
  const [replying, setReplying] = useState(false);
  const [draft, setDraft] = useState('');
  const shown = compact ? replies.slice(0, 1) : replies;
  return (
    <article className={`post ${compact ? 'post--compact' : ''}`}>
      <header className="post__head">
        <Avatar initials={p.initials} tone={p.tone} />
        <div className="post__who">
          <strong>{p.author}</strong>
          <span className="xs muted">{p.badge && <span className="post__badge">{pick(p.badge, lang)} · </span>}{agoLabel(p.mins, lang)}</span>
        </div>
        <span className="tag" data-tone={ch.tone}><Icon name={ch.icon} size={14} />{pick(ch.label, lang)}</span>
      </header>
      <p className="post__text">{p.text}</p>
      {shown.length > 0 && (
        <ul className="post__replies">
          {shown.map((r, i) => (
            <li key={i}><Avatar initials={r.initials} tone={r.tone} size="sm" /><p><strong>{r.author.split(' ')[0]}</strong> {r.text}</p></li>
          ))}
        </ul>
      )}
      {replying && (
        <form className="reply" onSubmit={(ev) => {
          ev.preventDefault();
          if (!draft.trim() || !user) return;
          setReplies([...replies, { author: user.name, initials: user.initials, tone: user.tone as never, text: draft.trim() }]);
          setDraft(''); setReplying(false);
          toast(t('Resposta publicada', 'Respuesta publicada'));
        }}>
          <label className="sr-only" htmlFor={`r-${p.id}`}>{t('Resposta', 'Respuesta')}</label>
          <input id={`r-${p.id}`} className="input" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={t('Escriu una resposta amable…', 'Escribe una respuesta amable…')} autoFocus />
          <button className="icon-btn send-mini" aria-label={t('Envia', 'Envía')} disabled={!draft.trim()}><Icon name="ArrowUp" size={18} /></button>
        </form>
      )}
      <footer className="post__foot">
        <button className={`btn btn--sm ${thanked ? 'btn--tone' : 'btn--soft'}`} data-tone="coral" aria-pressed={thanked} onClick={() => { if (needsSignIn()) return; toggle('thanks', p.id); haptic(); }}>
          <Icon name="Heart" size={16} fill={thanked ? 'currentColor' : 'none'} />{t('Gràcies', 'Gracias')} <b className="num">{p.thanks + (thanked ? 1 : 0)}</b>
        </button>
        {!compact && <button className="btn btn--sm btn--line" onClick={() => { if (needsSignIn()) return; setReplying((r) => !r); }}><Icon name="MessageCircle" size={16} />{t('Respon', 'Responde')}</button>}
        {compact && p.replies.length > 0 && <span className="xs muted">{p.replies.length} {p.replies.length === 1 ? t('resposta', 'respuesta') : t('respostes', 'respuestas')}</span>}
        {p.solved && <span className="tag tag--ok" style={{ marginLeft: 'auto' }}>{t('Resolt', 'Resuelto')}</span>}
      </footer>
    </article>
  );
}

function agoLabel(mins: number, lang: 'ca' | 'es') {
  if (mins < 60) return lang === 'ca' ? `fa ${mins} min` : `hace ${mins} min`;
  const h = Math.round(mins / 60);
  if (h < 24) return lang === 'ca' ? `fa ${h} h` : `hace ${h} h`;
  const d = Math.round(h / 24);
  return d === 1 ? (lang === 'ca' ? 'ahir' : 'ayer') : lang === 'ca' ? `fa ${d} dies` : `hace ${d} días`;
}
export { agoLabel };

export function ShopCard({ s }: { s: Shop }) {
  const t = useT();
  const lang = useLang();
  const st = openState(s.hours, lang);
  const kind = shopKinds[s.kind];
  return (
    <article className="shop" data-tone={s.tone}>
      <div className="shop__front" aria-hidden="true">
        <Icon name={kind.icon} size={26} />
        <span className="shop__awning" />
      </div>
      <div className="shop__body">
        <div className="shop__tags">
          <span className={`tag ${st.open ? 'tag--ok' : 'tag--plain'}`}>{st.label}</span>
          {s.featured && <span className="tag tag--ink" title={t('Negoci patrocinador: apareix destacat. No canvia cap dada.', 'Negocio patrocinador: aparece destacado. No cambia ningún dato.')}>{t('Destacat', 'Destacado')}</span>}
        </div>
        <h3 className="shop__name"><Link to={`/poble/comerc/${s.id}`} className="stretch">{s.name}</Link></h3>
        <p className="xs muted">{pick(kind.label, lang)} · {pick(s.area, lang)}</p>
        {s.offer && <p className="shop__offer"><Icon name="Ticket" size={15} />{pick(s.offer, lang)}</p>}
        {s.card && <p className="shop__card"><Icon name="CreditCard" size={15} />{pick(s.card, lang)}</p>}
      </div>
    </article>
  );
}

export { uid };
