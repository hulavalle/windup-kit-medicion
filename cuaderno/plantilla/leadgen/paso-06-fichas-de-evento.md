# Paso 6. Fichas de evento

**Qué te llevas.** Una ficha por cada evento distinto de tu matriz y un diccionario de propiedades. Es la documentación de referencia de tu medición.

## Por qué importa

Sin documentación, nadie sabe si un evento ya existe y aparecen duplicados. La pregunta típica es «¿ya teníamos este evento?». La documentación de referencia dice, por cada evento, qué es, cuándo se dispara, de dónde sale, qué propiedades lleva, en qué estado está y qué métricas lo usan. La ficha de este paso tiene esos campos.

Cada evento necesita un único responsable. Y cada propiedad tiene que estar en todos los pasos del embudo que la necesitan. Si una propiedad está en tres de las cuatro actividades de un embudo, ese embudo no se puede construir.

En captación, la ficha también protege el dato. Dice de qué depende cada activador, como el título de un formulario, y qué datos no deben salir nunca de la web.

Tu asistente de IA puede redactar las fichas a partir de la matriz si le das una estructura fija. Tú revisas cada una.

## Ejemplo con Clínica Dental Alameda

*Ejemplo 6.1. Ficha de generate_lead*

| Campo | Valor |
| ---- | ------ |
| Evento GA4 | `generate_lead` |
| Filas de la matriz | 4 |
| Descripción (una frase) | Un paciente envía el formulario «Pedir cita» y el correo sale bien |
| Disparador (acción, página y elemento) | Envío correcto del formulario de Contact Form 7 titulado «Pedir cita», en `/pedir-cita/`. GTM4WP empuja `gtm4wp.contactForm7MailSent` |
| Fuente (dataLayer, activador automático o servidor) | dataLayer de GTM4WP, recogido por el activador `CE - CF7 enviado`: evento personalizado `gtm4wp.contactForm7MailSent` y `{{dlv - formname}}` igual a `Pedir cita`. Si cambia el título del formulario, el activador deja de saltar |
| Propiedades (nombre, tipo y ejemplo) | `lead_type` (texto fijo, `cita`), `form_id` (texto, `57`, de la variable `{{dlv - formid}}`) |
| Posición en el embudo | Final del recorrido de cita por formulario |
| Métricas que lo usan | KR1, solicitudes de cita por canal |
| Evento clave en GA4 | Sí |
| Responsable | Gerencia |
| Estado (planificado, implementado, verificado) | Verificado |
| Última verificación | 21/11/2026, fila 4 del registro de QA |

Nunca mandes a GA4 la clave `inputs` de GTM4WP. Con **Submitted field values in the data layer** en **Full**, el valor por defecto, `inputs` lleva todo lo que escribe el paciente: nombre, email, teléfono y, en una clínica, a veces datos de salud. Cualquier etiqueta del contenedor puede leerlo, incluidas las de publicidad. Ponlo en **None** y deja `inputs` vacía.

*Ejemplo 6.2. Ficha de phone_click*

| Campo | Valor |
| ---- | ------ |
| Evento GA4 | `phone_click` |
| Filas de la matriz | 5 |
| Descripción (una frase) | Un visitante pulsa un enlace de teléfono de la web |
| Disparador (acción, página y elemento) | Clic en cualquier enlace `tel:`: el teléfono de la cabecera, el del pie y el botón «Llamar» de cada tratamiento |
| Fuente (dataLayer, activador automático o servidor) | Activador automático `Clic - Teléfono`: Clic - Solo enlaces, Click URL empieza por `tel:`. No necesita dataLayer |
| Propiedades (nombre, tipo y ejemplo) | `page_path` (texto, `/tratamientos/implantes/`, de la variable `{{Page Path}}`) |
| Posición en el embudo | Final del recorrido de cita por teléfono |
| Métricas que lo usan | KR2, llamadas desde la web por canal, en móvil |
| Evento clave en GA4 | Sí |
| Responsable | Recepción |
| Estado (planificado, implementado, verificado) | Verificado |
| Última verificación | 21/11/2026, fila 5 del registro de QA |

Un clic en `tel:` desde un ordenador no es una llamada, porque el ordenador no suele poder llamar. Lee `phone_click` por categoría de dispositivo y cuenta como llamadas las de móvil.

GA4 solo muestra en sus informes los parámetros propios que registras como dimensión personalizada, en **Administrar** > **Definiciones personalizadas**. Antes de registrar uno, comprueba si GA4 ya tiene una dimensión con ese nombre.

*Ejemplo 6.3. Diccionario de propiedades*

| Propiedad | Tipo | Valores de ejemplo | Eventos que la llevan | ¿Registrar en GA4? |
| ------- | ---- | ---------- | ------- | ----- |
| `lead_type` | Texto | `cita` | `generate_lead` | Sí |
| `form_id` | Texto | `57` | `generate_lead` | Opcional |
| `element_text` | Texto | `Pedir cita` | `cta_click` | Sí |
| `link_url` | Texto | `https://clinicadentalalameda.example/pedir-cita/` | `cta_click` | Comprobar si ya existe |
| `percent_scrolled` | Número | `75` | `page_read` | Comprobar si ya existe |
| `page_path` | Texto | `/tratamientos/implantes/`, `/tratamientos/ortodoncia/` | `page_read`, `timer_5s`, `phone_click`, `whatsapp_click` | Sí, si la quieres en informes |

