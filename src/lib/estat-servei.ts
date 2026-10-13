// Estat del dia d'un negoci participant (E1), segons la decisió D4 de la revisió d'enginyeria.
// Una sola funció, usada per la pàgina, per les proves i per res més (CQ1).
import { dataMadrid, instantMadrid, sumaDies } from './hora-local.ts';

export type MomentLocal = { data: string; hora: string };

export type Confirmacio = {
  /** Jornada de servei declarada pel negoci ('AAAA-MM-DD', hora de Súria). */
  dataServei: string;
  /** Inici i fi del servei ('HH:MM'). Si la fi és igual o anterior a l'inici, acaba l'endemà. */
  inici?: string;
  fi?: string;
  /** confirmat: horari comunicat · canvi: substitueix l'anterior · cancelat: avui no serveix. */
  estat: 'confirmat' | 'canvi' | 'cancelat';
  /** Quan el promotor va rebre el missatge (hora de Súria). */
  rebutA: MomentLocal;
};

export type Estat =
  | { tipus: 'sense-confirmar' }
  | { tipus: 'cancelat'; dataServei: string; rebutA: Date }
  | {
      tipus: 'abans' | 'durant' | 'finalitzat';
      dataServei: string;
      inici: Date;
      fi: Date;
      rebutA: Date;
    };

const instantDe = (m: MomentLocal) => instantMadrid(m.data, m.hora);

/** Finestra real del servei, amb la fi a l'endemà si travessa la mitjanit. */
export function finestra(c: Confirmacio): { inici: Date; fi: Date } | null {
  if (!c.inici || !c.fi) return null;
  const dataFi = c.fi <= c.inici ? sumaDies(c.dataServei, 1) : c.dataServei;
  return { inici: instantMadrid(c.dataServei, c.inici), fi: instantMadrid(dataFi, c.fi) };
}

/** L'últim missatge rebut (fins ara) per a una jornada: un canvi o una cancel·lació invaliden els anteriors. */
function vigent(confirmacions: Confirmacio[], dataServei: string, ara: Date): Confirmacio | undefined {
  return confirmacions
    .filter((c) => c.dataServei === dataServei && instantDe(c.rebutA).getTime() <= ara.getTime())
    .sort((a, b) => instantDe(a.rebutA).getTime() - instantDe(b.rebutA).getTime())
    .at(-1);
}

function classifica(c: Confirmacio, ara: Date): Estat {
  const rebutA = instantDe(c.rebutA);
  if (c.estat === 'cancelat') return { tipus: 'cancelat', dataServei: c.dataServei, rebutA };
  const f = finestra(c);
  // Sense un període exacte, la dada no es presenta com a confirmada (D4-7).
  if (!f) return { tipus: 'sense-confirmar' };
  const t = ara.getTime();
  const tipus = t < f.inici.getTime() ? 'abans' : t < f.fi.getTime() ? 'durant' : 'finalitzat';
  return { tipus, dataServei: c.dataServei, inici: f.inici, fi: f.fi, rebutA };
}

/**
 * Estat d'un negoci en un instant donat.
 * - La jornada d'ahir encara compta si el seu servei acaba després de mitjanit i no ha acabat.
 * - Una confirmació no val per a jornades posteriors: jornada nova sense missatge = «Sense confirmar».
 * - Mai diu «obert ara»: només l'horari comunicat pel negoci.
 */
export function estatServei(confirmacions: Confirmacio[], ara: Date): Estat {
  const avui = dataMadrid(ara);

  const ahir = vigent(confirmacions, sumaDies(avui, -1), ara);
  if (ahir && ahir.estat !== 'cancelat') {
    const estatAhir = classifica(ahir, ara);
    if (estatAhir.tipus === 'durant') return estatAhir;
  }

  const dAvui = vigent(confirmacions, avui, ara);
  if (!dAvui) return { tipus: 'sense-confirmar' };
  return classifica(dAvui, ara);
}
