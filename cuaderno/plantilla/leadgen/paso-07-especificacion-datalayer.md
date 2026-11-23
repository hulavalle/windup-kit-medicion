# Paso 7. Especificación del dataLayer para quien gestiona la web

**Qué te llevas.** La especificación técnica de tu web: qué ajustes de GTM4WP activas, qué empuja Contact Form 7 al dataLayer, qué enlaces e IDs necesita GTM y el ticket para quien gestiona la web. Es el `especificacion.md` de tu proyecto.

## Por qué importa

El dataLayer es la capa intermedia entre la web y GTM. La web le añade datos con `dataLayer.push()`, que puede llevar un evento, un dato o los dos. GTM no reconoce esos datos hasta que creas una variable de capa de datos para cada clave.

Leer los datos directamente del HTML de la página es frágil. Si cambia el diseño, se rompe la medición. El dataLayer no cambia cuando cambia el diseño.

En una web de captación en WordPress casi no hay pushes propios. GTM4WP empuja los envíos de Contact Form 7, y el teléfono y WhatsApp se miden con el clic en su enlace. Tu especificación dice qué ajustes activas, qué llega al dataLayer y qué tiene que cumplir la web: enlaces `tel:` y `wa.me` en todos los botones de contacto y un título de formulario que no cambia.

El ticket va a quien gestiona la web, muchas veces una agencia. El peor ticket que le puedes escribir es «Añadir la medición del formulario». Un buen ticket lleva los ajustes, los enlaces, para qué se usará el dato y cómo comprobar que funciona.

La especificación también fija qué datos no salen nunca de la web. El formulario de una clínica recoge nombre, teléfono y a veces el motivo de la consulta. El RGPD protege más los datos de salud, y las condiciones de GA4 prohíben enviarle datos personales.

## Ejemplo con Clínica Dental Alameda

*Ejemplo 7.1. Ajustes de GTM4WP*

| Módulo | Ajuste | Valor | Por qué |
| --- | --- | --- | --- |
| Google Tag Manager container | **Container ID** | `GTM-XXXXXXX` | Carga tu contenedor en todas las páginas |
| Google Tag Manager container | **Container code placement** | *Automatically after the opening body tag* | Pone el `<noscript>` justo después de abrir el `<body>`. Si tu tema no lo admite, usa *Footer of the page* |
| Page variables | **Logged in user email**, **Visitor IP**, **Post custom fields (meta)** | Desactivados | Ponen datos personales en el dataLayer, al alcance de cualquier etiqueta |
| Contact Form 7 | **Contact Form 7** | Activado | Empuja un evento por cada envío y su resultado. Viene desactivado |
| Contact Form 7 | **Submitted field values in the data layer** | **None** | Con **Full**, el valor por defecto, el nombre, el email, el teléfono y el mensaje del paciente acaban en el dataLayer |
| Contact Form 7 | **Also push GA4 recommended events** | Desactivado | Añade su propio `generate_lead`. Junto al que construyes en GTM, cada solicitud contaría dos veces |
| Consent mode & consent tools | Estado `default` de Consent Mode v2 y conexión con el plugin de cookies | Según el plugin de cookies de la web | GTM4WP no muestra ningún banner. Envía el estado por defecto y se conecta con Cookiebot, CookieYes o Axeptio |

*Ejemplo 7.2. Lo que llega al dataLayer*

| Evento | Página | Cuándo | Claves |
| --- | --- | --- | --- |
| `gtm4wp.contactForm7MailSent` | `/pedir-cita/` | Envío correcto de «Pedir cita»: el correo salió bien | `formid`, `formname` = `Pedir cita`, `status` = `mail_sent`, `inputs` vacía |
| `gtm4wp.contactForm7InvalidInput` | `/pedir-cita/` | Envío con campos erróneos | Las mismas claves. Sirve en QA para comprobar que `generate_lead` no salta |
| `gtm4wp.contactForm7Submitted` | `/pedir-cita/` | Cada intento de envío, haya ido bien o mal | Las mismas claves. No cuenta como lead |
| Sin evento: variables de página | Todas | En cada carga | `pagePostType`, `pageCategory`, `pagePostAuthor` |

Así se ve un envío correcto en la pestaña **Capa de datos** de la vista previa, con valores de ejemplo:

```js
{
  event: "gtm4wp.contactForm7MailSent",
  formid: 57,
  formname: "Pedir cita",
  unittag: "wpcf7-f57-p12-o1",
  containerpostid: 12,
  locale: "es_ES",
  status: "mail_sent",
  inputs: []
}
```

Todas las claves van en el primer nivel, no dentro de un objeto. Por eso la variable `dlv - formname` lee `formname` sin puntos. `inputs` está vacía porque **Submitted field values in the data layer** está en **None**.

*Ejemplo 7.3. Enlaces, páginas e IDs que necesita GTM*

| Elemento | id o condición | Página | Fila |
| --- | --- | --- | --- |
| Botón «Pedir cita» | Enlace a `/pedir-cita/`: Click URL contiene `/pedir-cita` | Menú y páginas de tratamientos | 1 |
| Página de implantes | Page Path contiene `/tratamientos/implantes` | `/tratamientos/implantes/` | 2 |
| Páginas de tratamientos | Page Path contiene `/tratamientos/` | Cada página bajo `/tratamientos/` | 3 |
| Formulario «Pedir cita» | `formname` = `Pedir cita`, el título del formulario en Contact Form 7 | `/pedir-cita/` | 4 |
| Enlaces de teléfono | `href` que empieza por `tel:` | Cabecera, pie y páginas de tratamientos | 5 |
| Botón de WhatsApp | `href` a `wa.me` o a `api.whatsapp.com` | Todas, como botón flotante | 6 |

