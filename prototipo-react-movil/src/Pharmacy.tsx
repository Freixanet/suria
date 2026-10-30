import { useEffect, useState } from 'react';
import { loadDuty, type Duty } from './dutyApi';
import { ArrowLeft, ArrowUpRight, MapPin, Phone, ShieldPlus, ChevronDown } from 'lucide-react';

type Props = { lang: 'ca' | 'es'; onBack: () => void };
export const pharmacies = [
  { id:'collado', name: 'Farmàcia Collado', address: 'Carrer Salvador Vancell, 28', phone: '93 869 56 95', number: '938695695' },
  { id:'masso', name: 'Farmàcia Massó', address: 'Carrer Pompeu Fabra, 1', phone: '93 868 22 89', number: '938682289' },
  { id:'ripoll', name: 'Farmàcia Ripoll', address: 'Carrer Salvador Vancell, 8', phone: '93 869 41 63', number: '938694163' },
];
const text = {
 ca: { back:'Tornar', eyebrow:'SERVEIS · SÚRIA', title:'Farmàcies', intro:'Troba una farmàcia a Súria o consulta quina està de guàrdia.', duty:'Necessites una farmàcia de guàrdia?', dutyBody:'Consulta el calendari actualitzat a la web de l’Ajuntament.', dutyAction:'Consultar la guàrdia', dutyNote:'El canvi de guàrdia es fa a les 9 h. Fora de l’horari habitual, consulta l’avís a la farmàcia de guàrdia per saber on t’atendran.', directory:'Farmàcies de Súria', directorySub:'Adreces i telèfons', call:'Trucar', directions:'Com arribar', source:'Font: Ajuntament de Súria', opens:'s’obre en una altra pestanya' },
 es: { back:'Volver', eyebrow:'SERVICIOS · SÚRIA', title:'Farmacias', intro:'Encuentra una farmacia en Súria o consulta cuál está de guardia.', duty:'¿Necesitas una farmacia de guardia?', dutyBody:'Consulta el calendario actualizado en la web del Ayuntamiento.', dutyAction:'Consultar la guardia', dutyNote:'El cambio de guardia se realiza a las 9 h. Fuera del horario habitual, consulta el aviso en la farmacia de guardia para saber dónde te atenderán.', directory:'Farmacias de Súria', directorySub:'Direcciones y teléfonos', call:'Llamar', directions:'Cómo llegar', source:'Fuente: Ayuntamiento de Súria', opens:'se abre en otra pestaña' },
};

