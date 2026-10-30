import * as cheerio from 'cheerio';

const SOURCE = 'https://www.suria.cat/farmacies';
const MONTHS = ['gener','febrer','març','abril','maig','juny','juliol','agost','setembre','octubre','novembre','desembre'];
const NAMES = {collado:'collado', 'massó':'masso', ripoll:'ripoll'};
let cache;

// The municipal schedule changes at 09:00 in Súria, regardless of the user's timezone.
export function dutyDate(now = new Date()) {
 const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {timeZone:'Europe/Madrid', year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', hourCycle:'h23'}).formatToParts(now).map(p=>[p.type,p.value]));
 const day = new Date(Date.UTC(+parts.year, +parts.month-1, +parts.day));
 if (+parts.hour < 9) day.setUTCDate(day.getUTCDate()-1);
 return day.toISOString().slice(0,10);
}

export function parseCalendar(html) {
 const $=cheerio.load(html);
 const calendar=$('#contingut article .columna_seccio_max').first();
 const periods=[];
 calendar.children('p').each((_, heading)=>{
  const match=$(heading).text().trim().toLocaleLowerCase('ca').match(/^(gener|febrer|març|abril|maig|juny|juliol|agost|setembre|octubre|novembre|desembre)\s+(20\d{2})$/);
  if(!match)return;
  const month=MONTHS.indexOf(match[1])+1, year=Number(match[2]);
  const list=$(heading).next(); if(!list.is('ul'))return;
  list.children('li').each((_, item)=>{
   const text=$(item).text().replace(/\s+/g,' ').trim().toLocaleLowerCase('ca');
   const matchDates=text.match(/^(?:de\s+l['’]|del\s+)?(\d{1,2})(?:\s+al?\s+(?:l['’])?(\d{1,2}))?\s+d(?:e\s+|['’])([a-zàç]+)\s*:\s*farmàcia\s+(collado|massó|ripoll)\.?$/i);
   if(!matchDates || matchDates[3]!==match[1]) return;
   const start=Number(matchDates[1]), end=Number(matchDates[2]||start), max=new Date(Date.UTC(year,month,0)).getUTCDate();
   if(start<1 || end<start || end>max)return;
   const prefix=String(year)+'-'+String(month).padStart(2,'0')+'-';
   periods.push({id:NAMES[matchDates[4]],from:prefix+String(start).padStart(2,'0'),through:prefix+String(end).padStart(2,'0')});
  });
 });
 periods.sort((a,b)=>a.from.localeCompare(b.from));
 const merged=[];
 for(const period of periods){
  const last=merged.at(-1);
  const next=last && new Date(Date.parse(last.through+'T00:00:00Z')+86400000).toISOString().slice(0,10);
  if(last && last.id===period.id && next===period.from)last.through=period.through;
  else merged.push({...period});
 }
 return merged;
}

export async function getDuty(now = new Date()) {
 if (!cache || Date.now()-cache.fetchedAt > 5*60*1000) {
  const response=await fetch(SOURCE,{signal:AbortSignal.timeout(10000),headers:{'Accept':'text/html','User-Agent':'SuriaLocalGuide/1.0'}});
  if(!response.ok)throw new Error('Official source unavailable');
  const html=await response.text();
  const periods=parseCalendar(html);
  if(!periods.length)throw new Error('No recognised schedule');
  cache={periods,fetchedAt:Date.now()};
 }
 const date=dutyDate(now);
 const matches=cache.periods.filter(p=>p.from<=date && p.through>=date);
 if(matches.length!==1)throw new Error('No unambiguous duty for date');
 return {...matches[0], effectiveDate:date, checkedAt:new Date(cache.fetchedAt).toISOString(), source:SOURCE};
}
export async function dutyHandler(_req,res) {
 try { const duty=await getDuty();res.writeHead(200,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(duty)); }
 catch {res.writeHead(503,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify({error:'schedule_unavailable'}));}
}
