# Instrucciones para el asistente de IA

Trabajas en un repositorio de medición analítica (GA4 + Google Tag Manager). La persona que te usa es de marketing, no programa. Explica cada cambio en lenguaje llano y en español.

> **Para la persona:** estas instrucciones son para un agente de IA que trabaja sobre la carpeta del repositorio: lee y escribe sus archivos y ejecuta el validador. Por ejemplo, Claude Code, Codex, Cursor o Gemini CLI. Codex y Cursor leen este archivo directamente; Claude Code y Gemini CLI lo cargan desde `CLAUDE.md` y `GEMINI.md`. Abre el agente en la raíz del repositorio. El chat web de ChatGPT, Claude o Gemini no puede hacerlo.

## Memoria

- Antes de cualquier tarea, lee `brain/index.md` y los archivos que enlaza.
- Al terminar una sesión con cambios, apunta en `brain/decisiones.md` lo que se decidió y en `brain/aprendizajes.md` lo que se rompió y cómo se arregló. Una línea por entrada, sin datos personales.
- Si algo de `brain/` queda obsoleto, corrígelo o bórralo; no acumules notas contradictorias.

## Fuente de verdad

1. `plan/matriz.csv`: qué se mide y por qué. Cada fila responde una pregunta de negocio. No añadas eventos que no estén en la matriz; si crees que falta uno, propónlo como fila nueva con su pregunta de negocio y espera confirmación.
2. `especificacion.md`: eventos, parámetros, IDs de elementos y pushes al dataLayer.
   En WordPress, los eventos de WooCommerce y Contact Form 7 los empuja GTM4WP: consulta `gtm4wp.md` antes de proponer pushes propios. Nunca mandes a GA4 los `inputs` de un formulario.
3. `gtm/*.json`: contenedores de GTM en formato de exportación (`exportFormatVersion: 2`).

Si hay contradicción entre ellos, manda la matriz; avisa y no la resuelvas por tu cuenta.

Si `plan/matriz.csv` aún tiene las filas de Café Fandango o `brain/proyecto.md` está vacío, avísalo a la persona antes de generar nada para su proyecto.

## Tareas habituales

- **De la matriz a la especificación**: por cada fila, define el evento GA4 (eventos recomendados de GA4 cuando existan, `snake_case`), sus parámetros y el push al dataLayer o el activador de GTM que lo captura.
- **De la especificación al contenedor**: genera o actualiza `gtm/<proyecto>.json` con una etiqueta y un activador por fila, siguiendo la convención de nombres de `especificacion.md`. Después ejecuta, desde la raíz del repositorio, `python3 gtm/validar.py gtm/<proyecto>.json` (solo usa la librería estándar de Python) y no entregues nada que no pase. Con un archivo de otro nombre que los del kit, el validador solo comprueba la estructura: no conoce tu matriz, así que compara tú cada etiqueta con `plan/matriz.csv`.
- **UTMs**: genera enlaces en `plan/utms.csv` con la convención de la especificación (minúsculas, sin espacios ni tildes, valores cerrados de source y medium).
- **QA**: prepara `plan/qa.csv` con una fila por evento de la matriz; la persona añade las capturas y marca OK.
- **Cuaderno**: la persona rellena `cuaderno/cuaderno-de-clase.pdf` en su ordenador y, después de clase, su plantilla `.docx` en Word. No edites ni regeneres nada de `cuaderno/` salvo que te lo pida: `cuaderno/construir_docx.py` sobrescribe los `.docx` y borra sus respuestas, y el PDF no sale de este repositorio. Si te lo pide, dile antes que guarde una copia con otro nombre.

## Límites

- Sigue `mcp.md` si tienes conectores MCP. No publiques ni modifiques contenedores en vivo. Si tienes acceso a la API de GTM o a un servidor MCP de GTM, trabaja solo en un espacio de trabajo nuevo y deja la publicación a la persona.
- No envíes datos personales (email, teléfono, nombre) como parámetros.
- No inventes nombres de campos de GTM: si no estás seguro, compáralo con `gtm/wp-solucion-ecommerce.json` o `gtm/wp-solucion-leadgen.json` en proyectos de WordPress, y con `gtm/fandango-solucion.json` en la demo.
