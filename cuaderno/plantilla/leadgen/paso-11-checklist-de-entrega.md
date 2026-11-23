# Paso 11. Checklist de entrega

**Qué te llevas.** El paquete de entrega revisado y la prueba de que tu medición responde tus preguntas de negocio.

## Por qué importa

El trabajo tiene cuatro pilares: diseñar, implementar, vigilar y documentar. Además, el dato necesita un dueño y una evolución, con una auditoría de valor cada uno o dos meses. La entrega es la versión 1 de tu medición. A partir de ahí, se mantiene.

El dato también empeora si nadie quita lo que sobra. Revisa la matriz cada trimestre y quita las filas que nadie usa.

La prueba final vuelve al paso 0. Una pregunta de negocio está respondida si tiene filas en la matriz y un sitio donde se lee la respuesta. Si le falta cualquiera de las dos, tu medición no la responde. En captación, el sitio suele estar repartido: GA4 dice qué canal trajo el contacto y la agenda dice si acabó en cita.

## Ejemplo con Clínica Dental Alameda

*Ejemplo 11.1. De la pregunta al informe*

| Pregunta | Filas de la matriz | Dónde se responde |
| --- | --- | --- |
| ¿Qué canal trae pacientes? | 4 y UTMs | GA4, adquisición de tráfico con el evento clave `generate_lead`. Las citas confirmadas se cuentan en la agenda de la clínica |
| ¿Qué canal trae llamadas? | 5 y UTMs | GA4, exploración libre: `phone_click` por grupo de canales de la sesión y categoría de dispositivo. Las llamadas atendidas se leen en la centralita |
| ¿Qué canal trae conversaciones de WhatsApp? | 6 y UTMs | GA4, exploración libre: `whatsapp_click` por grupo de canales de la sesión. Las respuestas se leen en WhatsApp Business |
| ¿Qué páginas empujan a pedir cita? | 1 | GA4, exploración libre: eventos `cta_click` por ruta de la página |
| ¿La información del tratamiento acerca a la cita? | 2 y 4 | GA4, exploración de embudo: `page_read` en implantes y después `generate_lead` |
| ¿Qué servicios retienen al visitante? | 3 | GA4, exploración libre: eventos `timer_5s` por `page_path` frente a las vistas de cada tratamiento. Necesita `page_path` registrado como dimensión personalizada |
| ¿La ficha de Google trae visitas que piden cita? | 4 y UTMs | GA4, adquisición de tráfico filtrada por `utm_campaign` = `2026-11_ficha-google`, con el evento clave `generate_lead` |

## Tu proyecto

1. Rellena la plantilla 11.1 con cada pregunta del paso 0. Si una pregunta no tiene filas o sitio donde responderse, vuelve al paso 5 o anota por qué queda fuera.
2. Repasa la checklist de entrega (plantilla 11.2) y marca cada pieza.
3. Pon nombres y fechas al mantenimiento (plantilla 11.3).
4. Entrega estos archivos:
   - `plan/matriz.csv`
   - `plan/qa.csv` y la carpeta `plan/capturas/`
   - `plan/utms.csv`
   - `especificacion.md` de tu proyecto
   - `gtm/<proyecto>.json`, exportado de la versión publicada
   - Esta plantilla rellenada

*Plantilla 11.1. De tus preguntas al informe*

| Pregunta (paso 0) | Filas de la matriz | Dónde se responde | Responsable |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |

*Plantilla 11.2. Checklist de entrega*

| Pieza | Qué debe tener | Cómo se comprueba | OK |
| --- | --- | --- | --- |
| Matriz de conversiones | Al menos 3 micro y 3 macro, con acción, tipo, evento GA4, parámetros, activador y evento clave | Cada fila tiene un nombre de evento válido y un activador implementable | |
| GTM4WP | Contenedor instalado, el módulo de tu formulario activado y los datos personales desactivados | La plantilla 7.1 está completa y la vista previa conecta | |
| Etiqueta de Google y píxel | La etiqueta de Google (GA4) y el píxel de Meta en todas las páginas | La vista previa muestra las dos etiquetas activadas en la vista de página | |
| Activadores | Un activador de clic en elemento, uno de formulario y uno de evento personalizado | Cada uno activa su etiqueta y no se activa donde no debe | |
| Variables y dataLayer | Variables integradas activadas y al menos una variable de capa de datos usada como parámetro | El parámetro llega con su valor a DebugView | |
| Registro de QA | Una captura de Tag Assistant y otra de DebugView por cada fila de la matriz | Cada fila tiene sus dos capturas | |
| Datos personales | Ningún dato que escribe la persona en el dataLayer, en GA4 ni en Meta | La prueba de datos personales del paso 9 está en OK | |
| Hoja de UTMs | Tres enlaces, de email, social orgánico y anuncio, con la convención | La visita aparece en GA4 con la fuente y el medio esperados | |
| Fichas y especificación | Una ficha por evento y el `especificacion.md` de tu web | Quien gestiona la web puede aplicarlo sin preguntarte | |
| Preguntas de negocio | Cada pregunta del paso 0 con sus filas y su sitio de respuesta | La plantilla 11.1 está completa | |

*Plantilla 11.3. Tu mantenimiento*

| Tarea | Responsable | Cada cuánto |
| --- | --- | --- |
| Revisión de los eventos clave | | Cada semana |
| Comparación de leads en GA4 con citas en la agenda | | Cada mes |
| Prueba completa de QA | | Cada cuatro semanas y tras cada cambio |
| Comprobación de que el formulario sigue con su título | | Tras cada cambio en la web |
| Revisión de valores de UTM inesperados | | Cada mes |
| Revisión de la matriz: quitar lo que nadie usa | | Cada trimestre |

## Antes de entregar

- [ ] Todas las filas de la plantilla 11.2 están en OK.
- [ ] Cada pregunta del paso 0 tiene su respuesta en la plantilla 11.1, o una nota de por qué no la tiene.
- [ ] El contenedor publicado es la versión que pasó la QA.
- [ ] El mantenimiento tiene responsables con nombre.
