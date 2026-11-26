# Contenedores de GTM

Contenedores de Google Tag Manager en formato de exportación (`exportFormatVersion: 2`). Los de Café Fandango siguen la sección «Contenedores de GTM» de `../especificacion.md` y la matriz `../plan/ejemplos/matriz-cafe-fandango.csv`; los de WordPress siguen `../gtm4wp.md`.

| Archivo | Para quién | Qué es |
| --- | --- | --- |
| `wp-tags-base.json` | **Alumno** | Punto de partida para su WordPress con GTM4WP: Google tag, variables de GTM4WP, variables integradas y el activador `Timer - 5 s`. Sin etiquetas de evento. **Es el que importa el alumno.** |
| `wp-tags-eventos.json` | **Alumno** | Complemento que se combina encima de la base: una etiqueta de GA4 por evento de la clase (sin parámetros) con su activador. Sin variables ni Google tag. |
| `wp-solucion-ecommerce.json` | Profesor | Referencia para una tienda WooCommerce: la base más las etiquetas de la matriz de Café Fandango que GTM4WP puede producir. |
| `wp-solucion-leadgen.json` | Profesor | Referencia para una web de captación con Contact Form 7: la base más una etiqueta y un activador por fila de `../plan/ejemplos/matriz-clinica-dental.csv`. |
| `fandango-inicio.json` | Profesor (demo) | Punto de partida sobre la web demo de Café Fandango: Google tag y variables. Sin activadores ni etiquetas de evento. |
| `fandango-solucion.json` | Profesor (demo) | `fandango-inicio.json` más los 9 activadores y las 9 etiquetas de evento que cubren las 10 filas de `../plan/ejemplos/matriz-cafe-fandango.csv`. |
| `validar.py` | Quien toque los JSON | Comprueba la estructura de tu contenedor y, sin argumentos, los seis archivos del kit contra la especificación, su matriz o su base. |

Las soluciones son referencias para corregir y comparar, no para que el alumno las importe en su contenedor de trabajo: el ejercicio es construir las etiquetas a partir de su propia matriz.

> **Aviso:** si GTM rechaza la importación de alguno de estos archivos, avisa al profesor.

## Cómo importar un contenedor

1. Crea un contenedor web vacío en tu cuenta de GTM (o usa uno de pruebas). En WordPress, es el `GTM-XXXXXXX` que pegas en GTM4WP.
2. Ve a **Administrar > Importar contenedor** (*Admin > Import Container*).
3. En **Elegir el archivo del contenedor**, sube el JSON (el alumno, `wp-tags-base.json`).
4. En **Elegir espacio de trabajo**, elige **Nuevo** y llámalo, por ejemplo, `Base WordPress`. Así, si algo sale mal, borras el espacio de trabajo y no tocas nada más.
5. En **Elegir una opción de importación**:
   - **Combinar** (*Merge*) suma lo importado a lo que ya tiene el contenedor. Es la opción correcta casi siempre. Si hay elementos con el mismo nombre, elige **Cambiar el nombre de etiquetas, activadores y variables en conflicto** (*Rename conflicting tags, triggers and variables*) para no perder nada.
   - **Sobrescribir** (*Overwrite*) borra todo lo que tenga el espacio de trabajo y deja solo lo importado. Úsala solo en un contenedor vacío o de pruebas.
6. Revisa la vista previa de cambios (cuántas etiquetas, activadores y variables se añaden) y pulsa **Confirmar**.

Todos los archivos traen `GA4 - Google tag` menos `wp-tags-eventos.json`. No combines dos de los que la traen en el mismo espacio de trabajo: duplicarías la Google tag y cada página contaría dos veces. La única combinación prevista es `wp-tags-base.json` y, encima, `wp-tags-eventos.json`.

## Cambiar el ID de GA4

Cada contenedor trae el ID de medición falso `G-XXXXXXXXXX`. Sin cambiarlo no llega nada a GA4.

1. En GA4: **Administrar > Flujos de datos > tu flujo web**, copia el **ID de medición** (empieza por `G-`).
2. En GTM: **Variables > Const - GA4 ID**, pega tu ID en **Valor** y guarda.

Todas las etiquetas leen el ID de esa variable, así que solo se cambia en un sitio.

## WordPress + GTM4WP: `wp-tags-base.json` (el del alumno)

