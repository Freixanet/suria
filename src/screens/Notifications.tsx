import { useEffect } from 'react';
import { Link } from 'react-router';
import { Icon } from '../components/Icon';
import { Demo } from '../components/Bits';
import { agoLabel } from '../components/Cards';
import { notes } from '../lib/demo';
import { pick, useLang, useT } from '../lib/i18n';
import { setState, useStore } from '../lib/store';

export default function Notifications() {
  const t = useT();
  const lang = useLang();
  const read = useStore((s) => s.readNotes);
  useEffect(() => {
    const id = setTimeout(() => setState((s) => ({ ...s, readNotes: Object.fromEntries(notes.map((n) => [n.id, Date.now()])) })), 1200);
    return () => clearTimeout(id);
  }, []);
  return (
    <div className="wrap narrow">
      <header className="page-head">
        <p className="eyebrow">{t('El que t’afecta', 'Lo que te afecta')}</p>
        <h1 className="h1" style={{ marginTop: '.5rem' }}>{t('Avisos', 'Avisos')}</h1>
      </header>
      <p style={{ marginBottom: '1rem' }}><Demo /></p>
      <div className="card list" style={{ paddingBlock: '.25rem' }}>
        {notes.map((n) => (
          <Link key={n.id} to={n.to} className="row note-row" data-tone={n.tone} data-unread={!read[n.id] || undefined}>
            <span className="row__ico"><Icon name={n.icon} /></span>
            <span className="row__body"><span className="row__title" style={{ fontWeight: read[n.id] ? 500 : 650 }}>{pick(n.text, lang)}</span><span className="row__sub">{agoLabel(n.mins, lang)}</span></span>
            {!read[n.id] && <span className="unread-dot" aria-label={t('Nou', 'Nuevo')} />}
          </Link>
        ))}
      </div>
      <p className="hint" style={{ marginTop: '1rem', marginBottom: '1rem' }}>{t('Tries quins avisos reps a', 'Eliges qué avisos recibes en')} <Link to="/jo">{t('El meu compte', 'Mi cuenta')}</Link>. {t('Mai t’enviarem més d’un avís de comunitat al dia.', 'Nunca te enviaremos más de un aviso de comunidad al día.')}</p>
    </div>
  );
}
