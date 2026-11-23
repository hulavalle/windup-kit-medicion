# GTM4WP: Google Tag Manager en WordPress

Versión revisada: **GTM4WP 2.1.1** (publicada el 5 de noviembre de 2026; requiere WordPress 6.3 y PHP 8.0). Comprobado el 21 de noviembre de 2026 contra la ficha de wordpress.org, la documentación de gtm4wp.com y el código del propio plugin (versión 2.1.1). Si instalas otra versión, revisa el registro de cambios: la 2.0 fue una reescritura completa y eliminó funciones que muchos tutoriales antiguos siguen explicando.

## Qué es

GTM4WP es un plugin gratuito de WordPress que hace dos cosas:

1. **Instala el contenedor de GTM** en todas las páginas: pega el fragmento de `<head>` y el `<noscript>` del `<body>` sin tocar el tema.
2. **Rellena el dataLayer** con datos de WordPress (tipo de página, categorías, usuario conectado), con los eventos de ecommerce de GA4 de WooCommerce y con eventos de formularios de Contact Form 7, entre otras integraciones.

El plugin **no crea etiquetas en GTM ni envía nada a GA4**. Deja los datos en el dataLayer; las etiquetas y los activadores los construyes tú en GTM, igual que con la web demo de Café Fandango. La diferencia es que en la web demo los `dataLayer.push` los escribió un desarrollador y en WordPress los escribe el plugin.

## Instalar el plugin y pegar el ID del contenedor

1. En WordPress: **Plugins > Añadir nuevo plugin**, busca «GTM4WP», pulsa **Instalar ahora** y después **Activar**. El nombre en el directorio es «GTM4WP – A Google Tag Manager (GTM) plugin for WordPress».
2. Ve a **Ajustes > Google Tag Manager**. La pantalla tiene un menú a la izquierda con una entrada por módulo (*Google Tag Manager container*, *Page variables*, *WooCommerce*, *Contact Form 7*, *User events*, *Media events*, *Consent mode & consent tools*…). Los nombres de los ajustes de esta guía están en inglés, como en el plugin; si WordPress lo muestra traducido, búscalos por su sitio.
3. En **Google Tag Manager container**, añade una fila a la tabla de contenedores y escribe tu **Container ID** con el formato `GTM-XXXXXXX` (lo ves arriba a la derecha en GTM). Es el único campo obligatorio; *Environment gtm_auth/gtm_preview*, *Custom domain* y *Custom path* se dejan vacíos.
4. Elige **Container code placement** (dónde va el `<noscript>`; el script principal va siempre en el `<head>`):
   - **Automatically after the opening body tag (theme must support wp_body_open)**: la opción buena si tu tema la admite, y la mayoría de temas actuales lo hacen.
   - **Footer of the page**: la opción por defecto. Funciona con cualquier tema, pero no permite verificar Search Console con el contenedor.
   - **Manually coded after the opening body tag**: para temas antiguos; hay que llamar a `gtm4wp_the_gtm_tag()` en la plantilla.
   - **Off - container code turned off, data layer only**: solo si otro sistema carga ya el contenedor y quieres el dataLayer del plugin.
5. Guarda. Abre la web en una ventana de incógnito y ejecuta **Vista previa** en GTM: Tag Assistant debe conectar y, en la pestaña *Data Layer*, deben aparecer las variables del plugin.

## Ajustes que activar

### En cualquier web

| Módulo | Ajuste | Valor | Por qué |
| --- | --- | --- | --- |
| Google Tag Manager container | Container ID | `GTM-XXXXXXX` | Carga tu contenedor |
| Google Tag Manager container | Container code placement | *Automatically after the opening body tag* (o *Footer* si el tema no lo admite) | Ver paso 4 |
| Google Tag Manager container | User roles to exclude | Ninguno en clase; *Administrator* en producción | Si excluyes a los administradores, la Vista previa no funciona mientras estés conectado como administrador: prueba en incógnito |
| Page variables | Posttype, Category list, Tags, Post author name | Activados (vienen así de serie) | Dan `pagePostType`, `pageCategory`, `pageAttributes`, `pagePostAuthor` |
| Page variables | Logged in user email, Visitor IP, Post custom fields (meta) | **Desactivados** | Ponen datos personales (o cualquier campo personalizado) en el dataLayer, al alcance de cualquier etiqueta |

