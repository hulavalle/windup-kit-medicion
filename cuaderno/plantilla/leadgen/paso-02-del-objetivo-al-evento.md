# Paso 2. Del objetivo al evento

**Qué te llevas.** Un objetivo, tres resultados clave con número y fecha, un contrapeso para cada uno y la cadena que va de cada resultado clave a los eventos que lo miden.

## Por qué importa

La medición sigue una cadena. La estrategia de negocio da objetivos de datos, los objetivos dan iniciativas y las iniciativas dan requisitos de datos. Un objetivo de datos que no conecta con uno de negocio es irrelevante ahora.

Los OKR dan el formato. El objetivo es el qué. El resultado clave (KR) es el cómo, y se cumple o no, sin zona gris. Si no tiene un número, no es un resultado clave.

Mide resultados, no actividad. «Publicar 12 posts» es actividad. «Pasar de 25 a 60 solicitudes de cita al mes» es resultado. Un KR con verbos como consultar, ayudar, analizar o participar describe una actividad.

Cada KR de cantidad necesita un contrapeso de calidad. El Ford Pinto y Wells Fargo persiguieron un número sin contrapeso y destrozaron lo que no medían. En captación, el riesgo es llenar la bandeja de solicitudes que nunca acaban en cita. Empareja cada métrica de cantidad con una de calidad, como solicitudes con citas confirmadas o llamadas con llamadas atendidas.

Usa fechas reales. Si todo vence el último día del trimestre, te falta un plan. Haz también la prueba de cobertura: si cumples todos los KR, ¿cumples el objetivo? Si no, te falta un KR.

El cálculo inverso convierte la meta en volumen. Partes de un objetivo de leads y calculas cuántas visitas necesitas cada mes en el paso anterior. Ese volumen te dice qué pasos del recorrido tienes que medir.

## Ejemplo con Clínica Dental Alameda

Objetivo: llenar la agenda de primeras visitas con pacientes que llegan por la web. Las cifras son ilustrativas.

*Ejemplo 2.1. Resultados clave y contrapesos*

| KR | Hoy | Meta | Fecha | Hito intermedio | Contrapeso |
| --- | --- | --- | --- | --- | --- |
| KR1. Solicitudes de cita por formulario al mes | 25 | 60 | 31/03/2027 | 40 el 31/01/2027 | Al menos un 60 % de solicitudes acaban en cita confirmada |
| KR2. Llamadas desde la web al mes | 30 | 50 | 31/03/2027 | 40 el 15/02/2027 | Al menos un 80 % de llamadas atendidas |
| KR3. Conversaciones de WhatsApp al mes | 10 | 30 | 31/03/2027 | 20 el 28/02/2027 | Al menos un 50 % de conversaciones con respuesta del paciente |

La prueba de cobertura obliga a mirar los contrapesos. Más solicitudes, llamadas y conversaciones no llenan la agenda si nadie las atiende. Con los tres contrapesos, cumplir los tres KR sí llena la agenda de primeras visitas.

La prueba de actividad también sale bien. «Responder todos los WhatsApp en una hora» sería una actividad de recepción. KR3 mide el resultado: conversaciones.

*Ejemplo 2.2. Del resultado clave al evento*

| KR | Pregunta de negocio | Métrica | Eventos candidatos |
| --- | --- | --- | --- |
| KR1 | ¿Qué canal trae pacientes? (1) | Solicitudes de cita por canal | `generate_lead` con `lead_type = cita`, `cta_click` |
| KR2 | ¿Qué canal trae llamadas? (2) | Clics en el teléfono por canal y dispositivo | `phone_click` |
| KR3 | ¿Qué canal trae conversaciones de WhatsApp? (3) | Clics en WhatsApp por canal | `whatsapp_click` |

*Ejemplo 2.3. Cálculo inverso de KR1*

| Paso | Cálculo | Resultado |
| --- | --- | --- |
| Meta del KR | De 25 a 60 solicitudes al mes | 60 solicitudes al mes en marzo |
| Volumen necesario al mes | 60 envíos correctos del formulario | 60 eventos `generate_lead` al mes |
| Tasa de conversión supuesta | 15 de cada 100 visitas a `/pedir-cita/` envían el formulario | Dato que confirmará la medición |
| Volumen necesario en el paso anterior | 60 ÷ 0,15 | 400 visitas al mes a `/pedir-cita/` |
| Qué hay que medir | | Visitas a `/pedir-cita/` por canal, clics en «Pedir cita» y solicitudes por canal |

El cálculo explica una fila de la matriz. El botón «Pedir cita» lleva a `/pedir-cita/`, así que su clic (`cta_click`) mide la puerta principal hacia el formulario.

## Tu proyecto

1. Elige un objetivo para el próximo trimestre y escríbelo como un qué concreto (plantilla 2.1).
2. Escribe tres KR con el número de hoy, la meta y la fecha. Si no conoces el número de hoy, escribe «sin dato» y anota quién lo consigue y cuándo.
3. Pon a cada KR un hito intermedio con otra fecha.
4. Empareja cada KR con un contrapeso de calidad. En captación, el contrapeso suele estar fuera de la web: en la agenda, la centralita o el CRM.
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
- [ ] Cada KR tiene un contrapeso de calidad y sabes dónde se mide.
- [ ] Si cumples los tres KR, cumples el objetivo.
- [ ] Cada KR enlaza con al menos una pregunta del paso 0.
- [ ] Cada hito intermedio cae antes de la fecha final.
