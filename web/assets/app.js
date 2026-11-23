/*
 * Café Fandango · lógica de la tienda y pushes al dataLayer.
 *
 * Los pushes siguen especificacion.md al pie de la letra:
 * antes de cada evento de ecommerce va dataLayer.push({ ecommerce: null }).
 */
(function () {
  'use strict';

  window.dataLayer = window.dataLayer || [];

  // ---------- Catálogo (especificacion.md) ----------
  var CATALOGO = [
    { item_id: 'ETI-250', item_name: 'Café Etiopía Yirgacheffe 250 g', item_category: 'Origen único', price: 14.50 },
    { item_id: 'COL-250', item_name: 'Café Colombia Huila 250 g', item_category: 'Origen único', price: 12.90 },
    { item_id: 'BRA-250', item_name: 'Café Brasil Cerrado 250 g', item_category: 'Origen único', price: 11.50 },
    { item_id: 'FAN-1KG', item_name: 'Blend Fandango 1 kg', item_category: 'Blend', price: 32.00 },
    { item_id: 'SUB-MES', item_name: 'Suscripción mensual Fandango', item_category: 'Suscripción', price: 24.00 }
  ];
  var MONEDA = 'EUR';

  // Datos de presentación (no viajan al dataLayer).
  var FICHAS = {
    'ETI-250': {
      corto: 'Etiopía', peso: '250 g', color: '#c9683f',
      notas: 'Jazmín, bergamota y melocotón',
      descripcion: 'Un lavado de Yirgacheffe que huele a flores antes de probarlo. Cuerpo ligero, acidez viva y un final largo de té negro. Es el café con el que solemos convencer a quien dice que el café «sabe a quemado».',
      origen: 'Gedeo, Yirgacheffe (Etiopía)', proceso: 'Lavado', altitud: '1.900–2.100 m', tueste: 'Claro, para filtro',
      variedad: 'Heirloom etíopes', ideal: 'V60, Chemex, AeroPress'
    },
    'COL-250': {
      corto: 'Colombia', peso: '250 g', color: '#2e5a4c',
      notas: 'Panela, naranja y cacao',
      descripcion: 'Viene de pequeñas fincas del sur del Huila que secan el grano en marquesinas. Dulce y redondo, con una acidez de naranja que aguanta bien la leche. El café para todos los días.',
      origen: 'Pitalito, Huila (Colombia)', proceso: 'Lavado', altitud: '1.600–1.800 m', tueste: 'Medio',
      variedad: 'Caturra y Castillo', ideal: 'Filtro, italiana, espresso'
    },
    'BRA-250': {
      corto: 'Brasil', peso: '250 g', color: '#6b4630',
      notas: 'Avellana, chocolate con leche y caramelo',
      descripcion: 'Un natural del Cerrado Mineiro con mucho cuerpo y poca acidez. Si te gusta el café de siempre pero quieres que sepa a algo, empieza por aquí.',
      origen: 'Cerrado Mineiro (Brasil)', proceso: 'Natural', altitud: '1.000–1.200 m', tueste: 'Medio',
      variedad: 'Mundo Novo y Catuaí', ideal: 'Espresso, italiana, prensa francesa'
    },
    'FAN-1KG': {
      corto: 'Blend Fandango', peso: '1 kg', color: '#b5432a',
      notas: 'Chocolate negro, ciruela y especias',
      descripcion: 'Nuestra mezcla de la casa: Brasil para el cuerpo, Colombia para el dulzor y un toque de Etiopía para que no sea plana. Pensada para espresso y para cafeterías que muelen a diario.',
      origen: 'Brasil, Colombia y Etiopía', proceso: 'Natural y lavado', altitud: '1.000–2.000 m', tueste: 'Medio-oscuro',
      variedad: 'Mezcla de tres orígenes', ideal: 'Espresso, cortado, con leche'
    },
    'SUB-MES': {
      corto: 'Cada mes', peso: '2 × 250 g', color: '#231b15', notas: 'Dos orígenes distintos al mes'
    }
  };

  function buscar(id) {
    for (var i = 0; i < CATALOGO.length; i++) if (CATALOGO[i].item_id === id) return CATALOGO[i];
    return null;
  }

  function redondear(n) { return Math.round(n * 100) / 100; }

  function euros(n) {
    return n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
  }

  function itemDe(id, cantidad) {
    var p = buscar(id);
    var item = { item_id: p.item_id, item_name: p.item_name, item_category: p.item_category, price: p.price };
    if (cantidad !== undefined) item.quantity = cantidad;
    return item;
  }

  // ---------- dataLayer ----------
  function pushEcommerce(evento, ecommerce, extra) {
    window.dataLayer.push({ ecommerce: null });
    var datos = { event: evento };
    if (extra) for (var k in extra) datos[k] = extra[k];
    datos.ecommerce = ecommerce;
    window.dataLayer.push(datos);
  }

  // ---------- Carrito (localStorage) ----------
  var CLAVE_CARRITO = 'fandango_carrito';
  var CLAVE_PEDIDO = 'fandango_ultimo_pedido';

  function leerJSON(clave, defecto) {
    try {
      var v = JSON.parse(localStorage.getItem(clave));
      return v === null ? defecto : v;
    } catch (e) { return defecto; }
  }
  function guardarJSON(clave, valor) {
    try { localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) {}
  }

  // El carrito guarda los ítems completos tal y como viajan al dataLayer.
  function leerCarrito() {
    var c = leerJSON(CLAVE_CARRITO, []);
    if (!Array.isArray(c)) return [];
    return c.filter(function (l) { return l && buscar(l.item_id) && l.item_id !== 'SUB-MES' && l.quantity > 0; })
      .map(function (l) { return itemDe(l.item_id, Math.min(99, Math.floor(l.quantity))); });
  }
  function guardarCarrito(c) { guardarJSON(CLAVE_CARRITO, c); pintarContador(); }
  function totalCarrito(c) {
    return redondear(c.reduce(function (s, l) { return s + l.price * l.quantity; }, 0));
  }
  function unidades(c) { return c.reduce(function (s, l) { return s + l.quantity; }, 0); }

  function pintarContador() {
    var n = unidades(leerCarrito());
    var enlaces = document.querySelectorAll('[data-contador-carrito]');
    for (var i = 0; i < enlaces.length; i++) enlaces[i].textContent = n ? 'Carrito (' + n + ')' : 'Carrito';
  }

  // ---------- Ilustraciones SVG ----------
  function oscurecer(hex, f) {
    var n = parseInt(hex.slice(1), 16);
    var r = Math.round(((n >> 16) & 255) * f), g = Math.round(((n >> 8) & 255) * f), b = Math.round((n & 255) * f);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function bolsaSVG(id) {
    var f = FICHAS[id];
    var c = f.color, osc = oscurecer(c, 0.72);
    var largo = f.corto.length > 10;
    return '' +
      '<svg viewBox="0 0 200 260" role="img" aria-label="Bolsa de ' + f.corto + '">' +
      '<ellipse cx="100" cy="252" rx="78" ry="6" fill="#000" opacity=".10"/>' +
      '<path d="M28 40 L172 40 L178 236 Q178 248 166 248 L34 248 Q22 248 22 236 Z" fill="' + c + '"/>' +
      '<path d="M28 40 L60 40 L54 248 L34 248 Q22 248 22 236 Z" fill="#fff" opacity=".07"/>' +
      '<path d="M140 40 L172 40 L178 236 Q178 248 166 248 L146 248 Z" fill="#000" opacity=".10"/>' +
      '<rect x="24" y="14" width="152" height="32" rx="5" fill="' + osc + '"/>' +
      '<path d="M24 22 H176 M24 30 H176 M24 38 H176" stroke="#000" stroke-opacity=".12" stroke-width="1.5"/>' +
      '<rect x="44" y="88" width="112" height="124" rx="8" fill="#fffcf6"/>' +
      '<g transform="translate(100 112)" fill="' + c + '">' +
        '<path d="M-14 4 A14 14 0 0 1 14 4 Z"/>' +
        '<path d="M-20 4 H20" stroke="' + c + '" stroke-width="1.5"/>' +
      '</g>' +
      '<text x="100" y="134" text-anchor="middle" font-family="Instrument Sans, sans-serif" font-size="8.5" letter-spacing="2.4" fill="#5b4e44" font-weight="600">CAFÉ FANDANGO</text>' +
      '<text x="100" y="' + (largo ? 162 : 166) + '" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-size="' + (largo ? 15 : 22) + '" font-weight="600" fill="#231b15">' + f.corto + '</text>' +
      '<line x1="64" y1="180" x2="136" y2="180" stroke="#e0d4c1" stroke-width="1.5"/>' +
      '<text x="100" y="198" text-anchor="middle" font-family="Instrument Sans, sans-serif" font-size="10" fill="#5b4e44">' + f.peso + '</text>' +
      '</svg>';
  }

  function pintarBolsas() {
    var nodos = document.querySelectorAll('[data-bolsa]');
    for (var i = 0; i < nodos.length; i++) nodos[i].innerHTML = bolsaSVG(nodos[i].getAttribute('data-bolsa'));
  }

  // ---------- Páginas ----------
  var paginas = {};

  paginas.cafes = function () {
    var rejilla = document.getElementById('rejilla-cafes');
    var cafes = CATALOGO.filter(function (p) { return p.item_id !== 'SUB-MES'; });
    rejilla.innerHTML = cafes.map(function (p) {
      var f = FICHAS[p.item_id];
      return '<a class="producto-tarjeta" href="/producto.html?id=' + p.item_id + '">' +
        '<div class="lienzo">' + bolsaSVG(p.item_id) + '</div>' +
        '<div class="cuerpo"><span class="categoria">' + p.item_category + '</span>' +
        '<h3>' + p.item_name + '</h3><p class="notas">' + f.notas + '</p>' +
        '<span class="precio">' + euros(p.price) + '</span></div></a>';
    }).join('');

    pushEcommerce('view_item_list', {
      item_list_name: 'Cafés',
      items: cafes.map(function (p) { return itemDe(p.item_id); })
    });
  };

  paginas.producto = function () {
    var id = new URLSearchParams(location.search).get('id');
    var p = buscar(id);
    var ficha = document.getElementById('ficha');
    var noEncontrado = document.getElementById('no-encontrado');

    if (!p || id === 'SUB-MES') {
      ficha.hidden = true;
      noEncontrado.hidden = false;
      return;
    }
    var f = FICHAS[id];
    document.title = p.item_name + ' · Café Fandango';
    document.getElementById('migas-nombre').textContent = p.item_name;
    document.getElementById('ficha-visual').innerHTML = bolsaSVG(id);
    document.getElementById('ficha-categoria').textContent = p.item_category + ' · ' + f.tueste;
    document.getElementById('ficha-nombre').textContent = p.item_name;
    document.getElementById('ficha-precio').textContent = euros(p.price);
    document.getElementById('ficha-notas').textContent = f.notas;
    document.getElementById('ficha-descripcion').textContent = f.descripcion;
    var datos = { 'dato-origen': f.origen, 'dato-proceso': f.proceso, 'dato-altitud': f.altitud, 'dato-variedad': f.variedad, 'dato-tueste': f.tueste, 'dato-ideal': f.ideal };
    for (var k in datos) document.getElementById(k).textContent = datos[k];

    pushEcommerce('view_item', {
      currency: MONEDA,
      value: p.price,
      items: [itemDe(id, 1)]
    });

    var boton = document.getElementById('btn-add-to-cart');
    var selector = document.getElementById('cantidad');
    var aviso = document.getElementById('confirmacion');
    boton.addEventListener('click', function () {
      var cantidad = parseInt(selector.value, 10) || 1;
      var carrito = leerCarrito();
      var linea = carrito.filter(function (l) { return l.item_id === id; })[0];
      if (linea) linea.quantity += cantidad; else carrito.push(itemDe(id, cantidad));
      guardarCarrito(carrito);

      pushEcommerce('add_to_cart', {
        currency: MONEDA,
        value: redondear(p.price * cantidad),
        items: [itemDe(id, cantidad)]
      });

      aviso.innerHTML = '';
      aviso.appendChild(document.createTextNode('Añadido: ' + cantidad + ' × ' + p.item_name + '. '));
      var a = document.createElement('a');
      a.href = '/carrito.html';
      a.textContent = 'Ver carrito';
      aviso.appendChild(a);
      aviso.hidden = false;
    });
  };

  paginas.carrito = function () {
    var cuerpo = document.getElementById('lineas-carrito');
    var lleno = document.getElementById('carrito-lleno');
    var vacio = document.getElementById('carrito-vacio');
    var boton = document.getElementById('btn-checkout');

    function pintar() {
      var c = leerCarrito();
      lleno.hidden = c.length === 0;
      vacio.hidden = c.length > 0;
      boton.disabled = c.length === 0;
      cuerpo.innerHTML = c.map(function (l) {
        return '<tr><td><div class="linea-producto"><div class="mini">' + bolsaSVG(l.item_id) + '</div><div>' +
          '<a href="/producto.html?id=' + l.item_id + '">' + l.item_name + '</a><br>' +
          '<button class="quitar" type="button" data-quitar="' + l.item_id + '">Quitar</button></div></div></td>' +
          '<td class="num">' + euros(l.price) + '</td>' +
          '<td class="num"><span class="control-cantidad">' +
          '<button type="button" aria-label="Quitar una unidad" data-menos="' + l.item_id + '">−</button>' +
          '<span>' + l.quantity + '</span>' +
          '<button type="button" aria-label="Añadir una unidad" data-mas="' + l.item_id + '">+</button></span></td>' +
          '<td class="num">' + euros(redondear(l.price * l.quantity)) + '</td></tr>';
      }).join('');
      var total = totalCarrito(c);
      document.getElementById('subtotal').textContent = euros(total);
      document.getElementById('total').textContent = euros(total);
    }

    cuerpo.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      var c = leerCarrito();
      var id = b.getAttribute('data-mas') || b.getAttribute('data-menos') || b.getAttribute('data-quitar');
      c = c.map(function (l) {
        if (l.item_id !== id) return l;
        if (b.hasAttribute('data-mas')) l.quantity = Math.min(99, l.quantity + 1);
        if (b.hasAttribute('data-menos')) l.quantity -= 1;
        if (b.hasAttribute('data-quitar')) l.quantity = 0;
        return l;
      }).filter(function (l) { return l.quantity > 0; });
      guardarCarrito(c);
      pintar();
    });

    boton.addEventListener('click', function () {
      var c = leerCarrito();
      if (!c.length) return;
      pushEcommerce('begin_checkout', { currency: MONEDA, value: totalCarrito(c), items: c });
      window.location.href = '/checkout.html';
    });

    pintar();
  };

  // Deja un margen para que las etiquetas terminen de enviar antes de cambiar de página.
  function irTrasPush(url, boton) {
    boton.disabled = true;
    boton.textContent = 'Procesando…';
    setTimeout(function () { window.location.href = url; }, 700);
  }

  function nuevoTransactionId() { return 'FAN-' + Date.now(); }

  paginas.checkout = function () {
    var c = leerCarrito();
    var boton = document.getElementById('btn-pagar');
    var lista = document.getElementById('resumen-lineas');
    document.getElementById('pago-vacio').hidden = c.length > 0;
    document.getElementById('pago-lleno').hidden = c.length === 0;
    boton.disabled = c.length === 0;
    lista.innerHTML = c.map(function (l) {
      return '<li><span>' + l.quantity + ' × ' + l.item_name + '</span><span>' + euros(redondear(l.price * l.quantity)) + '</span></li>';
    }).join('');
    var total = totalCarrito(c);
    document.getElementById('total').textContent = euros(total);
    boton.textContent = 'Pagar ' + euros(total);

    boton.addEventListener('click', function () {
      var carrito = leerCarrito();
      if (!carrito.length) return;
      var pedido = {
        transaction_id: nuevoTransactionId(),
        currency: MONEDA,
        value: totalCarrito(carrito),
        items: carrito
      };
      pushEcommerce('purchase', pedido);
      guardarJSON(CLAVE_PEDIDO, { ecommerce: pedido });
      guardarCarrito([]);
      irTrasPush('/gracias.html', boton);
    });
  };

  paginas.suscripcion = function () {
    var boton = document.getElementById('btn-suscribir');
    boton.addEventListener('click', function () {
      var sub = buscar('SUB-MES');
      var pedido = {
        transaction_id: nuevoTransactionId(),
        currency: MONEDA,
        value: sub.price,
        items: [itemDe('SUB-MES', 1)]
      };
      pushEcommerce('purchase', pedido);
      guardarJSON(CLAVE_PEDIDO, { ecommerce: pedido });
      irTrasPush('/gracias.html', boton);
    });
  };

  paginas.gracias = function () {
    var p = leerJSON(CLAVE_PEDIDO, null);
    var caja = document.getElementById('pedido');
    if (!p || !p.ecommerce) return;
    var sub = (p.ecommerce.items || []).some(function (i) { return i.item_category === 'Suscripción'; });
    document.getElementById('gracias-titulo').textContent = sub ? '¡Bienvenido al club!' : '¡Pedido recibido!';
    document.getElementById('gracias-texto').textContent = sub
      ? 'Tu primera caja sale el próximo lunes. Cada mes recibirás dos cafés distintos, tostados esa misma semana.'
      : 'Tostamos los martes y los jueves: tu café sale del tostador y entra en la caja el mismo día.';
    var filas = [
      ['Pedido', p.ecommerce.transaction_id],
      ['Tipo', sub ? 'Suscripción mensual' : 'Compra puntual'],
      ['Total', euros(p.ecommerce.value)]
    ];
    caja.innerHTML = '';
    filas.forEach(function (f) {
      var d = document.createElement('div');
      var a = document.createElement('span'); a.textContent = f[0];
      var b = document.createElement('span'); b.textContent = f[1];
      d.appendChild(a); d.appendChild(b); caja.appendChild(d);
    });
    caja.hidden = false;
  };

  // Los campos del formulario no llevan atributo name: el envío no pone datos personales en la URL,
  // que GA4 registra. El saludo de la página de gracias viaja en sessionStorage, dentro del navegador.
  paginas.empresas = function () {
    var form = document.getElementById('form-b2b');
    form.addEventListener('submit', function () {
      try {
        sessionStorage.setItem('fandango_b2b', JSON.stringify({
          nombre: document.getElementById('nombre').value,
          empresa: document.getElementById('empresa').value
        }));
      } catch (e) {}
    });
  };

  paginas['gracias-empresas'] = function () {
    var datos = {};
    try { datos = JSON.parse(sessionStorage.getItem('fandango_b2b') || '{}'); } catch (e) {}
    var nombre = (datos.nombre || '').trim().split(/\s+/)[0];
    var empresa = (datos.empresa || '').trim();
    if (nombre) document.getElementById('saludo').textContent = 'Gracias, ' + nombre + '.';
    if (empresa) document.getElementById('empresa-texto').textContent = 'Te escribimos en menos de 48 horas para preparar las muestras de ' + empresa + '.';
  };

  // ---------- Arranque ----------
  function iniciar() {
    pintarContador();
    pintarBolsas();
    var pagina = document.body.getAttribute('data-pagina');
    if (paginas[pagina]) paginas[pagina]();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