### E-commerce (WooCommerce, Café Fandango)

| Módulo y grupo | Ajuste | Valor | Por qué |
| --- | --- | --- | --- |
| WooCommerce > General | **Track e-commerce** | Activado | Interruptor general. Sin él, el plugin no empuja ningún evento de ecommerce (viene desactivado) |
| WooCommerce > Advanced | Clear ecommerce object before new event | Activado | Empuja `{ ecommerce: null }` antes de cada evento, como recomienda Google y como hace la web demo |
| WooCommerce > Purchase tracking | Order statuses that trigger the purchase event | Por defecto: *Processing*, *On hold*, *Completed* | La compra cuenta al hacer el pedido, no al cobrarse: una transferencia (*On hold*) cuenta en el momento |
| WooCommerce > Purchase tracking | Exclude tax from revenue / Exclude shipping from revenue | Desactivados salvo que el negocio decida otra cosa | Con los dos desactivados, `value` es el total del pedido con impuestos y envío. Decídelo una vez: cambiarlo rompe la comparación con datos anteriores |
| WooCommerce > Purchase tracking | Reliable purchase tracking | Activado si faltan compras | Si la pasarela (PayPal y similares) no devuelve al cliente a la página de pedido recibido, emite el `purchase` en la siguiente página que vea |
| WooCommerce > Product data | Use SKU instead of ID | Según el catálogo | `item_id` será el SKU en vez del ID interno de WordPress. Útil si el feed de Merchant Center usa SKU |
| WooCommerce > Data layer content | Customer data in data layer / Order data in data layer | **Desactivados** | Añaden nombre, email, teléfono y dirección del comprador (en claro en `orderData`, con hash en `user_data`). Solo para conversiones mejoradas de Google Ads, con consentimiento |

### Captación de leads (Contact Form 7, clínica dental)

| Módulo | Ajuste | Valor | Por qué |
| --- | --- | --- | --- |
| Contact Form 7 | **Contact Form 7** | Activado | Empuja un evento `gtm4wp.contactForm7*` por cada envío y su resultado (viene desactivado) |
| Contact Form 7 | **Submitted field values in the data layer** | **None** (o *Field names only*) | El valor por defecto es *Full*: nombre, email, teléfono y mensaje del paciente acaban en el dataLayer. Ver «Avisos» |
| Contact Form 7 | Also push GA4 recommended events | Desactivado en clase | Añade `form_start`, `form_submit` y `generate_lead` al dataLayer. En clase construimos `generate_lead` nosotros a partir de `gtm4wp.contactForm7MailSent`; con los dos a la vez es fácil contar doble |
| Contact Form 7 | Report the form name in the default language | Solo en webs multidioma (WPML, Polylang) | El mismo formulario traducido sale con un solo nombre |

Si la clínica usa otro plugin de formularios (Gravity Forms, WPForms, Elementor Forms…), GTM4WP 2.1.1 no lo integra: necesitas el evento de ese plugin o el activador **Envío de formulario** de GTM, y probar que solo salta cuando el envío es correcto.

### Lo que GTM4WP ya no hace (y cómo se hace en GTM)

| Necesidad | En GTM4WP 2.1.1 | Qué usar |
| --- | --- | --- |
| Scroll | Eliminado en la versión 2.0 | Activador **Profundidad de desplazamiento** de GTM |
| Vídeos de YouTube | Eliminado en la versión 2.1 (el plugin ya no añade `enablejsapi` a los vídeos) | Activador **Vídeo de YouTube** de GTM con **Añadir compatibilidad con la API de JavaScript a todos los vídeos de YouTube** marcado |
| Clics (botones, `tel:`, WhatsApp, enlaces externos) | No tiene eventos de clic | Activadores **Clic - Todos los elementos** o **Clic - Solo enlaces** con las variables integradas *Click* |
| Tiempo en página | No lo mide | Activador **Temporizador** de GTM (ya viene en `gtm/wp-tags-base.json`) |

