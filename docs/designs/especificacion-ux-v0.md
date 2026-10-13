# Especificación de experiencia (UX): Súria prototipo v0

Estado: REVISADA (/plan-design-review, 2026-10-12). Lista para la exploración visual con Impeccable.
Fuentes vinculantes: `docs/designs/primera-ronda-validacion-prototipo-v0.md` (APPROVED), `docs/revisiones/eng-review-prototipo-v0.md` (D1-D4), `AGENTS.md`.
Nombre de trabajo: "Súria (prototipo)". No usar "Descobreix Súria" (decisión activa).
Tareas técnicas T1-T5 de la revisión de ingeniería: **siguen pendientes**; este documento no las da por resueltas.

## 0. Qué decide este documento y qué deja a Impeccable

| Decide este documento | Lo decide Impeccable |
|---|---|
| Qué secciones existen, qué contienen y en qué orden | Dirección artística, tipografías, colores, iconografía |
| Qué ve cada persona primero, segundo y tercero | Composición, espaciado, ritmo, patrón visual de navegación |
| Vocabulario de estados y etiquetas (palabras exactas) | Forma visual de estados e insignias |
| Requisitos mínimos de accesibilidad y de comportamiento en móvil | Animaciones y microinteracciones |
| Reglas de contenido (fuentes, fotos, idioma, privacidad) | Refinamiento y pulido final; `DESIGN.md` |

## 1. Principios de experiencia (heredados)
- Habitantes primero; nada que empuje visitas masivas (sin rutas "top", aparcamiento ni afluencia en el v0).
- Honestidad: toda pieza tiene madurez (**Real / En prueba / Demo**), fuente, última actualización y responsable. Nada es "Real" sin dato verificable.
- E1 por periodo de servicio (D4): **Horario comunicado por el negocio**, **Servicio finalizado**, **Sin confirmar**; nunca "Abierto ahora".
- Privacidad: sin datos personales publicados; contraseña única comprobada en servidor, una vez por sesión (D3); `noindex` complementario.
- No inventar: si no hay información, se dice.
- Iniciativa **independiente y experimental**; nada sugiere respaldo oficial del Ayuntamiento.

## 2. Personas del v0
| Persona | Qué viene a hacer | Experimento |
|---|---|---|
| Vecino/a que quiere comer o comprar | Saber si un sitio sirve hoy y hasta cuándo | E1 (lectura) |
| Comercio participante | Ver cómo aparece su dato (lo actualiza por mensaje, no en la web) | E1 (aporta) |
| Persona mayor | Enterarse de actividades y servicios de la semana | E2 |
| Persona recién llegada | Resolver dudas prácticas de los primeros meses | E3 |
| Promotor | Publicar y comprobar | todos |
Nadie se identifica por perfil en la web: las personas sirven para diseñar, no para navegar.

## 3. Arquitectura de información

### 3.1 Modelo (decisión 1 = A, por tareas, con 7 matices del promotor)
- Se navega por **tareas y necesidades**, nunca por tipo de persona.
- Categorías y nombres **provisionales**, a validar con participantes (3.4).
- La portada combina **utilidad inmediata, identidad local y calidad visual**: no es un directorio de enlaces ni una web administrativa.
- Si ya existe un recurso municipal adecuado, se **facilita encontrarlo** (enlace con fuente) en vez de copiarlo.
- Estructura extensible: nuevas tareas solo cuando la evidencia lo justifique; no se diseña ahora la plataforma futura.
- Real, En prueba y Demo siempre diferenciados.

### 3.2 Tareas del v0 (nombres provisionales)
| Tarea | Necesidad | Exp. | Alternativas a probar |
|---|---|---|---|
| **Esta semana en Súria** | Actividades y servicios cercanos | E2 | "Qué pasa en Súria", "Agenda de la semana" |
| **Comer y comprar hoy** | Si un sitio sirve hoy y hasta cuándo | E1 | "Dónde comer hoy", "Comercios hoy" |
| **Primeros pasos en Súria** | Dudas prácticas de los primeros meses | E3 | "Acabo de llegar", "Vivir en Súria" |
Orden provisional: de la necesidad más amplia a la más específica, sin poner E1 primero. Nombres finales en catalán y castellano (sección 5).

