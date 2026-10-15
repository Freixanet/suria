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
    fontSize: "clamp(2.5rem, 6vw, 4.5rem); 3.75rem a escriptori"
    fontWeight: 700
    fontVariation: "wdth 88"
    lineHeight: 1
    letterSpacing: "-0.05em"
  brand:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 4.25rem)"
    fontWeight: 700
    fontVariation: "wdth 82"
    lineHeight: 1
    letterSpacing: "-0.045em"
  greeting:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.5vw, 1.375rem)"
    fontWeight: 500
    textColor: "{colors.tinta-2}"
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
  pad: "clamp(1rem, 2.5vw, 4rem)"
  max: "180rem composició; 90rem pàgines de lectura"
components:
  service-bar:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.calc}"
    accent: "{colors.ocre}"
    content: "avís d'independència; versió breu d'una línia al mòbil; sense idiomes"
  section-opening:
    order: "títol; a sota i alineada a l'esquerra, la maduresa seguida del període o la descripció"
  nav-task:
    textColor: "{colors.tinta}"
    height: "3.25rem"
    swatch: "0.55em × 0.8em, color de la façana"
  nav-task-active:
    fontWeight: 750
    underline: "3px, color de la façana"
  home-photo:
    image: "foto del poble a tota amplada i neta, alçada clamp(16rem, 31vw, 30rem) amb enquadrament 60% 22%; 16:10 al mòbil (64% 50%)"
    credit: "dins de la foto, a baix a la dreta, sobre fons tinta 80% només darrere del text; 14 px; al mòbil, versió curta en una línia"
  today-summary:
    background: "{colors.calc} (sense franja ni degradat)"
    heading: "«Avui a Súria» ({typography.headline}); data, {typography.greeting}"
    facts: "agenda (filet ocre, títol més gran) i farmàcia (filet cel), {typography.fact}"
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
1. **El nom i el poble**: a la portada, «Súria» gran sobre fons clar al costat de les tasques i la llengua (com Lentos) i, a sota, la foto del poble a tota amplada, neta, amb el seu crèdit. A la resta de pàgines, la marca compacta.
2. **«Avui a Súria»**: títol fix, data en segon pla, i dos fets per llegir d'un cop d'ull (agenda i farmàcia de guàrdia) sobre el fons clar del contingut, amb el color només als filets d'accent. Si les activitats d'avui ja han passat, mana la pròxima confirmada amb la seva data; una absència és una nota petita, no el missatge principal.
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
Marca de portada 40–72 px (60 px a escriptori) · títol de pàgina 40–84 px · títol de secció 32–52 px · salutació 28–56 px · títol de peça 21–24 px · text 19 px · secundari 17 px · font i meta 16 px · etiqueta 15 px (mínim).

### Named Rules
- **Cap text sota 15 px.** Amb el text al 200 % no es perd res ni apareix scroll horitzontal (provat).
- **Hores en la lletra de dades:** dins del text, les hores van en Bricolage i no es parteixen.

## Layout

Composició fluida fins a 180rem en portada, capçalera i peu; marges `clamp(1rem, 2.5vw, 4rem)`. Les pàgines de lectura conserven el màxim de 90rem i el cos de 48rem. Prosa i detalls no s'eixamplen per omplir la pantalla.

Portada: franja de servei → marca «Ep, Súria!» i navegació → foto real → reixa compartida. El resum d'avui ocupa la primera fila de l'esquerra; l'agenda comença directament a sota, mentre bus i farmàcia ocupen la dreta sense estirar les targetes. Primers passos i comerços segueixen a la dreta; pròximament a l'esquerra. Si hi ha comerços participants, les fitxes ocupen tota l'amplada. Ordre del DOM i del mòbil: resum, serveis, agenda, primers passos, pròximament, comerços. La franja verda distribueix presentació i participació en dues columnes, una al mòbil; contacte directe amb el peu.

