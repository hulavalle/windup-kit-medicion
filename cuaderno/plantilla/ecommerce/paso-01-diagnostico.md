# Paso 1. Diagnóstico: por qué falla el dato y cuántos eventos necesitas

**Qué te llevas.** Los riesgos de tu proyecto en las cuatro familias de problemas del dato y un presupuesto de eventos que tu equipo pueda mantener.

## Por qué importa

Casi todos los proyectos de analítica tienen problemas con los datos de eventos. Los problemas se agrupan en cuatro familias: diseño, proceso, implementación y personas.

- Diseño. El problema más común es tener demasiados eventos. Los planes de 40 a 70 eventos acaban odiados por quien los implementa. Un negocio como Airbnb se puede operar con ocho eventos. Con 40 eventos únicos ya hay que preocuparse, y con 80 el diseño está mal.
- Proceso. El dato empeora después de implementarlo, porque nadie revisa ni quita eventos. En el 60 % de las empresas el tracking se pierde en el backlog.
- Implementación. El navegador nunca envía el 100 % de los eventos. La identidad se rompe cuando caduca una cookie, cuando el cliente cambia de dispositivo o cuando el pago pasa a otro dominio. Con ella se pierde qué campaña convirtió. Sin pruebas, un parámetro roto deja vacío un informe y nadie se entera.
- Personas. Cada equipo llama distinto a lo mismo: «cuenta», «usuario», «cliente». Y el dato no suele tener dueño.

Tu situación decide cuántos eventos puedes tener. Sin desarrolladores, pocos eventos. También cuentan tu tiempo y la etapa del proyecto.

## Ejemplo con Café Fandango

*Ejemplo 1.1. Diagnóstico*

| Pregunta | Café Fandango | Consecuencia para el diseño |
| --- | --- | --- |
| ¿Quién puede cambiar el código? | La web ya trae los `dataLayer.push` de ecommerce. No hay más desarrollo previsto | Los eventos de ecommerce salen del dataLayer. El resto sale de activadores automáticos de GTM |
| ¿Tu plataforma o un plugin ya envía datos al dataLayer? | Sí, la propia web, según `especificacion.md`. En WooCommerce lo haría GTM4WP | Se usan sus pushes tal como están |
| ¿Qué pasos ocurren fuera de la web? | Envío, recepción, devoluciones, renovaciones y bajas de la suscripción | Quedan fuera de GTM. Los contrapesos de bajas y devoluciones se miden en el backend |
| ¿Hay más de un dominio en el recorrido? | No | Sin riesgo de cross-domain |
| ¿Hay login? | No | Sin `user_id`. GA4 reconoce al cliente por la cookie de su navegador |
| ¿Hay banner de cookies con Consent Mode v2? | En la demo, no | En una web real en España haría falta antes de publicar |
| ¿Qué mide ya la web? | GA4 con la medición mejorada activada | La medición mejorada envía `scroll` al 90 % y los eventos de vídeo de YouTube. `page_read` y `timer_5s` tienen otro nombre y no se cuentan dos veces |
| ¿Cuántas horas al mes dedicará el equipo? | Dos horas al mes | Diez filas como máximo |
| ¿Quién mira el dato y cada cuánto? | Marketing, cada lunes | Un responsable y una revisión semanal (paso 9) |

*Ejemplo 1.2. Presupuesto de eventos*

| Tipo | Filas | Eventos GA4 distintos | Por qué |
| --- | --- | --- | --- |
| Macro | 3 | 2: `purchase` y `generate_lead` | Compra, suscripción y solicitud de cafetería. La suscripción reutiliza `purchase` y se reconoce por `item_category` |
| Micro | 7 | 7 | Un evento por etapa del embudo de compra y tres señales de interés: guía, 5 segundos en la ficha y CTA |
| Total | 10 | 9 | Muy por debajo del umbral de 40 eventos |

*Ejemplo 1.3. Riesgos*

| Familia | Riesgo en Café Fandango | Qué se hace |
| --- | --- | --- |
| Diseño | Querer medir cada botón de la web | Un solo `cta_click` con `element_id`, y solo para el CTA del hero |
| Proceso | Nadie revisa el contenedor después de publicar | Revisión semanal de los eventos clave (paso 9) |
| Implementación | En WooCommerce, el producto de la suscripción no tiene una categoría propia y el informe de suscripciones queda vacío | Crear la categoría `Suscripción` en WooCommerce. GTM4WP la envía como `item_category` y GA4 la muestra en **Categoría del artículo** |
| Personas | «Pedido», «compra» y «venta» para lo mismo | El evento es `purchase` y la suscripción se distingue por `item_category` = `Suscripción` |

