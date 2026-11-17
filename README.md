# Súria · plataforma (frontend)

Web app *mobile-first* per a la gent de Súria: veïns de tota la vida, comerços i nouvinguts, i, en menor mesura, visitants. Primera fase: només frontend, pensat per passar després a app nativa.

> Prototip fet des de zero (17/11/2026). **Tot el contingut és d'exemple** i porta l'etiqueta «Exemple» a la interfície. No hi ha backend: la sessió i la participació es guarden al dispositiu.

## Executar

```bash
npm install
npm run dev        # http://127.0.0.1:5180
npm run build      # comprova tipus i genera dist/
npm run preview    # serveix dist/ a http://127.0.0.1:5181
```

Requereix Node 22 o superior. Si es publica en un allotjament estàtic, cal redirigir totes les rutes a `index.html` (SPA).

## Què hi ha

| Pantalla | Ruta | Per a què |
|---|---|---|
| Inici | `/` | Salutació, «Pregunta a Súria», bus, farmàcia, residus, agenda propera, comunitat, propostes, comerç i tràmits ràpids |
| Agenda | `/agenda`, `/agenda/:id` | Filtre per dia i tipus, «Hi vaig», «Busco companyia», «Primera vegada? Això és el que passarà», afegir al calendari |
| Pregunta a Súria | `/pregunta` | Xat complet: streaming, aturar, regenerar, copiar, valorar, fonts, accions, historial, dictat per veu i adjunts |
| Comunitat | `/comunitat` | Mur per canals, publicar, respondre, «Gràcies», pregunta de la setmana, grups i normes |
| La veu del poble | `/comunitat/veu` | Propostes amb suports (llindar de 250), enquestes i com funciona |
| El poble | `/poble` | Accés a tot, telèfons, lectura còmoda i com es finança |
| Comerç | `/poble/comerc`, `/poble/comerc/:id` | Obert ara, ofertes, Carnet Súria, horari confirmat pel negoci |
| Tràmits | `/poble/tramits` | Guies pas a pas, què cal portar i quant es triga |
| Incidències | `/poble/incidencia` | Avís en tres passos amb ubicació i foto |
| Nou al poble | `/poble/benvinguda` | Primers 30 dies amb progrés, padrins de benvinguda i sopar de benvinguda |
| Visita’ns | `/poble/descobreix` | Turisme amb calma: normes, hores tranquil·les, rutes amb places limitades |
| Per a negocis | `/negocis` | Plans i compromisos |
| Compte | `/entrar`, `/jo`, `/avisos` | Accés per codi, perfil, Carnet Súria, ajustos i avisos |

## Decisions

- **Stack:** React 19, React Router, Vite i TypeScript; `motion` per a les transicions i `lucide-react` per a les icones. Res més. React facilita passar a React Native.
- **Llengües:** català per defecte i castellà complet. Els textos són al costat de cada pantalla, `t('català', 'castellano')`. Les publicacions dels veïns no es tradueixen.
- **Accessibilitat i edat:** text base de 17 px, mida ajustable fins al 125 %, contrast alt, tema fosc, objectius tàctils de 46 px o més, navegació amb noms visibles, `prefers-reduced-motion` respectat. Drecera «/» per preguntar.
- **Honestedat:** el contingut de mostra sempre ho diu; l'assistent diu quan no sap una cosa i no s'inventa dades.
- **Model de negoci:** fitxa gratuïta per a comerços; «Botiga viva» (19 €/mes) i «Destacat» (39 €/mes), preus orientatius. Tot el que és pagat porta etiqueta i mai influeix en les respostes de l'assistent. El Carnet Súria (gratuït per a veïns) porta clients als comerços adherits.
- **Turisme:** secció secundària, amb normes de respecte, hores tranquil·les i rutes amb places limitades.

## Connectar el model d'IA

`src/lib/assistant.ts` defineix la interfície `Provider`:

```ts
stream(history, question, lang, signal): AsyncIterable<{ text?: string; sources?: Source[]; actions?: Action[] }>
```

1. Crea un endpoint al teu backend que cridi el model amb streaming i amb el context del poble (agenda, comerços, tràmits, fonts oficials). La clau de l'API només ha de ser al servidor.
2. Implementa un `Provider` que llegeixi aquest stream i, al final, retorni les fonts i les accions.
3. Fes que `getProvider()` el retorni. La interfície del xat no canvia.

## Substituir el contingut d'exemple

- `src/lib/demo.ts`: activitats, publicacions, comerços, grups, propostes, avisos, horaris i guies de tràmits.
- `src/lib/store.ts`: estat al dispositiu (sessió, «Hi vaig», suports, publicacions…). És l'única peça que cal canviar per l'API quan hi hagi backend.
- `src/lib/weather.ts`: temps real (Open-Meteo, sense clau).

## Estructura

```
src/
  App.tsx, main.tsx
  components/  Shell (barres i fulls), Cards, Bits, Icon
  screens/     una pantalla per fitxer
  lib/         store, i18n, demo, assistant, when, weather, ui
  styles/      tokens, base, ui, screens
```
