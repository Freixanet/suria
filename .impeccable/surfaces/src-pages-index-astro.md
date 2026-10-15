---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/es/index.astro","src/views/Inici.astro"]
---

# Súria (prototip) · portada i pàgines de tasca

Scope: portada (`src/pages/index.astro`, `src/pages/es/index.astro`, vista `src/views/Inici.astro`) i les pàgines de tasca, visió, «què estem provant» i 404 en català i castellà. Mode: Read (portada = consulta ràpida + identitat; pàgines de tasca = detall i lectura). Code-led (sense generació d'imatges). Història: Silvinita v3 (`archiu/v3-astro-2026-10-13/`) → Silvinita B (13/10/2026; etiqueta `silvinita-b-2026-10-14`, còpia a `archiu/silvinita-b-2026-10-14/`) → **«Façanes»** (14/10/2026), redisseny autoritzat pel promotor.

Audiència i feina: residents de Súria (gent gran, nouvinguts, veïns que busquen on menjar avui) que volen localitzar ràpidament activitats i serveis i actuar: data, hora, lloc, requisit essencial i acció. Les explicacions llargues van a les pàgines de detall amb enllaços clars. Fonts i vigència consultables; Idea/Demo explícites. Consulta i responsabilitat preservades a les dades; no restaurar badges retirats.

Constraints: PRODUCT.md, `docs/designs/especificacion-ux-v0.md`, revisió d'enginyeria D1–D4, `docs/revisiones/verificacion-iteracio-4.md` (decisió provisional: Atkinson Hyperlegible Next per llegir, a validar amb lectura real). No reduir la lletra ni amagar contingut en acordions.

## Direction contract
THESIS: Súria vista des de les seves façanes: un lloc per viure-hi, amb el que passa avui al davant. La identitat surt del poble real (façanes ocre, teula, rosa i calç sota cel de pissarra), no de la categoria «poble amb patrimoni». Refusa la portada turística, la web administrativa de targetes i l'estètica mineral anterior.
OWN-WORLD: calç #FDFCFA, pedra #F2EEE7, tinta #1D2532; façanes ocre #E8B14A (agenda), cel #C3D2DF/#DFE7EE (primers passos), teula #C0582F (comerços, avisos en #F5D9CB), turó #2F4F36 (cap on anem). Bricolage Grotesque (marca, títols estrets wdth 82–90, salutació, navegació, dates) i Atkinson Hyperlegible Next (lectura a 19 px). Filets de tinta de 2 px obren les llistes; data de l'agenda en «finestra» ocre; maduresa en marc fi (discontinu per a idees i demos).
STORY: el veí llegeix en una frase què hi ha avui i quina farmàcia és de guàrdia; baixa a l'agenda, als primers passos o als comerços; sap d'on surt cada dada i fins quan val; distingeix el que funciona, el que està en proves i les idees.
FIRST VIEWPORT: franja d'independència, marca «Ep, Súria!» sense partir, quatre tasques acotades o menú accessible; foto real amb el mateix enquadrament; resum amb data, sense salutació. Composició fluida fins a 180rem amb marges moderats. Agenda sota el resum sense esperar les targetes en escriptori. Ordre mòbil/DOM: resum, bus/farmàcia, agenda, pròximament, Serveis útils. Crèdit ocult deliberadament, pendent documentat a DESIGN.md. Vegeu verificació de la passada a work/CONTINUITY-suria.md.
FORM: «Façanes», direcció única (sense alternatives). Referències: Lentos (nom i navegació, agenda en files, buit honest), Belle Isle (franja de servei, relació entre lloc i dades útils del dia), Union Boulangerie (comerç com a rètol, ofici i on és), Domino Park (orientar la visita, història i ús actual, per a l'evolució). Senyal: la foto neta del poble sota el nom; sense moviment decoratiu.
FINISH: unreviewed and undocumented is unfinished; this build ends with the verification record, DESIGN.md, and every shipping raster carrying its provenance

Geometria vigent: farciment de superfícies max(16px,radi×0.75); radi interior max(0px,radi−farciment−vora). Capçalera centrada, selector únic al final de la navegació/desplegament, franja mòbil breu. Serveis: mapa només icona, trucada sense número visual al mòbil, torn amb inici/fi, bus en files alineades. Detall a DESIGN.md.

Actualització vigent: el resum no repeteix Agenda; acció Veure l’agenda i Font: suria.cat. Temps (icona/temperatura) a la dreta de la barra, Open-Meteo, actualització15min i retirada de dades caducades. Sota agenda, Serveis útils en deu targetes quadrades horitzontals, amb desplaçament intern al mòbil.

Agenda: títols enllaçats a les fitxes originals, sense acció Fitxa per peça; sense font al tancament a portada; font conservada a interior. Sense bloc Font/Tota la setmana davant Serveis útils. Accessos de serveis ampliats208–272px, amb Ajuntament, CAP, Biblioteca i Correos.

Portada sense seccions Primers passos i Menjar i comprar (pàgines pròpies conservades). Serveis útils ocupa amplada completa amb vuit variants de fons. Enllaços de títols sense subratllat; hores amb espais als guions. Boira amb núvol i dues línies baixes.

Vigente: ocultar días de agenda pasados por fecha final Europe/Madrid; conservar actividades de hoy y de varios días vigentes. Avui sin fuente separada y título enlazado a ficha. Pròximament sin procedencia visible. Tiempo informativo sin enlace ni atribución en pie. Serveis útils mantiene desplazamiento sin barra visible. Fuentes estructuradas conservadas.
