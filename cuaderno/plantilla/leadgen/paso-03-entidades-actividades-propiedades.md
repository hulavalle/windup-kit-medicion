# Paso 3. Entidades, actividades y propiedades

**Qué te llevas.** Tu negocio ordenado en tres capas: las fases que vive tu cliente, las cosas del negocio con las que interactúa y los datos que acompañan a cada actividad.

## Por qué importa

El diseño se ordena en dos dimensiones de tres niveles. En horizontal hay tres capas, según quién usa el dato y para qué. En vertical hay tres niveles de detalle.

| Nivel | Capa de cliente | Capa de producto | Capa de interacción |
| --- | --- | --- | --- |
| Entidades | El cliente | Las cosas del negocio: solicitud, llamada, cita | El elemento de la página |
| Actividades | Fases del recorrido: interesado, contacto, paciente nuevo, paciente que vuelve | El ciclo de vida de cada entidad: enviada, confirmada, atendida | Clic, envío |
| Propiedades | Datos del cliente | Datos de cada entidad: `lead_type`, `form_id` | `element_text`, `link_url` |

La capa de cliente es la más importante y tiene pocos elementos, entre 8 y 10. Sus fases no se implementan como eventos. Se derivan de los eventos de producto con reglas y umbrales. En GA4 se construyen después como audiencias o segmentos.

La capa de producto da casi todas las filas de tu matriz. Una entidad tiene identidad propia y ciclo de vida. Para encontrarlas, hazte dos preguntas:

- ¿Dónde se crean datos? Una solicitud, una llamada, una conversación.
- ¿Dónde hay un flujo lineal con un único estado de éxito? El envío correcto del formulario, la llamada atendida.

Añade una entidad solo como último recurso. Lo demás se resuelve con propiedades.

La capa de interacción recoge clics. Para no tener un evento por botón, usa un solo evento con propiedades de elemento. Su audiencia es pequeña, sobre todo UX.

Una actividad añade significado de negocio a un evento. Un clic en un botón es un evento. «Solicitud de cita enviada» es una actividad.

Las propiedades se definen en la entidad, y cada actividad usa las que necesita. Sigue estas reglas:

- Entre 2 y 20 valores posibles por propiedad. Mejor tramos que números sueltos.
- Pon siempre el identificador cuando existe, como `form_id`.
- Escribe los nombres en `snake_case`. En GA4 usa los nombres de parámetro recomendados cuando existen.
- No guardes datos personales. Lo que escribe la persona en el formulario no es una propiedad: ni su nombre, ni su teléfono, ni el motivo de la consulta. En una clínica, el motivo puede ser un dato de salud.

Si captas leads, parte de este catálogo: página de servicio, solicitud, llamada, conversación, cita y elemento. La cita confirmada y la primera visita casi nunca se miden, y son el resultado que paga el negocio.

## Ejemplo con Clínica Dental Alameda

*Ejemplo 3.1. Capas de producto e interacción*

| Entidad | Capa | Por qué es entidad | Actividad | Evento GA4 | Propiedades |
| --- | --- | --- | --- | --- | --- |
| Página de tratamiento | Producto | Contenido cuya lectura y permanencia se pueden medir | Leída al 75 %, vista 5 segundos | `page_read`, `timer_5s` | `percent_scrolled`, `page_path` |
| Solicitud de cita | Producto | El formulario crea una solicitud | Enviada en la web. Confirmada o anulada en la agenda | `generate_lead` | `lead_type`, `form_id` |
| Llamada | Producto | Contacto con un único estado de éxito: atendida | Iniciada con un clic en la web. Atendida o perdida en la centralita | `phone_click` | `page_path` |
| Conversación de WhatsApp | Producto | Crea datos: una conversación | Iniciada con un clic en la web. Respondida en WhatsApp Business | `whatsapp_click` | `page_path` |
| Cita | Producto | Ciclo de vida propio: pedida, confirmada, realizada, anulada | Toda fuera de la web | Ninguno | Se lee en la agenda |
| Elemento | Interacción | Una sola entidad para todos los clics | Clic | `cta_click` | `element_text`, `link_url` |

