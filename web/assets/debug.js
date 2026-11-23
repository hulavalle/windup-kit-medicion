/*
 * Café Fandango · panel de depuración del dataLayer.
 *
 * ?debug=1 lo activa (se recuerda en esta pestaña), ?debug=0 lo apaga.
 * Lista cada push al dataLayer en directo, incluidos los que hace GTM
 * (gtm.js, gtm.dom, gtm.click...). Conserva los de las páginas anteriores
 * de la pestaña, para ver el purchase después de llegar a /gracias.html.
 */
(function () {
  'use strict';

  var CLAVE_ACTIVO = 'fandango_debug';
  var CLAVE_LOG = 'fandango_debug_log';
  var CLAVE_MIN = 'fandango_debug_min';
  var MAX = 300;

  function ses(accion, clave, valor) {
    try {
      if (accion === 'get') return sessionStorage.getItem(clave);
      if (accion === 'set') sessionStorage.setItem(clave, valor);
      if (accion === 'del') sessionStorage.removeItem(clave);
    } catch (e) {}
    return null;
  }

  var param = new URLSearchParams(location.search).get('debug');
  if (param === '1') ses('set', CLAVE_ACTIVO, '1');
  if (param === '0') { ses('del', CLAVE_ACTIVO); ses('del', CLAVE_LOG); }
  if (ses('get', CLAVE_ACTIVO) !== '1') return;

  window.dataLayer = window.dataLayer || [];
  var dl = window.dataLayer;
  var pagina = location.pathname + location.search;
  var cargada = Date.now();

  var log;
  try { log = JSON.parse(ses('get', CLAVE_LOG)) || []; } catch (e) { log = []; }

  var vistos = 0;

  function describirNodo(n) {
    var s = n.tagName ? n.tagName.toLowerCase() : n.nodeName;
    if (n.id) s += '#' + n.id;
    if (typeof n.className === 'string' && n.className.trim()) s += '.' + n.className.trim().split(/\s+/).join('.');
    return '<' + s + '>';
  }

  function serializar(obj) {
    var vistosObj = [];
    try {
      return JSON.stringify(obj, function (k, v) {
        if (typeof v === 'function') return 'ƒ ' + (v.name || 'función');
        if (v instanceof Node) return describirNodo(v);
        if (v && typeof v === 'object') {
          if (vistosObj.indexOf(v) !== -1) return '[circular]';
          vistosObj.push(v);
        }
        return v;
      }, 2);
    } catch (e) {
      return String(obj);
    }
  }

  function nombreEvento(o) {
    if (o && typeof o === 'object') {
      if (typeof o.event === 'string') return o.event;
      if ('ecommerce' in o && o.ecommerce === null && Object.keys(o).length === 1) return 'ecommerce: null';
      if (o.length !== undefined && o[0] !== undefined) return 'gtag(' + String(o[0]) + ')';
    }
    return '(sin event)';
  }

  function hora(t) {
    var d = new Date(t);
    function dos(n) { return (n < 10 ? '0' : '') + n; }
    return dos(d.getHours()) + ':' + dos(d.getMinutes()) + ':' + dos(d.getSeconds()) + '.' + String(d.getMilliseconds()).padStart(3, '0');
  }

  function guardar() {
    if (log.length > MAX) log = log.slice(log.length - MAX);
    ses('set', CLAVE_LOG, JSON.stringify(log));
  }

  function escanear() {
    var hay = false;
    while (vistos < dl.length) {
      var o = dl[vistos];
      log.push({ vista: cargada, pagina: pagina, n: vistos, t: Date.now(), evento: nombreEvento(o), json: serializar(o) });
      vistos++;
      hay = true;
    }
    if (hay) { guardar(); pintar(); }
  }

  // Envoltura de push: GTM conserva la función previa al cargar, así que la cadena sigue viva.
  var pushOriginal = dl.push;
  dl.push = function () {
    var r = pushOriginal.apply(dl, arguments);
    escanear();
    return r;
  };
  setInterval(escanear, 250);
  window.addEventListener('pagehide', escanear);

  // ---------- Interfaz ----------
  var panel, lista, contador, minimizado = ses('get', CLAVE_MIN) === '1';

  var CSS = '' +
    // Se acopla a la derecha y empuja la página: nunca tapa un botón de la web.
    'html.fandango-debug-on body{margin-right:380px}' +
    '#fandango-debug{position:fixed;top:0;right:0;bottom:0;z-index:2147483001;width:380px;' +
    'display:flex;flex-direction:column;background:#14110f;color:#e8e0d6;border-left:1px solid #362d27;' +
    'font:12px/1.45 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;overflow:hidden}' +
    '#fandango-debug.min{top:auto;bottom:12px;right:12px;width:auto;border-radius:8px;border:0;box-shadow:0 6px 18px rgba(0,0,0,.3)}' +
    '@media (max-width:760px){html.fandango-debug-on body{margin-right:0;padding-bottom:42vh}' +
    '#fandango-debug:not(.min){top:auto;left:0;width:auto;height:42vh;border-left:0;border-top:1px solid #362d27}}' +
    '#fandango-debug header{display:flex;align-items:center;gap:8px;padding:9px 10px 9px 12px;background:#231d19;border-bottom:1px solid #362d27}' +
    '#fandango-debug header strong{flex:1;font-weight:600;color:#fff}' +
    '#fandango-debug header button{font:inherit;background:#362d27;color:#e8e0d6;border:0;border-radius:5px;padding:3px 8px;cursor:pointer}' +
    '#fandango-debug header button:hover{background:#4a3e36}' +
    '#fandango-debug ol{list-style:none;margin:0;padding:0;overflow:auto;flex:1}' +
    '#fandango-debug.min ol{display:none}' +
    '#fandango-debug li{border-bottom:1px solid #2a2320;padding:7px 12px}' +
    '#fandango-debug li.previa{opacity:.55}' +
    '#fandango-debug .pag{padding:6px 12px;background:#1c1714;color:#a99b8e;font-size:11px;border-bottom:1px solid #2a2320}' +
    '#fandango-debug .linea{display:flex;gap:8px;align-items:baseline;cursor:pointer}' +
    '#fandango-debug .idx{color:#7d6f63;min-width:22px}' +
    '#fandango-debug .ev{font-weight:700;color:#f0b23f;flex:1;word-break:break-all}' +
    '#fandango-debug .ev.ecom{color:#7fd1a8}' +
    '#fandango-debug .ev.nulo{color:#9b8d80;font-weight:400}' +
    '#fandango-debug .ev.gtm{color:#8fb3e8;font-weight:400}' +
    '#fandango-debug .t{color:#7d6f63}' +
    '#fandango-debug pre{margin:6px 0 2px;white-space:pre-wrap;word-break:break-word;color:#d7cbbf;font:inherit;font-size:11px}' +
    '#fandango-debug li.cerrada pre{display:none}' +
    '#fandango-debug .dl-vacio{padding:14px 12px;color:#a99b8e}';

  var ECOM = /^(view_item_list|view_item|add_to_cart|begin_checkout|purchase|select_item|remove_from_cart|add_payment_info|add_shipping_info)$/;

  function crear() {
    var estilo = document.createElement('style');
    estilo.textContent = CSS;
    document.head.appendChild(estilo);

    panel = document.createElement('section');
    panel.id = 'fandango-debug';
    panel.setAttribute('aria-label', 'Panel de depuración del dataLayer');
    if (minimizado) panel.className = 'min';
    else document.documentElement.classList.add('fandango-debug-on');
    panel.innerHTML = '<header><strong>dataLayer · <span data-n>0</span> pushes</strong>' +
      '<button type="button" data-accion="limpiar" title="Vaciar el historial">Limpiar</button>' +
      '<button type="button" data-accion="min" title="Minimizar">' + (minimizado ? '▴' : '▾') + '</button>' +
      '<button type="button" data-accion="cerrar" title="Apagar el panel (?debug=0)">×</button></header><ol></ol>';
    lista = panel.querySelector('ol');
    contador = panel.querySelector('[data-n]');
    document.body.appendChild(panel);

    panel.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (b) {
        var a = b.getAttribute('data-accion');
        if (a === 'limpiar') { log = []; guardar(); pintar(); }
        if (a === 'min') {
          minimizado = !minimizado;
          panel.className = minimizado ? 'min' : '';
          document.documentElement.classList.toggle('fandango-debug-on', !minimizado);
          b.textContent = minimizado ? '▴' : '▾';
          ses('set', CLAVE_MIN, minimizado ? '1' : '0');
        }
        if (a === 'cerrar') { ses('del', CLAVE_ACTIVO); ses('del', CLAVE_LOG); panel.remove(); document.documentElement.classList.remove('fandango-debug-on'); }
        return;
      }
      var linea = e.target.closest('.linea');
      if (linea) linea.parentNode.classList.toggle('cerrada');
    });
    pintar();
  }

  function pintar() {
    if (!lista) return;
    var actuales = log.filter(function (e) { return e.vista === cargada; }).length;
    contador.textContent = actuales;
    if (!log.length) {
      lista.innerHTML = '<li class="dl-vacio">Aún no hay pushes en esta página.</li>';
      return;
    }
    var html = '', vistaPrevia = null;
    log.forEach(function (e) {
      if (e.vista !== vistaPrevia) {
        vistaPrevia = e.vista;
        html += '<li class="pag">' + (e.vista === cargada ? 'Esta página · ' : 'Antes · ') + escapar(e.pagina) + '</li>';
      }
      var clase = /^gtm\./.test(e.evento) || /^gtag\(/.test(e.evento) ? 'gtm' : ECOM.test(e.evento) ? 'ecom' : e.evento === 'ecommerce: null' ? 'nulo' : '';
      var cerrada = clase === 'gtm' || clase === 'nulo';
      html += '<li class="' + (e.vista !== cargada ? 'previa ' : '') + (cerrada ? 'cerrada' : '') + '">' +
        '<div class="linea"><span class="idx">' + e.n + '</span><span class="ev ' + clase + '">' + escapar(e.evento) + '</span>' +
        '<span class="t">' + hora(e.t) + '</span></div><pre>' + escapar(e.json) + '</pre></li>';
    });
    lista.innerHTML = html;
    lista.scrollTop = lista.scrollHeight;
  }

  function escapar(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  escanear();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', crear);
  else crear();
})();
