import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { Icon } from '../components/Icon';
import { Avatar, Demo } from '../components/Bits';
import { events, groups, shops } from '../lib/demo';
import { dayLabel, pick, time, useLang, useT } from '../lib/i18n';
import { getState, resetAll, setPrefs, setState, useStore } from '../lib/store';
import { toast } from '../lib/ui';
import { dateOf } from '../lib/when';

/** Patró visual tipus QR (decoratiu, d'exemple): estable per a cada persona. */
function FakeQR({ seed }: { seed: string }) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const n = 21;
  const cells: [number, number][] = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
    if (finder) continue;
    h = (h * 1103515245 + 12345) >>> 0;
    if ((h >>> 16) % 2) cells.push([x, y]);
  }
  const finder = (x: number, y: number) => (
    <g key={`${x}${y}`}><rect x={x} y={y} width="7" height="7" rx="1.6" fill="currentColor" /><rect x={x + 1} y={y + 1} width="5" height="5" rx="1.1" fill="#fff" /><rect x={x + 2} y={y + 2} width="3" height="3" rx="0.8" fill="currentColor" /></g>
  );
  return (
    <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} className="qr" aria-hidden="true">
      <rect x="-1" y="-1" width={n + 2} height={n + 2} rx="2" fill="#fff" />
      {cells.map(([x, y]) => <rect key={`${x}-${y}`} x={x + 0.1} y={y + 0.1} width="0.8" height="0.8" rx="0.25" fill="currentColor" />)}
      {finder(0, 0)}{finder(14, 0)}{finder(0, 14)}
    </svg>
  );
}