### Otras integraciones útiles

- **Media events**: eventos `gtm4wp.mediaPlayerReady`, `gtm4wp.mediaPlayerStateChange` y `gtm4wp.mediaPlaybackPercentage` para Vimeo, vídeo y audio HTML5, Wistia, JW Player, VideoPress y otros (no YouTube). Rellenan las variables integradas *Video* de GTM.
- **User events**: *Form fill events* (`gtm4wp.formElementEnter` / `gtm4wp.formElementLeave`, con `inputID`, `inputName`, `formID`, `formName`…) para estudiar en qué campo se abandona un formulario. Genera dos eventos por campo; actívalo solo si vas a usarlo. *User logged in* y *New user registration* empujan `gtm4wp.userLoggedIn` y `gtm4wp.userRegistered`.
- **Consent mode & consent tools**: envía el comando `default` de Google Consent Mode v2 con los permisos que marques, y conecta con Cookiebot, CookieYes y Axeptio. Ver «Avisos».

## Qué empuja al dataLayer

### Variables de página (en cada carga)

Con los ajustes por defecto: `pagePostType` (`post`, `page`, `product`…), `pagePostType2` (por ejemplo `single-post`, `category-post`), `pageCategory` (slugs de categoría), `pageAttributes` (slugs de etiqueta) y `pagePostAuthor`. En la ficha de un producto de WooCommerce, además, `productType`, `productIsVariable`, `productRatingCounts`, `productAverageRating` y `productReviewCount`. Se leen con una variable de capa de datos con el mismo nombre.

### WooCommerce: eventos de ecommerce de GA4

El plugin usa los nombres de evento recomendados de GA4. El valor de `event` es exactamente el nombre del evento, así que los activadores de evento personalizado de Café Fandango (`CE - view_item`, `CE - purchase`…) sirven tal cual. Todos los datos van dentro del objeto `ecommerce`.

| Evento (`event`) | Cuándo se empuja | Claves dentro de `ecommerce` |
| --- | --- | --- |
| `view_item_list` | Al cargar un listado: tienda, categoría, bloques de colección de productos, relacionados, ventas cruzadas | `currency`, `items`. Sin `value`. El nombre de la lista va en cada ítem (`items[].item_list_name`, `item_list_id`, `index`). Se parte en varios envíos de 10 productos (ajuste *Products per impression*) |
| `select_item` | Clic en un producto de un listado | `currency`, `items` |
| `view_item` | Al cargar la ficha de un producto simple; en un producto variable, al elegir variación (o al cargar, con *Fire view_item on parent product*) | `currency`, `value`, `items` |
| `add_to_cart` | Botón de añadir (ficha o listado), subir la cantidad en el carrito, bloques de carrito, «Deshacer» tras quitar | `currency`, `value`, `items` (con `quantity`) |
| `remove_from_cart` | Quitar del carrito o del minicarrito, bajar la cantidad | `currency`, `value`, `items` |
| `view_cart` | Al cargar el carrito con productos | `currency`, `value`, `items` |
| `begin_checkout` | Al cargar la página de pago | `currency`, `value`, `items` |
| `add_shipping_info` | Al elegir método de envío en el pago | `currency`, `value`, `shipping_tier`, `items` |
| `add_payment_info` | Al elegir método de pago | `currency`, `value`, `payment_type`, `items` |
| `purchase` | En la página de pedido recibido, una sola vez por pedido (con *Reliable purchase tracking*, en la siguiente página si no llegó a la de pedido recibido) | `transaction_id`, `value`, `currency`, `tax`, `shipping`, `coupon`, `affiliation` (vacío), `items` |

Detalles del `purchase`:

