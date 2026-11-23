# Paso 10. Estrategia UTM

**Qué te llevas.** Una convención de UTMs cerrada para tu proyecto y un enlace etiquetado y comprobado por cada fuente: como mínimo email, social orgánico y anuncio. Lo copias a `plan/utms.csv`.

## Por qué importa

Sin UTMs, la visita del email puede llegar como tráfico directo y pierdes qué campaña convirtió. Es uno de los problemas de identidad del dato del paso 1. Para medir el rendimiento de cada iniciativa, las campañas tienen que llevar parámetros UTM. Y en la revisión periódica toca buscar valores de campaña inesperados.

Las preguntas de canal del paso 0, como «¿qué canal trae pacientes?», dependen de este paso. La matriz dice qué pasó. Las UTMs dicen de dónde venía quien lo hizo.

En un negocio local, la ficha de Google Business Profile trae muchas visitas. Sin UTMs, esas visitas se mezclan con el resto de la búsqueda de Google y no sabes si la ficha trae citas.

Estos son los parámetros:

- `utm_source`: quién envía la visita, como `google`, `instagram`, `facebook` o `newsletter`.
- `utm_medium`: el tipo de canal, como `organic`, `social`, `paid_social` o `email`. GA4 lo usa para asignar la visita a un canal.
- `utm_campaign`: la campaña, como `2026-11_revision-anual`.
- `utm_content`: el enlace o la creatividad dentro de la campaña, como `boton-web` o `carrusel`.
- `utm_term`: la palabra clave, en búsqueda de pago.

Y estas son las reglas de la convención del kit:

- Escribe en minúsculas, sin espacios ni tildes. GA4 trata `Email` y `email` como valores distintos.
- Cierra la lista de valores de `utm_source` y `utm_medium`. Nadie añade un valor sin acuerdo del equipo.
- Empieza `utm_campaign` por la fecha: `AAAA-MM_nombre`. En un enlace fijo, como el de la ficha de Google, la fecha es la del día en que lo pusiste.
- No pongas UTMs en los enlaces internos de tu web. GA4 atribuiría la visita a esa campaña y perderías la fuente real.
- En los anuncios de Meta, los parámetros dinámicos `{{campaign.name}}` y `{{ad.name}}` copian los nombres de la campaña y del anuncio. Pon esos nombres en Meta con la misma convención.
- En Google Ads, usa el etiquetado automático (`gclid`) con la cuenta vinculada a GA4.
- No pongas en una UTM nada que identifique a un paciente ni su tratamiento personal. Un email de revisión lleva la campaña, no el nombre de quien lo recibe.

GA4 asigna el canal según `utm_medium` y `utm_source`. Comprueba en la ayuda de GA4, en la página del grupo de canales predeterminado (enlace en «Recursos»), qué valor de `utm_medium` corresponde a cada canal antes de cerrar tu lista.

## Ejemplo con Clínica Dental Alameda

El dominio `clinicadentalalameda.example` es de ejemplo.

*Ejemplo 10.1. Convención*

| Parámetro | Valores permitidos | Regla |
| --- | --- | --- |
| `utm_source` | `google`, `instagram`, `facebook`, `newsletter` | Quién envía la visita |
| `utm_medium` | `organic`, `social`, `paid_social`, `email` | Tipo de canal. Decide el canal en GA4 |
| `utm_campaign` | `2026-11_ficha-google`, `2026-11_ortodoncia-invisible`, `2026-11_revision-anual` | `AAAA-MM_nombre`, o `{{campaign.name}}` en Meta |
| `utm_content` | `boton-web`, `carrusel`, `boton-cita` | Enlace o creatividad, o `{{ad.name}}` en Meta |

*Ejemplo 10.2. Enlaces*

| Origen | `utm_source` | `utm_medium` | `utm_campaign` | `utm_content` | Canal GA4 esperado |
| --------- | ------- | ------- | ------------ | ------- | ------ |
| Ficha de Google Business Profile | `google` | `organic` | `2026-11_ficha-google` | `boton-web` | Organic Search |
| Post de Instagram | `instagram` | `social` | `2026-11_ortodoncia-invisible` | `carrusel` | Organic Social |
| Anuncio de Meta | `facebook` | `paid_social` | `{{campaign.name}}` | `{{ad.name}}` | Paid Social |
| Email de revisión anual | `newsletter` | `email` | `2026-11_revision-anual` | `boton-cita` | Email |

Con `utm_medium` = `organic`, la ficha sigue contando como búsqueda orgánica en GA4. `utm_campaign` la separa del resto de visitas de Google.

Cada enlace lleva a una página distinta. La ficha lleva a la portada, el post a la página de ortodoncia, el anuncio a la de implantes y el email a `/pedir-cita/`. Esta es la URL final de la ficha de Google:

```text
https://clinicadentalalameda.example/?utm_source=google&utm_medium=organic&utm_campaign=2026-11_ficha-google&utm_content=boton-web
```

Y esta la del email de revisión:

```text
https://clinicadentalalameda.example/pedir-cita/?utm_source=newsletter&utm_medium=email&utm_campaign=2026-11_revision-anual&utm_content=boton-cita
```

## Tu proyecto

1. Rellena tu convención (plantilla 10.1) con las fuentes de tu ficha del paso 0.
2. Escribe un enlace por fuente (plantilla 10.2). Como mínimo: email, social orgánico y anuncio. Si tienes ficha de Google Business Profile, añádela.
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
| Ficha de Google Business Profile | | | | | |
| | | | | | |
| | | | | | |

*Plantilla 10.3. Tus URL finales y su comprobación*

| Origen | URL final | Comprobado en GA4 (fecha y canal) |
| --- | --- | --- |
| Email | | |
| Social orgánico | | |
| Anuncio | | |
| Ficha de Google Business Profile | | |
| | | |
| | | |

## Antes de seguir

- [ ] Tienes al menos tres enlaces: email, social orgánico y anuncio.
- [ ] Todos los valores están en minúsculas, sin espacios ni tildes.
- [ ] Cada `utm_source` y cada `utm_medium` sale de tu lista cerrada.
- [ ] Ningún enlace interno de tu web lleva UTMs.
- [ ] Ningún enlace lleva datos de una persona.
- [ ] Cada enlace aparece en GA4 con la fuente y el medio esperados.
- [ ] `plan/utms.csv` tiene los mismos enlaces.
