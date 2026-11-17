// Temps actual a Súria (Open-Meteo, sense clau). Si falla, el giny no es mostra.
import { useEffect, useState } from 'react';

const URL = 'https://api.open-meteo.com/v1/forecast?latitude=41.835&longitude=1.753&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FMadrid&forecast_days=1';
export type Weather = { temp: number; code: number; max: number; min: number };

export function useWeather() {
  const [w, setW] = useState<Weather | null>(null);
  useEffect(() => {
    let alive = true;
    try {
      const c = JSON.parse(sessionStorage.getItem('suria:temps') ?? 'null');
      if (c && Date.now() - c.at < 20 * 60_000) { setW(c.w); return; }
    } catch { /* opcional */ }
    fetch(URL, { signal: AbortSignal.timeout(7000) })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!alive || !j?.current) return;
        const v = { temp: Math.round(j.current.temperature_2m), code: j.current.weather_code, max: Math.round(j.daily.temperature_2m_max[0]), min: Math.round(j.daily.temperature_2m_min[0]) };
        setW(v);
        try { sessionStorage.setItem('suria:temps', JSON.stringify({ at: Date.now(), w: v })); } catch { /* opcional */ }
      })
      .catch(() => { /* sense temps */ });
    return () => { alive = false; };
  }, []);
  return w;
}

export function sky(code: number, lang: 'ca' | 'es') {
  const ca = lang === 'ca';
  if (code === 0) return ca ? 'Cel serè' : 'Despejado';
  if (code <= 3) return ca ? 'Alguns núvols' : 'Algunas nubes';
  if (code <= 48) return ca ? 'Boira' : 'Niebla';
  if (code <= 67 || (code >= 80 && code <= 82)) return ca ? 'Pluja' : 'Lluvia';
  if (code <= 77 || code === 85 || code === 86) return ca ? 'Neu' : 'Nieve';
  return ca ? 'Tempesta' : 'Tormenta';
}
