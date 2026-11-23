# Paso 8. Implementación en GTM

**Qué te llevas.** Un contenedor de GTM en un espacio de trabajo nuevo, cargado en tu web por GTM4WP, con la etiqueta de Google, el píxel de Meta y una etiqueta con su activador por cada fila de la matriz. Todavía sin publicar.

## Por qué importa

GTM separa tres piezas. La etiqueta dice qué se envía, el activador dice cuándo y la variable aporta los datos. Tu matriz ya tiene las tres: el evento con sus parámetros, el activador y su condición.

GTM4WP instala el contenedor y llena el dataLayer, pero no crea etiquetas ni envía nada a GA4. Las etiquetas y los activadores los construyes tú en GTM, igual que en la demo de clase.

Los nombres claros evitan el «¿ya teníamos esto?». Usa la convención del kit:

- Etiquetas: `<Herramienta> - <tipo> - <evento>`, como `GA4 - evento - generate_lead` o `Meta - PageView`.
- Activadores: `<Tipo> - <qué>`, como `CE - CF7 enviado`, `Clic - Teléfono` o `Timer - 5 s`.
- Variables: `dlv - <clave>` y `Const - <qué>`.

Tu asistente de IA puede generar el contenedor a partir de la matriz y la especificación. La regla del kit es que la IA escribe y tú decides y compruebas. Trabaja siempre en un espacio de trabajo nuevo y publica tú, después del paso 9 (`AGENTS.md`).

No midas lo mismo dos veces. La medición mejorada de GA4 ya registra el clic a WhatsApp como `click` saliente y envía `form_start` y `form_submit`. Tus conversiones son `whatsapp_click` y `generate_lead`, con otro nombre. No las sumes con esos eventos.

## Ejemplo con Clínica Dental Alameda

El punto de partida es `gtm/wp-tags-base.json`. Trae `Const - GA4 ID`, `GA4 - Google tag`, las variables integradas de página, clic, formulario, desplazamiento y vídeo, y las variables de las claves de GTM4WP: `dlv - ecommerce.value`, `dlv - ecommerce.currency`, `dlv - ecommerce.transaction_id`, `dlv - ecommerce.items`, `dlv - formid` y `dlv - formname`. Trae también un activador, `Timer - 5 s`: temporizador de 5000 ms, límite 1, habilitado en todas las páginas. No trae etiquetas de evento.

*Ejemplo 8.1. Contenedor de Clínica Dental Alameda*

| Etiqueta | Activador | Parámetros |
| --- | --- | --- |
| `GA4 - Google tag` | Inicialización: todas las páginas | ID de medición `{{Const - GA4 ID}}` |
| `GA4 - evento - cta_click` | `Clic - Pedir cita`: solo enlaces, Click URL contiene `/pedir-cita` | `element_text` = `{{Click Text}}`, `link_url` = `{{Click URL}}` |
| `GA4 - evento - page_read` | `Scroll - 75 % implantes`: vertical 75 %, Page Path contiene `/tratamientos/implantes` | `percent_scrolled` = `{{Scroll Depth Threshold}}`, `page_path` = `{{Page Path}}` |
| `GA4 - evento - timer_5s` | `Timer - 5 s`, de la base: 5000 ms, límite 1. En **Habilitar este activador cuando**, Page Path contiene `/tratamientos/` | `page_path` = `{{Page Path}}` |
| `GA4 - evento - generate_lead` | `CE - CF7 enviado`: evento personalizado `gtm4wp.contactForm7MailSent`, con `{{dlv - formname}}` igual a `Pedir cita` | `lead_type` = `cita`, `form_id` = `{{dlv - formid}}` |
| `GA4 - evento - phone_click` | `Clic - Teléfono`: solo enlaces, Click URL empieza por `tel:` | `page_path` = `{{Page Path}}` |
| `GA4 - evento - whatsapp_click` | `Clic - WhatsApp`: solo enlaces, Click URL coincide con la expresión regular `wa\.me\|api\.whatsapp\.com` | `page_path` = `{{Page Path}}` |
| `Meta - PageView` | Todas las páginas | Plantilla Facebook Pixel by Stape, de la galería de plantillas de la comunidad |

Fíjate en estos detalles del ejemplo:

- `Timer - 5 s` viene habilitado en todas las páginas, porque más de un negocio lo usa. Con la condición `/tratamientos/`, el temporizador ni siquiera arranca en el resto de páginas.
- `CE - CF7 enviado` lee el título del formulario con `{{dlv - formname}}`. Ninguna etiqueta lee `inputs`.
- Las variables `dlv - ecommerce.*` de la base no se usan en una web sin tienda. Puedes borrarlas.

Meta puede limitar los datos que acepta de webs de salud. Antes de enviarle más eventos que `PageView`, revisa sus condiciones para tu sector.

## Tu proyecto