### 3.3 Estructura y jerarquía
```
PORTADA
 1º Identidad de Súria: imagen real del municipio + una frase verificada con fuente
 2º Las tres tareas (nombre + una línea de para qué sirve + madurez)
 3º Hacia dónde vamos: la visión como pregunta a los vecinos (3.5)
 4º Qué estamos probando y por qué
 5º Dinos qué te falta (canal de opinión, 3.6)
 Siempre visible: "Prototipo experimental e independiente, en pruebas con vecinos de Súria"
                  + selector de idioma

PÁGINA DE TAREA (misma plantilla)
 1º Lo útil primero (dato, agenda o respuesta) con su estado principal
 2º Línea secundaria de cada pieza (madurez · fuente · actualizado · responsable)
 3º Fuentes oficiales verificadas
 4º Otras tareas / volver

NAVEGACIÓN PERSISTENTE (máx. 5 principales, igual en todas las páginas)
 Inicio · Esta semana · Comer y comprar · Primeros pasos · Hacia dónde vamos
 + "Qué estamos probando" y "Opinar / Ayuda" desde el aviso y el pie
Profundidad máxima: 2 niveles. Sin menús desplegables.
```
Prueba del tronco: en cualquier página se ve el nombre del sitio, la página actual marcada y las demás tareas.

### 3.4 Validación de nombres y orden
- Prueba de 5 segundos con los participantes de E1-E3: "¿dónde mirarías para saber si un bar sirve cenas hoy / qué actividades hay esta semana / cómo empadronarte?". Se anota la primera elección.
- Si un nombre lleva a error a 2 de 3 personas, se cambia por la siguiente alternativa.
- Las palabras de los vecinos tienen prioridad sobre los nombres provisionales.

### 3.5 Visión de plataforma (decisión 2 = A, con 8 matices)
- Página **"Hacia dónde vamos"** y presencia en portada (posición 3º): primeros pasos de una plataforma digital para mejorar Súria.
- Presentación visual y, cuando aporte valor, interactiva (forma: Impeccable).
- **Demos opcionales** de conceptos futuros solo para recoger opiniones, siempre identificadas de forma inequívoca.
- Se usa para preguntar qué problemas y oportunidades priorizan los vecinos, por los canales ya previstos; sin votaciones ni encuestas nuevas.
- Nunca se interpone entre la persona y las tareas. No se construyen funcionalidades futuras.
- Sin falsas expectativas: iniciativa independiente y experimental; ideas ≠ compromisos.

Escala de madurez (todo el sitio):
| Nivel | Qué significa | Dónde |
|---|---|---|
| **Real** | Funciona y está verificado | Tareas |
| **En prueba** | Funciona; comprobamos si sirve | Tareas |
| **Demo** | Ejemplo de una idea; datos no reales | Solo "Hacia dónde vamos" |
| **Idea** | Aún no existe; ¿la necesitarías? | Solo "Hacia dónde vamos" |
La navegación persistente solo lleva a Real o En prueba. Una Demo nunca se mezcla con datos reales.

### 3.6 Canal de opinión y ayuda (decisión 6 = A, con 8 criterios)
- **WhatsApp** con número exclusivo del proyecto como canal principal; **correo** exclusivo del proyecto como alternativa igualmente visible. Nunca datos de contacto personales del promotor.
- **Configuración pendiente:** aún no existen. No se publica ningún botón que no funcione; se puede empezar solo con el correo si está disponible.
- Los enlaces abren WhatsApp o el correo directamente, sin registros ni formularios. La ayuda también está en la pantalla de contraseña.
- Aviso de privacidad junto al canal: quién recibe los mensajes, para qué se usan, cómo se gestionan y cuánto se conservan (regla aprobada: contactos borrados al cerrar la ronda, máximo 30 días después, o antes si la persona lo pide). No se pide información personal innecesaria.
- Se aclara que WhatsApp es un servicio externo y que los mensajes se gestionan fuera de la web: no tener base de datos propia no significa no tratar datos personales.
- Durante las pruebas se observa qué canal prefieren los participantes y si les cuesta usarlo.
- Sin chatbots, CRM, automatizaciones ni API de WhatsApp en el v0.

