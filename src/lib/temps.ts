// Estimació horària de MET Norway. Coordenades fixes de Súria, no del visitant.
export const TEMPS_URL = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=41.835&lon=1.7533';
export const REFRESC = 15 * 60_000;
export const VIGENCIA = 60 * 60_000;
export const EDAT_MODEL = 12 * 60 * 60_000;
export type MostraTemps = { temperatura: number; simbol: string; instant: number; actualitzat: number };
type PuntMet = { time?: unknown; data?: { instant?: { details?: { air_temperature?: unknown } }; next_1_hours?: { summary?: { symbol_code?: unknown } } } };
type RespostaMet = { properties?: { meta?: { updated_at?: unknown; units?: { air_temperature?: unknown } }; timeseries?: PuntMet[] } };
export function llegeixTemps(raw: unknown, ara = Date.now()): MostraTemps | null {
  if (!raw || typeof raw !== 'object') return null;
  const props = (raw as RespostaMet).properties;
  if (props?.meta?.units?.air_temperature !== 'celsius' || !Array.isArray(props?.timeseries)) return null;
  if (typeof props.meta.updated_at !== 'string') return null;
  const actualitzat = Date.parse(props.meta.updated_at);
  if (!Number.isFinite(actualitzat) || ara - actualitzat > EDAT_MODEL || actualitzat - ara > 5 * 60_000) return null;
  // No avancem una hora futura ni convertim una previsió antiga en una observació actual.
  const punts = props.timeseries.filter((p): p is PuntMet & { time: string } => typeof p?.time === 'string' && Number.isFinite(Date.parse(p.time)) && Date.parse(p.time) <= ara)
    .sort((a, b) => Date.parse(b.time) - Date.parse(a.time));
  const punt = punts[0];
  if (!punt) return null;
  const instant = Date.parse(punt.time);
  if (ara - instant >= VIGENCIA) return null;
  const temperatura = punt.data?.instant?.details?.air_temperature;
  const simbol = punt.data?.next_1_hours?.summary?.symbol_code;
  if (typeof temperatura !== 'number' || !Number.isFinite(temperatura) || temperatura < -80 || temperatura > 60 ||
      typeof simbol !== 'string' || !/^[a-z_]{1,80}$/.test(simbol)) return null;
  return { temperatura, simbol, instant, actualitzat };
}
export function condicio(simbol: string) {
  const base = simbol.replace(/_(day|night|polartwilight)$/, '');
  const nit = simbol.endsWith('_night');
  if (base === 'clearsky' || base === 'fair') return nit ? 'nit' : 'sol';
  if (base === 'partlycloudy') return nit ? 'clarianesNit' : 'clarianes';
  if (base === 'cloudy') return 'nuvols';
  if (base === 'fog') return 'boira';
  if (base.includes('thunder')) return 'tempesta';
  if (base.includes('snow') || base.includes('sleet')) return 'neu';
  if (base.includes('rain')) return 'pluja';
  return 'desconegut';
}
export const iconesTemps = {
  sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  nit: '<path d="M20.5 14A8.7 8.7 0 0 1 10 3.5 8.8 8.8 0 1 0 20.5 14Z"/>',
  clarianes: '<circle cx="8" cy="8" r="4"/><path d="M8 1v1M1 8h1m1-5 1 1m9-1-1 1M8 20h10a4 4 0 0 0 0-8 5 5 0 0 0-9.5-1A4.5 4.5 0 0 0 8 20Z"/>',
  clarianesNit: '<path d="M13 3a5 5 0 0 0 7 6 6 6 0 0 1-10-4 6 6 0 0 1 3-2ZM6 21h11a4 4 0 0 0 0-8 5 5 0 0 0-9-1 4.5 4.5 0 0 0-2 9Z"/>',
  nuvols: '<path d="M6 19h12a4 4 0 0 0 .5-8A6 6 0 0 0 7 9a5 5 0 0 0-1 10Z"/>',
  boira: '<path d="M7 13a4 4 0 1 1 1-7.87A5 5 0 0 1 18 7a3 3 0 0 1 0 6H7ZM4 17h16M7 21h10"/>',
  pluja: '<path d="M6 14h12a4 4 0 0 0 0-8 5 5 0 0 0-9.5-1A4.5 4.5 0 0 0 6 14Zm1 4-1 3m6-3-1 3m6-3-1 3"/>',
  neu: '<path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 4l3 3 3-3M9 20l3-3 3 3M4 10l4-1-1-4m13 9-4 1 1 4M4 14l4 1-1 4m13-9-4-1 1-4"/>',
  tempesta: '<path d="M5 14a4 4 0 0 1 1-8 6 6 0 0 1 11 0 4 4 0 0 1 1 8M13 11l-4 6h4l-2 5 6-8h-4l2-3"/>',
  desconegut: '<path d="M10 5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0V5Zm2 4v9"/>',
};
