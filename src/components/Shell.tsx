import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Icon } from './Icon';
import { Brand, Me } from './Bits';
import { useT } from '../lib/i18n';
import { setPrefs, useStore } from '../lib/store';
import { setSignIn, useUI } from '../lib/ui';
import { notes } from '../lib/demo';

type Tab = { to: string; icon: string; ca: string; es: string; match: (p: string) => boolean; ai?: boolean };
const tabs: Tab[] = [
  { to: '/', icon: 'House', ca: 'Inici', es: 'Inicio', match: (p) => p === '/' },
  { to: '/agenda', icon: 'CalendarDays', ca: 'Agenda', es: 'Agenda', match: (p) => p.startsWith('/agenda') },
  { to: '/pregunta', icon: 'Sparkles', ca: 'Pregunta', es: 'Pregunta', match: (p) => p.startsWith('/pregunta'), ai: true },
  { to: '/comunitat', icon: 'Users', ca: 'Comunitat', es: 'Comunidad', match: (p) => p.startsWith('/comunitat') },
  { to: '/poble', icon: 'LayoutGrid', ca: 'El poble', es: 'El pueblo', match: (p) => p.startsWith('/poble') || p.startsWith('/negocis') },
];

const rail = [
  { to: '/', icon: 'House', ca: 'Inici', es: 'Inicio', tone: 'accent' },
  { to: '/agenda', icon: 'CalendarDays', ca: 'Agenda', es: 'Agenda', tone: 'sun' },
  { to: '/comunitat', icon: 'Users', ca: 'Comunitat', es: 'Comunidad', tone: 'coral' },
  { to: '/comunitat/veu', icon: 'Vote', ca: 'La veu del poble', es: 'La voz del pueblo', tone: 'mint' },
  { to: '/poble/comerc', icon: 'Store', ca: 'Comerç', es: 'Comercio', tone: 'coral' },
  { to: '/poble/tramits', icon: 'FileText', ca: 'Tràmits', es: 'Trámites', tone: 'lilac' },
  { to: '/poble/benvinguda', icon: 'Hand', ca: 'Nou al poble', es: 'Nuevo en el pueblo', tone: 'sky' },
  { to: '/poble/descobreix', icon: 'Compass', ca: 'Visita’ns', es: 'Visítanos', tone: 'mint' },
];

/** Títol curt per a la barra superior segons la ruta. */
function titleFor(p: string, t: (ca: string, es: string) => string): string {
  if (p.startsWith('/agenda/')) return t('Activitat', 'Actividad');
  if (p.startsWith('/agenda')) return 'Agenda';
  if (p.startsWith('/pregunta')) return t('Pregunta a Súria', 'Pregunta a Súria');
  if (p.startsWith('/comunitat/veu')) return t('La veu del poble', 'La voz del pueblo');
  if (p.startsWith('/comunitat')) return t('Comunitat', 'Comunidad');
  if (p.startsWith('/poble/comerc/')) return t('Comerç', 'Comercio');
  if (p.startsWith('/poble/comerc')) return t('Comerç', 'Comercio');
  if (p.startsWith('/poble/tramits')) return t('Tràmits', 'Trámites');
  if (p.startsWith('/poble/incidencia')) return t('Avisa d’una incidència', 'Avisa de una incidencia');
  if (p.startsWith('/poble/benvinguda')) return t('Nou al poble', 'Nuevo en el pueblo');
  if (p.startsWith('/poble/descobreix')) return t('Visita’ns', 'Visítanos');
  if (p.startsWith('/poble')) return t('El poble', 'El pueblo');
  if (p.startsWith('/negocis')) return t('Per a negocis', 'Para negocios');
  if (p.startsWith('/jo')) return t('El meu compte', 'Mi cuenta');
  if (p.startsWith('/entrar')) return t('Entra', 'Entra');
  if (p.startsWith('/avisos')) return t('Avisos', 'Avisos');
  return '';
}
const parentOf = (p: string) => {
  const parts = p.split('/').filter(Boolean);
  if (parts.length < 2) return null;
  if (p.startsWith('/agenda/')) return '/agenda';
  if (p.startsWith('/poble/comerc/')) return '/poble/comerc';
  if (p.startsWith('/comunitat/')) return '/comunitat';
  if (p.startsWith('/poble/')) return '/poble';
  return null;
};