- `ecommerce.transaction_id` es el **número de pedido** de WooCommerce (con el prefijo de *Transaction ID prefix*, si lo pones).
- `ecommerce.value` es el total del pedido; incluye impuestos y envío salvo que actives *Exclude tax/shipping from revenue*.
- `ecommerce.currency` es la moneda del pedido (`EUR`).
- Con *Customer data in data layer* activado aparece también `user_data` **fuera** de `ecommerce`: email, teléfono y nombre con hash SHA-256 y la dirección en claro.
- Los reembolsos no se ven en el navegador. El plugin puede enviarlos desde el servidor (*Google Data Manager*, experimental), fuera del alcance de esta clase.

Cada ítem de `items` lleva `item_id` (texto; el ID o el SKU), `item_name`, `price`, `quantity`, `item_category` (y `item_category2` a `item_category5` si hay subcategorías), `item_brand` (si eliges la taxonomía de marca), `item_variant` (variaciones), `sku`, `stocklevel`, `stockstatus`, `google_business_vertical` y un campo `id` para el remarketing de Google Ads.

En GTM, la etiqueta **Evento de GA4** con **Enviar datos de comercio electrónico** y fuente **Capa de datos** lee todo esto sin variables. Las variables `dlv - ecommerce.*` del contenedor base sirven para condiciones y para revisar valores en la Vista previa.

### Contact Form 7

Un evento por cada evento de Contact Form 7. Para la conversión, **`gtm4wp.contactForm7MailSent`**: el formulario se envió y el correo salió bien.

| Evento (`event`) | Cuándo |
| --- | --- |
| `gtm4wp.contactForm7BeforeSubmit` | Justo antes de enviar |
| `gtm4wp.contactForm7InvalidInput` | Campos con errores de validación |
| `gtm4wp.contactForm7Unaccepted` | Casilla de aceptación sin marcar |
| `gtm4wp.contactForm7SpamDetected` | Detectado como spam |
| `gtm4wp.contactForm7Aborted` | Envío cancelado |
| **`gtm4wp.contactForm7MailSent`** | Envío correcto: **el que cuenta como lead** |
| `gtm4wp.contactForm7MailFailed` | Se envió pero el correo falló |
| `gtm4wp.contactForm7Submitted` | Cada intento de envío, haya ido bien o mal (tras `MailSent` si fue bien) |

Todos llevan estas claves en el primer nivel del dataLayer (no dentro de un objeto):

| Clave | Contenido |
| --- | --- |
| `formid` | ID numérico del formulario en Contact Form 7 (o `(not set)`) |
| `formname` | Título del formulario en Contact Form 7, por ejemplo `Pedir cita`. Úsalo para distinguir formularios |
| `unittag` | Identificador de esa instancia del formulario en la página |
| `containerpostid` | ID de la página o entrada donde está el formulario |
| `locale` | Idioma del formulario, por ejemplo `es_ES` |
| `status` | Resultado según Contact Form 7, por ejemplo `mail_sent`, `validation_failed`, `spam`. Vacío en `BeforeSubmit` |
| `inputs` | Lista de campos enviados. Con *Full*, nombre y valor de cada campo; con *Field names only*, solo nombres; con *None*, vacía |

Con *Also push GA4 recommended events* activado, el plugin empuja además `form_start` (primer campo tocado, una vez por formulario y página), `form_submit` (cada intento, como `Submitted`) y `generate_lead` (envío correcto, como `MailSent`), con las claves `form_id`, `form_name`, `form_destination` y, en `form_submit` y `generate_lead`, `form_status`. No llevan `value` ni `currency`.

### Otros eventos del plugin

`gtm4wp.mediaPlayerReady`, `gtm4wp.mediaPlayerStateChange`, `gtm4wp.mediaPlaybackPercentage` (vídeo y audio, no YouTube), `gtm4wp.formElementEnter`, `gtm4wp.formElementLeave`, `gtm4wp.userLoggedIn`, `gtm4wp.userRegistered`, `gtm4wp.deviceData` (navegador, sistema y dispositivo) y, con el dataLayer seguro para caché, `gtm4wp.visitorData`, `gtm4wp.customerData` y `gtm4wp.cartData`. En esta clase no se usan.

## De la matriz de Café Fandango a WordPress con GTM4WP

Supón Café Fandango montada en WordPress con WooCommerce y Contact Form 7. Fila por fila de `plan/matriz.csv`:

