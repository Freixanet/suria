import { useState } from 'react';
import { Link } from 'react-router';
import { Icon } from '../components/Icon';
import { Demo } from '../components/Bits';
import { ShopCard } from '../components/Cards';
import { shopKinds, shops, type ShopKind } from '../lib/demo';
import { pick, useLang, useT } from '../lib/i18n';
import { openState } from '../lib/when';

const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

export default function Shops() {
  const t = useT();
  const lang = useLang();
  const [q, setQ] = useState('');
  const [kind, setKind] = useState<ShopKind | null>(null);
  const [open, setOpen] = useState(false);
  const [card, setCard] = useState(false);
  const list = shops
    .filter((s) => (!kind || s.kind === kind) && (!open || openState(s.hours, lang).open) && (!card || s.card))
    .filter((s) => !q || norm(`${s.name} ${pick(s.blurb, lang)} ${pick(shopKinds[s.kind].label, lang)} ${s.tags.map((x) => pick(x, lang)).join(' ')}`).includes(norm(q)))
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  return (
    <div className="wrap">
      <header className="page-head" data-tone="coral">
        <p className="eyebrow">{t('Compra a prop', 'Compra cerca')}</p>
        <h1 className="h1" style={{ marginTop: '.5rem' }}>{t('El comerç', 'El comercio')} <em className="tone-em">{t('del poble', 'del pueblo')}</em></h1>
        <p className="lead">{t('Horaris que confirma el mateix negoci, ofertes de la setmana i avantatges amb el Carnet Súria.', 'Horarios que confirma el propio negocio, ofertas de la semana y ventajas con el Carnet Súria.')}</p>
      </header>

      <div style={{ display: 'grid', gap: '.875rem', gridTemplateColumns: 'minmax(0, 1fr)' }}>
        <div className="search">
          <Icon name="Search" size={20} />
          <label className="sr-only" htmlFor="sq">{t('Cerca', 'Busca')}</label>
          <input id="sq" className="input" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Pa, claus, tapes, perruqueria…', 'Pan, llaves, tapas, peluquería…')} />
        </div>
        <div className="chips" role="group" aria-label={t('Filtres', 'Filtros')}>
          <button className="chip" aria-pressed={open} onClick={() => setOpen(!open)}><span className="chip__dot" style={{ background: 'var(--ok)' }} />{t('Obert ara', 'Abierto ahora')}</button>
          <button className="chip" aria-pressed={card} onClick={() => setCard(!card)}><Icon name="CreditCard" size={16} />{t('Amb Carnet Súria', 'Con Carnet Súria')}</button>
          {(Object.keys(shopKinds) as ShopKind[]).map((k) => (
            <button key={k} className="chip" aria-pressed={kind === k} onClick={() => setKind(kind === k ? null : k)}><Icon name={shopKinds[k].icon} size={16} />{pick(shopKinds[k].label, lang)}</button>
          ))}
        </div>
        <p><Demo /></p>
      </div>

      <div className="shop-grid">{list.map((s) => <ShopCard key={s.id} s={s} />)}</div>
      {list.length === 0 && <div className="empty"><strong>{t('Cap comerç coincideix', 'Ningún comercio coincide')}</strong><p>{t('Prova una altra paraula o treu algun filtre.', 'Prueba otra palabra o quita algún filtro.')}</p></div>}

      <section className="section carnet" aria-labelledby="carnet">
        <div className="carnet__card" aria-hidden="true">
          <span className="brand__word">Súria</span>
          <span className="carnet__chip" />
          <span className="carnet__name">{t('Carnet de veí', 'Carnet de vecino')}</span>
          <Icon name="QrCode" size={44} className="carnet__qr" />
        </div>
        <div>
          <p className="eyebrow">{t('Gratuït per a veïns', 'Gratis para vecinos')}</p>
          <h2 className="h1" id="carnet" style={{ fontSize: 'var(--fs-36)', marginBlock: '.25rem .75rem' }}>{t('El Carnet Súria', 'El Carnet Súria')}</h2>
          <p className="muted">{t('Ensenya’l al mòbil i tindràs descomptes als comerços adherits. Cada compra al poble es queda al poble.', 'Enséñalo en el móvil y tendrás descuentos en los comercios adheridos. Cada compra en el pueblo se queda en el pueblo.')}</p>
          <Link to="/jo#carnet" className="btn btn--accent" style={{ marginTop: '1rem' }}><Icon name="CreditCard" size={18} />{t('Obre el meu carnet', 'Abre mi carnet')}</Link>
        </div>
      </section>

      <section className="section card card--ink biz-cta" aria-labelledby="teu" style={{ marginBottom: '1rem' }}>
        <p className="eyebrow" style={{ color: 'var(--sun)' }}>{t('Tens un negoci?', '¿Tienes un negocio?')}</p>
        <h2 className="h2" id="teu">{t('La fitxa és gratuïta. Actualitzar l’horari costa un missatge.', 'La ficha es gratuita. Actualizar el horario cuesta un mensaje.')}</h2>
        <Link to="/negocis" className="btn btn--white" style={{ justifySelf: 'start' }}>{t('Com funciona', 'Cómo funciona')}<Icon name="ArrowRight" size={18} /></Link>
      </section>
    </div>
  );
}
