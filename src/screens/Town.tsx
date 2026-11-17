import { Link } from 'react-router';
import { Icon } from '../components/Icon';
import { useT } from '../lib/i18n';
import { setPrefs, useStore } from '../lib/store';

export default function Town() {
  const t = useT();
  const prefs = useStore((s) => s.prefs);
  const tiles = [
    { to: '/poble/comerc', icon: 'Store', tone: 'coral', ca: ['Comerç', 'Què és obert, ofertes i el Carnet Súria'], es: ['Comercio', 'Qué está abierto, ofertas y el Carnet Súria'] },
    { to: '/poble/tramits', icon: 'FileText', tone: 'lilac', ca: ['Tràmits', 'Explicats en dues frases, pas a pas'], es: ['Trámites', 'Explicados en dos frases, paso a paso'] },
    { to: '/poble/incidencia', icon: 'Siren', tone: 'coral', ca: ['Avisa d’una incidència', 'Fanals, voreres, brutícia'], es: ['Avisa de una incidencia', 'Farolas, aceras, suciedad'] },
    { to: '/poble/benvinguda', icon: 'Hand', tone: 'sky', ca: ['Nou al poble', 'Els primers 30 dies'], es: ['Nuevo en el pueblo', 'Los primeros 30 días'] },
    { to: '/comunitat/veu', icon: 'Vote', tone: 'mint', ca: ['La veu del poble', 'Propostes i enquestes'], es: ['La voz del pueblo', 'Propuestas y encuestas'] },
    { to: '/poble/descobreix', icon: 'Compass', tone: 'sun', ca: ['Visita’ns', 'Per a qui ve de fora, amb calma'], es: ['Visítanos', 'Para quien viene de fuera, con calma'] },
  ];
  return (
    <div className="wrap">
      <header className="page-head">
        <p className="eyebrow">Súria</p>
        <h1 className="h1" style={{ marginTop: '.5rem' }}>{t('Tot el', 'Todo el')} <em style={{ color: 'var(--accent)' }}>{t('poble', 'pueblo')}</em></h1>
      </header>
      <nav className="tiles" aria-label={t('Seccions', 'Secciones')}>
        {tiles.map((x) => (
          <Link key={x.to} to={x.to} className="tile" data-tone={x.tone}>
            <span className="tile__ico"><Icon name={x.icon} size={24} /></span>
            <span><strong>{t(x.ca[0], x.es[0])}</strong><small>{t(x.ca[1], x.es[1])}</small></span>
          </Link>
        ))}
      </nav>

      <section className="section" aria-labelledby="tel">
        <h2 className="h2" id="tel" style={{ marginBottom: '1rem' }}>{t('Telèfons que cal tenir a mà', 'Teléfonos que hay que tener a mano')}</h2>
        <div className="phones">
          <a href="tel:112" data-tone="coral"><b>112</b><span>{t('Emergències', 'Emergencias')}</span></a>
          <a href="tel:061" data-tone="sky"><b>061</b><span>{t('Salut Respon', 'Salud Responde')}</span></a>
          <a href="tel:012" data-tone="lilac"><b>012</b><span>{t('Generalitat', 'Generalitat')}</span></a>
          <a href="tel:016" data-tone="mint"><b>016</b><span>{t('Violència masclista', 'Violencia machista')}</span></a>
        </div>
      </section>

      <section className="section" aria-labelledby="llegir">
        <h2 className="h2" id="llegir" style={{ marginBottom: '.5rem' }}>{t('Llegir còmode', 'Leer cómodo')}</h2>
        <div className="card" style={{ paddingBlock: '.25rem' }}>
          <div className="setting setting--wrap">
            <span className="setting__l"><strong>{t('Mida del text', 'Tamaño del texto')}</strong><small>{t('A tota l’app, sense haver d’entrar', 'En toda la app, sin tener que entrar')}</small></span>
            <div className="seg" role="group" aria-label={t('Mida del text', 'Tamaño del texto')}>
              {(['m', 'l', 'xl'] as const).map((s, i) => <button key={s} aria-pressed={prefs.text === s} onClick={() => setPrefs({ text: s })} style={{ fontSize: `${1 + i * 0.15}rem` }}>A</button>)}
            </div>
          </div>
          <label className="setting" htmlFor="hc">
            <span className="setting__l"><strong>{t('Contrast alt', 'Contraste alto')}</strong><small>{t('Vores i text més marcats', 'Bordes y texto más marcados')}</small></span>
            <span className="switch"><input id="hc" type="checkbox" checked={prefs.contrast} onChange={(e) => setPrefs({ contrast: e.target.checked })} /><span /></span>
          </label>
        </div>
      </section>

      <section className="section" id="com-funciona" aria-labelledby="cf" style={{ marginBottom: '1rem' }}>
        <h2 className="h2" id="cf" style={{ marginBottom: '1rem' }}>{t('Com funciona Súria', 'Cómo funciona Súria')}</h2>
        <div className="promise">
          <div><Icon name="Shield" size={22} /><strong>{t('Independent', 'Independiente')}</strong><p>{t('No som l’Ajuntament: t’hi portem amb un toc quan un tràmit és seu, i hi presentem les propostes del poble.', 'No somos el Ayuntamiento: te llevamos con un toque cuando un trámite es suyo, y le presentamos las propuestas del pueblo.')}</p></div>
          <div><Icon name="BadgeCheck" size={22} /><strong>{t('Real o exemple, sempre dit', 'Real o ejemplo, siempre dicho')}</strong><p>{t('En aquest prototip, tot el contingut és de mostra i ho indica. Les dades oficials portaran sempre la seva font.', 'En este prototipo, todo el contenido es de muestra y lo indica. Los datos oficiales llevarán siempre su fuente.')}</p></div>
          <div><Icon name="Coins" size={22} /><strong>{t('Com ens financem', 'Cómo nos financiamos')}</strong><p>{t('Els comerços paguen per eines i visibilitat, sempre etiquetada. Mai venem dades ni posem anuncis que et segueixin.', 'Los comercios pagan por herramientas y visibilidad, siempre etiquetada. Nunca vendemos datos ni ponemos anuncios que te sigan.')} <Link to="/negocis">{t('Per a negocis', 'Para negocios')}</Link></p></div>
        </div>
      </section>
    </div>
  );
}
