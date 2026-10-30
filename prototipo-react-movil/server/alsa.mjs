import * as unzipper from 'unzipper';
import { parse } from 'csv-parse/sync';
const SOURCE='https://territori.gencat.cat/web/.content/home/serveis/visors-cartografia/bases-cartografiques/infraestructures-mobilitat/autobusos-interurbans/busos-interurbans-GTFS.zip';
const STOP='PF08274000', AGENCY='42675';
let cache, pending;
const rows=async(archive,name)=>parse((await archive.files.find(f=>f.path===name)?.buffer())?.toString('utf8')||'',{columns:true,skip_empty_lines:true,bom:true,relax_column_count:true});
export async function parseFeed(buffer){
 const zip=await unzipper.Open.buffer(buffer);
 const [routes,trips,calendar,exceptions,stops,times]=await Promise.all(['routes.txt','trips.txt','calendar.txt','calendar_dates.txt','stops.txt','stop_times.txt'].map(n=>rows(zip,n)));
 const routeMap=new Map(routes.filter(r=>r.agency_id===AGENCY).map(r=>[r.route_id,r]));
 const candidates=new Map(trips.filter(t=>routeMap.has(t.route_id)).map(t=>[t.trip_id,t]));
 const relevant=new Set(times.filter(t=>t.stop_id===STOP && candidates.has(t.trip_id)).map(t=>t.trip_id));
 if(!relevant.size)throw new Error('No Alsa trips at stop');
 const stopNames=new Map(stops.map(s=>[s.stop_id,s.stop_name]));const grouped=new Map();
 for(const t of times)if(relevant.has(t.trip_id)){const g=grouped.get(t.trip_id)||[];g.push(t);grouped.set(t.trip_id,g)}
 const departures=[];for(const [id,list] of grouped){list.sort((a,b)=>Number(a.stop_sequence)-Number(b.stop_sequence));const here=list.find(x=>x.stop_id===STOP);const last=list.at(-1);const trip=candidates.get(id);if(!here?.departure_time||!last||!stopNames.get(last.stop_id))continue;departures.push({time:here.departure_time, destination:last.stop_id==='PF08047000'?'Cardona · av. Rastrillo':stopNames.get(last.stop_id),route:routeMap.get(trip.route_id).route_short_name,service:trip.service_id});}
 const services=new Set(departures.map(d=>d.service));return {departures,calendar:calendar.filter(c=>services.has(c.service_id)),exceptions:exceptions.filter(c=>services.has(c.service_id))};
}
async function feed(){
 if(cache&&Date.now()-cache.loadedAt<6*3600000)return cache;
 if(!pending)pending=(async()=>{let r=await fetch(SOURCE,{signal:AbortSignal.timeout(30000)});if(!r.ok)throw Error('GTFS unavailable');let data=await parseFeed(Buffer.from(await r.arrayBuffer()));cache={...data,loadedAt:Date.now()};return cache})().finally(()=>{pending=null});
 return pending;
}
function dateMadrid(now){const d=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);return d.replaceAll('-','');}
export async function getAlsa(now=new Date()){
 const f=await feed(),date=dateMadrid(now);let day=new Date(date.slice(0,4)+'-'+date.slice(4,6)+'-'+date.slice(6,8)+'T12:00:00Z').getUTCDay();const weekday=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'][day];
 if(!f.calendar.some(c=>c.start_date<=date&&c.end_date>=date))throw Error('No calendar coverage');
 const active=new Set(f.calendar.filter(c=>c.start_date<=date&&date<=c.end_date&&c[weekday]==='1').map(c=>c.service_id));for(const e of f.exceptions.filter(e=>e.date===date)){if(e.exception_type==='1')active.add(e.service_id);else if(e.exception_type==='2')active.delete(e.service_id)}
 const candidates=f.departures.filter(d=>active.has(d.service)).map(({service,...d})=>d).sort((a,b)=>a.time.localeCompare(b.time));
 const seen=new Set(); const departures=candidates.filter(d=>{const key=[d.time.slice(0,5),d.destination,d.route].join('|');if(seen.has(key))return false;seen.add(key);return true});
 return {date,departures,checkedAt:new Date(f.loadedAt).toISOString(),source:SOURCE,stop:"Súria (estació d'autobusos)"};
}
export async function alsaHandler(req,res){try{let data=await getAlsa();res.writeHead(200,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data));}catch(e){console.error('Alsa schedule unavailable:',e.message);res.writeHead(503,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify({error:'schedule_unavailable'}));}}
