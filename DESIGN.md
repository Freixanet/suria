---
name: Súria (prototip)
description: Full de consulta mineral para residentes de Súria; sistema Silvinita, variante B consolidada (13/10/2026).
colors:
  salt: "#ece8e1"
  halite: "#f8f6f2"
  deep: "#1f1c1a"
  red: "#a8362a"
  red-ink: "#8e2c22"
  salmon: "#e39a7b"
  marl: "#5e5852"
  rule: "#cdc6bb"
  text-2: "#4a4540"
  on-deep: "#fafbfb"
  on-deep-2: "#d6cfc6"
typography:
  brand:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 9vw, 7.5rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.04em"
  display:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "clamp(2.5rem, 5.2vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "clamp(1.875rem, 2.8vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.005em"
  headline-compact:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "clamp(1.75rem, 2.2vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 800
    lineHeight: 1.3
  body:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  body-small:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.45
  meta:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.45
  date:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 800
    lineHeight: 1.5
    fontFeature: "tnum"
  action:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
  label:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 800
    letterSpacing: "0.04em"
rounded:
  none: "0px"
spacing:
  s-1: "0.25rem"
  s-2: "0.5rem"
  s-3: "0.75rem"
  s-4: "1rem"
  s-5: "1.5rem"
  s-6: "2rem"
  s-7: "2.75rem"
  s-8: "4rem"
  pad: "clamp(1rem, 4vw, 3.5rem)"
components:
  mast:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.on-deep}"
    typography: "{typography.brand}"
    padding: "0.75rem clamp(1rem, 4vw, 3.5rem) 1rem"
  action-link:
    textColor: "{colors.deep}"
    typography: "{typography.action}"
    height: "2.75rem"
  action-link-hover:
    textColor: "{colors.red-ink}"
  nav-task:
    textColor: "{colors.deep}"
    height: "3.25rem"
    padding: "0 0.75rem"
  nav-task-active:
    textColor: "{colors.red-ink}"
  lang-toggle:
    textColor: "{colors.on-deep}"
    rounded: "{rounded.none}"
    height: "2.75rem"
    width: "3rem"
    padding: "0 0.75rem"
  lang-toggle-active:
    backgroundColor: "{colors.halite}"
    textColor: "{colors.deep}"
  agenda-panel:
    backgroundColor: "{colors.halite}"
    rounded: "{rounded.none}"
    padding: "clamp(1rem, 2.4vw, 2rem) clamp(0.75rem, 1.6vw, 1.5rem) 1rem"
  maturity-line:
    textColor: "{colors.red-ink}"
    typography: "{typography.label}"
  maturity-tag:
    textColor: "{colors.deep}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1px 0.5rem"
  empty-state:
    backgroundColor: "{colors.halite}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1rem 1rem"
  prototype-notice:
    backgroundColor: "{colors.halite}"
    textColor: "{colors.deep}"
    typography: "{typography.body-small}"
    padding: "0.5rem clamp(1rem, 4vw, 3.5rem)"
  footer:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.on-deep-2}"
    typography: "{typography.meta}"
---

# Design System: Súria (prototip)

## Overview

**Creative North Star: "El full de consulta mineral"**

Súria se lee como un pliego de consulta sobre sal: el terreno es sal cálida y halita, la roca de carbón cierra la cabecera, el pie y la franja de identidad, y el rojo de la silvinita aparece como estrato, filete y estado. Lo útil y disponible manda: fecha, hora, lugar, requisito esencial y acción. La identidad no compite con la consulta; se concentra en dos sitios, la banda de estratos bajo la cabecera y la franja de carbón con fotografía real del pueblo.

La densidad es de hoja de consulta, no de folleto: listas abiertas por un filete negro, piezas separadas por filetes finos, sin tarjetas, sin sombras, sin esquinas redondeadas. Tres voces tipográficas con reparto estricto: la serif editorial solo titula páginas y secciones grandes, la grotesca lleva todo lo que se busca con la vista (marca, navegación, fechas, horas, acciones, etiquetas) y la hiperlegible lleva la lectura.

El sistema rechaza la portada turística y la web administrativa de tarjetas. La procedencia, la vigencia y la madurez de cada dato (Real, En prova, Demo, Idea) son siempre visibles y siempre en texto.

