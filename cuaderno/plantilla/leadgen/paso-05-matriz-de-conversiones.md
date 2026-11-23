# Paso 5. Matriz de conversiones

**Qué te llevas.** Tu matriz de conversiones, con al menos 3 macro y 3 micro. Cada fila lleva su pregunta de negocio, su evento de GA4, sus parámetros y su activador, y cada macro lleva su contrapeso. La copias a `plan/matriz.csv`.

## Por qué importa

La matriz es el contrato entre negocio y técnica. Marketing entiende la parte de negocio. GTM implementa la parte técnica.

Una macro cierra un flujo lineal con su estado de éxito y supone un compromiso a cambio de un lead. En captación son macro la solicitud enviada, el clic en el teléfono y el clic en WhatsApp. Una micro es un paso intermedio que indica avance o interés, y sirve para embudos y segmentos. En GA4, las macro se marcan como evento clave.

Pon nombres de negocio, no de aplicación. `cta_cita_hero`, `cta_cita_footer` y `cta_cita_menu` son tres eventos para un mismo gesto. `cta_click` con una propiedad de ubicación es uno solo. Aun así, `cta_click` habla de la web y no del negocio. El evento que entiende marketing es «Solicitud de cita iniciada».

La matriz junta los dos mundos. La columna de acción lleva el nombre de negocio. La columna de evento lleva el nombre de GA4. Usa un evento recomendado de GA4 cuando exista, como `generate_lead`. Si no existe, crea uno en `snake_case`, de 40 caracteres como mucho y que empiece por una letra. GA4 no tiene evento recomendado para llamadas ni para WhatsApp, y por eso `phone_click` y `whatsapp_click` son eventos propios.

Controla la matriz con el árbol de métricas. Cada fila alimenta una métrica de un KR. Si una fila no alimenta ninguna, sobra. Si a una métrica le falta un evento, falta una fila.

Elige el activador según la acción:

| Si la acción es | Activador de GTM | Condición típica |
| --- | --- | --- |
| El envío correcto de un formulario de Contact Form 7 | Evento personalizado | Nombre del evento igual a `gtm4wp.contactForm7MailSent` y `{{dlv - formname}}` igual a `Pedir cita` |
| Un clic en un enlace de teléfono | Clic - Solo enlaces | Click URL empieza por `tel:` |
| Un clic en un enlace de WhatsApp | Clic - Solo enlaces | Click URL coincide con la expresión regular `wa\.me\|api\.whatsapp\.com` |
| Un clic en un botón o un enlace interno | Clic - Solo enlaces, o Clic - Todos los elementos | Click URL contiene `/pedir-cita`, o Click Classes contiene `cta-pedir-cita` |
| La lectura de una página | Profundidad de desplazamiento | 75 % vertical, Page Path contiene `/tratamientos/implantes` |
| Pasar un tiempo en una página | Temporizador | Intervalo 5000 ms, límite 1, Page Path contiene `/tratamientos/` |
| El envío de un formulario de otro plugin | El evento de ese plugin, o Envío de formulario | Form ID de tu formulario. Prueba que no salta con un envío rechazado |

No uses el activador de envío de formulario con Contact Form 7. El formulario se envía sin recargar la página, y ese activador no distingue un envío correcto de uno rechazado. Tampoco uses la vista de una página de gracias: Contact Form 7 muestra su mensaje en la misma página. Usa el evento de GTM4WP.

## Ejemplo con Clínica Dental Alameda

*Ejemplo 5.1. Matriz, parte de negocio*

| Nº | Acción de negocio | Tipo | Pregunta de negocio | Evento clave | Contrapeso |
| --- | --- | --- | --- | --- | --- |
| 1 | Clic en «Pedir cita» | Micro | ¿Qué páginas empujan a pedir cita? | No | |
| 2 | Lee la página de un tratamiento (75 % de scroll) | Micro | ¿La información del tratamiento acerca a la cita? | No | |
| 3 | Pasa 5 s en una página de servicio | Micro | ¿Qué servicios retienen al visitante? | No | |
| 4 | Envía el formulario de cita | Macro | ¿Qué canal trae pacientes? | Sí | Al menos un 60 % de solicitudes acaban en cita confirmada |
| 5 | Pulsa el teléfono | Macro | ¿Qué canal trae llamadas? | Sí | Al menos un 80 % de llamadas atendidas |
| 6 | Pulsa WhatsApp | Macro | ¿Qué canal trae conversaciones de WhatsApp? | Sí | Al menos un 50 % de conversaciones con respuesta del paciente |

*Ejemplo 5.2. Matriz, parte técnica*