export default function Me() {
  const t = useT();
  const lang = useLang();
  const navigate = useNavigate();
  const s = useStore((x) => x);
  const [confirm, setConfirm] = useState(false);
  const u = s.user;

  if (!u) {
    return (
      <div className="wrap auth">
        <div className="auth__step">
          <Avatar guest size="xl" />
          <h1 className="h1">{t('El teu', 'Tu')} <em style={{ color: 'var(--accent)' }}>{t('racó', 'rincón')}</em></h1>
          <p className="muted">{t('Entra per guardar el que t’interessa, apuntar-te a activitats, tenir el Carnet Súria i participar a la comunitat.', 'Entra para guardar lo que te interesa, apuntarte a actividades, tener el Carnet Súria y participar en la comunidad.')}</p>
          <Link className="btn btn--accent btn--lg btn--block" to="/entrar?tornar=/jo"><Icon name="Mail" size={18} />{t('Entra o crea un compte', 'Entra o crea una cuenta')}</Link>
          <Prefs />
        </div>
      </div>
    );
  }

  const going = events.filter((e) => s.going[e.id]).sort((a, b) => a.day - b.day);
  const savedShops = shops.filter((x) => s.saved[`s:${x.id}`]);
  const savedEvents = events.filter((x) => s.saved[`e:${x.id}`]);
  const myGroups = groups.filter((g) => s.follows[g.id]);
  const roles = { resident: t('Veí o veïna', 'Vecino o vecina'), newcomer: t('Nou al poble', 'Nuevo en el pueblo'), business: t('Comerç local', 'Comercio local'), visitor: t('De visita', 'De visita') };

  return (
    <div className="wrap me">
      <header className="me__head">
        <Avatar initials={u.initials} tone={u.tone} size="xl" />
        <div>
          <h1 className="h1" style={{ fontSize: 'var(--fs-36)' }}>{u.name}</h1>
          <p className="muted">{roles[u.role]}{u.neighbourhood ? ` · ${u.neighbourhood}` : ''}</p>
        </div>
      </header>

      <div className="me__stats">
        <div><b className="num">{Object.keys(s.going).length}</b><span>{t('activitats', 'actividades')}</span></div>
        <div><b className="num">{Object.keys(s.thanks).length}</b><span>{t('gràcies donades', 'gracias dadas')}</span></div>
        <div><b className="num">{s.posts.length + s.reports.length}</b><span>{t('aportacions', 'aportaciones')}</span></div>
      </div>

      <section className="section" id="carnet" aria-labelledby="carnet-t">
        <div className="pass">
          <div className="pass__l">
            <p className="eyebrow" style={{ color: 'rgb(255 255 255 / .8)' }}>{t('Carnet de veí', 'Carnet de vecino')}</p>
            <h2 id="carnet-t" className="serif pass__name">{u.name}</h2>
            <p className="pass__sub">{t('Ensenya’l als comerços adherits', 'Enséñalo en los comercios adheridos')}</p>
            <span className="pass__no num">SÚR · {String(u.email.length * 7919).padStart(6, '0')}</span>
          </div>
          <FakeQR seed={u.email} />
        </div>
        <p className="xs muted" style={{ marginTop: '.625rem', display: 'flex', gap: '.5rem', alignItems: 'center' }}><Demo />{t('Codi d’exemple: encara no és vàlid als comerços.', 'Código de ejemplo: todavía no es válido en los comercios.')}</p>
      </section>

      <section className="section" aria-labelledby="plans-t">
        <h2 className="h2" id="plans-t" style={{ marginBottom: '.75rem' }}>{t('On aniràs', 'Dónde irás')}</h2>
        <div className="card list" style={{ paddingBlock: '.25rem' }}>
          {going.length === 0 && <p className="muted" style={{ padding: '1rem 0' }}>{t('Encara no t’has apuntat a res.', 'Todavía no te has apuntado a nada.')} <Link to="/agenda">{t('Mira l’agenda', 'Mira la agenda')}</Link></p>}
          {going.map((e) => (
            <Link key={e.id} to={`/agenda/${e.id}`} className="row" data-tone="sun">
              <span className="row__ico"><Icon name="CalendarCheck" /></span>
              <span className="row__body"><span className="row__title">{pick(e.title, lang)}</span><span className="row__sub">{dayLabel(dateOf(e), lang)} · {time(e.start, lang)}</span></span>
              <Icon name="ChevronRight" size={18} className="row__end" />
            </Link>
          ))}
        </div>
      </section>

      {(savedShops.length + savedEvents.length + myGroups.length > 0) && (
        <section className="section" aria-labelledby="saved-t">
          <h2 className="h2" id="saved-t" style={{ marginBottom: '.75rem' }}>{t('Desats i grups', 'Guardados y grupos')}</h2>
          <div className="card list" style={{ paddingBlock: '.25rem' }}>
            {savedEvents.map((e) => <Link key={e.id} to={`/agenda/${e.id}`} className="row" data-tone="sun"><span className="row__ico"><Icon name="Bookmark" /></span><span className="row__body"><span className="row__title">{pick(e.title, lang)}</span></span><Icon name="ChevronRight" size={18} className="row__end" /></Link>)}
            {savedShops.map((x) => <Link key={x.id} to={`/poble/comerc/${x.id}`} className="row" data-tone={x.tone}><span className="row__ico"><Icon name="Store" /></span><span className="row__body"><span className="row__title">{x.name}</span></span><Icon name="ChevronRight" size={18} className="row__end" /></Link>)}
            {myGroups.map((g) => <Link key={g.id} to="/comunitat#grups" className="row" data-tone={g.tone}><span className="row__ico"><Icon name={g.icon} /></span><span className="row__body"><span className="row__title">{pick(g.name, lang)}</span><span className="row__sub">{pick(g.next, lang)}</span></span><Icon name="ChevronRight" size={18} className="row__end" /></Link>)}
          </div>
        </section>
      )}

      <Prefs />

      <section className="section" aria-labelledby="priv-t" style={{ marginBottom: '1rem' }}>
        <h2 className="h2" id="priv-t" style={{ marginBottom: '.75rem' }}>{t('Les teves dades', 'Tus datos')}</h2>
        <div className="card" style={{ display: 'grid', gap: '.625rem' }}>
          <p className="small muted">{t('No venem dades ni hi ha anuncis que et segueixin. En aquest prototip, tot es queda al teu dispositiu.', 'No vendemos datos ni hay anuncios que te sigan. En este prototipo, todo se queda en tu dispositivo.')}</p>
          <button className="btn btn--soft btn--block" onClick={() => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(new Blob([JSON.stringify(getState(), null, 2)], { type: 'application/json' }));
            a.download = 'suria-les-meves-dades.json'; a.click();
          }}><Icon name="Download" size={18} />{t('Descarrega les meves dades', 'Descarga mis datos')}</button>
          <button className="btn btn--line btn--block" onClick={() => { setState((x) => ({ ...x, user: null })); toast(t('Has sortit', 'Has salido')); navigate('/'); }}><Icon name="LogOut" size={18} />{t('Surt', 'Sal')}</button>
          <button className="btn btn--line btn--block" style={{ color: 'var(--danger)' }} onClick={() => {
            if (!confirm) { setConfirm(true); return; }
            resetAll(); toast(t('Compte esborrat', 'Cuenta borrada')); navigate('/');
          }}><Icon name="Trash2" size={18} />{confirm ? t('Toca de nou per esborrar-ho tot', 'Toca de nuevo para borrarlo todo') : t('Esborra el compte', 'Borra la cuenta')}</button>
        </div>
      </section>
    </div>
  );
}

