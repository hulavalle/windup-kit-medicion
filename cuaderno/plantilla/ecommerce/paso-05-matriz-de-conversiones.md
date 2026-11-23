# Paso 5. Matriz de conversiones

**Qué te llevas.** Tu matriz de conversiones, con al menos 3 macro y 3 micro. Cada fila lleva su pregunta de negocio, su evento de GA4, sus parámetros y su activador, y cada macro lleva su contrapeso. La copias a `plan/matriz.csv`.

## Por qué importa

La matriz es el contrato entre negocio y técnica. Marketing entiende la parte de negocio. GTM implementa la parte técnica.

Una macro cierra un flujo lineal con su estado de éxito y supone un compromiso a cambio de dinero o un lead. Son macro la compra, la suscripción y la solicitud. Una micro es un paso intermedio que indica avance o interés, y sirve para embudos y segmentos. En GA4, las macro se marcan como evento clave.

Pon nombres de negocio, no de aplicación. `cta_demo_hero`, `cta_demo_footer` y `cta_demo_navbar` son tres eventos para un mismo gesto. `cta_clicked` con una propiedad de ubicación es uno solo. Aun así, `cta_clicked` habla de la web y no del negocio. El evento que entiende marketing es «Solicitud de demo iniciada».

La matriz junta los dos mundos. La columna de acción lleva el nombre de negocio. La columna de evento lleva el nombre de GA4. Usa un evento recomendado de GA4 cuando exista, como `view_item`, `add_to_cart`, `begin_checkout`, `purchase`, `generate_lead` o `sign_up`. Si no existe, crea uno en `snake_case`, de 40 caracteres como mucho y que empiece por una letra.

Controla la matriz con el árbol de métricas. Cada fila alimenta una métrica de un KR. Si una fila no alimenta ninguna, sobra. Si a una métrica le falta un evento, falta una fila.

Elige el activador según la acción:

| Si la acción es | Activador de GTM | Condición típica |
| --- | --- | --- |
| Un evento que la web o GTM4WP empujan al dataLayer | Evento personalizado | Nombre del evento igual a `purchase` |
| Un clic en un botón o un enlace | Clic - Todos los elementos, o Clic - Solo enlaces | Click ID igual a `cta-suscribirme-hero` |
| El envío de un formulario HTML que recarga la página | Envío de formulario | Form ID igual a `form-b2b` |
| La lectura de una página | Profundidad de desplazamiento | 75 % vertical, Page Path contiene `/guia` |
| Pasar un tiempo en una página | Temporizador | Intervalo 5000 ms, límite 1, Page Path contiene `/producto` |
| La llegada a una página de gracias | Vista de página | Page Path igual a `/gracias.html` |

Si el formulario se envía sin recargar la página, el activador de envío de formulario puede no saltar, o saltar también con un envío rechazado. Contact Form 7 funciona así. Con GTM4WP, usa su evento `gtm4wp.contactForm7MailSent` como evento personalizado. Con otro plugin de formularios, busca su evento o pide un push a quien desarrolla.

Café Fandango usa la misma página de gracias para la compra y para la suscripción. Por eso sus macro salen del push al dataLayer, y la suscripción se reconoce por `item_category` = `Suscripción`, no por la vista de página.

## Ejemplo con Café Fandango

*Ejemplo 5.1. Matriz, parte de negocio*

| Nº | Acción de negocio | Tipo | Pregunta de negocio | Evento clave | Contrapeso |
| --- | --- | --- | --- | --- | --- |
| 1 | Ve el listado de cafés | Micro | ¿Qué cafés miran antes de decidir? | No | |
| 2 | Abre la ficha de un café | Micro | ¿Qué orígenes despiertan interés? | No | |
| 3 | Añade un café al carrito | Micro | ¿Dónde se pierden los que no compran? | No | |
| 4 | Lee la guía de preparación (75 % de scroll) | Micro | ¿El contenido educativo acerca a la compra? | No | |
| 5 | Pasa 5 segundos en la ficha de un café | Micro | ¿La ficha retiene o se abandona al instante? | No | |
| 6 | Clic en «Suscribirme» del hero | Micro | ¿La promesa de la portada funciona? | No | |
| 7 | Empieza el pago | Micro | ¿Cuántos carritos llegan al pago? | No | |
| 8 | Compra un café | Macro | ¿Qué canal trae ventas? | Sí | Menos del 3 % de pedidos devueltos |
| 9 | Se suscribe al plan mensual | Macro | ¿Qué canal trae clientes que repiten? | Sí | Menos del 10 % de bajas en 30 días |
| 10 | Envía el formulario para cafeterías | Macro | ¿Qué canal trae negocio B2B? | Sí | Al menos un 70 % de solicitudes válidas |

*Ejemplo 5.2. Matriz, parte técnica*

