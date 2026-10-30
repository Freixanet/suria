export type Departure = { time:string; destination:string; route:string };
export type AgendaEvent = { date:string; title:string; url:string; image:string|null; time:string|null; place:string|null; until:string|null };
type AgendaData = { today:string; events:AgendaEvent[] };
type AlsaData = { date:string; departures:Departure[] };
export function madridDate(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
function makeLoader<T>(path:string, isValid:(data:T,date:string)=>boolean){
 let cached:{data:T;date:string;receivedAt:number}|null=null;
 let pending:{date:string;promise:Promise<T>}|null=null;
 return function load():Promise<T>{
  const date=madridDate();
  if(cached && cached.date===date && Date.now()-cached.receivedAt<300000) return Promise.resolve(cached.data);
  if(pending?.date===date) return pending.promise;
  const promise=fetch(path,{cache:'no-store'}).then(async response=>{
   if(!response.ok)throw Error('unavailable');
   const data:T=await response.json();
   if(date!==madridDate() || !isValid(data,date))throw Error('invalid or outdated data');
   cached={data,date,receivedAt:Date.now()};return data;
  }).finally(()=>{if(pending?.promise===promise)pending=null});
  pending={date,promise};return promise;
 }
}
export const loadAlsa=makeLoader<AlsaData>('/api/alsa',(data,date)=>data.date===date.replaceAll('-','') && Array.isArray(data.departures));
export const loadAgenda=makeLoader<AgendaData>('/api/agenda',(data,date)=>data.today===date && Array.isArray(data.events));
