# Actualitat de portada

Selección editorial local consultada18/10/2026. Tres noticias de fuentes municipales al final de la home, después de Informació pràctica y antes del único footer. CA/ES. Fechas mostradas son de publicación de la noticia, no de la actividad descrita. Resúmenes redactados para este prototipo, con enlace al texto completo y atribución visible. No hay importación automática ni promesa de actualización en tiempo real; las piezas se mantienen desde la colección noticies.

## Procedencia

- **Anem a moure’ns: inscripcions del 26 al 30 d’octubre**. Publicación: 2026-10-16. Fuente: https://www.suria.cat/actualitat/noticies/les-inscripcions-del-programa-anem-a-mourens-per-a-persones-grans-romandran-obertes-del-26-al-30-doctubre. Imagen original: https://www.suria.cat/media/repository/baners_destacats/destacats/destacats_de_noticies/2022_02_Destacat_de_noticies_Programa_Anem_a_moure_ns_per_a_la_gent_gran.jpg. Copia local: `public/imatges/noticies/anem-a-mourens.jpg`, reducida a1200px.
- **La Miranda, protagonista de les Jornades Europees de Patrimoni**. Publicación: 2026-10-14. Fuente: https://www.suria.cat/actualitat/noticies/les-restes-del-mas-medieval-la-miranda-protagonitzen-les-jornades-europees-de-patrimoni-a-suria. Imagen original: https://www.suria.cat/media/repository/noticies/fotos_de_noticies/2026_10_fotos_de_noticies/2026_10_10_Jornades_Europees_de_Patrimoni_-_La_Miranda__1_.jpg. Copia local: `public/imatges/noticies/la-miranda.jpg`, reducida a1200px.
- **Consulta del cens electoral del 12 al 19 d’octubre**. Publicación: 2026-10-09. Fuente: https://www.suria.cat/actualitat/noticies/avis-sobre-el-periode-de-consulta-del-cens-electoral. Imagen original: https://www.suria.cat/media/repository/baners_destacats/destacats/destacats_de_noticies/Destacat_de_noticies_-_Avis1.jpg. Copia local: `public/imatges/noticies/cens-electoral.jpg`, reducida a1200px.

## Implementación y comprobaciones

- Componente `src/components/Actualitat.astro`, colección `src/content/noticies/` y esquema con bilingüismo, fuentes, consulta y responsable obligatorios.
- Tres tarjetas con imagen16:9, categoría, fecha, titular, resumen, lectura y fuente; enlace al archivo municipal de noticias.
- Escritorio3 columnas, tablet2, móvil1. Navegador confirma tres imágenes cargadas, sección final h-actualitat, sin overflow ni recortes a320/390/768 y tamaño habitual de escritorio. Textos castellanos y cambioCA/ES comprobados; viewport restaurado.
- Build15páginas y diff --check correctos. No se repiten unitarias ajenas a este cambio editorial; el build valida las tres nuevas piezas. No se ha publicado.
- Evidencia workspace `work/actualitat/sources.json` y `actualitat-desktop.png`.

## Composición vigente

Cinco tarjetas compactas; sección con el mismo ancho que el resto de portada. Grid5/4/3/2/1 según viewport, ancho máximo288px por tarjeta. Solo imagen, metadatos, titular y lectura; resumen íntegro permanece en la colección. Build y navegador320/390/768/1440/2560: alineación exacta con práctica, sin overflow, cinco imágenes cargadas.

- La Setmana de la Gent Gran comença el 19 d’octubre. Publicación 2026-10-07, consulta 2026-10-18. Fuente: https://www.suria.cat/actualitat/noticies/suria-celebrara-una-nova-edicio-de-la-setmana-de-la-gent-gran-a-partir-del-19-doctubre. Imagen municipal: https://www.suria.cat/media/repository/baners_destacats/destacats/2026_destacats_de_noticies/2026_10_19_Destacat_de_noticies_Setmana_de_la_Gent_Gran.jpg. Copia local reducida a800px: /imatges/noticies/gent-gran.jpg.

- Rosa Santamaria exposa «Diversitat» a Cal Balaguer. Publicación 2026-10-05, consulta 2026-10-18. Fuente: https://www.suria.cat/actualitat/noticies/lartista-surienca-rosa-santamaria-inaugura-la-seva-exposicio-diversitat-a-la-sala-cal-balaguer-del-porxo. Imagen municipal: https://www.suria.cat/media/repository/noticies/fotos_de_noticies/2026_10_fotos_de_noticies/2026_10_02_Inauguracio_de_l_exposicio_Diversitat__1_.jpg. Copia local reducida a800px: /imatges/noticies/diversitat.jpg.

Ajuste posterior: tarjetas igualadas a agenda semanal con misma función de capacidad (ResizeObserver), ancho hasta352px, mínimo352px de alto y gap24/16px. Solo las que caben en una fila; las5 piezas siguen en datos. Imagen160px. Verificadas medidas idénticas entre ambas secciones a320/390/768/1440/2560, sin overflow.

Corrección de descubrimiento y medios: cinco noticias visibles mediante reja con filas adicionales; no se ocultan excedentes. Agenda semanal conserva su comportamiento. Imágenes enlazadas a fuente de la noticia, con nombre accesible. Imatge.ajust cover/contain validado por esquema; cens electoral y Gent Gran son carteles completos sobre fondo piedra, fotos mantienen cover. Comprobación390/1440:5/5 visibles, cinco enlaces de imagen coinciden con titular, sin overflow y tarjetas352px de alto.

Decisión final posterior: una fila limitada a las noticias que caben, todas las imágenes cover160px sin fondos/contain. Excedentes ocultos aceptados por el promotor; archivo municipal accesible. Imágenes siguen enlazadas. Retirados campo ajust y estilos especiales. Build/diff y390/1440: una fila1/4 visibles, sin overflow.
