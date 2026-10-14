---
name: Súria (prototip)
description: Web per viure i conèixer Súria; direcció «Façanes» (14/10/2026). Substitueix Silvinita B (etiqueta git silvinita-b-2026-10-14 i còpia a archiu/silvinita-b-2026-10-14/).
colors:
  calc: "#fdfcfa"
  pedra: "#f2eee7"
  tinta: "#1d2532"
  tinta-2: "#4a5363"
  filet: "#d6cfc3"
  cel: "#dfe7ee"
  cel-fort: "#c3d2df"
  cel-tinta: "#35506b"
  ocre: "#e8b14a"
  ocre-clar: "#f8e6bd"
  ocre-tinta: "#6f4c0d"
  teula: "#c0582f"
  teula-clar: "#f5d9cb"
  teula-tinta: "#9a3d1b"
  rosa: "#eab7a9"
  turo: "#2f4f36"
  turo-clar: "#dfe8dc"
  sobre-turo: "#f6f3ec"
  sobre-turo-2: "#cfdccb"
typography:
  brand-home:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(4.75rem, 21vw, 17rem)"
    fontWeight: 700
    fontVariation: "wdth 90"
    lineHeight: 0.78
    letterSpacing: "-0.055em"
  brand:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 4.25rem)"
    fontWeight: 700
    fontVariation: "wdth 82"
    lineHeight: 0.82
    letterSpacing: "-0.045em"
  greeting:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6.2vw, 5.25rem)"
    fontWeight: 700
    fontVariation: "wdth 88"
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.8vw, 3.25rem)"
    fontWeight: 700
    fontVariation: "wdth 88"
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.3125rem, 1.6vw, 1.5rem)"
    fontWeight: 650
    lineHeight: 1.2
  nav:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.7vw, 1.5rem)"
    fontWeight: 600
  body:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.55
  body-small:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.0625rem"
  meta:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.45
  label:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 650
rounded:
  none: "0"
  tag: "0.3em"
  date: "0 0 0.4rem 0.4rem"
  panel: "0.75rem"
spacing:
  base: "4px"
  pad: "clamp(1rem, 4vw, 3.5rem)"
  max: "90rem"
components:
  service-bar:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.calc}"
    accent: "{colors.ocre}"
  nav-task:
    textColor: "{colors.tinta}"
    height: "3.25rem"
    swatch: "0.55em × 0.8em, color de la façana"
  nav-task-active:
    fontWeight: 750
    underline: "3px, color de la façana"
  greeting-band:
    background: "linear-gradient(cel → llum càlida), segons matí / tarda / vespre"
    typography: "{typography.greeting}"
  date-window:
    backgroundColor: "{colors.ocre-clar}"
    borderTop: "4px {colors.ocre}"
    rounded: "{rounded.date}"
  pharmacy-turn:
    backgroundColor: "{colors.cel}"
    rounded: "{rounded.panel}"
  upcoming-poster:
    backgroundColor: "{colors.ocre}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.panel}"
  shop-card:
    borderTop: "4px {colors.teula}"
    state-panel: "{colors.pedra} / {colors.teula-clar} quan hi ha horari comunicat"
  maturity-tag:
    border: "1.5px solid; discontinu per a Idea i Demo"
    rounded: "{rounded.tag}"
    typography: "{typography.label}"
  warning:
    backgroundColor: "{colors.teula-clar}"
    rounded: "{rounded.panel}"
  page-opening:
    backgroundColor: "color clar de la façana"
    borderTop: "6px color de la façana"
  ideas-band:
    backgroundColor: "{colors.turo}"
    textColor: "{colors.sobre-turo}"
  footer:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.calc}"
---

# Design System: Súria (prototip)

## Overview

**Direcció «Façanes»** (14/10/2026). Surt de l'única foto del poble amb permís comprovat (Krzysztof Golik, 2022): les façanes ocre, teula, rosa i calç apilades al turó, sota un cel de pissarra. La web vol semblar feta a Súria i per a la gent de Súria: clara com un programa de festa major, útil com el tauler de la plaça, càlida com el carrer.

