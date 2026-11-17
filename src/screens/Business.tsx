import { Link } from 'react-router';
import { Icon } from '../components/Icon';
import { useT } from '../lib/i18n';
import { toast } from '../lib/ui';

export default function Business() {
  const t = useT();
  const plans = [
    { id: 'fitxa', hi: false, price: '0 €', per: '', name: t('Fitxa', 'Ficha'), desc: t('Perquè et trobin. Gratuïta per sempre.', 'Para que te encuentren. Gratis para siempre.'),
      items: [t('Fitxa amb ofici, serveis i horari', 'Ficha con oficio, servicios y horario'), t('Canvia l’horari amb un WhatsApp', 'Cambia el horario con un WhatsApp'), t('Apareixes al cercador i a «Pregunta a Súria»', 'Apareces en el buscador y en «Pregunta a Súria»'), t('Avís quan un veí detecta una dada errònia', 'Aviso cuando un vecino detecta un dato erróneo')],
      cta: t('Crea la fitxa', 'Crea la ficha') },
    { id: 'viva', hi: true, price: '19 €', per: t('/mes', '/mes'), name: t('Botiga viva', 'Tienda viva'), desc: t('Per als qui volen que el poble torni a comprar a prop.', 'Para quienes quieren que el pueblo vuelva a comprar cerca.'),
      items: [t('Tot el de la Fitxa', 'Todo lo de la Ficha'), t('Ofertes setmanals a Comerç i a l’inici', 'Ofertas semanales en Comercio y en el inicio'), t('Entra al Carnet Súria: clients que tornen', 'Entra en el Carnet Súria: clientes que vuelven'), t('Estat del dia en directe («avui hi ha pa de pagès»)', 'Estado del día en directo («hoy hay pan de payés»)'), t('Estadístiques: visites, desats i seguidors', 'Estadísticas: visitas, guardados y seguidores')],
      cta: t('Prova-ho 3 mesos gratis', 'Pruébalo 3 meses gratis') },
    { id: 'destacat', hi: false, price: '39 €', per: t('/mes', '/mes'), name: t('Destacat', 'Destacado'), desc: t('Més visibilitat, sempre etiquetada.', 'Más visibilidad, siempre etiquetada.'),
      items: [t('Tot el de Botiga viva', 'Todo lo de Tienda viva'), t('Primer lloc a la teva categoria, amb l’etiqueta «Destacat»', 'Primer lugar en tu categoría, con la etiqueta «Destacado»'), t('Patrocina una activitat de l’agenda', 'Patrocina una actividad de la agenda'), t('Ajuda amb fotos i textos de la fitxa', 'Ayuda con fotos y textos de la ficha')],
      cta: t('Parlem-ne', 'Hablemos') },
  ];
  return (
    <div className="wrap">
      <header className="page-head">
        <p className="eyebrow">{t('Per a comerços i professionals', 'Para comercios y profesionales')}</p>
        <h1 className="h1" style={{ marginTop: '.5rem', maxWidth: '16ch' }}>{t('Que el poble et trobi,', 'Que el pueblo te encuentre,')} <em style={{ color: 'var(--accent)' }}>{t('cada dia', 'cada día')}</em></h1>
        <p className="lead">{t('La gent obre Súria per mirar el bus, l’agenda o la farmàcia. Que també hi vegi que avui tens pa de pagès o que la cuina és oberta fins a les onze.', 'La gente abre Súria para mirar el bus, la agenda o la farmacia. Que también vea que hoy tienes pan de payés o que la cocina está abierta hasta las once.')}</p>
      </header>

      <div className="stats-row" aria-label={t('Xifres d’exemple', 'Cifras de ejemplo')}>
        <div><b className="num">3×</b><span>{t('cops per setmana obre l’app un veí actiu', 'veces por semana abre la app un vecino activo')}</span></div>
        <div><b className="num">−5%</b><span>{t('descompte mitjà amb el Carnet', 'descuento medio con el Carnet')}</span></div>
        <div><b className="num">0 €</b><span>{t('per començar, i sense permanència', 'para empezar, y sin permanencia')}</span></div>
      </div>
      <p className="xs muted" style={{ marginTop: '.5rem' }}>{t('Xifres objectiu del prototip, no mesurades.', 'Cifras objetivo del prototipo, no medidas.')}</p>

      <section className="section plans" aria-label={t('Plans', 'Planes')}>
        {plans.map((p) => (
          <article key={p.id} className={`plan ${p.hi ? 'plan--hi' : ''}`}>
            {p.hi && <span className="plan__badge">{t('El més triat', 'El más elegido')}</span>}
            <h2 className="h3">{p.name}</h2>
            <p className="small plan__desc">{p.desc}</p>
            <p className="plan__price num">{p.price}<small>{p.per}</small></p>
            <ul>{p.items.map((x) => <li key={x}><Icon name="Check" size={16} />{x}</li>)}</ul>
            <button className={`btn btn--block ${p.hi ? 'btn--white' : 'btn--line'}`} onClick={() => toast(t('Gràcies! Et contactarem en 24 hores.', '¡Gracias! Te contactaremos en 24 horas.'))}>{p.cta}</button>
          </article>
        ))}
      </section>
      <p className="hint" style={{ marginTop: '.75rem' }}>{t('Preus orientatius, en validació amb comerços del poble. IVA no inclòs.', 'Precios orientativos, en validación con comercios del pueblo. IVA no incluido.')}</p>

      <section className="section" aria-labelledby="mai" style={{ marginBottom: '1rem' }}>
        <h2 className="h2" id="mai" style={{ marginBottom: '1rem' }}>{t('El que no farem mai', 'Lo que no haremos nunca')}</h2>
        <div className="promise">
          <div><Icon name="Lock" size={22} /><strong>{t('Vendre dades de veïns', 'Vender datos de vecinos')}</strong><p>{t('Les estadístiques són sempre agregades i anònimes.', 'Las estadísticas son siempre agregadas y anónimas.')}</p></div>
          <div><Icon name="Sparkles" size={22} /><strong>{t('Cobrar per respostes', 'Cobrar por respuestas')}</strong><p>{t('L’assistent recomana per proximitat i horari, mai per qui paga.', 'El asistente recomienda por cercanía y horario, nunca por quien paga.')}</p></div>
          <div><Icon name="Eye" size={22} /><strong>{t('Amagar què és publicitat', 'Esconder qué es publicidad')}</strong><p>{t('Tot el que és pagat porta l’etiqueta «Destacat».', 'Todo lo pagado lleva la etiqueta «Destacado».')}</p></div>
        </div>
        <p style={{ marginTop: '1.5rem' }}><Link to="/poble/comerc" className="btn btn--line"><Icon name="Store" size={18} />{t('Mira com es veuen les fitxes', 'Mira cómo se ven las fichas')}</Link></p>
      </section>
    </div>
  );
}
