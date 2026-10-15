# Tiempo de Súria — MET Norway

Decisión posterior del promotor: sustituir Open-Meteo para retirar el enlaceⓘ junto al dato, conservando atribución en Fonts i crèdits. Icono y temperatura siguen como información sin enlace ni parada de teclado.

## Fuente y licencia

- MET Norway, Norwegian Meteorological Institute. Locationforecast2.0 con cobertura mundial: https://api.met.no/weatherapi/locationforecast/2.0/documentation
- Condiciones: https://api.met.no/doc/TermsOfService y https://www.met.no/en/free-meteorological-data/Licensing-and-crediting
- CC BY4.0: crédito y enlace de licencia en Què estem provant#fonts-credits. No exige enlace junto al dato. Se indica adaptación (grados enteros) y que son estimaciones de modelo, no estación municipal.
- Coordenadas fijas41.835/1.7533 del núcleo de Súria (fuente original Idescat), sin geolocalización del visitante.

## Contrato

`properties.meta.units.air_temperature=celsius`, `updated_at` válido, modelo máximo12h de edad, tolerancia futura5min. Selección de la última timeseries con fecha≤ahora y edad<1h. Se exige temperatura finita entre−80 y60°C y símbolo next_1_hours válido. No se adelanta el siguiente punto futuro. El símbolo describe la previsión de esa hora. Se mantiene la fecha de generación del modelo en ayuda accesible, presentada Europe/Madrid.

Símbolos locales: día/noche, nubosidad, niebla, lluvia, nieve/aguanieve y tormenta. Desconocido usa termómetro, nunca se inventa cielo despejado. Cambio de hora recalculado cada minuto sobre los datos disponibles en memoria.

Petición simple GET HTTPS sin claves ni cabeceras custom: el navegador envía Origin como identificación del sitio de bajo tráfico, conforme a condiciones. Sin credenciales ni referer ni ubicación personal. CORS permitido por proveedor en respuesta real comprobada. Si aumenta mucho el tráfico, migrar a proxy con caché compartida antes de escalar.

Cache HTTP normal del navegador, con revalidación automática. Nuevas consultas como pronto15min y nunca antes de Expires (más pequeño margen aleatorio). Nada de preflight ni HEAD. No se consulta en segundo plano en el intervalo; revisión al recuperar pestaña/pageshow/online respetando espera. Timeout8s y reintento no antes de15min en fallo. Cache opcional sessionStorage con clave propia del proveedor; no reutiliza muestras Open-Meteo. Si faltan datos vigentes muestra —°C, nunca un número inventado.

## Verificación

Respuesta real MET para Súria200 con Expires y CORS; pruebas de cero grados, unidades/formato, selección horaria sin adelantar futuro, modelo antiguo/futuro, cambio de hora, símbolos día/noche y fallos. Navegador comprueba refresco, respeto de Expires y cambio de punto en memoria. Ver estado compartido/local y GitHub Actions para resultados de la entrega. Sin nuevas dependencias ni backend ni cuenta API.
