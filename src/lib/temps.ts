// Condicions actuals estimades: Open-Meteo, dades de model cada 15 minuts.
// Coordenades fixes del nucli de Súria (Idescat), mai la ubicació del visitant.
export const TEMPS_URL = 'https://api.open-meteo.com/v1/forecast?latitude=41.835&longitude=1.7533&current=temperature_2m,weather_code,is_day&timeformat=unixtime&timezone=Europe%2FMadrid';
export const REFRESC = 15 * 60_000;
export const VIGENCIA = 45 * 60_000;
export type MostraTemps = { temperatura: number; codi: number; dia: boolean; instant: number };
export function llegeixTemps(raw: unknown, ara = Date.now()): MostraTemps | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as { current?: Record<string, unknown>; current_units?: Record<string, unknown> };
  const c = r.current;
  if (!c || r.current_units?.temperature_2m !== '°C') return null;
  const { temperature_2m: t, weather_code: code, is_day: day, time } = c;
  if (typeof t !== 'number' || !Number.isFinite(t) || t < -80 || t > 60 ||
      typeof code !== 'number' || !Number.isInteger(code) || code < 0 || code > 99 ||
      (day !== 0 && day !== 1) || typeof time !== 'number' || !Number.isFinite(time)) return null;
  const instant = time * 1000;
  if (ara - instant > VIGENCIA || instant - ara > 5 * 60_000) return null;
  return { temperatura: t, codi: code, dia: day === 1, instant };
}
export function condicio(codi: number, dia: boolean) {
  if (codi === 0 || codi === 1) return dia ? 'sol' : 'nit';
  if (codi === 2) return dia ? 'clarianes' : 'clarianesNit';
  if (codi === 3) return 'nuvols';
  if (codi === 45 || codi === 48) return 'boira';
  if ([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(codi)) return 'pluja';
  if ([71,73,75,77,85,86].includes(codi)) return 'neu';
  if ([95,96,97,99].includes(codi)) return 'tempesta';
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
