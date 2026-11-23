# Plantilla para proyectos de e-commerce

Máster Técnico en Marketing Digital & IA · Clase de Google Tag Manager · 2026

Si estuviste en clase, ya tienes el cuaderno rellenado; si no, empieza aquí por el paso 0. Esta plantilla repite los doce pasos en versión completa para una tienda online en WordPress con WooCommerce, para que apliques el método a un proyecto real fuera del máster. Si tu proyecto capta contactos, citas o presupuestos en vez de vender, usa la plantilla de captación de leads.

El ejemplo de cada paso es Café Fandango, la tienda online de café de especialidad de la demo de clase. La demo es una web a medida. En los pasos 7 a 9 ves cómo cambia la misma tienda en WooCommerce con GTM4WP, que es lo que harás tú.

Los informes estándar de GA4 te dicen cuántas visitas tienes y de dónde. Al terminar la plantilla, tu medición responderá las preguntas de negocio de tu tienda, por ejemplo qué canal trae clientes que repiten o en qué paso se pierden los que no compran.

*Plantilla A. Datos del proyecto*

| Campo | Tu respuesta |
| ---- | ------ |
| Proyecto | |
| Cliente o empresa | |
| URL de la tienda | |
| Equipo | |
| Responsable del dato | |
| Fecha de entrega | |

## Cómo se usa

1. Sigue los pasos en orden. Cada paso usa lo que sale del anterior: los eventos salen de las preguntas y las preguntas salen de los objetivos.
2. Lee el ejemplo de Café Fandango antes de rellenar tu plantilla. Las plantillas tienen las mismas columnas que el ejemplo.
3. Rellena las tablas de este documento. Si te falta espacio, añade filas en Word.
4. Pasa el control de «Antes de seguir» al final de cada paso. Si una casilla queda sin marcar, vuelve atrás.
5. Copia los resultados a los archivos del kit cuando el paso lo pida. Tu asistente de IA trabaja con esos archivos (`AGENTS.md`).

## Los pasos

| Paso | Qué te llevas | Dónde queda |
| --- | --- | --- |
| 0. Tu proyecto y sus preguntas de negocio | Ficha del proyecto y de 5 a 10 preguntas, cada una con la decisión que cambia | Plantilla |
| 1. Diagnóstico | Riesgos de tu proyecto y un presupuesto de eventos | Plantilla |
| 2. Del objetivo al evento | Un objetivo, tres resultados clave con número, fecha y contrapeso, y la cadena hasta el evento | Plantilla |
| 3. Entidades, actividades y propiedades | Tu negocio en tres capas: cliente, producto e interacción | Plantilla |
| 4. Event storming | El recorrido completo con sus candidatos a evento | Plantilla y pizarra |
| 5. Matriz de conversiones | Al menos 3 macro y 3 micro con pregunta, evento, activador y contrapeso | `plan/matriz.csv` |
| 6. Fichas de evento | Una ficha por evento y el diccionario de propiedades | Plantilla |
| 7. Especificación del dataLayer | Ajustes de GTM4WP, lo que empuja WooCommerce, IDs y ticket para quien desarrolla | `especificacion.md` |
| 8. Implementación en GTM | Contenedor completo desde `gtm/wp-tags-base.json`, sin publicar | GTM y `gtm/<proyecto>.json` |
| 9. Protocolo de QA | Registro con capturas y versión publicada | `plan/qa.csv` |
| 10. Estrategia UTM | Convención cerrada y enlaces comprobados | `plan/utms.csv` |
| 11. Checklist de entrega | Paquete revisado y preguntas respondidas | Entrega |

Las ideas de cada paso salen de libros de analítica y de la documentación oficial de GA4, GTM, GTM4WP y la AEPD. Las tienes en «Recursos», al final, agrupadas por paso. El contrato técnico de Café Fandango está en `especificacion.md` y `plan/matriz.csv` del kit. La configuración de GTM4WP está en `gtm4wp.md`.

## Vocabulario

| Término | Qué significa | Cómo lo llaman |
| --- | --- | --- |
| Evento | Algo que pasa en un momento concreto, con un nombre y unos datos | GA4: evento |
| Propiedad o parámetro | Dato que acompaña al evento, como `value` o `item_category` | GA4: parámetro |
| Micro conversión | Paso intermedio que indica interés, como ver una ficha o añadir al carrito | Matriz: micro |
| Macro conversión | Cierra un flujo con éxito y supone dinero o un lead: compra, suscripción, solicitud | Matriz: macro |
| Evento clave | Macro marcada en GA4 para contarla como conversión | GA4: evento clave (antes, conversión) |
| dataLayer | Capa intermedia entre la web y GTM, donde la web deja eventos y datos | GTM: capa de datos |
| Etiqueta, activador, variable | Qué se envía, cuándo y con qué datos | GTM: etiqueta, activador, variable |
| GTM4WP | Plugin de WordPress que instala el contenedor de GTM y empuja al dataLayer los eventos de WooCommerce | WordPress: **Ajustes** > **Google Tag Manager** |