Para el proyecto de cada alumno en su WordPress con el plugin GTM4WP (tienda WooCommerce o web de captación con Contact Form 7). Qué activar en el plugin y qué empuja al dataLayer: `../gtm4wp.md`.

Qué trae:

- Etiqueta `GA4 - Google tag` con `{{Const - GA4 ID}}`, activada en **Initialization - All Pages**.
- Variables de capa de datos de las claves de GTM4WP: `dlv - ecommerce.value`, `dlv - ecommerce.currency`, `dlv - ecommerce.transaction_id`, `dlv - ecommerce.items` (WooCommerce) y `dlv - formid`, `dlv - formname` (Contact Form 7).
- Variables integradas de página, clic, formulario, scroll y vídeo (estas últimas para los *Media events* de GTM4WP).
- Activador `Timer - 5 s` (Temporizador, 5000 ms, límite 1, activo en todas las páginas) para la microconversión `timer_5s`. Para medirla solo en algunas páginas, cambia su condición **Habilitar este activador cuando** (por ejemplo, Page Path contiene `/tratamientos/`).

No trae etiquetas de evento: el alumno las construye a partir de su matriz con la tabla de correspondencias de `../gtm4wp.md`.

## Plantilla de eventos: `wp-tags-eventos.json`

Una etiqueta de evento de GA4 por cada evento de la clase, ya conectada a su activador. Las etiquetas solo llevan el nombre del evento, sin parámetros: los añades tú si tu matriz los pide.

| Etiqueta | Activador | Condición |
| --- | --- | --- |
| GA4 - evento - view_item_list | `CE - view_item_list` (evento personalizado) | event = `view_item_list`; ecommerce desde el dataLayer |
| GA4 - evento - view_item | `CE - view_item` | event = `view_item`; ecommerce desde el dataLayer |
| GA4 - evento - add_to_cart | `CE - add_to_cart` | event = `add_to_cart`; ecommerce desde el dataLayer |
| GA4 - evento - begin_checkout | `CE - begin_checkout` | event = `begin_checkout`; ecommerce desde el dataLayer |
| GA4 - evento - purchase | `CE - purchase` | event = `purchase`; ecommerce desde el dataLayer |
| GA4 - evento - page_read | `Scroll - 75 %` (profundidad de desplazamiento vertical, 75 %) | Todas las páginas |
| GA4 - evento - timer_5s | `Timer - 5 s` (el de la base: 5000 ms, límite 1) | Todas las páginas |
| GA4 - evento - cta_click | `Clic - CTA` (todos los elementos) | Click Element coincide con el selector CSS `.cta-principal, .cta-principal *` |
| GA4 - evento - generate_lead | `Form - Envío de formulario` (envío de formulario de GTM, sin esperar etiquetas ni comprobar la validación) | Todos los formularios |
| GA4 - evento - phone_click | `Clic - Teléfono` (solo enlaces) | Click URL empieza por `tel:` |
| GA4 - evento - whatsapp_click | `Clic - WhatsApp` (solo enlaces) | Click URL coincide con la expresión regular `wa\.me\|api\.whatsapp\.com` |

«Ecommerce desde el dataLayer» es la casilla **Enviar datos de comercio electrónico** de la etiqueta, no un parámetro: sin ella, `purchase` llega a GA4 sin importe ni ID de transacción.

Cómo importarla:

1. Importa antes `wp-tags-base.json` (pasos de arriba).
2. Importa `wp-tags-eventos.json` en **el mismo espacio de trabajo** con **Combinar**.
3. No trae variables ni Google tag: tu `Const - GA4 ID` con tu ID de GA4, tus variables y tu Google tag no cambian. Las etiquetas leen el ID de tu `Const - GA4 ID`.

Qué adaptar:

- Pon la clase `cta-principal` al botón principal en el editor de WordPress (en el bloque Botón, **Avanzado > Clase(s) CSS adicional(es)**). Vale en el botón o en su bloque contenedor: el selector cubre los dos.
- `Timer - 5 s` y `Scroll - 75 %` miden en todas las páginas. Si solo te interesan algunas, cambia en `Timer - 5 s` la condición **Habilitar este activador cuando** y en `Scroll - 75 %` elige **Algunas páginas** (por ejemplo, Page Path contiene `/tratamientos/`).
- `Form - Envío de formulario` se activa con cada envío de cualquier formulario de la web, también con los que el plugin del formulario rechaza después (un campo obligatorio vacío, un email mal escrito). Para quedarte con uno, elige **Algunos formularios** y filtra por Form ID o por Page Path. Con Contact Form 7, el evento `gtm4wp.contactForm7MailSent` (como en `wp-solucion-leadgen.json`) solo cuenta los envíos correctos.

