# Paso 9. Protocolo de QA con evidencias

**Qué te llevas.** Un registro de QA con una fila por evento de la matriz, sus dos capturas de Tag Assistant y de DebugView y su OK, y una prueba de que ningún dato personal sale de la web. Con todo en OK, publicas el contenedor. Lo copias a `plan/qa.csv`.

## Por qué importa

Los eventos de tracking fallan. Fallan a menudo, en pequeño y sin hacer ruido. Un evento implementado sin vigilancia acabará fallando.

Que una etiqueta se active no prueba que el dato llegue. Cada evento tiene que cumplir tres reglas, y las tres:

1. Se activó. La etiqueta aparece entre las etiquetas activadas de la vista previa de GTM, en Tag Assistant.
2. Se envió. La pestaña **Red** de las herramientas de desarrollador muestra la petición: `collect` para GA4 y `facebook.com/tr/` para Meta, con código 200 o 204.
3. Llegó. El evento y sus parámetros aparecen en DebugView de GA4.

Cada evento pasa además su propia prueba: se dispara cuando debe, no se dispara cuando no debe y cada propiedad llega con su valor. Repite las pruebas con calendario: prueba completa cada cuatro semanas, prueba rápida tras cada cambio grande y siempre tras un retoque de última hora.

En captación, la prueba de «no se dispara cuando no debe» importa más. Un formulario rechazado que cuenta como lead infla el KR y nadie lo nota hasta que recepción no encuentra las solicitudes. Y una web con formulario necesita una prueba más: que ningún dato que escribe la persona sale hacia GA4 o Meta.

Después de publicar, revisa cada semana durante 30 minutos de 4 a 5 eventos clave. Si una línea cae a cero, decide si es una tendencia real o un fallo de medición.

## Ejemplo con Clínica Dental Alameda

*Ejemplo 9.1. Registro de QA*

| Nº | Evento | Acción de prueba | Se dispara cuando debe | No se dispara cuando no debe | Parámetros OK | Capturas | OK |
| ---- | --------------- | ------------ | -------- | ---------- | -------------- | ------------ | ------ |
| 1 | `cta_click` | Pulsar «Pedir cita» en la portada | Sí | Sí, no salta en el enlace «Tratamientos» del menú | Sí, `link_url` contiene `/pedir-cita/` | `qa-01-ta.png`, `qa-01-dv.png` | OK |
| 2 | `page_read` | Bajar al 75 % de `/tratamientos/implantes/` | Sí | Sí, no salta al 75 % de `/tratamientos/ortodoncia/` | Sí, `percent_scrolled` = 75 | `qa-02-ta.png`, `qa-02-dv.png` | OK |
| 3 | `timer_5s` | Quedarse 5 segundos en `/tratamientos/ortodoncia/` | Sí, una vez | Sí, no salta en la portada ni en `/pedir-cita/` | Sí, `page_path` = `/tratamientos/ortodoncia/` | `qa-03-ta.png`, `qa-03-dv.png` | OK |
| 4 | `generate_lead` | Enviar «Pedir cita» con datos inventados | Sí | Sí, no salta con un email mal escrito | Sí, `lead_type` = `cita`. Pero la **Capa de datos** mostraba en `inputs` el nombre y el teléfono de prueba: el plugin estaba en **Full**. Se puso en **None** y se probó otra vez | `qa-04-ta.png`, `qa-04-dv.png` | OK tras corregir |
| 5 | `phone_click` | Pulsar el teléfono de la cabecera | Sí | Sí, no salta al pulsar WhatsApp | Sí, `page_path` = `/` | `qa-05-ta.png`, `qa-05-dv.png` | OK |
| 6 | `whatsapp_click` | Pulsar el botón flotante de WhatsApp | Sí | Sí, no salta al pulsar el teléfono | Sí, `page_path` = `/tratamientos/implantes/` | `qa-06-ta.png`, `qa-06-dv.png` | OK |

La fila 4 muestra cómo se anota un fallo. No se borra: se escribe qué pasó, qué se corrigió y el resultado de la segunda prueba.

La web de la clínica tiene un plugin de cookies con Consent Mode v2 en modo básico. Su prueba de consentimiento espera esto:

*Ejemplo 9.2. Prueba de consentimiento*

| Estado | Peticiones que deben salir | Peticiones que no deben salir |
| --- | --- | --- |
| Sin respuesta | Ninguna de GA4 ni de Meta | `collect` y `facebook.com/tr/` |
| Rechazado | Ninguna de GA4 ni de Meta | `collect` y `facebook.com/tr/` |
| Solo analítica | `collect` de GA4 | `facebook.com/tr/` |
| Todo aceptado | `collect` y `facebook.com/tr/` | |

*Ejemplo 9.3. Prueba de datos personales*

