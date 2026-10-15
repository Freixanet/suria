# Bus Súria ⇄ Manresa: procedencia y dudas (14/10/2026)

Datos de `src/content/bus/alsa-suria-manresa.yaml`, que alimentan la tarjeta «Bus interurbà» de «Avui a Súria».

## De dónde salen

- **Horario:** datos que Alsa (operador) publica hoy en sus páginas de ruta [Cardona – Manresa](https://www.alsa.es/ca/ruta/cardona-manresa) y [Manresa – Súria](https://www.alsa.es/ca/ruta/manresa-suria). Hacia Manresa: horas de paso por Súria de las expediciones Cardona → Manresa. Desde Manresa: hora de salida de Manresa (llegada a Súria entre 31 y 43 min después).
- **Parada:** la única de Súria en los datos de Alsa: «Estació d'autobusos, C-1410 km 14».
- **El Ayuntamiento** remite a Alsa para el bus interurbano: [suria.cat, transport interurbà](https://www.suria.cat/el-municipi/serveis/transport-public/825-transport-interurba/).
- **Festivos:** calendario laboral de Catalunya 2026 y 2027 ([Treball](https://treball.gencat.cat/ca/ambits/relacions_laborals/ci/calendari_laboral/calendari-festes-2027/)) y fiestas locales de Súria 2026 (Ordre EMT/208/2025: 20 de enero y 13 de julio, ya pasadas).

## Qué no está confirmado (y cómo lo trata la tarjeta)

1. **No hay horario oficial de 2026 en PDF ni de la Generalitat.** El único cuadro oficial encontrado es de marzo de 2024 ([PDF de Alsa en la web de Sant Joan de Vilatorrada](https://www.santjoanvilatorrada.cat/ca/el-municipi-nou/autobusos-interurbans/autobus-alsa.pdf)) y no cuadra del todo con los datos actuales de Alsa: por ejemplo, la salida de Súria de las 15.10 h aparece allí como «sábados, domingos y festivos», y en Alsa solo los domingos. La tarjeta dice «Horari programat de l'operador, no en temps real».
2. **Alsa no dice qué horario aplica en festivo.** Las notas del PDF de 2024 sugieren el de domingo, pero no está confirmado. **En festivo la tarjeta no muestra ninguna hora:** dice que es festivo y remite a los horarios de Alsa. Si el día siguiente es festivo, no anuncia «primer bus».
3. **Refuerzo temporal:** la salida de Manresa de las 20.00 h solo vale del 01/10/2026 al 21/12/2026 (campos `des` y `fins`).
4. **Accesibilidad:** no consta para esta línea (solo una FAQ genérica de Alsa sobre plazas PMR con reserva de 36 h). No se muestra el icono de silla de ruedas.
5. **Código de línea (L1446):** solo aparece en el PDF de 2024; no se muestra.
6. **Fiestas locales de Súria 2027:** aún no publicadas (suelen salir en diciembre). Hay que añadirlas a `festius` cuando salgan.

## Para revisar

- Confirmar con Alsa el horario de festivos y la vigencia actual.
- Revisar el YAML antes del 21/12/2026 (fin del refuerzo) y al publicarse el calendario local de 2027.
- No transcrito: el bus urbano gratuito «La Guagua» ([suria.cat/guagua](https://www.suria.cat/guagua)), con horarios solo en imagen.
