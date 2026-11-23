# Paso 3. Entidades, actividades y propiedades

**Qué te llevas.** Tu negocio ordenado en tres capas: las fases que vive tu cliente, las cosas del negocio con las que interactúa y los datos que acompañan a cada actividad.

## Por qué importa

El diseño se ordena en dos dimensiones de tres niveles. En horizontal hay tres capas, según quién usa el dato y para qué. En vertical hay tres niveles de detalle.

| Nivel | Capa de cliente | Capa de producto | Capa de interacción |
| --- | --- | --- | --- |
| Entidades | El cliente | Las cosas del negocio: producto, carrito, pedido | El elemento de la página |
| Actividades | Fases del recorrido: primera compra, valor repetido, riesgo de abandono | El ciclo de vida de cada entidad: visto, añadido, pagado | Clic, envío |
| Propiedades | Datos del cliente | Datos de cada entidad: `item_id`, `value` | `element_id`, `element_text` |

La capa de cliente es la más importante y tiene pocos elementos, entre 8 y 10. Sus fases no se implementan como eventos. Se derivan de los eventos de producto con reglas y umbrales. En GA4 se construyen después como audiencias o segmentos.

La capa de producto da casi todas las filas de tu matriz. Una entidad tiene identidad propia y ciclo de vida. Para encontrarlas, hazte dos preguntas:

- ¿Dónde se crean datos? Un pedido, un carrito, una solicitud.
- ¿Dónde hay un flujo lineal con un único estado de éxito? El checkout, el alta de una suscripción.

Añade una entidad solo como último recurso. Lo demás se resuelve con propiedades.

La capa de interacción recoge clics. Para no tener un evento por botón, usa un solo evento con propiedades `element_*`. Su audiencia es pequeña, sobre todo UX.

Una actividad añade significado de negocio a un evento. Un clic en un botón es un evento. «Suscripción iniciada» es una actividad.

Las propiedades se definen en la entidad, y cada actividad usa las que necesita. Sigue estas reglas:

- Entre 2 y 20 valores posibles por propiedad. Mejor tramos que números sueltos.
- Pon siempre el identificador: `transaction_id`, `item_id`.
- Escribe los nombres en `snake_case`. En GA4 usa los nombres de parámetro recomendados cuando existen, como `item_id`, `value` y `currency`.
- No guardes datos personales. Guarda el dominio del email, no el email.

Si vendes en línea, parte del catálogo típico de una tienda: página, búsqueda, listado, producto, carrito, cuenta, checkout y pedido. Los pedidos enviados y recibidos casi nunca se miden, y son una oportunidad perdida.

## Ejemplo con Café Fandango

*Ejemplo 3.1. Capas de producto e interacción*

| Entidad | Capa | Por qué es entidad | Actividad | Evento GA4 | Propiedades |
| --- | --- | --- | --- | --- | --- |
| Listado (de cafés) | Producto | Crea datos: qué cafés se muestran | Vista | `view_item_list` | `item_list_name`, `items` |
| Producto (café) | Producto | Tiene identidad (`item_id`) y ciclo de vida | Vista, añadido al carrito | `view_item`, `add_to_cart` | `item_id`, `item_name`, `item_category`, `price`, `quantity` |
| Checkout | Producto | Flujo lineal con un estado de éxito | Iniciado | `begin_checkout` | `currency`, `value`, `items` |
| Pedido | Producto | Crea datos: el pedido | Pagado | `purchase` con `item_category` distinto de `Suscripción` | `transaction_id`, `value`, `currency`, `items` |
| Suscripción | Producto | Ciclo de vida propio: alta, renovación, baja | Alta | `purchase` con `item_category = Suscripción` | `transaction_id`, `value`, `currency`, `items` |
| Lead (de cafetería) | Producto | El formulario crea una solicitud | Creado | `generate_lead` | `lead_type`, `form_id` |
| Página (guía de V60 y ficha) | Producto | Contenido cuya lectura y permanencia se pueden medir | Guía leída al 75 %, ficha vista 5 segundos | `page_read`, `timer_5s` | `percent_scrolled`, `page_path` |
| Elemento | Interacción | Una sola entidad para todos los clics | Clic | `cta_click` | `element_id`, `element_text` |