## Tu proyecto

1. Responde el diagnóstico (plantilla 1.1). Escribe en la tercera columna qué cambia en tu diseño.
2. Lee las reglas de abajo y corrige la tercera columna si hace falta.
3. Fija tu presupuesto de eventos (plantilla 1.2).
4. Escribe un riesgo por familia y qué harás con él (plantilla 1.3).

Reglas para leer tu diagnóstico:

- Si nadie puede tocar el código, usa solo activadores automáticos de GTM: clic, envío de formulario, desplazamiento, temporizador y vista de página. Pide a quien gestione la web un `id` estable en cada botón y formulario importante. En WordPress lo pones tú en el editor.
- Si usas WooCommerce, GTM4WP empuja los eventos de ecommerce de GA4, de `view_item_list` a `purchase`, con sus datos en `ecommerce`. Esas filas no necesitan desarrollo. GTM4WP no mide scroll, tiempo o clics: eso sale de activadores de GTM. Los ajustes están en `gtm4wp.md`.
- Si usas otra plataforma, busca si un plugin oficial ya envía eventos de ecommerce.
- Si un paso ocurre fuera de la web, como el pago en una pasarela, el CRM o WhatsApp, GTM no lo verá. Mídelo en su sistema y une los datos después.
- Si el recorrido pasa por otro dominio, anótalo. En el paso 8 lo añades a la configuración de dominios de GA4 y en el paso 9 compruebas que el recorrido no se corta.
- Si no hay banner de cookies con Consent Mode v2, no publiques en una web real en España hasta tenerlo. Esta plantilla no cubre la parte legal.
- Si la medición mejorada de GA4 está activada, anota qué eventos envía ya. No crees en GTM un evento con el mismo nombre salvo que desactives esa opción.
- Si ya hay código de GA4 o de un píxel pegado en la web, no lo dupliques en GTM. Medir lo mismo con código y con GTM duplica los datos.
- Si otro plugin, como Site Kit, Google for WooCommerce o uno de cookies, ya carga GTM o GA4, deja solo GTM4WP. Con dos instaladores, cada página vista y cada compra cuentan dos veces.

*Plantilla 1.1. Diagnóstico de tu proyecto*

| Pregunta | Tu proyecto | Consecuencia para el diseño |
| --- | --- | --- |
| ¿Quién puede cambiar el código? | | |
| ¿Tu plataforma o un plugin ya envía datos al dataLayer? | | |
| ¿Qué pasos ocurren fuera de la web? | | |
| ¿Hay más de un dominio en el recorrido? | | |
| ¿Hay login? | | |
| ¿Hay banner de cookies con Consent Mode v2? | | |
| ¿Qué mide ya la web? | | |
| ¿Cuántas horas al mes dedicará el equipo? | | |
| ¿Quién mira el dato y cada cuánto? | | |

Apunta a al menos 3 macro y 3 micro. Un negocio entero se puede operar con unos ocho eventos. Entre 6 y 12 filas es un tamaño razonable para una versión 1.

*Plantilla 1.2. Tu presupuesto de eventos*

| Tipo | Máximo de filas | Por qué |
| --- | --- | --- |
| Macro | | |
| Micro | | |
| Total | | |

*Plantilla 1.3. Riesgos de tu proyecto*

| Familia | Riesgo en tu proyecto | Qué harás |
| --- | --- | --- |
| Diseño | | |
| Proceso | | |
| Implementación | | |
| Personas | | |

## Antes de seguir

- [ ] Sabes qué eventos pueden salir del dataLayer y cuáles solo de activadores automáticos.
- [ ] Tienes la lista de pasos que ocurren fuera de la web.
- [ ] Sabes si el recorrido pasa por otro dominio.
- [ ] Sabes qué envía ya la medición mejorada de GA4.
- [ ] Solo GTM4WP carga GTM en tu WordPress.
- [ ] Tu presupuesto de eventos cabe en las horas que vais a dedicar.
- [ ] Cada familia de problemas tiene un riesgo y una acción.
