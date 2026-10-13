import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { esquemaActivitat, esquemaComerc, esquemaIdea, esquemaPas, esquemaSetmana } from './lib/esquemes.ts';

// Les dades de prova (comerços de mostra) només entren en el build de proves (SURIA_PROVES=1),
// mai en el que es publica: una Demo no es barreja amb dades reals.
const baseComercos = process.env.SURIA_PROVES === '1' ? './tests/fixtures/comercos' : './src/content/comercos';

const yaml = (base: string) => glob({ pattern: '*.yaml', base });

export const collections = {
  setmanes: defineCollection({ loader: yaml('./src/content/setmanes'), schema: esquemaSetmana }),
  agenda: defineCollection({ loader: yaml('./src/content/agenda'), schema: esquemaActivitat }),
  passos: defineCollection({ loader: yaml('./src/content/passos'), schema: esquemaPas }),
  comercos: defineCollection({ loader: yaml(baseComercos), schema: esquemaComerc }),
  idees: defineCollection({ loader: yaml('./src/content/idees'), schema: esquemaIdea }),
};