| Nº | Evento GA4 | Parámetros | Activador GTM | Condición |
| --- | --- | --- | --- | --- |
| 1 | `view_item_list` | `item_list_name`, `items` | Evento personalizado | `event` = `view_item_list` |
| 2 | `view_item` | `currency`, `value`, `items` | Evento personalizado | `event` = `view_item` |
| 3 | `add_to_cart` | `currency`, `value`, `items` | Evento personalizado | `event` = `add_to_cart` |
| 4 | `page_read` | `percent_scrolled`, `page_path` | Profundidad de desplazamiento | 75 % vertical en `/guia.html` |
| 5 | `timer_5s` | `page_path` | Temporizador | 5000 ms una vez por página en `/producto.html` |
| 6 | `cta_click` | `element_id`, `element_text` | Clic - Todos los elementos | Click ID = `cta-suscribirme-hero` |
| 7 | `begin_checkout` | `currency`, `value`, `items` | Evento personalizado | `event` = `begin_checkout` |
| 8 | `purchase` | `transaction_id`, `value`, `currency`, `items` | Evento personalizado | `event` = `purchase` (`items` con `item_category` distinto de `Suscripción`) |
| 9 | `purchase` | `transaction_id`, `value`, `currency`, `items` | Evento personalizado | `event` = `purchase` (`item_category` = `Suscripción`) |
| 10 | `generate_lead` | `lead_type` = `b2b`, `form_id` | Envío de formulario | Form ID = `form-b2b` |

*Ejemplo 5.3. Árbol de métricas*

| KR | Filas de la matriz | Métrica |
| --- | --- | --- |
| KR1. Suscripciones | 6 y 9 | Altas de suscripción por canal y clics en el CTA del hero |
| KR2. Conversión a compra | 1, 2, 3, 7 y 8 | Embudo de listado, ficha, carrito, pago y compra |
| KR3. Solicitudes de cafeterías | 10 | Solicitudes por canal |
| Sin KR directo | 4 y 5 | Responden las preguntas 9 y 10 del paso 0. Se revisan dentro de tres meses |

Las condiciones son las de la web demo. En WooCommerce con GTM4WP cambian las de las filas 4, 5 y 10. Lo ves en el paso 8.

En `plan/matriz.csv`, cada fila de las dos tablas es una línea. Así queda la fila 8:

```text
id,accion_negocio,tipo,evento_ga4,parametros,activador_gtm,condicion,evento_clave,pregunta_de_negocio,contrapeso
8,Compra un café,macro,purchase,"transaction_id, value, currency, items",Evento personalizado,event = purchase (items con item_category distinto de Suscripción),sí,¿Qué canal trae ventas?,menos del 3 % de pedidos devueltos
```

## Tu proyecto

1. Filtra los candidatos del paso 4 con la plantilla 5.1. Cada candidato acaba como fila, como propiedad de otra fila o fuera.
2. Rellena la parte de negocio (plantilla 5.2). Empieza por las macro.
3. Rellena la parte técnica (plantilla 5.3) con el mismo número de fila.
4. Comprueba el árbol de métricas (plantilla 5.4).
5. Sustituye las filas de ejemplo de `plan/matriz.csv` por las tuyas, con las mismas columnas.

*Plantilla 5.1. Filtro de candidatos*

| Candidato (paso 4) | ¿Responde una pregunta? (nº) | ¿Alimenta un KR? | ¿Se mide en la web? | Decisión: fila, propiedad o fuera |
| --- | --- | --- | --- | --- |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |

*Plantilla 5.2. Tu matriz, parte de negocio*

| Nº | Acción de negocio | Tipo | Pregunta de negocio | Evento clave | Contrapeso |
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

*Plantilla 5.3. Tu matriz, parte técnica*

| Nº | Evento GA4 | Parámetros | Activador GTM | Condición |
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
| 11 | | | | |
| 12 | | | | |

*Plantilla 5.4. Tu árbol de métricas*

| KR | Filas de la matriz | Métrica |
| --- | --- | --- |
| KR1 | | |
| KR2 | | |
| KR3 | | |
| Sin KR directo | | |

## Antes de seguir

- [ ] Hay al menos 3 macro y 3 micro.
- [ ] Cada fila responde una pregunta del paso 0.
- [ ] Cada macro tiene contrapeso y está marcada como evento clave.
- [ ] Cada nombre de evento es un evento recomendado de GA4 o uno propio en `snake_case`.
- [ ] Ningún evento repite un nombre que ya envía la medición mejorada, como `scroll`, `click`, `form_submit` o sus eventos de vídeo, salvo que desactives esa opción.
- [ ] Cada activador tiene una condición. Ninguno salta en todos los clics ni en todas las páginas.
- [ ] El total cabe en tu presupuesto del paso 1.
- [ ] `plan/matriz.csv` tiene las mismas filas que estas tablas.