La llamada y la conversación se miden con un clic en un enlace, pero no son clics de interfaz. Son la actividad con la que empieza un lead, y por eso tienen evento propio. El clic es el último paso que GTM ve. Si la llamada se atiende o no, lo dice la centralita.

*Ejemplo 3.2. Capa de cliente*

| Fase | Regla para reconocerla (umbral a probar) | Se deriva de |
| --- | --- | --- |
| Interesado en un tratamiento | Lee al 75 % o pasa 5 segundos en una página de `/tratamientos/` | `page_read`, `timer_5s` |
| Contacto | Primer `generate_lead`, `phone_click` o `whatsapp_click` | Los tres eventos macro |
| Paciente nuevo | Primera visita realizada | Agenda de la clínica, fuera de GA4 |
| Paciente en tratamiento | Acepta el presupuesto | Programa de gestión de la clínica, fuera de GA4 |
| Paciente que vuelve | Revisión en menos de 12 meses | Agenda, fuera de GA4 |
| Contacto sin cita | Contactó y no tiene cita en 30 días | Recuento por canal de GA4 frente a la agenda |

Los umbrales son un punto de partida. Como las fases se derivan, puedes cambiarlos sin tocar la implementación. Sin login, GA4 no une a la persona que contacta con la cita de la agenda. Por eso la comparación se hace con recuentos por canal y no persona a persona. Ninguna fase se envía a GA4 con datos del paciente.

*Ejemplo 3.3. Fuera de la versión 1*

| Candidato | Por qué queda fuera |
| --- | --- |
| Eventos de campo del formulario (`gtm4wp.formElementEnter`, `gtm4wp.formElementLeave`) | GTM4WP genera dos eventos por campo. La pregunta 10 tiene prioridad baja |
| `form_start`, `form_submit` y `generate_lead` del propio plugin | Con **Also push GA4 recommended events** activado, contarían dos veces junto al `generate_lead` que se construye en GTM |
| Tratamiento elegido en el formulario | Lo escribe el paciente y puede ser un dato de salud. Si hace falta, se deduce de la página desde la que llegó |
| Cita confirmada, primera visita y presupuesto aceptado | Ocurren en la agenda y en el programa de gestión |
| Reseñas en Google | Ocurren en Google Business Profile, fuera de la web |

## Tu proyecto

1. Lista tus entidades de producto con las dos preguntas de arriba y compáralas con el catálogo de captación. Si ofreces un servicio, piensa en reserva, presupuesto, cita o solicitud.
2. Escribe el ciclo de vida de cada entidad, desde que se crea hasta que termina.
3. Marca qué actividades ocurren en la web y cuáles fuera.
4. Añade las propiedades de cada entidad con las reglas de arriba.
5. Escribe de 3 a 6 fases de cliente, cada una con su regla y su umbral.
6. Anota lo que queda fuera de la versión 1 y por qué.

*Plantilla 3.1. Tus entidades de producto e interacción*

| Entidad | Capa | Por qué es entidad | Actividades (ciclo de vida) | ¿En la web? | Propiedades |
| --- | --- | --- | --- | --- | --- |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |

*Plantilla 3.2. Tus fases de cliente*

| Fase | Regla para reconocerla (umbral a probar) | Se deriva de |
| --- | --- | --- |
| | | |
| | | |
| | | |
| | | |
| | | |
| | | |

*Plantilla 3.3. Fuera de tu versión 1*

| Candidato | Por qué queda fuera |
| --- | --- |
| | |
| | |
| | |
| | |
| | |

## Antes de seguir

- [ ] Tienes entre 4 y 10 entidades. Si tienes más, alguna es en realidad una propiedad.
- [ ] Cada macro candidata del paso 2 es la actividad final de un flujo lineal.
- [ ] Cada propiedad tiene entre 2 y 20 valores posibles, o es un identificador o una ruta.
- [ ] Ninguna propiedad lleva email, teléfono, nombre ni lo que escribe la persona en el formulario.
- [ ] Cada fase de cliente tiene una regla con umbral y sale de eventos que sí mides o de un sistema que sí lo cuenta.
- [ ] Los clics de interfaz usan un solo evento con propiedades de elemento. Solo el clic que empieza un lead, como el del teléfono, tiene evento propio.
