# Paso 1. Diagnóstico: por qué falla el dato y cuántos eventos necesitas

**Qué te llevas.** Los riesgos de tu proyecto en las cuatro familias de problemas del dato y un presupuesto de eventos que tu equipo pueda mantener.

## Por qué importa

Casi todos los proyectos de analítica tienen problemas con los datos de eventos. Los problemas se agrupan en cuatro familias: diseño, proceso, implementación y personas.

- Diseño. El problema más común es tener demasiados eventos. Los planes de 40 a 70 eventos acaban odiados por quien los implementa. Un negocio como Airbnb se puede operar con ocho eventos. Con 40 eventos únicos ya hay que preocuparse, y con 80 el diseño está mal.
- Proceso. El dato empeora después de implementarlo, porque nadie revisa ni quita eventos. En el 60 % de las empresas el tracking se pierde en el backlog.
- Implementación. El navegador nunca envía el 100 % de los eventos. La identidad se rompe cuando caduca una cookie o cuando el cliente cambia de dispositivo. Con ella se pierde qué campaña convirtió. Sin pruebas, un parámetro roto deja vacío un informe y nadie se entera.
- Personas. Cada equipo llama distinto a lo mismo: «solicitud», «cita», «lead», «paciente». Y el dato no suele tener dueño.

Tu situación decide cuántos eventos puedes tener. Sin desarrolladores, pocos eventos. También cuentan tu tiempo y la etapa del proyecto.

En captación de leads hay dos riesgos más. El lead se cierra fuera de la web, en una llamada, en WhatsApp o en la agenda, y GTM solo ve el clic. Y el formulario recoge datos personales que no pueden llegar a GA4. En una clínica, además, pueden ser datos de salud.

## Ejemplo con Clínica Dental Alameda

*Ejemplo 1.1. Diagnóstico*

| Pregunta | Clínica Dental Alameda | Consecuencia para el diseño |
| --- | --- | --- |
| ¿Quién puede cambiar el código? | Nadie. Una agencia mantiene el WordPress y la clínica edita contenidos y botones | Todo sale de GTM4WP y de activadores automáticos de GTM. Las clases de los botones se ponen en el editor de WordPress |
| ¿Tu plataforma o un plugin ya envía datos al dataLayer? | Sí. GTM4WP con su módulo de Contact Form 7 empuja `gtm4wp.contactForm7MailSent` con `formid` y `formname` | El lead del formulario sale del evento del plugin, no del activador de envío de formulario |
| ¿Qué pasos ocurren fuera de la web? | La llamada, la conversación de WhatsApp, la confirmación de la cita, la primera visita y el presupuesto | GTM solo ve el clic. Los contrapesos se miden en la agenda, la centralita y WhatsApp Business |
| ¿Hay más de un dominio en el recorrido? | No. WhatsApp abre otra aplicación, pero el clic ocurre en la web | Sin riesgo de cross-domain |
| ¿Hay login? | No | Sin `user_id`. GA4 reconoce al visitante por la cookie de su navegador |
| ¿Hay banner de cookies con Consent Mode v2? | Sí, un plugin de cookies conectado con GTM4WP | La prueba de consentimiento del paso 9 se hace antes de publicar |
| ¿Qué mide ya la web? | GA4 con la medición mejorada activada | La medición mejorada registra el clic a WhatsApp como `click` saliente y envía `form_start` y `form_submit`. Las conversiones son `whatsapp_click` y `generate_lead`, y no se suman con esos eventos |
| ¿Cuántas horas al mes dedicará el equipo? | Una hora al mes | Seis filas como máximo |
| ¿Quién mira el dato y cada cuánto? | Gerencia, cada lunes, con recepción | Un responsable y una revisión semanal (paso 9) |

*Ejemplo 1.2. Presupuesto de eventos*

| Tipo | Filas | Eventos GA4 distintos | Por qué |
| --- | --- | --- | --- |
| Macro | 3 | 3: `generate_lead`, `phone_click` y `whatsapp_click` | Las tres puertas por las que llega un paciente |
| Micro | 3 | 3: `cta_click`, `page_read` y `timer_5s` | El clic en «Pedir cita» y dos señales de interés en los tratamientos |
| Total | 6 | 6 | Muy por debajo del umbral de 40 eventos |

*Ejemplo 1.3. Riesgos*

