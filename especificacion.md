# Especificación técnica · Café Fandango

Especificación de ejemplo de Café Fandango: la siguen la web demo (`web/`), los contenedores de GTM (`gtm/`) y el cuaderno (`cuaderno/`). Para tu proyecto, reescríbela con la misma estructura (paso 7 de tu plantilla). La matriz de negocio está en `plan/matriz.csv`.

## Web demo

Sitio estático, sin build. Se sirve en local con `python3 -m http.server 8000` desde `web/` y se abre en `http://localhost:8000`.

| Página | Ruta | Qué ocurre |
| --- | --- | --- |
| Portada | `/index.html` | CTA `#cta-suscribirme-hero` (a `/suscripcion.html`), CTA `#cta-suscribirme-footer` (mismo destino, mismo texto), enlace `#cta-ver-cafes` (a `/cafes.html`) |
| Cafés | `/cafes.html` | Al cargar: push `view_item_list` |
| Ficha | `/producto.html?id=<item_id>` | Al cargar: push `view_item`. Vídeo de YouTube embebido como contenido (no se mide). Botón `#btn-add-to-cart`: push `add_to_cart` y guarda el carrito en `localStorage` |
| Carrito | `/carrito.html` | Botón `#btn-checkout`: push `begin_checkout` y va a `/checkout.html` |
| Pago | `/checkout.html` | Botón `#btn-pagar`: push `purchase` (ítems de café) y va a `/gracias.html` |
| Suscripción | `/suscripcion.html` | Botón `#btn-suscribir`: push `purchase` (ítem `SUB-MES`, categoría `Suscripción`) y va a `/gracias.html` |
| Cafeterías | `/empresas.html` | Formulario HTML real `<form id="form-b2b" action="/gracias-empresas.html" method="get">` con nombre, empresa, email, nº de locales. Los campos no llevan atributo `name`: el envío no pone datos personales en la URL (GA4 la registra) |
| Guía | `/guia.html` | Artículo largo («Cómo preparar café en V60») para el scroll al 75 % |
| Gracias | `/gracias.html`, `/gracias-empresas.html` | Confirmación |

### Contenedor del alumno

`assets/gtm.js` carga el contenedor de cada alumno sin tocar el código:

- Lee `?gtm=GTM-XXXXXXX` de la URL y lo guarda en `localStorage` (`fandango_gtm_id`). `?gtm=reset` lo borra.
- Si hay ID, inyecta el fragmento oficial de GTM (`dataLayer` inicializado antes).
- Muestra una barra fija discreta: «Contenedor: GTM-XXXXXXX» o «Sin contenedor: añade ?gtm=GTM-XXXXXXX a la URL».

### Catálogo

| item_id | item_name | item_category | price |
| --- | --- | --- | --- |
| ETI-250 | Café Etiopía Yirgacheffe 250 g | Origen único | 14.50 |
| COL-250 | Café Colombia Huila 250 g | Origen único | 12.90 |
| BRA-250 | Café Brasil Cerrado 250 g | Origen único | 11.50 |
| FAN-1KG | Blend Fandango 1 kg | Blend | 32.00 |
| SUB-MES | Suscripción mensual Fandango | Suscripción | 24.00 |

Moneda: `EUR`. `transaction_id`: `FAN-` + timestamp.

### Pushes al dataLayer

Antes de cada evento de ecommerce: `dataLayer.push({ ecommerce: null });`

```js
dataLayer.push({ event: "view_item_list", ecommerce: { item_list_name: "Cafés", items: [/* catálogo sin la suscripción */] } });
dataLayer.push({ event: "view_item", ecommerce: { currency: "EUR", value: 14.50, items: [{ item_id: "ETI-250", item_name: "Café Etiopía Yirgacheffe 250 g", item_category: "Origen único", price: 14.50, quantity: 1 }] } });
dataLayer.push({ event: "add_to_cart", ecommerce: { currency: "EUR", value: 14.50, items: [ /* ítem con quantity */ ] } });
dataLayer.push({ event: "begin_checkout", ecommerce: { currency: "EUR", value: 29.00, items: [ /* carrito */ ] } });
dataLayer.push({ event: "purchase", ecommerce: { transaction_id: "FAN-1700000000000", currency: "EUR", value: 29.00, items: [ /* carrito */ ] } });
dataLayer.push({ event: "purchase", ecommerce: { transaction_id: "FAN-1700000000001", currency: "EUR", value: 24.00, items: [{ item_id: "SUB-MES", item_name: "Suscripción mensual Fandango", item_category: "Suscripción", price: 24.00, quantity: 1 }] } });
```

La suscripción se distingue del pedido suelto por `item_category` dentro de `items` (`Suscripción` frente a `Origen único` o `Blend`). Es lo mismo que envía WooCommerce con GTM4WP, y GA4 lo muestra en sus informes de ecommerce (Categoría del artículo) sin dimensiones personalizadas.

