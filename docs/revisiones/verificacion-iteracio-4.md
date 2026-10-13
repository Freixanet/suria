# Verificación de la iteración 4 (v3 en Astro y variante B)

Fecha: 13/10/2026. Las dos versiones se construyen desde los mismos archivos de contenido y están congeladas mientras el promotor las compara. Esta verificación no ha cambiado nada visual.

- **v3 en Astro**: `npm run build`, servida en `http://127.0.0.1:4329/` (`astro preview`).
- **Variante B**: `npm run build:variant`, servida en `http://127.0.0.1:4342/` (`scripts/servidor-estatic.mjs`).
- Comparación visual y qué representa cada versión: `.impeccable/mocks/iteracio-4/index.html`.

## 1. Pruebas automáticas

| Prueba | v3 | B |
|---|---|---|
| Unitarias: estado E1 (D4), validación de contenido, i18n, formatos. Con TZ local, `Pacific/Auckland` y `America/New_York` | 48/48 | código compartido |
| Recorridos, axe-core (WCAG 2.0–2.2 A/AA y buenas prácticas), 200 % de texto, objetivos táctiles, tamaño mínimo de texto; 360 y 1440 px | 58/58 | 58/58 |
| E1 con datos de prueba (build `SURIA_PROVES=1`, nunca se publica) | 5/5 | no aplica |
| Teclado (`tests/e2e/teclat.spec.ts`) | 8/8 | 8/8 |

## 2. Lighthouse 13.5 (local, Chrome instalado, sin servicios externos)

Script: `npm run test:lighthouse`. Informes completos en `informes/lighthouse/` (no se versionan).

Para que la comparación de rendimiento fuera justa, las dos versiones se sirvieron también con el mismo servidor. Mediana de 3 ejecuciones, móvil simulado:

| Página | v3 rendimiento | v3 LCP | v3 peso | B rendimiento | B LCP | B peso |
|---|---|---|---|---|---|---|
| Portada | 99 | 1,81 s | 142 KiB | 99 | 1,95 s | 159 KiB |
| Aquesta setmana | 100 | 1,65 s | 102 KiB | 99 | 1,80 s | 119 KiB |

- **Diferencia entre versiones**: los 17 KiB y unos 0,15 s de B corresponden a la fuente Gloock.

Puntuaciones en las 5 páginas revisadas (portada, «Aquesta setmana», «Primers passos», portada en castellano y «Cap on anem»), en móvil y en escritorio, para las dos versiones:

| Categoría | Resultado |
|---|---|
| Rendimiento | 99–100 |
| Accesibilidad | 100 |
| Buenas prácticas | 100 |
| SEO | 54–58 (esperado; ver abajo) |
| CLS | ≤ 0,025 |
| TBT | 0 ms |

**Avisos y su lectura:**
- `is-crawlable` (SEO): **intencionado**. El prototipo lleva `noindex` y `robots.txt` cerrado (D3-5).
- `hreflang` (SEO): **real, menor**. Los enlaces alternativos de idioma son relativos y Lighthouse los quiere absolutos.
  - Requiere fijar `site` en Astro, que depende del dominio que se decida al desplegar (T5).
  - Sin efecto en un sitio privado.
- `lcp-discovery` en «Cap on anem»: **real, menor**. Allí la foto es el elemento más grande y se carga en diferido.
  - Mejora propuesta: carga inmediata y prioridad alta solo en esa página.
  - No se aplica ahora para no tocar las versiones congeladas.
- `render-blocking`: unos 150 ms estimados por la hoja de estilos. Aceptable en una página estática; no se actúa.
- `cache-insight` y `document-latency`: aparecen solo con el servidor de pruebas de B (sin caché ni compresión). Son del entorno, no de la página. El alojamiento real los resolverá.

## 3. Recorrido con teclado (Chrome real, Tab, Mayús+Tab y Retorn)

Automatizado con Playwright: `tests/e2e/teclat.spec.ts` más el registro del orden de tabulación.

Comprobado en las dos versiones, a 360 y 1440 px:

1. **El primer Tab** muestra «Ves al contingut / Ir al contenido». Con Retorn, el foco pasa al contenido principal.
2. **Todas las paradas** (25–26 en portada) quedan visibles al recibir el foco y llevan un contorno de 3 px.
   - Contraste del contorno con el fondo que lo rodea: ≥ 3:1. Rojo sobre sal y halita; salmón sobre la roca oscura.
3. **El orden sigue la lectura**: idioma, tareas, agenda (fichas, programa, «Tota la setmana»), primeros pasos (trámite, llamadas), créditos de la foto, «Cap on anem», «Què estem provant» y pie.
   - En la v3 de escritorio el orden recorre una columna entera antes de subir a la siguiente. Es lo esperable en columnas.
