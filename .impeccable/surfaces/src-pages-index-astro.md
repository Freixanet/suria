---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/es/index.astro","src/views/Inici.astro"]
---

# Súria (prototip) · portada i pàgines de tasca

Scope: portada (`src/pages/index.astro`, `src/pages/es/index.astro`, vista `src/views/Inici.astro`) i les pàgines de tasca, visió, «què estem provant» i 404 en català i castellà. Mode: Read (portada = consulta ràpida + identitat; pàgines de tasca = detall i lectura). Code-led (sense generació d'imatges). Història: Silvinita v3 (maqueta `.impeccable/mocks/iteracio-3/silvinita.html`, còpia construïda a `archiu/v3-astro-2026-10-13/`) → variant B (iteració 4), triada pel promotor el 13/10/2026 com a base visual.

Audiència i feina: residents de Súria (gent gran, nouvinguts, veïns que busquen on menjar avui) que volen localitzar ràpidament activitats i serveis i actuar: data, hora, lloc, requisit essencial i acció. Les explicacions llargues van a les pàgines de detall amb enllaços clars. Procedència, vigència i distinció entre proves i idees, sempre visibles.

Constraints: PRODUCT.md, `docs/designs/especificacion-ux-v0.md`, revisió d'enginyeria D1–D4, `docs/revisiones/verificacion-iteracio-4.md` (decisions provisionals: Atkinson Hyperlegible per llegir; serif només ≥ 28 px). No reduir la lletra ni amagar contingut en acordions.

## Direction contract
THESIS: Súria com a full de consulta mineral: el que és útil i disponible mana, la identitat es concentra en una banda de silvinita i una franja de carbó amb fotografia real. Refusa la portada turística i la web administrativa de targetes.
OWN-WORLD: sal càlida #ECE8E1, halita #F8F6F2, carbó #1F1C1A; vermell silvinita #A8362A / #8E2C22, salmó #E39A7B, marga #5E5852. Gloock (serif editorial) només en títols de pàgina i secció ≥ 28 px; Schibsted Grotesk per a marca, navegació, dates, hores, accions i etiquetes; Atkinson Hyperlegible per llegir. Banda d'estrats de 30 px (22 al mòbil) com a única aparició dels estrats; filets negres de 2 px obren cada llista; maduresa en text vermell sota cada títol; idees amb una sola etiqueta i filets discontinus.
STORY: el veí veu en segons què passa aquesta setmana i els primers passos amb hora, lloc i acció; sap d'on surt cada dada i fins quan val; distingeix el que funciona, el que està en proves i les idees.
FIRST VIEWPORT: capçalera de carbó compacta (marca «Súria», data, CA/ES), banda, avís d'independència, navegació de tasques (2×2 al mòbil) i de seguida el panell clar de l'agenda (7/12) amb «Primers passos» al costat; al mòbil, el primer esdeveniment abans de 450 px.
FORM: Silvinita, variant B triada pel promotor (direcció fixada pel brief; sense tirada). Seed key: pinned-silvinita-b. Senyal: banda d'estrats i franja de carbó amb la foto; sense animacions que retardin el contingut.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
