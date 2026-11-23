# Aprendizajes

Lo que se rompió y cómo se arregló. Ya vienen los de la clase:

- La medición mejorada de GA4 ya envía `scroll` (90 %) y `video_progress`: si GTM mide lo mismo, desactiva esa opción en el flujo de datos o contarás dos veces.
- Un formulario que envía por GET mete nombre y email en la URL, y GA4 la registra. Nada de datos personales en URLs ni en parámetros.
- Antes de cada evento de ecommerce, `dataLayer.push({ ecommerce: null })`.
- El activador de envío de formulario con «esperar etiquetas» necesita una condición de habilitación.
- Sin captura de Tag Assistant y de DebugView, el evento no está comprobado.
