# Paso 9. Protocolo de QA con evidencias

**Qué te llevas.** Un registro de QA con una fila por evento de la matriz, sus dos capturas de Tag Assistant y de DebugView y su OK. Con todas las filas en OK, publicas el contenedor. Lo copias a `plan/qa.csv`.

## Por qué importa

Los eventos de tracking fallan. Fallan a menudo, en pequeño y sin hacer ruido. Un evento implementado sin vigilancia acabará fallando.

Que una etiqueta se active no prueba que el dato llegue. Cada evento tiene que cumplir tres reglas, y las tres:

1. Se activó. La etiqueta aparece entre las etiquetas activadas de la vista previa de GTM, en Tag Assistant.
2. Se envió. La pestaña **Red** de las herramientas de desarrollador muestra la petición: `collect` para GA4 y `facebook.com/tr/` para Meta, con código 200 o 204.
3. Llegó. El evento y sus parámetros aparecen en DebugView de GA4.

Cada evento pasa además su propia prueba: se dispara cuando debe, no se dispara cuando no debe y cada propiedad llega con su valor. Repite las pruebas con calendario: prueba completa cada cuatro semanas, prueba rápida tras cada cambio grande y siempre tras un retoque de última hora.

Después de publicar, revisa cada semana durante 30 minutos de 4 a 5 eventos clave. Si una línea cae a cero, decide si es una tendencia real o un fallo de medición.

## Ejemplo con Café Fandango

*Ejemplo 9.1. Registro de QA*

| Nº | Evento | Acción de prueba | Se dispara cuando debe | No se dispara cuando no debe | Parámetros OK | Capturas | OK |
| ---- | --------------- | ------------ | -------- | ---------- | -------------- | ------------ | ------ |
| 1 | `view_item_list` | Abrir `/cafes.html` | Sí | Sí, no salta en la portada | Sí, cuatro ítems | `qa-01-ta.png`, `qa-01-dv.png` | OK |
| 2 | `view_item` | Abrir `/producto.html?id=ETI-250` | Sí | Sí, no salta en el listado | Sí, `value` = 14.5 | `qa-02-ta.png`, `qa-02-dv.png` | OK |
| 3 | `add_to_cart` | Pulsar «Añadir al carrito» | Sí | Sí, no salta al abrir la ficha | Sí, `quantity` = 1 | `qa-03-ta.png`, `qa-03-dv.png` | OK |
| 4 | `page_read` | Bajar al 75 % de `/guia.html` | Sí | Sí, no salta al 75 % de la portada | Sí, `percent_scrolled` = 75 | `qa-04-ta.png`, `qa-04-dv.png` | OK |
| 5 | `timer_5s` | Quedarse 5 segundos en la ficha | Sí, una vez | Sí, no salta en otras páginas | Sí, `page_path` = `/producto.html` | `qa-05-ta.png`, `qa-05-dv.png` | OK |
| 6 | `cta_click` | Pulsar «Suscribirme» en la portada | Sí | Sí, el botón del pie no lo dispara | Sí, `element_id` = `cta-suscribirme-hero` | `qa-06-ta.png`, `qa-06-dv.png` | OK |
| 7 | `begin_checkout` | Pulsar «Tramitar pedido» en el carrito | Sí | Sí, no salta al abrir el carrito | Sí, `value` = 29 | `qa-07-ta.png`, `qa-07-dv.png` | OK |
| 8 | `purchase` (compra puntual) | Pagar un pedido | Sí | Sí, no salta en `/gracias.html` al recargar | Sí, `transaction_id` = `FAN-...` | `qa-08-ta.png`, `qa-08-dv.png` | OK |
| 9 | `purchase` (suscripción) | Suscribirse al plan mensual | Sí | Sí | `item_category` no era `Suscripción`. Faltaba la categoría en el producto de WooCommerce. Corregido y probado otra vez | `qa-09-ta.png`, `qa-09-dv.png` | OK tras corregir |
| 10 | `generate_lead` | Enviar el formulario de cafeterías | Sí | Sí, no salta al cargar `/empresas.html` | Sí, `lead_type` = `b2b` | `qa-10-ta.png`, `qa-10-dv.png` | OK |

La fila 9 muestra cómo se anota un fallo. No se borra: se escribe qué pasó, qué se corrigió y el resultado de la segunda prueba.

