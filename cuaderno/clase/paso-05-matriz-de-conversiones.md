# Paso 5. Matriz de conversiones

**7 min · tu proyecto.** Pasa de 6 a 8 filas de tu event storming a la matriz.

Marca cada fila como micro o macro y escribe su evento GA4, sus parámetros y su activador de GTM. Una macro cierra un flujo con éxito y supone dinero o un lead. Una micro es un paso intermedio que indica interés. Usa un evento recomendado de GA4 cuando exista, como `add_to_cart`, `purchase` o `generate_lead`. Si no existe, crea uno en `snake_case`. Cada macro es un evento clave en GA4 y lleva un contrapeso: la cifra que avisa si la macro sube por un mal motivo.

*Ejemplo 5.1. Matriz de Café Fandango*

| Nº | Acción de negocio | Tipo | Evento GA4 | Parámetros | Activador | Evento clave | Contrapeso |
| -- | ---------- | ---- | ------ | ---------- | ------ | -- | ------ |
| 1 | Ve el listado de cafés | Micro | `view_item_list` | `item_list_name`, `items` | Evento personalizado | No | |
| 2 | Abre la ficha de un café | Micro | `view_item` | `currency`, `value`, `items` | Evento personalizado | No | |
| 3 | Añade un café al carrito | Micro | `add_to_cart` | `currency`, `value`, `items` | Evento personalizado | No | |
| 4 | Lee la guía de preparación (75 % de scroll) | Micro | `page_read` | `percent_scrolled`, `page_path` | Profundidad de desplazamiento | No | |
| 5 | Pasa 5 segundos en la ficha de un café | Micro | `timer_5s` | `page_path` | Temporizador | No | |
| 6 | Clic en «Suscribirme» del hero | Micro | `cta_click` | `element_id`, `element_text` | Clic - Todos los elementos | No | |
| 7 | Empieza el pago | Micro | `begin_checkout` | `currency`, `value`, `items` | Evento personalizado | No | |
| 8 | Compra un café | Macro | `purchase` | `transaction_id`, `value`, `currency`, `items` | Evento personalizado | Sí | Menos del 3 % de pedidos devueltos |
| 9 | Se suscribe al plan mensual | Macro | `purchase` | `transaction_id`, `value`, `currency`, `items` | Evento personalizado | Sí | Menos del 10 % de bajas en 30 días |
| 10 | Envía el formulario para cafeterías | Macro | `generate_lead` | `lead_type` = `b2b`, `form_id` | Envío de formulario | Sí | Al menos un 70 % de solicitudes válidas |

Las filas 8 y 9 usan el mismo evento. La suscripción se reconoce por `item_category` = `Suscripción` dentro de `items`.

*Plantilla 5.1. Tu matriz*

| Nº | Acción de negocio | Tipo | Evento GA4 | Parámetros | Activador | Evento clave | Contrapeso |
| -- | ---------- | ---- | ------ | ---------- | ------ | -- | ------ |
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |
| 6 | | | | | | | |
| 7 | | | | | | | |
| 8 | | | | | | | |

- [ ] Hay al menos 3 macro y 3 micro.
- [ ] Cada fila responde una de tus preguntas del paso 0.

Versión completa: el paso 5 de tu plantilla añade la pregunta de negocio y la condición del activador de cada fila, el árbol de métricas y la copia a `plan/matriz.csv`.