Substitueix Silvinita B (sal i carbó, serif editorial). La versió anterior es pot recuperar amb l'etiqueta git `silvinita-b-2026-10-14` i es pot obrir construïda a `archiu/silvinita-b-2026-10-14/dist/`.

Tres gestos fan la identitat:
1. **El nom de Súria a tota amplada** a la portada, com fa Lentos amb el seu nom; compacte a la resta de pàgines.
2. **«Avui a Súria»**: una frase gran feta amb les dades d'avui (agenda i farmàcia de guàrdia), sobre un cel que canvia amb el moment del dia, com la salutació de Belle Isle. Si una dada falta o ha caducat, la frase ho diu.
3. **Cada mena de contingut té la seva façana**: agenda ocre, primers passos cel, comerços teula, cap on anem verd turó. El color s'acompanya sempre del nom; mai és l'únic senyal.

Mode: Read per a la portada (consulta ràpida i identitat) i Operate/Read per a les pàgines de tasca.

## Colors

- **Neutres:** calç `#fdfcfa` (fons), pedra `#f2eee7` (superfície secundària), tinta `#1d2532` (text, del cel de tempesta), tinta-2 `#4a5363` (text secundari, ≥ 7:1 sobre calç), filet `#d6cfc3`.
- **Façanes:** ocre `#e8b14a` / `#f8e6bd` / `#6f4c0d`; cel `#c3d2df` / `#dfe7ee` / `#35506b`; teula `#c0582f` / `#f5d9cb` / `#9a3d1b`; turó `#2f4f36` / `#dfe8dc`. Cada secció declara `data-facana` i rep `--f`, `--f-clar` i `--f-tinta`.

### Named Rules
- **Color amb nom.** Cap color sol vol dir res: la mostra de la navegació porta el nom de la tasca; els estats porten paraules i forma.
- **Avís en teula clara.** Agenda caducada, torn de farmàcia sense actualitzar: fons teula clar i text en tinta, sempre amb l'enllaç a la font oficial.
- **Clar per defecte.** Escena d'ús: veïns, sovint grans, amb el mòbil al carrer i de dia. No hi ha mode fosc.

## Typography

- **Bricolage Grotesque** (variable: pes, amplada i mida òptica; OFL): la veu de Súria. Marca, títols, salutació, navegació, dates, hores, etiquetes i accions. Una mica estreta en els títols grans (`wdth` 82–90), com la lletra dels cartells de festa major; ample en la salutació i a mida de text.
- **Atkinson Hyperlegible Next** (variable; OFL): lectura, a 19 px, dissenyada per a persones amb baixa visió.

Per què: les tintes irregulars de Bricolage donen calidesa i caràcter local sense nostàlgia, i l'eix d'amplada permet que el nom ompli l'espai com un rètol. Atkinson Next substitueix Atkinson Hyperlegible amb més pesos i la mateixa llegibilitat. Decisió provisional fins a provar-la amb lectura real.

### Hierarchy
Marca de portada 76–272 px · títol de pàgina 40–84 px · títol de secció 32–52 px · salutació 28–56 px · títol de peça 21–24 px · text 19 px · secundari 17 px · font i meta 16 px · etiqueta 15 px (mínim).

### Named Rules
- **Cap text sota 15 px.** Amb el text al 200 % no es perd res ni apareix scroll horitzontal (provat).
- **Hores en la lletra de dades:** dins del text, les hores van en Bricolage i no es parteixen.

## Layout

Contenidor de 90rem amb marge lateral `clamp(1rem, 4vw, 3.5rem)`. Portada: franja de servei → nom → tasques sobre un filet de 2 px → «Avui a Súria» (7/12 frase, 5/12 foto) → agenda amb pròximament a sota (7/12) i primers passos al costat (5/12) → comerços a tota amplada → cap on anem en la franja verda → què estem provant → peu. Mòbil: avui, agenda, primers passos, pròximament, comerços.

Pàgines de tasca: obertura del color de la seva façana (filet de 6 px a dalt), cos de lectura de 48rem màxim i lateral enganxós amb fonts oficials i altres tasques.

