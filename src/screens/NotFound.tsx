import { Link } from 'react-router';
import { Icon } from '../components/Icon';
import { useT } from '../lib/i18n';

export default function NotFound() {
  const t = useT();
  return (
    <div className="wrap narrow empty" style={{ paddingTop: '4rem' }}>
      <p className="display" style={{ color: 'var(--accent)' }}>404</p>
      <strong>{t('Aquest carrer no el tenim al mapa', 'Esta calle no la tenemos en el mapa')}</strong>
      <p>{t('Potser l’enllaç és antic. Tornem a la plaça?', 'Quizá el enlace es antiguo. ¿Volvemos a la plaza?')}</p>
      <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'center', marginTop: '1.25rem', flexWrap: 'wrap' }}>
        <Link className="btn btn--accent" to="/"><Icon name="House" size={18} />{t('Inici', 'Inicio')}</Link>
        <Link className="btn btn--line" to="/pregunta"><Icon name="Sparkles" size={18} />{t('Pregunta a Súria', 'Pregunta a Súria')}</Link>
      </div>
    </div>
  );
}
