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
- Tiempo informativo sin enlace en icono/temperatura; atribución solo en Fonts i crèdits, sinⓘ en cabecera. Datos estimados de MET Norway, no estación municipal. Créditos de foto y fuentes en Què estem provant#fonts-credits.
- Foto real conservada; no restaurar diseño previo ni créditos encima de foto como efecto secundario.

## Desarrollo y publicación

Node22.12+ y lockfile existentes. No instalar hooks ni duplicar skills por cambiar de agente. AGENTS.md y CLAUDE.md comparten instrucciones. Leer PRODUCT.md y DESIGN.md según tarea y revisar cambios locales antes de editar.

`npm run test:unit`, `npm run build`, `npm run build:proves`, `npm run test:e2e -- --workers=1`. Google Chrome existente para E2E. Última pasada:104 ejecuciones unitarias y127 pruebas de navegador correctas; compilación Pages y rutas CA/ES verificadas con prefijo /suria/. Pendientes móvil físico y lector de pantalla.

Pages despliega main mediante Actions; variables SURIA_SITE/SURIA_BASE solo en build público, desarrollo local en raíz. Workflows omiten cambios solo documentales. Estado local, registros, capturas, dependencias, builds, archivos env y datos privados quedan fuera del repositorio público. No reset/clean/stash ni restauraciones masivas para cambiar de agente. No reescribir fechas del historial.

## Plataforma app (17/11/2026, rama `claude/adoring-gates-h231iu`)

Encargo del promotor: web app mobile-first (futura app nativa) para residentes, comercios y recién llegados, con comunidad, cuentas y chat de IA; solo frontend. Sustituye, para la app, las exclusiones previas de cuentas y chatbot (PRODUCT.md). Convive con la web anterior, que no se toca.

- Rutas: `/app/` (ca) y `/es/app/` (es). Código en `src/app/` (vistas, componentes, `client/` en TypeScript sin dependencias nuevas, `styles/`). Páginas: `src/pages/app/[...cami].astro` y `src/pages/es/app/[...cami].astro`.
- Pantallas: Avui, Agenda y ficha, Comunitat, Comerç y ficha, Pregunta (chat), Gestions, Nou a Súria, Compte, Més, Per a negocis, Descobreix.
- Datos reales reutilizados: horario de bus (Alsa), primeros pasos y gestiones con fuentes, foto con crédito, tiempo de MET Norway. Farmacia: solo turno verificado; si no, enlace oficial.
- Contenido de ejemplo en `src/app/demo.ts` (actividades, vecinos, comercios, entidades, recogida de residuos), siempre con etiqueta «Exemple/Ejemplo» en pantalla. No publicar como real.
- Sin backend: sesión, participación y ajustes en `localStorage` (`src/app/client/store.ts`, única pieza a sustituir por la API). Acceso con código de correo simulado.
- Chat: interfaz completa (streaming, fuentes, historial, dictado por voz, adjuntos, parar y regenerar). `ProveidorDemo` responde solo con datos del sitio y dice cuándo no sabe; para conectar un modelo se implementa `Proveidor` en `src/app/client/chat.ts` (llamada a un backend propio, nunca con la clave en el navegador).
- Monetización visible: plan gratuito para comercios, «Botiga viva» 12 €/mes y «Destacat» 29 €/mes (precios orientativos en validación); todo lo pagado lleva etiqueta y no influye en las respuestas del asistente.
- Verificación: `tests/e2e/app.spec.ts` (axe WCAG 2.2 AA en 22 pantallas, sin errores de consola ni desbordamiento horizontal, y recorridos de chat, cuenta, apuntarse y tamaño de texto): 52/52 en móvil 360 y escritorio 1440. Revisión visual con capturas a 360/390/768/1440 px y tema oscuro.
- Pendiente: backend (cuentas, moderación, publicación), conexión del modelo de IA, validar precios y nombres con comercios, lector de pantalla y móvil físico, PWA/manifest.