1. En GA4, crea la propiedad y un flujo de datos web. Copia el ID de medición, que empieza por `G-`.
2. En el flujo de datos, revisa la medición mejorada. Deja las opciones que no repiten tus nombres de evento y anota qué envía cada una.
3. En GTM, crea una cuenta y un contenedor web. No pegues sus fragmentos en el tema, porque los pega GTM4WP.
4. En WordPress, instala y activa GTM4WP desde **Plugins** > **Añadir nuevo plugin**. En **Ajustes** > **Google Tag Manager**, pon los valores de tu plantilla 7.1.
5. Antes de seguir, comprueba que **Submitted field values in the data layer** está en **None**.
6. Comprueba que ningún otro plugin carga GTM o GA4.
7. En GTM, ve a **Administrar** > **Importar contenedor**. Elige `gtm/wp-tags-base.json`, un espacio de trabajo nuevo y la opción **Combinar**. Si hay conflictos, elige **Cambiar el nombre de etiquetas, activadores y variables en conflicto**.
8. Cambia el valor de `Const - GA4 ID` por tu ID de medición.
9. Abre `Timer - 5 s` y cambia **Habilitar este activador cuando** a las páginas clave de tu matriz, como Page Path contiene `/tratamientos/`.
10. Crea las etiquetas y los activadores de tu matriz, con IA o a mano. Tienes los dos caminos abajo.
11. Si tienes píxel de Meta, añádelo desde la galería de plantillas de la comunidad, con `PageView` en todas las páginas.
12. Revisa el contenedor con la plantilla 8.3.
13. No publiques todavía. Pasa al paso 9.

Antes de publicar en una web real en España necesitas una plataforma de gestión del consentimiento (CMP) con Consent Mode v2, y las etiquetas de GA4 y Meta tienen que respetar el consentimiento. GTM4WP no muestra ningún banner. Esta plantilla no cubre la parte legal.

### Con tu asistente de IA

Este encargo necesita un agente de IA que trabaje sobre la carpeta del repositorio: que lea y escriba sus archivos y ejecute el validador. Por ejemplo, Claude Code, Codex, Cursor o Gemini CLI. El chat web de ChatGPT, Claude o Gemini no puede hacerlo. Si no tienes un agente, sigue el camino «A mano».

Copia este encargo y cambia `<proyecto>` por el nombre de tu proyecto:

```text
Lee AGENTS.md, gtm4wp.md, plan/matriz.csv y especificacion.md.
Genera gtm/<proyecto>.json a partir de gtm/wp-tags-base.json.
Crea una etiqueta de evento de GA4 y un activador por cada fila de la matriz,
con la convención de nombres de especificacion.md.
El lead del formulario sale del evento gtm4wp.contactForm7MailSent,
filtrado por {{dlv - formname}}. No uses nunca la clave inputs.
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

1. Ve a **Activadores** > **Nuevo** y elige el tipo de la matriz: Evento personalizado, Clic - Solo enlaces, Clic - Todos los elementos, Profundidad de desplazamiento o Temporizador.
2. En el evento de Contact Form 7, escribe como nombre del evento `gtm4wp.contactForm7MailSent`.
3. Elige que se active solo en algunos casos y escribe la condición de la matriz, como Click URL empieza por `tel:` o `{{dlv - formname}}` igual a `Pedir cita`.
4. Guarda el activador con su nombre de la convención.
5. Ve a **Etiquetas** > **Nueva** y elige **Evento de GA4**.
6. Escribe `{{Const - GA4 ID}}` como ID de medición y el nombre del evento de la matriz.
7. Añade cada parámetro de la matriz con su variable. Un valor fijo, como `lead_type` = `cita`, se escribe tal cual.
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

*Plantilla 8.2. Tus variables*

| Variable | Tipo | Clave o valor | Usada en |
| --- | --- | --- | --- |
| `Const - GA4 ID` | Constante | | Todas las etiquetas de GA4 |
| `dlv - formname` | Variable de capa de datos | `formname` | |
| `dlv - formid` | Variable de capa de datos | `formid` | |
| | | | |
| | | | |
| | | | |

*Plantilla 8.3. Revisión del contenedor*

| Comprobación | OK |
| -------------- | -- |
| GTM4WP es el único plugin que carga GTM, y ningún plugin carga GA4 por su cuenta | |
| **Submitted field values in the data layer** está en **None** y ninguna variable lee `inputs` | |
| Hay una etiqueta y un activador por fila de la matriz, ni más ni menos | |
| Los nombres de evento son idénticos a los de la matriz | |
| Etiquetas, activadores y variables siguen la convención de nombres | |
| Cada activador tiene una condición | |
| `Timer - 5 s` solo se habilita en tus páginas clave | |
| Cada parámetro usa una variable que existe | |
| Ningún parámetro envía email, teléfono, nombre ni lo que escribe la persona | |
| La etiqueta de Google usa tu ID de medición | |
| Ningún evento duplica uno de la medición mejorada | |
| El validador `gtm/validar.py` pasa, si usaste IA | |

## Antes de seguir

- [ ] Trabajas en un espacio de trabajo nuevo y no has publicado.
- [ ] La vista previa de GTM conecta con tu web a través de GTM4WP.
- [ ] La etiqueta de Google y el píxel de Meta (si lo tienes) se activan en todas las páginas.
- [ ] Hay una etiqueta y un activador por cada fila de la matriz.
- [ ] Al menos un parámetro sale de una variable de capa de datos, como `form_id`.
- [ ] Tienes al menos un activador de clic, uno de formulario y uno de evento personalizado. Con Contact Form 7, el de formulario es el evento de GTM4WP.
- [ ] Has revisado lo que generó la IA con la plantilla 8.3.
