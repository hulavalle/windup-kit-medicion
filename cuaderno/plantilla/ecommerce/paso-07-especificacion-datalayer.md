# Paso 7. Especificación del dataLayer para quien desarrolla

**Qué te llevas.** La especificación técnica de tu tienda: qué ajustes de GTM4WP activas, qué empuja WooCommerce al dataLayer, qué le falta a tu matriz, qué IDs necesita GTM y el ticket para quien desarrolla. Es el `especificacion.md` de tu proyecto.

## Por qué importa

El dataLayer es la capa intermedia entre la web y GTM. La web le añade datos con `dataLayer.push()`, que puede llevar un evento, un dato o los dos. GTM no reconoce esos datos hasta que creas una variable de capa de datos para cada clave.

Leer los datos directamente del HTML de la página es frágil. Si cambia el diseño, se rompe la medición. El dataLayer no cambia cuando cambia el diseño.

En WordPress con WooCommerce, GTM4WP escribe los pushes de ecommerce por ti, con los nombres de evento de GA4. Tu especificación ya no describe código. Dice qué ajustes activas, qué empuja el plugin y qué le falta a tu matriz.

Lo que falta lo hace quien desarrolla, que implementa tracking una vez al mes o menos y olvida cómo se hace. El peor ticket que le puedes escribir es «Añadir la medición de este evento». Un buen ticket lleva el nombre del evento, las propiedades con valores de ejemplo, dónde se dispara, el código o el ajuste y cómo comprobar que funciona. Cuéntale también para qué se usarán los datos. Saber para qué sirve el dato motiva y trae ideas.

Para clics, desplazamiento y tiempo en página, GTM tiene activadores automáticos que no necesitan desarrollo. Los clics sí necesitan un `id` estable en cada elemento importante.

## Ejemplo con Café Fandango

La especificación de la web demo fija tres reglas:

- Antes de cada evento de ecommerce, la web limpia el objeto con `dataLayer.push({ ecommerce: null });`.
- La moneda es `EUR`. El `transaction_id` es `FAN-` seguido de la marca de tiempo.
- La suscripción es un `purchase` cuyo ítem lleva `item_category: "Suscripción"`. Los cafés sueltos llevan `Origen único` o `Blend`.

*Ejemplo 7.1. Pushes al dataLayer de la web demo*

| Evento | Página | Cuándo | Claves |
| --- | --- | --- | --- |
| `view_item_list` | `/cafes.html` | Al cargar la página | `ecommerce.item_list_name`, `ecommerce.items` (catálogo sin la suscripción) |
| `view_item` | `/producto.html?id=<item_id>` | Al cargar la página | `ecommerce.currency`, `ecommerce.value`, `ecommerce.items` |
| `add_to_cart` | `/producto.html` | Al pulsar `#btn-add-to-cart` | `ecommerce.currency`, `ecommerce.value`, `ecommerce.items` con `quantity` |
| `begin_checkout` | `/carrito.html` | Al pulsar `#btn-checkout` | `ecommerce.currency`, `ecommerce.value`, `ecommerce.items` |
| `purchase` | `/checkout.html` | Al pulsar `#btn-pagar` | `ecommerce.transaction_id`, `ecommerce.value`, `ecommerce.currency`, `ecommerce.items` |
| `purchase` | `/suscripcion.html` | Al pulsar `#btn-suscribir` | El resto igual, con el ítem `SUB-MES` y `item_category` = `Suscripción` |

Este es el push de una compra de dos bolsas de café de Etiopía:

```js
dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: "purchase",
  ecommerce: {
    transaction_id: "FAN-1700000000000",
    currency: "EUR",
    value: 29.00,
    items: [
      {
        item_id: "ETI-250",
        item_name: "Café Etiopía Yirgacheffe 250 g",
        item_category: "Origen único",
        price: 14.50,
        quantity: 2
      }
    ]
  }
});
```

### La misma tienda en WooCommerce

Con Café Fandango en WordPress con WooCommerce, nadie escribiría esos pushes. Los empuja GTM4WP con estos ajustes, en **Ajustes** > **Google Tag Manager**:

