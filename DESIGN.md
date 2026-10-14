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
    fontSize: "clamp(4.5rem, 13vw, 12rem) (mòbil: clamp(4rem, 18vw, 6rem))"
    fontWeight: 700
    fontVariation: "wdth 90"
    lineHeight: 0.8
    letterSpacing: "-0.05em"
  brand:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 4.25rem)"
    fontWeight: 700
    fontVariation: "wdth 82"
    lineHeight: 0.82
    letterSpacing: "-0.045em"
  greeting:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.4vw, 3rem) (mòbil: 1.5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  fact:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.3125rem, 1.9vw, 1.75rem)"
    fontWeight: 650
    lineHeight: 1.15
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
  home-scene:
    image: "foto del poble a tota amplada, alçada clamp(14rem, 28vw, 26rem); 2:1 al mòbil"
    brand: "{typography.brand-home}, en tinta sobre el cel de la foto"
    credit: "sobre la foto a baix a la dreta (escriptori); a sota (mòbil)"
  today-summary:
    background: "linear-gradient(cel → llum càlida), segons matí / tarda / vespre"
    typography: "{typography.greeting}"
    facts: "agenda (filet ocre) i farmàcia (filet cel), {typography.fact}"
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
1. **El poble i el seu nom, junts**: a la portada, la foto de Súria a tota amplada amb «Súria» escrit al cel (segona passada, 14/10/2026). A la resta de pàgines, la marca compacta.
2. **«Avui a Súria»**: una salutació breu i dos fets per llegir d'un cop d'ull (agenda i farmàcia de guàrdia), sobre un cel que canvia amb el moment del dia, com fa Belle Isle. Si les activitats d'avui ja han passat, mana la pròxima confirmada amb la seva data; una absència és una nota petita, no el missatge principal.
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

Contenidor de 90rem amb marge lateral `clamp(1rem, 4vw, 3.5rem)`. Portada: franja de servei → foto a tota amplada amb el nom al cel → tasques sobre un filet de 2 px → «Avui a Súria» (salutació 4/13, agenda 5/13, farmàcia 4/13) → agenda amb el cartell de pròximament a sota (7/12) i, al costat, primers passos i comerços (5/12; nota compacta si no n'hi ha; a tota amplada si n'hi ha) → cap on anem en la franja verda, amb la frase d'identitat i l'enllaç a «Què estem provant» → peu. Mòbil: foto i nom, tasques, avui, agenda, primers passos, pròximament, comerços.

Pàgines de tasca: obertura del color de la seva façana (filet de 6 px a dalt), cos de lectura de 48rem màxim i lateral enganxós amb fonts oficials i altres tasques.

### Named Rules
- **A la primera pantalla, el poble, les tasques i el resum d'avui.** El títol del resum, dins dels 2/3 superiors; el primer fet, dins dels 3/4. A l'escriptori també hi ha el títol de l'agenda; al mòbil, l'agenda comença abans d'1,3 pantalles (provat).
- **Una sola explicació per cosa.** L'avís d'independència, a la franja de servei i al peu. Les fonts a la portada, en una línia curta i comprensible («Font: agenda de suria.cat · consultada el 12/10/2026»). La metodologia, a les pàgines de detall.
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

### Escena de portada
La foto de Súria a tota amplada, retallada perquè el cel quedi a dalt i el campanar dins del quadre, amb «Súria» (h1) en tinta sobre el cel. El crèdit (autor, any, «retallada», llicència, original) va sobre la foto a l'escriptori i a sota al mòbil, amb objectius de 44 px.

### Avui a Súria
Resum compost per `src/lib/ara.ts`, provat en tres zones horàries:
- **Salutació i data** («Bon vespre · Dimecres 14 d'octubre»).
- **Agenda:** l'activitat d'avui que encara no ha acabat, amb «I 1 activitat més avui» si n'hi ha més. Si ja han passat, «Pròxima activitat» amb la seva data i la nota «Les d'avui ja han passat.». Amb la setmana caducada, l'activitat verificada en curs o la pròxima, amb la nota «No tenim l'agenda d'aquesta setmana.» i l'enllaç a l'agenda de suria.cat.
- **Farmàcia:** el torn vigent, amb l'adreça, fins quan i el telèfon com a acció. Sense torn vigent, l'avís i la font oficial.
- **Font:** una sola línia per a tot el resum.

Sense JavaScript, el resum enllaça a l'agenda i als torns, sense dependre de l'hora. L'alçada queda reservada perquè la pàgina no salti.

### Actividad de agenda (E2)
Finestra de data ocre, títol, hora en negreta · lloc, requisit amb un filet fi del color de la façana, acció «Fitxa a suria.cat». Passada: finestra en pedra i «Ja ha passat».

### Primers passos (E3) i torn de farmàcia
Títol, resum i accions (tràmit en línia, trucar). A la portada, la farmàcia només porta l'enllaç «Tots els torns de guàrdia»; el torn vigent ja és al resum d'avui. Cada torn és una fitxa de cel amb «Fins…», el nom i l'adreça, i el telèfon com a acció. Torn acabat: pedra i «Aquest torn ja ha acabat» (a la portada desapareix). Sense torn vigent: avís en teula clara amb la font oficial.

### Pròximament
Cartell ocre (programa de festa major): títol estret, dates, punts essencials, enllaç al programa i font.

### Ficha de comercio (E1)
Nom com un rètol amb un filet teula a dalt, ofici i adreça, i l'estat amb paraules i forma: quadrat ple (horari comunicat), buit (sense confirmar), discontinu (avui no), gris (finalitzat). Mai «obert ara». Sense comerços, a la portada: una nota compacta en teula clara al costat dels primers passos, amb la promesa «No direm mai “obert ara”».

### Etiqueta de maduresa
Text dins d'un marc fi («En prova», «Real»); discontinu per a «Idea» i «Demo». Al costat de cada títol de secció.

### Línia de procedència
Sota cada peça al detall, darrere d'un filet discontinu: maduresa, font, consultat, vigència i responsable.

### Cap on anem
Franja verda del turó amb la frase d'identitat i la seva font, la introducció, les idees amb l'etiqueta «Idees · encara no existeixen» i filets discontinus (mai semblen funcions disponibles), i l'enllaç a «Què estem provant».

### Peu
Bloc de tinta amb el nom, l'avís d'independència, la fe d'errades, l'enllaç a les fonts oficials i la nota de privacitat.

## Pending
- Lectura real amb persones grans de les dues lletres i de la mida de 19 px.
- Fotos pròpies o cedides de vida quotidiana (mercat, carrers, Caramelles) i dels comerços participants; la foto de 1924 (domini públic) segueix candidata.
- Lector de pantalla, mòbil real i revisió humana del castellà (pendents de l'etapa anterior, no tancats per aquest redisseny).
