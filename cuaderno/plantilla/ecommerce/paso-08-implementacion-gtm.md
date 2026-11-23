# Paso 8. Implementación en GTM

**Qué te llevas.** Un contenedor de GTM en un espacio de trabajo nuevo, cargado en tu tienda por GTM4WP, con la etiqueta de Google, el píxel de Meta y una etiqueta con su activador por cada fila de la matriz. Todavía sin publicar.

## Por qué importa

GTM separa tres piezas. La etiqueta dice qué se envía, el activador dice cuándo y la variable aporta los datos. Tu matriz ya tiene las tres: el evento con sus parámetros, el activador y su condición.

GTM4WP instala el contenedor y llena el dataLayer, pero no crea etiquetas ni envía nada a GA4. Las etiquetas y los activadores los construyes tú en GTM, igual que en la demo de clase.

Los nombres claros evitan el «¿ya teníamos esto?». Usa la convención del kit:

- Etiquetas: `<Herramienta> - <tipo> - <evento>`, como `GA4 - evento - purchase` o `Meta - PageView`.
- Activadores: `<Tipo> - <qué>`, como `CE - purchase`, `Clic - CTA suscribirme hero` o `Timer - 5 s`.
- Variables: `dlv - <clave>` y `Const - <qué>`.

Tu asistente de IA puede generar el contenedor a partir de la matriz y la especificación. La regla del kit es que la IA escribe y tú decides y compruebas. Trabaja siempre en un espacio de trabajo nuevo y publica tú, después del paso 9 (`AGENTS.md`).

No midas lo mismo con código pegado en la web y con GTM, porque duplicas los datos. Pasa lo mismo con la medición mejorada de GA4 y con dos plugins que cargan GTM o GA4. Decide qué evento sale de dónde.

## Ejemplo con Café Fandango

En la demo de clase, el punto de partida es `gtm/fandango-inicio.json`. Trae la variable `Const - GA4 ID`, la etiqueta `GA4 - Google tag`, las variables integradas de página, clic, formulario y desplazamiento, y las variables `dlv - ecommerce.value`, `dlv - ecommerce.currency`, `dlv - ecommerce.transaction_id` y `dlv - ecommerce.items`. No trae activadores ni etiquetas de evento.

*Ejemplo 8.1. Contenedor de solución de la web demo*

| Etiqueta | Activador | Parámetros |
| --- | --- | --- |
| `GA4 - Google tag` | Inicialización: todas las páginas | ID de medición `{{Const - GA4 ID}}` |
| `GA4 - evento - view_item_list` | `CE - view_item_list` | Datos de ecommerce del dataLayer |
| `GA4 - evento - view_item` | `CE - view_item` | Datos de ecommerce del dataLayer |
| `GA4 - evento - add_to_cart` | `CE - add_to_cart` | Datos de ecommerce del dataLayer |
| `GA4 - evento - begin_checkout` | `CE - begin_checkout` | Datos de ecommerce del dataLayer |
| `GA4 - evento - purchase` | `CE - purchase` | Datos de ecommerce del dataLayer |
| `GA4 - evento - page_read` | `Scroll - 75 % guía`: vertical 75 %, Page Path contiene `/guia` | `percent_scrolled` = `{{Scroll Depth Threshold}}`, `page_path` = `{{Page Path}}` |
| `GA4 - evento - timer_5s` | `Timer - 5 s ficha`: temporizador, intervalo 5000 ms, límite 1, Page Path contiene `/producto` | `page_path` = `{{Page Path}}` |
| `GA4 - evento - cta_click` | `Clic - CTA suscribirme hero`: todos los elementos, Click ID igual a `cta-suscribirme-hero` | `element_id` = `{{Click ID}}`, `element_text` = `{{Click Text}}` |
| `GA4 - evento - generate_lead` | `Form - B2B`: envío de formulario, esperar a las etiquetas 2000 ms, Form ID igual a `form-b2b` | `lead_type` = `b2b`, `form_id` = `{{Form ID}}` |
| `Meta - PageView` | Todas las páginas | Plantilla Facebook Pixel by Stape, de la galería de plantillas de la comunidad. No viene en el JSON. Cómo añadirla: https://stape.io/blog/add-facebook-pixel-gtm |

### La misma tienda en WooCommerce con GTM4WP

En tu tienda, el punto de partida es `gtm/wp-tags-base.json`. Trae `Const - GA4 ID`, `GA4 - Google tag`, las variables integradas de página, clic, formulario, desplazamiento y vídeo, y las variables de las claves de GTM4WP: `dlv - ecommerce.value`, `dlv - ecommerce.currency`, `dlv - ecommerce.transaction_id`, `dlv - ecommerce.items`, `dlv - formid` y `dlv - formname`. Trae también un activador, `Timer - 5 s`: temporizador de 5000 ms, límite 1, habilitado en todas las páginas.