Cabecera: no es divideixen marca ni etiquetes. Tipografia i espais d'escriptori acotats (marca 3.75rem, navegació 1.125rem, espai entre tasques 1.5rem). Consulta del contenidor des de 80rem: una fila amb marca, quatre tasques i CA/ES; per sota, menú accessible i CA/ES al final del menú vertical. La consulta respon també a l'ampliació de la lletra. Sense JavaScript, les tasques continuen visibles.
Pàgines de tasca: obertura del color de la seva façana (filet de 6 px a dalt), cos de lectura de 48rem màxim i lateral enganxós amb fonts oficials i altres tasques.

### Named Rules
- **Prioritat de lectura.** Foto recognoscible i resum a l'inici; l'agenda no espera l'alçada de les targetes en escriptori. Al mòbil els serveis conserven dades i accions, amb farciment compacte, horaris per direcció i minuts secundaris. No s'imposa un llindar de pantalles que obligui a retallar la fotografia.
- **Títol i context.** «Avui a Súria» porta data a sota. No es mostren etiquetes «En prova» ni dates de consulta (decisió posterior del promotor); les dades estructurades les conserven. Idea i Demo sí es distingeixen explícitament.
- **El peu s'enganxa a una franja final.** Si la pàgina acaba amb una franja a tota amplada (`data-tanca-pagina`, com «Cap on anem» a la portada), el peu no hi deixa marge; a la resta de pàgines manté el seu marge superior.
- **Una sola explicació per cosa.** L'avís d'independència, a la franja de servei i al peu. Les fonts a la portada, en una línia curta i comprensible («Font: suria.cat»). La metodologia, a les pàgines de detall.
- **Filets, no caixes.** Les llistes s'obren amb un filet de tinta de 2 px i se separen amb filets fins. Només tenen fons el torn de farmàcia, el cartell de pròximament, els avisos i l'estat d'un comerç.

## Elevation & Depth
Sense ombres. La profunditat la donen el color de façana i els filets.

## Shapes
Cantonades de 0.75rem en fotos, torns, cartell i avisos; 0.3em a les etiquetes; la data de l'agenda és una «finestra» amb filet superior de 4 px i cantonades inferiors arrodonides.

## Motion
Sense moviment d'entrada ni de fons (el degradat del cel es va retirar el 14/10/2026: no aportava informació). Només petits gestos en passar-hi: la fletxa de les accions avança i la mostra de la navegació creix. Tot es desactiva amb `prefers-reduced-motion`.

## Components

### Franja de servei
Tinta, a dalt de tot: «Prototip independent, en proves amb veïns. No és una web de l'Ajuntament.» (independent en ocre) Sense selector de llengua: CA/ES queda a la navegació o al final del menú desplegat. Al mòbil, «Prototip independent · En proves» en una sola línia a mida normal. La versió completa es conserva al peu. Mai sembla municipal. Sense data: la data d'avui només és al resum «Avui a Súria».

### Navegació de tasques
Quatre tasques amb icona decorativa del color de la façana i nom escrit. La pàgina actual: subratllat de 3 px del seu color i pes 750. En pantalla estreta, desplegament en columna amb botó Menú; Escape el tanca i torna el focus al botó.

### Capçalera i foto de portada
«Ep, Súria!» (h1) gran en tinta sobre calç i les quatre tasques, amb aire entre tots dos. A sota, la foto de Súria a tota amplada i neta, amb aire sobre el campanar i el conjunt de les cases; enquadrament propi a l'escriptori i al mòbil (16:10). El tractament previst del crèdit és dins de la foto, a baix a la dreta, sobre un fons fosc només darrere del text. A l'escriptori, complet (autor, any, «retallada», llicència, original). Al mòbil, en una línia: «Foto: Krzysztof Golik, retallada · CC BY-SA 4.0», amb el nom de l'autor enllaçat a l'original. Sempre a 14 px i amb zona tàctil de 44 px.

**Pendent deliberat:** el crèdit continua ocult a petició del promotor, segons el comentari de Capcalera. No s'ha restaurat com a part d'aquesta revisió.

