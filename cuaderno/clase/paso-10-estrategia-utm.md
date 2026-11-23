# Paso 10. Estrategia UTM

**4 min · tu proyecto.** Escribe tres enlaces con UTMs: email, social orgánico y anuncio.

Anota el canal de GA4 que esperas para cada uno. Escribe los valores en minúsculas, sin espacios ni tildes. Empieza `utm_campaign` por la fecha, con el formato `AAAA-MM_nombre`. GA4 decide el canal con `utm_medium` y `utm_source`.

*Ejemplo 10.1. Enlaces de Café Fandango*

| Origen | `utm_source` | `utm_medium` | `utm_campaign` | `utm_content` | Canal GA4 esperado |
| ------ | ------ | ------ | ---------- | ------ | ------ |
| Newsletter | `newsletter` | `email` | `2026-11_lanzamiento-etiopia` | `boton-hero` | Email |
| Post de Instagram | `instagram` | `social` | `2026-11_lanzamiento-etiopia` | `carrusel` | Organic Social |
| Anuncio de Meta | `facebook` | `paid_social` | `{{campaign.name}}` | `{{ad.name}}` | Paid Social |

*Plantilla 10.1. Tus tres enlaces*

| Origen | `utm_source` | `utm_medium` | `utm_campaign` | `utm_content` | Canal GA4 esperado |
| ------ | ------ | ------ | ---------- | ------ | ------ |
| Email | | | | | |
| Social orgánico | | | | | |
| Anuncio | | | | | |

- [ ] Todos los valores están en minúsculas, sin espacios ni tildes.
- [ ] Ningún enlace interno de tu web lleva UTMs.

Versión completa: el paso 10 de tu plantilla añade la convención cerrada, la URL final de cada enlace y su comprobación en GA4.
