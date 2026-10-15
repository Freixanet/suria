# Estado del proyecto

Prototipo independiente, público por autorización del promotor el14/10/2026.
Código: https://github.com/Freixanet/suria
Web: https://freixanet.github.io/suria/

Astro estático, catalán y castellano, diseño Façanes. Habitantes primero. No es una web del Ayuntamiento. Mantener `noindex` y avisos de vigencia; no hay contraseña de acceso.

## Decisiones vigentes

- Orden de portada: resumen Avui, agenda, Pròximament, Serveis útils, Cap on anem.
- Primers passos y comercios conservan páginas propias y navegación, sin sus secciones en portada.
- Agenda oculta días pasados según Europe/Madrid; conserva hoy y actividades de varios días vigentes. Títulos y resumen enlazan a ficha original.
- Bus azul, farmacia verde. Horarios programados, no seguimiento en directo; no inventar vigencia ni datos. Farmacia muestra tramo del día actual, con espacios alrededor del guion.
- Servicios cuadrados208–272px, fila desplazable sin barra visible. Botones e insignia con radiopropio12px; superficies con padding=max(16px,radius×.75).
- Tiempo informativo sin enlace en icono/temperatura; enlaceⓘ separado de atribución. Datos estimados de Open-Meteo, no estación municipal. Créditos de foto y fuentes en Què estem provant#fonts-credits.
- Foto real conservada; no restaurar diseño previo ni créditos encima de foto como efecto secundario.

## Desarrollo y publicación

Node22.12+ y lockfile existentes. No instalar hooks ni duplicar skills por cambiar de agente. AGENTS.md y CLAUDE.md comparten instrucciones. Leer PRODUCT.md y DESIGN.md según tarea y revisar cambios locales antes de editar.

`npm run test:unit`, `npm run build`, `npm run build:proves`, `npm run test:e2e -- --workers=1`. Google Chrome existente para E2E. Última pasada:103 ejecuciones unitarias y125 pruebas de navegador correctas; compilación Pages y rutas CA/ES verificadas con prefijo /suria/. Pendientes móvil físico y lector de pantalla.

Pages despliega main mediante Actions; variables SURIA_SITE/SURIA_BASE solo en build público, desarrollo local en raíz. Workflows omiten cambios solo documentales. Estado local, registros, capturas, dependencias, builds, archivos env y datos privados quedan fuera del repositorio público. No reset/clean/stash ni restauraciones masivas para cambiar de agente. No reescribir fechas del historial.
