---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/es/index.astro","src/views/Inici.astro"]
---

# Súria (prototip) · portada i pàgines de tasca

Scope: portada (`src/pages/index.astro`, `src/pages/es/index.astro`, vista `src/views/Inici.astro`) i les pàgines de tasca, visió, «què estem provant» i 404 en català i castellà. Mode: Read (portada = consulta ràpida + identitat; pàgines de tasca = detall i lectura). Code-led (sense generació d'imatges). Història: Silvinita v3 (`archiu/v3-astro-2026-10-13/`) → Silvinita B (13/10/2026; etiqueta `silvinita-b-2026-10-14`, còpia a `archiu/silvinita-b-2026-10-14/`) → **«Façanes»** (14/10/2026), redisseny autoritzat pel promotor.

Audiència i feina: residents de Súria (gent gran, nouvinguts, veïns que busquen on menjar avui) que volen localitzar ràpidament activitats i serveis i actuar: data, hora, lloc, requisit essencial i acció. Les explicacions llargues van a les pàgines de detall amb enllaços clars. Procedència, vigència i distinció entre proves i idees, sempre visibles.

Constraints: PRODUCT.md, `docs/designs/especificacion-ux-v0.md`, revisió d'enginyeria D1–D4, `docs/revisiones/verificacion-iteracio-4.md` (decisió provisional: Atkinson Hyperlegible Next per llegir, a validar amb lectura real). No reduir la lletra ni amagar contingut en acordions.

## Direction contract
THESIS: Súria vista des de les seves façanes: un lloc per viure-hi, amb el que passa avui al davant. La identitat surt del poble real (façanes ocre, teula, rosa i calç sota cel de pissarra), no de la categoria «poble amb patrimoni». Refusa la portada turística, la web administrativa de targetes i l'estètica mineral anterior.
OWN-WORLD: calç #FDFCFA, pedra #F2EEE7, tinta #1D2532; façanes ocre #E8B14A (agenda), cel #C3D2DF/#DFE7EE (primers passos), teula #C0582F (comerços, avisos en #F5D9CB), turó #2F4F36 (cap on anem). Bricolage Grotesque (marca, títols estrets wdth 82–90, salutació, navegació, dates) i Atkinson Hyperlegible Next (lectura a 19 px). Filets de tinta de 2 px obren les llistes; data de l'agenda en «finestra» ocre; maduresa en marc fi (discontinu per a idees i demos).
STORY: el veí llegeix en una frase què hi ha avui i quina farmàcia és de guàrdia; baixa a l'agenda, als primers passos o als comerços; sap d'on surt cada dada i fins quan val; distingeix el que funciona, el que està en proves i les idees.
FIRST VIEWPORT: franja de servei (avís d'independència i CA/ES); «Súria» gran sobre fons clar amb les quatre tasques (a una altra fila si no hi caben); la foto real del poble a tota amplada, neta, amb aire sobre el campanar i el seu crèdit; «Avui a Súria» amb la salutació i la data a sota i el primer fet. La qualitat de la foto té prioritat sobre avançar l'agenda, que segueix just després. Quarta passada del 14/10/2026; les anteriors, a les etiquetes `facanes-v1`, `facanes-v2` i `facanes-v3`.
FORM: «Façanes», direcció única (sense alternatives). Referències: Lentos (nom i navegació, agenda en files, buit honest), Belle Isle (franja de servei, salutació amb dades del lloc sobre el cel del moment), Union Boulangerie (comerç com a rètol, ofici i on és), Domino Park (orientar la visita, història i ús actual, per a l'evolució). Senyal: la foto neta del poble sota el nom; sense moviment decoratiu.
FINISH: unreviewed and undocumented is unfinished; this build ends with the verification record, DESIGN.md, and every shipping raster carrying its provenance
