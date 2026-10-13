// Lectura i ordenació del contingut. Les pàgines no filtren dates pel seu compte: ho fan aquí.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Activitat = CollectionEntry<'agenda'>['data'];
export type Pas = CollectionEntry<'passos'>['data'];
export type Comerc = CollectionEntry<'comercos'>['data'];

export async function setmanaActual() {
  const setmanes = await getCollection('setmanes');
  if (setmanes.length === 0) throw new Error('Cal una setmana a src/content/setmanes/.');
  return setmanes.map((s) => s.data).sort((a, b) => b.inici.localeCompare(a.inici))[0];
}

/** Activitats que toquen algun dia de la setmana i les que comencen després (Pròximament). */
export async function agenda() {
  const setmana = await setmanaActual();
  const totes = (await getCollection('agenda'))
    .map((e) => e.data)
    .sort((a, b) => a.dies.inici.localeCompare(b.dies.inici) || (a.hores[0]?.inici ?? '').localeCompare(b.hores[0]?.inici ?? ''));
  const fiDe = (a: Activitat) => a.dies.fi ?? a.dies.inici;
  return {
    setmana,
    aquestaSetmana: totes.filter((a) => a.dies.inici <= setmana.fi && fiDe(a) >= setmana.inici),
    proximament: totes.filter((a) => a.dies.inici > setmana.fi),
  };
}

export async function passos() {
  return (await getCollection('passos')).map((e) => e.data).sort((a, b) => a.ordre - b.ordre);
}

export async function comercos() {
  return (await getCollection('comercos')).map((e) => e.data).sort((a, b) => a.nom.localeCompare(b.nom, 'ca'));
}

export async function idees() {
  return (await getCollection('idees')).map((e) => e.data).sort((a, b) => a.ordre - b.ordre);
}

/** La data de consulta més recent d'un conjunt de peces. */
export function consultaMesRecent(peces: { consultat: string }[]): string {
  return peces.map((p) => p.consultat).sort().at(-1) ?? '';
}