**Key Characteristics:**
- Terreno claro de sal cálida con roca de carbón solo en cabecera, franja de identidad y pie.
- Banda de estratos como única aparición de los estratos (30 px; 22 px en móvil).
- Filete negro de 2 px abre cada lista; filete fino de 1 px separa las piezas.
- Tres voces: Gloock para títulos ≥ 28 px, Schibsted Grotesk para lo que se busca, Atkinson Hyperlegible para leer.
- Estados y madurez legibles sin color: siempre en texto; el color solo acompaña.
- Plano y anguloso: sin sombras de elevación, sin radios.
- Objetivos táctiles de 44 px como mínimo; anillo de foco de 3 px.

## Colors

Paleta mineral de cuatro materias: sal (fondos), carbón (roca e ink), silvinita (rojos y salmón) y marga (gris cálido de apoyo).

### Primary
- **Vermell silvinita** (red): el rojo de estrato. Banda, subrayado de 4 px de la tarea activa, numerales grandes de «Primers passos», muestra de estado activo en la ficha de comercio y anillo de foco sobre claro. No se usa para texto de cuerpo pequeño.
- **Vermell tinta** (red-ink): el rojo legible para texto. Madurez bajo cada título, días de la agenda, tarea activa, «Prototip independent» del aviso, hover de enlaces, etiqueta de ideas sobre claro y borde de la agenda caducada.

### Secondary
- **Salmó** (salmon): el rojo sobre carbón. Fecha de hoy en la cabecera, hover y anillo de foco sobre fondo oscuro, etiqueta de ideas en la franja, selección de texto y estrato claro de la banda.

### Neutral
- **Sal càlida** (salt): fondo de página.
- **Halita** (halite): superficie elevada por tono: panel de la agenda, aviso de prototipo, estado vacío, botón de idioma activo y estrato claro de la banda.
- **Carbó** (deep): tinta principal, filete fuerte, fondo de cabecera, franja de identidad y pie.
- **Marga** (marl): estrato inferior de la banda, contenido caducado (texto y estado «finalizado»), filetes discontinuos de ideas, borde del selector de idioma y muestra de estado neutro.
- **Filet** (rule): filete fino entre piezas y bordes de 1 px; muestra de «Servei finalitzat».
- **Text secundari** (text-2): línea de procedencia, vigencia, explicaciones de estado, pies de foto y notas.
- **Sobre carbó** (on-deep) y **Sobre carbó 2** (on-deep-2): texto principal y secundario sobre carbón.

### Named Rules
**The Two Reds Rule.** El rojo de estrato (red) marca superficie y forma; el texto rojo siempre es red-ink sobre claro o salmon sobre carbón.

**The Rock Placement Rule.** El carbón como fondo solo aparece en la cabecera, la franja de identidad con fotografía y el pie. El contenido útil vive sobre sal o halita.

## Typography

**Display Font:** Gloock (con Georgia, serif)
**Brand / UI Font:** Schibsted Grotesk 500–900 (con system-ui, sans-serif)
**Body Font:** Atkinson Hyperlegible 400/700 (con system-ui, sans-serif)

Las tres familias se sirven desde el propio sitio (sin peticiones a terceros) y se precargan.

**Character:** Una serif editorial de alto contraste da voz a los títulos; una grotesca compacta y negra hace de rótulo de consulta; una hiperlegible pensada para baja visión lleva todo lo que se lee de corrido.

### Hierarchy
- **Brand** (Schibsted Grotesk 900, interlineado 0.86, tracking −0.04em): solo la marca «Súria» de la cabecera; es el h1 en la portada y un enlace al inicio en el resto.
- **Display** (Gloock 400): título de página (h1) en las páginas de tarea.
- **Headline** (Gloock 400): título de sección; también «Cap on anem», 404 y las secciones de «Què estem provant».
- **Headline compact** (Gloock 400, mínimo 28 px): secciones secundarias de portada («Pròximament», «Menjar i comprar avui», «Què estem provant»).
- **Title** (Schibsted Grotesk 800, interlineado 1.3): título de cada pieza (actividad, paso, comercio, prueba).
- **Body** (Atkinson Hyperlegible 400, interlineado 1.55): lectura; medida de 36–44 em en columnas de texto.
- **Body small / Meta** (Atkinson Hyperlegible): detalle de pieza y línea de procedencia.
- **Date** (Schibsted Grotesk 800, cifras tabulares): días de la agenda en red-ink.
- **Action** (Schibsted Grotesk 700, subrayado): enlaces que hacen algo.
- **Label** (Schibsted Grotesk 800, tracking 0.04em, mayúsculas): madurez y etiqueta de ideas.

### Named Rules
**The Serif Floor Rule (provisional).** Gloock solo en títulos de página y sección y nunca por debajo de 28 px (`--t-serif-min`, 1.75rem). Nunca en interfaz, fechas, horas ni etiquetas. Provisional hasta validarlo con lectura real de residentes mayores en sus teléfonos.

