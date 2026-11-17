import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Icon } from '../components/Icon';
import { Avatar, Demo, SecHead } from '../components/Bits';
import { EventCard, PostCard, ShopCard } from '../components/Cards';
import { bins, bus, events, poll, posts, proposals, shops, weeklyQuestion } from '../lib/demo';
import { longDate, pick, time, useLang, useT } from '../lib/i18n';
import { useStore } from '../lib/store';
import { minsUntil, nextTimes, openState, useNow } from '../lib/when';
import { sky, useWeather } from '../lib/weather';

const rise = (i: number) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.04 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } });

function greeting(h: number, lang: 'ca' | 'es') {
  if (h < 6) return lang === 'ca' ? 'Bona nit' : 'Buenas noches';
  if (h < 14) return lang === 'ca' ? 'Bon dia' : 'Buenos días';
  if (h < 20) return lang === 'ca' ? 'Bona tarda' : 'Buenas tardes';
  return lang === 'ca' ? 'Bon vespre' : 'Buenas noches';
}

export function AskBox({ big }: { big?: boolean }) {
  const t = useT();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const go = (text: string) => text.trim() && navigate(`/pregunta?q=${encodeURIComponent(text.trim())}`);
  const sugg = [
    t('Quan surt el pròxim bus?', '¿Cuándo sale el próximo bus?'),
    t('Com m’empadrono?', '¿Cómo me empadrono?'),
    t('Què faig aquest cap de setmana?', '¿Qué hago este fin de semana?'),
    t('On llenço un matalàs?', '¿Dónde tiro un colchón?'),
  ];
  return (
    <div className={`ask ${big ? 'ask--big' : ''}`}>
      <form className="ask__box" onSubmit={(e) => { e.preventDefault(); go(q); }} role="search">
        <span className="ask__spark" aria-hidden="true"><Icon name="Sparkles" size={20} /></span>
        <label className="sr-only" htmlFor="ask-home">{t('Pregunta el que vulguis sobre Súria', 'Pregunta lo que quieras sobre Súria')}</label>
        <input id="ask-home" data-ask-input className="ask__input" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Pregunta el que vulguis sobre Súria…', 'Pregunta lo que quieras sobre Súria…')} autoComplete="off" enterKeyHint="send" />
        <button className="ask__go" aria-label={t('Pregunta', 'Pregunta')} disabled={!q.trim()}><Icon name="ArrowUp" size={20} /></button>
      </form>
      <div className="chips ask__sugg" aria-label={t('Preguntes suggerides', 'Preguntas sugeridas')}>
        {sugg.map((s) => <button key={s} className="chip" onClick={() => go(s)}>{s}</button>)}
      </div>
    </div>
  );
}

function Widgets() {
  const t = useT();
  const lang = useLang();
  const now = useNow();
  const weekend = now.getDay() === 0 || now.getDay() === 6;
  const sched = weekend ? bus.weekend : bus.weekday;
  const out = nextTimes(sched.out, now, 3);
  const inn = nextTimes(sched.in, now, 2);
  return (
    <div className="widgets">
      <Link to="/pregunta?q=bus" className="widget widget--bus" data-tone="accent">
        <div className="widget__head"><Icon name="Bus" size={18} />{pick(bus.out, lang)}<Demo /></div>
        {out[0] ? (
          <>
            <p className="widget__big num">{time(out[0], lang).replace(' h', '')}<small> h</small></p>
            <p className="widget__sub">{minsUntil(out[0], now) <= 59 ? t(`d’aquí a ${minsUntil(out[0], now)} min`, `en ${minsUntil(out[0], now)} min`) : t('pròxima sortida', 'próxima salida')}{out.length > 1 && <> · {t('després', 'después')} {out.slice(1).map((x) => time(x, lang).replace(' h', '')).join(', ')}</>}</p>
          </>
        ) : (
          <p className="widget__mid">{t('Avui ja no en surten més', 'Hoy ya no salen más')}</p>
        )}
        <p className="widget__foot">{pick(bus.in, lang)}: {inn.length ? inn.map((x) => time(x, lang).replace(' h', '')).join(' · ') : '—'}</p>
      </Link>

      <div className="widget" data-tone="coral">
        <div className="widget__head"><Icon name="Pill" size={18} />{t('Farmàcia', 'Farmacia')}</div>
        <p className="widget__mid">{t('Farmàcia de la Plaça', 'Farmacia de la Plaza')}</p>
        <p className="widget__sub">{t('De guàrdia fins demà, 9.00 h', 'De guardia hasta mañana, 9:00 h')}</p>
        <p className="widget__foot"><Demo /></p>
      </div>

      <div className="widget" data-tone="mint">
        <div className="widget__head"><Icon name="Recycle" size={18} />{t('Aquesta nit', 'Esta noche')}</div>
        <p className="widget__mid">{pick(bins[now.getDay()], lang)}</p>
        <p className="widget__sub">{t('Treu-ho a partir de les 20 h', 'Sácalo a partir de las 20 h')}</p>
        <p className="widget__foot"><Demo /></p>
      </div>

    </div>
  );
}

