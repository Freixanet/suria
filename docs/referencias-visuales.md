# Referencias visuales y material de Súria

Documento de trabajo para **perfeccionar Silvinita**, no para reabrir la dirección (elegida el 12/10/2026; ver `PRODUCT.md`). Cada referencia dice qué tomamos, cómo encaja y qué dejamos fuera. Consultado el 13/10/2026 salvo que se indique otra fecha.

Herramientas: Taste y Lazyweb no están disponibles en esta instalación; este documento local las sustituye. No se ha contratado ningún servicio.

## 1. Referencias

### Servicios cívicos accesibles

**GOV.UK Design System, «Phase banner»** — <https://design-system.service.gov.uk/components/phase-banner/>
- Qué es: una franja en la cabecera, en todas las páginas, que dice en qué fase está el servicio (alfa, beta) con una etiqueta y una frase.
- Qué tomamos: nuestro aviso «Prototip independent, en proves amb veïns» funciona igual. Va en la cabecera, se repite en todas las páginas y es una sola línea en escritorio.
- Cómo encaja: es la base de la honestidad de Silvinita. La etiqueta de madurez es texto y no depende del color.
- Qué dejamos: la tipografía, el color y la retícula de GOV.UK, que son identidad del Gobierno británico.

**Criterios de notación horaria del IEC** — <https://criteria.iec.cat/wp-content/uploads/2015/10/5-1-2_Les-notacions-hor%C3%A0ries_01.pdf>
- Qué dice: en catalán, punto entre horas y minutos y símbolo «h» separado: «16.15 h».
- Qué tomamos:
  - catalán: «16.15 h»;
  - castellano: «16:15 h» (la RAE admite los dos puntos o el punto);
  - siempre 24 h.
- Contraste: el *Llibre d'estil* de la UB recomienda «16:15» sin «h» (<https://www.ub.edu/llibre-estil/criteri.php?id=3084>). Seguimos al IEC, que es la norma de referencia del catalán.

### Diseño editorial

**Tufte CSS (notas al margen y aparato de fuentes)** — <https://edwardtufte.github.io/tufte-css/>
- Qué tomamos: la fuente acompaña al dato sin interrumpir la lectura.
  - En escritorio, las páginas de tarea muestran a un lado «Fonts oficials» y «Altres tasques».
  - Debajo de cada pieza hay una línea secundaria discreta con madurez, fuente, fecha de consulta y responsable.
- Qué dejamos: la serif de libro y el fondo crema. No son del mundo de Súria, y el fondo crema es el tópico que Impeccable pide evitar.

### Identidad local contemporánea

**Mapa geològic comarcal 1:50.000 (ICGC)** — <https://icgc.cat/Administracio-i-empresa/Serveis/Geologia/WMS-Cartografia-geologica>
- Qué tomamos: la gramática de la leyenda geológica. Cada color de estrato tiene un nombre y un código; nunca hay un color sin texto.
  - Es el origen de la «mostra» de cuatro estratos que abre cada sección.
  - También es el origen de la regla de que cada estado se dice con palabras.
- Cómo encaja: la silvinita es literalmente uno de esos estratos (sales potásicas de la cuenca del Bages, donde Súria descubrió la potasa en 1912; Gran Enciclopèdia Catalana).
- Qué dejamos: la paleta cartográfica completa. Solo usamos los rojos y margas de la sal potásica.

**Geoparc Mundial UNESCO de la Catalunya Central** — <https://geoparc.cat/>
- Qué tomamos: la legitimidad de construir la identidad de un territorio desde su geología, y de explicarla a quien vive en él.
  - Súria tiene paneles del Geoparc: categoría «Ròtuls turístics del Geoparc Mundial Catalunya Central a Súria» en Wikimedia Commons.
  - Hay una ruta Súria–Coaner (NacióDigital).
- Qué dejamos:
  - el tono turístico y las fotografías de paisaje como héroe;
  - su logotipo, que es identidad de otro organismo.

### Referencias aportadas por el promotor (iteración 4)

Las tres se han examinado en escritorio y en móvil (navegador integrado, 13/10/2026). Se toma su calidad de diseño, no su contenido ni su tono.

**america.gov**
- Lo que hay:
  - titular serif grande (Rhymes Text) y texto en grotesca (Helvetica Now);
  - bloques de una sola idea (titular, dos líneas y un enlace);
  - fondo gris cálido;
  - fotografía de vida cotidiana.
- Qué tomamos para la variante B:
  - el contraste entre una serif expresiva solo en titulares y una grotesca para todo lo operativo;
  - la foto cotidiana como contenido.
- Qué descartamos:
  - el texto que aparece desenfocado al desplazarse (retrasa la lectura);
  - el buscador conversacional (fuera del alcance del v0);
  - los contenedores redondeados y las pastillas (no son del mundo Silvinita);
  - el texto centrado.

