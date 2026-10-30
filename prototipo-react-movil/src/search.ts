export function normalizeSearch(value:string){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().trim()}

// Alias deliberately limited to common intents that match known directory activities.
export function businessSearch(value:string,query:string){
 const text=normalizeSearch(value);const term=normalizeSearch(query);if(!term)return true;
 if(text.replace(/\s+/g,'').includes(term.replace(/\s+/g,'')))return true;
 const aliases: [RegExp,RegExp][]=[
  [/\b(peluqueria|peluquero|peluquera|perruqueria|perruquer)\b/,/perruquer/],
  [/\b(comprar pan|comprar pa|panaderia|panaderias|forn de pa)\b/,/\b(pa|forn|fleca)\b/],
 ];
 return aliases.some(([intent,activity])=>intent.test(term)&&activity.test(text));
}
