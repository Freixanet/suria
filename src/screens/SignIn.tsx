import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Icon } from '../components/Icon';
import { Logo } from '../components/Bits';
import { useT } from '../lib/i18n';
import { initialsOf, setState, useStore, type Role } from '../lib/store';
import { toast } from '../lib/ui';

const TONES = ['coral', 'sun', 'mint', 'lilac', 'sky'];

export default function SignIn() {
  const t = useT();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const user = useStore((s) => s.user);
  const prefs = useStore((s) => s.prefs);
  const [step, setStep] = useState<'email' | 'code' | 'profile'>('email');
  const [email, setEmail] = useState('');
  const [err, setErr] = useState(false);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('resident');
  const [hood, setHood] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [text, setText] = useState(prefs.text);
  const [seconds, setSeconds] = useState(30);
  const boxes = useRef<(HTMLInputElement | null)[]>([]);
  const back = params.get('tornar');

  useEffect(() => { if (user && step === 'email') navigate('/jo', { replace: true }); }, [user, step, navigate]);
  useEffect(() => {
    if (step !== 'code') return;
    setSeconds(30);
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    boxes.current[0]?.focus();
    return () => clearInterval(id);
  }, [step]);
  useEffect(() => { if (code.every(Boolean)) setTimeout(() => setStep('profile'), 250); }, [code]);

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, '');
    if (d.length > 1) { const arr = d.slice(0, 6).split(''); setCode([...arr, ...Array(6 - arr.length).fill('')]); boxes.current[Math.min(arr.length, 5)]?.focus(); return; }
    const next = [...code]; next[i] = d; setCode(next);
    if (d && i < 5) boxes.current[i + 1]?.focus();
  };

  const roles: { id: Role; icon: string; tone: string; ca: [string, string]; es: [string, string] }[] = [
    { id: 'resident', icon: 'House', tone: 'accent', ca: ['Hi visc de fa temps', 'Vull estar al dia i participar'], es: ['Vivo aquí desde hace tiempo', 'Quiero estar al día y participar'] },
    { id: 'newcomer', icon: 'Hand', tone: 'sky', ca: ['Acabo d’arribar', 'Fa menys de dos anys que hi visc'], es: ['Acabo de llegar', 'Hace menos de dos años que vivo aquí'] },
    { id: 'business', icon: 'Store', tone: 'coral', ca: ['Tinc un negoci', 'Vull que el poble em trobi'], es: ['Tengo un negocio', 'Quiero que el pueblo me encuentre'] },
    { id: 'visitor', icon: 'Compass', tone: 'mint', ca: ['Estic de visita', 'Vull conèixer el poble amb calma'], es: ['Estoy de visita', 'Quiero conocer el pueblo con calma'] },
  ];
  const tags = [t('Cultura', 'Cultura'), t('Gent gran', 'Mayores'), t('Famílies', 'Familias'), t('Natura i esport', 'Naturaleza y deporte'), t('Voluntariat', 'Voluntariado'), t('Comerç local', 'Comercio local'), t('Història', 'Historia')];

  const finish = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return;
    setState((s) => ({
      ...s,
      user: { name: name.trim(), email: email || 'tu@correu.cat', initials: initialsOf(name), tone: TONES[name.trim().length % TONES.length], role, interests, neighbourhood: hood, since: new Date().toISOString() },
      prefs: { ...s.prefs, text },
    }));
    toast(t(`Benvingut/da, ${name.trim().split(' ')[0]}!`, `¡Te damos la bienvenida, ${name.trim().split(' ')[0]}!`));
    navigate(back && back.startsWith('/') ? back : role === 'newcomer' ? '/poble/benvinguda' : role === 'business' ? '/negocis' : '/', { replace: true });
  };

  return (
    <div className="wrap auth">
      <AnimatePresence mode="wait">
        {step === 'email' && (
          <motion.section key="e" className="auth__step" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <Logo className="auth__mark" />
            <h1 className="h1">{t('Entra a', 'Entra en')} <em style={{ color: 'var(--accent)' }}>Súria</em></h1>
            <p className="muted">{t('Sense contrasenyes: t’enviem un codi al correu. Llegir-ho tot és lliure; el compte és per participar.', 'Sin contraseñas: te enviamos un código al correo. Leerlo todo es libre; la cuenta es para participar.')}</p>
            <form noValidate onSubmit={(e) => { e.preventDefault(); if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setErr(true); return; } setErr(false); setStep('code'); }} style={{ display: 'grid', gap: '.875rem' }}>
              <div className="field">
                <label className="label" htmlFor="em">{t('Correu electrònic', 'Correo electrónico')}</label>
                <input id="em" className="input" type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nom@correu.cat" aria-invalid={err} aria-describedby={err ? 'em-err' : undefined} autoFocus />
                {err && <p className="error" id="em-err">{t('Revisa el correu: sembla que hi falta alguna cosa.', 'Revisa el correo: parece que falta algo.')}</p>}
              </div>
              <button className="btn btn--accent btn--lg btn--block">{t('Envia’m el codi', 'Envíame el código')}</button>
            </form>
            <p className="divider">{t('o', 'o')}</p>
            <div style={{ display: 'grid', gap: '.5rem' }}>
              <button className="btn btn--line btn--block" onClick={() => { setEmail('privat@icloud.com'); setStep('profile'); }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.4 12.7c0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.8-1.1-2.9-4.1ZM13.9 5.2c.7-.9 1.2-2 1-3.2-1 .1-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.1 1.1.1 2.3-.6 3.1-1.5Z" /></svg>
                {t('Continua amb Apple', 'Continúa con Apple')}
              </button>
              <button className="btn btn--line btn--block" onClick={() => { setEmail('tu@gmail.com'); setStep('profile'); }}>
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3Z" /><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z" /><path fill="#FBBC05" d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2L6.4 14Z" /><path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.4L6.4 10C7.2 7.7 9.4 6 12 6Z" /></svg>
                {t('Continua amb Google', 'Continúa con Google')}
              </button>
            </div>
            <p className="hint center"><Icon name="Lock" size={14} />{t('Prototip: no s’envia cap correu ni surt cap dada del dispositiu.', 'Prototipo: no se envía ningún correo ni sale ningún dato del dispositivo.')}</p>
          </motion.section>
        )}

        {step === 'code' && (
          <motion.section key="c" className="auth__step" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
            <button className="icon-btn" style={{ marginLeft: '-.5rem' }} onClick={() => setStep('email')} aria-label={t('Enrere', 'Atrás')}><Icon name="ArrowLeft" /></button>
            <h1 className="h1">{t('Mira el', 'Mira el')} <em style={{ color: 'var(--accent)' }}>{t('correu', 'correo')}</em></h1>
            <p className="muted">{t('Hem enviat un codi de 6 xifres a', 'Hemos enviado un código de 6 cifras a')} <strong style={{ color: 'var(--ink)' }}>{email}</strong>.</p>
            <fieldset>
              <legend className="sr-only">{t('Codi de verificació', 'Código de verificación')}</legend>
              <div className="otp">
                {code.map((c, i) => (
                  <input key={i} ref={(el) => { boxes.current[i] = el; }} value={c} inputMode="numeric" autoComplete={i === 0 ? 'one-time-code' : 'off'} maxLength={i === 0 ? 6 : 1}
                    aria-label={t(`Xifra ${i + 1}`, `Cifra ${i + 1}`)} onChange={(e) => setDigit(i, e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Backspace' && !c && i > 0) boxes.current[i - 1]?.focus(); }} />
                ))}
              </div>
            </fieldset>
            <p className="hint">{t('Demostració: qualsevol codi de 6 xifres funciona.', 'Demostración: cualquier código de 6 cifras funciona.')}</p>
            <button className="btn btn--line btn--block" disabled={seconds > 0} onClick={() => { setSeconds(30); toast(t('Codi reenviat', 'Código reenviado')); }}>
              {seconds > 0 ? t(`Torna a enviar-lo en ${seconds} s`, `Vuelve a enviarlo en ${seconds} s`) : t('Torna a enviar el codi', 'Vuelve a enviar el código')}
            </button>
          </motion.section>
        )}

        {step === 'profile' && (
          <motion.form key="p" className="auth__step" onSubmit={finish} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} noValidate>
            <p className="eyebrow">{t('Últim pas', 'Último paso')}</p>
            <h1 className="h1">{t('Com et diuen', '¿Cómo te llaman')} <em style={{ color: 'var(--accent)' }}>{t('els veïns?', 'los vecinos?')}</em></h1>
            <div className="field">
              <label className="label" htmlFor="nm">{t('Nom i cognom', 'Nombre y apellido')}</label>
              <input id="nm" className="input" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('Per exemple, Marta Puig', 'Por ejemplo, Marta Puig')} autoFocus />
              <p className="hint">{t('A la comunitat es veu el nom i la inicial del cognom.', 'En la comunidad se ve el nombre y la inicial del apellido.')}</p>
            </div>
            <fieldset>
              <legend className="label" style={{ marginBottom: '.5rem' }}>{t('Què et descriu millor?', '¿Qué te describe mejor?')}</legend>
              <div className="roles">
                {roles.map((r) => (
                  <label key={r.id} data-tone={r.tone}>
                    <input type="radio" name="role" checked={role === r.id} onChange={() => setRole(r.id)} />
                    <span className="row__ico"><Icon name={r.icon} /></span>
                    <span><strong>{t(r.ca[0], r.es[0])}</strong><small>{t(r.ca[1], r.es[1])}</small></span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="field">
              <label className="label" htmlFor="hd">{t('Barri (opcional)', 'Barrio (opcional)')}</label>
              <input id="hd" className="input" value={hood} onChange={(e) => setHood(e.target.value)} placeholder={t('T’ensenyarem primer el que passa a prop', 'Te enseñaremos primero lo que pasa cerca')} />
            </div>
            <fieldset>
              <legend className="label" style={{ marginBottom: '.5rem' }}>{t('Què t’interessa? (opcional)', '¿Qué te interesa? (opcional)')}</legend>
              <div className="pick pick--ink">
                {tags.map((x) => <label key={x}><input type="checkbox" checked={interests.includes(x)} onChange={(e) => setInterests(e.target.checked ? [...interests, x] : interests.filter((y) => y !== x))} /><span>{x}</span></label>)}
              </div>
            </fieldset>
            <fieldset>
              <legend className="label" style={{ marginBottom: '.5rem' }}>{t('Mida del text', 'Tamaño del texto')}</legend>
              <div className="sizes">
                {(['m', 'l', 'xl'] as const).map((s, i) => <label key={s} style={{ fontSize: `${1 + i * 0.25}rem` }}><input type="radio" name="sz" checked={text === s} onChange={() => { setText(s); document.documentElement.dataset.text = s; if (s === 'm') delete document.documentElement.dataset.text; }} />Aa</label>)}
              </div>
            </fieldset>
            <button className="btn btn--accent btn--lg btn--block" disabled={name.trim().length < 2}>{t('Comença', 'Empieza')}</button>
            <p className="hint">{t('En crear el compte acceptes les normes de convivència. El pots esborrar quan vulguis.', 'Al crear la cuenta aceptas las normas de convivencia. Puedes borrarla cuando quieras.')}</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