### Avui a Súria
Resum compost per `src/lib/ara.ts`, provat en tres zones horàries:
- **Títol fix** «Avui a Súria» i, en segon pla, **data** («Bon vespre · Dimecres 14 d'octubre»).
- **Agenda:** l'activitat d'avui que encara no ha acabat, amb «I 1 activitat més avui» si n'hi ha més. Si ja han passat, «Pròxima activitat» amb la seva data i la nota «Les d'avui ja han passat.». Amb la setmana caducada, l'activitat verificada en curs o la pròxima, amb la nota «No tenim l'agenda d'aquesta setmana.» i l'enllaç a l'agenda de suria.cat.
- **Farmàcia:** el torn vigent, amb l'adreça, fins quan i el telèfon com a acció. Sense torn vigent, l'avís i la font oficial.
- **Font:** una sola línia per a tot el resum.

Sense JavaScript, el resum enllaça a l'agenda i als torns, sense dependre de l'hora. L'alçada queda reservada perquè la pàgina no salti.

### Actividad de agenda (E2)
Finestra de data ocre de 10rem amb el dia sencer («Dimecres 14»); els rangs mostren dos extrems sense partir cada dia, i una versió completa amb mes i any per a lectura assistida. Al mòbil, la data va sobre el títol. A continuació, nom, hora (a la seva línia), lloc a mida de lectura, requisit en una nota del color clar de la façana (sense ratlla lateral), descripció en segon pla i acció «Fitxa a suria.cat». Es marca «Ja ha passat» quan acaba l'última franja horària, no a mitjanit. Passada: finestra en pedra i «Ja ha passat».

### Primers passos (E3) i torn de farmàcia
Títol, resum i accions (tràmit en línia, trucar). A la portada, la farmàcia només porta l'enllaç «Tots els torns de guàrdia»; el torn vigent ja és al resum d'avui. Cada torn és una fitxa de cel amb «Fins…», el nom i l'adreça, i el telèfon com a acció. Torn acabat: pedra i «Aquest torn ja ha acabat» (a la portada desapareix). Sense torn vigent: avís en teula clara amb la font oficial.

### Pròximament
Cartell ocre (programa de festa major): títol estret, dates, punts essencials, enllaç al programa i font.

### Ficha de comercio (E1)
Nom com un rètol amb un filet teula a dalt, ofici i adreça, i l'estat amb paraules i forma: quadrat ple (horari comunicat), buit (sense confirmar), discontinu (avui no), gris (finalitzat). Mai «obert ara». Sense comerços, a la portada: una nota compacta en teula clara al costat dels primers passos, amb la promesa «No direm mai “obert ara”».

### Etiqueta de maduresa
Text dins d'un marc fi («En prova», «Real»); discontinu per a «Idea» i «Demo». Idea i Demo explícites; «En prova» i «Real» no es mostren a les obertures vigents.

### Línia de procedència
Sota cada peça al detall: font específica i vigència quan correspon. La consulta es conserva a les dades; Idea/Demo es mostren. A l'agenda, si totes les peces tenen el mateix responsable, aquest apareix una sola vegada al final; si difereixen, es manté a cada peça. El lateral de l'agenda només recull les fonts generals de la setmana, sense repetir les fitxes individuals.

### Cap on anem
Franja verda del turó amb la frase d'identitat i la seva font, la introducció, les idees amb l'etiqueta «Idees · encara no existeixen» i filets discontinus (mai semblen funcions disponibles), i l'enllaç a «Què estem provant».

### Peu
Bloc de tinta amb «Ep, Súria!», l'avís d'independència i l'enllaç a les fonts oficials. La informació de proves es mostra quan no és redundant amb la franja anterior.

## Pending
- Lectura real amb persones grans de les dues lletres i de la mida de 19 px.
- Fotos pròpies o cedides de vida quotidiana (mercat, carrers, Caramelles) i dels comerços participants; la foto de 1924 (domini públic) segueix candidata.
- Lector de pantalla, mòbil real i revisió humana del castellà (pendents de l'etapa anterior, no tancats per aquest redisseny).

## Ajustos posteriors del promotor · geometria i serveis

- Superfícies arrodonides: `--radius`, `--border-width` i `--padding: max(16px, calc(var(--radius) * 0.75))`; farciment `var(--padding)`. Serveis de portada amb radi 24px i farciment18px. Avisos, fonts, torns interiors i cartell mantenen el radi de la seva superfície i la mateixa fórmula de farciment. La portada amb corba superior utilitza el seu radi per calcular el farciment superior, conservant les franges a tota amplada.
- Controls arrodonits dins de la targeta: `border-radius: max(0px, calc(var(--radius) - var(--padding) - var(--border-width)))`. Els botons tenen vora2px i radi propi de12px (excepció posterior autoritzada pel promotor: són controls independents, no superfícies concèntriques); la insígnia del bus també té radi propi de12px, autoritzat posteriorment pel promotor. Els controls independents i les etiquetes de text conserven les seves zones tàctils i escala pròpia.
- Capçalera: mateix espai superior i inferior, marca amb alçada de línia1 i mínim tàctil44px, alineació central amb Menú. Una sola còpia de CA/ES, després de les quatre tasques: a la mateixa fila a escriptori, al final del desplegament en pantalla estreta. Sense idiomes a la franja tinta. Escape tanca tot el desplegament, inclòs CA/ES.
- Farmàcia de portada: adreça amb «c/»; només el tram de guàrdia del dia actual («Avui · 0.00–9.00 h», «Avui · 9.00–24.00 h» o «Avui · 0.00–24.00 h»), sense dates visibles. Els límits provenen del torn verificat; no són un horari d’obertura inventat. Trucar conserva el número a escriptori, l'amaga visualment al mòbil; el nom accessible manté el telèfon. Botó de mapa a la dreta, només icona amb nom accessible i ajuda emergent.
- Bus: una fila per sentit, etiqueta i «Després» a l'esquerra, pròxima sortida a la dreta. Els dos grups se centren verticalment; minuts secundaris i estats sense horaris conservats.

Adaptació de la farmàcia a l’amplada real: contenidor servei. Per sota de24rem interiors s’oculta visualment el número del botó, conservat al nom accessible i href. Llamar/Trucar no es parteix; mapa conserva mida pròpia. Per sota de12rem interiors (p. ex. text200%) els controls poden passar sencers a una altra fila i les dades del bus passen a una columna.

Ajust posterior del promotor: bus blau (cel) i farmàcia verda (turó). Al resum, etiqueta «Agenda», «1 activitat més» / «n activitats més», sense «I» ni «avui» repetits. Les activitats del dia amb hora només mostren l’hora; les futures conserven data. Farmàcia: només hores de guàrdia del dia actual, sense «Avui», amb espais al voltant del guió («0.00 – 9.00 h»). Mateix criteri en castellà.

## Resum, temps i serveis · petició posterior

«Avui a Súria» seguit només de la data, sense salutació. El resum no repeteix l’etiqueta Agenda; acció «Veure l’agenda» i font «suria.cat». La pròxima activitat continua identificada i datada, i els avisos de caducitat es conserven.

Barra tinta: avís a l’esquerra i temps a la dreta (icona22px i temperatura, font Open-Meteo). A mòbil l’avís es limita a «Prototip independent» per mantenir una línia amb el temps; la versió completa continua al peu. Widget amb àrea tàctil44px i font/hora/condició accessibles. Refresc15min, sense animació; error «— °C», mai dades fictícies. Contracte i font a docs/revisiones/temps-suria.md.

Sota l’agenda, «Serveis útils»: quatre targetes quadrades amb icona i nom (Padró, Mobles i poda, Farmàcies, Autobusos), enllaços al contingut existent o a l’operador verificat. Una fila horitzontal; al mòbil es pot desplaçar dins de la fila sense desbordar la pàgina. Text ampliat pot fer créixer les targetes. Radi12px, padding=max(16px,radi×.75); icona i accent heretats de cada servei. Primers passos conserva les explicacions útils i els accessos nous són navegació ràpida.

## Agenda i directori ampliat · ajust posterior

CTA del resum «Veure l’agenda» / «Ver la agenda», una menció funcional sense etiqueta Agenda repetida. A l’agenda setmanal, el títol de cada activitat és l’únic enllaç a la seva fitxa original (CA també des del castellà); enllaç recognoscible, focus i zona tàctil44px. Es retiren l’acció Fitxa i la procedència repetida per activitat. A la portada, sense font enllaçada al final de la llista; a la pàgina interior es conserva la font única «suria.cat»; les dades estructurades de cada peça es conserven. Sense Tota la setmana, amb fonts sota la portada. Separació pròpia abans de Serveis útils perquè la font pertanyi al tancament d’agenda.

Serveis útils: deu accessos (Ajuntament, CAP, Biblioteca, Correos, Padró, Mobles i poda, Farmàcies, Policia Local, Seu electrònica, Autobusos). Targetes208–272px, quadrades a mida normal i en una fila desplaçable. Fonts i límits a docs/revisiones/serveis-utils.md; Correos és un cercador oficial d’oficines, no una fitxa local confirmada. Sense noves dades d’horaris ni contactes.

## Poliment vigent de la portada

Títols de l’agenda sense subratllat, mantenint enllaç, focus i objectiu tàctil. Horaris amb espais al voltant del guió en totes les pàgines, inclòs text corrent; no es modifiquen intervals de dates ni dades font. Boira representada per núvol i dues línies baixes, no quatre ratlles soles.

Primers passos i Menjar i comprar es retiren només de la portada, conservant pàgines pròpies, navegació i dades de farmàcia. Serveis útils ocupa tota l’amplada de composició després de l’agenda, amb quadrats208–272px, desplaçament intern i fons suaus: ocre, turó, rosa, llimona, lavanda, teula, pedra i cel (vuit variants). Cada accés manté nom i icona; CAP/farmàcia verd i bus blau.

## Fuentes y vigencia · última decisión del promotor

Serveis útils conserva scroll horizontal táctil, rueda/trackpad y foco de teclado, pero oculta la barra (scrollbar-width:none y scrollbar WebKit). Tiempo como imagen informativa con nombre accesible, sin enlace, foco ni efecto hover; retirado enlace de proveedor del pie. Fuente/hora/estimación conservadas en ayuda y datos.

Resumen Avui sin línea Font; título del evento enlazado directamente a su ficha original, sin subrayado y con44px mínimos. Veure l’agenda sigue como acceso a la sección. Pròximament sin líneas de fuentes ni procedencia por pieza, también en detalle; fuentes estructuradas conservadas para una futura ubicación común.

Agenda: eventos cuyo último día es anterior a hoy en Europe/Madrid no se muestran. Los de hoy se mantienen incluso al terminar su hora (aviso Ja ha passat); los de varios días siguen hasta el último día. Filtrado inicial al compilar y actualización del navegador cada minuto/al recuperar la pestaña, sin republicar. Si no quedan eventos y la semana sigue vigente, mensaje explícito; si la semana caduca, aviso de vigencia conservado.

Ordre vigent de portada: Avui, agenda setmanal, Pròximament i Serveis útils. Pròximament immediatament sota agenda, serveis a tota amplada després; mateix ordre DOM, focus i mòbil.

## Publicació a GitHub Pages autoritzada

Repositori públic Freixanet/suria i web pública freixanet.github.io/suria, autoritzats expressament pel promotor. Desenvolupament local sense prefix; Pages amb /suria/. Fonts i crèdits centralitzats a Què estem provant#fonts-credits (foto: Krzysztof Golik, CC BY-SA4.0, retall; dades meteorològiques: Open-Meteo, CC BY4.0). No es restaura el crèdit damunt la foto. Dada del temps no clicable, amb un enllaçⓘ separat al proveïdor al costat: atribució necessària de la versió pública. Enllaç del peu només Fonts i crèdits. Noindex i avís de prototip conservats.
