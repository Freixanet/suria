import { Link } from 'react-router';
import { Icon } from '../components/Icon';
import { Demo } from '../components/Bits';
import { useT } from '../lib/i18n';

export default function Visit() {
  const t = useT();
  const hours = [2, 3, 5, 7, 9, 8, 6, 4, 5, 7, 8, 6, 3];
  const places = [
    { icon: 'Landmark', tone: 'sun', ca: ['El nucli antic', 'Carrers estrets on viu gent: a peu i en silenci.'], es: ['El casco antiguo', 'Calles estrechas donde vive gente: a pie y en silencio.'] },
    { icon: 'Mountain', tone: 'stone', ca: ['La història de la mina', 'El poble que va créixer amb la potassa, explicat pels qui hi van treballar.'], es: ['La historia de la mina', 'El pueblo que creció con la potasa, contado por quienes trabajaron allí.'] },
    { icon: 'Waves', tone: 'sky', ca: ['El camí del riu', 'Un passeig pla vora el Cardener.'], es: ['El camino del río', 'Un paseo llano junto al Cardener.'] },
    { icon: 'UtensilsCrossed', tone: 'coral', ca: ['Menja al poble', 'Els bars i restaurants del centre, i el mercat de productors.'], es: ['Come en el pueblo', 'Los bares y restaurantes del centro, y el mercado de productores.'] },
  ];
  return (
    <div className="wrap">
      <header className="page-head" data-tone="mint">
        <p className="eyebrow">{t('Per a qui ve de fora', 'Para quien viene de fuera')}</p>
        <h1 className="h1" style={{ marginTop: '.5rem' }}>{t('Súria,', 'Súria,')} <em className="tone-em">{t('amb calma', 'con calma')}</em></h1>
        <p className="lead">{t('Un poble per viure’l, no per consumir-lo. Si vens, vine a poc a poc, en petit i entre setmana.', 'Un pueblo para vivirlo, no para consumirlo. Si vienes, ven despacio, en grupo pequeño y entre semana.')}</p>
      </header>

      <section className="respect" aria-labelledby="abans">
        <h2 className="h2" id="abans">{t('Abans de venir', 'Antes de venir')}</h2>
        <ul>
          <li><Icon name="Car" size={20} />{t('Deixa el cotxe a l’aparcament de l’entrada i camina: el centre és petit.', 'Deja el coche en el aparcamiento de la entrada y camina: el centro es pequeño.')}</li>
          <li><Icon name="Users" size={20} />{t('Grups de més de 10? Reserveu una visita guiada.', '¿Grupos de más de 10? Reservad una visita guiada.')}</li>
          <li><Icon name="Moon" size={20} />{t('Als carrers on viu gent, parla baix i respecta portes i finestres.', 'En las calles donde vive gente, habla bajo y respeta puertas y ventanas.')}</li>
          <li><Icon name="ShoppingBag" size={20} />{t('Compra i menja al poble: és la millor manera de dir gràcies.', 'Compra y come en el pueblo: es la mejor manera de dar las gracias.')}</li>
        </ul>
      </section>

      <section className="section" aria-labelledby="quan">
        <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', marginBottom: '.5rem' }}><h2 className="h2" id="quan">{t('Quan és més tranquil', 'Cuándo está más tranquilo')}</h2><Demo /></div>
        <p className="small muted" style={{ marginBottom: '1rem' }}>{t('Dissabte al nucli antic, segons l’hora. Vine a les hores verdes.', 'Sábado en el casco antiguo, según la hora. Ven en las horas verdes.')}</p>
        <div className="busy" role="img" aria-label={t('Afluència per hores: més tranquil a primera hora i a la tarda', 'Afluencia por horas: más tranquilo a primera hora y por la tarde')}>
          {hours.map((h, i) => <div key={i} className="busy__col"><span style={{ height: `${h * 10}%` }} data-calm={h <= 4 || undefined} /><small>{9 + i}</small></div>)}
        </div>
      </section>

      <section className="section" aria-label={t('Què veure', 'Qué ver')}>
        <div className="grid grid--2">
          {places.map((p) => (
            <article key={p.ca[0]} className="card card--tone visit-card" data-tone={p.tone}>
              <span className="tile__ico"><Icon name={p.icon} size={22} /></span>
              <h3 className="h1" style={{ fontSize: 'var(--fs-28)' }}>{t(p.ca[0], p.es[0])}</h3>
              <p className="muted">{t(p.ca[1], p.es[1])}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section card card--flat" style={{ marginBottom: '1rem', display: 'grid', gap: '.75rem' }}>
        <h2 className="h3">{t('Vols venir amb un grup o una escola?', '¿Quieres venir con un grupo o una escuela?')}</h2>
        <p className="small muted">{t('Les rutes guiades les fan veïns i tenen places limitades, per respecte a qui hi viu.', 'Las rutas guiadas las hacen vecinos y tienen plazas limitadas, por respeto a quien vive aquí.')}</p>
        <Link to="/agenda/ruta-historia" className="btn btn--accent" style={{ justifySelf: 'start' }}><Icon name="Ticket" size={18} />{t('Ruta guiada', 'Ruta guiada')}</Link>
      </section>
    </div>
  );
}
