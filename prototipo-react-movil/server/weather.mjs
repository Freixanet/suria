const SOURCE='https://api.open-meteo.com/v1/forecast?latitude=41.83611&longitude=1.75278&current=temperature_2m%2Cweather_code&daily=precipitation_probability_max&timezone=Europe%2FMadrid&forecast_days=1';
let cache, pending;
function localDate(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
export async function weatherHandler(_req,res){
 try{
  if(!cache || cache.date!==localDate() || Date.now()-cache.fetchedAt>900000){
   if(!pending)pending=(async()=>{const r=await fetch(SOURCE,{signal:AbortSignal.timeout(8000)});if(!r.ok)throw Error('weather unavailable');const d=await r.json();const temperature=d.current?.temperature_2m, code=d.current?.weather_code, rain=d.daily?.precipitation_probability_max?.[0],date=d.daily?.time?.[0];if(date!==localDate()||!Number.isFinite(temperature)||!Number.isInteger(code)||!Number.isFinite(rain)||rain<0||rain>100)throw Error('invalid weather');return cache={date,temperature,code,rain,fetchedAt:Date.now()}})().finally(()=>{pending=null});
   await pending;
  }
  res.writeHead(200,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(cache));
 }catch{res.writeHead(503,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify({error:'weather_unavailable'}))}
}
