# Paso 2. Del objetivo al evento

**Qué te llevas.** Un objetivo, tres resultados clave con número y fecha, un contrapeso para cada uno y la cadena que va de cada resultado clave a los eventos que lo miden.

## Por qué importa

La medición sigue una cadena. La estrategia de negocio da objetivos de datos, los objetivos dan iniciativas y las iniciativas dan requisitos de datos. Un objetivo de datos que no conecta con uno de negocio es irrelevante ahora.

Los OKR dan el formato. El objetivo es el qué. El resultado clave (KR) es el cómo, y se cumple o no, sin zona gris. Si no tiene un número, no es un resultado clave.

Mide resultados, no actividad. «Publicar 12 posts» es actividad. «Pasar de 40 a 120 suscripciones» es resultado. Un KR con verbos como consultar, ayudar, analizar o participar describe una actividad.

Cada KR de cantidad necesita un contrapeso de calidad. El Ford Pinto y Wells Fargo persiguieron un número sin contrapeso y destrozaron lo que no medían. Empareja cada métrica de cantidad con una de calidad, como pedidos con devoluciones o altas con bajas.

Usa fechas reales. Si todo vence el último día del trimestre, te falta un plan. Haz también la prueba de cobertura: si cumples todos los KR, ¿cumples el objetivo? Si no, te falta un KR.

El cálculo inverso convierte la meta en volumen. Partes de un objetivo de ingresos y calculas cuántos leads o pedidos necesitas cada mes. Ese volumen te dice qué pasos del recorrido tienes que medir.

## Ejemplo con Café Fandango

Objetivo: convertir más visitas de la web en clientes que repiten cada mes. Las cifras son ilustrativas.

*Ejemplo 2.1. Resultados clave y contrapesos*

| KR | Hoy | Meta | Fecha | Hito intermedio | Contrapeso |
| --- | --- | --- | --- | --- | --- |
| KR1. Suscripciones mensuales activas | 40 | 120 | 31/03/2027 | 80 el 31/01/2027 | Menos del 10 % de bajas en 30 días |
| KR2. Conversión de visita a compra | 1,2 % | 2 % | 31/03/2027 | 1,6 % el 15/02/2027 | Menos del 3 % de pedidos devueltos |
| KR3. Solicitudes de cafeterías en el trimestre | 12 | 40 | 31/03/2027 | 25 el 28/02/2027 | Al menos un 70 % de solicitudes válidas |

La prueba de cobertura sale bien. Si se cumplen los tres KR, se cumple el objetivo, porque KR1 cubre la repetición. Sin KR1, el objetivo quedaría sin recurrencia y habría que añadir otro KR.

La prueba de actividad también. «Publicar 12 posts en Instagram» sería una actividad. KR3 mide el resultado: solicitudes.

*Ejemplo 2.2. Del resultado clave al evento*

| KR | Pregunta de negocio | Métrica | Eventos candidatos |
| --- | --- | --- | --- |
| KR1 | ¿Qué canal trae clientes que repiten? (2) | Altas de suscripción por canal | `purchase` con `item_category = Suscripción`, `cta_click` |
| KR2 | ¿Dónde se pierden los que no compran? (4) | Paso de cada etapa del embudo a la siguiente | `view_item_list`, `view_item`, `add_to_cart`, `begin_checkout`, `purchase` con `item_category` distinto de `Suscripción` |
| KR3 | ¿Qué canal trae negocio B2B? (3) | Solicitudes de cafeterías por canal | `generate_lead` con `lead_type = b2b` |

*Ejemplo 2.3. Cálculo inverso de KR1*

| Paso | Cálculo | Resultado |
| --- | --- | --- |
| Meta del KR | De 40 a 120 suscripciones en cuatro meses | 80 suscripciones netas |
| Volumen necesario al mes | 80 ÷ 4 | 20 altas al mes, más las que repongan las bajas |
| Tasa de conversión supuesta | 2 de cada 100 visitas a `/suscripcion.html` se suscriben | Dato que confirmará la medición |
| Volumen necesario en el paso anterior | 20 ÷ 0,02 | 1.000 visitas al mes a `/suscripcion.html` |
| Qué hay que medir | | Visitas a `/suscripcion.html` por canal, clics en «Suscribirme» del hero y altas por canal |

El cálculo explica una fila de la matriz. El CTA «Suscribirme» del hero lleva a `/suscripcion.html`, así que su clic (`cta_click`) mide la puerta principal hacia la suscripción.

## Tu proyecto

1. Elige un objetivo para el próximo trimestre y escríbelo como un qué concreto (plantilla 2.1).
2. Escribe tres KR con el número de hoy, la meta y la fecha. Si no conoces el número de hoy, escribe «sin dato» y anota quién lo consigue y cuándo.
3. Pon a cada KR un hito intermedio con otra fecha.
4. Empareja cada KR con un contrapeso de calidad.
5. Haz la prueba de cobertura y la prueba de actividad.
6. Rellena la cadena (plantilla 2.3) con tus preguntas del paso 0. Los eventos son candidatos: los cierras en el paso 5.
7. Haz el cálculo inverso de un KR (plantilla 2.4).

*Plantilla 2.1. Tu objetivo*

| Campo | Tu respuesta |
| ---- | ------ |
| Objetivo (qué quieres conseguir) | |
| Periodo (trimestre y fechas) | |
| Responsable | |

*Plantilla 2.2. Tus resultados clave y contrapesos*

| KR | Hoy | Meta | Fecha | Hito intermedio | Contrapeso |
| --- | --- | --- | --- | --- | --- |
| KR1. | | | | | |
| KR2. | | | | | |
| KR3. | | | | | |

*Plantilla 2.3. De tu resultado clave al evento*

| KR | Pregunta de negocio (nº del paso 0) | Métrica | Eventos candidatos |
| --- | --- | --- | --- |
| KR1 | | | |
| KR2 | | | |
| KR3 | | | |

*Plantilla 2.4. Tu cálculo inverso*

| Paso | Cálculo | Resultado |
| --- | --- | --- |
| Meta del KR | | |
| Volumen necesario al mes | | |
| Tasa de conversión supuesta | | |
| Volumen necesario en el paso anterior | | |
| Qué hay que medir | | |

## Antes de seguir

- [ ] Cada KR tiene número de hoy, meta y fecha.
- [ ] Ningún KR es una actividad como publicar, enviar o analizar.
- [ ] Cada KR tiene un contrapeso de calidad.
- [ ] Si cumples los tres KR, cumples el objetivo.
- [ ] Cada KR enlaza con al menos una pregunta del paso 0.
- [ ] Cada hito intermedio cae antes de la fecha final.
