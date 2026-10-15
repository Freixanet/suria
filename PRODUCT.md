# Product

> Decisión posterior del promotor (14/10/2026): publicar el prototipo y su código en GitHub Pages / Freixanet/suria, de acceso público sin contraseña. Sustituye la restricción anterior de acceso privado para esta publicación. Se mantienen el aviso de independencia, noindex y los avisos de vigencia; noindex no restringe el acceso.

<!-- impeccable:product-schema 1 -->

Fuentes: `AGENTS.md`, `docs/designs/primera-ronda-validacion-prototipo-v0.md` (APPROVED), `docs/revisiones/eng-review-prototipo-v0.md`, `docs/designs/especificacion-ux-v0.md`. Este archivo resume la verdad de producto; el detalle vive en esos documentos.

## Platform

web

## Stack

Astro, versión estable actual, siguiendo las prácticas oficiales (decisión del promotor, 2026-10-12). Web estática sin base de datos ni cuentas (D1). Catalán y castellano con la internacionalización nativa de Astro. Contenido estructurado con validación automática de campos obligatorios y reglas de publicación. JavaScript solo donde aporte valor real. Sin React, Tailwind, CMS ni dependencias extra por defecto: se evalúan solo ante una necesidad concreta. Acceso con contraseña comprobada en servidor; proveedor de alojamiento por decidir en despliegue.

## Users

Residentes de Súria (Bages, 6.196 hab.) y sus comercios. En el v0, por tareas y no por perfil: vecinos que quieren saber si un sitio sirve hoy; personas mayores que quieren enterarse de actividades y servicios de la semana; personas recién llegadas con dudas prácticas de los primeros meses; comercios participantes que comunican su horario del día. Todos son hipótesis en validación: aún no hay usuarios con nombre.

## Product Purpose

Primeros pasos de una plataforma digital para mejorar la vida en Súria: utilidad cotidiana para residentes y comercios, unida a la historia, la cultura, el paisaje y el carácter del municipio. El v0 es una "vitrina de experimentos" privada que prueba tres hipótesis (E1 dato vivo de comercios, E2 agenda para mayores, E3 primeros pasos para recién llegados) con 3 participantes cada una. Éxito de la primera ronda: cada hipótesis queda Sostenida, Refutada o Sin evidencia suficiente con su dato, y se elige una para profundizar.

## Positioning

Habitantes primero, no turismo. Honestidad verificable: cada dato muestra su madurez (Real / En prueba / Demo), fuente, fecha y responsable, y un horario comunicado nunca se presenta como "abierto ahora". Complementa los recursos municipales existentes (suria.cat, sede electrónica) enlazándolos en vez de duplicarlos. Iniciativa independiente y experimental, sin respaldo oficial del Ayuntamiento.

## Operating Context

Acceso privado con contraseña para participantes; consultas rápidas en el móvil (p. ej. buscar dónde cenar a las 22:00), lectura tranquila en tableta o móvil en casa (personas mayores). Los comercios actualizan su dato por WhatsApp al promotor, que lo publica. Hora local Europe/Madrid.

## Capabilities and Constraints

- Tres tareas: Esta semana en Súria (E2), Comer y comprar hoy (E1), Primeros pasos en Súria (E3); más "Hacia dónde vamos" (visión con Idea/Demo) y "Qué estamos probando". Nombres provisionales, a validar.
- E1: validez por periodo de servicio; estados "Horario comunicado por el negocio", "Servicio finalizado", "Sin confirmar", "Hoy no sirve".
- Sin mapa, chatbot, 3D, reservas, cuentas, analítica ni seguimiento en el v0.
- Canal de opinión: WhatsApp y correo del proyecto (por crear).
- Sin promoción turística ni funciones que empujen visitas masivas.
- Nombre de trabajo "Súria (prototipo)"; "Descobreix Súria" no se usa en público (ya lo usa turismesuria.cat).

## Brand Commitments

- Catalán por defecto, natural y local; castellano completo con la misma calidad. Topónimos y nombres propios en su forma original.
- Lenguaje llano, frases cortas, sin marketing ni tecnicismos.
- Identidad propia de Súria que une patrimonio (Poble Vell, castillo), cultura (Caramelles, vida asociativa), industria (la sal y la potasa que dieron forma al pueblo) y vida actual, sin estética administrativa ni clichés turísticos. Tranquilidad y respeto por el carácter del municipio.
- Estética cuidada en la que cada decisión visual se justifica por el contenido o por el lugar, no por la categoría ("pueblo con patrimonio = crema y serif").
- Dirección visual: **«Façanes»** (14/10/2026; rediseño autorizado por el promotor, que consideró provisional la anterior). Nace de la foto real del pueblo: fachadas ocre, teja, rosa y cal bajo un cielo de pizarra. Nombre de Súria a todo el ancho, frase «Avui a Súria» con los datos verificados del día, un color de fachada por tipo de contenido (siempre con su nombre), Bricolage Grotesque y Atkinson Hyperlegible Next (esta, decisión provisional a validar con lectura real). Detalle en `DESIGN.md`. Silvinita B queda recuperable (etiqueta git `silvinita-b-2026-10-14`); no es la dirección vigente.

## Evidence on Hand

- Datos públicos verificados: `docs/investigacion-publica.md`, `docs/mapa-de-oportunidades.md` (Idescat, suria.cat).
- Una sola observación de usuario (O1, el propio promotor). No existen testimonios, cifras de uso, logotipo ni fotografías propias.
- Fotografías: solo fotos reales de Súria con permiso comprobado una por una: licencia libre verificada o cesión escrita (autor, fuente, licencia o permiso, enlace, atribución), registradas en `docs/referencias-visuales.md` y sustituibles después por fotos propias o cedidas. Nunca imágenes generadas, de otros municipios ni de stock genérico; evitar personas identificables. Si no hay foto adecuada, composición tipográfica en su lugar.

## Product Principles

1. Habitantes primero: utilidad diaria antes que escaparate; las tareas cotidianas se encuentran desde cualquier página sin menús ocultos.
2. Nunca afirmar más de lo que sabemos: fuente comprobable, fecha de consulta y vigencia explícita (hasta cuándo vale) en cada dato; lo real, separado siempre de las ideas y demos.
3. Complementar lo que ya existe en Súria, no duplicarlo.
4. Aprender con personas reales antes de construir más.
5. Excelencia sencilla: calidad visual alta, cero complejidad innecesaria.

## Accessibility & Inclusion

WCAG 2.2 AA como mínimo, pensado para personas mayores y con poca experiencia digital: texto base ≥ 16 px, contraste ≥ 4,5:1, zonas táctiles ≥ 44 px, zoom 200 %, teclado y lector de pantalla, estados expresados en texto (no solo color), sin movimiento automático y respetando "reducir movimiento". Detalle en `docs/designs/especificacion-ux-v0.md` §7.
