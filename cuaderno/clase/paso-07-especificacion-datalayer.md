# Paso 7. Especificación del dataLayer

**4 min · tu proyecto.** Anota el evento que GTM4WP empuja al dataLayer con tu macro principal.

Con GTM4WP no escribes ningún push: lo hace el plugin. Tú solo anotas qué evento empuja, en qué página y con qué claves. En una tienda, WooCommerce empuja `purchase` en la página de pedido recibido. En una web de leads, Contact Form 7 empuja `gtm4wp.contactForm7MailSent` con `formid` y `formname`. Si tu macro es un clic en el teléfono o en WhatsApp, no hay push: apunta el enlace. El código de abajo es solo el ejemplo de la web demo, para que veas qué forma tiene un push. Café Fandango empuja este objeto al pulsar `#btn-pagar` en `/checkout.html`:

```js
dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: "purchase",
  ecommerce: {
    transaction_id: "FAN-1700000000000",
    currency: "EUR",
    value: 29.00,
    items: [{ item_id: "ETI-250", item_name: "Café Etiopía Yirgacheffe 250 g",
              item_category: "Origen único", price: 14.50, quantity: 2 }]
  }
});
```

La suscripción es el mismo `purchase`, con un ítem de categoría `Suscripción`. Los cafés sueltos llevan `Origen único` o `Blend`. GTM4WP envía `item_category` por su cuenta, sin desarrollo.

*Plantilla 7.1. Dónde y cuándo llega*

| Evento que empuja GTM4WP | Página | Cuándo |
| ------ | ------ | ---------- |
| | | |

*Plantilla 7.2. Las claves que empuja GTM4WP con tu macro principal*

| Clave | Valor de ejemplo |
| ------ | ---------- |
| `event` | |
| | |
| | |
| | |
| | |

- [ ] Ningún valor es un email, un teléfono o un nombre.
- [ ] Si usas Contact Form 7, **Submitted field values in the data layer** está en **None** en GTM4WP.

Versión completa: el paso 7 de tu plantilla añade los ajustes de GTM4WP, todo lo que llega al dataLayer, los IDs que necesita GTM y el ticket para quien gestiona la web.
