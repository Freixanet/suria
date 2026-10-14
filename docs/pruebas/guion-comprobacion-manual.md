# Guion de comprobación manual (prototipo v0)

Para comprobar a mano lo que las pruebas automáticas no pueden garantizar. **No sustituye** a los pendientes de lector de pantalla, móvil real ni revisión humana del castellano: esos se marcan como hechos solo cuando los haga una persona.

El guion tiene tres partes:
1. **Preparación**, solo para quien observa.
2. **Tareas para participantes**: lo único que se enseña o se lee a quien prueba. No lleva respuestas.
3. **Respuestas y criterios**, solo para quien observa: qué debe pasar, dónde parar y en qué fijarse.

## 1. Preparación (solo para quien observa)

**Cómo abrirlo:** la vista previa local está en <http://127.0.0.1:4329/> (solo en este ordenador). Si no responde: en el proyecto, `npm run build` y después `npm run preview`.

**Fechas del contenido:**
- La agenda es de la semana del 12 al 18 de octubre de 2026. A partir del 19, la página avisa de que está caducada; eso es lo esperado.
- La farmacia de guardia tiene turnos publicados hasta el 22/10 a las 9.00 h.

**Nada real, en ningún caso:**
- No se hace ninguna llamada. Si alguien pulsa un teléfono y se abre la app de llamadas (en el Mac, FaceTime o Teléfono; en el móvil, el marcador), se cancela antes de llamar. Basta con que diga «aquí llamaría».
- No se envía ningún trámite. Si un enlace abre la sede electrónica del Ayuntamiento u otra web oficial, no se inicia sesión ni se rellena ni se envía nada. Basta con llegar a la página y decir «aquí lo haría».
- No se escriben datos personales en ninguna web.
- Díselo a quien pruebe antes de empezar (la frase está al principio de la parte 2).

**Cómo observar:**
- Lee cada tarea tal cual, sin pistas. Si alguien se bloquea más de dos minutos, apunta «no» y pasa a la siguiente.
- No enseñes la parte 3 a quien prueba.

**Cómo anotar:** para cada tarea, apunta si se ha podido hacer (sí / con dudas / no), cuánto ha costado y qué ha confundido. No anotes datos personales de nadie.

## 2. Tareas para participantes

> Esto es un prototipo y todo pasa en este ordenador. **No hace falta llamar a nadie ni hacer ningún trámite de verdad:** cuando llegues al sitio donde lo harías, dímelo y paramos ahí. No se evalúa a ti, sino a la web.

1. Busca qué actividad hay el jueves por la tarde y quién puede ir.
2. ¿Qué farmacia está de guardia hoy? Enséñame dónde encontrarías su teléfono para llamarla (sin llamar).
3. Acabas de llegar a Súria: ¿cómo te empadronarías? Llega hasta donde lo harías, sin enviar nada.
4. Cambia la web a castellano y vuelve al catalán.
5. ¿Qué cosas de esta web funcionan ya y cuáles son solo ideas?
6. Mira qué hay más adelante, después de esta semana.

## 3. Respuestas y criterios (solo para quien observa)

