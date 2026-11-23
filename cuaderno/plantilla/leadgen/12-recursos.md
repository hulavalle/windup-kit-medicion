# Recursos

Estas son las fuentes de la plantilla, agrupadas por los pasos que apoyan. Los libros dan el método. La documentación oficial da los menús y las reglas de GA4, GTM, GTM4WP y la AEPD, que cambian más a menudo. Compruébala antes de cada proyecto.

## Pasos 0 a 6. Diseñar la medición

- *The Analytics Implementation Workbook*, de Timo Dechau. Paso 0, medir frente a crear datos. Paso 1, las cuatro familias de problemas y el presupuesto de eventos. Paso 2, la cadena del objetivo de negocio al requisito de datos y el cálculo inverso. Paso 3, las tres capas y las reglas de propiedades. Paso 4, el event storming y sus colores. Paso 5, micro y macro, nombres de negocio y árbol de métricas. Paso 6, la documentación de referencia y la ficha de evento.
- *Measure What Matters*, de John Doerr. Paso 2, el formato OKR, resultado frente a actividad, contrapesos de calidad, fechas reales y la prueba de cobertura.
- *Google Analytics Alternatives*, de Jason Packer. Paso 1, la medición mejorada de GA4 frente a los activadores de GTM y el consentimiento en Europa.

## Pasos 7 a 9. Implementar y comprobar

- *Google Tag Manager for Beginners (with GA4)*, ebook de Analytics Mania, de Julius Fedorovicius. Paso 7, clases e IDs estables para los activadores de clic. Paso 8, etiqueta, activador y variable, instalación del contenedor, ID de medición y convención de nombres. Paso 9, vista previa, DebugView y versiones.
- *8 Steps to Become an Experienced Google Tag Manager User*, ebook de Analytics Mania. Paso 7, el dataLayer, sus variables y por qué leer el HTML es frágil. Paso 9, las tres reglas: se activó, se envió y llegó.
- *JavaScript for Google Tag Manager*, ebook de Analytics Mania. Paso 7, la consola del navegador y cómo leer el dataLayer.
- *The Analytics Implementation Workbook*, de Timo Dechau. Paso 7, el ticket para quien desarrolla. Paso 9, la prueba por evento, la prueba de consentimiento, el calendario de pruebas y la revisión semanal.
- *Google Analytics Alternatives*, de Jason Packer. Paso 8, qué evento sale de la medición mejorada y cuál de GTM.
- GTM4WP, ficha del plugin en WordPress.org. Versión 2.1.1. https://wordpress.org/plugins/duracelltomi-google-tag-manager/
- GTM4WP, referencia de los ajustes del contenedor. Pasos 7 y 8. https://gtm4wp.com/setup-gtm4wp-features/container-settings-reference
- GTM4WP, «How to track Contact Form 7 submissions». Pasos 7, 8 y 9, los eventos `gtm4wp.contactForm7*` y la clave `inputs`. https://gtm4wp.com/setup-gtm4wp-features/how-to-track-contact-form-7-submissions
- GTM4WP, eventos de usuario y de campos de formulario. Paso 3, lo que queda fuera de la versión 1. https://gtm4wp.com/setup-gtm4wp-features/how-to-track-user-logins-registrations-and-form-interactions
- GTM4WP, registro de cambios. Paso 8, lo que eliminaron las versiones 2.0 y 2.1. https://gtm4wp.com/changelog
- Ayuda de Google Tag Manager, «Variables integradas para contenedores web». Pasos 7 y 8. https://support.google.com/tagmanager/answer/7182738?hl=es
- Ayuda de Google Analytics, «Monitorizar eventos en DebugView». Paso 9. https://support.google.com/analytics/answer/7201382?hl=es
- Ayuda de Google Analytics, prácticas recomendadas para no enviar información personal identificable. Pasos 1, 6, 7 y 9. https://support.google.com/analytics/answer/6366371?hl=es
- Stape, «Google Tag Manager Data Layer: Ultimate Guide». Pasos 7 y 8. https://stape.io/blog/end-to-end-guide-on-data-layer-in-google-tag-manager
- Stape, «Google Tag Configuration in GTM: Settings & Event Variables». Paso 8. https://stape.io/blog/google-tag-configuration-and-event-settings-variables
- Stape, «Facebook Pixel GTM Integration Guide». Paso 8, la plantilla Facebook Pixel by Stape. https://stape.io/blog/add-facebook-pixel-gtm
- Stape, «SPAs: Better Event Tracking with GA4». Pasos 1 y 8, la medición mejorada de GA4. https://stape.io/blog/server-side-gtm-for-single-page-applications
- Google for Developers, «Descripción general del modo de consentimiento». Pasos 1, 8 y 9. https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=es-419
- Google for Developers, «Troubleshoot consent mode with Tag Assistant». Paso 9. https://developers.google.com/tag-platform/security/guides/consent-debugging
- AEPD, «Guía sobre el uso de las cookies», mayo de 2024. Pasos 1, 8 y 9. https://www.aepd.es/guias/guia-cookies.pdf

## Paso 10. Atribuir con UTMs

- Ayuda de Google Analytics, «Creadores de URLs: recoger datos de campaña con URLs personalizadas». Parámetros UTM y prácticas recomendadas. https://support.google.com/analytics/answer/10917952?hl=es
- Ayuda de Google Analytics, «Grupo de canales predeterminado». Qué `utm_medium` y qué `utm_source` llevan a cada canal, también `organic` a búsqueda orgánica. https://support.google.com/analytics/answer/9756891?hl=es
- *The Analytics Implementation Workbook*, de Timo Dechau. Las UTMs como parte de la identidad del dato y la revisión de valores de campaña inesperados.

## Paso 11. Entregar y mantener

- *The Analytics Implementation Workbook*, de Timo Dechau. Los cuatro pilares, el dueño del dato, la auditoría de valor y la limpieza de lo que nadie usa.

## Material del kit

- `plan/ejemplos/matriz-clinica-dental.csv`. La matriz de Clínica Dental Alameda, de la que salen los ejemplos de los pasos 5 a 9.
- `gtm4wp.md`. Ajustes de GTM4WP 2.1.1, lo que empuja Contact Form 7 al dataLayer, la matriz de la clínica y los avisos de datos personales. Pasos 1, 7, 8 y 9.
- `gtm/wp-tags-base.json` y `gtm/validar.py`. Tu punto de partida en el paso 8.
- `especificacion.md`. La especificación de Café Fandango, como modelo de estructura para la tuya.
- `AGENTS.md`. Las instrucciones para tu asistente de IA, pasos 7 a 10.
