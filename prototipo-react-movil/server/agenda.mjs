import * as cheerio from 'cheerio';
const BASE='https://www.suria.cat';
const MONTHS={GEN:1,FEB:2,MAR:3,ABR:4,MAI:5,JUN:6,JUL:7,AGO:8,SET:9,OCT:10,NOV:11,DES:12};
let cache,pending;
export function localDate(now=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit'}).format(now)}
function addDays(date,n){const d=new Date(date+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)}
export function parseAgenda(html,today){
 const $=cheerio.load(html);const nodes=$('.agenda_item');const events=[];
 nodes.each((_,el)=>{const item=$(el);const day=Number(item.find('.data_dia_mes_interior .data_gris').first().text().trim());const month=MONTHS[item.find('.data_mes .data_gris').first().text().trim().toUpperCase()];const a=item.find('.info_cos a:has(.titol)').first();const title=a.find('.titol').text().replace(/\s+/g,' ').trim();const href=a.attr('href');if(!month||!day||!title||!href)throw Error('Invalid agenda item');
 let year=Number(today.slice(0,4));let date=`${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;if(date<addDays(today,-180)){year++;date=`${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`}
 if(new Date(date+'T12:00:00Z').toISOString().slice(0,10)!==date)throw Error('Invalid date');
 const url=new URL(href,BASE);if(url.origin!==BASE||!url.pathname.startsWith('/actualitat/agenda/'))throw Error('Unexpected agenda URL');const img=item.find('img.imatge-principal').attr('src');let image=null;if(img){const imageUrl=new URL(img,BASE);if(imageUrl.origin===BASE&&imageUrl.pathname.startsWith('/media/'))image=imageUrl.href}
 const infos=item.find('.item_info').toArray().map(e=>({icon:$(e).find('i').attr('class')||'',text:$(e).text().replace(/\s+/g,' ').trim()}));const time=infos.find(x=>x.icon.includes('clock'))?.text||null;const place=infos.find(x=>x.icon.includes('map-marker'))?.text||null;
 events.push({date,title,url:url.href,image,time,place,until:item.find('.data_final').text().replace(/\s+/g,' ').trim()||null});});
 return {events,hasAgenda:$('#contingut').length>0,pages:Math.max(1,...$('.c_paginador a').map((_,a)=>Number(new URL($(a).attr('href')||'?',BASE+'/agenda').searchParams.get('page'))||1).get())};
}
export async function getAgenda(now=new Date()){
 const today=localDate(now),end=addDays(today,6);
 if(cache&&cache.today===today&&Date.now()-cache.fetchedAt<5*60*1000)return cache;
 if(!pending)pending=(async()=>{let all=[],completed=false;for(let page=1;page<=10;page++){const r=await fetch(BASE+'/agenda?page='+page,{signal:AbortSignal.timeout(10000),headers:{Accept:'text/html','User-Agent':'SuriaLocalGuide/1.0'}});if(!r.ok)throw Error('Agenda unavailable');const result=parseAgenda(await r.text(),today);if(!result.hasAgenda||(!result.events.length&&page===1))throw Error('Agenda format not recognised');all.push(...result.events);if(result.events.some(e=>e.date>end)||page>=result.pages){completed=true;break;}}if(!completed)throw Error('Agenda exceeds page limit');const unique=[...new Map(all.filter(e=>e.date>=today&&e.date<=end).map(e=>[e.date+'|'+e.url,e])).values()];cache={today,through:end,events:unique,fetchedAt:Date.now()};return cache})().finally(()=>{pending=null});
 const result=await pending;if(result.today!==today)throw Error('Agenda date changed');return result;
}
export async function agendaHandler(req,res){try{const data=await getAgenda();res.writeHead(200,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify({today:data.today,through:data.through,events:data.events,checkedAt:new Date(data.fetchedAt).toISOString()}));}catch(e){console.error('Agenda unavailable:',e.message);res.writeHead(503,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify({error:'agenda_unavailable'}));}}
