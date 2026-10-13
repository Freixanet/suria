// Tot el prototip pensa en l'hora de Súria, sigui quina sigui la zona del dispositiu.
export const ZONA = 'Europe/Madrid';

const formatParts = new Intl.DateTimeFormat('en-GB', {
  timeZone: ZONA,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});

type Parts = { any: number; mes: number; dia: number; hora: number; minut: number; segon: number };

function partsMadrid(instant: Date): Parts {
  const p: Record<string, string> = {};
  for (const { type, value } of formatParts.formatToParts(instant)) p[type] = value;
  return {
    any: Number(p.year),
    mes: Number(p.month),
    dia: Number(p.day),
    hora: Number(p.hour),
    minut: Number(p.minute),
    segon: Number(p.second),
  };
}

const dosXifres = (n: number) => String(n).padStart(2, '0');

/** Data local de Súria ('AAAA-MM-DD') d'un instant. */
export function dataMadrid(instant: Date): string {
  const p = partsMadrid(instant);
  return `${p.any}-${dosXifres(p.mes)}-${dosXifres(p.dia)}`;
}

/** Hora local de Súria ('HH:MM') d'un instant. */
export function horaMadrid(instant: Date): string {
  const p = partsMadrid(instant);
  return `${dosXifres(p.hora)}:${dosXifres(p.minut)}`;
}

function desfasMinuts(instant: Date): number {
  const p = partsMadrid(instant);
  const comSiFosUTC = Date.UTC(p.any, p.mes - 1, p.dia, p.hora, p.minut, p.segon);
  return Math.round((comSiFosUTC - instant.getTime()) / 60000);
}

/**
 * Converteix una data i hora de rellotge de Súria en un instant real.
 * Té en compte els canvis d'horari d'estiu i d'hivern.
 */
export function instantMadrid(data: string, hora: string): Date {
  const [a, m, d] = data.split('-').map(Number);
  const [h, mi] = hora.split(':').map(Number);
  const aproximat = Date.UTC(a, m - 1, d, h, mi);
  const desfas = desfasMinuts(new Date(aproximat));
  let instant = aproximat - desfas * 60000;
  const desfasReal = desfasMinuts(new Date(instant));
  if (desfasReal !== desfas) instant = aproximat - desfasReal * 60000;
  return new Date(instant);
}

/** Suma (o resta) dies a una data 'AAAA-MM-DD'. */
export function sumaDies(data: string, dies: number): string {
  const [a, m, d] = data.split('-').map(Number);
  const t = new Date(Date.UTC(a, m - 1, d + dies));
  return `${t.getUTCFullYear()}-${dosXifres(t.getUTCMonth() + 1)}-${dosXifres(t.getUTCDate())}`;
}

/** Dia de la setmana d'una data 'AAAA-MM-DD' (0 = diumenge). */
export function diaSetmana(data: string): number {
  const [a, m, d] = data.split('-').map(Number);
  return new Date(Date.UTC(a, m - 1, d)).getUTCDay();
}