| Fila | Evento GA4 | Activador con GTM4WP | Condición | De dónde salen los parámetros | Cambio respecto a la web demo |
| --- | --- | --- | --- | --- | --- |
| 1 | `view_item_list` | Evento personalizado `CE - view_item_list` | event = `view_item_list` | `ecommerce.items`; `item_list_name` va dentro de cada ítem | Ninguno en el activador. Puede llegar en varios envíos por página |
| 2 | `view_item` | Evento personalizado `CE - view_item` | event = `view_item` | `ecommerce.currency`, `ecommerce.value`, `ecommerce.items` | En productos variables salta al elegir variación |
| 3 | `add_to_cart` | Evento personalizado `CE - add_to_cart` | event = `add_to_cart` | ídem | También salta al subir cantidades en el carrito |
| 4 | `page_read` | Profundidad de desplazamiento `Scroll - 75 % guía` | 75 % vertical, Page Path contiene el slug de la guía (por ejemplo `/guia-v60`) | `{{Scroll Depth Threshold}}`, `{{Page Path}}` | El plugin no mide scroll: es el activador nativo, igual que en la demo |
| 5 | `timer_5s` | Temporizador `Timer - 5 s` (del contenedor base) | 5000 ms, límite 1; en **Habilitar este activador cuando**, Page Path contiene `/producto/` (la base de URL de producto de WooCommerce en español; compruébala en Ajustes > Enlaces permanentes) | `{{Page Path}}` | El plugin no mide tiempo: es el activador nativo. Si en GA4 quieres separar fichas de otras páginas, también puedes usar `{{dlv - pagePostType}}` = `product` (variable que crearías tú) |
| 6 | `cta_click` | Clic - Todos los elementos `Clic - CTA suscribirme hero` | Click ID = `cta-suscribirme-hero` | `{{Click ID}}`, `{{Click Text}}` | Hay que poner ese ID al botón en el editor (bloque Botón > Avanzado > Ancla HTML, o el campo ID del constructor). Comprueba en Vista previa si el ID queda en el enlace o en su contenedor; si queda en el contenedor, usa Click Element coincide con el selector CSS `#cta-suscribirme-hero a` |
| 7 | `begin_checkout` | Evento personalizado `CE - begin_checkout` | event = `begin_checkout` | `ecommerce.*` | Salta al cargar la página de pago |
| 8 | `purchase` (pedido suelto) | Evento personalizado `CE - purchase` | event = `purchase` | `ecommerce.transaction_id` (número de pedido), `value`, `currency`, `items` | Ítems con `item_category` distinto de `Suscripción` |
| 9 | `purchase` (suscripción) | El mismo `CE - purchase` | event = `purchase` | Como la fila 8 | La suscripción es el ítem con `item_category` = `Suscripción` (la categoría del producto en WooCommerce). En GA4: informes de ecommerce por Categoría del artículo |
| 10 | `generate_lead` | Evento personalizado `CE - CF7 enviado` | event = `gtm4wp.contactForm7MailSent` y `{{dlv - formname}}` = `Cafeterías` (el título del formulario) | `form_id` = `{{dlv - formid}}`, `lead_type` = `b2b` | Cambia el activador: el formulario de Contact Form 7 se envía sin recargar la página y el activador **Envío de formulario** de GTM no distingue un envío correcto de uno rechazado. Usa el evento del plugin |

Las etiquetas son las mismas de `gtm/README.md` (`GA4 - evento - <nombre>`, ecommerce desde la capa de datos). Solo cambian los activadores de las filas 4, 5 y 10.

## Matriz propuesta: Clínica Dental Alameda (captación de leads)

También en `plan/ejemplos/matriz-clinica-dental.csv`.

Una web de WordPress de una clínica dental: páginas de tratamientos bajo `/tratamientos/`, un formulario de Contact Form 7 titulado «Pedir cita», botón de llamada (`tel:`) y botón de WhatsApp. Mismas columnas que `plan/matriz.csv`:

