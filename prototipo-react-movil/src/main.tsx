/// <reference types="vite/client" />
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, BusFront, HeartPulse, FileText, ArrowRight, ChevronRight, House, Grid2X2, CalendarDays, MapPin, X, Sun, CloudSun, Cloud, CloudFog, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';
import './style.css';
import { Pharmacy, pharmacies } from './Pharmacy';
import { Guagua, stops } from './Guagua';
import { Health } from './Health';
import { Procedures } from './Procedures';
import { Events } from './Events';
import { Businesses } from './Businesses';
import { normalizeSearch, businessSearch } from './search';
import {useSmartSearch,smartBusinessMatch} from './useSmartSearch';
import { loadDuty } from './dutyApi';
import { loadAlsa } from './guideApi';

type Lang = 'ca' | 'es';
const copy = {
 ca: { tagline:'Guia local independent', search:'Què busques a Súria?', services:['Farmàcia','Busos','Salut','Tràmits'], heading:'Passa a Súria', today:'Avui', week:'Setmana', autumn:'Plans de tardor', village:'Passejar pel Poble Vell', nearby:'A prop de casa', shops:'Botigues i professionals', shopsSub:'Troba qui et pot ajudar', market:'Mercat setmanal', marketSub:'Dissabtes al matí', nav:['Avui','Serveis','Agenda','A prop'], noResult:'No hem trobat resultats.', close:'Tanca', detail:'Aquesta és una vista inicial de la guia. La informació detallada encara no està disponible.', weekEmpty:'Encara no hi ha activitats de la setmana disponibles.' },
 es: { tagline:'Guía local independiente', search:'¿Qué buscas en Súria?', services:['Farmacia','Buses','Salud','Trámites'], heading:'Pasa en Súria', today:'Hoy', week:'Semana', autumn:'Planes de otoño', village:'Pasear por el Poble Vell', nearby:'Cerca de casa', shops:'Tiendas y profesionales', shopsSub:'Encuentra quién puede ayudarte', market:'Mercado semanal', marketSub:'Sábados por la mañana', nav:['Hoy','Servicios','Agenda','Cerca'], noResult:'No hemos encontrado resultados.', close:'Cerrar', detail:'Esta es una vista inicial de la guía. La información detallada aún no está disponible.', weekEmpty:'Todavía no hay actividades de la semana disponibles.' }
};
function PharmacyIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
 return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" className={[className,'pharmacy-service-icon'].filter(Boolean).join(' ')} {...props}><path d="M18 3h12v13h13v12H30v15H18V28H5V16h13z" /></svg>;
}
const icons=[PharmacyIcon,BusFront,HeartPulse,FileText];
function greeting(lang:Lang, now:Date){
 const hour=Number(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Madrid',hour:'2-digit',hourCycle:'h23'}).format(now));
 if(hour>=6&&hour<13)return lang==='ca'?'Bon dia':'Buenos días';
 if(hour>=13&&hour<21)return lang==='ca'?'Bona tarda':'Buenas tardes';
 return lang==='ca'?'Bona nit':'Buenas noches';
}
function WeatherIcon({code,lang}:{code:number;lang:Lang}){
 const kind=code===0?'sun':code===1||code===2?'partial':code===45||code===48?'fog':code>=95&&code<=99?'storm':[71,73,75,77,85,86].includes(code)?'snow':[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(code)?'rain':code===3?'cloud':'unknown';
 const icons={sun:Sun,partial:CloudSun,cloud:Cloud,fog:CloudFog,storm:CloudLightning,snow:CloudSnow,rain:CloudRain,unknown:Cloud};
 const labels={ca:{sun:'Cel serè',partial:'Núvols i clarianes',cloud:'Ennuvolat',fog:'Boira',storm:'Tempesta',snow:'Neu',rain:'Pluja',unknown:'Temps actual'},es:{sun:'Cielo despejado',partial:'Nubes y claros',cloud:'Nublado',fog:'Niebla',storm:'Tormenta',snow:'Nieve',rain:'Lluvia',unknown:'Tiempo actual'}};
 const Icon=icons[kind];return <><Icon aria-hidden="true"/><span className="sr-only">{labels[lang][kind]}. </span></>;
}
type Weather = {date:string;temperature:number;code:number;rain:number};
function cachedWeather():Weather|null {
 try {
  const cached=JSON.parse(sessionStorage.getItem('suria-weather') || 'null');
  const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  if(!cached || !Number.isFinite(cached.savedAt) || Date.now()-cached.savedAt<0 || Date.now()-cached.savedAt>=900000 || cached.data?.date!==today || !Number.isFinite(cached.data.temperature) || !Number.isInteger(cached.data.code) || !Number.isFinite(cached.data.rain))return null;
  return cached.data;
 }catch{return null}
}
const appBase=import.meta.env.BASE_URL;
function relativePath(){const path=location.pathname.startsWith(appBase)?'/'+location.pathname.slice(appBase.length):location.pathname;return path==='/'?(location.hash.startsWith('#/')?location.hash.slice(1):'/'):path}
function App(){
 const [now,setNow]=useState(()=>new Date()); const [weather,setWeather]=useState<Weather|null>(cachedWeather);
 const todayInSuria=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
 const [lang,setLang]=useState<Lang>(()=>{try{return localStorage.getItem('suria-language')==='es'?'es':'ca'}catch{return 'ca'}}); const [query,setQuery]=useState(''); const [detail,setDetail]=useState<string|null>(null); const [active,setActive]=useState(0); const [eventCount,setEventCount]=useState<number|null>(null); const closeRef=useRef<HTMLButtonElement>(null); const c=copy[lang]; const [view,setView]=useState(relativePath()==='/botigues'?'botigues':relativePath()==='/farmacia'?'farmacia':relativePath()==='/guagua'?'guagua':relativePath()==='/salut'?'salut':relativePath()==='/tramits'?'tramits':'home'); const [initialStop,setInitialStop]=useState<number|undefined>(); const navIntent=useRef<number|null>(null); const lastScroll=useRef(0); const serviceTrigger=useRef<HTMLButtonElement>(null); const returnFocus=useRef<HTMLElement|null>(null); const searchRef=useRef<HTMLInputElement>(null); const activeService=useRef(0);
 useEffect(()=>{document.documentElement.lang=lang;try{localStorage.setItem('suria-language',lang)}catch{}},[lang]);
 const [businesses,setBusinesses]=useState<{id:string;name:string;description:string;address:string}[]>([]); const [businessQuery,setBusinessQuery]=useState(''); const [businessSearchState,setBusinessSearchState]=useState<'idle'|'loading'|'ready'|'error'>('idle');
 useEffect(()=>{if(!query.trim())return;const controller=new AbortController();setBusinessSearchState('loading');fetch('/api/businesses',{signal:controller.signal}).then(r=>{if(!r.ok)throw Error();return r.json()}).then(d=>{if(!Array.isArray(d.items))throw Error();setBusinesses(d.items);setBusinessSearchState('ready')}).catch(e=>{if(e.name!=='AbortError')setBusinessSearchState('error')});return()=>controller.abort()},[!!query.trim()]);
 useEffect(()=>{if(view!=='home')return;let alive=true;let controller:AbortController|undefined;const load=async()=>{controller?.abort();controller=new AbortController();try{const r=await fetch('/api/weather',{signal:controller.signal,cache:'no-store'});if(!r.ok)throw Error('unavailable');const data=await r.json();const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());if(data.date!==today||!Number.isFinite(data.temperature)||!Number.isInteger(data.code)||!Number.isFinite(data.rain))throw Error('invalid');if(alive){setWeather(data);try{sessionStorage.setItem('suria-weather',JSON.stringify({data,savedAt:Date.now()}))}catch{}}}catch(e){if(alive&&!(e instanceof DOMException&&e.name==='AbortError'))setWeather(cachedWeather())}};load();const timer=setInterval(load,900000);const visible=()=>{if(document.visibilityState==='visible')load()};document.addEventListener('visibilitychange',visible);return()=>{alive=false;controller?.abort();clearInterval(timer);document.removeEventListener('visibilitychange',visible)}},[view,todayInSuria]);
 useEffect(()=>{const update=()=>setNow(new Date());const timer=setInterval(update,60000);const visible=()=>{if(document.visibilityState==='visible')update()};document.addEventListener('visibilitychange',visible);return()=>{clearInterval(timer);document.removeEventListener('visibilitychange',visible)}},[]);
 useEffect(()=>{if(view==='home'){void loadDuty().catch(()=>{});void loadAlsa().catch(()=>{})}},[view]);
 useEffect(()=>{const onPop=()=>{const next=relativePath()==='/botigues'?'botigues':relativePath()==='/farmacia'?'farmacia':relativePath()==='/guagua'?'guagua':relativePath()==='/salut'?'salut':relativePath()==='/tramits'?'tramits':'home';setView(next);if(next==='home') requestAnimationFrame(()=>{window.scrollTo(0,lastScroll.current);(returnFocus.current?.isConnected?returnFocus.current:(searchRef.current?.value?searchRef.current:serviceTrigger.current))?.focus({preventScroll:true})});else window.scrollTo(0,0)};window.addEventListener('popstate',onPop);return()=>window.removeEventListener('popstate',onPop)},[]);
 function openService(path:'farmacia'|'guagua'|'salut'|'tramits'|'botigues', target?:string, stop?:number){lastScroll.current=window.scrollY;returnFocus.current=document.activeElement as HTMLElement;setInitialStop(stop);history.pushState({fromSuriaHome:true},'', appBase+'#/'+path);setView(path);window.scrollTo(0,0);if(target)requestAnimationFrame(()=>document.getElementById(target)?.scrollIntoView({block:'start'}))}
 function closeService(){if(history.state?.fromSuriaHome)history.back();else{history.replaceState({},'', appBase);setView('home');requestAnimationFrame(()=>serviceTrigger.current?.focus())}}
 useEffect(()=>{if(!detail)return; const previous=document.activeElement as HTMLElement; closeRef.current?.focus(); const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setDetail(null); if(e.key==='Tab'){e.preventDefault();closeRef.current?.focus()}};document.addEventListener('keydown',onKey);return()=>{document.removeEventListener('keydown',onKey);previous?.focus()}},[detail]);
 useEffect(()=>{if(view!=='home')return;
  const update=()=>{if(navIntent.current!==null){setActive(navIntent.current);return}const ids=['serveis','agenda','a-prop'];let next=0;ids.forEach((id,i)=>{const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=70)next=i+1});const maxScroll=document.documentElement.scrollHeight-window.innerHeight;if(maxScroll>1&&window.scrollY>=maxScroll-2&&document.getElementById('a-prop'))next=3;setActive(next)};
  const unlock=()=>{navIntent.current=null};const onKey=(e:KeyboardEvent)=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(e.key))unlock()};
  update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);window.addEventListener('wheel',unlock,{passive:true});window.addEventListener('touchstart',unlock,{passive:true});window.addEventListener('keydown',onKey);return()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update);window.removeEventListener('wheel',unlock);window.removeEventListener('touchstart',unlock);window.removeEventListener('keydown',onKey)}
 },[view,query,eventCount]);
 const smart=useSmartSearch(view==='home'?query:'');
 const matches=(...s:string[])=>!query.trim()||normalizeSearch(s.join(' ')).includes(normalizeSearch(query.trim()));
 const searchItems: {title:string; subtitle:string; terms:string; path:'farmacia'|'guagua'|'salut'|'tramits'; target?:string; stop?:number}[]=[
  ...pharmacies.map(p=>({title:p.name,subtitle:p.address,terms:p.address+' '+p.phone,path:'farmacia' as const,target:p.id})),
  ...stops.map((name,i)=>({title:name,subtitle:lang==='ca'?'Parada · La Guagua':'Parada · La Guagua',terms:'',path:'guagua' as const,stop:i})),
  {title:'Alsa',subtitle:lang==='ca'?'Autobusos interurbans':'Autobuses interurbanos',terms:'horaris horarios bus autobús estació estación manresa cardona barcelona solsona',path:'guagua'},
  {title:'CAP Goretti Badia',subtitle:'Plaça de la Serradora, 1',terms:'salut salud metge médico centre atención primaria consulta 938694007',path:'salut',target:'cap'},
  {title:lang==='ca'?'Emergències i urgències':'Emergencias y urgencias',subtitle:'112 · 061 Salut Respon',terms:'salut salud urgències emergencia médico metge',path:'salut',target:'urgencies'},
  {title:lang==='ca'?'Demanar visita':'Pedir cita',subtitle:'La Meva Salut',terms:'salut salud cita consulta médico metge',path:'salut',target:'visita'},
  {title:lang==='ca'?'Oficina d’Atenció Ciutadana':'Oficina de Atención Ciudadana',subtitle:'Carrer Ernest Solvay, 13',terms:'OAC ajuntament ayuntamiento oficina',path:'tramits',target:'oac'},
  ...[lang==='ca'?'Certificat o volant d’empadronament':'Certificado o volante de empadronamiento',lang==='ca'?'Instància general':'Instancia general',lang==='ca'?'Queixes i suggeriments':'Quejas y sugerencias'].map((title,i)=>({title,subtitle:lang==='ca'?'Tràmits · Seu electrònica':'Trámites · Sede electrónica',terms:['empadronament empadronamiento','instancia general','queixes quejas suggeriments sugerencias'][i],path:'tramits' as const,target:'online'}))
 ];
 const searchResults=query.trim()?searchItems.filter(item=>matches(item.title,item.subtitle,item.terms)):[];
 const serviceIntents=['pharmacy','bus','health','procedures']; const serviceMatches=c.services.map((x,i)=>matches(x)||smart.intent===serviceIntents[i]); const localMatches=[matches(c.shops,c.shopsSub),matches(c.market,c.marketSub)];
 const businessMatches=query.trim()?businesses.filter(b=>[b.name,b.description,b.address].some(v=>businessSearch(v||'',query))||smartBusinessMatch(b.description,smart.intent)).slice(0,10):[];
 const none=!!query.trim()&&!smart.pending&&businessSearchState==='ready'&&!businessMatches.length&&!serviceMatches.some(Boolean)&&eventCount===0&&!localMatches.some(Boolean)&&searchResults.length===0;
 function go(id:string,index:number){navIntent.current=index;setActive(index);if(query){setQuery('');requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({block:'start'}));return}document.getElementById(id)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})}
 if(view==='botigues')return <Businesses lang={lang} onBack={closeService} initialQuery={businessQuery}/>;
 if(view==='farmacia')return <Pharmacy lang={lang} onBack={closeService}/>;
 if(view==='guagua')return <Guagua lang={lang} onBack={closeService} initialStop={initialStop}/>;
 if(view==='salut')return <Health lang={lang} onBack={closeService}/>;
 if(view==='tramits')return <Procedures lang={lang} onBack={closeService}/>;
 return <div className="app" id="top">
  <header className="header"><div><a className="logo" href="#top" aria-label="Súria, inici">súria<span>.</span></a><p className="tagline">{c.tagline}</p></div><div className="switch languages" role="group" aria-label="Idioma"><button className={lang==='ca'?'current':''} aria-pressed={lang==='ca'} onClick={()=>setLang('ca')}>CA</button><button className={lang==='es'?'current':''} aria-pressed={lang==='es'} onClick={()=>setLang('es')}>ES</button></div></header>
  <p className="preview-notice" role="note">{lang==='ca'?"Vista prèvia: els horaris, la farmàcia de guàrdia, l’agenda, el temps i el directori encara no estan connectats.":'Vista previa: los horarios, la farmacia de guardia, la agenda, el tiempo y el directorio aún no están conectados.'}</p>
  <main><h1>{greeting(lang,now)}, Marcos.</h1><p className="morning-message">{weather?.date===todayInSuria&&<><WeatherIcon code={weather.code} lang={lang}/>{Math.round(weather.temperature)} °C <span aria-hidden="true">·</span> </>}<span className="greeting-date">{new Intl.DateTimeFormat(lang==='ca'?'ca-ES':'es-ES',{weekday:'long',day:'numeric',month:'long',timeZone:'Europe/Madrid'}).format(now)}</span></p><label className="search"><Search aria-hidden="true"/><span className="sr-only">{c.search}</span><input type="search" ref={searchRef} placeholder={c.search} value={query} onChange={e=>setQuery(e.target.value)}/></label>
  {query.trim().length>=6&&query.includes(' ')&&<p className="search-privacy">{lang==='ca'?'Les cerques en llenguatge natural es poden processar amb Google.':'Las búsquedas en lenguaje natural pueden procesarse con Google.'}</p>}
  {query.trim()&&businessSearchState==='error'&&<p className="empty" role="status">{lang==='ca'?'No hem pogut consultar els comerços.':'No hemos podido consultar los comercios.'}</p>}
  {none && <p className="empty" role="status">{c.noResult}</p>}
  {serviceMatches.some(Boolean)&&<section className="services" id="serveis" aria-label={c.nav[1]}>{c.services.map((name,i)=>{let Icon=icons[i];return serviceMatches[i]&&<button key={i} ref={i===activeService.current?serviceTrigger:undefined} className="service" onClick={()=>{if(i<4){activeService.current=i;openService(i===0?'farmacia':i===1?'guagua':i===2?'salut':'tramits')}else setDetail(name)}}><Icon aria-hidden="true"/><span>{name}</span></button>})}</section>}
  {!!searchResults.length&&<section className="search-results" aria-label={lang==='ca'?'Resultats de la cerca':'Resultados de la búsqueda'}><h2>{lang==='ca'?'Resultats':'Resultados'}</h2><div className="search-result-list">{searchResults.map((item,i)=><button key={item.path+item.title+i} className="search-result" onClick={()=>openService(item.path,item.target,item.stop)}><span><strong>{item.title}</strong><small>{item.subtitle}</small></span><ChevronRight aria-hidden="true"/></button>)}</div></section>}
  {!!businessMatches.length&&<section className="search-results"><h2>{c.shops}</h2><div className="search-result-list">{businessMatches.map(b=><button className="search-result" key={b.id} onClick={()=>{setBusinessQuery(b.name);openService('botigues')}}><span><strong>{b.name}</strong><small>{b.address}</small></span><ChevronRight aria-hidden="true"/></button>)}</div></section>}
  <Events lang={lang} query={query} onCount={setEventCount}/>
  {localMatches.some(Boolean)&&<section className="nearby" id="a-prop"><h2>{c.nearby}</h2><div className="local-list">{localMatches[0]&&<button className="local-card" onClick={()=>(setBusinessQuery(''),openService('botigues'))}><img src={appBase+'images/botiga.png'} alt=""/><span className="local-copy"><strong>{c.shops}</strong><span>{c.shopsSub}</span></span><ChevronRight aria-hidden="true"/></button>}{localMatches[1]&&<button className="local-card" onClick={()=>setDetail(c.market)}><img src={appBase+'images/mercat.png'} alt=""/><span className="local-copy"><strong>{c.market}</strong><span>{c.marketSub}</span></span><ChevronRight aria-hidden="true"/></button>}</div></section>}
  </main><nav className="bottom-nav" aria-label="Navegació principal">{[House,Grid2X2,CalendarDays,MapPin].map((Icon,i)=><button key={i} className={active===i?'active':''} aria-current={active===i?'location':undefined} onClick={()=>go(['top','serveis','agenda','a-prop'][i],i)}><Icon aria-hidden="true"/><span>{c.nav[i]}</span></button>)}</nav>
  {detail&&<div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setDetail(null)}}><div role="dialog" aria-modal="true" aria-labelledby="dialog-title" className="dialog"><button ref={closeRef} className="close" aria-label={c.close} onClick={()=>setDetail(null)}><X/></button><h2 id="dialog-title">{detail}</h2><p>{lang==='ca'?'Dissabtes al matí · Plaça de Sant Joan (ubicació habitual).':'Sábados por la mañana · Plaza de Sant Joan (ubicación habitual).'}</p><p>{lang==='ca'?'La ubicació pot canviar excepcionalment.':'La ubicación puede cambiar excepcionalmente.'}</p><p><a href="https://www.google.com/maps/search/?api=1&query=Pla%C3%A7a+de+Sant+Joan%2C+S%C3%BAria" target="_blank" rel="noreferrer">{lang==='ca'?'Com arribar':'Cómo llegar'}</a></p></div></div>}
 </div>
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