Avisos al combinar:

- GTM detecta los conflictos por nombre. Si ya habías creado una etiqueta o un activador con uno de estos nombres, la vista previa lo marca como conflicto: elige **Cambiar el nombre de etiquetas, activadores y variables en conflicto** y borra después la etiqueta repetida, o el evento contará dos veces.
- Lo mismo pasa si habías cambiado `Timer - 5 s` (por ejemplo, su condición de página). Si no lo tocaste, es idéntico al de la base y no aparece como conflicto.

## Soluciones de WordPress (referencia del profesor)

Las dos parten de `wp-tags-base.json` tal cual (mismas variables y la misma Google tag); solo cambian la condición de `Timer - 5 s` y añaden activadores y etiquetas.

### `wp-solucion-ecommerce.json`: Café Fandango en WooCommerce

| Etiqueta | Activador | Parámetros |
| --- | --- | --- |
| GA4 - evento - view_item_list | `CE - view_item_list` (evento personalizado, event = `view_item_list`) | ecommerce desde el dataLayer |
| GA4 - evento - view_item | `CE - view_item` | ecommerce desde el dataLayer |
| GA4 - evento - add_to_cart | `CE - add_to_cart` | ecommerce desde el dataLayer |
| GA4 - evento - begin_checkout | `CE - begin_checkout` | ecommerce desde el dataLayer |
| GA4 - evento - purchase | `CE - purchase` | ecommerce desde el dataLayer |
| GA4 - evento - page_read | `Scroll - 75 % guía` (vertical 75 %, Page Path contiene `/guia`) | `percent_scrolled`, `page_path` |
| GA4 - evento - timer_5s | `Timer - 5 s` (5000 ms, límite 1, habilitado cuando Page Path contiene `/producto/`) | `page_path` |
| GA4 - evento - cta_click | `Clic - CTA suscribirme hero` (todos los elementos, Click ID igual a `cta-suscribirme-hero`) | `element_id`, `element_text` |

Lo que no cubre, a propósito:

- **Suscripción frente a pedido suelto.** Una sola etiqueta `purchase` cubre las filas 8 y 9 de la matriz. Se distinguen por `item_category` dentro de `items` (`Suscripción` frente a `Origen único` o `Blend`), que WooCommerce envía con GTM4WP; en GA4 se ve en los informes de ecommerce por Categoría del artículo.
- **`generate_lead` (fila 10, formulario B2B).** Es captación, no ecommerce: el patrón con Contact Form 7 está en `wp-solucion-leadgen.json`.
- Ajusta a la tienda real el slug de la guía (`/guia`), la base de URL de producto (`/producto/`, en **Ajustes > Enlaces permanentes**) y el ID del botón del hero.

### `wp-solucion-leadgen.json`: Clínica Dental Alameda

| Etiqueta | Activador | Parámetros |
| --- | --- | --- |
| GA4 - evento - cta_click | `Clic - Pedir cita` (solo enlaces, Click URL contiene `/pedir-cita`) | `element_text`, `link_url` |
| GA4 - evento - page_read | `Scroll - 75 % implantes` (vertical 75 %, Page Path contiene `/tratamientos/implantes`) | `percent_scrolled`, `page_path` |
| GA4 - evento - timer_5s | `Timer - 5 s` (5000 ms, límite 1, habilitado cuando Page Path contiene `/tratamientos/`) | `page_path` |
| GA4 - evento - generate_lead | `CE - CF7 Pedir cita` (evento personalizado `gtm4wp.contactForm7MailSent`, con `{{dlv - formname}}` igual a `Pedir cita`) | `lead_type` = `cita`, `form_id` = `{{dlv - formid}}` |
| GA4 - evento - phone_click | `Clic - Teléfono` (solo enlaces, Click URL empieza por `tel:`) | `page_path` |
| GA4 - evento - whatsapp_click | `Clic - WhatsApp` (solo enlaces, Click URL coincide con la expresión regular `wa\.me\|api\.whatsapp\.com`) | `page_path` |