Con Café Fandango en WooCommerce, las etiquetas serían las del ejemplo 8.1. Cambiarían estos activadores y condiciones:

*Ejemplo 8.2. La matriz de Café Fandango en WooCommerce*

| Fila | Evento GA4 | Activador | Condición | Cambio respecto a la web demo |
| --- | ------- | -------- | -------- | ------------ |
| 1 | `view_item_list` | `CE - view_item_list` | `event` = `view_item_list` | Ninguno en el activador. Puede llegar en varios envíos por página |
| 2 | `view_item` | `CE - view_item` | `event` = `view_item` | En un producto variable salta al elegir variación |
| 3 | `add_to_cart` | `CE - add_to_cart` | `event` = `add_to_cart` | También salta al subir la cantidad en el carrito |
| 4 | `page_read` | `Scroll - 75 % guía` | 75 % vertical, Page Path contiene el slug de la guía, como `/guia-v60` | Solo cambia la ruta. GTM4WP no mide el desplazamiento |
| 5 | `timer_5s` | `Timer - 5 s`, de la base | 5000 ms, límite 1. En **Habilitar este activador cuando**, Page Path contiene `/producto/` | Las fichas pasan de `/producto.html` a `/producto/<slug>/` |
| 6 | `cta_click` | `Clic - CTA suscribirme hero` | Click ID = `cta-suscribirme-hero` | El ID se pone en el editor. Si queda en el contenedor del botón, usa Click Element coincide con el selector CSS `#cta-suscribirme-hero a` |
| 7 | `begin_checkout` | `CE - begin_checkout` | `event` = `begin_checkout` | Salta al cargar la página de pago |
| 8 | `purchase` | `CE - purchase` | `event` = `purchase` | `transaction_id` es el número de pedido. Compras sin ítems de categoría `Suscripción` |
| 9 | `purchase` | El mismo `CE - purchase` | `event` = `purchase` | La suscripción se reconoce por `item_category` = `Suscripción` en `items`, sin cambios en el activador. Las renovaciones mensuales no pasan por el navegador |
| 10 | `generate_lead` | `CE - CF7 enviado` | `event` = `gtm4wp.contactForm7MailSent` y `{{dlv - formname}}` = `Cafeterías` | Contact Form 7 envía sin recargar la página, así que cambia el activador. `form_id` = `{{dlv - formid}}` |

## Tu proyecto

1. En GA4, crea la propiedad y un flujo de datos web. Copia el ID de medición, que empieza por `G-`.
2. En el flujo de datos, revisa la medición mejorada. Desactiva las opciones que vayas a medir desde GTM con el mismo nombre de evento. `page_read` y `timer_5s` tienen otro nombre que `scroll` y que los eventos de vídeo.
3. Si el recorrido pasa por otro dominio (paso 1), como una pasarela de pago, añádelo en la configuración de dominios del flujo de datos.
4. En GTM, crea una cuenta y un contenedor web. No pegues sus fragmentos en el tema, porque los pega GTM4WP.
5. En WordPress, instala y activa GTM4WP desde **Plugins** > **Añadir nuevo plugin**. En **Ajustes** > **Google Tag Manager**, pon los valores de tu plantilla 7.1.
6. Comprueba que ningún otro plugin carga GTM o GA4.
7. En GTM, ve a **Administrar** > **Importar contenedor**. Elige `gtm/wp-tags-base.json`, un espacio de trabajo nuevo y la opción **Combinar**. Si hay conflictos, elige **Cambiar el nombre de etiquetas, activadores y variables en conflicto**.
8. Cambia el valor de `Const - GA4 ID` por tu ID de medición.
9. Abre `Timer - 5 s` y cambia **Habilitar este activador cuando** a la página clave de tu matriz, como Page Path contiene `/producto/`.
10. Crea las variables de capa de datos que pide tu especificación y la base no trae. Usa una por clave, con el nombre exacto de la clave. Las claves anidadas se escriben con puntos, como `ecommerce.value`.
11. Crea las etiquetas y los activadores de tu matriz, con IA o a mano. Tienes los dos caminos abajo.
12. Si tienes píxel de Meta, añádelo desde la galería de plantillas de la comunidad, con `PageView` en todas las páginas.
13. Revisa el contenedor con la plantilla 8.3.
14. No publiques todavía. Pasa al paso 9.

Antes de publicar en una web real en España necesitas una plataforma de gestión del consentimiento (CMP) con Consent Mode v2, y las etiquetas de GA4 y Meta tienen que respetar el consentimiento. GTM4WP no muestra ningún banner. Puede enviar el estado `default` de Consent Mode v2 y conectarse con Cookiebot, CookieYes o Axeptio. Esta plantilla no cubre la parte legal.

### Con tu asistente de IA