La web demo no tiene banner de cookies. En una web real, con Consent Mode v2 en modo básico, la prueba de consentimiento de Café Fandango esperaría esto:

*Ejemplo 9.2. Prueba de consentimiento*

| Estado | Peticiones que deben salir | Peticiones que no deben salir |
| --- | --- | --- |
| Sin respuesta | Ninguna de GA4 ni de Meta | `collect` y `facebook.com/tr/` |
| Rechazado | Ninguna de GA4 ni de Meta | `collect` y `facebook.com/tr/` |
| Solo analítica | `collect` de GA4 | `facebook.com/tr/` |
| Todo aceptado | `collect` y `facebook.com/tr/` | |

## Tu proyecto

1. En GTM, pulsa **Vista previa**, escribe la URL de tu tienda y conecta. Se abre Tag Assistant y tu tienda queda conectada. Si GTM4WP excluye a los administradores, prueba en una ventana de incógnito sin iniciar sesión en WordPress.
2. En otra ventana, abre GA4 > **Administrar** > **DebugView**. La vista previa de GTM activa el modo de depuración. Los eventos pueden tardar unos segundos en aparecer.
3. Abre las herramientas de desarrollador con F12, o Cmd+Opción+I en Mac, y ve a la pestaña **Red**. Filtra por `collect`.
4. Haz la acción de prueba de la fila. Para `purchase`, haz un pedido de prueba con transferencia bancaria: GTM4WP empuja `purchase` con el pedido *En espera*. Anota su número para cancelarlo después en WooCommerce.
5. En Tag Assistant, selecciona el evento en la columna izquierda. Comprueba que tu etiqueta está entre las activadas. Haz una captura y guárdala como `qa-NN-ta.png`, con NN el número de fila.
6. Abre la pestaña **Variables** o **Capa de datos** de Tag Assistant y comprueba los valores.
7. Haz la acción que no debe disparar el evento, como pulsar el otro botón o abrir otra página. Comprueba que tu etiqueta está entre las no activadas. Para `purchase`, recarga la página de pedido recibido: GTM4WP empuja la compra una sola vez por pedido.
8. En la pestaña **Red**, comprueba que la petición tiene código 200 o 204.
9. En DebugView, pulsa el evento y luego cada parámetro. Comprueba su valor. Haz una captura y guárdala como `qa-NN-dv.png`.
10. Rellena la fila. Si algo falla, corrige en GTM, vuelve a la vista previa y repite la fila.
11. Si tu web tiene banner de cookies, haz la prueba de consentimiento en una ventana de incógnito nueva por estado.
12. Con todas las filas en OK, ve a **Enviar** > **Publicar y crear versión**. Escribe un nombre y una descripción que digan qué cambia.
13. Copia el registro a `plan/qa.csv` y guarda las capturas en `plan/capturas/`.

*Plantilla 9.1. Tu registro de QA*

| Nº | Evento | Acción de prueba | Se dispara cuando debe | No se dispara cuando no debe | Parámetros OK | Capturas | OK |
| --- | ---------- | ------------ | -------- | ---------- | ------------ | ---------- | ----- |
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |
| 6 | | | | | | | |
| 7 | | | | | | | |
| 8 | | | | | | | |
| 9 | | | | | | | |
| 10 | | | | | | | |
| 11 | | | | | | | |
| 12 | | | | | | | |

*Plantilla 9.2. Tu prueba de consentimiento*

| Estado | Peticiones que deben salir | Peticiones que no deben salir | Resultado |
| --- | --- | --- | --- |
| Sin respuesta | | | |
| Rechazado | | | |
| Solo analítica | | | |
| Todo aceptado | | | |

*Plantilla 9.3. Tu registro de versiones*

| Versión | Fecha | Qué cambia | Quién la probó |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |

*Plantilla 9.4. Tu revisión semanal*

| Evento clave | Valor normal por semana | Quién lo revisa | Qué haces si cae a cero |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |

## Antes de seguir

- [ ] Cada fila de la matriz tiene su fila en el registro de QA.
- [ ] Cada fila tiene su captura de Tag Assistant y su captura de DebugView.
- [ ] Has comprobado que cada activador no se dispara donde no debe.
- [ ] Cada parámetro llega con su valor a DebugView.
- [ ] La versión publicada tiene nombre y descripción.
- [ ] La revisión semanal tiene responsable y día fijo.
- [ ] `plan/qa.csv` tiene las mismas filas que tu registro.
