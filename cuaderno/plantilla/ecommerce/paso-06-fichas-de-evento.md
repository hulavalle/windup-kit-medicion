# Paso 6. Fichas de evento

**Qué te llevas.** Una ficha por cada evento distinto de tu matriz y un diccionario de propiedades. Es la documentación de referencia de tu medición.

## Por qué importa

Sin documentación, nadie sabe si un evento ya existe y aparecen duplicados. La pregunta típica es «¿ya teníamos este evento?». La documentación de referencia dice, por cada evento, qué es, cuándo se dispara, de dónde sale, qué propiedades lleva, en qué estado está y qué métricas lo usan. La ficha de este paso tiene esos campos.

Cada evento necesita un único responsable. Y cada propiedad tiene que estar en todos los pasos del embudo que la necesitan. Si una propiedad está en tres de las cuatro actividades de un embudo, ese embudo no se puede construir.

Tu asistente de IA puede redactar las fichas a partir de la matriz si le das una estructura fija. Tú revisas cada una.

## Ejemplo con Café Fandango

*Ejemplo 6.1. Ficha de purchase*

| Campo | Valor |
| ---- | ------ |
| Evento GA4 | `purchase` |
| Filas de la matriz | 8 (compra puntual) y 9 (suscripción) |
| Descripción (una frase) | El cliente paga un pedido de café o se suscribe al plan mensual |
| Disparador (acción, página y elemento) | Botón `#btn-pagar` en `/checkout.html` o botón `#btn-suscribir` en `/suscripcion.html`. La web empuja `purchase` al dataLayer y va a `/gracias.html` |
| Fuente (dataLayer, activador automático o servidor) | dataLayer de la web, recogido por el activador `CE - purchase`. En WooCommerce lo empuja GTM4WP en la página de pedido recibido |
| Propiedades (nombre, tipo y ejemplo) | `transaction_id` (texto, `FAN-1700000000000`), `value` (número, `29.00`), `currency` (texto, `EUR`), `items` (lista de productos, con `item_category` = `Suscripción`, `Origen único` o `Blend`) |
| Posición en el embudo | Último paso del embudo de compra y del de suscripción |
| Métricas que lo usan | KR1, altas de suscripción por canal. KR2, conversión de visita a compra |
| Evento clave en GA4 | Sí |
| Responsable | Responsable de marketing |
| Estado (planificado, implementado, verificado) | Verificado |
| Última verificación | 21/11/2026, filas 8 y 9 del registro de QA |

*Ejemplo 6.2. Ficha de generate_lead*

| Campo | Valor |
| ---- | ------ |
| Evento GA4 | `generate_lead` |
| Filas de la matriz | 10 |
| Descripción (una frase) | Una cafetería envía el formulario de la página de empresas |
| Disparador (acción, página y elemento) | Envío del formulario `form-b2b` en `/empresas.html`, que lleva a `/gracias-empresas.html` |
| Fuente (dataLayer, activador automático o servidor) | Activador automático `Form - B2B`: envío de formulario, esperar a las etiquetas 2000 ms, Form ID igual a `form-b2b`. No necesita dataLayer. Con Contact Form 7 sería `CE - CF7 enviado` (paso 8) |
| Propiedades (nombre, tipo y ejemplo) | `lead_type` (texto fijo, `b2b`), `form_id` (texto, `form-b2b`, de la variable `{{Form ID}}`) |
| Posición en el embudo | Final del recorrido B2B |
| Métricas que lo usan | KR3, solicitudes de cafeterías por canal |
| Evento clave en GA4 | Sí |
| Responsable | Dirección comercial |
| Estado (planificado, implementado, verificado) | Verificado |
| Última verificación | 21/11/2026, fila 10 del registro de QA |

GA4 solo muestra en sus informes los parámetros propios que registras como dimensión personalizada, en **Administrar** > **Definiciones personalizadas**. Los parámetros de ecommerce ya los trae GA4. Antes de registrar uno, comprueba si GA4 ya tiene una dimensión con ese nombre.

*Ejemplo 6.3. Diccionario de propiedades*

| Propiedad | Tipo | Valores de ejemplo | Eventos que la llevan | ¿Registrar en GA4? |
| --- | --- | --- | --- | --- |
| `transaction_id` | Texto | `FAN-1700000000000` | `purchase` | No, es de ecommerce |
| `value` | Número | `29.00` | `view_item`, `add_to_cart`, `begin_checkout`, `purchase` | No, es de ecommerce |
| `currency` | Texto | `EUR` | `view_item`, `add_to_cart`, `begin_checkout`, `purchase` | No, es de ecommerce |
| `items` | Lista | Productos con `item_id`, `item_name`, `item_category` (`Origen único`, `Blend` o `Suscripción`), `price` y `quantity` | `view_item_list`, `view_item`, `add_to_cart`, `begin_checkout`, `purchase` | No, es de ecommerce |
| `item_list_name` | Texto | `Cafés` | `view_item_list` | No, es de ecommerce |
| `lead_type` | Texto | `b2b` | `generate_lead` | Sí |
| `form_id` | Texto | `form-b2b` | `generate_lead` | Opcional |
| `element_id` | Texto | `cta-suscribirme-hero` | `cta_click` | Sí |
| `element_text` | Texto | Texto del botón | `cta_click` | Sí |
| `percent_scrolled` | Número | `75` | `page_read` | Comprobar si ya existe |
| `page_path` | Texto | `/guia.html`, `/producto.html` | `page_read`, `timer_5s` | Sí, si la quieres en informes |