function TopBar() {
  const t = useT();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lang = useStore((s) => s.prefs.lang);
  const read = useStore((s) => s.readNotes);
  const unread = notes.some((n) => !read[n.id]);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 6);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [pathname]);
  const home = pathname === '/';
  const parent = parentOf(pathname);
  const title = titleFor(pathname, t);

  return (
    <header className="top" data-solid={solid || !home}>
      <div className="wrap top__in">
        {parent ? (
          <button className="icon-btn" style={{ marginLeft: '-0.5rem' }} onClick={() => (history.length > 1 ? navigate(-1) : navigate(parent))} aria-label={t('Enrere', 'Atrás')}>
            <Icon name="ArrowLeft" size={22} />
          </button>
        ) : (
          <Brand compact={!home} />
        )}
        {!home && <span className="top__title">{title}</span>}
        <div className="top__end">
          <button className="lang-btn" onClick={() => setPrefs({ lang: lang === 'ca' ? 'es' : 'ca' })} aria-label={lang === 'ca' ? 'Cambiar a castellano' : 'Canviar a català'} lang={lang === 'ca' ? 'es' : 'ca'}>
            {lang === 'ca' ? 'ES' : 'CA'}
          </button>
          <Link to="/avisos" className="icon-btn" aria-label={unread ? t('Avisos (n’hi ha de nous)', 'Avisos (hay nuevos)') : t('Avisos', 'Avisos')}>
            <Icon name="Bell" size={21} />
            {unread && <span className="dot" />}
          </Link>
          <Link to="/jo" className="icon-btn" aria-label={t('El meu compte', 'Mi cuenta')}><Me /></Link>
        </div>
      </div>
    </header>
  );
}