## 4. Estados y confianza

### 4.1 Reglas de presentación (decisión 3 = A, dos capas, con 7 ajustes)
1. Primero, el **estado del dato** en lenguaje llano.
2. **Madurez por sección** en la cabecera; solo se repite en la pieza si es distinta de su sección.
3. **Acceso directo:** toda pieza enlazable lleva su línea secundaria, que empieza por la madurez.
4. **Línea secundaria** (menor protagonismo, siempre presente): `<madurez> · Fuente: <fuente> · Actualizado: <fecha y hora> · Responsable: <quién>`.
5. Nunca "Abierto ahora": "Horario comunicado por el negocio".
6. Cada estado se expresa con **texto**; color e icono solo acompañan.
7. Máximo un estado principal y una línea secundaria por pieza.

### 4.2 Vocabulario de estados (forma visual: Impeccable)
| Estado | Texto principal | Explicación de una línea |
|---|---|---|
| E1 dentro del periodo | **Horario comunicado por el negocio: hasta las HH:MM** | "El negocio nos lo dijo a las HH:MM. No es una garantía en tiempo real." |
| E1 antes de empezar | **Hoy sirve de HH:MM a HH:MM** (horario comunicado) | igual |
| E1 terminado | **Servicio finalizado** | "Según el horario que nos comunicó hoy." |
| E1 sin dato de hoy | **Sin confirmar** | "El negocio aún no nos ha comunicado el horario de hoy." |
| E1 cancelado | **Hoy no sirve** (cancelado por el negocio) | "Nos lo comunicó a las HH:MM." |
| Contenido En prueba | cabecera "En prueba" | "Estamos comprobando si esto te sirve. Tu opinión cuenta." |
| Demo | **Demo: datos de ejemplo** | "Es un ejemplo para enseñar una idea. No es información real." |
| Idea | **Idea: aún no existe** | "¿La necesitarías? Dínoslo." |
"Servicio finalizado" y "Sin confirmar" son literales de D4; para la cancelación (sin palabra fijada en D4) se usa "Hoy no sirve". Textos en catalán y castellano según la sección 5.

### 4.3 Tabla de estados por función
| Función | Cargando | Vacío | Error | Éxito | Parcial |
|---|---|---|---|---|---|
| Acceso con contraseña | instantáneo | n/a | "Esa contraseña no es correcta. Revísala o pide ayuda" + canal de ayuda (3.6); se reintenta sin perder lo escrito | entra y no vuelve a pedirla en la sesión | n/a |
| Portada | página estática | n/a | ver "Página no encontrada" | tres tareas visibles | una tarea sin contenido sigue visible con su estado vacío (4.4) |
| Comer y comprar hoy (E1) | estado ya escrito ("Sin confirmar" por defecto) y actualizado al instante | "Hoy todavía no tenemos horarios comunicados por los negocios participantes." + lista de participantes (cada uno "Sin confirmar") + "Dinos qué te falta" | si falla el cálculo: "Sin confirmar" + horas en texto | estados de 4.2 | cada negocio con su estado; no se ocultan los que no tienen dato |
| Esta semana en Súria (E2) | página estática | "Todavía no tenemos actividades verificadas para esta semana. Puedes consultar la agenda municipal mientras actualizamos esta sección." + enlace verificado | n/a | actividades con fecha, hora, lugar y fuente | pocas actividades: se muestran sin rellenar |
| Primeros pasos (E3) | página estática | "Aún no tenemos una respuesta comprobada." + enlace oficial solo si se verificó que lo resuelve + "Dinos qué duda tienes" | n/a | respuestas con fuente y enlace oficial | ver Vacío |
| Hacia dónde vamos | página estática | n/a | n/a | ideas y demos etiquetadas | n/a |
| Opinar / Ayuda | n/a | contactos aún no configurados: no se muestra el botón; se ofrece el canal disponible | n/a | abre WhatsApp o el correo | solo correo disponible: se muestra solo el correo |
| Página no encontrada | n/a | "Esta página no existe o ya no está. Puedes volver al inicio o ir a:" + las tres tareas | | | |
| Sin conexión | nunca se presenta un estado de E1 como actual si la hora de la página no se pudo actualizar | | | | |