**The Reading Face Rule (provisional).** Atkinson Hyperlegible es la letra de lectura. Provisional con la misma validación pendiente.

**The Grotesk Hours Rule (provisional).** Las horas dentro de texto corrido se componen en la grotesca (600), sin partirse, como en la agenda: evita el cero barrado de la hiperlegible y hace que las horas se encuentren de un vistazo.

## Layout

Rejilla de dos columnas 7/12 + 5/12 compartida por la portada, las páginas de tarea y la franja de identidad, con margen lateral fluido (`pad`) y separación de columnas clamp(1.5rem, 3.5vw, 3.5rem). Ritmo de espaciado con base de 4 px (s-1 a s-8). Un único punto de ruptura a 56.25rem (900 px): por debajo todo pasa a una columna.

**Primera vista:** cabecera de carbón compacta (marca, fecha, CA/ES), banda, aviso de independencia, navegación de tareas y enseguida el panel claro de la agenda (7/12) con «Primers passos» al lado; en móvil la navegación es una rejilla 2×2 (el inicio es la marca) y el primer evento aparece antes de 450 px.

**Panel de agenda:** superficie halita que sobresale hacia fuera para que su texto quede alineado con la marca y la navegación; en móvil ocupa todo el ancho.

**Columna de lectura:** la columna principal de una tarea no pasa de 44rem; las entradas y párrafos de 38 em.

### Named Rules
**The Home Density Rule.** La portada muestra fecha, hora, lugar, requisito esencial y acción; las explicaciones largas van a la página de detalle con un enlace claro. «Pròximament» es compacto (título, fechas, plazo, enlace) y en móvil va después de los servicios (agenda, primeros pasos, pròximament, comercios). El turno de farmacia ya caducado no ocupa sitio en portada; sin JavaScript se ven ambos turnos con sus fechas.

**The No Hiding Rule.** No se reduce la letra ni se esconde contenido en acordeones. Con el texto al 200 % las rejillas pasan a una columna y la navegación baja a una sola columna en lugar de desbordar.

## Elevation & Depth

Sistema plano. No hay sombras de elevación: la profundidad se expresa por tono (sal → halita) y por roca (carbón). La única `box-shadow` del sistema es un subrayado interior de la navegación (4 px rojo para la tarea activa, 2 px marga en hover), que actúa como filete, no como elevación.

### Named Rules
**The Tone Not Shadow Rule.** Para destacar una superficie, súbela a halita o ábrela con un filete; nunca con sombra.

## Shapes

Todo es rectangular y sin radio. La forma se construye con filetes: 2 px de carbón para abrir listas y estados vacíos, 1 px de `rule` para separar piezas, discontinuo de 1 px marga para lo que aún no existe. La banda de estratos es la firma: cinco franjas horizontales (rojo, salmón, rojo tinta, halita, marga) de 8/4/9/3/6 px en escritorio y 6/3/7/2/4 px en móvil.

### Named Rules
**The Strata Once Rule.** Los estratos aparecen solo en la banda bajo la cabecera. No se repiten como fondo, divisor ni decoración en otras superficies; los estados usan una muestra cuadrada de un solo color.

**The Open List Rule.** Cada lista se abre con el filete negro de 2 px y cada pieza se cierra con el filete fino.

## Components

Mapa del vocabulario de la especificación UX (§9, estados §4.2) al componente construido.

### Aviso de prototipo
Franja halita bajo la banda, filete fino inferior; «Prototip independent» en negrita red-ink y el resto en carbón. (Dentro de la cabecera.)

### Selector de idioma
Dos botones cuadrados CA/ES sobre carbón, 44 px de alto, borde de 2 px marga; el activo se rellena de halita con texto carbón; hover cambia el borde a salmón. Recuerda la elección en el navegador.

### Navegación persistente
Tareas en grotesca 700. Escritorio: fila con objetivos de 52 px; activa en red-ink con subrayado interior de 4 px rojo. Móvil: rejilla 2×2 de 44 px, cada celda con filete fino inferior; la entrada «Inici» se oculta porque la marca lleva al inicio.

### Bloque de identidad
Franja de carbón a sangre con fotografía real (crédito y licencia en el pie de foto) en 7/12 y texto en 5/12: título serif, línea de identidad en grotesca 600, ideas y acción. Es la segunda y última concentración de identidad tras la banda.

### Entrada de tarea
Cada tarea en portada es una sección con su cabecera, la lista, una línea «Font:» resumida y una acción «Tota la setmana / Tots els passos». En las páginas de detalle, la plantilla de tarea abre con título display y una entrada de 1.1875rem en text-2; lateral con fuentes oficiales y «otras tareas».

