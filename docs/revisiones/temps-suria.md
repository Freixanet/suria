# Temps actual a Súria · 15/10/2026

Funció demanada pel promotor: icona i temperatura a la dreta de la barra, actualitzades segons el temps. Consulta en navegador amb fetch natiu; sense dependències noves, geolocalització del visitant, clau ni backend. Credencials omeses i sense referent. Memòria de sessió només per evitar consultes repetides; cap identificador personal.

## Procedència i contracte

- Font: [Open-Meteo Forecast API](https://open-meteo.com/en/docs). Condicions actuals estimades a partir de models cada quinze minuts, no una estació municipal ni una observació en directe. Temperatura a2m, weather_code WMO i is_day.
- Coordenades fixes41.835,1.7533: conversió aproximada de la posició de Súria publicada per [Idescat](https://www.idescat.cat/pub/?by=mun&id=inddt&n=4699), lat41°50′5.42″N/lon1°45′11.79″E. El proveïdor selecciona la cel·la de model adequada; les coordenades de resposta poden diferir.
- API: https://api.open-meteo.com/v1/forecast?latitude=41.835&longitude=1.7533&current=temperature_2m,weather_code,is_day&timeformat=unixtime&timezone=Europe%2FMadrid
- Consulta real comprovada en implementació: resposta200, Celsius, interval900s, dades numèriques i timestamps UNIX. No s'exporta una temperatura fixa al build.
- API pública per al prototip no comercial. Si es publica amb ús comercial, revisar el pla/condicions del proveïdor; aquesta passada no publica.
- Widget informatiu sense enllaç i sense atribució al peu, retirats per petició expressa posterior del promotor. Títol/nom accessible conserva font, condició, temperatura, hora local i estimació. Font documentada aquí; ubicació comuna de fonts a decidir abans de publicar.

## Comportament

Consulta inicial i refresc cada quinze minuts mentre la pàgina és visible; també en tornar a la pestanya o recuperar connexió. Hora de consulta i dades en cache de sessió; persistència opcional, no necessària per funcionar. Timeout8s. Dades de més de45min o més de5min futures no es mostren com a actuals; igualment, valors absents, no numèrics o unitats incorrectes. Error: «— °C» amb nom accessible «Temps a Súria no disponible». Mai temperatura d'exemple ni mostra caducada silenciosa. Sense JS queda el mateix estat explícit i l'enllaç al proveïdor.

Icones SVG locals per sol, nit, clarianes, núvols, boira, pluja, neu i tempesta; codi desconegut usa termòmetre i nom genèric. La temperatura zero és vàlida. Sense animacions ni canvis d'alçada del widget. Textos CA/ES.

Responsable de la integració: promotor del prototip. Font de dades: Open-Meteo. Canvis sense alterar els altres serveis.

Publicació autoritzada el14/10/2026: font i llicència centralitzades a Què estem provant#fonts-credits, més enllaçⓘ separat al costat del widget (exigit pel proveïdor, https://open-meteo.com/en/licence). Icona i temperatura continuen sense enllaç, sense atribució del proveïdor al peu. Ús del prototip no comercial, sense geolocalització.