| Nº | Evento GA4 | Parámetros | Activador GTM | Condición |
| -- | ------ | ------ | ------ | ---------- |
| 1 | `cta_click` | `element_text`, `link_url` | Clic - Solo enlaces | Click URL contiene `/pedir-cita` |
| 2 | `page_read` | `percent_scrolled`, `page_path` | Profundidad de desplazamiento | 75 % vertical, Page Path contiene `/tratamientos/implantes` |
| 3 | `timer_5s` | `page_path` | Temporizador (`Timer - 5 s`) | Page Path contiene `/tratamientos/` |
| 4 | `generate_lead` | `lead_type` = `cita`, `form_id` | Evento personalizado | `event` = `gtm4wp.contactForm7MailSent` y `formname` = `Pedir cita` |
| 5 | `phone_click` | `page_path` | Clic - Solo enlaces | Click URL empieza por `tel:` |
| 6 | `whatsapp_click` | `page_path` | Clic - Solo enlaces | Click URL coincide con `wa\.me\|api\.whatsapp\.com` |

*Ejemplo 5.3. Árbol de métricas*

| KR | Filas de la matriz | Métrica |
| --- | --- | --- |
| KR1. Solicitudes de cita | 1 y 4 | Solicitudes por canal y clics en «Pedir cita» |
| KR2. Llamadas | 5 | Clics en el teléfono por canal, en móvil |
| KR3. Conversaciones de WhatsApp | 6 | Clics en WhatsApp por canal |
| Sin KR directo | 2 y 3 | Responden las preguntas 6 y 7 del paso 0. Se revisan dentro de tres meses |

La matriz de la clínica está en `plan/ejemplos/matriz-clinica-dental.csv`. Cada fila de las dos tablas es una línea. Así queda la fila 4:

```text
id,accion_negocio,tipo,evento_ga4,parametros,activador_gtm,condicion,evento_clave,pregunta_de_negocio,contrapeso
4,Envía el formulario de cita,macro,generate_lead,"lead_type=cita, form_id",Evento personalizado,event = gtm4wp.contactForm7MailSent y formname = Pedir cita,sí,¿Qué canal trae pacientes?,al menos un 60 % de solicitudes acaban en cita confirmada
```

## Tu proyecto

1. Filtra los candidatos del paso 4 con la plantilla 5.1. Cada candidato acaba como fila, como propiedad de otra fila o fuera.
2. Rellena la parte de negocio (plantilla 5.2). Empieza por las macro: una por cada puerta por la que llega un lead.
3. Rellena la parte técnica (plantilla 5.3) con el mismo número de fila.
4. Comprueba el árbol de métricas (plantilla 5.4).
5. Sustituye las filas de ejemplo de `plan/matriz.csv` por las tuyas, con las mismas columnas.

*Plantilla 5.1. Filtro de candidatos*

| Candidato (paso 4) | ¿Responde una pregunta? (nº) | ¿Alimenta un KR? | ¿Se mide en la web? | Decisión: fila, propiedad o fuera |
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

*Plantilla 5.2. Tu matriz, parte de negocio*

| Nº | Acción de negocio | Tipo | Pregunta de negocio | Evento clave | Contrapeso |
| --- | --- | --- | --- | --- | --- |
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |
| 6 | | | | | |
| 7 | | | | | |
| 8 | | | | | |
| 9 | | | | | |
| 10 | | | | | |
| 11 | | | | | |
| 12 | | | | | |

*Plantilla 5.3. Tu matriz, parte técnica*

| Nº | Evento GA4 | Parámetros | Activador GTM | Condición |
| -- | ------ | ------ | ------ | ---------- |
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |
| 7 | | | | |
| 8 | | | | |
| 9 | | | | |
| 10 | | | | |
| 11 | | | | |
| 12 | | | | |

*Plantilla 5.4. Tu árbol de métricas*

| KR | Filas de la matriz | Métrica |
| --- | --- | --- |
| KR1 | | |
| KR2 | | |
| KR3 | | |
| Sin KR directo | | |

## Antes de seguir

- [ ] Hay al menos 3 macro y 3 micro.
- [ ] Cada puerta por la que llega un lead tiene su macro: formulario, teléfono, WhatsApp.
- [ ] Cada fila responde una pregunta del paso 0.
- [ ] Cada macro tiene contrapeso y está marcada como evento clave.
- [ ] Cada nombre de evento es un evento recomendado de GA4 o uno propio en `snake_case`.
- [ ] Ningún evento repite un nombre que ya envía la medición mejorada, como `scroll`, `click`, `form_start` o `form_submit`, salvo que desactives esa opción.
- [ ] Cada activador tiene una condición. Ninguno salta en todos los clics ni en todas las páginas.
- [ ] Ningún parámetro sale de lo que escribe la persona en el formulario.
- [ ] El total cabe en tu presupuesto del paso 1.
- [ ] `plan/matriz.csv` tiene las mismas filas que estas tablas.