4. **Sin trampas**:
   - Se puede cambiar a castellano y entrar en «Primeros pasos» solo con el teclado.
   - Mayús+Tab retrocede.
   - Los enlaces ocultos (avisos de vigencia, «Inici» en móvil) no reciben foco.

**Observaciones (no son fallos):**
- **«Què estem provant»** aparece dos veces seguidas (fin de la portada y pie). Es redundante, pero no bloquea.
- **Llegar a la primera ficha** de la agenda cuesta 8 tabulaciones sin usar el salto, o 2 usándolo.
- **Desplazamiento suave**: al tabular hacia contenido fuera de pantalla, el sitio desplaza suavemente, salvo con «reducir movimiento». La prueba espera a que termine.

## 4. Problemas relevantes documentados

| Problema | Tipo | Estado |
|---|---|---|
| `hreflang` relativo | Técnico, SEO | Pendiente de dominio (T5) |
| Foto LCP diferida en «Cap on anem» | Rendimiento, menor | Propuesto tras la elección |
| Cero con barra de Atkinson Hyperlegible en horas dentro del texto («9.00», «16.00») | Tipografía | Decisión del promotor (ver la recomendación) |
| «Què estem provant» duplicado en el orden de foco | Teclado, menor | Tras la elección |
| Aviso del build: «la colección comercos está vacía» | Esperado | No hay negocios todavía |

## 5. Pendientes explícitos (no se han hecho)

- **Lector de pantalla** (VoiceOver en macOS e iOS, TalkBack): orden de lectura, anuncio de estados de E1 (`aria-live`), etiquetas de idioma y tareas.
- **Móvil real**: tamaño de toque, zoom del sistema y letra grande del sistema, lectura al sol, conexión lenta.
- **Revisión humana del castellano**: naturalidad, coherencia con el catalán y topónimos.
- Después de elegir la versión y completar lo anterior: pruebas con vecinos. Cualquier publicación, solo con confirmación del promotor.
- Siguen pendientes de antes: contraseña en servidor (D3, T5), canal de opinión (DT4) y foto de archivo de 1924.

## 6. Estado al cerrar esta ronda (13/10/2026)

- Ronda de comprobaciones cerrada. Las dos versiones quedan **congeladas** para la comparación visual del promotor; no se consolida todavía.
- Recomendación profesional: **variante B**, pendiente de la valoración del promotor.
- **Decisiones provisionales del proyecto**, a validar con lectura real (personas mayores, móvil real):
  - Atkinson Hyperlegible como fuente de lectura.
  - La serif de titulares (Gloock) solo en títulos de página y de sección de **28 px o más**; nunca en interfaz, fechas, horas ni etiquetas.
- **Ajustes menores anotados** (se aplican al consolidar la versión elegida):
  1. Horas dentro del texto en la grotesca (evita el cero con barra).
  2. Foto de «Cap on anem» con carga inmediata y prioridad alta en esa página.
  3. `site` de Astro y `hreflang` absolutos cuando haya dominio (T5).
  4. Quitar la parada de foco duplicada de «Què estem provant» en la portada.
  5. Eliminar del código la versión no elegida (`SURIA_VARIANT`, `variant-b.css`, `IniciB.astro`, ramas en los componentes) y repetir todas las pruebas.
- Comprobaciones pendientes: las de la sección 5.

## 7. Consolidación (13/10/2026)

El promotor eligió B como base visual. Copia recuperable de la v3: `archiu/v3-astro-2026-10-13/` (sitio construido y código fuente).

**Densidad de la portada**
- Cada actividad muestra fecha, hora, lugar, requisito esencial y acción. La explicación larga (`nota`) pasa a «Aquesta setmana», enlazada con «Tota la setmana, amb fonts».
- Primeros pasos usan un resumen (`resum`): dónde, cuándo y qué hace falta. El texto completo está en su página.
- «Pròximament» queda compacto: título, fechas, el plazo de inscripción y «Programa i detalls», que enlaza con `#proximament` en el detalle. En móvil va **después** de los servicios.
- En portada, la farmacia de guardia ya caducada desaparece y queda la vigente. Sin JavaScript se ven los dos turnos con sus fechas.
- Ni la letra se ha reducido ni nada queda en acordeones. La procedencia (línea «Font»), la vigencia y la madurez siguen visibles en cada sección.
- Medidas a 360 px (respecto a la v3 archivada; la altura total de B antes de consolidar era de unos 4560 px):

| Medida | v3 archivada | Consolidada |
|---|---|---|
| Primeros pasos empiezan a | 2176 px | 1311 px |
| Altura total | 4562 px | 4217 px |

**Ajustes menores aplicados**
1. Las horas dentro del texto van en la grotesca (`TextHores.astro`).
2. La foto de «Cap on anem» se carga de inmediato y con prioridad alta. Ya no aparece el aviso `lcp-discovery`.
3. Quitada la parada de foco duplicada de «Què estem provant».
4. Retirado todo el código de variantes y repetidas todas las pruebas.