### 4.4 Cuando no hay información (decisión 4 = A, con 8 criterios)
| Situación | Significado | Texto de ejemplo (provisional) |
|---|---|---|
| **No disponible** | No tenemos ese dato | "Todavía no tenemos esta información." |
| **Pendiente de confirmar** | Esperamos el dato de su fuente | "Sin confirmar: el negocio aún no nos ha comunicado el horario de hoy." |
| **Caducada** | Tuvimos el dato, ya no vale | "Servicio finalizado" / "Esta información era de <fecha>." |
| **No hay resultados** | Sabemos que no hay nada (comprobado) | "Esta semana no hay actividades programadas en la agenda municipal." |
Reglas: "No lo sabemos" ≠ "No existe"; enlace a fuente fiable solo si se verificó que tiene la respuesta; las secciones nunca desaparecen; siempre hay forma de decir "esto me falta" (3.6); los vacíos se diseñan como parte de la experiencia, no como error; nunca se rellena con contenido inventado o irrelevante; se aprende de los vacíos por el canal de opinión y las conversaciones, **sin analítica ni seguimiento** salvo evaluación previa.

## 5. Idioma (decisión 5 = A, con 9 criterios)
- **Catalán por defecto**, natural y cuidado, adecuado a Súria (sin traducción artificial).
- **Castellano completo**, con la misma calidad y funcionalidades; no es una versión secundaria.
- Selector visible en todas las páginas; al cambiar se queda en la misma sección y recuerda la preferencia **en el propio navegador** (sin datos personales).
- Se puede traducir con IA, pero se revisan naturalidad, precisión y coherencia, sobre todo en información importante.
- Ambas versiones sincronizadas: no se publica un contenido en un idioma si el otro no está listo o se contradice.
- Topónimos, nombres propios, denominaciones oficiales y expresiones locales se conservan en su forma original (p. ej. Poble Vell, Caramelles, Cardener).
- Estructura preparada para más idiomas sin grandes cambios; no se añaden ahora.
- Otros idiomas solo con evidencia de barreras lingüísticas en E3.
- Idioma declarado correctamente para lectores de pantalla; fechas y horas en el formato de cada idioma (hora de 24 h en ambos).

