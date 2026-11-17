import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Icon } from '../components/Icon';
import { Demo } from '../components/Bits';
import { services } from '../lib/demo';
import { pick, useLang, useT } from '../lib/i18n';

const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

export default function Services() {
  const t = useT();
  const lang = useLang();
  const { hash } = useLocation();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState<string | null>(hash ? hash.slice(1) : null);
  useEffect(() => {
    if (!hash) return;
    setOpen(hash.slice(1));
    setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' }), 80);
  }, [hash]);

  const areas = services.map((a) => ({ ...a, tasks: a.tasks.filter((x) => !q || norm(`${pick(x.title, lang)} ${pick(x.short, lang)} ${pick(a.title, lang)}`).includes(norm(q))) })).filter((a) => a.tasks.length);

  return (
    <div className="wrap">
      <header className="page-head" data-tone="lilac">
        <p className="eyebrow">{t('Sense laberints', 'Sin laberintos')}</p>
        <h1 className="h1" style={{ marginTop: '.5rem' }}>{t('Què necessites', '¿Qué necesitas')} <em className="tone-em">{t('fer?', 'hacer?')}</em></h1>
        <p className="lead">{t('Cada tràmit en dues frases, què cal portar i quant es triga. Quan és de l’Ajuntament o d’un altre organisme, t’hi portem directament.', 'Cada trámite en dos frases, qué hay que llevar y cuánto se tarda. Cuando es del Ayuntamiento o de otro organismo, te llevamos directamente.')}</p>
      </header>

      <div className="search" style={{ marginBottom: '1rem' }}>
        <Icon name="Search" size={20} />
        <label className="sr-only" htmlFor="tq">{t('Cerca un tràmit', 'Busca un trámite')}</label>
        <input id="tq" className="input" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Padró, escola, mobles, IBI…', 'Padrón, escuela, muebles, IBI…')} />
      </div>
      <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <Demo /><span className="xs muted">{t('Guies orientatives del prototip: confirma-ho sempre a la web oficial.', 'Guías orientativas del prototipo: confírmalo siempre en la web oficial.')}</span>
      </div>

      {areas.map((a) => (
        <section key={a.id} className="area" data-tone={a.tone} aria-labelledby={`a-${a.id}`}>
          <h2 className="area__h" id={`a-${a.id}`}><span className="row__ico"><Icon name={a.icon} size={20} /></span>{pick(a.title, lang)}</h2>
          <div className="acc-list">
            {a.tasks.map((x) => {
              const isOpen = open === x.id;
              return (
                <div key={x.id} id={x.id} className="acc" data-open={isOpen || undefined}>
                  <button className="acc__btn" aria-expanded={isOpen} aria-controls={`p-${x.id}`} onClick={() => setOpen(isOpen ? null : x.id)}>
                    <span className="row__body"><span className="row__title">{pick(x.title, lang)}</span><span className="row__sub">{pick(x.short, lang)}</span></span>
                    {x.online && <span className="tag tag--plain acc__online"><Icon name="Globe" size={13} />{t('En línia', 'En línea')}</span>}
                    <Icon name="ChevronDown" size={20} className="acc__chev" />
                  </button>
                  {isOpen && (
                    <div className="acc__panel" id={`p-${x.id}`}>
                      <ol className="steps">{x.steps.map((s, i) => <li key={i}>{pick(s, lang)}</li>)}</ol>
                      {x.needs.length > 0 && (
                        <div><p className="label">{t('Què necessites', 'Qué necesitas')}</p><ul className="needs">{x.needs.map((n) => <li key={n.ca}><Icon name="Check" size={16} />{pick(n, lang)}</li>)}</ul></div>
                      )}
                      <p className="small muted"><Icon name="Clock" size={15} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />{pick(x.time, lang)}</p>
                      <div className="acc__actions">
                        <a className="btn btn--accent" href="https://www.suria.cat" target="_blank" rel="noopener">{t('Fes-ho a la web oficial', 'Hazlo en la web oficial')}<Icon name="ArrowRight" size={18} /></a>
                        <Link className="btn btn--line" to={`/pregunta?q=${encodeURIComponent(pick(x.title, lang))}`}><Icon name="Sparkles" size={18} />{t('Tinc un dubte', 'Tengo una duda')}</Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
      {areas.length === 0 && (
        <div className="empty"><strong>{t('No ho trobem', 'No lo encontramos')}</strong><p>{t('Pregunta-ho amb les teves paraules.', 'Pregúntalo con tus palabras.')}</p><Link className="btn btn--accent" style={{ marginTop: '1rem' }} to={`/pregunta?q=${encodeURIComponent(q)}`}><Icon name="Sparkles" size={18} />{t('Pregunta a Súria', 'Pregunta a Súria')}</Link></div>
      )}

      <Link to="/poble/incidencia" className="card section report-cta" data-tone="coral" style={{ marginBottom: '1rem' }}>
        <span className="row__ico"><Icon name="Siren" /></span>
        <span style={{ flex: 1 }}><strong style={{ display: 'block' }}>{t('Avisa d’una incidència al carrer', 'Avisa de una incidencia en la calle')}</strong><span className="small muted">{t('Foto, lloc i llest. Et direm quan estigui resolta.', 'Foto, lugar y listo. Te diremos cuándo esté resuelta.')}</span></span>
        <Icon name="ChevronRight" size={18} />
      </Link>
    </div>
  );
}
