# Paso 10. Estrategia UTM

**Qué te llevas.** Una convención de UTMs cerrada para tu proyecto y un enlace etiquetado y comprobado por cada fuente: email, social orgánico y anuncio. Lo copias a `plan/utms.csv`.

## Por qué importa

Sin UTMs, la visita de la newsletter puede llegar como tráfico directo y pierdes qué campaña convirtió. Es uno de los problemas de identidad del dato del paso 1. Para medir el rendimiento de cada iniciativa, las campañas tienen que llevar parámetros UTM. Y en la revisión periódica toca buscar valores de campaña inesperados.

Las preguntas de canal del paso 0, como «¿qué canal trae ventas?», dependen de este paso. La matriz dice qué pasó. Las UTMs dicen de dónde venía quien lo hizo.

Estos son los parámetros:

- `utm_source`: quién envía la visita, como `newsletter`, `instagram` o `facebook`.
- `utm_medium`: el tipo de canal, como `email`, `social` o `paid_social`. GA4 lo usa para asignar la visita a un canal.
- `utm_campaign`: la campaña, como `2026-11_lanzamiento-etiopia`.
- `utm_content`: el enlace o la creatividad dentro de la campaña, como `boton-hero` o `carrusel`.
- `utm_term`: la palabra clave, en búsqueda de pago.

Y estas son las reglas de la convención del kit:

- Escribe en minúsculas, sin espacios ni tildes. GA4 trata `Email` y `email` como valores distintos.
- Cierra la lista de valores de `utm_source` y `utm_medium`. Nadie añade un valor sin acuerdo del equipo.
- Empieza `utm_campaign` por la fecha: `AAAA-MM_nombre`.
- No pongas UTMs en los enlaces internos de tu web. GA4 atribuiría la visita a esa campaña y perderías la fuente real.
- En los anuncios de Meta, los parámetros dinámicos `{{campaign.name}}` y `{{ad.name}}` copian los nombres de la campaña y del anuncio. Pon esos nombres en Meta con la misma convención.
- En Google Ads, usa el etiquetado automático (`gclid`) con la cuenta vinculada a GA4.

GA4 asigna el canal según `utm_medium` y `utm_source`. Comprueba en la ayuda de GA4, en la página del grupo de canales predeterminado (enlace en «Recursos»), qué valor de `utm_medium` corresponde a cada canal antes de cerrar tu lista.

## Ejemplo con Café Fandango

*Ejemplo 10.1. Convención*

| Parámetro | Valores permitidos | Regla |
| --- | --- | --- |
| `utm_source` | `newsletter`, `instagram`, `facebook` | Quién envía la visita |
| `utm_medium` | `email`, `social`, `paid_social` | Tipo de canal. Decide el canal en GA4 |
| `utm_campaign` | `2026-11_lanzamiento-etiopia` | `AAAA-MM_nombre`, o `{{campaign.name}}` en Meta |
| `utm_content` | `boton-hero`, `carrusel` | Enlace o creatividad, o `{{ad.name}}` en Meta |

*Ejemplo 10.2. Enlaces*

| Origen | `utm_source` | `utm_medium` | `utm_campaign` | `utm_content` | Canal GA4 esperado |
| --------- | ------- | ------- | ------------ | ------- | ------ |
| Newsletter | `newsletter` | `email` | `2026-11_lanzamiento-etiopia` | `boton-hero` | Email |
| Post de Instagram | `instagram` | `social` | `2026-11_lanzamiento-etiopia` | `carrusel` | Organic Social |
| Anuncio de Meta | `facebook` | `paid_social` | `{{campaign.name}}` | `{{ad.name}}` | Paid Social |

Los tres enlaces llevan a la ficha del café de Etiopía. Esa URL ya tiene un `?`, así que los UTMs se añaden con `&`. Esta es la URL final de la newsletter:

```text
http://localhost:8000/producto.html?id=ETI-250&utm_source=newsletter&utm_medium=email&utm_campaign=2026-11_lanzamiento-etiopia&utm_content=boton-hero
```

En tu tienda, la URL de destino es una página de tu WordPress, como la ficha de un producto en `/producto/<slug>/`. Esas URL no llevan `?`, así que los UTMs empiezan con `?`.

## Tu proyecto

1. Rellena tu convención (plantilla 10.1) con las fuentes de tu ficha del paso 0.
2. Escribe un enlace por fuente (plantilla 10.2). Como mínimo: email, social orgánico y anuncio.
3. Monta la URL final de cada enlace (plantilla 10.3). Si la URL de destino ya tiene `?`, añade los UTMs con `&`.
4. Comprueba cada enlace con los pasos de abajo y anota la fecha y el canal que ves.
5. Copia los enlaces a `plan/utms.csv`, con las columnas del ejemplo de Café Fandango.

Para comprobar un enlace:

1. Abre la URL final en una ventana de incógnito.
2. En la vista previa de GTM o en DebugView, el evento `page_view` lleva la URL con sus UTMs en `page_location`.
3. En GA4 > **Informes** > **Tiempo real**, busca tu fuente, tu medio o tu campaña en la tarjeta de usuarios por fuente de tráfico.
4. Al día siguiente, en **Adquisición** > **Adquisición de tráfico**, comprueba que la visita está en el canal esperado.

*Plantilla 10.1. Tu convención*

| Parámetro | Valores permitidos | Regla |
| --- | --- | --- |
| `utm_source` | | |
| `utm_medium` | | |
| `utm_campaign` | | |
| `utm_content` | | |
| `utm_term` | | |

*Plantilla 10.2. Tus enlaces*

| Origen | `utm_source` | `utm_medium` | `utm_campaign` | `utm_content` | Canal GA4 esperado |
| --------- | ------- | ------- | ------------ | ------- | ------ |
| Email | | | | | |
| Social orgánico | | | | | |
| Anuncio | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |

*Plantilla 10.3. Tus URL finales y su comprobación*

| Origen | URL final | Comprobado en GA4 (fecha y canal) |
| --- | --- | --- |
| Email | | |
| Social orgánico | | |
| Anuncio | | |
| | | |
| | | |
| | | |

## Antes de seguir

- [ ] Tienes al menos tres enlaces: email, social orgánico y anuncio.
- [ ] Todos los valores están en minúsculas, sin espacios ni tildes.
- [ ] Cada `utm_source` y cada `utm_medium` sale de tu lista cerrada.
- [ ] Ningún enlace interno de tu web lleva UTMs.
- [ ] Cada enlace aparece en GA4 con la fuente y el medio esperados.
- [ ] `plan/utms.csv` tiene los mismos enlaces.