En el diseño, Suscripción es una entidad porque tiene ciclo de vida propio. En GA4, su alta se implementa como `purchase` con un ítem de `item_category = Suscripción`. El alta es un cobro, así que entra en los ingresos, y la categoría del ítem la separa de la compra puntual.

*Ejemplo 3.2. Capa de cliente*

| Fase | Regla para reconocerla (umbral a probar) | Se deriva de |
| --- | --- | --- |
| Primera compra | Primer `purchase` con `item_category` distinto de `Suscripción` | `purchase` |
| Suscriptor | `purchase` con `item_category = Suscripción` | `purchase` |
| Valor repetido | Segunda compra en menos de 60 días | `purchase`, por usuario y fecha |
| Cliente en riesgo | Compró una vez y no vuelve en 90 días | `purchase`, por usuario y fecha |
| Cafetería interesada | `generate_lead` con `lead_type = b2b` | `generate_lead` |
| Suscripción cancelada | Baja en la pasarela de pago | Backend, fuera de GA4 |

Los umbrales de 60 y 90 días son un punto de partida. Como las fases se derivan, puedes cambiarlos sin tocar la implementación. Sin login, GA4 solo reconoce al cliente que vuelve si usa el mismo navegador.

*Ejemplo 3.3. Fuera de la versión 1*

| Candidato | Por qué queda fuera |
| --- | --- |
| Búsqueda (`search`) | El catálogo tiene cinco productos. Con un catálogo pequeño pesan más los listados |
| Cuenta (`sign_up`, `login`) | La web no tiene login |
| Pedido enviado, recibido o devuelto | Ocurre en el backend y en la logística |
| Renovación y baja de la suscripción | Ocurre en la pasarela de pago |
| Clic en «Suscribirme» del pie (`cta-suscribirme-footer`) | La pregunta es si funciona la promesa de la portada. El botón del pie sirve en QA para comprobar que el activador no se dispara donde no debe |
| Clic en «Ver cafés» (`cta-ver-cafes`) | `view_item_list` ya mide la llegada al listado |

## Tu proyecto

1. Lista tus entidades de producto con las dos preguntas de arriba y compáralas con el catálogo de tienda. En WooCommerce, GTM4WP ya cubre listado, producto, carrito, checkout y pedido.
2. Escribe el ciclo de vida de cada entidad, desde que se crea hasta que termina.
3. Marca qué actividades ocurren en la web y cuáles fuera.
4. Añade las propiedades de cada entidad con las reglas de arriba.
5. Escribe de 3 a 6 fases de cliente, cada una con su regla y su umbral.
6. Anota lo que queda fuera de la versión 1 y por qué.

*Plantilla 3.1. Tus entidades de producto e interacción*

| Entidad | Capa | Por qué es entidad | Actividades (ciclo de vida) | ¿En la web? | Propiedades |
| --- | --- | --- | --- | --- | --- |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |

*Plantilla 3.2. Tus fases de cliente*

| Fase | Regla para reconocerla (umbral a probar) | Se deriva de |
| --- | --- | --- |
| | | |
| | | |
| | | |
| | | |
| | | |
| | | |

*Plantilla 3.3. Fuera de tu versión 1*

| Candidato | Por qué queda fuera |
| --- | --- |
| | |
| | |
| | |
| | |
| | |

## Antes de seguir

- [ ] Tienes entre 4 y 10 entidades. Si tienes más, alguna es en realidad una propiedad.
- [ ] Cada macro candidata del paso 2 es la actividad final de un flujo lineal.
- [ ] Cada propiedad tiene entre 2 y 20 valores posibles, o es un identificador o un importe.
- [ ] Ninguna propiedad lleva email, teléfono ni nombre.
- [ ] Cada fase de cliente tiene una regla con umbral y sale de eventos que sí mides.
- [ ] Todos los clics usan un solo evento de interacción con propiedades `element_*`.