Este encargo necesita un agente de IA que trabaje sobre la carpeta del repositorio: que lea y escriba sus archivos y ejecute el validador. Por ejemplo, Claude Code, Codex, Cursor o Gemini CLI. El chat web de ChatGPT, Claude o Gemini no puede hacerlo. Si no tienes un agente, sigue el camino «A mano».

Copia este encargo y cambia `<proyecto>` por el nombre de tu proyecto:

```text
Lee AGENTS.md, gtm4wp.md, plan/matriz.csv y especificacion.md.
Genera gtm/<proyecto>.json a partir de gtm/wp-tags-base.json.
Crea una etiqueta de evento de GA4 y un activador por cada fila de la matriz,
con la convención de nombres de especificacion.md.
Los eventos de WooCommerce salen de los pushes de GTM4WP: usa activadores
de evento personalizado y envía los datos de ecommerce desde la capa de datos.
Usa {{Const - GA4 ID}} como ID de medición en todas las etiquetas.
Crea solo las variables de capa de datos que pide la especificación.
No añadas eventos que no estén en la matriz.
Ejecuta python3 gtm/validar.py gtm/<proyecto>.json y corrige hasta que pase.
Después, explícame en una tabla cada etiqueta, su activador y sus parámetros.
```

Si quieres comprobarlo tú, ejecuta el mismo comando desde la raíz del repositorio: `python3 gtm/validar.py gtm/<proyecto>.json`. Solo necesita Python 3. Comprueba la estructura del contenedor, no lo compara con tu matriz.

Importa el archivo que genere en un espacio de trabajo nuevo y revísalo con la plantilla 8.3 antes de seguir.

### A mano

Repite estos pasos para cada fila de la matriz:

1. Ve a **Activadores** > **Nuevo** y elige el tipo de la matriz: Evento personalizado, Clic - Todos los elementos, Clic - Solo enlaces, Profundidad de desplazamiento o Temporizador.
2. En un evento de WooCommerce, escribe como nombre del evento el de GA4, como `purchase`. GTM4WP usa los mismos nombres.
3. Elige que se active solo en algunos casos y escribe la condición de la matriz, como Click ID igual a `cta-suscribirme-hero`.
4. Guarda el activador con su nombre de la convención.
5. Ve a **Etiquetas** > **Nueva** y elige **Evento de GA4**.
6. Escribe `{{Const - GA4 ID}}` como ID de medición y el nombre del evento de la matriz.
7. Añade cada parámetro de la matriz con su variable. En los eventos de ecommerce, activa **Enviar datos de comercio electrónico** con **Capa de datos** como origen. La etiqueta lee así todo el objeto `ecommerce` sin variables.
8. Asocia el activador y guarda la etiqueta con su nombre de la convención.

Cuando una macro llegue a GA4 por primera vez, márcala como evento clave en **Administrar** > **Eventos**. También puedes crear el evento clave antes, con su nombre exacto.

*Plantilla 8.1. Tus etiquetas y activadores*

| Fila | Activador (nombre, tipo y condición) | Etiqueta | Parámetros (nombre = variable) | Hecho |
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

*Plantilla 8.2. Tus variables*

| Variable | Tipo | Clave o valor | Usada en |
| --- | --- | --- | --- |
| `Const - GA4 ID` | Constante | | Todas las etiquetas de GA4 |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |

*Plantilla 8.3. Revisión del contenedor*

| Comprobación | OK |
| -------------- | -- |
| GTM4WP es el único plugin que carga GTM, y ningún plugin carga GA4 por su cuenta | |
| Hay una etiqueta y un activador por fila de la matriz, ni más ni menos | |
| Los nombres de evento son idénticos a los de la matriz | |
| Etiquetas, activadores y variables siguen la convención de nombres | |
| Cada activador tiene una condición | |
| `Timer - 5 s` solo se habilita en tu página clave | |
| Cada parámetro usa una variable que existe | |
| Ningún parámetro envía email, teléfono ni nombre | |
| La etiqueta de Google usa tu ID de medición | |
| Ningún evento duplica uno de la medición mejorada | |
| El validador `gtm/validar.py` pasa, si usaste IA | |

## Antes de seguir

- [ ] Trabajas en un espacio de trabajo nuevo y no has publicado.
- [ ] La vista previa de GTM conecta con tu tienda a través de GTM4WP.
- [ ] La etiqueta de Google y el píxel de Meta (si lo tienes) se activan en todas las páginas.
- [ ] Hay una etiqueta y un activador por cada fila de la matriz.
- [ ] Al menos un parámetro sale de una variable de capa de datos.
- [ ] Tienes al menos un activador de clic, uno de formulario (si tu web tiene formulario) y uno de evento personalizado. Con Contact Form 7, el de formulario es el evento de GTM4WP.
- [ ] Has revisado lo que generó la IA con la plantilla 8.3.