*Ejemplo 7.2. Ajustes de GTM4WP*

| Módulo | Ajuste | Valor | Por qué |
| --- | --- | --- | --- |
| Google Tag Manager container | **Container ID** | `GTM-XXXXXXX` | Carga tu contenedor en todas las páginas |
| Google Tag Manager container | **Container code placement** | *Automatically after the opening body tag* | Pone el `<noscript>` justo después de abrir el `<body>`. Si tu tema no lo admite, usa *Footer of the page* |
| Page variables | **Logged in user email**, **Visitor IP**, **Post custom fields (meta)** | Desactivados | Ponen datos personales en el dataLayer, al alcance de cualquier etiqueta |
| WooCommerce | **Track e-commerce** | Activado | Sin él, el plugin no empuja ningún evento de ecommerce. Viene desactivado |
| WooCommerce | **Clear ecommerce object before new event** | Activado | Empuja `{ ecommerce: null }` antes de cada evento, como la web demo |
| WooCommerce | **Exclude tax from revenue**, **Exclude shipping from revenue** | Desactivados | `value` es el total con impuestos y envío. Decídelo una vez, porque cambiarlo rompe la comparación con datos anteriores |
| WooCommerce | **Customer data in data layer**, **Order data in data layer** | Desactivados | Añaden nombre, email, teléfono y dirección del comprador |
| WooCommerce | **Reliable purchase tracking** | Activado si faltan compras | Si la pasarela no devuelve al cliente a la página de pedido recibido, el plugin empuja `purchase` en la siguiente página que vea |

*Ejemplo 7.3. Lo que empuja GTM4WP en WooCommerce*

| Evento | Cuándo | Claves dentro de `ecommerce` | Diferencia con la web demo |
| --- | --- | --- | --- |
| `view_item_list` | Al cargar la tienda, una categoría o un bloque de productos | `currency`, `items` | Sin `value`. `item_list_name` va dentro de cada ítem. Llega en envíos de 10 productos |
| `view_item` | Al cargar la ficha. En un producto variable, al elegir variación | `currency`, `value`, `items` | Ninguna en un producto simple |
| `add_to_cart` | Al pulsar el botón de añadir, en la ficha o en el listado, y al subir la cantidad en el carrito | `currency`, `value`, `items` | También salta al subir cantidades |
| `begin_checkout` | Al cargar la página de pago | `currency`, `value`, `items` | La demo lo empuja al pulsar `#btn-checkout` |
| `purchase` | En la página de pedido recibido, una vez por pedido | `transaction_id`, `value`, `currency`, `tax`, `shipping`, `coupon`, `items` | `transaction_id` es el número de pedido. Cada ítem lleva su `item_category`, también `Suscripción` |

El plugin empuja más eventos, como `view_cart`, `remove_from_cart` o `add_payment_info`. Úsalos solo si tu matriz los pide. Cada ítem de `items` lleva `item_id`, `item_name`, `price`, `quantity` e `item_category`. Con **Use SKU instead of ID**, `item_id` es el SKU del producto.

*Ejemplo 7.4. IDs y páginas que necesita GTM*

| Elemento | id o condición | Página | Fila |
| --- | --- | --- | --- |
| CTA «Suscribirme» del hero | `cta-suscribirme-hero` | `/index.html` | 6 |
| CTA «Suscribirme» del pie | `cta-suscribirme-footer` | `/index.html` | 6, como prueba de que no dispara |
| Formulario de cafeterías | `form-b2b` | `/empresas.html` | 10 |
| Ficha de café | Sin id. El temporizador usa Page Path contiene `/producto` | `/producto.html` | 5 |
| Guía de V60 | Sin id. El activador usa Page Path contiene `/guia` | `/guia.html` | 4 |

En WordPress, el `id` de un botón se pone en el editor. En el bloque Botón está en **Avanzado** > **Ancla HTML**. En un constructor de páginas, busca el campo ID. La base de las fichas de WooCommerce en español suele ser `/producto/`. Compruébala en **Ajustes** > **Enlaces permanentes**.