| id | accion_negocio | tipo | evento_ga4 | parametros | activador_gtm | condicion | evento_clave | pregunta_de_negocio | contrapeso |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Clic en «Pedir cita» | micro | `cta_click` | `element_text`, `link_url` | Clic - Solo enlaces | Click URL contiene `/pedir-cita` | no | ¿Qué páginas empujan a pedir cita? | |
| 2 | Lee la página de un tratamiento (75 % de scroll) | micro | `page_read` | `percent_scrolled`, `page_path` | Profundidad de desplazamiento | 75 % vertical, Page Path contiene `/tratamientos/implantes` | no | ¿La información del tratamiento acerca a la cita? | |
| 3 | Pasa 5 s en una página de servicio | micro | `timer_5s` | `page_path` | Temporizador (`Timer - 5 s`) | Page Path contiene `/tratamientos/` | no | ¿Qué servicios retienen al visitante? | |
| 4 | Envía el formulario de cita | macro | `generate_lead` | `lead_type=cita`, `form_id` | Evento personalizado | event = `gtm4wp.contactForm7MailSent` y formname = `Pedir cita` | sí | ¿Qué canal trae pacientes? | al menos un 60 % de solicitudes acaban en cita confirmada |
| 5 | Pulsa el teléfono | macro | `phone_click` | `page_path` | Clic - Solo enlaces | Click URL empieza por `tel:` | sí | ¿Qué canal trae llamadas? | al menos un 80 % de llamadas atendidas |
| 6 | Pulsa WhatsApp | macro | `whatsapp_click` | `page_path` | Clic - Solo enlaces | Click URL coincide con la expresión regular `wa\.me\|api\.whatsapp\.com` | sí | ¿Qué canal trae conversaciones de WhatsApp? | al menos un 50 % de conversaciones con respuesta del paciente |

Notas para construirla:

- **Fila 1.** Si hay varios botones «Pedir cita» y solo quieres uno, añádele una clase en el editor (por ejemplo `cta-pedir-cita`) y usa Click Classes contiene `cta-pedir-cita`, o el selector CSS `.cta-pedir-cita a` si la clase queda en el contenedor del botón. `link_url` = `{{Click URL}}`, `element_text` = `{{Click Text}}`.
- **Fila 3.** `Timer - 5 s` viene en el contenedor base activo en todas las páginas, porque más de un negocio lo usa. Para la clínica, edita el activador y cambia **Habilitar este activador cuando** a Page Path contiene `/tratamientos/`: así el temporizador ni arranca en el resto de páginas.
- **Fila 4.** El activador lee el título del formulario con `{{dlv - formname}}` (incluida en el contenedor base). `form_id` = `{{dlv - formid}}`. No envíes ningún campo de `inputs` a GA4.
- **Filas 5 y 6.** GA4 no tiene evento recomendado para llamadas ni para WhatsApp; por eso son eventos propios. Un clic en `tel:` desde un ordenador no es una llamada: compara por dispositivo. La medición mejorada de GA4 también registra el clic a `wa.me` como `click` saliente; la conversión es `whatsapp_click`.

## Contenedor base

`gtm/wp-tags-base.json` es el punto de partida para WordPress + GTM4WP: Google tag, `Const - GA4 ID`, las variables integradas de clic, formulario, scroll, vídeo y página, las variables de capa de datos de las claves de esta guía (`dlv - ecommerce.value`, `dlv - ecommerce.currency`, `dlv - ecommerce.transaction_id`, `dlv - ecommerce.items`, `dlv - formid`, `dlv - formname`) y el activador `Timer - 5 s`. No trae etiquetas de evento: las construyes tú. Cómo importarlo: `gtm/README.md`.

## Avisos

