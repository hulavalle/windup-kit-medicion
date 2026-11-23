# Cuaderno de clase

Máster Técnico en Marketing Digital & IA · Clase de Google Tag Manager · 2026

Este cuaderno se rellena entero en clase y todo sobre el proyecto de tu grupo. Los pasos de diseño se hacen en papel. Los de implementación se hacen en el WordPress de tu proyecto, con el plugin GTM4WP y el contenedor `gtm/wp-tags-base.json` del kit. El profesor hace cada demo con Café Fandango, y cada paso trae Café Fandango resuelto como ejemplo. Los ejemplos de Café Fandango sirven para comprobar lo que haces.

*Plantilla A. Datos del grupo*

| Campo | Tu respuesta |
| ---- | ------ |
| Proyecto | |
| Grupo | |
| Integrantes | |

## Cuándo se rellena cada paso

| Paso | Cuándo | Min | Sobre qué |
| ------ | ------ | -- | ----- |
| 0. Tu proyecto y sus preguntas de negocio | Apertura | 4 | Tu proyecto |
| 1. Diagnóstico | Al final de «Por qué falla el dato» | 3 | Tu proyecto |
| 2. Del objetivo al evento | Ejercicio de «Del objetivo de negocio al evento» | 5 | Tu proyecto |
| 3. Entidades, actividades y propiedades | Al final de «Las tres capas» | 5 | Tu proyecto |
| 4. Event storming | Práctica de event storming | 12 | Tu proyecto |
| 5. Matriz de conversiones | Práctica de la matriz | 7 | Tu proyecto |
| 6. Fichas de evento | «Ficha de evento» | 5 | Tu proyecto: tu macro principal |
| 7. Especificación del dataLayer | Al final del bucle 3 | 4 | Tu proyecto: el evento de tu macro principal |
| 8. Implementación en GTM | Prácticas de los bucles 0 a 3 e integración | En cada práctica | Tu WordPress |
| 9. Protocolo de QA | Práctica del bucle 4 | En la práctica | Tu WordPress |
| 10. Estrategia UTM | Al final del bucle 5 | 4 | Tu proyecto: tres enlaces |
| 11. Checklist de entrega | Cierre | 3 | Tu proyecto |

En total son unos 52 minutos de cuaderno y unos 77 de práctica en el WordPress de tu proyecto.

## Cómo se usa

1. Cuando la slide diga «Cuaderno, paso N», abre ese paso. La primera línea dice cuántos minutos tienes y sobre qué trabajas.
2. Lee el ejemplo de Café Fandango y rellena tu plantilla con el mismo formato. Escribe frases cortas.
3. Cada paso termina con una línea que dice qué añade su versión completa en tu plantilla para proyectos reales. En el paso 0 marcas cuál es la tuya: `plantilla-ecommerce.docx` o `plantilla-leadgen.docx`.

La configuración de GTM4WP está en `gtm4wp.md`, en el kit. Las fuentes están en «Recursos», al final.

## Vocabulario

| Término | Qué significa |
| --- | ------ |
| Evento | Algo que pasa en un momento concreto, con un nombre y unos datos, como `purchase` |
| Parámetro | Dato que acompaña al evento, como `value` o `item_category` |
| Micro y macro | Micro: paso intermedio que indica interés. Macro: cierra un flujo y supone dinero o un lead |
| Evento clave | Macro marcada en GA4 para contarla como conversión |
| Contrapeso | Cifra que avisa si una macro sube por un mal motivo, como las devoluciones |
| dataLayer o capa de datos | Zona de la web donde se dejan eventos y datos para que GTM los lea |
| Push | Cuando la web o un plugin deja un evento en el dataLayer |
| Etiqueta, activador, variable | En GTM: qué se envía, cuándo se envía y con qué datos |
| GTM4WP | Plugin de WordPress que instala GTM y empuja al dataLayer los eventos de WooCommerce y Contact Form 7 |
| Tag Assistant y DebugView | Dónde compruebas que una etiqueta se dispara (Tag Assistant) y que el evento llega a GA4 (DebugView) |
| UTM | Parámetros del enlace que dicen a GA4 de dónde viene la visita |