function Prefs() {
  const t = useT();
  const p = useStore((s) => s.prefs);
  return (
    <section className="section" aria-labelledby="prefs-t">
      <h2 className="h2" id="prefs-t" style={{ marginBottom: '.75rem' }}>{t('Com ho vols veure', 'Cómo lo quieres ver')}</h2>
      <div className="card" style={{ paddingBlock: '.25rem' }}>
        <div className="setting setting--wrap">
          <span className="setting__l"><strong>{t('Mida del text', 'Tamaño del texto')}</strong><small>{t('A tota l’app', 'En toda la app')}</small></span>
          <div className="seg" role="group" aria-label={t('Mida del text', 'Tamaño del texto')}>
            {(['m', 'l', 'xl'] as const).map((x) => <button key={x} aria-pressed={p.text === x} onClick={() => setPrefs({ text: x })}>{x === 'm' ? t('Normal', 'Normal') : x === 'l' ? t('Gran', 'Grande') : t('Molt gran', 'Muy grande')}</button>)}
          </div>
        </div>
        <div className="setting setting--wrap">
          <span className="setting__l"><strong>{t('Aparença', 'Apariencia')}</strong><small>{t('Fosc per a la nit', 'Oscuro para la noche')}</small></span>
          <div className="seg" role="group" aria-label={t('Aparença', 'Apariencia')}>
            {(['system', 'light', 'dark'] as const).map((x) => <button key={x} aria-pressed={p.theme === x} onClick={() => setPrefs({ theme: x })}>{x === 'system' ? t('Auto', 'Auto') : x === 'light' ? t('Clar', 'Claro') : t('Fosc', 'Oscuro')}</button>)}
          </div>
        </div>
        <label className="setting" htmlFor="pc">
          <span className="setting__l"><strong>{t('Contrast alt', 'Contraste alto')}</strong><small>{t('Vores i text més marcats', 'Bordes y texto más marcados')}</small></span>
          <span className="switch"><input id="pc" type="checkbox" checked={p.contrast} onChange={(e) => setPrefs({ contrast: e.target.checked })} /><span /></span>
        </label>
        <div className="setting">
          <span className="setting__l"><strong>{t('Llengua', 'Idioma')}</strong><small>{p.lang === 'ca' ? 'Català' : 'Castellano'}</small></span>
          <div className="seg" role="group" aria-label={t('Llengua', 'Idioma')}>
            <button aria-pressed={p.lang === 'ca'} onClick={() => setPrefs({ lang: 'ca' })} lang="ca">Català</button>
            <button aria-pressed={p.lang === 'es'} onClick={() => setPrefs({ lang: 'es' })} lang="es">Castellano</button>
          </div>
        </div>
      </div>
      <h3 className="h3" style={{ margin: '1.5rem 0 .5rem' }}>{t('Avisos', 'Avisos')}</h3>
      <div className="card" style={{ paddingBlock: '.25rem' }}>
        {[
          { k: 'events', ca: ['Recordatoris d’activitats', 'El dia abans, a les 18 h'], es: ['Recordatorios de actividades', 'El día antes, a las 18 h'] },
          { k: 'alerts', ca: ['Avisos importants del poble', 'Talls, obres i emergències'], es: ['Avisos importantes del pueblo', 'Cortes, obras y emergencias'] },
          { k: 'replies', ca: ['Respostes a les meves publicacions', 'Com a màxim, un resum al dia'], es: ['Respuestas a mis publicaciones', 'Como máximo, un resumen al día'] },
          { k: 'offers', ca: ['Ofertes dels comerços que segueixo', 'Una vegada per setmana'], es: ['Ofertas de los comercios que sigo', 'Una vez por semana'] },
        ].map((n) => (
          <label key={n.k} className="setting" htmlFor={`n-${n.k}`}>
            <span className="setting__l"><strong>{t(n.ca[0], n.es[0])}</strong><small>{t(n.ca[1], n.es[1])}</small></span>
            <span className="switch"><input id={`n-${n.k}`} type="checkbox" checked={!!p.notify[n.k]} onChange={(e) => setPrefs({ notify: { ...p.notify, [n.k]: e.target.checked } })} /><span /></span>
          </label>
        ))}
      </div>
    </section>
  );
}
