# Paso 0. Tu proyecto y sus preguntas de negocio

**Qué te llevas.** La ficha de tu proyecto y de 5 a 10 preguntas de negocio, cada una con la decisión que cambia según la respuesta.

## Por qué importa

Medir no es lo mismo que crear datos. Medir es recoger un dato suelto. Crear datos es decidir qué datos necesitas para responder preguntas de negocio. Todo el método parte de ahí: empiezas por una pregunta y la desglosas hasta el evento.

Si empiezas por la web, acabas con eventos que nadie usa. Un diseño puede salir aprobado por todos y que casi nadie lo use, porque nadie sabe qué evento elegir para responder su pregunta.

Una pregunta vale si su respuesta cambia una decisión. Si nadie va a trabajar con el dato, no lo midas todavía.

GA4 ya te da visitas, países y dispositivos sin configurar nada. Este paso busca las preguntas que esos informes no responden.

## Ejemplo con Café Fandango

*Ejemplo 0.1. Ficha del proyecto*

| Campo | Café Fandango |
| --- | --- |
| Qué vende | Café de especialidad en bolsas de 250 g y 1 kg, en compra puntual o en suscripción mensual de 24 € |
| Cómo gana dinero | Pedidos sueltos, suscripciones mensuales y acuerdos con cafeterías (B2B) |
| Web y plataforma | Web demo a medida: portada, listado de cafés, ficha, carrito, pago, suscripción, página de cafeterías y guía de V60. Los pasos 7 a 9 la llevan a WordPress con WooCommerce |
| Quién puede tocar el código | Los `dataLayer.push` de ecommerce ya están en la web. No hay más desarrollo previsto |
| Canales de captación | Newsletter, Instagram y anuncios de Meta |
| Herramientas | GA4, Google Tag Manager y Meta Pixel |
| Quién usará el dato | Marketing, cada lunes, para repartir el presupuesto entre canales |
| Problema de partida | Invierte en newsletter, Instagram y Meta Ads y no sabe qué canal vende |

*Ejemplo 0.2. Preguntas de negocio*

| Nº | Pregunta | Qué decisión cambia | Quién decide | Prioridad |
| --- | --- | --- | --- | --- |
| 1 | ¿Qué canal trae ventas? | Cuánto presupuesto va a newsletter, Instagram y Meta Ads | Marketing | Alta |
| 2 | ¿Qué canal trae clientes que repiten? | En qué canal se empuja la suscripción | Marketing | Alta |
| 3 | ¿Qué canal trae negocio B2B? | Si se mantienen las campañas para cafeterías | Dirección comercial | Alta |
| 4 | ¿Dónde se pierden los que no compran? | Qué paso del embudo se arregla primero | Web | Alta |
| 5 | ¿Cuántos carritos llegan al pago? | Si se simplifica el carrito | Web | Media |
| 6 | ¿La promesa de la portada funciona? | Si se cambia el mensaje del hero | Marketing | Media |
| 7 | ¿Qué cafés miran antes de decidir? | Qué cafés se destacan en el listado | Marketing | Media |
| 8 | ¿Qué orígenes despiertan interés? | Qué orígenes se compran en el próximo lote | Compras | Baja |
| 9 | ¿El contenido educativo acerca a la compra? | Si se siguen escribiendo guías como la de V60 | Contenidos | Baja |
| 10 | ¿La ficha retiene o se abandona al instante? | Si se reescriben las fotos y los textos de las fichas | Contenidos | Baja |

Una pregunta que no pasa el filtro es «¿cuántas visitas tenemos?». GA4 ya la responde y, sola, no cambia ninguna decisión.

## Tu proyecto

1. Rellena la ficha (plantilla 0.1). Si no sabes quién puede tocar el código, pregúntalo ahora. La respuesta condiciona los pasos 1 y 7.
2. Escribe todas las preguntas que se hace tu equipo sobre el negocio. Te ayudan estos comienzos: «¿Qué canal...?», «¿Dónde se pierden...?», «¿Cuántos...?», «¿Funciona...?».
3. Escribe al lado de cada pregunta la decisión que cambiaría con la respuesta. Si no encuentras ninguna, tacha la pregunta.
4. Ordénalas por prioridad y quédate con 5 a 10.

*Plantilla 0.1. Ficha de tu proyecto*

| Campo | Tu proyecto |
| ---- | ------ |
| Nombre del proyecto | |
| Qué vende u ofrece | |
| Cómo gana dinero | |
| URL de la tienda y plataforma (WordPress con WooCommerce u otra) | |
| Plugins que ya tiene (cookies, formularios, Site Kit, Google for WooCommerce) | |
| Quién puede tocar el código | |
| Canales de captación actuales | |
| Herramientas que ya tiene (GA4, píxeles, CRM) | |
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
- [ ] Al menos una pregunta habla de dinero o de leads: ventas, suscripciones, reservas o solicitudes.
- [ ] Al menos una pregunta habla de canal, es decir, de dónde viene lo que funciona.
- [ ] Ninguna pregunta se responde ya con un informe estándar de GA4.
- [ ] Sabes quién puede tocar el código de la web.
- [ ] Sabes qué plugins de tu WordPress cargan ya GTM, GA4 o un píxel.