| # | Respuesta esperada | Se da por hecha cuando… | Fíjate en |
|---|---|---|---|
| 1 | El «Taller d'estimulació cognitiva» (Dj 15, 15.30–16.45 h, EMFA aula 9). Lee «Més de 60 anys… inscripció a l'OAC» sin abrir otra página. | Dice la actividad y quién puede ir. | ¿Ha tenido que bajar mucho? ¿Ha entendido «Fitxa a suria.cat»? |
| 2 | El turno vigente, con la dirección y el teléfono. A partir del 22/10 a las 9.00 h debe ver el aviso «No tenim el torn… actualitzat» y el enlace a la fuente oficial. | Señala el teléfono del turno vigente (o, sin turno, el aviso y el enlace oficial). **No se llama:** si se abre la app de llamadas, se cancela. | ¿Entiende el cambio de turno a las 9.00 h? ¿Confunde un turno pasado con el vigente? |
| 3 | Llega a «Empadronar-te». Ve que puede hacerlo en línea («Tràmit d'alta en línia», que abre la sede electrónica) o en la OAC, con su horario. | Elige una de las dos vías y sabe qué necesita. **No se envía nada:** si abre la sede electrónica, para ahí sin iniciar sesión. | ¿Distingue el trámite en línea de la llamada? ¿Echa en falta algo para hacerlo? |
| 4 | Con CA/ES se queda en la misma sección y en el otro idioma. Si cierra y vuelve a entrar, recuerda el idioma elegido. | Ha cambiado de idioma y ha vuelto sin perder la sección. | ¿Encuentra el selector? ¿Se pierde al cambiar? |
| 5 | Distingue «En prova» (funciona y se está probando) de «Idees · encara no existeixen» (en «Cap on anem»). Entiende que todavía no hay comercios participantes. | Nombra al menos una cosa que funciona y una que es solo idea, sin confundirlas. | ¿Cree que alguna idea ya existe? ¿Entiende «En prova»? ¿Ve de dónde sale cada dato («Font», fecha de consulta)? |
| 6 | Encuentra «Pròximament» (Setmana de la Gent Gran), el plazo de inscripción del 23/10 y «Programa i detalls». | Dice qué hay y hasta cuándo se puede inscribir. No hace falta inscribirse. | ¿Lo confunde con esta semana? |

## Qué puedes probar tú ahora (en este ordenador)

- **Tareas 1 a 6 en el navegador**, en escritorio y en una ventana estrecha (unos 400 px), o con la vista de dispositivo móvil del navegador. Ojo: la vista de dispositivo **no** cuenta como prueba en móvil real.
- **Teclado:**
  - con solo Tab, Mayúsculas+Tab y Retorn, haz las tareas 3 y 4;
  - el primer Tab debe mostrar «Ves al contingut»;
  - el foco debe verse siempre.
- **Zoom:**
  - Cmd + hasta el 200 %: no debe aparecer barra horizontal ni texto cortado;
  - en los ajustes del navegador, la letra al máximo: el mismo resultado.
- **Primera aproximación con VoiceOver** (Cmd+F5 en el Mac): recorre los títulos con el rotor (Ctrl+Opción+U) y comprueba que se anuncian el idioma, «En prova» y la fecha de cada actividad.
  - Sirve para detectar problemas evidentes, pero **no cierra** el pendiente de lector de pantalla: falta una persona que lo use habitualmente, y VoiceOver en iOS y TalkBack en Android.
- **Releer el castellano** buscando errores evidentes. La revisión de naturalidad y coherencia la debe hacer otra persona, de habla castellana y que no haya escrito los textos.

## Qué necesita otra persona o dispositivo

| Pendiente | Qué hace falta | Por qué no basta con lo automático |
|---|---|---|
| **Móvil real** | Un iPhone y un Android, idealmente de una persona mayor, con su tamaño de letra del sistema, a la luz del día y con conexión normal. | Hoy el sitio solo se sirve en este ordenador (127.0.0.1). Para abrirlo en un móvil hay que exponerlo en la red local o desplegarlo con acceso privado; se decidirá con el acceso privado (D3, T5). |
| **Lector de pantalla** | Una persona que use VoiceOver (iOS/macOS) o TalkBack a diario; las tareas 1, 2, 3 y 5. | axe y Lighthouse comprueban la estructura, no si la experiencia se entiende escuchándola. |
| **Revisión del castellano** | Una persona de habla castellana que no haya escrito los textos; también revisa topónimos y nombres propios que se mantienen en catalán. | La traducción se hizo con ayuda de IA (regla de idioma de la especificación UX §5). |
| **Pruebas con vecinos** | Después de los tres puntos anteriores, y cuando estén concretados el acceso privado (D3, T5) y el canal de comentarios (DT4). | Sin acceso privado ni canal no se puede invitar a nadie ni recoger sus opiniones. |

## Al terminar

Anota los resultados en un archivo nuevo de `docs/pruebas/`, sin nombres ni datos personales: usa códigos como P1 o P2 y la fecha. Los problemas que salgan se corrigen antes de invitar a vecinos.