Ninguna propiedad sale de `inputs`, de la URL de un formulario ni de un campo que escribe el paciente.

## Tu proyecto

1. Rellena una ficha (plantillas 6.1 a 6.6) por cada evento distinto de tu matriz. Si necesitas más de seis, duplica una tabla en Word.
2. Rellena el diccionario de propiedades (plantilla 6.7).
3. Comprueba en el diccionario que cada propiedad del embudo está en todos sus pasos.
4. Marca el estado de cada ficha: planificado al escribirla, implementado tras el paso 8 y verificado tras el paso 9.

*Plantilla 6.1. Ficha de evento 1*

| Campo | Valor |
| ---- | ------ |
| Evento GA4 | |
| Filas de la matriz | |
| Descripción (una frase) | |
| Disparador (acción, página y elemento) | |
| Fuente (dataLayer, activador automático o servidor) | |
| Propiedades (nombre, tipo y ejemplo) | |
| Posición en el embudo | |
| Métricas que lo usan | |
| Evento clave en GA4 | |
| Responsable | |
| Estado (planificado, implementado, verificado) | |
| Última verificación | |

*Plantilla 6.2. Ficha de evento 2*

| Campo | Valor |
| ---- | ------ |
| Evento GA4 | |
| Filas de la matriz | |
| Descripción (una frase) | |
| Disparador (acción, página y elemento) | |
| Fuente (dataLayer, activador automático o servidor) | |
| Propiedades (nombre, tipo y ejemplo) | |
| Posición en el embudo | |
| Métricas que lo usan | |
| Evento clave en GA4 | |
| Responsable | |
| Estado (planificado, implementado, verificado) | |
| Última verificación | |

*Plantilla 6.3. Ficha de evento 3*

| Campo | Valor |
| ---- | ------ |
| Evento GA4 | |
| Filas de la matriz | |
| Descripción (una frase) | |
| Disparador (acción, página y elemento) | |
| Fuente (dataLayer, activador automático o servidor) | |
| Propiedades (nombre, tipo y ejemplo) | |
| Posición en el embudo | |
| Métricas que lo usan | |
| Evento clave en GA4 | |
| Responsable | |
| Estado (planificado, implementado, verificado) | |
| Última verificación | |

*Plantilla 6.4. Ficha de evento 4*

| Campo | Valor |
| ---- | ------ |
| Evento GA4 | |
| Filas de la matriz | |
| Descripción (una frase) | |
| Disparador (acción, página y elemento) | |
| Fuente (dataLayer, activador automático o servidor) | |
| Propiedades (nombre, tipo y ejemplo) | |
| Posición en el embudo | |
| Métricas que lo usan | |
| Evento clave en GA4 | |
| Responsable | |
| Estado (planificado, implementado, verificado) | |
| Última verificación | |

*Plantilla 6.5. Ficha de evento 5*

| Campo | Valor |
| ---- | ------ |
| Evento GA4 | |
| Filas de la matriz | |
| Descripción (una frase) | |
| Disparador (acción, página y elemento) | |
| Fuente (dataLayer, activador automático o servidor) | |
| Propiedades (nombre, tipo y ejemplo) | |
| Posición en el embudo | |
| Métricas que lo usan | |
| Evento clave en GA4 | |
| Responsable | |
| Estado (planificado, implementado, verificado) | |
| Última verificación | |

*Plantilla 6.6. Ficha de evento 6*

| Campo | Valor |
| ---- | ------ |
| Evento GA4 | |
| Filas de la matriz | |
| Descripción (una frase) | |
| Disparador (acción, página y elemento) | |
| Fuente (dataLayer, activador automático o servidor) | |
| Propiedades (nombre, tipo y ejemplo) | |
| Posición en el embudo | |
| Métricas que lo usan | |
| Evento clave en GA4 | |
| Responsable | |
| Estado (planificado, implementado, verificado) | |
| Última verificación | |

*Plantilla 6.7. Tu diccionario de propiedades*

| Propiedad | Tipo | Valores de ejemplo | Eventos que la llevan | ¿Registrar en GA4? |
| ------- | ---- | ---------- | ------- | ----- |
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

## Antes de seguir

- [ ] Hay una ficha por cada evento distinto de la matriz.
- [ ] Cada propiedad tiene tipo y valor de ejemplo.
- [ ] Las propiedades del embudo están en todos sus pasos.
- [ ] Cada ficha tiene un responsable con nombre.
- [ ] Sabes qué propiedades vas a registrar como dimensión personalizada en GA4.
- [ ] Ninguna propiedad lleva datos que escribe la persona en el formulario.
