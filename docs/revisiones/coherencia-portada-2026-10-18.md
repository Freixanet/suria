# Coherencia de portada · 18/10/2026

Revisión con Impeccable: Assessment A (juicio de diseño) y B (detector y navegador) en dos agentes aislados, síntesis del agente principal. Se modificó exclusivamente el ritmo entre secciones. No es una certificación WCAG ni auditoría exhaustiva.

## Corrección aplicada

Espacio común72px en escritorio y48px hasta900px. Retirada fila vacía de grid y margen adicional de16px antes de práctica; footer usa el mismo token. Build15páginas y diff correctos. Navegador390/1440: las cuatro distancias entre cajas Avui, semana, práctica, actualidad y footer son48/72px exactos; sin overflow. Evidencia en workspace work/design-review/section-spacing.json y section-spacing.png.

## Hallazgos pendientes, sin aplicar

1. Jerarquía visual desigual: a1440px el h2 de semana52px, práctica y actualidad37.44px. Recomendación: una escala compartida salvo prioridad editorial justificada. HTML conserva h2 en los tres; diferencia visual no equivale a incumplimiento semántico. Referencia: https://www.w3.org/WAI/tutorials/page-structure/headings/.
2. Descubrimiento: a390px solo1 de5 noticias visible; a1440px4 de5. No hay contador ni aviso de piezas ocultas. Veure totes abre el archivo municipal, no la colección local. Recomendación: conservar fila sin scroll y ofrecer acceso explícito a todas las piezas, sin ocultación silenciosa.
3. Superficie interactiva: imágenes de noticias no enlazadas aunque son el principal punto visual. Enlazar imagen además de titular/CTA con nombre accesible y foco visible.
4. Encuadres: object-fit:cover con160px recorta imágenes/carteles de proporciones distintas. Recomendación: focal por imagen o miniatura editorial, evitar carteles con texto recortado.
5. Chips de32px: posible mejora ergonómica para residentes mayores; ampliar área táctil manteniendo el aspecto. No se declara falloWCAG: el mínimo2.5.8 es24px con excepciones. Referencia: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum/.
6. Deuda CSS: numerosos selectores antiguos de Avui/servicios sin renderizar. Limpiar tras confirmar qué experimentos se descartan; consolidar tokens de títulos, gaps y tarjetas para evitar divergencias.
7. Etiqueta temporal: Aquesta setmana conserva fechas30oct además de19/21/22oct. Revisar filtro de semana o titular para no atribuir todas a la misma semana; no se cambió contenido.

El composer sin respuestas, tarjetas vacías y servicios ocultos son decisiones explícitas del prototipo. Antes de uso público deben resolverse, pero no se cuentan como regresiones causadas por este cambio.

## Detector y límites

Detector Impeccable ejecutado por Assessment B: exit0,20 avisos secundarios y0 primarios. Reglas de radios/tipografía cotejadas con DESIGN.md: varias reflejan diferencias entre sidecar y decisiones recientes, no defectos confirmados. Sin overlay ni inyección. Se requiere prueba específica de contraste del hero, lector de pantalla y zoom200% antes de declarar accesibilidad completa.

Questions skipped: el encargo pide corregir el espaciado e informar; ninguna modificación adicional depende de una respuesta.

## Resoluciones del promotor y mantenimiento

El título semanal mayor es deliberado por su relevancia: hallazgo1 descartado como defecto, no cambiar tamaño. Decisión sobre filtro/título temporal pospuesta. Noticias ocultas e imágenes no enlazadas explicadas, sin autorización para cambiar ese comportamiento. Carteles recortados: propuestas de contain con fondo o miniatura editorial, aún sin aplicar.

Mantenimiento aplicado: Inici.astro580→168líneas. Eliminados estilos sin elementos correspondientes de variantes antiguas de Avui, bus/farmacia y bloques retirados, además de imports/cálculos bus/rango sin uso. Conservados los módulos compartidos y datos usados. Build15páginas y diff correctos. Comparación automática DOM+computed style a390/1440 antes/después: cero diferencias en cajas, fuentes, colores, radios, padding y gaps. No se repiten unitarias de lógica no modificada.
