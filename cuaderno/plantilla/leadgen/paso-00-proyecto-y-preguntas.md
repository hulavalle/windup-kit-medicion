# Paso 0. Tu proyecto y sus preguntas de negocio

**Qué te llevas.** La ficha de tu proyecto y de 5 a 10 preguntas de negocio, cada una con la decisión que cambia según la respuesta.

## Por qué importa

Medir no es lo mismo que crear datos. Medir es recoger un dato suelto. Crear datos es decidir qué datos necesitas para responder preguntas de negocio. Todo el método parte de ahí: empiezas por una pregunta y la desglosas hasta el evento.

Si empiezas por la web, acabas con eventos que nadie usa. Un diseño puede salir aprobado por todos y que casi nadie lo use, porque nadie sabe qué evento elegir para responder su pregunta.

Una pregunta vale si su respuesta cambia una decisión. Si nadie va a trabajar con el dato, no lo midas todavía.

GA4 ya te da visitas, países y dispositivos sin configurar nada. Este paso busca las preguntas que esos informes no responden.

En una web de captación, el lead llega por varias puertas: el formulario, el teléfono y WhatsApp. Si solo mides el formulario, el canal que trae llamadas parece no traer nada.

## Ejemplo con Clínica Dental Alameda

*Ejemplo 0.1. Ficha del proyecto*

| Campo | Clínica Dental Alameda |
| --- | --- |
| Qué ofrece | Odontología general, implantes, ortodoncia y estética dental |
| Cómo gana dinero | Tratamientos que se presupuestan después de una primera visita |
| Web y plataforma | WordPress con páginas de tratamientos bajo `/tratamientos/`, la página `/pedir-cita/` y un botón flotante de WhatsApp |
| Cómo llegan los leads | Formulario «Pedir cita» de Contact Form 7, enlace de teléfono `tel:` en la cabecera y enlace de WhatsApp `wa.me` |
| Quién puede tocar el código | Nadie. Una agencia mantiene el WordPress y la clínica edita contenidos y botones |
| Canales de captación | Ficha de Google Business Profile, anuncios de Meta, Instagram y email a pacientes |
| Herramientas | GA4, Google Tag Manager con GTM4WP, Meta Pixel, un plugin de cookies y la agenda de la clínica |
| Quién usará el dato | Gerencia, cada lunes, con recepción, para repartir el presupuesto y organizar la agenda |
| Problema de partida | Llegan citas por formulario, teléfono y WhatsApp, y nadie sabe qué canal las trae |

*Ejemplo 0.2. Preguntas de negocio*

| Nº | Pregunta | Qué decisión cambia | Quién decide | Prioridad |
| --- | --- | --- | --- | --- |
| 1 | ¿Qué canal trae pacientes? | Cuánto presupuesto va a Meta Ads, Instagram y email | Gerencia | Alta |
| 2 | ¿Qué canal trae llamadas? | En qué canal se destaca el teléfono | Gerencia | Alta |
| 3 | ¿Qué canal trae conversaciones de WhatsApp? | Si WhatsApp sigue como canal de citas | Recepción | Alta |
| 4 | ¿Cuántas solicitudes acaban en cita confirmada? | Cómo y en cuánto tiempo responde recepción | Recepción | Alta |
| 5 | ¿Qué páginas empujan a pedir cita? | En qué páginas se destaca el botón «Pedir cita» | Marketing | Media |
| 6 | ¿La información del tratamiento acerca a la cita? | Si se amplían las páginas de tratamientos | Marketing | Media |
| 7 | ¿Qué servicios retienen al visitante? | Qué tratamientos se destacan en la portada | Marketing | Media |
| 8 | ¿La ficha de Google trae visitas que piden cita? | Si se invierte en fotos y reseñas de la ficha | Marketing | Media |
| 9 | ¿Qué tratamiento interesa en cada campaña? | Qué tratamiento se anuncia el mes siguiente | Marketing | Baja |
| 10 | ¿Dónde se abandona el formulario de cita? | Si se quitan campos del formulario | Web | Baja |

Una pregunta que no pasa el filtro es «¿cuántas visitas tiene la página de implantes?». GA4 ya la responde y, sola, no cambia ninguna decisión.

## Tu proyecto

1. Rellena la ficha (plantilla 0.1). Si no sabes quién puede tocar el código o qué plugin de formularios usa la web, pregúntalo ahora. Las respuestas condicionan los pasos 1 y 7.
2. Escribe todas las preguntas que se hace tu equipo sobre el negocio. Te ayudan estos comienzos: «¿Qué canal...?», «¿Dónde se pierden...?», «¿Cuántos...?», «¿Funciona...?».
3. Escribe al lado de cada pregunta la decisión que cambiaría con la respuesta. Si no encuentras ninguna, tacha la pregunta.
4. Ordénalas por prioridad y quédate con 5 a 10.

*Plantilla 0.1. Ficha de tu proyecto*

| Campo | Tu proyecto |
| ---- | ------ |
| Nombre del proyecto | |
| Qué ofrece | |
| Cómo gana dinero | |
| URL y plataforma (WordPress u otra) | |
| Cómo llegan los leads (formulario, teléfono, WhatsApp, email) | |
| Plugin de formularios y otros plugins (cookies, Site Kit) | |
| Quién puede tocar el código | |
| Canales de captación actuales | |
| Herramientas que ya tiene (GA4, píxeles, CRM, agenda) | |
| Quién usará el dato y cada cuánto | |
| Problema de partida | |

*Plantilla 0.2. Tus preguntas de negocio*

| Nº | Pregunta | Qué decisión cambia | Quién decide | Prioridad |
| --- | --- | --- | --- | --- |
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |
| 7 | | | | |
| 8 | | | | |
| 9 | | | | |
| 10 | | | | |

## Antes de seguir

- [ ] Cada pregunta tiene al lado una decisión.
- [ ] Al menos una pregunta habla de leads: solicitudes, llamadas o conversaciones.
- [ ] Al menos una pregunta habla de canal, es decir, de dónde viene lo que funciona.
- [ ] Ninguna pregunta se responde ya con un informe estándar de GA4.
- [ ] Sabes quién puede tocar el código de la web y qué plugin de formularios usa.
