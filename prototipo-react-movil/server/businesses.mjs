const SOURCE='https://do.diba.cat/api/dataset/establiments/camp-nom_municipi/S%C3%BAria/pag-ini/1/pag-fi/500/format/json';
let cache, pending;
export function parseBusinesses(data){
 if(!Array.isArray(data.elements))throw Error('Unrecognised directory');
 return data.elements.filter(e=>String(e.tipus_comercial)==='1'&&String(e.rel_municipi)==='08274'&&e.nom_comercial?.trim()&&e.adreca?.adreca_completa?.trim()).map(e=>({id:String(e.id),name:e.nom_comercial.trim(),description:(e.descripcio_activitat||'').trim(),address:e.adreca.adreca_completa.trim(),kind:e.sector_economic==='Activitat comercial'?'shop':'service'}));
}
export async function businessesHandler(_req,res){try{if(!cache||Date.now()-cache.loadedAt>3600000){if(!pending)pending=(async()=>{const r=await fetch(SOURCE,{signal:AbortSignal.timeout(12000)});if(!r.ok)throw Error('unavailable');const data=await r.json();const items=parseBusinesses(data);if(!items.length)throw Error('empty directory');cache={items,loadedAt:Date.now()};return cache})().finally(()=>pending=null);await pending}res.writeHead(200,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(cache))}catch{res.writeHead(503,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify({error:'directory_unavailable'}))}}
