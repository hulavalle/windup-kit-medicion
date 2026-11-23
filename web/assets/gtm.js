/*
 * Café Fandango · cargador del contenedor de Google Tag Manager del alumno.
 *
 * - ?gtm=GTM-XXXXXXX guarda el ID en localStorage (fandango_gtm_id).
 * - ?gtm=reset lo borra.
 * - Si hay ID, inicializa dataLayer e inyecta el fragmento oficial de GTM.
 * - Muestra una barra fija con el estado del contenedor.
 *
 * Este archivo va el primero dentro de <head>, antes que cualquier push.
 */
(function () {
  var CLAVE = 'fandango_gtm_id';
  var FORMATO = /^GTM-[A-Z0-9]{4,10}$/;

  function leer() {
    try { return localStorage.getItem(CLAVE); } catch (e) { return null; }
  }
  function guardar(valor) {
    try { localStorage.setItem(CLAVE, valor); } catch (e) {}
  }
  function borrar() {
    try { localStorage.removeItem(CLAVE); } catch (e) {}
  }

  var parametro = new URLSearchParams(window.location.search).get('gtm');
  var invalido = null;

  if (parametro !== null) {
    var valor = parametro.trim().toUpperCase();
    if (valor === 'RESET') {
      borrar();
    } else if (FORMATO.test(valor)) {
      guardar(valor);
    } else {
      invalido = parametro;
    }
  }

  var id = leer();
  if (id && !FORMATO.test(id)) { borrar(); id = null; }

  window.dataLayer = window.dataLayer || [];

  if (id) {
    // Fragmento oficial de Google Tag Manager (<head>).
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', id);
  }

  function pintarBarra() {
    var barra = document.createElement('div');
    barra.id = 'fandango-gtm-bar';
    barra.setAttribute('role', 'status');
    var texto;
    if (id) {
      texto = 'Contenedor: ' + id;
      barra.className = 'con-contenedor';
    } else {
      texto = 'Sin contenedor: añade ?gtm=GTM-XXXXXXX a la URL';
      barra.className = 'sin-contenedor';
    }
    if (invalido) texto = 'ID no válido («' + invalido + '») · ' + texto;
    barra.textContent = texto;
    barra.style.cssText = [
      'position:fixed', 'left:12px', 'bottom:12px', 'z-index:2147483000',
      'font:500 12px/1.2 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace',
      'padding:7px 10px', 'border-radius:6px', 'pointer-events:none',
      'box-shadow:0 1px 2px rgba(0,0,0,.18)',
      id ? 'background:#1f2a24;color:#cfe9d8' : 'background:#3a2a22;color:#f3d9c9'
    ].join(';');
    document.body.appendChild(barra);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', pintarBarra);
  } else {
    pintarBarra();
  }
})();