## 6. Recorridos (storyboard)
| Paso | La persona hace | Siente (hipótesis) | Lo que lo sostiene en el plan |
|---|---|---|---|
| **Vecina que quiere cenar (E1), 21:45, en el móvil** | | | |
| 1 | Abre el enlace y pone la contraseña una vez | duda: "¿esto es fiable?" | aviso de prototipo independiente; ayuda en la pantalla de contraseña |
| 2 | Ve la portada: Súria, tres tareas | orientación en 5 s | jerarquía 3.3; nombres validados 3.4 |
| 3 | Entra en "Comer y comprar hoy" | quiere una respuesta, no leer | estado principal primero (4.1) |
| 4 | Lee "Horario comunicado por el negocio: hasta las 23:00" | confianza calibrada | explicación de una línea; nunca "Abierto ahora" |
| 5 | Si dice "Sin confirmar", sabe que no lo sabemos | no engañada | 4.4; "Dinos qué te falta" |
| **Persona mayor (E2), en la tableta o el móvil de casa** | | | |
| 1 | Entra ayudada la primera vez; luego sola | inseguridad inicial | contraseña una vez por sesión; textos claros (7) |
| 2 | Toca "Esta semana en Súria" | reconocimiento sin etiquetarse | tareas, no perfiles |
| 3 | Lee actividades con día, hora y lugar | tranquilidad | fuente y fecha visibles en segundo plano |
| 4 | Semana sin actividades: lee el mensaje y el enlace a la agenda municipal | sigue teniendo una salida | 4.4 |
| **Recién llegado (E3)** | | | |
| 1 | Cambia a castellano si lo necesita | bienvenida, no extrañeza | selector visible; castellano completo (5) |
| 2 | Abre "Primeros pasos en Súria" | alivio: alguien pensó en sus dudas | respuestas con fuente oficial |
| 3 | No encuentra su duda y la envía por WhatsApp | escuchado | 3.6 con aviso de privacidad |
| **Comercio participante (E1)** | | | |
| 1 | Manda el horario por WhatsApp | esfuerzo mínimo | canal D2 |
| 2 | Ve su ficha con "Horario comunicado por el negocio" y la hora de su mensaje | reconocimiento y control | línea secundaria con responsable |
| **Vecino curioso por el proyecto** | | | |
| 1 | Lee "Hacia dónde vamos" | ilusión sin promesas | madurez Idea / Demo; independiente |
| 2 | Dice qué priorizaría | participación | canal 3.6 |
Horizontes: 5 segundos (portada clara y con identidad), 5 minutos (respuesta útil y honesta), largo plazo (confianza en que lo que dice es cierto). Las emociones son hipótesis a observar en las pruebas.

## 7. Responsive y accesibilidad (derivado de las condiciones del promotor y de las decisiones 3 y 5)
- Referencia: **WCAG 2.2 nivel AA** como mínimo, con atención especial a personas mayores y con poca experiencia digital.
- **Móvil y escritorio son igual de importantes**; ningún contenido exclusivo de un tamaño. En móvil (desde 360 px de ancho) las tres tareas se alcanzan desde la portada y la navegación sin depender de un menú oculto. Patrón visual concreto: Impeccable.
- Zonas táctiles de al menos 44 × 44 px; nada depende de pasar el ratón por encima.
- Texto base nunca menor de 16 px (tamaño final: Impeccable, pensando en lectores mayores); contraste mínimo 4,5:1 en texto; la página funciona con zoom al 200 % sin perder contenido.
- Teclado: todo se puede usar con teclado, orden lógico y foco siempre visible.
- Lectores de pantalla: regiones (cabecera, navegación, contenido, pie), títulos jerárquicos, idioma declarado, estados expresados como texto.
- Sin límites de tiempo dentro de la sesión; nada se mueve solo; se respeta "reducir movimiento".
- Fotos con texto alternativo y crédito.
- Formulario de contraseña con etiqueta visible (nunca solo texto dentro del campo) y error en texto.
- Páginas de texto con líneas de 65-75 caracteres.

## 8. Reglas de contenido
- Solo información verificada, con fuente; lo no comprobado se marca (AGENTS.md).
- **Imágenes reales de Súria** con licencia y crédito; nada de fotos de banco genéricas ni imágenes generadas presentadas como reales. Una ilustración se identifica como ilustración.
- **Independencia:** aviso "Iniciativa independiente y experimental"; sin escudos, logotipos ni expresiones que sugieran que es una web del Ayuntamiento.
- Lenguaje llano, frases cortas, sin tecnicismos ni frases de marketing ("bienvenido a…", "todo en uno").
- Sin datos personales publicados; responsables identificados por su rol o negocio.
- Fechas y horas en el formato de cada idioma, 24 h.

## 9. Vocabulario de componentes (sin forma visual; para el `DESIGN.md` de Impeccable)
Aviso de prototipo · Selector de idioma · Navegación persistente · Bloque de identidad · Entrada de tarea · Cabecera de sección con madurez · Estado principal · Línea secundaria · Ficha de comercio (E1) · Actividad de agenda (E2) · Respuesta de primeros pasos (E3) · Enlace a fuente oficial · Estado vacío · Idea / Demo (visión) · Botón de canal de opinión y ayuda con aviso de privacidad · Pantalla de contraseña · Página no encontrada.