### Cabecera de sección con madurez
Título serif y, justo debajo, la madurez en texto: grotesca 800, mayúsculas, red-ink. Siempre en el mismo sitio en todas las secciones. Es un estado del contenido, no un antetítulo.

### Estado principal
En la ficha de comercio: texto del estado en grotesca 800 a 1.125rem, precedido de una muestra cuadrada de 0.75rem (roja en curso o antes de empezar; `rule` finalizado; contorno discontinuo red-ink cancelado; marga sin confirmar) y seguido de la explicación de una línea en text-2.

### Línea secundaria
Línea de procedencia en meta, text-2: madurez (grotesca 800 carbón) · fuente · consultado · vigencia · responsable, separados por « · ».

### Ficha de comercio (E1)
Pieza de lista abierta: título, actividad y dirección en text-2, estado principal y línea secundaria. Sin JavaScript muestra el último horario comunicado en texto. Estado vacío propio si no hay negocios.

### Actividad de agenda (E2)
Rejilla día (6.75em, red-ink, cifras tabulares) + cuerpo: título, horas en grotesca 700 y lugar, requisito, nota (solo en detalle), acción y línea secundaria. En móvil el día va encima del título. Caducada: título y día en marga y aviso «ja ha passat» en texto.

### Respuesta de primeros pasos (E3)
Rejilla de numeral (grotesca 900, 2rem, rojo) + cuerpo con título, explicación, acciones (trámite, teléfono) y línea secundaria. Las guardias de farmacia se separan con filete discontinuo `rule`.

### Enlace a fuente oficial
Lista lateral bajo un rótulo en grotesca 800 mayúsculas con filete de 2 px; cada enlace de 44 px muestra la pieza en grotesca 700 y la fuente debajo.

### Estado vacío
Caja halita con borde fino y filete superior de 2 px carbón; título en grotesca 800 (1.25rem) y texto honesto sobre lo que no sabemos. En portada pierde la caja y queda solo el filete.

### Idea / Demo
Idea: una sola etiqueta «Idees · encara no existeixen» (grotesca 800 mayúsculas; red-ink sobre claro, salmón en la franja) y lista entre filetes discontinuos de 1 px marga. La etiqueta con borde (2 px carbón; discontinuo marga para Idea y Demo) solo aparece en la escala de madurez de «Cap on anem». No hay contenido Demo publicado: la variante existe pero no se ha usado.

### Acción
Enlace subrayado en grotesca 700, alto mínimo de 44 px; hover a red-ink (salmón sobre carbón) con subrayado de 2 px.

### Página no encontrada
Dos columnas bilingües (CA y ES) con título serif y la lista de tareas abierta por el filete de 2 px.

### Pendientes (no construidos)
- **Botón de canal de opinión y ayuda:** no existe porque el canal todavía no existe; según §4.3 no se muestra hasta que haya un contacto configurado. «Què estem provant» lo dice en texto.
- **Pantalla de contraseña:** aplazada al despliegue (D3/T5); hoy solo hay `noindex` como medida complementaria.

## Do's and Don'ts

### Do:
- **Do** mantener todos los objetivos táctiles a 44 px como mínimo (`--tap`, 2.75rem), incluidos los enlaces dentro de pies de foto.
- **Do** usar el anillo de foco de 3 px con separación de 3 px: rojo sobre claro, salmón sobre carbón.
- **Do** escribir siempre el estado y la madurez en texto; el color y la muestra solo acompañan.
- **Do** abrir cada lista con el filete de 2 px carbón y separar piezas con el filete fino.
- **Do** componer las horas del texto corrido en la grotesca (provisional).
- **Do** respetar `prefers-reduced-motion`: el desplazamiento suave solo se activa sin esa preferencia.
- **Do** mostrar la fuente, la fecha de consulta y la vigencia junto a cada dato.

### Don't:
- **Don't** usar Gloock por debajo de 28 px ni en interfaz, fechas, horas o etiquetas (provisional).
- **Don't** repetir los estratos fuera de la banda de la cabecera.
- **Don't** añadir sombras de elevación, radios ni tarjetas.
- **Don't** añadir animaciones que retrasen la aparición del contenido.
- **Don't** usar el rojo de estrato (red) para texto pequeño; el texto rojo es red-ink o salmón.
- **Don't** mezclar ideas con datos reales: van con una sola etiqueta y filetes discontinuos.
- **Don't** poner explicaciones largas en la portada; van a la página de detalle.
