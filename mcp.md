# Conectar GA4 y GTM a la IA (MCP)

Un **servidor MCP** (Model Context Protocol) es un conector que da a tu asistente de IA acceso a una herramienta: puede leer los datos de GA4 o crear etiquetas en GTM. Esta guía dice cuáles existen hoy para esta clase, en qué asistente funcionan y con qué reglas se usan.

Revisado en noviembre de 2026. Esto cambia cada pocos meses: comprueba el enlace antes de conectar nada.

## Qué asistente lo admite

| Asistente | Conectores MCP en la web | Plan |
| --- | --- | --- |
| Claude | Sí: conectores remotos en claude.ai. Los servidores locales, solo en Claude Desktop | También en el plan gratuito (un conector personalizado) |
| ChatGPT | Sí, solo remotos y solo en la web | Completo en Business, Enterprise y Edu; en Pro, solo lectura; en Plus, sin confirmar |
| Gemini | Muy limitado (solo Gemini Spark, disponibilidad fuera de EE. UU. sin confirmar) | De pago |

## Los servidores de esta clase

| Servidor | Para qué | Oficial | Lectura o escritura | Cómo se conecta | Enlace |
| --- | --- | --- | --- | --- | --- |
| **Google Analytics MCP** | Preguntar por tus datos de GA4. Su informe en tiempo real sirve para contrastar con DebugView que un evento llegó | Sí, de Google | Solo lectura por defecto (la escritura hay que activarla a propósito) | Se instala en tu ordenador (pipx): pide configuración técnica | https://github.com/googleanalytics/google-analytics-mcp |
| **GTM MCP de Stape** | Que la IA lea y cree etiquetas, activadores y variables | No: es de Stape (no hay MCP oficial de Google para GTM) | Escribe y **puede publicar** el contenedor | Remoto, `gtm-mcp.stape.io/mcp`, con tu cuenta de Google | https://github.com/stape-io/google-tag-manager-mcp-server |
| **Google Ads MCP** | Leer campañas y conversiones de Google Ads | Sí | Configurable: algunas herramientas escriben | Local o en tu propio servidor | https://developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server |

El MCP de Google Analytics no tiene informes de cohortes ni de valor de vida: eso se ve en la clase de análisis predictivo.

## Reglas

1. **GTM: solo en un contenedor de pruebas y en un espacio de trabajo nuevo.** El conector de Stape puede publicar: nunca le des acceso a un contenedor en vivo, y revisa en GTM que tu usuario no tenga permiso de publicación si solo vas a probar.
2. **Revisa cada llamada** que hace el asistente. No marques «permitir siempre» en acciones que crean, cambian o publican.
3. **La matriz manda.** La IA propone etiquetas a partir de `plan/matriz.csv` y `especificacion.md`; tú decides (ver `AGENTS.md`).
4. **QA igual que sin IA.** Nada se publica sin captura de Tag Assistant y de DebugView, aunque el informe en tiempo real del MCP diga que el evento llegó.
5. **Solo conectores oficiales o de proveedores conocidos.** Nada que pida tu contraseña.
6. **Al terminar, revoca el acceso** desde tu cuenta de Google.

## Un prompt de ejemplo

```
Con el conector de Google Analytics, consulta el informe en tiempo real de mi propiedad
de los últimos 30 minutos: eventos purchase y generate_lead con su fuente y medio.
Enséñame la tabla. No cambies nada en la propiedad.
```
