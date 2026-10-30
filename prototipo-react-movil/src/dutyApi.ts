export type Duty = { id: string; through: string; checkedAt: string; effectiveDate: string };
const validIds = new Set(['collado', 'masso', 'ripoll']);
let cached: Duty | null = null;
let pending: Promise<Duty> | null = null;

function dutyDate() {
 const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',hourCycle:'h23'}).formatToParts(new Date()).map(p=>[p.type,p.value]));
 const date = new Date(Date.UTC(+parts.year,+parts.month-1,+parts.day));
 if (+parts.hour < 9) date.setUTCDate(date.getUTCDate()-1);
 return date.toISOString().slice(0,10);
}
function valid(duty:Duty) {
 const checked=Date.parse(duty.checkedAt);
 return validIds.has(duty.id) && Number.isFinite(checked) && checked<=Date.now()+60000 && Date.now()-checked<300000 && duty.effectiveDate===dutyDate() && /^\d{4}-\d{2}-\d{2}$/.test(duty.through) && duty.through>=duty.effectiveDate;
}
export function loadDuty(): Promise<Duty> {
 if(cached && valid(cached)) return Promise.resolve(cached);
 if(pending) return pending;
 pending=fetch('/api/farmacia-guardia',{cache:'no-store'}).then(async r=>{if(!r.ok)throw Error('unavailable');const data:Duty=await r.json();if(!valid(data))throw Error('invalid or outdated duty');cached=data;return data}).finally(()=>{pending=null});
 return pending;
}
