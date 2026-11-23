# Café Fandango · web de prácticas

Tienda ficticia de café para practicar Google Tag Manager. Es HTML, CSS y JavaScript sin dependencias: no hay que instalar nada ni compilar nada. Los eventos, los IDs y los pushes al `dataLayer` siguen `../especificacion.md`.

## Arrancarla

Necesitas Python 3 (viene de serie en macOS y Linux; en Windows, instálalo desde python.org y usa `py` en lugar de `python3`).

```bash
cd web
python3 -m http.server 8000
```

Abre `http://localhost:8000`. Para pararla, `Ctrl + C` en la terminal.

Ábrela siempre así, con `http://localhost:8000`. Si haces doble clic en un `.html` (dirección `file://...`), los enlaces y el vídeo no funcionan.

## Cargar tu contenedor de GTM

Añade tu ID de contenedor a la URL una vez:

```
http://localhost:8000/?gtm=GTM-XXXXXXX
```

La web lo recuerda en este navegador (`localStorage`, clave `fandango_gtm_id`) y lo carga en todas las páginas. Abajo a la izquierda verás una barra:

- «Contenedor: GTM-XXXXXXX»: tu contenedor está cargado.
- «Sin contenedor: añade ?gtm=GTM-XXXXXXX a la URL»: no hay ninguno.

Para cambiar de contenedor, vuelve a usar `?gtm=` con el nuevo ID. Para quitarlo, `?gtm=reset`.

Para la vista previa de GTM, pon `http://localhost:8000` como URL del sitio en Tag Assistant.

## Ver el dataLayer en directo

Añade `?debug=1` a cualquier URL (por ejemplo `http://localhost:8000/cafes.html?debug=1`). Aparece un panel a la derecha con cada push al `dataLayer`, en orden: los de la web y los que añade GTM (`gtm.js`, `gtm.dom`, `gtm.click`...). Pulsa una línea para abrir o cerrar su contenido.

El panel sigue activo al navegar por la web en esa pestaña y guarda los pushes de las páginas anteriores, para que veas el `purchase` después de llegar a la página de gracias. Se apaga con la × o con `?debug=0`.

## Páginas y qué medir en cada una

| Página | Dirección | Qué pasa |
| --- | --- | --- |
| Portada | `/index.html` | Dos botones «Suscribirme» con el mismo texto y destino: `#cta-suscribirme-hero` y `#cta-suscribirme-footer`. Enlace `#cta-ver-cafes` |
| Cafés | `/cafes.html` | Push `view_item_list` al cargar |
| Ficha | `/producto.html?id=ETI-250` | Push `view_item` al cargar. Vídeo de YouTube `#video-tueste`. Botón `#btn-add-to-cart`: push `add_to_cart` |
| Carrito | `/carrito.html` | Botón `#btn-checkout`: push `begin_checkout` y va al pago |
| Pago | `/checkout.html` | Botón `#btn-pagar`: push `purchase` con los cafés del carrito |
| Suscripción | `/suscripcion.html` | Botón `#btn-suscribir`: push `purchase` con el ítem `SUB-MES` (`item_category: "Suscripción"`) |
| Cafeterías | `/empresas.html` | Formulario `#form-b2b`, envío real a `/gracias-empresas.html` |
| Guía | `/guia.html` | Artículo largo para medir el scroll al 75 % |
| Gracias | `/gracias.html`, `/gracias-empresas.html` | Confirmación, sin pushes |

Fichas disponibles: `ETI-250`, `COL-250`, `BRA-250` y `FAN-1KG`. Antes de cada evento de ecommerce la web hace `dataLayer.push({ ecommerce: null })`.

El carrito se guarda en `localStorage` (`fandango_carrito`) y se vacía al pagar. El pago es simulado: no se pide ni se cobra nada.

## Archivos

- `assets/gtm.js`: carga tu contenedor y pinta la barra. Va el primero en el `<head>` de cada página.
- `assets/app.js`: catálogo, carrito y todos los pushes al `dataLayer`.
- `assets/debug.js`: el panel de `?debug=1`.
- `assets/styles.css`: estilos.

El vídeo de la ficha es «Coffee Roasting Explained! One batch, beginning to end» (canal Roaster Kat, `https://www.youtube.com/watch?v=hX3Ok_zPW4s`), embebido con `enablejsapi=1` para que el activador de YouTube de GTM lo detecte.