Pendiente: `hreflang` absoluto, a la espera del dominio (T5).

**Revisión de acabado de Impeccable** (revisor independiente con capturas de 1440, 390 y 800 px)
- Disposición inicial: «fix», con 5 correcciones materiales:
  1. «Pròximament» en portada tenía su propio título y madurez, pero le faltaba su fuente («notícia»), y las piezas no seguían el orden de títulos.
  2. Faltaba en portada la vigencia «Oberta fins al 31 de desembre».
  3. Los enlaces «Fitxa a suria.cat» y las fuentes del lateral no se distinguían entre sí. Ahora llevan el nombre de cada pieza.
  4. En el detalle, la rejilla no coincidía con la portada; ahora usan la misma, 7/12 + 5/12.
  5. Los filetes de la segunda fila no estaban alineados.
- Dos pasadas de veredicto después: las 5, «resolved». Disposición «ship», válida solo para esas correcciones. Las vistas Menjar, Passos, Provant, Cap y NoTrobada no entraron en esta revisión.
- Mejoras menores: `text-wrap: balance` en títulos serif, cifras tabulares en la columna de fechas y el h1 del detalle en una línea a 1440 px.
- Pruebas tras las correcciones: Playwright 79/79 y Lighthouse 100/100/100.

**Comprobaciones repetidas**
- Unitarias: 48/48.
- Playwright: 79/79, incluidos axe, texto al 200 %, teclado, densidad, «Pròximament» y la farmacia en portada.
- Lighthouse: 100 en rendimiento, accesibilidad y buenas prácticas, en móvil y escritorio. SEO 54–58 por el `noindex`.
- Detector de Impeccable: solo los avisos ya justificados (`cramped-padding` en contenedores a sangre, `cream-palette` intencionado y jerarquía orientativa en el detalle).
- Procedencia de la foto incrustada en el archivo.

## 8. Recomendación tipográfica

Es una recomendación profesional; la decisión es del promotor. Se valora el conjunto, no solo cada fuente por separado.

**Legibilidad**
- **Texto (Atkinson Hyperlegible)**: la mejor elección para el público principal (personas mayores y lectura en móvil). Distingue bien caracteres parecidos (I/l/1, O/0).
  - Su único coste es el cero con barra, que en las horas dentro del texto se ve técnico.
  - Opciones, de menor a mayor cambio:
    - (a) aceptarlo;
    - (b) poner las horas que van dentro del texto en la grotesca, como ya se hace en la agenda;
    - (c) evaluar otra fuente de texto de alta legibilidad sin cero barrado, con muestras reales.
  - Recomiendo (b): mantiene la fuente de lectura y unifica cómo se ven las horas en todo el sitio.
- **Datos (Schibsted Grotesk)**: fechas, horas, menú y acciones se leen muy bien en las dos versiones.
- **Titulares en serif (Gloock, en B)**: legible a los tamaños en que se usa (28–44 px). No debe bajar de unos 24 px por sus trazos finos, así que hay que reservarla para títulos de página y de sección. Así está en B.

**Jerarquía**
- **En la v3**, todo lo destacado es grotesca negra 800: títulos de sección, títulos de actividad, fechas, horas y acciones. La jerarquía depende solo del tamaño, y la página tiene mucha masa negra que compite.
- **En B**, la serif de peso normal separa dos niveles por la voz: los títulos de sección se leen como titulares y lo operativo (actividades, horas, llamadas) queda como dato en grotesca. La agenda se recorre mejor porque sus títulos son los puntos de anclaje en negrita.
- Para lo que hace esta portada (encontrar algo útil enseguida), B ordena mejor.

**Coherencia del conjunto**
- La marca «Súria» funciona como logotipo: es un rótulo, no un titular. Que la marca use una grotesca pesada y los titulares una serif es la convención de la prensa (cabecera frente a titulares). No rompe la coherencia mientras la serif no entre en la interfaz: botones, menú, fechas, etiquetas.
- El riesgo de B es que la serif lleve la página hacia un «diario genérico». Lo evitan la cabecera de roca, la banda de silvinita, los filetes y el rojo mineral, que siguen mandando.
- La v3 es más unitaria y más «industrial». También es más uniforme y algo más pesada de leer.

**Recomendación**: el sistema tipográfico de B, con tres condiciones:
1. La serif solo en títulos de página y de sección de 28 px o más.
2. Las horas siempre en la grotesca.
3. Una revisión con dos o tres lectores mayores en un móvil real antes de fijarlo.

Si se prefiere la unidad máxima con la cabecera, la v3 es correcta. Para mejorar su jerarquía bastaría con bajar el peso de los títulos de actividad a 700.