## Tu proyecto

1. Rellena una ficha (plantillas 6.1 a 6.6) por cada evento distinto de tu matriz. Si necesitas más de seis, duplica una tabla en Word.
2. Rellena el diccionario de propiedades (plantilla 6.7).
3. Comprueba en el diccionario que cada propiedad del embudo está en todos sus pasos.
4. Marca el estado de cada ficha: planificado al escribirla, implementado tras el paso 8 y verificado tras el paso 9.

*Plantilla 6.1. Ficha de evento 1*

| Campo | Valor |
| ---- | ------ |
| Evento GA4 | |
| Filas de la matriz | |
| Descripción (una frase) | |
| Disparador (acción, página y elemento) | |
| Fuente (dataLayer, activador automático o servidor) | |
| Propiedades (nombre, tipo y ejemplo) | |
| Posición en el embudo | |
| Métricas que lo usan | |
| Evento clave en GA4 | |
| Responsable | |
| Estado (planificado, implementado, verificado) | |
| Última verificación | |

*Plantilla 6.2. Ficha de evento 2*

| Campo | Valor |
| ---- | ------ |
| Evento GA4 | |
| Filas de la matriz | |
| Descripción (una frase) | |
| Disparador (acción, página y elemento) | |
| Fuente (dataLayer, activador automático o servidor) | |
| Propiedades (nombre, tipo y ejemplo) | |
| Posición en el embudo | |
| Métricas que lo usan | |
| Evento clave en GA4 | |
| Responsable | |
| Estado (planificado, implementado, verificado) | |
| Última verificación | |

*Plantilla 6.3. Ficha de evento 3*

| Campo | Valor |
| ---- | ------ |
| Evento GA4 | |
| Filas de la matriz | |
| Descripción (una frase) | |
| Disparador (acción, página y elemento) | |
| Fuente (dataLayer, activador automático o servidor) | |
| Propiedades (nombre, tipo y ejemplo) | |
| Posición en el embudo | |
| Métricas que lo usan | |
| Evento clave en GA4 | |
| Responsable | |
| Estado (planificado, implementado, verificado) | |
| Última verificación | |

*Plantilla 6.4. Ficha de evento 4*

| Campo | Valor |
| ---- | ------ |
| Evento GA4 | |
| Filas de la matriz | |
| Descripción (una frase) | |
| Disparador (acción, página y elemento) | |
| Fuente (dataLayer, activador automático o servidor) | |
| Propiedades (nombre, tipo y ejemplo) | |
| Posición en el embudo | |
| Métricas que lo usan | |
| Evento clave en GA4 | |
| Responsable | |
| Estado (planificado, implementado, verificado) | |
| Última verificación | |

*Plantilla 6.5. Ficha de evento 5*

| Campo | Valor |
| ---- | ------ |
| Evento GA4 | |
| Filas de la matriz | |
| Descripción (una frase) | |
| Disparador (acción, página y elemento) | |
| Fuente (dataLayer, activador automático o servidor) | |
| Propiedades (nombre, tipo y ejemplo) | |
| Posición en el embudo | |
| Métricas que lo usan | |
| Evento clave en GA4 | |
| Responsable | |
| Estado (planificado, implementado, verificado) | |
| Última verificación | |

*Plantilla 6.6. Ficha de evento 6*

| Campo | Valor |
| ---- | ------ |
| Evento GA4 | |
| Filas de la matriz | |
| Descripción (una frase) | |
| Disparador (acción, página y elemento) | |
| Fuente (dataLayer, activador automático o servidor) | |
| Propiedades (nombre, tipo y ejemplo) | |
| Posición en el embudo | |
| Métricas que lo usan | |
| Evento clave en GA4 | |
| Responsable | |
| Estado (planificado, implementado, verificado) | |
| Última verificación | |

*Plantilla 6.7. Tu diccionario de propiedades*

| Propiedad | Tipo | Valores de ejemplo | Eventos que la llevan | ¿Registrar en GA4? |
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

## Antes de seguir

- [ ] Hay una ficha por cada evento distinto de la matriz.
- [ ] Cada propiedad tiene tipo y valor de ejemplo.
- [ ] Las propiedades del embudo están en todos sus pasos.
- [ ] Cada ficha tiene un responsable con nombre.
- [ ] Sabes qué propiedades vas a registrar como dimensión personalizada en GA4.
