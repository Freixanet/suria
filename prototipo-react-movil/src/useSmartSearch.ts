import {useEffect,useState} from 'react';
export type SearchIntent='pharmacy'|'health'|'bus'|'procedures'|'hairdresser'|'bakery'|'unknown';
export function useSmartSearch(query:string){
 const [result,setResult]=useState<{query:string;intent:SearchIntent}|null>(null);
 const [pending,setPending]=useState(false);
 useEffect(()=>{
  const value=query.trim();setResult(null);setPending(false);
  if(value.length<6||value.length>160||!value.includes(' '))return;
  const controller=new AbortController();setPending(true);
  const timer=setTimeout(()=>{fetch('/api/search-ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query:value}),signal:controller.signal}).then(r=>{if(!r.ok)throw Error();return r.json()}).then(data=>{if(['pharmacy','health','bus','procedures','hairdresser','bakery','unknown'].includes(data.intent))setResult({query:value,intent:data.intent})}).catch(()=>{}).finally(()=>{if(!controller.signal.aborted)setPending(false)})},700);
  return()=>{clearTimeout(timer);controller.abort()};
 },[query]);
 return {intent:result?.query===query.trim()?result.intent:null,pending};
}
export function smartBusinessMatch(description:string,intent:SearchIntent|null){
 const value=description.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 return intent==='hairdresser'?/perruquer/.test(value):intent==='bakery'?/\b(pa|forn|fleca)\b/.test(value):false;
}
