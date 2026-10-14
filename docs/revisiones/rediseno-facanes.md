# Rediseño «Façanes»: registro de verificación (14/10/2026)

El promotor autorizó sustituir Silvinita B por una dirección nueva, conservando los objetivos, los principios y los requisitos funcionales. Este documento recoge qué se hizo, qué se comprobó y qué sigue pendiente.

## Versiones recuperables
- **Silvinita B:** etiqueta git `silvinita-b-2026-10-14` (commit `968950a`) y la copia construida en `archiu/silvinita-b-2026-10-14/dist/` (fuera del control de versiones).
- **v3 en Astro:** `archiu/v3-astro-2026-10-13/`.

## Qué cambió
- **Sistema visual completo:**
  - colores de «Façanes»: calç, tinta y cuatro fachadas;
  - letras: Bricolage Grotesque y Atkinson Hyperlegible Next, con licencia OFL y alojadas en el propio sitio;
  - cabecera con la franja de servicio y «Súria» a todo el ancho;
  - navegación con la muestra del color de cada fachada;
  - apertura de cada página en el color de su fachada;
  - pie en tinta.
  - Se retiran Gloock, Schibsted Grotesk, Atkinson Hyperlegible v1 y la banda de estratos.
- **Portada:**
  - la frase «Avui a Súria» (`src/lib/ara.ts`, `src/scripts/ara.ts`), compuesta con la agenda y los turnos de farmacia que ya estaban verificados, con la hora de Súria;
  - el cielo cambia según el momento del día;
  - nueva composición: agenda con «Pròximament» debajo, primeros pasos al lado, comercios a todo el ancho y «Cap on anem» en la franja verde.
- **Componentes reestilizados sin cambiar su lógica:**
  - agenda (fecha en una «ventana» ocre);
  - turno de farmacia (ficha de cielo);
  - «Pròximament» (cartel ocre);
  - comercios (rótulo y estado con palabras y forma);
  - etiqueta de madurez (marco fino, discontinuo para ideas y demos);
  - línea de procedencia, estados vacíos y avisos (teja clara).
- **Sin funciones nuevas ni datos inventados.** La frase de la portada solo reordena datos que ya estaban en la página. Si falta un dato, lo dice.

## Comprobaciones (14/10/2026)

| Comprobación | Resultado |
|---|---|
| Unitarias | `node --test` en verde, incluida `tests/unit/ara.test.ts` (7 casos). Pasan también con TZ Pacific/Auckland y America/New_York. |
| E2E (Playwright + axe) | 99 de 99, a 360 y a 1440 px, más E1 con datos de prueba: recorridos, ambos idiomas, teclado (foco visible con contraste ≥ 3:1), texto al 200 % sin scroll horizontal, objetivos táctiles ≥ 44 px y ningún texto por debajo de 14 px. |
| Lighthouse (5 páginas) | Rendimiento: 98–99 en móvil y 99–100 en escritorio. Accesibilidad y buenas prácticas: 100. SEO: 54–58, por el `noindex` puesto a propósito. LCP en móvil simulado: 2,3–2,4 s; CLS ≤ 0,064. |
| Revisión visual | Portada en catalán y en castellano, a 1440 y a 360 px, por la mañana, la tarde y la noche. Agenda caducada y sin turno de farmacia (23/10). Páginas de agenda y de primeros pasos. Comercios de prueba (E1). Página de error. |

### Contratos de prueba que cambian
- **«Las tareas primero».** Antes: el título de la agenda dentro del 60 % de la primera pantalla. Ahora, en la primera pantalla tienen que estar:
  - las cuatro tareas;
  - la frase «Avui a Súria», con enlaces a la agenda y a la farmacia, dentro del 60 % superior;
  - el título de la agenda: dentro de la primera pantalla en escritorio, y antes de 1,3 pantallas en móvil.

  En móvil, la foto del pueblo va entre el resumen y la agenda. Si en las pruebas con vecinos se nota que retrasa la agenda, se puede mover.
- **Letra de las horas:** antes Schibsted Grotesk, ahora Bricolage Grotesque.

## Limitaciones y pendientes
- **Lectura real:** hay que comprobar Bricolage, Atkinson Next y los 19 px con personas mayores. Es una decisión provisional.
- **Fotos:** solo hay una foto con permiso, y no muestra actividad ni comercios.
  - Los comercios no tienen fotografía, a diferencia de la referencia Union Boulangerie. Se ha resuelto con el nombre como rótulo.
  - La foto de 1924 (dominio público) sigue como candidata y no se ha descargado.
- **Peso de la letra:** Bricolage variable pesa 131 KB y es lo que más alarga el LCP en móvil. Si hace falta, se puede recortar el rango de ejes.
- **Pendientes anteriores, que este rediseño no cierra:**
  - lector de pantalla con una persona usuaria habitual;
  - móvil real;
  - revisión humana del castellano;
  - acceso privado (D3/T5) y canal de comentarios (DT4) antes de las pruebas con vecinos.
- **Referencias para más adelante:** Domino Park («Cómo llegar y normas», historia y uso actual) y Life Stories (memoria de los vecinos). Sin contenido verificado no se construyen.

## Segunda pasada de la portada (14/10/2026)

**Versión anterior recuperable:** etiqueta `facanes-v1` (commit `755b271`).

**Cambios:**
- **Escena:** la foto del pueblo a todo el ancho, con «Súria» sobre el cielo. El crédito va sobre la foto en escritorio y debajo en móvil. La frase de identidad y su fuente pasan a «Cap on anem».
- **«Avui a Súria»:**
  - El párrafo se sustituye por un saludo breve y dos datos: agenda y farmacia.
  - Si las actividades del día ya han pasado, manda la próxima confirmada, con su fecha.
  - Con la semana caducada, manda la actividad verificada en curso o la próxima, y la ausencia queda como nota, con el enlace a la agenda municipal.
  - Una sola línea de fuente.
  - La altura queda reservada (CLS de 0,04 o menos).
- **Repeticiones eliminadas:**
  - El aviso de independencia queda solo en la franja superior y el pie.
  - La nota de cálculo desaparece.
  - Las líneas de fuente se acortan: «Font: agenda de suria.cat · consultada el 12/10/2026».
  - En la portada, la farmacia ya no se repite en «Primers passos», que enlaza a todos los turnos.
- **Ritmo:**
  - Agenda con el cartel de «Pròximament» debajo.
  - Al lado, primeros pasos y una nota compacta de comercios mientras no haya ninguno.
  - «Què estem provant» se integra en la franja verde.

**Comprobaciones:**
- Unitarias en verde, incluidos 10 casos del resumen, también con las zonas horarias de Auckland y Nueva York.
- 103 E2E de 103, con tres nuevos de la portada: torno vigente, actividades del día terminadas y semana caducada en castellano.
- Lighthouse: rendimiento 97–100 y accesibilidad 100.
- Capturas a 1440 y 360/390 px, en catalán y castellano, por la mañana, por la noche y con los datos caducados.

**Contrato de la primera pantalla:** el título del resumen, dentro de los 2/3 superiores; el primer dato, dentro de los 3/4; la agenda, dentro de la primera pantalla en escritorio y antes de 1,3 pantallas en móvil.

**Pendiente:**
- En móvil, la foto y los créditos ocupan unos 250 px antes de las tareas.
- Si en las pruebas con vecinos se ve que retrasan el resumen, la foto puede bajar a 5:2.
