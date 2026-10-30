// Run against a running instance. --watch repeats checks and logs state changes.
const base=process.env.SURIA_BASE_URL || 'http://127.0.0.1:5173';
const endpoints=['/api/farmacia-guardia','/api/alsa','/api/agenda','/api/businesses','/api/weather'];
const watch=process.argv.includes('--watch');
const interval=Number(process.env.SURIA_CHECK_INTERVAL_MS || 300000);
if(!Number.isFinite(interval)||interval<10000)throw Error('SURIA_CHECK_INTERVAL_MS must be at least 10000');
let previous=new Map();
async function check(){
 const results=await Promise.all(endpoints.map(async path=>{
  try{const r=await fetch(new URL(path,base),{signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error(`HTTP ${r.status}`);const data=await r.json();if(data.error)throw Error(String(data.error));return [path,'OK']}
  catch(error){return [path,`ERROR: ${error.message}`]}
 }));
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 results.push(['Guagua',today>='2027-08-01'?'ERROR: revisar calendario antes de septiembre de 2027':'OK (revisar calendario antes de septiembre de 2027)']);
 for(const [name,status] of results){if(!watch||previous.get(name)!==status)console.log(`${new Date().toISOString()} ${name}: ${status}`);previous.set(name,status)}
 return results.some(([,status])=>status.startsWith('ERROR:'));
}
async function run(){const failed=await check();if(!watch){if(failed)process.exitCode=1;return}setTimeout(run,interval)}
await run();
