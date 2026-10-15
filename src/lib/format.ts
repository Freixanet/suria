// Dates i hores en el format de cada llengua (24 h). Les dates són de rellotge de Súria.
import type { Llengua } from '../i18n/ui.ts';
import { diaSetmana, horaMadrid } from './hora-local.ts';

const diesCurts = {
  ca: ['Dg', 'Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds'],
  es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
};
const diesLlargs = {
  ca: ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte'],
  es: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
};
// En català, la preposició s'apostrofa davant de vocal.
const mesosAmbDe = {
  ca: ['de gener', 'de febrer', 'de març', 'd’abril', 'de maig', 'de juny', 'de juliol', 'd’agost', 'de setembre', 'd’octubre', 'de novembre', 'de desembre'],
  es: ['de enero', 'de febrero', 'de marzo', 'de abril', 'de mayo', 'de junio', 'de julio', 'de agosto', 'de septiembre', 'de octubre', 'de noviembre', 'de diciembre'],
};

const parts = (data: string) => data.split('-').map(Number) as [number, number, number];

/** 'Dc 14' / 'Mié 14' */
export function diaCurt(data: string, ll: Llengua): string {
  return `${diesCurts[ll][diaSetmana(data)]} ${parts(data)[2]}`;
}

/** 'Dimecres 14' / 'Miércoles 14': el dia sencer, per a la finestra de data de l'agenda. */
export function diaNumero(data: string, ll: Llengua): string {
  const nom = diesLlargs[ll][diaSetmana(data)];
  return `${nom.charAt(0).toUpperCase()}${nom.slice(1)} ${parts(data)[2]}`;
}

/** 'Divendres 16 – diumenge 18' / 'Viernes 16 – domingo 18' */
export function rangDies(inici: string, fi: string | undefined, ll: Llengua): string {
  if (!fi || fi === inici) return diaNumero(inici, ll);
  return `${diaNumero(inici, ll)} – ${diesLlargs[ll][diaSetmana(fi)]} ${parts(fi)[2]}`;
}

/** 'Dv 16–dg 18' / 'Vie 16–dom 18' */
export function rangCurt(inici: string, fi: string | undefined, ll: Llengua): string {
  if (!fi || fi === inici) return diaCurt(inici, ll);
  const segon = diaCurt(fi, ll);
  return `${diaCurt(inici, ll)}–${segon.charAt(0).toLowerCase()}${segon.slice(1)}`;
}

/** '14 d’octubre' / '14 de octubre' */
export function diaMes(data: string, ll: Llengua): string {
  const [, m, d] = parts(data);
  return `${d} ${mesosAmbDe[ll][m - 1]}`;
}

/** 'dijous 15 d’octubre' */
export function diaLlarg(data: string, ll: Llengua): string {
  return `${diesLlargs[ll][diaSetmana(data)]} ${diaMes(data, ll)}`;
}

/** 'del dilluns 12 al diumenge 18 d’octubre' (amb el mes repetit si canvia). */
export function rangSetmana(inici: string, fi: string, ll: Llengua): string {
  const mateixMes = parts(inici)[1] === parts(fi)[1];
  const primer = mateixMes ? `${diesLlargs[ll][diaSetmana(inici)]} ${parts(inici)[2]}` : diaLlarg(inici, ll);
  return `del ${primer} al ${diaLlarg(fi, ll)}`;
}

/** 'Dimarts, 13 d’octubre de 2026' (amb majúscula inicial, per a la capçalera). */
export function dataCompleta(data: string, ll: Llengua): string {
  const text = `${diesLlargs[ll][diaSetmana(data)]}, ${diaMes(data, ll)} de ${parts(data)[0]}`;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** '16.15' en català, '16:15' en castellà; '9.00', no '09.00'. */
export function hora(h: string, ll: Llengua): string {
  // Dins del text, sense zero inicial (IEC: «7.30 h», no «07.30 h»).
  const sensezero = h.replace(/^0(\d)/, '$1');
  return ll === 'ca' ? sensezero.replace(':', '.') : sensezero;
}

/** Interval horari amb ' h': '16.15 – 17.15 h'. */
export function franja(inici: string, fi: string | undefined, ll: Llengua): string {
  return fi ? `${hora(inici, ll)} – ${hora(fi, ll)} h` : `${hora(inici, ll)} h`;
}

/** Hora de rellotge de Súria d'un instant. */
export function horaInstant(instant: Date, ll: Llengua): string {
  return hora(horaMadrid(instant), ll);
}

/** '12/10/2026' */
export function dataNumerica(data: string): string {
  const [a, m, d] = parts(data);
  return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${a}`;
}

/** Telèfon públic +34938682800 → '93 868 28 00'. */
export function telefonVisible(e164: string): string {
  const n = e164.replace(/^\+34/, '');
  return `${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5, 7)} ${n.slice(7, 9)}`;
}