- **No es una herramienta de consentimiento.** GTM4WP no muestra banner ni guarda el consentimiento. Puede enviar el estado `default` de Consent Mode v2 y conectar con Cookiebot, CookieYes y Axeptio, pero necesitas una plataforma de gestión de consentimiento (CMP) y configurar el consentimiento en las etiquetas. Su propia guía de ecommerce lo dice: no tiene en cuenta si usas una CMP.
- **No es GTM del lado del servidor.** Puede cargar `gtm.js` desde tu dominio de servidor (*Custom domain*, *Custom path*), pero el contenedor de servidor lo montas aparte (por ejemplo, en Stape o Google Cloud). La única parte de servidor del plugin (*Google Data Manager*, reembolsos) es experimental.
- **Datos personales en formularios (RGPD).** Con *Submitted field values in the data layer* en *Full* (el valor por defecto), lo que escribe el paciente (nombre, email, teléfono y, en una clínica, a veces datos de salud) queda en el dataLayer y cualquier etiqueta del contenedor puede leerlo, incluidas las de publicidad. Ponlo en *None* o *Field names only*, no mandes nunca `inputs` a GA4 (sus condiciones prohíben enviarle datos personales) y desactiva también *Customer data*, *Order data*, *Logged in user email* y *Visitor IP* salvo que tengas base legal y consentimiento.
- **Duplicados con la medición mejorada de GA4.**
  - *Interacciones con formularios* envía `form_start` y `form_submit` por su cuenta; si además activas los eventos GA4 de Contact Form 7 en el plugin y los mandas a GA4, cuentas doble. Desactiva una de las dos.
  - *Desplazamientos* envía `scroll` al 90 % en todas las páginas; no duplica `page_read` (otro nombre y otro umbral), pero no los sumes.
  - *Interacción con vídeos* envía `video_start`, `video_progress` y `video_complete` en YouTube; si además mides el vídeo con GTM, desactiva una de las dos.
  - *Clics salientes* registra como `click` el enlace a WhatsApp.
- **Un solo instalador.** Si otro plugin (Site Kit, Google for WooCommerce, un plugin de cookies o de cabeceras) ya pega GTM o la etiqueta de GA4, tendrás páginas vistas y compras dobles. Deja solo GTM4WP para GTM y una sola Google tag dentro del contenedor.
- **Tutoriales antiguos.** El scroll propio de GTM4WP (eliminado en la 2.0), la opción de vídeos de YouTube (eliminada en la 2.1) y cualquier evento de ecommerce que no sea uno de los nombres de GA4 de la tabla de arriba son de versiones anteriores. Si un tutorial los usa, está desfasado. La ficha de wordpress.org de la 2.1.1 todavía cita YouTube entre los reproductores, pero el registro de cambios y el código confirman que se eliminó en la 2.1.
- **Caché de página.** Con WP Rocket, LiteSpeed o similares, el HTML de un visitante se sirve a otros. Si activas variables de visitante (usuario, email, carrito), activa también *Cache-safe data layer* (experimental) o no las uses.

## Recursos

- https://wordpress.org/plugins/duracelltomi-google-tag-manager/
- https://downloads.wordpress.org/plugin/duracelltomi-google-tag-manager.2.1.1.zip
- https://gtm4wp.com/
- https://gtm4wp.com/setup-gtm4wp-features
- https://gtm4wp.com/setup-gtm4wp-features/container-settings-reference
- https://gtm4wp.com/use-basic-wordpress-data-in-google-tag-manager
- https://gtm4wp.com/google-tag-manager-for-woocommerce
- https://gtm4wp.com/google-tag-manager-for-woocommerce/woocommerce-settings-reference
- https://gtm4wp.com/google-tag-manager-for-woocommerce/how-to-setup-enhanced-ecommerce-tracking-google-analytics-4-ga4-version
- https://gtm4wp.com/setup-gtm4wp-features/how-to-track-contact-form-7-submissions
- https://gtm4wp.com/setup-gtm4wp-features/how-to-track-user-logins-registrations-and-form-interactions
- https://gtm4wp.com/changelog
- https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm
- https://support.google.com/analytics/answer/9216061
- https://support.google.com/tagmanager/answer/7679219
- https://support.google.com/tagmanager/answer/7679320
- https://support.google.com/tagmanager/answer/7679218
- https://support.google.com/tagmanager/answer/7679325
- https://support.google.com/tagmanager/answer/7679323
- https://support.google.com/tagmanager/answer/7679217
- https://support.google.com/tagmanager/answer/7182738
