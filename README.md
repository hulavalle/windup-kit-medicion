# Kit de medición · Máster Técnico en Marketing Digital & IA

Este repositorio es tu plan de medición y su implementación, en un solo sitio. Haces tu copia antes de clase y en clase trabajas sobre tu proyecto, con Café Fandango como ejemplo resuelto.

## Antes de clase

Trae esto preparado. Si te falta algo, en clase vas por detrás.

| Qué necesitas | Para qué | Cómo se consigue |
| --- | --- | --- |
| Una cuenta de Google | Entrar en GA4 y en GTM | [Crear una cuenta de Google](https://support.google.com/accounts/answer/27441?hl=es) |
| Una propiedad de GA4 con un flujo de datos web | Recibir los eventos. Necesitas su ID de medición (empieza por `G-`) | [Configurar Analytics en un sitio web](https://support.google.com/analytics/answer/9304153?hl=es) |
| Una cuenta y un contenedor web de Google Tag Manager | Crear las etiquetas. Necesitas el ID del contenedor (`GTM-XXXXXXX`) | [Crear una cuenta y un contenedor](https://support.google.com/tagmanager/answer/6103696?hl=es), en [tagmanager.google.com](https://tagmanager.google.com/) |
| El WordPress de tu proyecto, con acceso de administrador | Instalar el plugin [GTM4WP](https://wordpress.org/plugins/duracelltomi-google-tag-manager/) | Pide a quien gestiona la web un usuario con rol de administrador |
| Google Chrome con Tag Assistant | Ver qué etiquetas se disparan en la Vista previa de GTM | [Chrome](https://www.google.com/intl/es_es/chrome/) y [Previsualizar y depurar contenedores](https://support.google.com/tagmanager/answer/6107056?hl=es), que enlaza la extensión |
| Un píxel de Meta (opcional) | La práctica del píxel en el bucle 1 | Cada uno crea el suyo, gratis, en el Administrador de eventos de Meta con una cuenta de Meta Business: [configurar un píxel de Meta](https://www.facebook.com/business/help/952192354843755). Si no tienes cuenta, te saltas ese paso |
| Una cuenta de GitHub (opcional) | Crear tu copia del kit | [Crear una cuenta de GitHub](https://github.com/signup) |

## Por dónde empezar

1. **Crea tu copia del kit.** Entra en [github.com/hulavalle/windup-kit-medicion](https://github.com/hulavalle/windup-kit-medicion) y pulsa **Use this template** > **Create a new repository**. Ponle el nombre de tu proyecto y elige **Private**: tu copia va a tener datos de tu proyecto. Después, llévala a tu ordenador: en tu copia, pulsa **Code** > **Download ZIP** y descomprímelo, o clónala con GitHub Desktop. Trabaja sobre esa carpeta. Si no usas GitHub, pulsa el botón **Code** > **Download ZIP** y descomprímelo en tu ordenador.
2. **Abre `cuaderno/cuaderno-de-clase.docx` en el paso 0.** La clase empieza con el diseño en papel (pasos 0 a 6) y después pasa a la implementación en tu WordPress (pasos 7 a 11).

## Si no estuviste en clase

Puedes hacer la clase por tu cuenta. Los bucles son las partes de la implementación: 0, GTM4WP y contenedor base; 1, píxel de Meta; 2, clic, scroll y temporizador; 3, ecommerce o formulario; 4, QA y publicación; 5, UTMs.

1. Abre la plantilla de tu tipo de negocio: `cuaderno/plantilla-ecommerce.docx` si vendes o `cuaderno/plantilla-leadgen.docx` si captas contactos. Cada paso explica por qué se hace y trae un ejemplo resuelto.
2. Haz los pasos 0 a 6 en orden. Son el diseño en papel y acaban en tu matriz de conversiones.
3. Mira la demo por tu cuenta. Arranca la web de Café Fandango (`web/README.md`) e importa `gtm/fandango-inicio.json` en un contenedor de pruebas. Construye las etiquetas de las filas de `plan/matriz.csv` y compáralas con `gtm/fandango-solucion.json`.
4. Hazlo en tu WordPress con los pasos 7 a 11 de tu plantilla.

## Qué hay dentro

| Carpeta | Qué es | Cuándo la usas |
| --- | --- | --- |
| `cuaderno/` | `cuaderno-de-clase.docx`: los 12 pasos en versión corta. `plantilla-ecommerce.docx` y `plantilla-leadgen.docx`: los 12 pasos completos para una tienda online (WooCommerce) o para captación de leads (ejemplo: Clínica Dental Alameda). Sus fuentes en markdown están en `cuaderno/clase/` y `cuaderno/plantilla/` | El cuaderno de clase, en clase. La plantilla, después, en tu proyecto |
| `gtm4wp.md` | Cómo instalar GTM en WordPress con GTM4WP, qué ajustes activar y qué eventos empuja | En el bucle 0 y en tu proyecto |
| `plan/` | La matriz de conversiones, las UTMs y el registro de QA en CSV | Rellenas una fila por decisión |
| `especificacion.md` | El contrato técnico: eventos, parámetros, IDs y dataLayer | Lo que entregas a quien desarrolla la web |
| `gtm/` | `wp-tags-base.json` (tu punto de partida en WordPress), soluciones de referencia y el validador | En la implementación |
| `web/` | La web demo de Café Fandango | La usa el profesor en las demos; tú practicas en tu WordPress |
| `AGENTS.md` | Instrucciones para tu asistente de IA (`CLAUDE.md` y `GEMINI.md` remiten a él) | Cuando trabajas el repo con IA |
| `mcp.md` | Cómo conectar GA4, GTM y Google Ads a tu asistente (MCP), en qué asistente funciona y con qué reglas | Cuando trabajas con IA conectada |
| `brain/` | La memoria del proyecto: qué es, qué se decidió y qué se aprendió | La lee tu asistente de IA antes de trabajar y la actualiza al terminar |

## En clase

Primero, el diseño en papel: pasos 0 a 6 del cuaderno. Después, la implementación:

1. Instala el plugin GTM4WP en el WordPress de tu proyecto y pega el ID de tu contenedor (guía: `gtm4wp.md`).
2. En GTM: Administrar > Importar contenedor > `gtm/wp-tags-base.json` > espacio de trabajo nuevo > Combinar. Cambia `Const - GA4 ID` por el ID de medición de tu propiedad de GA4.
3. Vista previa en GTM y a construir lo que pide cada bucle, con la matriz de tu proyecto. El profesor lo enseña antes con Café Fandango.

## Para tu proyecto

1. Trabaja en tu copia del repositorio (la que creaste en «Por dónde empezar»). Rellena `brain/proyecto.md` con los datos de tu proyecto: tu asistente de IA lo lee antes de trabajar.
2. Sigue la plantilla de tu tipo de negocio (`cuaderno/plantilla/ecommerce/` o `cuaderno/plantilla/leadgen/`) en orden, partiendo de lo que rellenaste en el cuaderno de clase. La matriz (paso 5), el registro de QA (paso 9) y las UTMs (paso 10) van a `plan/`; el resto queda en la plantilla.
3. Cuando `plan/matriz.csv` esté cerrada, reescribe `especificacion.md` para tu web.
4. Pide a tu asistente de IA que genere o actualice el contenedor a partir de la matriz y la especificación (ver `AGENTS.md`). Después compruébalo con el validador, desde la raíz del repositorio: `python3 gtm/validar.py gtm/<proyecto>.json` (en Windows, `py` en lugar de `python3`). Revísalo, impórtalo en un espacio de trabajo nuevo y pasa el protocolo de QA.

   Trabajar el repositorio con IA significa que la IA lee y escribe los archivos del kit y ejecuta el validador. Para eso necesitas un agente que trabaje sobre la carpeta, por ejemplo Claude Code, Codex, Cursor o Gemini CLI. El chat web de ChatGPT, Claude o Gemini no puede: ahí solo puedes pegar o adjuntar archivos y copiar lo que te devuelve. Si no tienes un agente, construye las etiquetas a mano (paso 8 de tu plantilla).
5. Publica solo cuando `plan/qa.csv` tenga todas las filas en OK con sus capturas.

## Repos y herramientas para trabajar con IA

| Herramienta | Para qué | Enlace |
| --- | --- | --- |
| Google Analytics MCP (oficial) | Preguntar a tu asistente de IA por los datos de GA4, también en tiempo real. Solo lectura por defecto; se instala en tu ordenador | https://github.com/googleanalytics/google-analytics-mcp |
| GTM MCP de Stape (no es de Google) | Que la IA lea y cree etiquetas, activadores y variables. Puede publicar: solo en un contenedor de pruebas y un espacio de trabajo nuevo | https://github.com/stape-io/google-tag-manager-mcp-server |
| Google Ads MCP (oficial) | Leer campañas y conversiones de Google Ads | https://developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server |
| Galería de plantillas de GTM | Plantillas de la comunidad, como Facebook Pixel by Stape | https://tagmanager.google.com/gallery |

Detalle, compatibilidad con ChatGPT, Claude y Gemini, y reglas de uso: `mcp.md`.

## Regla de oro

La IA escribe, tú decides y compruebas. Nada se publica sin captura de Tag Assistant y de DebugView.
