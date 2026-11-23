# Paso 8. Implementación en GTM

**En cada práctica · tu WordPress.** Al final de cada bucle, marca lo que has construido en la web de tu proyecto.

Esta lista cubre los bucles 0 a 3 y la integración. En el bucle 3, haz la fila de tu tipo de negocio. Comprueba cada fila con las tres reglas. Se disparó, en Tag Assistant. Se envió, en la pestaña **Red**. Llegó, en DebugView. Prueba en una ventana de incógnito. Los ajustes exactos de GTM4WP están en `gtm4wp.md`.

*Plantilla 8.1. Lo que construyes en tu WordPress*

| Bucle | Qué construyes | Comprobación | Hecho |
| ---- | ------------ | ----------- | --- |
| 0 | GTM4WP instalado y activado. En **Ajustes** > **Google Tag Manager**, tu Container ID `GTM-XXXXXXX` y **Container code placement** en *Automatically after the opening body tag* | La **Vista previa** de GTM conecta con tu web y la pestaña **Capa de datos** muestra `pagePostType` | |
| 0 | `gtm/wp-tags-base.json` importado con **Combinar** en un espacio de trabajo nuevo, y `Const - GA4 ID` con tu ID de medición | `GA4 - Google tag` entre las etiquetas activadas | |
| 1 | `Meta - PageView` con la plantilla Facebook Pixel by Stape, en todas las páginas. Si no tienes píxel de Meta, salta esta fila | `GA4 - Google tag` y `Meta - PageView` activadas, y sus peticiones `collect` y `facebook.com/tr/` en la pestaña **Red** | |
| 2 | `Clic - <tu CTA>` y `GA4 - evento - cta_click`. El ID o la clase del botón se pone en el editor de WordPress | Tu botón dispara `cta_click` y otro botón no | |
| 2 | `Scroll - 75 % <tu página>` y `GA4 - evento - page_read` | Salta al 75 % de tu página de contenido y no en la portada | |
| 2 | `Timer - 5 s`, que viene en la base, con tu página clave en **Habilitar este activador cuando**, y `GA4 - evento - timer_5s` con `page_path` | Salta una vez a los 5 segundos en tu página clave y no en otras | |
| 3 | En GTM4WP, **Track e-commerce** activado si vendes. Si captas leads, el módulo **Contact Form 7** activado y **Submitted field values in the data layer** en **None** | El evento del plugin aparece en la columna izquierda de la **Vista previa** | |
| 3 | E-commerce. `CE - purchase` y `GA4 - evento - purchase`, con los datos de comercio electrónico de la capa de datos | Con un pedido de prueba, `purchase` llega a DebugView con `transaction_id` y `value` | |
| 3 | Leads. `CE - CF7 enviado`, con `gtm4wp.contactForm7MailSent` y `{{dlv - formname}}` igual al título de tu formulario, y `GA4 - evento - generate_lead` | `generate_lead` llega a DebugView con un envío correcto y no con uno erróneo. No lleva ningún dato del formulario | |
| 3 | Si sobra tiempo, el resto de macro de tu matriz: teléfono o WhatsApp con Clic - Solo enlaces, o `add_to_cart` y `begin_checkout` | Cada una llega a DebugView | |
| Integración | Recorrido completo desde tu enlace de email con UTMs hasta tu macro | La macro llega a DebugView con su origen | |
| Integración | Tu contenedor comparado con tu matriz | Una etiqueta y un activador por fila, con los mismos nombres de evento | |

No publiques todavía. Publicas en el paso 9, cuando el registro de QA esté en OK.

Versión completa: el paso 8 de tu plantilla lleva todo el proceso a tu web, desde la propiedad de GA4 hasta el contenedor generado con IA o a mano.