export function Home() {
  const t = useT();
  const lang = useLang();
  const now = useNow(60_000);
  const user = useStore((s) => s.user);
  const w = useWeather();
  const steps = useStore((s) => Object.keys(s.steps).length);
  const voted = useStore((s) => s.votes[poll.id]);
  const soon = [...events].filter((e) => e.day <= 3).sort((a, b) => a.day - b.day || a.start.localeCompare(b.start)).slice(0, 6);
  const today = events.filter((e) => e.day === 0).length;
  const first = user?.name.split(' ')[0];
  const prop = proposals[0];
  const openShops = shops.filter((s) => s.offer || s.card).slice(0, 4);
  const totalVotes = poll.options.reduce((a, o) => a + o.votes, 0) + (voted ? 1 : 0);

  return (
    <div className="home">
      <section className="hero wrap" aria-labelledby="hola">
        <motion.p className="eyebrow hero__meta" {...rise(0)}>
          <span>{longDate(now, lang)}</span>
          {w && <span className="hero__wx" title="Open-Meteo"><Icon name="CloudSun" size={15} />{w.temp}° · {sky(w.code, lang)}</span>}
        </motion.p>
        <motion.h1 id="hola" className="display hero__greet" {...rise(1)}>
          {greeting(now.getHours(), lang)}{first ? <>, <em>{first}</em></> : ''}.
        </motion.h1>
        <motion.p className="hero__line" {...rise(2)}>
          {t(`Avui hi ha ${today} activitats al poble`, `Hoy hay ${today} actividades en el pueblo`)} <span className="hero__dot" aria-hidden="true" /> {t('2 avisos del veïnat', '2 avisos del vecindario')} <Demo />
        </motion.p>
        <motion.div {...rise(3)}><AskBox big /></motion.div>
      </section>

      <div className="wrap">
        <section className="section" aria-labelledby="ara">
          <SecHead title={t('Ara mateix', 'Ahora mismo')} id="ara" />
          <Widgets />
        </section>

        <section className="section" aria-labelledby="aviat">
          <SecHead title={t('Avui i aquests dies', 'Hoy y estos días')} id="aviat" to="/agenda" link={t('Tota l’agenda', 'Toda la agenda')}><Demo /></SecHead>
          <div className="rail-x">{soon.map((e) => <EventCard key={e.id} e={e} />)}</div>
        </section>

        {(!user || user.role === 'newcomer') && (
          <section className="section">
            <Link to="/poble/benvinguda" className="newbie" data-tone="sky">
              <div className="newbie__art" aria-hidden="true"><Icon name="Hand" size={40} /></div>
              <div className="newbie__body">
                <p className="eyebrow">{t('Fa poc que hi vius?', '¿Hace poco que vives aquí?')}</p>
                <h2 className="h1 newbie__title">{t('Els teus primers', 'Tus primeros')} <em>30 {t('dies', 'días')}</em></h2>
                <p className="muted">{t('Padró, metge, escola i, sobretot, gent. Pas a pas i sense haver de fer el primer pas tot sol.', 'Padrón, médico, escuela y, sobre todo, gente. Paso a paso y sin tener que dar el primer paso a solas.')}</p>
                {steps > 0 && <div className="progress" style={{ marginTop: '.75rem' }}><span style={{ width: `${Math.min(100, (steps / 8) * 100)}%` }} /></div>}
              </div>
              <span className="newbie__go" aria-hidden="true"><Icon name="ArrowRight" size={22} /></span>
            </Link>
          </section>
        )}

        <section className="section" aria-labelledby="poble">
          <SecHead title={t('Al poble se’n parla', 'En el pueblo se habla de')} id="poble" to="/comunitat" link={t('Comunitat', 'Comunidad')}><Demo /></SecHead>
          <div className="talk">
            <Link to="/comunitat#setmana" className="wq">
              <p className="eyebrow">{t('Pregunta de la setmana', 'Pregunta de la semana')}</p>
              <p className="wq__q serif">{pick(weeklyQuestion.text, lang)}</p>
              <div className="wq__answers">
                {weeklyQuestion.samples.map((s) => <p key={s.initials}><Avatar initials={s.initials} tone={s.tone} size="sm" />«{pick(s.text, lang)}»</p>)}
              </div>
              <p className="wq__n xs"><b className="num">{weeklyQuestion.answers}</b> {t('respostes · Afegeix la teva', 'respuestas · Añade la tuya')} <Icon name="ArrowRight" size={15} /></p>
            </Link>
            {posts.slice(0, 2).map((p) => <PostCard key={p.id} p={p} compact />)}
          </div>
        </section>

        <section className="section" aria-labelledby="veu">
          <SecHead title={t('La veu del poble', 'La voz del pueblo')} id="veu" to="/comunitat/veu" link={t('Totes les propostes', 'Todas las propuestas')}><Demo /></SecHead>
          <div className="grid grid--2">
            <Link to="/comunitat/veu" className="card prop-mini" data-tone={prop.tone}>
              <span className="row__ico"><Icon name={prop.icon} /></span>
              <h3 className="h3">{pick(prop.title, lang)}</h3>
              <div className="progress"><span style={{ width: `${(prop.supports / prop.goal) * 100}%` }} /></div>
              <p className="xs muted"><b className="num">{prop.supports}</b> {t(`de ${prop.goal} suports per portar-la al ple`, `de ${prop.goal} apoyos para llevarla al pleno`)}</p>
            </Link>
            <Link to="/comunitat/veu#enquesta" className="card prop-mini" data-tone="lilac">
              <span className="row__ico"><Icon name="Vote" /></span>
              <h3 className="h3">{pick(poll.q, lang)}</h3>
              <p className="xs muted"><b className="num">{totalVotes}</b> {t('vots', 'votos')} · {t(`tanca en ${poll.daysLeft} dies`, `cierra en ${poll.daysLeft} días`)}</p>
              <span className="btn btn--sm btn--tone" style={{ alignSelf: 'flex-start' }}>{voted ? t('Ja has votat', 'Ya has votado') : t('Vota', 'Vota')}</span>
            </Link>
          </div>
        </section>

        <section className="section" aria-labelledby="comerc">
          <SecHead title={t('Compra al poble', 'Compra en el pueblo')} id="comerc" to="/poble/comerc" link={t('Tots els comerços', 'Todos los comercios')}><Demo /></SecHead>
          <div className="rail-x rail-x--4">{openShops.map((s) => <ShopCard key={s.id} s={s} />)}</div>
          <p className="xs muted" style={{ marginTop: '.5rem' }}>{shops.filter((s) => openState(s.hours, lang).open).length} {t('comerços oberts ara segons el seu horari', 'comercios abiertos ahora según su horario')}</p>
        </section>

        <section className="section" aria-labelledby="fer">
          <SecHead title={t('Fes-ho en un minut', 'Hazlo en un minuto')} id="fer" to="/poble/tramits" link={t('Tots els tràmits', 'Todos los trámites')} />
          <div className="quick">
            {[
              { to: '/poble/tramits#padro', icon: 'House', tone: 'sky', ca: 'Empadronar-me', es: 'Empadronarme' },
              { to: '/poble/incidencia', icon: 'Siren', tone: 'coral', ca: 'Avisar d’una incidència', es: 'Avisar de una incidencia' },
              { to: '/poble/tramits#mobles', icon: 'Recycle', tone: 'mint', ca: 'Recollida de mobles', es: 'Recogida de muebles' },
              { to: '/poble/tramits#ajuts', icon: 'Wallet', tone: 'lilac', ca: 'Ajuts que em toquen', es: 'Ayudas que me tocan' },
            ].map((q) => (
              <Link key={q.to} to={q.to} className="quick__item" data-tone={q.tone}><span className="row__ico"><Icon name={q.icon} /></span>{t(q.ca, q.es)}<Icon name="ChevronRight" size={18} className="quick__chev" /></Link>
            ))}
          </div>
        </section>

        <footer className="section home-foot">
          <div className="note">
            <Icon name="Info" size={18} />
            <p>{t('Prototip d’una plataforma independent per a Súria. El contingut marcat com a «Exemple» és de mostra; les dades oficials sempre portaran el seu enllaç.', 'Prototipo de una plataforma independiente para Súria. El contenido marcado como «Ejemplo» es de muestra; los datos oficiales siempre llevarán su enlace.')} <Link to="/poble#com-funciona">{t('Com funciona', 'Cómo funciona')}</Link></p>
          </div>
        </footer>
      </div>
    </div>
  );
}
