import { useParams } from 'react-router';
import { Icon } from '../components/Icon';
import { Demo } from '../components/Bits';
import { agoLabel } from '../components/Cards';
import { shopKinds, shops } from '../lib/demo';
import { pick, timeRange, useLang, useT, weekdayLong } from '../lib/i18n';
import { toggle, useStore } from '../lib/store';
import { needsSignIn, toast } from '../lib/ui';
import { openState } from '../lib/when';
import { share } from './EventPage';
import NotFound from './NotFound';

export default function ShopPage() {
  const { id } = useParams();
  const t = useT();
  const lang = useLang();
  const s = shops.find((x) => x.id === id);
  const saved = useStore((st) => !!(s && st.saved[`s:${s.id}`]));
  if (!s) return <NotFound />;
  const kind = shopKinds[s.kind];
  const st = openState(s.hours, lang);
  const today = new Date().getDay();
  const order = [1, 2, 3, 4, 5, 6, 0];
  const day = new Date();
  const label = (d: number) => { const x = new Date(day); x.setDate(day.getDate() + ((d - today + 7) % 7)); return weekdayLong(x, lang); };

  return (
    <div data-tone={s.tone}>
      <section className="shop-hero">
        <span className="shop__awning shop-hero__awning" aria-hidden="true" />
        <div className="wrap shop-hero__in">
          <span className="shop-hero__ico" aria-hidden="true"><Icon name={kind.icon} size={30} /></span>
          <p className="eyebrow">{pick(kind.label, lang)} · {pick(s.area, lang)}</p>
          <h1 className="h1" style={{ marginTop: '.375rem' }}>{s.name}</h1>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <span className={`tag ${st.open ? 'tag--ok' : 'tag--plain'}`} style={st.open ? {} : { background: 'var(--card)' }}>{st.label}</span>
            {s.featured && <span className="tag tag--ink">{t('Destacat · patrocinador', 'Destacado · patrocinador')}</span>}
            <Demo />
          </div>
        </div>
      </section>

      <div className="wrap detail">
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <p className="lead" style={{ maxWidth: 'none' }}>{pick(s.blurb, lang)}</p>
          <p className="serif" style={{ fontSize: 'var(--fs-28)', lineHeight: 1.15, color: 'var(--tone-ink)' }}>«{pick(s.craft, lang)}»</p>
          {(s.offer || s.card) && (
            <div className="grid grid--2">
              {s.offer && <div className="card card--tone" data-tone="coral"><p className="eyebrow">{t('Oferta de la setmana', 'Oferta de la semana')}</p><p className="h3" style={{ marginTop: '.375rem' }}>{pick(s.offer, lang)}</p></div>}
              {s.card && <div className="card card--tone" data-tone="accent"><p className="eyebrow">{t('Amb el Carnet Súria', 'Con el Carnet Súria')}</p><p className="h3" style={{ marginTop: '.375rem' }}>{pick(s.card, lang)}</p></div>}
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.375rem' }}>{s.tags.map((x) => <span key={x.ca} className="tag tag--plain">{pick(x, lang)}</span>)}</div>

          <section aria-labelledby="h-t">
            <h2 className="h2" id="h-t" style={{ marginBottom: '.5rem' }}>{t('Horari', 'Horario')}</h2>
            <table className="hours">
              <caption className="sr-only">{t('Horari setmanal', 'Horario semanal')}</caption>
              <tbody>
                {order.map((d) => (
                  <tr key={d} aria-current={d === today ? 'date' : undefined}>
                    <th scope="row">{label(d)}{d === today && <span className="tag" style={{ marginLeft: '.5rem', height: '1.375rem' }}>{t('avui', 'hoy')}</span>}</th>
                    <td className="num">{s.hours[d].length ? s.hours[d].map((r) => timeRange(r.split('-')[0], r.split('-')[1], lang)).join(' · ') : t('Tancat', 'Cerrado')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="honest"><Icon name="BadgeCheck" size={18} />{t(`Horari confirmat pel negoci ${agoLabel(s.updated, 'ca')}.`, `Horario confirmado por el negocio ${agoLabel(s.updated, 'es')}.`)}</p>
          </section>
        </div>

        <aside className="detail__side">
          <div className="card" style={{ display: 'grid', gap: '.75rem' }}>
            <a className="btn btn--accent btn--lg btn--block" href={`https://www.openstreetmap.org/search?query=${encodeURIComponent('Súria')}`} target="_blank" rel="noopener"><Icon name="Navigation" size={18} />{t('Com arribar-hi', 'Cómo llegar')}</a>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              <button className="btn btn--soft" style={{ flex: 1 }} aria-pressed={saved} onClick={() => { if (needsSignIn()) return; const v = toggle('saved', `s:${s.id}`); toast(v ? t('Afegit als teus comerços', 'Añadido a tus comercios') : t('Tret dels teus comerços', 'Quitado de tus comercios')); }}><Icon name="Bookmark" size={18} fill={saved ? 'currentColor' : 'none'} />{saved ? t('Desat', 'Guardado') : t('Desa', 'Guarda')}</button>
              <button className="btn btn--soft" style={{ flex: 1 }} onClick={() => share(s.name, t)}><Icon name="Share" size={18} />{t('Envia', 'Envía')}</button>
            </div>
            <p className="hint">{t('Si el segueixes, t’avisarem de les ofertes (com a màxim una per setmana).', 'Si lo sigues, te avisaremos de las ofertas (como máximo una por semana).')}</p>
            <button className="btn btn--sm btn--line" onClick={() => toast(t('Gràcies! Ho comprovarem amb el negoci.', '¡Gracias! Lo comprobaremos con el negocio.'))}><Icon name="Flag" size={15} />{t('Alguna dada no és correcta', 'Algún dato no es correcto')}</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