**realfood.gov**
- Lo que hay:
  - campos de color completos por sección (verde profundo, casi negro);
  - grotesca muy pesada y apretada en titulares (Die Grotesk);
  - una barra roja sobre cada cifra;
  - un documento de archivo presentado como figura con pie.
- Qué tomamos:
  - una franja de carbón a todo ancho que concentra la identidad;
  - la barra roja como acento de dato, que ya teníamos en los filetes;
  - la idea del documento de archivo con pie, como posibilidad para las fotos de 1924 (abajo).
- Qué descartamos:
  - el desplazamiento secuestrado y las animaciones al hacer scroll;
  - los titulares centrados enormes;
  - el tono persuasivo;
  - los objetos recortados de producto.

**trumpaccounts.gov**
- Lo que hay:
  - serif condensada editorial (Instrument Serif) con texto en Geist;
  - fondo de piedra cálida (alrededor de `#F0EBE5`);
  - secciones con cambios sutiles de superficie;
  - tres columnas separadas por filetes verticales finos, el mismo gesto que Silvinita.
- Qué tomamos:
  - la temperatura del fondo (sal → piedra);
  - una sola diferencia de superficie para la pieza principal;
  - la confirmación de que los filetes verticales funcionan.
- Qué descartamos:
  - el fundido con desenfoque al cargar (en la primera visita el contenido aparece en blanco);
  - el texto centrado del héroe;
  - las imágenes de producto y monedas;
  - Instrument Serif en concreto (ver abajo).

**Prueba de serif** (`.impeccable/mocks/iteracio-4/especimen.html`): Instrument Serif, Source Serif 4 Display, Young Serif, Gloock y Bodoni Moda, con los títulos reales.
- **Gloock** es la que mejor aguanta junto a la marca «Súria» en grotesca negra: contraste alto, robusta, ligeramente estrecha. Recuerda a la imprenta de los años veinte, cuando empezó la mina.
- **Instrument Serif** queda demasiado fina frente a la cabecera y es la copia literal de una referencia.
- **Bodoni Moda** se rompe en pantalla a tamaños medios.
- **Source Serif 4** es correcta pero libresca.
- **Young Serif** resulta demasiado caprichosa.
- La serif no sirve para horarios ni texto pequeño, así que solo se prueba en titulares.

## 2. Material auténtico de Súria (registro de fotos)

Regla (`PRODUCT.md`): solo fotos reales de Súria con permiso comprobado una a una. Licencias verificadas en Wikimedia Commons el 13/10/2026 (API de metadatos).

| Uso | Archivo | Autor | Fecha | Licencia | Original | Estado |
|---|---|---|---|---|---|---|
| Portada («Cap on anem») y página «Cap on anem» | `src/assets/fotos/suria-vista-golik-2022.jpg` (reducida a 2400 px y recortada en pantalla) | Krzysztof Golik | 06/04/2022 | CC BY-SA 4.0 | <https://commons.wikimedia.org/wiki/File:View_of_Suria_(1).jpg> | **En uso**, con crédito visible. El recorte es una adaptación: se comparte con la misma licencia. |
| Candidata (archivo histórico) | «Vista de Súria» (estereoscopia) | Josep Salvany i Blanch, fondo de la Biblioteca de Catalunya | 1924 | Dominio público | <https://commons.wikimedia.org/wiki/File:Vista_de_S%C3%BAria.jpeg> | Pendiente: posible figura de archivo «1924 / 2022» en «Cap on anem». |
| Descartada | «Runam salí de Súria des de la carretera de les Vilaredes» | Pitxiquin | 24/07/2017 | CC BY-SA 4.0 | Commons | El salero se ve pequeño y lejano: no aporta. |
| Descartada | «Súria des dels horts de Salipota» | Pitxiquin | 17/02/2022 | CC BY-SA 4.0 | Commons | Escombros en primer plano: no representa bien la vida del pueblo. |
| Otras candidatas sin revisar a fondo | Recinte del Poble Vell, Castell de Súria, Plaça Major | Varios (Isidre Blanc, Alberto-g-rovi, K. Golik…) | 2008–2022 | CC BY-SA 2.0/3.0/4.0 | Categorías de Commons «Recinte del Poble Vell (Súria)», «Castell de Súria» | Pendientes de revisar una a una. |

Pendientes:
- Faltan fotos propias o cedidas de vida cotidiana actual: mercado, calles con gente sin rostros identificables, Caramelles.
- La foto en uso muestra el pueblo, pero no muestra actividad.
- El texto alternativo describe solo lo que se ve; no se afirma qué edificio es el campanario sin comprobarlo.
