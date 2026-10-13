# Descobreix Súria (Súria Web Exp.)

Instrucciones compartidas para todos los agentes (Claude Code, Codex, etc.).

## Estado actual

Prototipo v0 en construcción local (pedido por el usuario el 12/10/2026): web estática con Astro, en catalán y castellano, dirección visual «Silvinita» (variante B, elegida el 13/10/2026; la v3 anterior está archivada en `archiu/`). Nada se publica ni se despliega sin confirmación.

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