function BottomBar() {
  const t = useT();
  const { pathname } = useLocation();
  return (
    <nav className="bar" aria-label={t('Navegació principal', 'Navegación principal')}>
      {tabs.map((tab) => {
        const on = tab.match(pathname);
        if (tab.ai)
          return (
            <Link key={tab.to} to={tab.to} className="bar__item" aria-current={on ? 'page' : undefined} aria-label={t('Pregunta a Súria', 'Pregunta a Súria')}>
              <span className="bar__ai"><Icon name="Sparkles" size={24} /></span>
            </Link>
          );
        return (
          <Link key={tab.to} to={tab.to} className="bar__item" aria-current={on ? 'page' : undefined}>
            {on && <motion.span layoutId="bar-pill" className="bar__pill" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
            <Icon name={tab.icon} size={22} strokeWidth={on ? 2.2 : 1.8} />
            {t(tab.ca, tab.es)}
          </Link>
        );
      })}
    </nav>
  );
}

function Rail() {
  const t = useT();
  const user = useStore((s) => s.user);
  return (
    <aside className="rail" aria-label={t('Navegació principal', 'Navegación principal')}>
      <Brand />
      <Link to="/pregunta" className="rail__ask"><Icon name="Sparkles" size={20} />{t('Pregunta a Súria', 'Pregunta a Súria')}<kbd>/</kbd></Link>
      <nav className="rail__nav">
        {rail.map((r) => (
          <NavLink key={r.to} to={r.to} end className="rail__link" data-tone={r.tone}>
            <Icon name={r.icon} size={20} />{t(r.ca, r.es)}<span className="chip-tone" />
          </NavLink>
        ))}
        <p className="rail__label">{t('Més', 'Más')}</p>
        <NavLink to="/negocis" className="rail__link"><Icon name="Briefcase" size={20} />{t('Per a negocis', 'Para negocios')}</NavLink>
        <NavLink to="/poble" end className="rail__link"><Icon name="LayoutGrid" size={20} />{t('Tot el poble', 'Todo el pueblo')}</NavLink>
      </nav>
      <div className="rail__foot">
        <Link to="/jo" className="rail__me">
          <Me />
          <span><strong>{user ? user.name : t('Entra o crea un compte', 'Entra o crea una cuenta')}</strong><small>{user ? t('El meu compte', 'Mi cuenta') : t('Per participar', 'Para participar')}</small></span>
        </Link>
      </div>
    </aside>
  );
}

function SignInSheet() {
  const t = useT();
  const open = useUI((u) => u.signIn);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setSignIn(false);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSignIn(false)} />
          <motion.div className="sheet" role="dialog" aria-modal="true" aria-labelledby="si-t" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ type: 'spring', stiffness: 420, damping: 36 }}>
            <div className="sheet__grab" />
            <div className="sheet__head">
              <div>
                <p className="eyebrow">{t('Un moment', 'Un momento')}</p>
                <h2 id="si-t" className="h1" style={{ fontSize: 'var(--fs-36)', marginTop: '.25rem' }}>{t('Entra per', 'Entra para')} <em>{t('participar', 'participar')}</em></h2>
              </div>
              <button className="icon-btn" onClick={() => setSignIn(false)} aria-label={t('Tanca', 'Cierra')} autoFocus><Icon name="X" /></button>
            </div>
            <p className="muted">{t('Llegir-ho tot és lliure. Amb un compte pots apuntar-te, donar les gràcies, publicar i votar propostes. Sense contrasenyes.', 'Leerlo todo es libre. Con una cuenta puedes apuntarte, dar las gracias, publicar y votar propuestas. Sin contraseñas.')}</p>
            <div style={{ display: 'grid', gap: '.625rem', marginTop: '1.25rem' }}>
              <button className="btn btn--accent btn--lg btn--block" onClick={() => { setSignIn(false); navigate(`/entrar?tornar=${encodeURIComponent(pathname)}`); }}>
                <Icon name="Mail" size={20} />{t('Continua amb el correu', 'Continúa con el correo')}
              </button>
              <button className="btn btn--line btn--block" onClick={() => setSignIn(false)}>{t('Ara no', 'Ahora no')}</button>
            </div>
            <p className="hint" style={{ marginTop: '1rem', display: 'flex', gap: '.5rem', justifyContent: 'center', alignItems: 'center' }}><Icon name="Lock" size={14} />{t('Mai mostrem el teu correu.', 'Nunca mostramos tu correo.')}</p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Toast() {
  const toast = useUI((u) => u.toast);
  return (
    <div aria-live="polite" role="status">
      <AnimatePresence>
        {toast && (
          <motion.div key={toast.id} className="toast" initial={{ opacity: 0, y: 16, x: '-50%', scale: 0.96 }} animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }} exit={{ opacity: 0, y: 8, x: '-50%' }} transition={{ type: 'spring', stiffness: 500, damping: 34 }}>
            <Icon name="Check" size={18} />{toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const t = useT();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lang = useStore((s) => s.prefs.lang);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      if ((e.target as HTMLElement).closest('input, textarea, select, [contenteditable]')) return;
      e.preventDefault();
      const box = document.querySelector<HTMLTextAreaElement>('[data-ask-input]');
      if (box) box.focus(); else navigate('/pregunta');
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [navigate]);

  return (
    <>
      <a className="skip" href="#main">{t('Salta al contingut', 'Salta al contenido')}</a>
      <div className="app">
        <Rail />
        <div style={{ minWidth: 0 }}>
          <TopBar />
          <main id="main" className="main" tabIndex={-1}>
            <motion.div key={pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
              {children}
            </motion.div>
          </main>
        </div>
      </div>
      <BottomBar />
      <SignInSheet />
      <Toast />
    </>
  );
}