| Dónde miras | Qué no debe aparecer | Resultado |
| --- | --- | --- |
| Pestaña **Capa de datos** del evento `gtm4wp.contactForm7MailSent` | Nombre, email, teléfono o mensaje en `inputs` | OK tras poner **None** |
| Pestaña **Red**, petición `collect` de `generate_lead` | Ningún dato del formulario en los parámetros | OK |
| Pestaña **Red**, petición `facebook.com/tr/` | Ningún dato del formulario | OK |
| Barra de direcciones tras enviar | Datos del formulario en la URL | OK, Contact Form 7 envía sin cambiar la URL |

## Tu proyecto

1. Avisa a quien recibe las solicitudes de que vas a enviar pruebas. Usa siempre datos inventados, nunca los de un paciente o cliente real.
2. En GTM, pulsa **Vista previa**, escribe la URL de tu web y conecta. Se abre Tag Assistant y tu web queda conectada. Si GTM4WP excluye a los administradores, prueba en una ventana de incógnito sin iniciar sesión en WordPress.
3. En otra ventana, abre GA4 > **Administrar** > **DebugView**. La vista previa de GTM activa el modo de depuración. Los eventos pueden tardar unos segundos en aparecer.
4. Abre las herramientas de desarrollador con F12, o Cmd+Opción+I en Mac, y ve a la pestaña **Red**. Filtra por `collect`.
5. Haz la acción de prueba de la fila. En un ordenador, el enlace `tel:` abre un aviso del navegador. Ciérralo, porque el clic ya cuenta.
6. En Tag Assistant, selecciona el evento en la columna izquierda. Comprueba que tu etiqueta está entre las activadas. Haz una captura y guárdala como `qa-NN-ta.png`, con NN el número de fila.
7. Abre la pestaña **Variables** o **Capa de datos** de Tag Assistant y comprueba los valores.
8. Haz la acción que no debe disparar el evento, como enviar el formulario con un email mal escrito o pulsar el otro botón. Comprueba que tu etiqueta está entre las no activadas.
9. En la pestaña **Red**, comprueba que la petición tiene código 200 o 204.
10. En DebugView, pulsa el evento y luego cada parámetro. Comprueba su valor. Haz una captura y guárdala como `qa-NN-dv.png`.
11. Rellena la fila. Si algo falla, corrige en GTM o en GTM4WP, vuelve a la vista previa y repite la fila.
12. Haz la prueba de datos personales (plantilla 9.3) con un envío correcto del formulario.
13. Haz la prueba de consentimiento en una ventana de incógnito nueva por estado.
14. Con todo en OK, ve a **Enviar** > **Publicar y crear versión**. Escribe un nombre y una descripción que digan qué cambia.
15. Copia el registro a `plan/qa.csv` y guarda las capturas en `plan/capturas/`.

*Plantilla 9.1. Tu registro de QA*

| Nº | Evento | Acción de prueba | Se dispara cuando debe | No se dispara cuando no debe | Parámetros OK | Capturas | OK |
| --- | ---------- | ------------ | -------- | ---------- | ------------ | ---------- | ----- |
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |
| 6 | | | | | | | |
| 7 | | | | | | | |
| 8 | | | | | | | |
| 9 | | | | | | | |
| 10 | | | | | | | |

*Plantilla 9.2. Tu prueba de consentimiento*

| Estado | Peticiones que deben salir | Peticiones que no deben salir | Resultado |
| --- | --- | --- | --- |
| Sin respuesta | | | |
| Rechazado | | | |
| Solo analítica | | | |
| Todo aceptado | | | |

*Plantilla 9.3. Tu prueba de datos personales*

| Dónde miras | Qué no debe aparecer | Resultado |
| --- | --- | --- |
| Pestaña **Capa de datos** del evento de tu formulario | Lo que escribe la persona en el formulario | |
| Pestaña **Red**, petición `collect` de tu macro de formulario | Ningún dato del formulario en los parámetros | |
| Pestaña **Red**, petición `facebook.com/tr/` | Ningún dato del formulario | |
| Barra de direcciones tras enviar | Datos del formulario en la URL | |

*Plantilla 9.4. Tu registro de versiones*

| Versión | Fecha | Qué cambia | Quién la probó |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |

*Plantilla 9.5. Tu revisión semanal*

| Evento clave | Valor normal por semana | Quién lo revisa | Qué haces si cae a cero |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |

## Antes de seguir

- [ ] Cada fila de la matriz tiene su fila en el registro de QA.
- [ ] Cada fila tiene su captura de Tag Assistant y su captura de DebugView.
- [ ] Has comprobado que cada activador no se dispara donde no debe, también con un formulario rechazado.
- [ ] Cada parámetro llega con su valor a DebugView.
- [ ] La prueba de datos personales está en OK.
- [ ] La versión publicada tiene nombre y descripción.
- [ ] La revisión semanal tiene responsable y día fijo.
- [ ] `plan/qa.csv` tiene las mismas filas que tu registro.
