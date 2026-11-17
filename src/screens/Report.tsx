import { useState } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Icon } from '../components/Icon';
import { Demo } from '../components/Bits';
import { ago, useLang, useT } from '../lib/i18n';
import { setState, uid, useStore } from '../lib/store';
import { needsSignIn, toast } from '../lib/ui';

const kinds = [
  { id: 'llum', icon: 'Lightbulb', tone: 'sun', ca: 'Enllumenat', es: 'Alumbrado' },
  { id: 'via', icon: 'Route', tone: 'stone', ca: 'Vorera o carrer', es: 'Acera o calle' },
  { id: 'net', icon: 'Recycle', tone: 'mint', ca: 'Brutícia o contenidors', es: 'Suciedad o contenedores' },
  { id: 'aigua', icon: 'Droplets', tone: 'sky', ca: 'Aigua o fuita', es: 'Agua o fuga' },
  { id: 'parc', icon: 'Trees', tone: 'mint', ca: 'Parc o mobiliari', es: 'Parque o mobiliario' },
  { id: 'altres', icon: 'Flag', tone: 'lilac', ca: 'Una altra cosa', es: 'Otra cosa' },
];

export default function Report() {
  const t = useT();
  const lang = useLang();
  const reports = useStore((s) => s.reports);
  const [step, setStep] = useState(0);
  const [kind, setKind] = useState<string | null>(null);
  const [where, setWhere] = useState('');
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const steps = [t('Què passa?', '¿Qué pasa?'), t('On és?', '¿Dónde está?'), t('Explica-ho', 'Explícalo')];

  const locate = () => {
    if (!navigator.geolocation) { toast(t('No podem saber on ets', 'No podemos saber dónde estás')); return; }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (p) => { setWhere(`${p.coords.latitude.toFixed(5)}, ${p.coords.longitude.toFixed(5)}`); setLocating(false); },
      () => { setLocating(false); toast(t('Escriu l’adreça a mà', 'Escribe la dirección a mano')); },
      { timeout: 8000 },
    );
  };
  const submit = () => {
    if (needsSignIn()) return;
    setState((s) => ({ ...s, reports: [{ id: uid(), kind: kind!, where, text, at: Date.now(), status: 'rebuda' }, ...s.reports] }));
    setStep(3);
  };

  return (
    <div className="wrap narrow" style={{ paddingBottom: '2rem' }}>
      <header className="page-head" data-tone="coral">
        <p className="eyebrow">{t('En un minut', 'En un minuto')}</p>
        <h1 className="h1" style={{ marginTop: '.5rem' }}>{t('Avisa d’una', 'Avisa de una')} <em className="tone-em">{t('incidència', 'incidencia')}</em></h1>
        <p className="lead">{t('Un fanal fos, una vorera trencada, un contenidor ple. Ho fem arribar a qui ho ha d’arreglar i et diem quan està fet.', 'Una farola fundida, una acera rota, un contenedor lleno. Lo hacemos llegar a quien lo tiene que arreglar y te decimos cuándo está hecho.')}</p>
      </header>

      {step < 3 && (
        <ol className="stepper" aria-label={t('Passos', 'Pasos')}>
          {steps.map((s, i) => <li key={s} aria-current={i === step ? 'step' : undefined} data-done={i < step || undefined}><span>{i < step ? <Icon name="Check" size={14} /> : i + 1}</span>{s}</li>)}
        </ol>
      )}

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
          {step === 0 && (
            <div className="kinds">
              {kinds.map((k) => (
                <button key={k.id} className="kind" data-tone={k.tone} aria-pressed={kind === k.id} onClick={() => { setKind(k.id); setStep(1); }}>
                  <span className="row__ico"><Icon name={k.icon} /></span>{t(k.ca, k.es)}
                </button>
              ))}
            </div>
          )}
          {step === 1 && (
            <div style={{ display: 'grid', gap: '1rem' }}>
              <button className="btn btn--soft btn--lg btn--block" onClick={locate} disabled={locating}><Icon name="Navigation" size={18} />{locating ? t('Buscant…', 'Buscando…') : t('Fes servir la meva ubicació', 'Usa mi ubicación')}</button>
              <div className="field">
                <label className="label" htmlFor="w">{t('O escriu on és', 'O escribe dónde está')}</label>
                <input id="w" className="input" value={where} onChange={(e) => setWhere(e.target.value)} placeholder={t('Carrer, número o un lloc conegut', 'Calle, número o un sitio conocido')} />
              </div>
              <div style={{ display: 'flex', gap: '.5rem' }}>
                <button className="btn btn--line" onClick={() => setStep(0)}>{t('Enrere', 'Atrás')}</button>
                <button className="btn btn--accent" style={{ flex: 1 }} disabled={where.trim().length < 3} onClick={() => setStep(2)}>{t('Continua', 'Continúa')}</button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div style={{ display: 'grid', gap: '1rem' }}>
              <label className="photo" data-has={photo ? true : undefined}>
                <input type="file" accept="image/*" capture="environment" onChange={(e) => { const f = e.target.files?.[0]; if (f) setPhoto(URL.createObjectURL(f)); }} />
                {photo ? <img src={photo} alt={t('Foto de la incidència', 'Foto de la incidencia')} /> : <><Icon name="Camera" size={28} /><span>{t('Afegeix una foto (opcional)', 'Añade una foto (opcional)')}</span></>}
              </label>
              <div className="field">
                <label className="label" htmlFor="d">{t('Què hi ha? (opcional)', '¿Qué hay? (opcional)')}</label>
                <textarea id="d" className="input" rows={3} value={text} onChange={(e) => setText(e.target.value)} maxLength={300} placeholder={t('Per exemple: fa tres dies que no s’encén', 'Por ejemplo: hace tres días que no se enciende')} />
              </div>
              <p className="hint">{t('No hi surtis tu ni ningú: només la incidència.', 'Que no salgas tú ni nadie: solo la incidencia.')}</p>
              <div style={{ display: 'flex', gap: '.5rem' }}>
                <button className="btn btn--line" onClick={() => setStep(1)}>{t('Enrere', 'Atrás')}</button>
                <button className="btn btn--accent" style={{ flex: 1 }} onClick={submit}><Icon name="Send" size={18} />{t('Envia l’avís', 'Envía el aviso')}</button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="done card">
              <motion.span className="done__ok" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}><Icon name="Check" size={34} /></motion.span>
              <h2 className="h1" style={{ fontSize: 'var(--fs-36)' }}>{t('Gràcies! Avís', '¡Gracias! Aviso')} <em>{t('rebut', 'recibido')}</em></h2>
              <p className="muted">{t('Et notificarem quan l’hagin vist i quan estigui resolt.', 'Te notificaremos cuando lo hayan visto y cuando esté resuelto.')}</p>
              <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button className="btn btn--line" onClick={() => { setStep(0); setKind(null); setWhere(''); setText(''); setPhoto(null); }}>{t('Avisa d’una altra', 'Avisa de otra')}</button>
                <Link className="btn btn--accent" to="/">{t('Torna a l’inici', 'Vuelve al inicio')}</Link>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {reports.length > 0 && (
        <section className="section" aria-labelledby="mine">
          <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', marginBottom: '.75rem' }}><h2 className="h2" id="mine">{t('Els meus avisos', 'Mis avisos')}</h2><Demo /></div>
          <div className="card list" style={{ paddingBlock: '.25rem' }}>
            {reports.map((r) => {
              const k = kinds.find((x) => x.id === r.kind) ?? kinds[5];
              return (
                <div key={r.id} className="row" data-tone={k.tone}>
                  <span className="row__ico"><Icon name={k.icon} /></span>
                  <span className="row__body"><span className="row__title">{t(k.ca, k.es)}</span><span className="row__sub">{r.where} · {ago(r.at, lang)}</span></span>
                  <span className="tag tag--plain">{t('Rebuda', 'Recibida')}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