## 10. Encargo para Impeccable
- Clasificación por superficie: portada = lectura + identidad (no landing publicitaria); páginas de tarea = utilidad y lectura (calma, legibilidad, densidad clara); "Hacia dónde vamos" = presentación de visión, una idea por bloque.
- Excepcional y propia de Súria, no una plantilla: evitar la cuadrícula de tres tarjetas iguales con icono para las tres tareas, héroes genéricos con frase vacía, todo centrado, emojis decorativos, degradados morados y los "looks" típicos de interfaces hechas con IA.
- Paleta y tipografía no elegidas por categoría ("pueblo con patrimonio = crema y serif"); se buscan en la Súria real (materiales, paisaje, fiestas), con contraste suficiente para lectores mayores.
- Estados (4.2) y madurez (3.5) con forma propia, legibles sin color.
- Resultado esperado: dirección visual y un `DESIGN.md` con tokens y los componentes de la sección 9.

## 11. Fuera de alcance del v0 (documentado, no diseñado)
- Funcionalidades futuras de la plataforma (solo como Idea o Demo en "Hacia dónde vamos").
- Mapa interactivo, chatbot, 3D, reservas, cuentas de usuario.
- Votaciones, encuestas o sistemas propios de recogida de opiniones.
- Analítica o seguimiento de usuarios.
- Idiomas adicionales al catalán y castellano.
- Actualización directa de datos por los comercios (solo si E1 la justifica).

## 12. Qué ya existe y se reutiliza
- Decisiones y textos aprobados del diseño (honestidad, privacidad) y de la revisión de ingeniería (D1-D4).
- Recursos municipales verificados como destino de enlaces: agenda de suria.cat, OAC, sede electrónica (`docs/investigacion-publica.md`).
- No hay `DESIGN.md` ni componentes previos: se crean con Impeccable.

## 13. Pendientes que no son decisiones de diseño abiertas
- Número de WhatsApp y correo del proyecto: decisión tomada (3.6), configuración pendiente del promotor.
- Nombres y orden de tareas y textos de vacíos: decididos como provisionales; se validan con participantes (3.4).
- Proveedor de alojamiento: diferido a despliegue (revisión de ingeniería).

## Implementation Tasks
Synthesized from this review's findings. Each task derives from a specific
finding above. Run with Claude Code or Codex; checkbox as you ship.

- [ ] **DT1 (P1, human: ~2-3 días / CC: ~1-2 h)** — dirección visual — Explorar con Impeccable la dirección visual a partir de las secciones 9 y 10 y dejar un `DESIGN.md`
  - Surfaced by: Pass 4 y Pass 5 — sin dirección visual ni sistema de diseño (aplazados a Impeccable por el promotor)
  - Files: `DESIGN.md` (nuevo)
  - Verify: el `DESIGN.md` cubre los componentes de la sección 9 y los estados 4.2, legibles sin color
- [ ] **DT2 (P1, human: ~1 día / CC: ~1 h)** — contenido — Redactar textos de interfaz y estados en catalán y castellano, revisados por persona
  - Surfaced by: Pass 7 — decisión 5; Pass 2 — vocabulario 4.2 y vacíos 4.4
  - Files: archivos de contenido del sitio (al implementar)
  - Verify: ninguna cadena existe en un solo idioma; revisión humana de naturalidad
- [ ] **DT3 (P2, human: ~2 h / CC: ~15 min)** — validación — Preparar la prueba de 5 segundos de nombres y orden de tareas
  - Surfaced by: Pass 1 — nombres provisionales (3.4)
  - Files: `docs/` (guía de prueba)
  - Verify: guía con las tres preguntas y el criterio "2 de 3"
- [ ] **DT4 (P1 antes de publicar, human: ~1 h / CC: —)** — canal — Crear número de WhatsApp y correo del proyecto y redactar el aviso de privacidad del canal
  - Surfaced by: Pass 7 — decisión 6
  - Files: contenido del aviso
  - Verify: ningún botón de contacto se publica sin funcionar; el aviso responde quién, para qué, cómo y cuánto tiempo
