# Paso 3. Entidades, actividades y propiedades

**5 min · tu proyecto.** Lista tus entidades y detalla las dos principales.

De las dos principales, escribe el ciclo de vida y tres propiedades, sin datos personales. Una entidad es una cosa del negocio con identidad propia y ciclo de vida. Búscalas donde se crean datos y donde hay un flujo con un único estado de éxito. Café Fandango tiene ocho: listado, producto, checkout, pedido, suscripción, lead de cafetería, página y elemento. Página mide la lectura de la guía y los 5 segundos en la ficha. Elemento recoge los clics.

También puedes hacerlo en el tablero de FigJam de la clase, en el bloque 1 del tablero de tu equipo. Después pasa el resultado a las plantillas 3.1 y 3.2: https://www.figma.com/board/UzrhmskaeYXJLCetVEPJ7r

*Ejemplo 3.1. Las dos entidades principales de Café Fandango*

| Entidad | Ciclo de vida | Tres propiedades |
| ----- | ---------- | ------ |
| Pedido | Se paga en la web. Se envía, se recibe y a veces se devuelve fuera de la web | `transaction_id`, `value`, `items` |
| Suscripción | Se da de alta en la web. Se renueva cada mes y se da de baja en la pasarela de pago | `transaction_id`, `value`, `item_category` = `Suscripción` |

*Plantilla 3.1. Tus entidades*

| Pregunta | Tus entidades |
| ------ | ---------- |
| ¿Dónde se crean datos? | |
| ¿Dónde hay un flujo con un único estado de éxito? | |

*Plantilla 3.2. Tus dos entidades principales*

| Entidad | Ciclo de vida | Tres propiedades |
| ----- | ---------- | ------ |
| | | |
| | | |

- [ ] Ninguna propiedad lleva email, teléfono ni nombre.

Versión completa: el paso 3 de tu plantilla añade las capas de cliente, producto e interacción, las fases de cliente y lo que queda fuera de la versión 1.
