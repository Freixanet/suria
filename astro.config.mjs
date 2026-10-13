// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// Web estàtica (D1). Català per defecte a l'arrel i castellà a /es/.
// Les fonts es serveixen des del propi lloc: cap petició a tercers en temps d'ús.
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'ca',
    locales: ['ca', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  fonts: [
    {
      name: 'Schibsted Grotesk',
      cssVariable: '--font-display',
      provider: fontProviders.local(),
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/SchibstedGrotesk-500-900-latin.woff2'],
            weight: '500 900',
            style: 'normal',
          },
        ],
      },
    },
    {
      name: 'Atkinson Hyperlegible',
      cssVariable: '--font-text',
      provider: fontProviders.local(),
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/AtkinsonHyperlegible-400-latin.woff2'],
            weight: 400,
            style: 'normal',
          },
          {
            src: ['./src/assets/fonts/AtkinsonHyperlegible-700-latin.woff2'],
            weight: 700,
            style: 'normal',
          },
        ],
      },
    },
    {
      // Serif editorial només per a títols de pàgina i de secció (mínim 28 px).
      name: 'Gloock',
      cssVariable: '--font-serif',
      provider: fontProviders.local(),
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [{ src: ['./src/assets/fonts/Gloock-400-latin.woff2'], weight: 400, style: 'normal' }],
      },
    },
  ],
});
