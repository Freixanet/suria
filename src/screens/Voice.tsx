import { useState } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Icon } from '../components/Icon';
import { Demo } from '../components/Bits';
import { poll, proposals, type ProposalStatus } from '../lib/demo';
import { pick, useLang, useT } from '../lib/i18n';
import { setState, toggle, useStore } from '../lib/store';
import { haptic, needsSignIn, toast } from '../lib/ui';

export default function Voice() {
  const t = useT();
  const lang = useLang();
  const [tab, setTab] = useState<ProposalStatus>('oberta');
  const supports = useStore((s) => s.saved);
  const vote = useStore((s) => s.votes[poll.id]);
  const [form, setForm] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const total = poll.options.reduce((a, o) => a + o.votes, 0) + (vote ? 1 : 0);
  const status: Record<ProposalStatus, { ca: string; es: string }> = {
    oberta: { ca: 'Recollint suports', es: 'Recogiendo apoyos' },
    estudi: { ca: 'Presentada a l’Ajuntament', es: 'Presentada al Ayuntamiento' },
    feta: { ca: 'Feta', es: 'Hecha' },
  };

  return (
    <div className="wrap">
      <header className="page-head" data-tone="mint">
        <p className="eyebrow">{t('Participació', 'Participación')}</p>
        <h1 className="h1" style={{ marginTop: '.5rem' }}>{t('La veu', 'La voz')} <em className="tone-em">{t('del poble', 'del pueblo')}</em></h1>
        <p className="lead">{t('Proposa millores, dona suport a les que t’agradin i vota les decisions petites. Quan una proposta arriba als 250 suports, la presentem per registre a l’Ajuntament i en seguim la resposta aquí.', 'Propón mejoras, apoya las que te gusten y vota las decisiones pequeñas. Cuando una propuesta llega a 250 apoyos, la presentamos por registro al Ayuntamiento y seguimos la respuesta aquí.')}</p>
        <nav className="subnav" aria-label={t('Seccions de la comunitat', 'Secciones de la comunidad')}>
          <Link to="/comunitat">{t('Mur', 'Muro')}</Link>
          <Link to="/comunitat/veu" aria-current="page">{t('La veu del poble', 'La voz del pueblo')}</Link>
        </nav>
      </header>

      <div className="voice-grid">
        <div style={{ minWidth: 0 }}>
          <div className="voice-bar">
            <div className="seg" role="group" aria-label={t('Estat', 'Estado')}>
              {(['oberta', 'estudi', 'feta'] as ProposalStatus[]).map((s) => (
                <button key={s} aria-pressed={tab === s} onClick={() => setTab(s)}>{s === 'oberta' ? t('Obertes', 'Abiertas') : s === 'estudi' ? t('En curs', 'En curso') : t('Fetes', 'Hechas')}</button>
              ))}
            </div>
            <button className="btn btn--accent btn--sm" onClick={() => { if (!needsSignIn()) setForm(true); }}><Icon name="Plus" size={16} />{t('Proposa', 'Propón')}</button>
          </div>
          <p style={{ margin: '1rem 0' }}><Demo /></p>
          <div className="props">
            {proposals.filter((p) => p.status === tab).map((p) => {
              const on = !!supports[`p:${p.id}`];
              const n = Math.min(p.goal, p.supports + (on ? 1 : 0));
              return (
                <article key={p.id} className="prop card" data-tone={p.tone}>
                  <div className="prop__top">
                    <span className="row__ico"><Icon name={p.icon} /></span>
                    <span className={`tag ${p.status === 'feta' ? 'tag--ok' : ''}`}>{t(status[p.status].ca, status[p.status].es)}</span>
                  </div>
                  <h2 className="h3">{pick(p.title, lang)}</h2>
                  <p className="muted">{pick(p.body, lang)}</p>
                  <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={p.goal} aria-valuenow={n} aria-label={t('Suports', 'Apoyos')}><span style={{ width: `${(n / p.goal) * 100}%` }} /></div>
                  <div className="prop__foot">
                    <span className="small"><b className="num">{n}</b> / {p.goal} {t('suports', 'apoyos')} · <span className="muted">{t('proposada per', 'propuesta por')} {p.author}</span></span>
                    {p.status === 'oberta' && (
                      <button className={`btn btn--sm btn--toggle ${on ? '' : 'btn--accent'}`} aria-pressed={on} onClick={() => { if (needsSignIn()) return; const v = toggle('saved', `p:${p.id}`); haptic(); toast(v ? t('Gràcies pel teu suport', 'Gracias por tu apoyo') : t('Suport retirat', 'Apoyo retirado')); }}>
                        <Icon name={on ? 'Check' : 'Heart'} size={16} />{on ? t('Hi dones suport', 'La apoyas') : t('Dona-hi suport', 'Apóyala')}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="feed-side">
          <section className="card poll" id="enquesta" aria-labelledby="poll-t" data-tone="lilac">
            <p className="eyebrow">{t('Enquesta', 'Encuesta')} · {t(`tanca en ${poll.daysLeft} dies`, `cierra en ${poll.daysLeft} días`)}</p>
            <h2 className="h3" id="poll-t" style={{ marginTop: '.5rem' }}>{pick(poll.q, lang)}</h2>
            <div className="poll__opts">
              {poll.options.map((o) => {
                const v = o.votes + (vote === o.id ? 1 : 0);
                const pct = Math.round((v / total) * 100);
                return (
                  <button key={o.id} className="poll__opt" aria-pressed={vote === o.id} onClick={() => {
                    if (needsSignIn()) return;
                    setState((s) => ({ ...s, votes: { ...s.votes, [poll.id]: o.id } })); haptic(); toast(t('Vot registrat', 'Voto registrado'));
                  }}>
                    {vote && <motion.span className="poll__bar" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />}
                    <span className="poll__label">{vote === o.id && <Icon name="Check" size={16} />}{pick(o.label, lang)}</span>
                    {vote && <span className="poll__pct num">{pct}%</span>}
                  </button>
                );
              })}
            </div>
            <p className="xs muted" style={{ marginTop: '.75rem' }}><b className="num">{total}</b> {t('vots · un per persona, pots canviar-lo', 'votos · uno por persona, puedes cambiarlo')}</p>
          </section>

          <Link to="/poble/incidencia" className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }} data-tone="coral">
            <span className="row__ico"><Icon name="Siren" /></span>
            <span style={{ flex: 1 }}><strong style={{ display: 'block' }}>{t('Has vist alguna cosa espatllada?', '¿Has visto algo estropeado?')}</strong><span className="small muted">{t('Fanals, voreres, brutícia… avisa’n en un minut.', 'Farolas, aceras, suciedad… avisa en un minuto.')}</span></span>
            <Icon name="ChevronRight" size={18} />
          </Link>

          <section className="card card--flat">
            <h2 className="h3">{t('Com funciona', 'Cómo funciona')}</h2>
            <ol className="how">
              <li>{t('Algú proposa una millora concreta.', 'Alguien propone una mejora concreta.')}</li>
              <li>{t('Els veïns hi donen suport (un per persona).', 'Los vecinos la apoyan (uno por persona).')}</li>
              <li>{t('Amb 250 suports, la presentem formalment.', 'Con 250 apoyos, la presentamos formalmente.')}</li>
              <li>{t('Publiquem aquí la resposta, sigui quina sigui.', 'Publicamos aquí la respuesta, sea cual sea.')}</li>
            </ol>
          </section>
        </aside>
      </div>

      <AnimatePresence>
        {form && (
          <>
            <motion.div className="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setForm(false)} />
            <motion.form className="sheet" role="dialog" aria-modal="true" aria-labelledby="pf-t" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              onSubmit={(e) => { e.preventDefault(); setForm(false); setTitle(''); setBody(''); toast(t('Proposta enviada. La revisarem i la publicarem aviat.', 'Propuesta enviada. La revisaremos y la publicaremos pronto.')); }}>
              <div className="sheet__grab" />
              <div className="sheet__head"><h2 className="h2" id="pf-t">{t('Proposa una millora', 'Propón una mejora')}</h2><button type="button" className="icon-btn" onClick={() => setForm(false)} aria-label={t('Tanca', 'Cierra')}><Icon name="X" /></button></div>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div className="field"><label className="label" htmlFor="pf-1">{t('Què proposes?', '¿Qué propones?')}</label><input id="pf-1" className="input" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={90} placeholder={t('Per exemple: un pas de vianants a…', 'Por ejemplo: un paso de peatones en…')} autoFocus /></div>
                <div className="field"><label className="label" htmlFor="pf-2">{t('Per què és important?', '¿Por qué es importante?')}</label><textarea id="pf-2" className="input" rows={4} value={body} onChange={(e) => setBody(e.target.value)} maxLength={500} /></div>
                <p className="hint">{t('Una proposta concreta i respectuosa té més suports. No hi posis dades personals.', 'Una propuesta concreta y respetuosa tiene más apoyos. No pongas datos personales.')}</p>
                <button className="btn btn--accent btn--lg btn--block" disabled={title.trim().length < 6}>{t('Envia la proposta', 'Envía la propuesta')}</button>
              </div>
            </motion.form>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