## Contenedores de GTM

Cinco archivos JSON importables (Administrar > Importar contenedor), formato de exportación de GTM (`exportFormatVersion: 2`). La lista completa está en `gtm/README.md`:

- `gtm/wp-tags-base.json`: **tu punto de partida**. Lo importas en el contenedor de tu WordPress con GTM4WP (ver `gtm4wp.md`).
- `gtm/wp-solucion-ecommerce.json` y `gtm/wp-solucion-leadgen.json`: soluciones de referencia para WordPress.
- `gtm/fandango-inicio.json` y `gtm/fandango-solucion.json`: la demo del profesor sobre la web de Café Fandango. Se describen a continuación.

### `gtm/fandango-inicio.json` (punto de partida de la demo del profesor)

- Variable constante `Const - GA4 ID` con valor `G-XXXXXXXXXX` (se cambia por el ID real).
- Etiqueta `GA4 - Google tag` (tipo Etiqueta de Google) con `{{Const - GA4 ID}}`, activador Inicialización: todas las páginas.
- Variables integradas activadas: Page URL, Page Path, Page Hostname, Referrer, Event, Click Element, Click ID, Click Classes, Click Text, Click URL, Form ID, Form Element, Form Classes, Scroll Depth Threshold, Scroll Direction.
- Variables de capa de datos: `dlv - ecommerce.value`, `dlv - ecommerce.currency`, `dlv - ecommerce.transaction_id`, `dlv - ecommerce.items`.
- Sin activadores ni etiquetas de evento: se construyen en la demo.

### `gtm/fandango-solucion.json` (referencia del profesor)

Todo lo anterior más, por cada fila de `plan/matriz.csv`, su activador y su etiqueta `GA4 - evento - <nombre>`:

| Etiqueta | Tipo | Activador | Parámetros |
| --- | --- | --- | --- |
| GA4 - evento - view_item_list | Evento de GA4, enviar datos de ecommerce desde dataLayer | `CE - view_item_list` | (ecommerce) |
| GA4 - evento - view_item | ídem | `CE - view_item` | (ecommerce) |
| GA4 - evento - add_to_cart | ídem | `CE - add_to_cart` | (ecommerce) |
| GA4 - evento - begin_checkout | ídem | `CE - begin_checkout` | (ecommerce) |
| GA4 - evento - purchase | ídem | `CE - purchase` | (ecommerce; la suscripción se ve por `item_category`) |
| GA4 - evento - page_read | Evento de GA4 | `Scroll - 75 % guía` (vertical 75 %, Page Path contiene `/guia`) | `percent_scrolled` = `{{Scroll Depth Threshold}}`, `page_path` = `{{Page Path}}` |
| GA4 - evento - timer_5s | Evento de GA4 | `Timer - 5 s ficha` (temporizador, intervalo 5000 ms, límite 1, Page Path contiene `/producto`) | `page_path` = `{{Page Path}}` |
| GA4 - evento - cta_click | Evento de GA4 | `Clic - CTA suscribirme hero` (todos los elementos, Click ID igual a `cta-suscribirme-hero`) | `element_id` = `{{Click ID}}`, `element_text` = `{{Click Text}}` |
| GA4 - evento - generate_lead | Evento de GA4 | `Form - B2B` (envío de formulario, esperar etiquetas 2000 ms, Form ID igual a `form-b2b`) | `lead_type` = `b2b`, `form_id` = `{{Form ID}}` |

El temporizador sustituye a la medición de vídeo: la medición mejorada de GA4 ya envía eventos de vídeo y scroll al 90 %, y nuestros nombres (`timer_5s`, `page_read`) no chocan con ellos.

El Meta Pixel no va en los JSON: se añade desde la galería de plantillas de la comunidad (Facebook Pixel by Stape). Cómo hacerlo: https://stape.io/blog/add-facebook-pixel-gtm

## Convención de nombres

- Etiquetas: `<Herramienta> - <tipo> - <evento>` (`GA4 - evento - purchase`, `Meta - PageView`).
- Activadores: `<Tipo> - <qué>` (`CE - purchase`, `Clic - CTA suscribirme hero`, `Form - B2B`).
- Variables: `dlv - <clave>`, `Const - <qué>`.
- Eventos y parámetros: `snake_case`, eventos recomendados de GA4 cuando existen.

## UTMs

| Origen | utm_source | utm_medium | utm_campaign | utm_content |
| --- | --- | --- | --- | --- |
| Newsletter | newsletter | email | 2026-11_lanzamiento-etiopia | boton-hero |
| Post de Instagram | instagram | social | 2026-11_lanzamiento-etiopia | carrusel |
| Anuncio de Meta | facebook | paid_social | {{campaign.name}} | {{ad.name}} |
