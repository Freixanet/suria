import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { Icon } from './Icon';
import { useT } from '../lib/i18n';
import { useStore } from '../lib/store';

export function Logo({ className = 'brand__mark' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="18" fill="var(--accent)" />
      <circle cx="32" cy="25" r="9" fill="#FFD84D" />
      <path d="M10 44c5.5 0 5.5-4 11-4s5.5 4 11 4 5.5-4 11-4 5.5 4 11 4" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function Brand({ to = '/', compact }: { to?: string; compact?: boolean }) {
  return (
    <Link to={to} className="brand" aria-label="Súria, inici">
      <Logo />
      {!compact && <span className="brand__word">Súria</span>}
    </Link>
  );
}

/** Marca de contingut d'exemple: sempre visible al costat de dades no reals. */
export function Demo() {
  const t = useT();
  return <span className="demo" title={t('Contingut d’exemple del prototip', 'Contenido de ejemplo del prototipo')}>{t('Exemple', 'Ejemplo')}</span>;
}

export function Avatar({ initials, tone = 'accent', size, guest }: { initials?: string; tone?: string; size?: 'sm' | 'lg' | 'xl'; guest?: boolean }) {
  return (
    <span className={`avatar ${size ? `avatar--${size}` : ''} ${guest ? 'avatar--guest' : ''}`} data-tone={tone} aria-hidden="true">
      {guest ? <Icon name="CircleUser" size={18} /> : initials}
    </span>
  );
}

export function Me({ size }: { size?: 'sm' | 'lg' | 'xl' }) {
  const u = useStore((s) => s.user);
  return u ? <Avatar initials={u.initials} tone={u.tone} size={size} /> : <Avatar guest size={size} />;
}

export function SecHead({ title, to, link, children, id }: { title: ReactNode; to?: string; link?: string; children?: ReactNode; id?: string }) {
  return (
    <div className="sec-head">
      <div className="sec-head__l">
        <h2 className="h2" id={id}>{title}</h2>
        {children}
      </div>
      {to && link && <Link to={to}>{link}<Icon name="ChevronRight" size={18} /></Link>}
    </div>
  );
}

export function Faces({ list }: { list: [string, string][] }) {
  return (
    <span className="faces" aria-hidden="true">
      {list.map(([i, tone]) => <span key={i} className="avatar" data-tone={tone}>{i}</span>)}
    </span>
  );
}
