# Descobreix Súria (Súria Web Exp.)

Instrucciones compartidas para todos los agentes (Claude Code, Codex, etc.).

## Continuidad entre Codex y Claude Code

- Al iniciar o retomar trabajo, lee `work/CONTINUITY-suria.md` si existe (estado local); en un clon nuevo usa `docs/ESTADO.md`, contrasta `git status --short` y el diff actual, y consulta `PRODUCT.md` y `DESIGN.md` según la tarea. La memoria de un chat no se transfiere automáticamente al otro agente.
- Mantén un único estado compartido en ese archivo: objetivo, decisiones vigentes, cambios pendientes, verificaciones con evidencia y siguiente paso. Actualízalo al terminar o interrumpir trabajo; sustituye información obsoleta, sin acumular diarios.
- Los cambios sin commit y los archivos nuevos son trabajo existente que debe conservarse. No hagas reset, limpieza, stash, checkout ni restauraciones masivas para cambiar de agente. No consideres HEAD la única versión válida ni crees commits de trabajo ajeno automáticamente.
- Un solo agente debe editar el checkout a la vez. Antes de tomar el relevo, comprueba si hay otra sesión editando; si la hay, coordina la pausa con el usuario. Un servidor de desarrollo abierto no significa que un agente esté editando.
- Las instrucciones más recientes del usuario prevalecen sobre documentos antiguos. Si encuentras una contradicción cuya decisión no consta, regístrala y aclárala antes de cambiar el comportamiento afectado; no reviertas silenciosamente el diseño.
- Impeccable tiene una sola copia en `.claude/skills/impeccable/`; `.agents/skills/impeccable` enlaza a ella para Codex. Lee su `SKILL.md` cuando corresponda usarla. No dupliques ni actualices la skill al cambiar de agente. Los agentes auxiliares de Claude no están instalados automáticamente en Codex.
- La configuración `.claude/settings.json` no se carga automáticamente en Codex. Para invocaciones de Impeccable desde Codex, conserva `IMPECCABLE_HOME="$PWD/.impeccable/home"`, `IMPECCABLE_NO_TELEMETRY=1` y `DO_NOT_TRACK=1` en el entorno del comando. No copies permisos ni hooks globales de un agente a otro.
- No instales runtimes, dependencias, navegadores o hooks por el mero cambio de agente. Usa el lockfile y el entorno existente; consulta los comandos y precauciones en el estado compartido.
- Las comprobaciones locales de navegador y QA necesarias para el trabajo solicitado están autorizadas por el promotor. Esto no autoriza activar hooks, Team Mode, ejecutar setup de gstack ni publicar o desplegar.


## Estado actual

Prototipo v0 en construcción local (pedido por el usuario el 12/10/2026): web estática con Astro, en catalán y castellano, dirección visual **«Façanes»** (rediseño autorizado por el promotor el 14/10/2026). Las direcciones anteriores se conservan recuperables: Silvinita B en la etiqueta git `silvinita-b-2026-10-14` y en `archiu/silvinita-b-2026-10-14/`; la v3 en `archiu/v3-astro-2026-10-13/`. Nada se publica ni se despliega sin confirmación.

Dónde está cada cosa (no dupliques su contenido aquí):
- Verdad de producto y criterios de diseño: `PRODUCT.md`.
- Sistema visual: `DESIGN.md` (con `.impeccable/design.json`) y `.impeccable/surfaces/`.
- Decisiones de ingeniería y UX: `docs/revisiones/eng-review-prototipo-v0.md`, `docs/designs/especificacion-ux-v0.md`.
- Referencias visuales y material de Súria con procedencia: `docs/referencias-visuales.md`.
- Contenido publicable: `src/content/` (cada pieza con fuente, fecha de consulta y responsable; el build falla si falta algo).
- Comandos: `npm run dev`, `npm run build`, `npm test` (unitarias + E2E con Playwright y axe), `npm run test:lighthouse` (con `npm run preview` en marcha en el puerto 4329).

## Propósito

Crear una experiencia digital extraordinaria para descubrir y vivir Súria: identidad visual de calidad, tecnología y servicios útiles, unidos a la historia, la cultura, el patrimonio y la autenticidad del municipio. La web es el primer paso de una modernización más amplia.

## Principios irrenunciables

- **Habitantes primero.** Solo un turismo compatible con la tranquilidad, la seguridad y la calidad de vida de la población. No buscar masificación.
- Proteger la privacidad y la autenticidad del municipio.
- Orientar las visitas hacia rutas y zonas de aparcamiento adecuadas.
- Medir beneficios económicos y molestias; corregir los efectos adversos antes de ampliar el alcance.
- No proponer mensajes ni funcionalidades que fomenten concentraciones masivas de visitantes.

## Hoja de ruta (resumen)

0 Visión → 1 Investigar Súria → 2 Diseñar la experiencia → 3 Construir el MVP → 4 Validar con residentes y negocios → 5 Lanzar y mejorar → 6 Ecosistema inteligente (IA, 3D, inmersivo, solo si hay justificación real).
Primer lanzamiento orientativo: 5–10 semanas (estimación, no compromiso). Detalle en `docs/hoja-de-ruta.md`.

## Alcance del MVP

Portada extraordinaria · «Descobreix Súria» · «Viu Súria» · Comercios y gastronomía · Explorador o mapa interactivo. Bilingüe y de máxima calidad (idiomas por confirmar).
**Fuera del MVP:** chatbot de IA, reconstrucciones 3D completas, sistema propio de reservas.

## Criterios para avanzar

Valor para residentes · beneficio local · impacto controlado · validación antes de ampliar.

## Reglas de trabajo

- Contenido sobre patrimonio, historia, comercios y servicios: solo información verificada; cita la fuente y marca lo no comprobado.
- `docs/hoja-de-ruta.md` es una reconstrucción de la conversación original, no una transcripción literal; trátala como contexto, no como especificación cerrada.
- Pregunta antes de decisiones de alcance, tecnología o publicación. No publiques ni envíes nada externo sin confirmación.
- Idioma de trabajo con el usuario: español.
