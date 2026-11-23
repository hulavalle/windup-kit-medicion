# Paso 1. Diagnóstico

**3 min · tu proyecto.** Responde las tres preguntas del diagnóstico.

Pocos eventos, y con nombre de negocio. Si nadie puede tocar el código, todavía menos.

*Ejemplo 1.1. Diagnóstico de Café Fandango*

| Pregunta | Café Fandango | Qué cambia en el diseño |
| --- | --- | --- |
| ¿Cuántos eventos necesitas de verdad? | 10 filas: 3 macro y 7 micro, con 9 eventos GA4 distintos | Muy por debajo de 40 eventos, el umbral a partir del cual hay que preocuparse |
| ¿Quién implementa y cuándo? | La web ya trae los `dataLayer.push` de ecommerce. No hay más desarrollo previsto | Los eventos de ecommerce salen del dataLayer. El resto sale de activadores automáticos de GTM |
| ¿Pasa tu recorrido por otro dominio? | No | Sin riesgo de cross-domain |

*Plantilla 1.1. Diagnóstico de tu proyecto*

| Pregunta | Tu proyecto | Qué cambia en tu diseño |
| --- | --- | --- |
| ¿Cuántos eventos necesitas de verdad? | | |
| ¿Quién implementa y cuándo? | | |
| ¿Pasa tu recorrido por otro dominio? | | |

Versión completa: el paso 1 de tu plantilla añade el diagnóstico completo de nueve preguntas, el presupuesto de eventos y un riesgo por cada familia de problemas.
