# Paso 4. Event storming de tu recorrido

**Qué te llevas.** Una línea de tiempo con todo lo que pasa desde que alguien conoce tu proyecto hasta que vuelve, con el sistema donde ocurre, sus datos y las dudas abiertas. Es la lista larga de candidatos para la matriz.

## Por qué importa

Si te cuesta encontrar actividades, te falta conocer el recorrido. El event storming lo resuelve con una línea de tiempo y post-its de colores. En una empresa se hace en sesiones de dos horas con varios equipos. Tu equipo puede hacerlo en una hora.

Sigue cuatro reglas:

- Empieza por la izquierda, por las fuentes de tráfico. Ahí aporta marketing.
- Haz una sola pregunta: «¿qué pasa después?».
- Mapea todo, también lo que ocurre fuera de la web.
- Comprueba que el final es de verdad el final: la primera visita, la revisión o la baja.

Cada color tiene un significado:

- Naranja: el evento, lo que hace el cliente o el sistema.
- Rosa: el sistema donde ocurre, como la web, el teléfono, WhatsApp, la agenda o el email.
- Verde: los datos que acompañan al evento.
- Morado: las dudas.

El mapa tiene más eventos de los que vas a implementar. Sirve como documentación y se revisa una o dos veces al año.

En captación de leads, invita a la sesión a quien atiende el teléfono y WhatsApp. Sabe lo que pasa después del clic, y la web no lo ve.

## Ejemplo con Clínica Dental Alameda

*Ejemplo 4.1. Recorrido de un paciente nuevo*

| Nº | Qué pasa (naranja) | Sistema (rosa) | Datos (verde) | Dudas (morado) | ¿A la matriz? |
| --- | --- | --- | --- | --- | --- |
| 1 | Ve la ficha de Google, un anuncio de Meta o un post de Instagram | Google Business Profile, Meta, Instagram | `utm_source`, `utm_medium`, `utm_campaign` | ¿Etiquetamos el enlace de la ficha de Google? | UTMs (paso 10) |
| 2 | Llega a la portada o a la página de un tratamiento | Web | Página de entrada, UTMs | | No, GA4 ya envía `page_view` |
| 3 | Se queda 5 segundos en la página de un tratamiento | Web | `page_path` | ¿5 segundos indican interés o solo una carga lenta? | Fila 3 |
| 4 | Lee la página de implantes hasta el 75 % | Web | `percent_scrolled`, `page_path` | ¿Leer acerca a la cita? | Fila 2 |
| 5 | Pulsa «Pedir cita» | Web | `element_text`, `link_url` | ¿Funciona mejor el botón del menú o el de la página? | Fila 1 |
| 6 | Rellena el formulario de cita | Web, Contact Form 7 | Campos del formulario | ¿En qué campo abandona? | No en la versión 1 (paso 3) |
| 7 | Envía el formulario y el correo sale bien | Web, Contact Form 7 | `formid`, `formname` | ¿Cuenta un envío con error? | Fila 4 |
| 8 | Pulsa el teléfono | Web y teléfono | `page_path` | Desde un ordenador, ¿es una llamada? | Fila 5 |
| 9 | Llama y recepción atiende | Centralita | Hora y duración | ¿Quién apunta las llamadas perdidas? | Contrapeso de KR2 |
| 10 | Pulsa WhatsApp | Web y WhatsApp | `page_path` | | Fila 6 |
| 11 | Escribe por WhatsApp y recepción responde | WhatsApp Business | | ¿Responde el paciente después? | Contrapeso de KR3 |
| 12 | Recepción confirma la cita | Agenda de la clínica | Fecha de la cita | ¿Cuánto tarda recepción en llamar? | Contrapeso de KR1 |
| 13 | Recibe el recordatorio de la cita | SMS o email | | | No |
| 14 | Viene a la primera visita | Agenda y programa de gestión | | | No, fuera de la web |
| 15 | Acepta el presupuesto | Programa de gestión | Importe | ¿Se puede contar por canal? | No, fuera de la web |
| 16 | Deja una reseña en Google | Google Business Profile | | | No |
| 17 | Vuelve a la revisión anual | Agenda y email | | Sin login, ¿lo reconocemos? | Fase de cliente (paso 3) |

*Ejemplo 4.2. Recorrido de revisión desde el email*

| Nº | Qué pasa (naranja) | Sistema (rosa) | Datos (verde) | Dudas (morado) | ¿A la matriz? |
| --- | --- | --- | --- | --- | --- |
| 1 | Recibe el email de revisión anual | Email | UTMs | ¿Lo reciben solo quienes aceptaron comunicaciones? | UTMs (paso 10) |
| 2 | Pulsa el enlace y llega a `/pedir-cita/` | Web | UTMs | | No, GA4 ya envía `page_view` |
| 3 | Envía el formulario de cita | Web, Contact Form 7 | `formid`, `formname` | ¿Distinguimos la revisión de la primera visita? | Fila 4, separada por la campaña del email |
| 4 | Recepción confirma la cita | Agenda de la clínica | | | Contrapeso de KR1 |

## Tu proyecto

1. Reserva una hora con tu equipo y con quien atiende el teléfono. Abre una pizarra compartida, como Miro o FigJam, o pega post-its en una pared.
2. Pon a la izquierda las fuentes de tráfico de tu ficha del paso 0.
3. Pregunta «¿qué pasa después?» y pega un post-it naranja por respuesta. No discutáis todavía si se mide o no.
4. Añade a cada post-it naranja su rosa, su verde y su morado.
5. Si tienes un segundo recorrido, como revisiones, presupuestos para empresas o urgencias, hazlo en otra fila.
6. Pasa la pizarra a la plantilla 4.1. Deja vacía la última columna: la rellenas en el paso 5.
7. Asigna cada duda a una persona del equipo, con fecha (plantilla 4.3).

*Plantilla 4.1. Tu recorrido principal*

| Nº | Qué pasa (naranja) | Sistema (rosa) | Datos (verde) | Dudas (morado) | ¿A la matriz? |
| --- | --- | --- | --- | --- | --- |
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |
| 6 | | | | | |
| 7 | | | | | |
| 8 | | | | | |
| 9 | | | | | |
| 10 | | | | | |
| 11 | | | | | |
| 12 | | | | | |
| 13 | | | | | |
| 14 | | | | | |
| 15 | | | | | |
| 16 | | | | | |
| 17 | | | | | |
| 18 | | | | | |
| 19 | | | | | |
| 20 | | | | | |

*Plantilla 4.2. Tu segundo recorrido*

| Nº | Qué pasa (naranja) | Sistema (rosa) | Datos (verde) | Dudas (morado) | ¿A la matriz? |
| --- | --- | --- | --- | --- | --- |
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |
| 6 | | | | | |
| 7 | | | | | |
| 8 | | | | | |

*Plantilla 4.3. Tus dudas abiertas*

| Duda | Quién la resuelve | Fecha | Respuesta |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |

## Antes de seguir

- [ ] El recorrido empieza en una fuente de tráfico.
- [ ] El recorrido llega hasta la primera visita o la vuelta del paciente.
- [ ] Cada macro candidata del paso 2 aparece como un post-it naranja.
- [ ] Cada post-it naranja tiene su sistema.
- [ ] Los pasos que ocurren fuera de la web están anotados como tales, con el sistema que los cuenta.
- [ ] Cada duda tiene responsable y fecha.