Si hay varios botones «Pedir cita» y solo quieres medir uno, ponle una clase en el editor, como `cta-pedir-cita`, y usa Click Classes contiene `cta-pedir-cita`. Si la clase queda en el contenedor del botón, usa el selector CSS `.cta-pedir-cita a`.

Un teléfono escrito como texto, sin enlace `tel:`, no se puede medir. Un botón de WhatsApp que abre la conversación con JavaScript, sin enlace `wa.me`, tampoco se mide con Clic - Solo enlaces.

*Ejemplo 7.4. Ticket para quien gestiona la web*

| Campo | Clínica Dental Alameda |
| --- | --- |
| Título | GTM4WP y enlaces de contacto para medir solicitudes, llamadas y WhatsApp |
| Para qué se usa | Saber qué canal trae pacientes, llamadas y conversaciones de WhatsApp (KR1 a KR3). Gerencia reparte el presupuesto cada lunes con este dato |
| Ajustes de GTM4WP | Los del ejemplo 7.1, con **Submitted field values in the data layer** en **None** |
| Enlaces e IDs | Todos los teléfonos como enlace `tel:`. El botón de WhatsApp como enlace `wa.me`. El formulario sigue titulado «Pedir cita» |
| Datos personales | Ningún campo del formulario en el dataLayer. **Logged in user email** y **Visitor IP** desactivados |
| Documentación | `gtm4wp.md` y `especificacion.md` del kit |
| Cómo se comprueba | Envía el formulario con datos de prueba. En la vista previa de GTM, `gtm4wp.contactForm7MailSent` aparece en la columna izquierda. En la pestaña **Capa de datos**, `inputs` está vacía |
| Fecha límite y responsable | |

## Tu proyecto

Si tu web usa Contact Form 7, la especificación son ajustes del plugin y reglas para los enlaces.

1. Instala GTM4WP y activa los ajustes del ejemplo 7.1. Tienes el detalle en `gtm4wp.md`. Anota tus valores en la plantilla 7.1.
2. Abre tu web con la vista previa de GTM. Envía el formulario una vez bien y otra con un email mal escrito.
3. Anota en la plantilla 7.2 lo que llega al dataLayer para cada fila de tu matriz.
4. Anota en la plantilla 7.3 los enlaces, las páginas y los IDs de las filas que salen de activadores automáticos.
5. Escribe el ticket para quien gestiona la web (plantilla 7.4).

Si usas otro plugin de formularios, GTM4WP 2.1.1 no lo integra. Busca en su documentación qué evento empuja al dataLayer y anótalo en la plantilla 7.2. Si no empuja ninguno, pide un push a quien desarrolla, sin datos del formulario.

Para ver qué hay ya en el dataLayer de tu web:

1. Abre tu web en el navegador.
2. Abre la consola: Ctrl+Mayús+I en Windows, Cmd+Opción+J en Mac.
3. Escribe `dataLayer` y pulsa Intro. Despliega cada objeto y anota los eventos y claves que ya existen.

En la vista previa de GTM ves lo mismo en la pestaña **Capa de datos** de cada evento.

Para comprobar el enlace de un botón:

1. Haz clic derecho sobre el botón y elige **Inspeccionar**.
2. Busca el atributo `href="..."` en el panel de elementos. Un teléfono empieza por `tel:` y WhatsApp lleva `wa.me` o `api.whatsapp.com`.
3. Si el botón no tiene `href`, pide a quien gestiona la web que lo cambie por un enlace.

Cuando termines, reescribe `especificacion.md` del kit para tu web. Mantén la estructura de la de Café Fandango: páginas, servicios, eventos del dataLayer, contenedores y convención de nombres.

*Plantilla 7.1. Tus ajustes de GTM4WP*

| Módulo | Ajuste | Valor | Por qué |
| --- | --- | --- | --- |
| Google Tag Manager container | **Container ID** | | |
| Google Tag Manager container | **Container code placement** | | |
| Page variables | **Logged in user email**, **Visitor IP**, **Post custom fields (meta)** | | |
| Contact Form 7 | **Contact Form 7** | | |
| Contact Form 7 | **Submitted field values in the data layer** | | |
| Contact Form 7 | **Also push GA4 recommended events** | | |
| Consent mode & consent tools | | | |
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

*Plantilla 7.3. Enlaces, páginas e IDs que necesita tu GTM*

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

*Plantilla 7.4. Tu ticket para quien gestiona la web*

| Campo | Tu proyecto |
| ---- | ------ |
| Título | |
| Para qué se usa | |
| Ajustes de GTM4WP | |
| Enlaces e IDs | |
| Datos personales | |
| Documentación | |
| Cómo se comprueba | |
| Fecha límite y responsable | |

## Antes de seguir

- [ ] GTM4WP tiene el módulo Contact Form 7 activado y **Submitted field values in the data layer** en **None**.
- [ ] Con un envío de prueba, `inputs` llega vacía al dataLayer.
- [ ] Cada fila de la matriz tiene su evento del dataLayer o su activador automático con enlace, `id` o página.
- [ ] Todos los teléfonos son enlaces `tel:` y el botón de WhatsApp es un enlace `wa.me` o `api.whatsapp.com`.
- [ ] El ticket dice para qué se usa el dato y cómo se comprueba.
- [ ] El `especificacion.md` de tu proyecto está escrito.
