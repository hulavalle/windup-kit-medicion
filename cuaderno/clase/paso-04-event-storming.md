# Paso 4. Event storming

**12 min · tu proyecto.** Dibuja en una pizarra compartida el recorrido de tu cliente.

Trabaja en grupo, desde que os descubren hasta la segunda compra o conversión. Haz una sola pregunta: «¿qué pasa después?». Pega un post-it naranja por evento y añade a cada uno el rosa con el sistema, el verde con los datos y el morado con las dudas. Pasa aquí de 10 a 15 eventos candidatos.

*Ejemplo 4.1. Cinco post-its del recorrido de Café Fandango*

| Nº | Qué pasa (naranja) | Sistema (rosa) | Datos (verde) | Dudas (morado) |
| -- | ---------- | ------ | ---------- | ---------- |
| 1 | Ve un anuncio, la newsletter o un post de Instagram | Meta, email, Instagram | `utm_source`, `utm_medium`, `utm_campaign` | ¿Etiquetamos todos los enlaces? |
| 3 | Pulsa «Suscribirme» en el hero | Web | `element_id`, `element_text` | ¿Funciona mejor el botón del hero o el del pie? |
| 10 | Paga el pedido | Web y pasarela | `transaction_id`, `value`, `items` | ¿La pasarela está en otro dominio? |
| 14 | Se suscribe al plan mensual | Web y pasarela | `transaction_id`, `value`, `items` con `item_category = Suscripción` | ¿Cuenta si cancela antes del primer envío? |
| 17 | Vuelve y compra otra vez | Web | `transaction_id` | Sin login, ¿lo reconocemos? |

*Plantilla 4.1. Tu recorrido*

| Nº | Qué pasa (naranja) | Sistema (rosa) | Datos (verde) | Dudas (morado) |
| -- | ---------- | ------ | ---------- | ---------- |
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
| 11 | | | | |
| 12 | | | | |
| 13 | | | | |
| 14 | | | | |
| 15 | | | | |

- [ ] El recorrido empieza en una fuente de tráfico e incluye los pasos fuera de la web.

Versión completa: el paso 4 de tu plantilla trae un recorrido entero de 17 post-its y añade un segundo recorrido y las dudas con responsable y fecha.
