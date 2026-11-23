# Paso 9. Protocolo de QA

**Práctica del bucle 4 · tu WordPress.** Prueba cada fila de tu matriz en la web de tu proyecto y publica.

*Ejemplo 9.1. Dos filas del registro de Café Fandango*

| Nº | Evento | Acción de prueba | Se dispara cuando debe | No se dispara cuando no debe | Parámetros con valor | Capturas | OK |
| -- | --------- | ------- | ---- | ----- | -------- | ------ | ---- |
| 6 | `cta_click` | Pulsar «Suscribirme» en la portada | Sí | Sí, el botón del pie no lo dispara | Sí, `element_id` = `cta-suscribirme-hero` | `qa-06-ta.png`, `qa-06-dv.png` | OK |
| 9 | `purchase` (suscripción) | Suscribirse al plan mensual | Sí | Sí | `item_category` no era `Suscripción`. Se corrigió la categoría del producto y se probó otra vez | `qa-09-ta.png`, `qa-09-dv.png` | OK tras corregir |

Un fallo no se borra. Escribe qué pasó, qué corregiste y el resultado de la segunda prueba. Guarda la captura de Tag Assistant como `qa-NN-ta.png` y la de DebugView como `qa-NN-dv.png`, con NN el número de fila de tu matriz, en la carpeta `plan/capturas/` del kit.

En WordPress, añade dos pruebas. Para `purchase`, haz un pedido de prueba con transferencia bancaria: GTM4WP ya empuja `purchase` con el pedido *En espera*. Para `generate_lead`, envía el formulario también con un email mal escrito: el evento no debe saltar, y la **Capa de datos** no debe mostrar lo que escribiste.

*Plantilla 9.1. Tu registro de QA*

| Nº | Evento | Acción de prueba | Se dispara cuando debe | No se dispara cuando no debe | Parámetros con valor | Capturas | OK |
| -- | --------- | ------- | ---- | ----- | -------- | ------ | ---- |
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |
| 6 | | | | | | | |
| 7 | | | | | | | |
| 8 | | | | | | | |

Con todas las filas en OK, publica:

- [ ] Tus macro marcadas como evento clave en GA4.
- [ ] Versión publicada con un nombre y una descripción que dicen qué cambia.

Versión completa: el paso 9 de tu plantilla añade la prueba de consentimiento, las versiones y la revisión semanal.