En WooCommerce, la fila 9 no necesita desarrollo. GTM4WP envía `item_category` en cada ítem de `purchase`, y el producto de la suscripción tiene la categoría `Suscripción`. En GA4 la separas de la compra puntual con la dimensión **Categoría del artículo**, sin dimensión personalizada. Para que funcione, el producto de la suscripción debe estar en una categoría de WooCommerce llamada `Suscripción`.

## Tu proyecto

1. Instala GTM4WP y activa los ajustes del ejemplo 7.2. Tienes el detalle en `gtm4wp.md`. Anota tus valores en la plantilla 7.1.
2. Abre tu tienda con la vista previa de GTM. Recorre listado, ficha, carrito y pago, y haz un pedido de prueba.
3. Anota en la plantilla 7.2 lo que empuja el plugin para cada fila de tu matriz, con valores reales.
4. Para cada fila que no cubre el plugin, anota en la plantilla 7.3 el activador automático y su `id` o su página.
5. Si una fila necesita un dato que el plugin no empuja, resuélvelo antes con un dato que ya llega, como `item_category`. Si no se puede, escribe el ticket (plantilla 7.4).

Para ver qué hay ya en el dataLayer de tu tienda:

1. Abre tu tienda en el navegador.
2. Abre la consola: Ctrl+Mayús+I en Windows, Cmd+Opción+J en Mac.
3. Escribe `dataLayer` y pulsa Intro. Despliega cada objeto y anota los eventos y claves que ya existen.

En la vista previa de GTM ves lo mismo en la pestaña **Capa de datos** de cada evento.

Para encontrar el `id` de un botón:

1. Haz clic derecho sobre el elemento y elige **Inspeccionar**.
2. Busca el atributo `id="..."` en el panel de elementos.
3. Si no tiene `id`, pónselo en el editor de WordPress. Si no puedes, usa el texto del botón o la página como condición, sabiendo que es más frágil.

Cuando termines, reescribe `especificacion.md` del kit para tu tienda. Mantén la estructura de la de Café Fandango: páginas, catálogo, eventos del dataLayer, contenedores y convención de nombres.

*Plantilla 7.1. Tus ajustes de GTM4WP*

| Módulo | Ajuste | Valor | Por qué |
| --- | --- | --- | --- |
| Google Tag Manager container | **Container ID** | | |
| Google Tag Manager container | **Container code placement** | | |
| Page variables | **Logged in user email**, **Visitor IP**, **Post custom fields (meta)** | | |
| WooCommerce | **Track e-commerce** | | |
| WooCommerce | **Clear ecommerce object before new event** | | |
| WooCommerce | **Exclude tax from revenue**, **Exclude shipping from revenue** | | |
| WooCommerce | **Customer data in data layer**, **Order data in data layer** | | |
| WooCommerce | **Reliable purchase tracking** | | |
| | | | |

*Plantilla 7.2. Lo que llega a tu dataLayer*

| Evento | Página | Cuándo exactamente | Claves y valores de ejemplo | Fila |
| --- | --- | --- | --- | --- |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |

*Plantilla 7.3. IDs y páginas que necesita tu GTM*

| Elemento | id o condición | Página | Fila |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |

*Plantilla 7.4. Tu ticket para desarrollo*

| Campo | Tu proyecto |
| ---- | ------ |
| Título | |
| Para qué se usa | |
| Eventos | |
| Dónde se dispara | |
| Código o ajuste | |
| Documentación | |
| Cómo se comprueba | |
| Fecha límite y responsable | |

## Antes de seguir

- [ ] GTM4WP tiene **Track e-commerce** activado y los datos de cliente y de pedido desactivados.
- [ ] Cada fila de la matriz tiene su evento del dataLayer o su activador automático con `id` o página.
- [ ] Cada evento anotado tiene valores de ejemplo vistos en tu tienda.
- [ ] Los eventos de ecommerce limpian `ecommerce` antes del push.
- [ ] Ningún evento lleva email, teléfono ni nombre.
- [ ] El ticket dice para qué se usa el dato y cómo se comprueba.
- [ ] El `especificacion.md` de tu proyecto está escrito.