- [ ] **DT5 (P1, human: ~3 h / CC: ~20 min)** — accesibilidad — Añadir comprobaciones de accesibilidad (automáticas y manuales con teclado, lector de pantalla y zoom 200 %) al plan de pruebas
  - Surfaced by: Pass 6 — requisitos de la sección 7
  - Files: plan de pruebas de /qa
  - Verify: la prueba falla si un estado depende solo del color o si falta la etiqueta visible de la contraseña

## Completion Summary
```
  +====================================================================+
  |         DESIGN PLAN REVIEW — COMPLETION SUMMARY                    |
  +====================================================================+
  | System Audit         | sin DESIGN.md (aplazado a Impeccable); UI sí |
  | Step 0               | 2/10; foco fijado por el promotor (8 puntos)|
  | Pass 1  (Info Arch)  | 3/10 → 9/10 (nombres a validar)             |
  | Pass 2  (States)     | 5/10 → 9/10 (textos a validar)              |
  | Pass 3  (Journey)    | 3/10 → 8/10 (emociones = hipótesis)         |
  | Pass 4  (AI Slop)    | 4/10 → 7/10 (dirección visual: Impeccable)  |
  | Pass 5  (Design Sys) | 2/10 → 6/10 (tokens: Impeccable)            |
  | Pass 6  (Responsive) | 2/10 → 8/10                                 |
  | Pass 7  (Decisions)  | 2 resueltas (idioma, canal), 0 aplazadas    |
  +--------------------------------------------------------------------+
  | NOT in scope         | written (6 items)                           |
  | What already exists  | written                                     |
  | TODOS.md updates     | 0 items proposed                            |
  | Approved Mockups     | 0 generated (no autorizado servicio externo)|
  | Decisions made       | 6 added to plan                             |
  | Decisions deferred   | 0                                           |
  | Overall design score | 2/10 → 6/10                                 |
  +====================================================================+
```
Por debajo de 8: Pass 4 y Pass 5 dependen de la dirección visual y del `DESIGN.md`, que el promotor reservó a Impeccable (condición 6). No son decisiones pendientes del promotor, sino trabajo de DT1.

Pass 4, evidencia: clasificación HYBRID (portada lectura + identidad; tareas utilidad/lectura; visión presentación). Riesgo de rechazo duro identificado y prevenido en sección 10: las tres tareas como cuadrícula de tres tarjetas iguales. Litmus: 1 identidad en primera pantalla = sí (bloque de identidad 3.3); 2 ancla visual única = no especificado (Impeccable); 3 se entiende escaneando títulos = sí (3.3); 4 cada sección un trabajo = sí; 5 tarjetas necesarias = no se exigen; 6 movimiento = no especificado (Impeccable, con reducir movimiento); 7 premium sin sombras = no especificado.

Outside voices: no ejecutadas (el promotor pidió consultar antes de lanzar segundas opiniones externas).

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 0 | — | — |
| Outside Review | codex (`/plan-eng-review` outside voice) | Independent 2nd opinion | 1 | skipped (instrucción del usuario) | — |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 1 | ISSUES OPEN | 10 issues, 0 critical gaps |
| Design Review | `/plan-design-review` | UI/UX gaps | 1 | ISSUES OPEN | score: 2/10 → 6/10, 6 decisions |
| DX Review | `/plan-devex-review` | Developer experience gaps | 0 | — | — |

- **OUTSIDE COVERAGE:** codex, plan-review (eng), skipped por instrucción del usuario; fase de diseño sin voces externas por la misma instrucción. Sin cobertura externa.
- **VERDICT:** ninguna revisión CLEAR; diseño revisado con 6 decisiones del promotor y trabajo visual pendiente en Impeccable (DT1). eng review required
**UNRESOLVED DECISIONS:**
- Ninguna decisión de diseño abierta en esta revisión.
- + 1 unresolved from prior reviews