| Familia | Riesgo en Clínica Dental Alameda | Qué se hace |
| --- | --- | --- |
| Diseño | Querer un evento por cada tratamiento | Un solo `page_read` y un solo `timer_5s`, con `page_path` |
| Proceso | Alguien cambia el título del formulario «Pedir cita» y el lead deja de contar | La ficha de `generate_lead` avisa de que el activador depende del título. Revisión semanal (paso 9) |
| Implementación | GTM4WP mete por defecto los campos del formulario en el dataLayer: nombre, teléfono y el motivo de la consulta | **Submitted field values in the data layer** en **None**, y nunca se manda `inputs` a GA4 |
| Personas | «Solicitud», «cita», «lead» y «paciente» para lo mismo | El evento es `generate_lead` con `lead_type` = `cita`. «Paciente» solo cuando viene a la primera visita |

## Tu proyecto

1. Responde el diagnóstico (plantilla 1.1). Escribe en la tercera columna qué cambia en tu diseño.
2. Lee las reglas de abajo y corrige la tercera columna si hace falta.
3. Fija tu presupuesto de eventos (plantilla 1.2).
4. Escribe un riesgo por familia y qué harás con él (plantilla 1.3).

Reglas para leer tu diagnóstico:

- Si nadie puede tocar el código, usa solo activadores automáticos de GTM: clic, envío de formulario, desplazamiento, temporizador y vista de página. Pon una clase o un `id` estable en cada botón importante desde el editor de WordPress.
- Si usas Contact Form 7, GTM4WP empuja un evento por cada envío. El que cuenta como lead es `gtm4wp.contactForm7MailSent`: el formulario se envió y el correo salió bien. Los ajustes están en `gtm4wp.md`.
- Si usas otro plugin de formularios, como Gravity Forms, WPForms o Elementor Forms, GTM4WP 2.1.1 no lo integra. Busca el evento de ese plugin o usa el activador de envío de formulario de GTM, y prueba que solo salta cuando el envío es correcto.
- Si el lead se cierra por teléfono o WhatsApp, mide el clic en el enlace `tel:` o `wa.me`. La llamada y la conversación ocurren fuera de la web: cuéntalas en la centralita y en WhatsApp Business y une los datos después.
- Si el formulario pide datos personales, no los mandes nunca a GA4. En una clínica pueden ser datos de salud, que el RGPD protege más.
- Si no hay banner de cookies con Consent Mode v2, no publiques en una web real en España hasta tenerlo. Esta plantilla no cubre la parte legal.
- Si la medición mejorada de GA4 está activada, anota qué eventos envía ya. No crees en GTM un evento con el mismo nombre salvo que desactives esa opción.
- Si otro plugin, como Site Kit o uno de cookies, ya carga GTM o GA4, deja solo GTM4WP. Con dos instaladores, cada página vista y cada lead cuentan dos veces.

*Plantilla 1.1. Diagnóstico de tu proyecto*

| Pregunta | Tu proyecto | Consecuencia para el diseño |
| --- | --- | --- |
| ¿Quién puede cambiar el código? | | |
| ¿Tu plataforma o un plugin ya envía datos al dataLayer? | | |
| ¿Qué pasos ocurren fuera de la web? | | |
| ¿Hay más de un dominio en el recorrido? | | |
| ¿Hay login? | | |
| ¿Hay banner de cookies con Consent Mode v2? | | |
| ¿Qué mide ya la web? | | |
| ¿Cuántas horas al mes dedicará el equipo? | | |
| ¿Quién mira el dato y cada cuánto? | | |

Apunta a al menos 3 macro y 3 micro. Un negocio entero se puede operar con unos ocho eventos. Entre 6 y 12 filas es un tamaño razonable para una versión 1.

*Plantilla 1.2. Tu presupuesto de eventos*

| Tipo | Máximo de filas | Por qué |
| --- | --- | --- |
| Macro | | |
| Micro | | |
| Total | | |

*Plantilla 1.3. Riesgos de tu proyecto*

| Familia | Riesgo en tu proyecto | Qué harás |
| --- | --- | --- |
| Diseño | | |
| Proceso | | |
| Implementación | | |
| Personas | | |

## Antes de seguir

- [ ] Sabes qué eventos pueden salir del dataLayer y cuáles solo de activadores automáticos.
- [ ] Tienes la lista de pasos que ocurren fuera de la web y dónde se cuentan.
- [ ] Sabes qué datos personales recoge tu formulario.
- [ ] Sabes qué envía ya la medición mejorada de GA4.
- [ ] Solo GTM4WP carga GTM en tu WordPress.
- [ ] Tu presupuesto de eventos cabe en las horas que vais a dedicar.
- [ ] Cada familia de problemas tiene un riesgo y una acción.