### Named Rules
- **A la primera pantalla, les tasques i el resum d'avui.** A l'escriptori també el títol de l'agenda; al mòbil, l'agenda comença abans d'1,3 pantalles (provat).
- **Filets, no caixes.** Les llistes s'obren amb un filet de tinta de 2 px i se separen amb filets fins. Només tenen fons el torn de farmàcia, el cartell de pròximament, els avisos i l'estat d'un comerç.

## Elevation & Depth
Sense ombres. La profunditat la donen el color de façana i els filets.

## Shapes
Cantonades de 0.75rem en fotos, torns, cartell i avisos; 0.3em a les etiquetes; la data de l'agenda és una «finestra» amb filet superior de 4 px i cantonades inferiors arrodonides.

## Motion
Un sol moment: el cel d'«Avui a Súria» passa al color del moment del dia (1,6 s, ease-out exponencial) quan el script calcula l'hora de Súria. Petits gestos: la fletxa de les accions avança i la mostra de la navegació creix en passar-hi. Tot es desactiva amb `prefers-reduced-motion`.

## Components

### Franja de servei
Tinta, a dalt de tot: «Prototip independent, en proves amb veïns. No és una web de l'Ajuntament.» (independent en ocre), data d'avui a Súria i CA/ES. Mai sembla municipal.

### Navegació de tasques
Quatre paraules grans sobre un filet de tinta, cada una amb la mostra de la seva façana. La pàgina actual: subratllat de 3 px del seu color i pes 750. Al mòbil, 2×2 (una columna amb el text ampliat).

### Avui a Súria
Frase composta per `src/lib/ara.ts` (provada en tres zones horàries): salutació, data, activitats d'avui que encara no han acabat o «ja han passat», farmàcia de guàrdia vigent amb l'hora de canvi, o els avisos «No tenim l'agenda d'aquesta setmana» / «No tenim el torn… actualitzat». Cada tros enllaça al detall o a la font oficial. Sense JavaScript, una benvinguda que no depèn de l'hora.

### Actividad de agenda (E2)
Finestra de data ocre, títol, hora en negreta · lloc, requisit amb un filet fi del color de la façana, acció «Fitxa a suria.cat». Passada: finestra en pedra i «Ja ha passat».

### Primers passos (E3) i torn de farmàcia
Títol, resum i accions (tràmit en línia, trucar). Cada torn és una fitxa de cel amb «Fins…», el nom i l'adreça, i el telèfon com a acció. Torn acabat: pedra i «Aquest torn ja ha acabat» (a la portada desapareix). Sense torn vigent: avís en teula clara amb la font oficial.

### Pròximament
Cartell ocre (programa de festa major): títol estret, dates, punts essencials, enllaç al programa i font.

### Ficha de comercio (E1)
Nom com un rètol amb un filet teula a dalt, ofici i adreça, i l'estat amb paraules i forma: quadrat ple (horari comunicat), buit (sense confirmar), discontinu (avui no), gris (finalitzat). Mai «obert ara». Sense comerços: una frase gran i honesta i la promesa «No direm mai “obert ara”».

### Etiqueta de maduresa
Text dins d'un marc fi («En prova», «Real»); discontinu per a «Idea» i «Demo». Al costat de cada títol de secció.

### Línia de procedència
Sota cada peça al detall, darrere d'un filet discontinu: maduresa, font, consultat, vigència i responsable.

### Cap on anem
Franja verda del turó amb el text d'identitat i la seva font, i les idees amb etiqueta «Idees · encara no existeixen» i filets discontinus. Mai semblen funcions disponibles.

### Peu
Bloc de tinta amb el nom, l'avís d'independència, la fe d'errades, l'enllaç a les fonts oficials i la nota de privacitat.

## Pending
- Lectura real amb persones grans de les dues lletres i de la mida de 19 px.
- Fotos pròpies o cedides de vida quotidiana (mercat, carrers, Caramelles) i dels comerços participants; la foto de 1924 (domini públic) segueix candidata.
- Lector de pantalla, mòbil real i revisió humana del castellà (pendents de l'etapa anterior, no tancats per aquest redisseny).
