# Súria · Ep, Súria!

Prototipo independiente para los habitantes de Súria. Astro estático, catalán y castellano. No es una web del Ayuntamiento. Contenido con fecha de vigencia y enlaces oficiales; ningún horario se presenta como seguimiento en directo.

- Web: https://freixanet.github.io/suria/
- Repositorio: https://github.com/Freixanet/suria
- Instrucciones compartidas de trabajo: `AGENTS.md` y `docs/ESTADO.md`; el estado local más reciente, si existe, está en `work/CONTINUITY-suria.md` (no público).
- Producto y diseño: `PRODUCT.md`, `DESIGN.md`.

## Desarrollo

Node.js22.12 o superior y npm. `npm ci`, `npm run dev`. La vista local habitual usa raíz `/`; `npm run build` compila en `dist`.

`npm run test:unit`, `npm run build:proves` y `npm run test:e2e -- --workers=1`. Las pruebas de navegador usan Google Chrome instalado; no requieren descargar otro navegador.

## GitHub Pages

El flujo `.github/workflows/pages.yml` ejecuta unitarias, compila y despliega cada push a `main`; también admite ejecución manual. Pages debe tener origen GitHub Actions. Node22 y lockfile versionado. `SURIA_SITE` y `SURIA_BASE` vienen de `configure-pages`; no cambian el desarrollo local.

Comprobación local del prefijo: `SURIA_SITE=https://freixanet.github.io SURIA_BASE=/suria npm run build -- --outDir dist-pages`. No subir `node_modules`, builds, credenciales ni datos privados.

Las fechas de commits locales existentes se conservan al subir el historial. El trabajo que no tenía commit se incorpora con fecha de incorporación real: no se inventan fechas ni se reescribe el historial para simular commits anteriores. El desarrollo pendiente de esta entrega se hizo el14/10/2026 (zona America/New_York).

## Créditos

La sección «Fonts i crèdits» de «Què estem provant» reúne autoría/licencia de la fotografía, MET Norway y fuentes de agenda/servicios. Se conserva el aviso de independencia y `noindex`. GitHub Pages es público; `noindex` no restringe el acceso.
