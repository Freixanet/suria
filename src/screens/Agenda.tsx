import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Icon } from '../components/Icon';
import { Demo } from '../components/Bits';
import { EventCard } from '../components/Cards';
import { eventCats, events, type EventCat } from '../lib/demo';
import { dayLabel, pick, sameDay, useLang, useT, weekdayShort } from '../lib/i18n';
import { dateOf } from '../lib/when';

export default function Agenda() {
  const t = useT();
  const lang = useLang();
  const [day, setDay] = useState<number | null>(null);
  const [cat, setCat] = useState<EventCat | null>(null);
  const [first, setFirst] = useState(false);
  const [free, setFree] = useState(false);
  const days = Array.from({ length: 14 }, (_, i) => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + i); return d; });
  const withEvents = new Set(events.map((e) => e.day));

  const list = useMemo(() => events
    .filter((e) => (day === null || e.day === day) && (!cat || e.cat === cat) && (!first || e.firstTime) && (!free || !e.price || /porta|trae/i.test(e.price.ca)))
    .sort((a, b) => a.day - b.day || a.start.localeCompare(b.start)), [day, cat, first, free]);
  const groups = [...new Set(list.map((e) => e.day))].map((d) => ({ d, items: list.filter((e) => e.day === d) }));

  return (
    <div className="wrap">
      <header className="page-head" data-tone="sun">
        <p className="eyebrow">{t('Què passa al poble', 'Qué pasa en el pueblo')}</p>
        <h1 className="h1" style={{ marginTop: '.5rem' }}>{t('Agenda', 'Agenda')} <em className="tone-em">{t('de veïns', 'de vecinos')}</em></h1>
        <p className="lead">{t('Apunta’t amb un toc. A cada activitat t’expliquem què passarà, i pots dir que busques companyia per anar-hi.', 'Apúntate con un toque. En cada actividad te explicamos qué pasará, y puedes decir que buscas compañía para ir.')}</p>
      </header>

      <div className="filters">
        <div className="days" role="group" aria-label={t('Tria un dia', 'Elige un día')}>
          <button className="day day--all" aria-pressed={day === null} onClick={() => setDay(null)}>{t('Tots', 'Todos')}</button>
          {days.map((d, i) => (
            <button key={i} className={`day ${withEvents.has(i) ? 'day--has' : ''}`} aria-pressed={day === i} onClick={() => setDay(day === i ? null : i)} aria-label={dayLabel(d, lang)}>
              <small>{i === 0 ? t('avui', 'hoy') : weekdayShort(d, lang)}</small>
              <b className="num">{d.getDate()}</b>
            </button>
          ))}
        </div>
        <div className="chips" role="group" aria-label={t('Filtres', 'Filtros')}>
          <button className="chip" aria-pressed={first} onClick={() => setFirst(!first)} data-tone="sky"><Icon name="Hand" size={16} />{t('Ideal per a la 1a vegada', 'Ideal para la 1ª vez')}</button>
          <button className="chip" aria-pressed={free} onClick={() => setFree(!free)}><Icon name="Euro" size={16} />{t('Gratuït', 'Gratis')}</button>
          {(Object.keys(eventCats) as EventCat[]).map((c) => (
            <button key={c} className="chip" aria-pressed={cat === c} onClick={() => setCat(cat === c ? null : c)} data-tone={eventCats[c].tone}><span className="chip__dot" />{pick(eventCats[c].label, lang)}</button>
          ))}
        </div>
      </div>

      <p style={{ margin: '0 0 1.25rem' }}><Demo /></p>
      {groups.length === 0 && (
        <div className="empty">
          <strong>{t('Res amb aquests filtres', 'Nada con estos filtros')}</strong>
          <p>{t('Prova un altre dia, o proposa tu una activitat a la comunitat.', 'Prueba otro día, o propón tú una actividad en la comunidad.')}</p>
          <Link to="/comunitat" className="btn btn--line" style={{ marginTop: '1rem' }}><Icon name="Plus" size={18} />{t('Proposa una activitat', 'Propón una actividad')}</Link>
        </div>
      )}
      {groups.map(({ d, items }) => {
        const date = dateOf(items[0]);
        return (
          <section key={d} className="daygroup" aria-label={dayLabel(date, lang)}>
            <h2 className="daygroup__h">
              <span className="serif">{dayLabel(date, lang)}</span>
              {(sameDay(date, new Date()) || d === 1) && <small className="muted">{date.getDate()}/{date.getMonth() + 1}</small>}
            </h2>
            <div className="evlist">{items.map((e) => <EventCard key={e.id} e={e} variant="row" showDay={false} />)}</div>
          </section>
        );
      })}

      <div className="note section" style={{ marginBottom: '1rem' }}>
        <Icon name="Info" size={18} />
        <p>{t('Les entitats i els veïns publiquen activitats; abans de sortir, una persona del poble les revisa.', 'Las entidades y los vecinos publican actividades; antes de salir, una persona del pueblo las revisa.')}</p>
      </div>
    </div>
  );
}
