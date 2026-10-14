---
target: portada y páginas de tarea de Súria
total_score: 25
max_score: 36
na_heuristics: 9
p0_count: 0
p1_count: 2
target_identity: "file:/Users/mfreixanet/Projects/suria/src/views/Inici.astro"
target_fingerprint: "sha256:47697376ba0649a763a1e463a27e4e6794eeeeee0721f1b71562a2ef7eb36628"
target_path: /Users/mfreixanet/Projects/suria/src/views/Inici.astro
timestamp: 2026-10-14T23-22-37Z
slug: src-views-inici-astro
---
# Crítica Impeccable — portada, «Aquesta setmana», «Primeros pasos» (14/10/2026)

Method: dual-agent (A: revisión de diseño · B: detector + navegador)

| # | Heurística | Nota | Problema |
|---|---|---|---|
| 1 | Visibilidad del estado | 2 | Actividad terminada sin marcar mientras el resumen dice «ja han passat» |
| 2 | Mundo real | 3 | Abreviaturas Dc/Dj/Dv |
| 3 | Control | 3 | — |
| 4 | Coherencia | 2 | Día en dos formatos; enlaces inconsistentes; teléfono con doble subrayado |
| 5 | Prevención de errores | 3 | Falta el estado «pasada» por hora |
| 6 | Reconocer | 2 | Farmacia duplicada en portada |
| 7 | Eficiencia | 3 | — |
| 8 | Estética | 2 | Procedencia repetida en cada ficha y en lateral |
| 9 | Recuperación | n/a | Sin formularios |
| 10 | Ayuda | 2 | Sin vía visible para avisar de errores |
| Total | | 25/36 | Aceptable |

Especificidad: identidad fuerte en la cabecera; las fichas por debajo son genéricas.
Detector: 17 (1 warning, 16 advisory). Reales: padding de la franja en móvil, interlineado de .identitat, #c9cdd4 en Peu, proliferación de tamaños de titular. Falsos positivos: ventana de fecha (side-tab/border-accent), radio 0.4rem.

Prioridades:
1. [P1] Actividades terminadas sin marcar (caducidad a medianoche, no a la hora de fin) — harden
2. [P1] Competencia de subrayados y negritas (teléfono doble subrayado, «Fitxa a suria.cat» repetido, negrita en horas del texto) — quieter
3. [P2] Ficha de actividad con jerarquía invertida (lugar menor que descripción, día abreviado, raya lateral en requisitos) — typeset
4. [P2] Repeticiones en portada (farmacia doble, caja vacía de comercios dominante) — layout
5. [P2] Procedencia repetida en «Aquesta setmana» (choca con el principio 2 de PRODUCT.md) — distill

Personas: vecina de 78 años (abreviaturas, icono cel pálido, doble subrayado, actividad pasada); recién llegado (farmacia duplicada); consulta rápida móvil (franja de 3 líneas).
Menores: crédito oculto (temporal, obligatorio por licencia); hueco junto a la farmacia en escritorio; tres tipos de separador; texto pequeño sobre ocre.
