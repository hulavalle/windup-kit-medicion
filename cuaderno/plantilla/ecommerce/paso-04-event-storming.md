# Paso 4. Event storming de tu recorrido

**Qué te llevas.** Una línea de tiempo con todo lo que pasa desde que alguien conoce tu proyecto hasta que repite, con el sistema donde ocurre, sus datos y las dudas abiertas. Es la lista larga de candidatos para la matriz.

## Por qué importa

Si te cuesta encontrar actividades, te falta conocer el recorrido. El event storming lo resuelve con una línea de tiempo y post-its de colores. En una empresa se hace en sesiones de dos horas con varios equipos. Tu equipo puede hacerlo en una hora.

Sigue cuatro reglas:

- Empieza por la izquierda, por las fuentes de tráfico. Ahí aporta marketing.
- Haz una sola pregunta: «¿qué pasa después?».
- Mapea todo, también lo que ocurre fuera de la web.
- Comprueba que el final es de verdad el final: la segunda compra, la renovación o la baja.

Cada color tiene un significado:

- Naranja: el evento, lo que hace el cliente o el sistema.
- Rosa: el sistema donde ocurre, como la web, la pasarela de pago, el email o el CRM.
- Verde: los datos que acompañan al evento.
- Morado: las dudas.

El mapa tiene más eventos de los que vas a implementar. Sirve como documentación y se revisa una o dos veces al año.

## Ejemplo con Café Fandango

*Ejemplo 4.1. Recorrido de compra y suscripción*

| Nº | Qué pasa (naranja) | Sistema (rosa) | Datos (verde) | Dudas (morado) | ¿A la matriz? |
| --- | --- | --- | --- | --- | --- |
| 1 | Ve un anuncio, la newsletter o un post de Instagram | Meta, email, Instagram | `utm_source`, `utm_medium`, `utm_campaign` | ¿Etiquetamos todos los enlaces? | UTMs (paso 10) |
| 2 | Llega a la portada | Web | Página de entrada, UTMs | | No, GA4 ya envía `page_view` |
| 3 | Pulsa «Suscribirme» en el hero | Web | `element_id`, `element_text` | ¿Funciona mejor el botón del hero o el del pie? | Fila 6 |
| 4 | Ve el listado de cafés | Web | `item_list_name`, `items` | | Fila 1 |
| 5 | Abre la ficha de un café | Web | `item_id`, `item_name`, `price` | | Fila 2 |
| 6 | Se queda 5 segundos en la ficha | Web | `page_path` | ¿5 segundos indican interés o solo una carga lenta? | Fila 5 |
| 7 | Lee la guía de V60 | Web | `page_path`, `percent_scrolled` | ¿Leer la guía acerca a la compra? | Fila 4 |
| 8 | Añade un café al carrito | Web | `item_id`, `quantity`, `value` | | Fila 3 |
| 9 | Empieza el pago | Web | `value`, `items` | | Fila 7 |
| 10 | Paga el pedido | Web y pasarela | `transaction_id`, `value`, `items` | ¿La pasarela está en otro dominio? | Fila 8 |
| 11 | Recibe el email de confirmación | Email | `transaction_id` | | No |
| 12 | Recibe el pedido | Logística | `transaction_id` | ¿Quién tiene el dato de entrega? | No, fuera de la web |
| 13 | Devuelve el pedido | Backend | `transaction_id` | | Contrapeso de KR2 |
| 14 | Se suscribe al plan mensual | Web y pasarela | `transaction_id`, `value`, `items` con `item_category = Suscripción` | ¿Cuenta si cancela antes del primer envío? | Fila 9 |
| 15 | Renueva cada mes | Pasarela | Importe | | No, fuera de la web |
| 16 | Se da de baja | Pasarela | Fecha de alta | | Contrapeso de KR1 |
| 17 | Vuelve y compra otra vez | Web | `transaction_id` | Sin login, ¿lo reconocemos? | Fase de cliente (paso 3) |

*Ejemplo 4.2. Recorrido B2B de cafeterías*

| Nº | Qué pasa (naranja) | Sistema (rosa) | Datos (verde) | Dudas (morado) | ¿A la matriz? |
| --- | --- | --- | --- | --- | --- |
| 1 | Llega a la página de cafeterías | Web | UTMs | | No, GA4 ya envía `page_view` |
| 2 | Envía el formulario | Web | `lead_type = b2b`, `form_id` | ¿Enviamos el número de locales en tramos? | Fila 10 |
| 3 | Un comercial le contacta | CRM | | ¿Quién marca si la solicitud es válida? | Contrapeso de KR3 |
| 4 | Firma el acuerdo | CRM | | | No, fuera de la web |

## Tu proyecto

1. Reserva una hora con tu equipo. Abre una pizarra compartida, como Miro o FigJam, o pega post-its en una pared.
2. Pon a la izquierda las fuentes de tráfico de tu ficha del paso 0.
3. Pregunta «¿qué pasa después?» y pega un post-it naranja por respuesta. No discutáis todavía si se mide o no.
4. Añade a cada post-it naranja su rosa, su verde y su morado.
5. Si tienes un segundo recorrido, como B2B, suscripciones o pedidos para empresas, hazlo en otra fila.
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
- [ ] El recorrido llega hasta la repetición o el final de la relación.
- [ ] Cada macro candidata del paso 2 aparece como un post-it naranja.
- [ ] Cada post-it naranja tiene su sistema.
- [ ] Los pasos que ocurren fuera de la web están anotados como tales.
- [ ] Cada duda tiene responsable y fecha.
