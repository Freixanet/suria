// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// Web estàtica (D1). Català per defecte a l'arrel i castellà a /es/.
// Les fonts es serveixen des del propi lloc: cap petició a tercers en temps d'ús.
export default defineConfig({
  output: 'static',
  // Pages uses /suria/; local development keeps / unless explicitly configured.
  site: process.env.SURIA_SITE || undefined,
  base: process.env.SURIA_BASE || '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'ca',
    locales: ['ca', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  fonts: [
    {
      // Veu de Súria: marca, títols, navegació, dates i hores. Variable (pes, amplada i mida òptica).
      name: 'Bricolage Grotesque',
      cssVariable: '--font-display',
      provider: fontProviders.local(),
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/BricolageGrotesque-var-latin.woff2'],
            weight: '200 800',
            style: 'normal',
          },
        ],
      },
    },
    {
      // Lectura: dissenyada per a persones amb baixa visió.
      name: 'Atkinson Hyperlegible Next',
      cssVariable: '--font-text',
      provider: fontProviders.local(),
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/AtkinsonHyperlegibleNext-var-latin.woff2'], weight: '200 800', style: 'normal' },
          { src: ['./src/assets/fonts/AtkinsonHyperlegibleNext-var-latin-italic.woff2'], weight: '200 800', style: 'italic' },
        ],
      },
    },
  ],
});
