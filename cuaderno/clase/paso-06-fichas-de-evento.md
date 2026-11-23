# Paso 6. Fichas de evento

**5 min · tu proyecto.** Escribe la ficha de tu macro principal.

Di qué es en una frase, cuándo se dispara y desde dónde, y qué parámetros lleva, con un valor de ejemplo.

*Ejemplo 6.1. Ficha de purchase en Café Fandango*

| Campo | Café Fandango |
| ---- | ------ |
| Evento GA4 | `purchase`, filas 8 y 9 de la matriz |
| Descripción (una frase) | El cliente paga un pedido de café o se suscribe al plan mensual |
| Disparador (acción, página y elemento) | Botón `#btn-pagar` en `/checkout.html` o botón `#btn-suscribir` en `/suscripcion.html` |
| Fuente (dataLayer o activador automático) | dataLayer de la web, recogido por el activador `CE - purchase` |
| Parámetros con valor de ejemplo | `transaction_id` = `FAN-1700000000000`, `value` = `29.00`, `currency` = `EUR`, `items` (con `item_category` = `Suscripción`, `Origen único` o `Blend`) |
| Métricas que lo usan | KR1, altas de suscripción por canal. KR2, conversión de visita a compra |
| Responsable | Responsable de marketing |

*Plantilla 6.1. Ficha de tu macro principal*

| Campo | Tu proyecto |
| ---- | ------ |
| Evento GA4 | |
| Descripción (una frase) | |
| Disparador (acción, página y elemento) | |
| Fuente (dataLayer o activador automático) | |
| Parámetros con valor de ejemplo | |
| Métricas que lo usan | |
| Responsable | |

Versión completa: el paso 6 de tu plantilla añade una ficha por cada evento de la matriz, su estado y el diccionario de propiedades.
