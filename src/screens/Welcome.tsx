import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Icon } from '../components/Icon';
import { Avatar, Demo } from '../components/Bits';
import { EventCard } from '../components/Cards';
import { events } from '../lib/demo';
import { useT } from '../lib/i18n';
import { toggle, useStore } from '../lib/store';
import { haptic, needsSignIn, toast } from '../lib/ui';

type Step = { id: string; icon: string; tone: string; ca: [string, string]; es: [string, string]; to: string; link: [string, string] };

export default function Welcome() {
  const t = useT();
  const done = useStore((s) => s.steps);
  const buddy = useStore((s) => !!s.saved['padri']);
  const stages: { ca: string; es: string; steps: Step[] }[] = [
    { ca: 'La primera setmana', es: 'La primera semana', steps: [
      { id: 'padro', icon: 'House', tone: 'sky', ca: ['Empadrona’t', 'És la porta de tot: metge, escola, ajuts i votar.'], es: ['Empadrónate', 'Es la puerta de todo: médico, escuela, ayudas y votar.'], to: '/poble/tramits#padro', link: ['Com fer-ho', 'Cómo hacerlo'] },
      { id: 'cap', icon: 'HeartPulse', tone: 'coral', ca: ['Tingues metge', 'Amb el padró, demana la targeta sanitària.'], es: ['Ten médico', 'Con el padrón, pide la tarjeta sanitaria.'], to: '/poble/tramits#cap', link: ['Com fer-ho', 'Cómo hacerlo'] },
      { id: 'residus', icon: 'Recycle', tone: 'mint', ca: ['Aprèn com es recicla aquí', 'Cada poble ho fa diferent.'], es: ['Aprende cómo se recicla aquí', 'Cada pueblo lo hace diferente.'], to: '/poble/tramits#mobles', link: ['Veure-ho', 'Verlo'] },
      { id: 'tel', icon: 'Phone', tone: 'lilac', ca: ['Desa els telèfons útils', 'Emergències i salut, a mà.'], es: ['Guarda los teléfonos útiles', 'Emergencias y salud, a mano.'], to: '/poble', link: ['Telèfons', 'Teléfonos'] },
    ] },
    { ca: 'El primer mes', es: 'El primer mes', steps: [
      { id: 'escola', icon: 'School', tone: 'sun', ca: ['Escola o llar d’infants', 'Si tens criatures, demana plaça.'], es: ['Escuela o guardería', 'Si tienes niños, pide plaza.'], to: '/poble/tramits#escola', link: ['Com fer-ho', 'Cómo hacerlo'] },
      { id: 'activitat', icon: 'CalendarCheck', tone: 'sun', ca: ['Ves a una activitat', 'Tria’n una «ideal per a la 1a vegada».'], es: ['Ve a una actividad', 'Elige una «ideal para la 1ª vez».'], to: '/agenda', link: ['Agenda', 'Agenda'] },
      { id: 'hola', icon: 'Hand', tone: 'sky', ca: ['Presenta’t al poble', 'Un missatge curt obre moltes portes.'], es: ['Preséntate al pueblo', 'Un mensaje corto abre muchas puertas.'], to: '/comunitat?nou=hola', link: ['Escriu', 'Escribe'] },
    ] },
    { ca: 'Quan et vingui de gust', es: 'Cuando te apetezca', steps: [
      { id: 'grup', icon: 'Users', tone: 'coral', ca: ['Uneix-te a un grup', 'Cor, caminants, reparació… la manera més ràpida de fer amics.'], es: ['Únete a un grupo', 'Coro, caminantes, reparación… la forma más rápida de hacer amigos.'], to: '/comunitat#grups', link: ['Grups', 'Grupos'] },
    ] },
  ];
  const total = stages.reduce((a, s) => a + s.steps.length, 0);
  const n = stages.flatMap((s) => s.steps).filter((s) => done[s.id]).length;
  const dinner = events.find((e) => e.id === 'sopar-nous')!;

  return (
    <div className="wrap">
      <header className="page-head welcome-head" data-tone="sky">
        <div>
          <p className="eyebrow">{t('Benvingut, benvinguda', 'Te damos la bienvenida')}</p>
          <h1 className="h1" style={{ marginTop: '.5rem' }}>{t('Els teus primers', 'Tus primeros')} <em className="tone-em">30 {t('dies', 'días')}</em></h1>
          <p className="lead">{t('Una llista curta per sentir-te de casa aviat. Marca el que ja has fet: ho recordem per tu.', 'Una lista corta para sentirte en casa pronto. Marca lo que ya has hecho: lo recordamos por ti.')}</p>
        </div>
        <div className="ring" style={{ ['--p' as string]: n / total }} role="img" aria-label={t(`${n} de ${total} passos fets`, `${n} de ${total} pasos hechos`)}>
          <span><b className="num">{n}</b><small>/{total}</small></span>
        </div>
      </header>

      <div style={{ display: 'grid', gap: '2rem' }}>
        {stages.map((st) => (
          <section key={st.ca} aria-label={t(st.ca, st.es)}>
            <h2 className="area__h" style={{ marginBottom: '.75rem' }}>{t(st.ca, st.es)}</h2>
            <ol className="journey">
              {st.steps.map((s) => {
                const on = !!done[s.id];
                return (
                  <li key={s.id} className="jstep" data-tone={s.tone} data-done={on || undefined}>
                    <button className="jstep__check" aria-pressed={on} aria-label={t(on ? `Desmarca: ${s.ca[0]}` : `Marca com a fet: ${s.ca[0]}`, on ? `Desmarca: ${s.es[0]}` : `Marca como hecho: ${s.es[0]}`)} onClick={() => { const v = toggle('steps', s.id); haptic(); if (v) toast(t('Un pas menys!', '¡Un paso menos!')); }}>
                      {on && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}><Icon name="Check" size={18} strokeWidth={3} /></motion.span>}
                    </button>
                    <div className="jstep__body">
                      <strong>{t(s.ca[0], s.es[0])}</strong>
                      <p className="small muted">{t(s.ca[1], s.es[1])}</p>
                      <Link className="btn btn--sm btn--soft" to={s.to}>{t(s.link[0], s.link[1])}<Icon name="ArrowRight" size={16} /></Link>
                    </div>
                    <span className="row__ico" aria-hidden="true"><Icon name={s.icon} /></span>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}

        <section className="buddy" aria-labelledby="padri">
          <div className="faces buddy__faces" aria-hidden="true">
            {[['RM', 'coral'], ['PG', 'sun'], ['LP', 'mint'], ['JS', 'lilac']].map(([i, tone]) => <Avatar key={i} initials={i} tone={tone} />)}
          </div>
          <p className="eyebrow" style={{ color: 'var(--sun)' }}>{t('Padrins de benvinguda', 'Padrinos de bienvenida')}</p>
          <h2 className="h1" id="padri" style={{ fontSize: 'var(--fs-36)' }}>{t('Un veí que et fa de', 'Un vecino que te hace de')} <em>{t('guia', 'guía')}</em></h2>
          <p style={{ opacity: 0.85 }}>{t('Un cafè, un passeig pel poble i algú a qui preguntar el primer mes. Són voluntaris i hi viuen de fa anys.', 'Un café, un paseo por el pueblo y alguien a quien preguntar el primer mes. Son voluntarios y viven aquí desde hace años.')}</p>
          <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button className={`btn ${buddy ? 'btn--toggle' : 'btn--white'}`} aria-pressed={buddy} onClick={() => { if (needsSignIn()) return; const v = toggle('saved', 'padri'); haptic(); if (v) toast(t('Fet! Et presentarem algú aquesta setmana.', '¡Hecho! Te presentaremos a alguien esta semana.')); }}>
              <Icon name={buddy ? 'Check' : 'HandHeart'} size={18} />{buddy ? t('Sol·licitud enviada', 'Solicitud enviada') : t('Vull un padrí o padrina', 'Quiero un padrino o madrina')}
            </button>
            <Demo />
          </div>
        </section>

        <section aria-labelledby="sopar">
          <h2 className="h2" id="sopar" style={{ marginBottom: '1rem' }}>{t('La teva primera cita al poble', 'Tu primera cita en el pueblo')}</h2>
          <EventCard e={dinner} variant="row" />
        </section>

        <section className="card card--flat" style={{ marginBottom: '1rem' }}>
          <h2 className="h3">{t('Tens un dubte concret?', '¿Tienes una duda concreta?')}</h2>
          <p className="small muted" style={{ margin: '.25rem 0 1rem' }}>{t('Pregunta-ho com ho diries a un veí.', 'Pregúntalo como se lo dirías a un vecino.')}</p>
          <Link className="btn btn--accent" to="/pregunta"><Icon name="Sparkles" size={18} />{t('Pregunta a Súria', 'Pregunta a Súria')}</Link>
        </section>
      </div>
    </div>
  );
}
