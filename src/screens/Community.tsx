import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Icon } from '../components/Icon';
import { Avatar, Demo, Me } from '../components/Bits';
import { PostCard } from '../components/Cards';
import { channels, groups, posts, weeklyQuestion, type Channel } from '../lib/demo';
import { ago, pick, useLang, useT } from '../lib/i18n';
import { setState, toggle, uid, useStore } from '../lib/store';
import { haptic, needsSignIn, toast } from '../lib/ui';

export default function Community() {
  const t = useT();
  const lang = useLang();
  const [params, setParams] = useSearchParams();
  const [filter, setFilter] = useState<Channel | null>(null);
  const [compose, setCompose] = useState<{ channel: Channel; prompt?: string } | null>(null);
  const user = useStore((s) => s.user);
  const mine = useStore((s) => s.posts);
  const follows = useStore((s) => s.follows);

  useEffect(() => {
    const c = params.get('nou') as Channel | null;
    if (c && channels[c]) {
      setParams({}, { replace: true });
      if (!needsSignIn()) setCompose({ channel: c });
    }
  }, [params, setParams]);

  const open = (channel: Channel, prompt?: string) => { if (needsSignIn()) return; setCompose({ channel, prompt }); };
  const list = posts.filter((p) => !filter || p.channel === filter);
  const myList = user ? mine.filter((p) => !filter || p.channel === filter) : [];

  return (
    <div className="wrap">
      <header className="page-head" data-tone="coral">
        <p className="eyebrow">{t('El poble, connectat', 'El pueblo, conectado')}</p>
        <h1 className="h1" style={{ marginTop: '.5rem' }}>{t('Entre', 'Entre')} <em className="tone-em">{t('veïns', 'vecinos')}</em></h1>
        <p className="lead">{t('Avisos, preguntes i ajuda. Amb nom real, amb respecte i revisat per gent del poble.', 'Avisos, preguntas y ayuda. Con nombre real, con respeto y revisado por gente del pueblo.')}</p>
        <nav className="subnav" aria-label={t('Seccions de la comunitat', 'Secciones de la comunidad')}>
          <Link to="/comunitat" aria-current="page">{t('Mur', 'Muro')}</Link>
          <Link to="/comunitat/veu">{t('La veu del poble', 'La voz del pueblo')}</Link>
        </nav>
      </header>

      <div className="feed-grid">
        <div style={{ display: 'grid', gap: '1rem', minWidth: 0, gridTemplateColumns: 'minmax(0, 1fr)' }}>
          <button className="composer-cta" onClick={() => open('preguntes')}>
            <Me />
            <span>{t('Què vols compartir amb el poble?', '¿Qué quieres compartir con el pueblo?')}</span>
            <span className="btn btn--sm btn--accent"><Icon name="SquarePen" size={16} />{t('Publica', 'Publica')}</span>
          </button>
          <div className="chips" role="group" aria-label={t('Canals', 'Canales')}>
            <button className="chip" aria-pressed={!filter} onClick={() => setFilter(null)}>{t('Tot', 'Todo')}</button>
            {(Object.keys(channels) as Channel[]).map((c) => (
              <button key={c} className="chip" data-tone={channels[c].tone} aria-pressed={filter === c} onClick={() => setFilter(filter === c ? null : c)}><span className="chip__dot" />{pick(channels[c].label, lang)}</button>
            ))}
          </div>
          <p><Demo /></p>
          <div className="feed">
            <AnimatePresence initial={false}>
              {myList.map((p) => (
                <motion.article key={p.id} className="post post--mine" initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}>
                  <header className="post__head">
                    <Me />
                    <div className="post__who"><strong>{user!.name}</strong><span className="xs muted">{ago(p.at, lang)}</span></div>
                    <span className="tag" data-tone={channels[p.channel as Channel]?.tone}><Icon name={channels[p.channel as Channel]?.icon ?? 'MessageCircle'} size={14} />{pick(channels[p.channel as Channel].label, lang)}</span>
                  </header>
                  <p className="post__text">{p.text}</p>
                  <footer className="post__foot">
                    <span className="tag tag--plain"><Icon name="Clock" size={13} />{t('En revisió per un moderador', 'En revisión por un moderador')}</span>
                    <button className="btn btn--sm btn--line" style={{ marginLeft: 'auto' }} onClick={() => setState((s) => ({ ...s, posts: s.posts.filter((x) => x.id !== p.id) }))}><Icon name="Trash2" size={15} />{t('Esborra', 'Borra')}</button>
                  </footer>
                </motion.article>
              ))}
            </AnimatePresence>
            {list.map((p) => <PostCard key={p.id} p={p} />)}
            {list.length + myList.length === 0 && (
              <div className="empty card card--flat">
                <strong>{t('Aquí encara no hi ha res', 'Aquí todavía no hay nada')}</strong>
                <p>{t('Sigues la primera persona a escriure en aquest canal.', 'Sé la primera persona en escribir en este canal.')}</p>
                <button className="btn btn--accent" style={{ marginTop: '1rem' }} onClick={() => open(filter ?? 'preguntes')}>{t('Escriu', 'Escribe')}</button>
              </div>
            )}
          </div>
        </div>

        <aside className="feed-side">
          <section className="wq wq--big" id="setmana" aria-labelledby="wq-t">
            <p className="eyebrow">{t('Pregunta de la setmana', 'Pregunta de la semana')}</p>
            <p className="wq__q serif" id="wq-t">{pick(weeklyQuestion.text, lang)}</p>
            <div className="wq__answers">{weeklyQuestion.samples.map((s) => <p key={s.initials}><Avatar initials={s.initials} tone={s.tone} size="sm" />«{pick(s.text, lang)}»</p>)}</div>
            <button className="btn btn--white" style={{ alignSelf: 'flex-start' }} onClick={() => open('recomanacions', pick(weeklyQuestion.text, lang))}><Icon name="MessageCircle" size={18} />{t('Respon', 'Responde')}</button>
          </section>

          <section className="card" aria-labelledby="start-t">
            <h2 className="h3" id="start-t">{t('Trenca el gel', 'Rompe el hielo')}</h2>
            <p className="small muted" style={{ marginTop: '.25rem' }}>{t('Tres maneres fàcils de començar.', 'Tres maneras fáciles de empezar.')}</p>
            <div className="list" style={{ marginTop: '.5rem' }}>
              {[
                { c: 'hola' as Channel, ca: 'Presenta’t al poble', es: 'Preséntate al pueblo', pca: 'Hola! Em dic… i fa poc que visc a Súria.', pes: '¡Hola! Me llamo… y hace poco que vivo en Súria.' },
                { c: 'ajuda' as Channel, ca: 'Ofereix un cop de mà', es: 'Ofrece una mano', pca: 'Puc ajudar amb…', pes: 'Puedo ayudar con…' },
                { c: 'preguntes' as Channel, ca: 'Fes una pregunta', es: 'Haz una pregunta', pca: 'Algú sap…?', pes: '¿Alguien sabe…?' },
              ].map((x) => (
                <button key={x.c} className="row" data-tone={channels[x.c].tone} onClick={() => open(x.c, t(x.pca, x.pes))}>
                  <span className="row__ico"><Icon name={channels[x.c].icon} /></span>
                  <span className="row__body"><span className="row__title">{t(x.ca, x.es)}</span></span>
                  <Icon name="ChevronRight" size={18} className="row__end" />
                </button>
              ))}
            </div>
          </section>

          <section className="card" id="grups" aria-labelledby="grups-t">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '.5rem' }}><h2 className="h3" id="grups-t">{t('Grups i entitats', 'Grupos y entidades')}</h2><Demo /></div>
            <div className="list" style={{ marginTop: '.25rem' }}>
              {groups.map((g) => {
                const on = !!follows[g.id];
                return (
                  <div key={g.id} className="row" data-tone={g.tone}>
                    <span className="row__ico"><Icon name={g.icon} /></span>
                    <span className="row__body"><span className="row__title">{pick(g.name, lang)}</span><span className="row__sub">{g.members + (on ? 1 : 0)} · {pick(g.next, lang)}</span></span>
                    <button className={`btn btn--sm btn--toggle ${on ? '' : 'btn--line'}`} aria-pressed={on} onClick={() => { if (needsSignIn()) return; const v = toggle('follows', g.id); haptic(); toast(v ? t('Ja en formes part', 'Ya formas parte') : t('Has deixat el grup', 'Has dejado el grupo')); }}>
                      {on ? t('Hi ets', 'Estás') : t('Uneix-t’hi', 'Únete')}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="card card--flat" aria-labelledby="normes-t">
            <h2 className="h3" id="normes-t">{t('Com ens cuidem', 'Cómo nos cuidamos')}</h2>
            <ul className="rules">
              <li><Icon name="Check" size={16} />{t('Nom real i respecte: critica idees, no persones.', 'Nombre real y respeto: critica ideas, no personas.')}</li>
              <li><Icon name="Check" size={16} />{t('Res de dades ni fotos d’altres sense permís.', 'Nada de datos ni fotos de otros sin permiso.')}</li>
              <li><Icon name="Check" size={16} />{t('Sense publicitat: els comerços tenen el seu espai.', 'Sin publicidad: los comercios tienen su espacio.')}</li>
              <li><Icon name="Check" size={16} />{t('En català o castellà, com et sigui més fàcil.', 'En catalán o castellano, como te sea más fácil.')}</li>
            </ul>
          </section>
        </aside>
      </div>

      <Compose state={compose} onClose={() => setCompose(null)} />
    </div>
  );
}

function Compose({ state, onClose }: { state: { channel: Channel; prompt?: string } | null; onClose: () => void }) {
  const t = useT();
  const lang = useLang();
  const [channel, setChannel] = useState<Channel>('preguntes');
  const [text, setText] = useState('');
  useEffect(() => { if (state) { setChannel(state.channel); setText(''); } }, [state]);
  return (
    <AnimatePresence>
      {state && (
        <>
          <motion.div className="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.form className="sheet" role="dialog" aria-modal="true" aria-labelledby="c-t" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
            onSubmit={(e) => {
              e.preventDefault();
              if (text.trim().length < 3) return;
              setState((s) => ({ ...s, posts: [{ id: uid(), channel, text: text.trim(), at: Date.now() }, ...s.posts] }));
              toast(t('Publicat. Gràcies per participar!', '¡Publicado! Gracias por participar.'));
              onClose();
            }}>
            <div className="sheet__grab" />
            <div className="sheet__head">
              <h2 className="h2" id="c-t">{t('Nova publicació', 'Nueva publicación')}</h2>
              <button type="button" className="icon-btn" onClick={onClose} aria-label={t('Tanca', 'Cierra')}><Icon name="X" /></button>
            </div>
            <fieldset>
              <legend className="label" style={{ marginBottom: '.5rem' }}>{t('On ho publiques?', '¿Dónde lo publicas?')}</legend>
              <div className="pick">
                {(Object.keys(channels) as Channel[]).map((c) => (
                  <label key={c} data-tone={channels[c].tone}><input type="radio" name="ch" value={c} checked={channel === c} onChange={() => setChannel(c)} /><span><Icon name={channels[c].icon} size={15} />{pick(channels[c].label, lang)}</span></label>
                ))}
              </div>
            </fieldset>
            <div className="field" style={{ marginTop: '1rem' }}>
              <label className="label" htmlFor="c-text">{t('Missatge', 'Mensaje')}</label>
              <textarea id="c-text" className="input" rows={5} maxLength={600} value={text} onChange={(e) => setText(e.target.value)} placeholder={state.prompt ?? t('Escriu com si parlessis amb un veí.', 'Escribe como si hablaras con un vecino.')} autoFocus />
              <div className="hint" style={{ display: 'flex', justifyContent: 'space-between' }}><span>{t('Es publica amb el teu nom. Un moderador del poble ho revisa.', 'Se publica con tu nombre. Un moderador del pueblo lo revisa.')}</span><span className="num">{text.length}/600</span></div>
            </div>
            <button className="btn btn--accent btn--lg btn--block" style={{ marginTop: '1rem' }} disabled={text.trim().length < 3}>{t('Publica', 'Publica')}</button>
          </motion.form>
        </>
      )}
    </AnimatePresence>
  );
}