`generate_lead` usa el evento del plugin y no el activador **Envío de formulario** de GTM, porque Contact Form 7 envía sin recargar y solo `MailSent` confirma un envío correcto. Ninguna etiqueta lee `inputs`: lleva lo que escribe el paciente. `formname` es el título del formulario en Contact Form 7; si la clínica lo llama de otra forma, cambia la condición.

## Café Fandango sobre la web demo

`fandango-inicio.json` trae la Google tag, `Const - GA4 ID`, las variables de capa de datos `dlv - ecommerce.value`, `dlv - ecommerce.currency`, `dlv - ecommerce.transaction_id`, `dlv - ecommerce.items` y las variables integradas Page URL, Page Path, Page Hostname, Referrer, Event, Click Element, Click ID, Click Classes, Click Text, Click URL, Form ID, Form Element, Form Classes, Scroll Depth Threshold y Scroll Direction.

`fandango-solucion.json` añade un activador y una etiqueta por fila de la matriz:

| Etiqueta | Activador | Parámetros |
| --- | --- | --- |
| GA4 - evento - view_item_list | `CE - view_item_list` (evento personalizado) | ecommerce desde el dataLayer |
| GA4 - evento - view_item | `CE - view_item` | ecommerce desde el dataLayer |
| GA4 - evento - add_to_cart | `CE - add_to_cart` | ecommerce desde el dataLayer |
| GA4 - evento - begin_checkout | `CE - begin_checkout` | ecommerce desde el dataLayer |
| GA4 - evento - purchase | `CE - purchase` | ecommerce desde el dataLayer |
| GA4 - evento - page_read | `Scroll - 75 % guía` (vertical 75 %, Page Path contiene `/guia`) | `percent_scrolled`, `page_path` |
| GA4 - evento - timer_5s | `Timer - 5 s ficha` (temporizador, 5000 ms, límite 1, habilitado cuando Page Path contiene `/producto`) | `page_path` |
| GA4 - evento - cta_click | `Clic - CTA suscribirme hero` (todos los elementos, Click ID igual a `cta-suscribirme-hero`) | `element_id`, `element_text` |
| GA4 - evento - generate_lead | `Form - B2B` (envío de formulario, esperar etiquetas 2000 ms, Form ID igual a `form-b2b`) | `lead_type` = `b2b`, `form_id` |

Una sola etiqueta `purchase` cubre las dos filas de compra de la matriz (pedido suelto y suscripción); las distingue `item_category` dentro de `items` (`Suscripción` en la suscripción).

## Cómo comparar con una solución

- **Sin importar nada:** abre la solución en un editor y busca por nombre la etiqueta o el activador que quieras revisar.
- **En GTM:** importa la solución en **otro espacio de trabajo nuevo** (por ejemplo, `Solución`) con **Combinar**. No la importes encima del trabajo del alumno: duplicaría la Google tag. Compara los dos espacios de trabajo y borra el de la solución al acabar, sin publicarlo.
- **En la web:** con **Vista previa** (Tag Assistant) recorre la web y comprueba que cada evento de la matriz dispara su etiqueta y llega a DebugView con sus parámetros.

## Validar los JSON

Desde la raíz del repositorio, con tu contenedor:

```bash
python3 gtm/validar.py gtm/<proyecto>.json
```

Solo usa la librería estándar de Python 3: no hay que instalar nada. Con tu archivo comprueba la estructura: JSON válido con `exportFormatVersion: 2`, cada `firingTriggerId` apunta a un activador del archivo o a uno integrado de GTM, cada `{{variable}}` está definida o es una integrada activada, no hay IDs ni nombres repetidos, ninguna variable lee `inputs` y la Google tag usa `{{Const - GA4 ID}}`. No lo compara con tu matriz, porque `validar.py` no la conoce: esa comparación la haces tú (plantilla 8.3 del paso 8).

Sin argumentos (`python3 gtm/validar.py`) no mira tu contenedor: comprueba los seis archivos del kit. Además de la estructura:

- `fandango-inicio.json` y `wp-tags-base.json`: traen las variables que piden la especificación y `../gtm4wp.md`, sin etiquetas de evento; la base solo trae `Timer - 5 s` (5000 ms, límite 1, todas las páginas). Los de Fandango no llevan variables integradas que la especificación no pida (las de vídeo, por ejemplo).
- `wp-tags-eventos.json`: simula la combinación sobre `wp-tags-base.json`. Lo que se llame igual que en la base debe ser idéntico (si no, GTM sobrescribiría o renombraría lo del alumno), no trae variables ni Google tag, y la estructura se comprueba sobre el resultado combinado. Trae exactamente las etiquetas de la tabla de arriba, cada una `gaawe` con su `eventName`, `{{Const - GA4 ID}}` y sin parámetros, con ecommerce solo en los cinco eventos de ecommerce, y activada solo por su activador con su tipo y sus condiciones.
- Cada solución contra su matriz: por fila, su etiqueta `GA4 - evento - <evento>`, su activador con el tipo y las condiciones de la matriz (en los temporizadores, 5000 ms y límite 1) y sus parámetros; y ninguna etiqueta de evento que no salga de la matriz. `fandango-solucion.json` y `wp-solucion-ecommerce.json` se miden contra la matriz de Café Fandango, `../plan/ejemplos/matriz-cafe-fandango.csv` (la de WooCommerce sin la fila 10); `wp-solucion-leadgen.json`, contra `../plan/ejemplos/matriz-clinica-dental.csv`.

La comprobación sin argumentos no lee `../plan/matriz.csv`, que es la de tu proyecto: puedes reescribirla sin que fallen las soluciones de ejemplo.

Trabajar el repositorio con IA (que la IA lea y escriba estos archivos y ejecute el validador) necesita un agente que trabaje sobre la carpeta, por ejemplo Claude Code, Codex, Cursor o Gemini CLI, no el chat web.

## Detalles del formato

- Los IDs de cuenta y de contenedor (`6000000000`, `200000000`, `GTM-XXXXXXX`) son de relleno. GTM los ignora al importar y usa los del contenedor de destino.
- `2147479573` es el ID fijo que GTM usa en sus exportaciones para el activador integrado **Initialization - All Pages**. No aparece en la lista de activadores porque viene de serie.
- En los temporizadores, la condición de página va en **Habilitar este activador cuando** (`autoEventFilter`) y no hay condición de disparo: se activa con todos los temporizadores que arrancan en esas páginas.
- El activador `Form - B2B` lleva **Esperar a las etiquetas** activado. GTM obliga entonces a rellenar **Habilitar este activador cuando**; se ha puesto `Page URL` coincide con la expresión regular `.*` (todas las páginas), como en la exportación de mashmetrics citada abajo.
- Los activadores **Clic - Solo enlaces** de la clínica no esperan a las etiquetas, como en la exportación de govau: un enlace `tel:` o `wa.me` no abandona la página antes de que salga el evento. El de «Pedir cita» sí navega; si en la Vista previa se pierde el evento, activa **Esperar a las etiquetas**.

## Fuentes

La estructura de los JSON (claves, tipos de parámetro, IDs de activadores integrados) copia estas exportaciones reales publicadas en GitHub:

- Stape, `stape-io/shopify-gtm-container-templates`, `ga4-gads-web.json` (exportado en 2024): Etiqueta de Google (`googtag`) en `2147479573`, etiquetas de evento de GA4 (`gaawe`) con `eventSettingsTable` y `measurementIdOverride`, variables de capa de datos y constantes, lista completa de `builtInVariable` (clic, formulario, vídeo, scroll).
- Addingwell, `addingwell/gtm-container-web-shopify`, `template.json` (2025): etiquetas `gaawe` con `sendEcommerceData` y `getEcommerceDataFrom: dataLayer`, con y sin `eventSettingsTable`.
- Gobierno de Australia, `govau/gtm-base-container`, `GTM-THSPTLX_v15.json` (2021): activadores `TIMER` (`gtm.timer`, `interval`, `limit`, condición en `autoEventFilter`), `LINK_CLICK` (`tel:`, `STARTS_WITH`, `MATCH_REGEX` sobre `{{Click URL}}`), `SCROLL_DEPTH`, `FORM_SUBMISSION`, `CLICK` y `CUSTOM_EVENT` con `{{_event}}`.
- WodenWang820118, `WodenWang820118/gtm-config-generator`, `GTM-NBMX2DWS_v15.json` (2024): `googtag` reciente.
- mashmetrics, `mashmetrics/gtm_mashmetrics`, `GTM-N5XDHXD_workspace36.json` (2019): `waitForTags` activado con `autoEventFilter`, y `FORM_SUBMISSION`.
- karolk95, `karolk95/shopify-customer-events-plain`, `GTM-recipe.json` (2024): `googtag` mínima en `2147479573` y `gaawe` de ecommerce desde el dataLayer.