export function Pharmacy({lang,onBack}: Props) {
 const t=text[lang];
 const [duty,setDuty]=useState<Duty|null>(null);
 const [state,setState]=useState<'loading'|'ready'|'error'>('loading');
 const [retry,setRetry]=useState(0);
 useEffect(()=>{
  let alive=true;
  const load=async()=>{try{const data=await loadDuty();if(alive){setDuty(data);setState('ready')}}catch{if(alive){setDuty(null);setState('error')}}};
  load();const timer=setInterval(load,300000);let effective='';const boundary=setInterval(()=>{const p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',hourCycle:'h23'}).formatToParts(new Date()).map(x=>[x.type,x.value]));const d=new Date(Date.UTC(+p.year,+p.month-1,+p.day));if(+p.hour<9)d.setUTCDate(d.getUTCDate()-1);const day=d.toISOString().slice(0,10);if(effective && effective!==day){setDuty(null);setState('loading');load()}effective=day},1000);const visible=()=>{if(document.visibilityState==='visible')load()};document.addEventListener('visibilitychange',visible);return()=>{alive=false;clearInterval(timer);clearInterval(boundary);document.removeEventListener('visibilitychange',visible)};
 },[retry]);
 const pharmacy=duty && pharmacies.find(p=>p.id===duty.id);
 const until=duty && new Intl.DateTimeFormat(lang==='ca'?'ca-ES':'es-ES',{day:'numeric',month:'long',timeZone:'UTC'}).format(new Date(Date.parse(duty.through+'T00:00:00Z')+86400000));
 return <div className="pharmacy-page">
  <header className="pharmacy-header"><button type="button" className="back-button" onClick={onBack}><ArrowLeft aria-hidden="true"/><span>{t.back}</span></button><span className="pharmacy-brand">súria<span>.</span></span></header>
  <main className="pharmacy-main">
   <div className="pharmacy-intro"><p className="pharmacy-eyebrow">{t.eyebrow}</p><h1>{t.title}<span>.</span></h1><p>{t.intro}</p></div>
   <section className="duty-card" aria-labelledby="duty-title"><div className="duty-heading"><div className="duty-icon"><ShieldPlus aria-hidden="true"/></div><p className="duty-label" id="duty-title">{lang==='ca'?'De guàrdia':'De guardia'}</p></div>
    {state==='loading' && <p className="duty-status" role="status">{lang==='ca'?'Consultant la guàrdia…':'Consultando la guardia…'}</p>}
    {state==='ready' && pharmacy && duty && <><h2 className="duty-name">{pharmacy.name}</h2><p className="duty-address">{pharmacy.address}</p><p className="duty-valid">{lang==='ca'?'Fins al':'Hasta el'} {until}, {lang==='ca'?'a les':'a las'} 9 h</p><div className="duty-actions"><a className="duty-link" href={'tel:+34'+pharmacy.number}><Phone aria-hidden="true"/>{t.call}<span className="sr-only"> {pharmacy.name}</span></a><a className="duty-map" href={'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(pharmacy.address+', 08260 Súria')} target="_blank" rel="noreferrer"><MapPin aria-hidden="true"/>{t.directions}<span className="sr-only"> ({t.opens})</span></a></div></>}
    {state==='error' && <><h2 className="duty-error">{lang==='ca'?'No hem pogut verificar la guàrdia':'No hemos podido verificar la guardia'}</h2><p>{lang==='ca'?'Torna-ho a provar o consulta la font oficial.':'Vuelve a intentarlo o consulta la fuente oficial.'}</p><button className="duty-link duty-retry" onClick={()=>{setState('loading');setRetry(x=>x+1)}}>{lang==='ca'?'Tornar-ho a provar':'Volver a intentarlo'}</button><a className="duty-map" href="https://www.suria.cat/farmacies" target="_blank" rel="noreferrer">{t.source} <ArrowUpRight aria-hidden="true"/></a></>}
    <details className="duty-details"><summary>{lang==='ca'?'Informació de la guàrdia':'Información de la guardia'}<ChevronDown aria-hidden="true"/></summary><div className="duty-details-content"><p>{t.dutyNote}</p>{state==='ready' && duty && <p className="duty-checked">{lang==='ca'?'Consulta verificada':'Consulta verificada'}: {new Intl.DateTimeFormat(lang==='ca'?'ca-ES':'es-ES',{dateStyle:'short',timeStyle:'short',timeZone:'Europe/Madrid'}).format(new Date(duty.checkedAt))}</p>}<a href="https://www.suria.cat/farmacies" target="_blank" rel="noreferrer">{t.source}<ArrowUpRight aria-hidden="true"/><span className="sr-only"> ({t.opens})</span></a></div></details>
   </section>
   <section className="pharmacy-directory" aria-labelledby="directory-title"><div className="directory-heading"><h2 id="directory-title">{t.directory}</h2><p>{t.directorySub}</p></div><div className="pharmacy-list">{pharmacies.map(p=><article className="pharmacy-card" id={p.id} key={p.number}><div className="pharmacy-card-title"><span className="pharmacy-mark" aria-hidden="true">✚</span><h3>{p.name}</h3></div><p className="pharmacy-address"><MapPin aria-hidden="true"/>{p.address}<br/>08260 Súria</p><div className="pharmacy-actions"><a href={'tel:+34'+p.number}><Phone aria-hidden="true"/>{t.call}<span className="sr-only"> {p.name}: {p.phone}</span></a><a href={'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.address+', 08260 Súria')} target="_blank" rel="noreferrer"><MapPin aria-hidden="true"/>{t.directions}<span className="sr-only"> {p.name} ({t.opens})</span></a></div></article>)}</div></section>
   <footer className="pharmacy-source"><a href="https://www.suria.cat/farmacies" target="_blank" rel="noreferrer">{t.source} <ArrowUpRight aria-hidden="true"/><span className="sr-only"> ({t.opens})</span></a></footer>
  </main>
 </div>
}
