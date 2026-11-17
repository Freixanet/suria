import { Link, useParams } from 'react-router';
import { Icon } from '../components/Icon';
import { Demo, Faces } from '../components/Bits';
import { EventCard, GoingButton, useGoingCount } from '../components/Cards';
import { eventCats, events } from '../lib/demo';
import { dayLabel, pick, timeRange, useLang, useT } from '../lib/i18n';
import { toggle, useStore } from '../lib/store';
import { haptic, needsSignIn, toast } from '../lib/ui';
import { dateOf } from '../lib/when';
import NotFound from './NotFound';

export function addToCalendar(title: string, place: string, date: Date, start: string, end?: string) {
  const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  const hm = (x: string) => x.replace(':', '') + '00';
  const esc = (s: string) => s.replace(/[,;\\]/g, (c) => '\\' + c);
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Suria//CA', 'BEGIN:VEVENT', `UID:${ymd}${hm(start)}-${title.length}@suria`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`, `DTSTART;TZID=Europe/Madrid:${ymd}T${hm(start)}`,
    `DTEND;TZID=Europe/Madrid:${ymd}T${hm(end ?? start)}`, `SUMMARY:${esc(title)}`, `LOCATION:${esc(place)}, Súria`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.download = `${title}.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

export async function share(title: string, t: (a: string, b: string) => string) {
  try {
    if (navigator.share) await navigator.share({ title, url: location.href });
    else { await navigator.clipboard.writeText(location.href); toast(t('Enllaç copiat', 'Enlace copiado')); }
  } catch { /* cancel·lat */ }
}

export default function EventPage() {
  const { id } = useParams();
  const t = useT();
  const lang = useLang();
  const e = events.find((x) => x.id === id);
  const buddy = useStore((s) => !!(e && s.buddy[e.id]));
  const saved = useStore((s) => !!(e && s.saved[`e:${e.id}`]));
  const count = useGoingCount(e ?? events[0]);
  if (!e) return <NotFound />;
  const cat = eventCats[e.cat];
  const d = dateOf(e);
  const steps = pick(e.expect, lang).split(/(?<=\.)\s+/).filter(Boolean);
  const more = events.filter((x) => x.id !== e.id && (x.cat === e.cat || x.firstTime)).slice(0, 2);
  const title = pick(e.title, lang);

  return (
    <div data-tone={cat.tone}>
      <section className="ev-hero">
        <div className="ev-hero__art" aria-hidden="true" />
        <div className="wrap">
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', position: 'relative' }}>
            <span className="tag" style={{ background: 'var(--card)' }}><Icon name={cat.icon} size={14} />{pick(cat.label, lang)}</span>
            {e.firstTime && <span className="tag" style={{ background: 'var(--card)', color: 'var(--sky-ink)' }}><Icon name="Hand" size={14} />{t('Ideal per a la primera vegada', 'Ideal para la primera vez')}</span>}
            <Demo />
          </div>
          <h1 className="h1 ev-hero__title">{title}</h1>
          <div className="facts">
            <p className="fact"><Icon name="CalendarDays" size={20} />{dayLabel(d, lang)}</p>
            <p className="fact"><Icon name="Clock" size={20} />{timeRange(e.start, e.end, lang)}</p>
            <p className="fact"><Icon name="MapPin" size={20} />{pick(e.place, lang)}</p>
            <p className="fact"><Icon name="Ticket" size={20} />{e.price ? pick(e.price, lang) : t('Gratuït', 'Gratis')}{e.spots ? t(` · ${e.spots} places`, ` · ${e.spots} plazas`) : ''}</p>
          </div>
        </div>
      </section>

      <div className="wrap detail">
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <p className="lead" style={{ maxWidth: 'none' }}>{pick(e.summary, lang)}</p>

          <section className="expect" aria-labelledby="exp">
            <h2 id="exp" className="h3"><Icon name="Hand" size={20} />{t('Primera vegada? Això és el que passarà', '¿Primera vez? Esto es lo que pasará')}</h2>
            <ol>{steps.map((s) => <li key={s}>{s}</li>)}</ol>
          </section>

          <section className="card" aria-labelledby="bud">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span className="row__ico" data-tone="coral" style={{ width: '3.25rem', height: '3.25rem' }}><Icon name="Users" /></span>
              <div style={{ flex: 1 }}>
                <h2 id="bud" className="h3">{t('No vols anar-hi sol?', '¿No quieres ir solo?')}</h2>
                <p className="small muted">{e.buddies > 0 ? t(`${e.buddies} veïns també busquen companyia.`, `${e.buddies} vecinos también buscan compañía.`) : t('Digues que busques companyia i et presentarem algú que també hi va.', 'Di que buscas compañía y te presentaremos a alguien que también va.')}</p>
              </div>
            </div>
            <button className="btn btn--toggle btn--soft btn--block" style={{ marginTop: '1rem' }} aria-pressed={buddy} onClick={() => {
              if (needsSignIn()) return;
              const on = toggle('buddy', e.id); haptic();
              if (on) toast(t('Fet. Quan algú més s’hi apunti, us presentarem.', 'Hecho. Cuando alguien más se apunte, os presentaremos.'));
            }}>
              <Icon name={buddy ? 'Check' : 'HandHeart'} size={18} />{buddy ? t('Buscant companyia', 'Buscando compañía') : t('Busco companyia', 'Busco compañía')}
            </button>
          </section>

          <dl className="kv card card--flat">
            <div><dt>{t('Accessibilitat', 'Accesibilidad')}</dt><dd>{pick(e.access, lang)}</dd></div>
            <div><dt>{t('Organitza', 'Organiza')}</dt><dd>{pick(e.host, lang)}</dd></div>
            <div><dt>{t('Com arribar-hi', 'Cómo llegar')}</dt><dd>{t('A peu des del centre. Si vens en cotxe, deixa’l a l’aparcament públic i camina cinc minuts.', 'A pie desde el centro. Si vienes en coche, déjalo en el aparcamiento público y camina cinco minutos.')}</dd></div>
          </dl>
        </div>

        <aside className="detail__side">
          <div className="card" style={{ display: 'grid', gap: '.75rem' }}>
            <p className="ev__count" style={{ fontSize: 'var(--fs-15)' }}><Faces list={[['RM', 'coral'], ['PG', 'sun'], ['IV', 'sky'], ['KB', 'mint']]} /><b className="num">{count}</b> {t('persones hi van', 'personas van')}</p>
            <GoingButton id={e.id} size="lg" block />
            <button className="btn btn--line btn--block" onClick={() => { addToCalendar(title, pick(e.place, lang), d, e.start, e.end); toast(t('Afegit al calendari', 'Añadido al calendario')); }}><Icon name="CalendarCheck" size={18} />{t('Afegeix al calendari', 'Añade al calendario')}</button>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              <button className="btn btn--soft" style={{ flex: 1 }} aria-pressed={saved} onClick={() => { if (needsSignIn()) return; const on = toggle('saved', `e:${e.id}`); toast(on ? t('Desat', 'Guardado') : t('Tret de desats', 'Quitado de guardados')); }}><Icon name="Bookmark" size={18} fill={saved ? 'currentColor' : 'none'} />{saved ? t('Desat', 'Guardado') : t('Desa', 'Guarda')}</button>
              <button className="btn btn--soft" style={{ flex: 1 }} onClick={() => share(title, t)}><Icon name="Share" size={18} />{t('Envia', 'Envía')}</button>
            </div>
            <p className="hint">{t('Et recordarem l’activitat el dia abans.', 'Te recordaremos la actividad el día antes.')}</p>
          </div>
        </aside>
      </div>

      {more.length > 0 && (
        <section className="wrap section" style={{ marginBottom: '6rem' }}>
          <h2 className="h2" style={{ marginBottom: '1rem' }}>{t('També et pot agradar', 'También te puede gustar')}</h2>
          <div className="evlist">{more.map((x) => <EventCard key={x.id} e={x} variant="row" />)}</div>
          <p style={{ marginTop: '1rem' }}><Link to="/agenda" className="btn btn--line"><Icon name="CalendarDays" size={18} />{t('Tota l’agenda', 'Toda la agenda')}</Link></p>
        </section>
      )}

      <div className="cta-bar">
        <GoingButton id={e.id} />
        <button className="btn btn--sm btn--line" style={{ background: 'var(--card)' }} onClick={() => share(title, t)} aria-label={t('Envia', 'Envía')}><Icon name="Share" size={18} /></button>
      </div>
    </div>
  );
}
