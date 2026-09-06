/* Catálogo común para todas las vistas de gremios. */
// Relaciona cada HTML con su categoría del inventario y los datos que se muestran en el encabezado.
const configuracionGremios = {
    "adrianne-herreria.html": { categoria: "herreria", titulo: "Herrería de Adrianne Avenicci", tipo: "Herrería", icono: "../assets/img/Iconos/Whiterun.png", subtitulo: "Whiterun · Especialista en herrería, buenos precios en metal." },
    "arcadias-cauldron.html": { categoria: "alquimia", titulo: "Arcadia's Cauldron", tipo: "Alquimia", icono: "../assets/img/Iconos/Whiterun.png", subtitulo: "Inventario de Alquimia · Pociones, venenos e ingredientes" },
    "belethor.html": { categoria: "bienesGenerales", titulo: "Belethor - Bienes Generales", tipo: "Bienes generales", icono: "../assets/img/Iconos/Whiterun.png", subtitulo: "Whiterun · Todo lo que puedas necesitar, y algo más." },
    "comerciantes-solitude.html": { categoria: "ropaFina", titulo: "Gremio de Comerciantes de Solitude", tipo: "Ropa fina", icono: "../assets/img/Iconos/Solitude.png", subtitulo: "Solitude · Ropa, calzado, joyas y accesorios de la más alta calidad imperial." },
    "corcel-encabritado.html": { categoria: "comida", titulo: "El Corcel Encabritado", tipo: "Comida y taberna", icono: "../assets/img/Iconos/Whiterun.png", subtitulo: "Whiterun · La mejor taberna para reponer provisiones." },
    "colegio-winterhold.html": { categoria: "magia", titulo: "Colegio de Winterhold", tipo: "Magia", icono: "../assets/img/Iconos/Winterhold.png", subtitulo: "Winterhold · El centro del conocimiento arcano en Skyrim." }
};

function escaparCatalogo(valor) {
    // Evita que nombres y descripciones inserten HTML cuando se generan tarjetas dinámicas.
    return String(valor).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function esProductoLegendario(producto, config) {
    // Solo la herrería tiene clasificación legendaria: Daédrico, Stalhrim y Nórdico.
    if (config.categoria !== "herreria") return false;
    const nombre = String(producto.name || producto.nombre || "")
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    return /daedric|stalhrim|nordic/.test(nombre);
}

function imagenCatalogo(ruta) {
    // Convierte las rutas del inventario, que parten desde la raíz, a rutas válidas desde /gremios.
    // Las sustituciones corrigen nombres de carpetas y archivos que no coinciden exactamente.
    return `../${ruta}`
        .replace("assets/img/Alquimia/Ingredients/", "assets/img/Alquimia/Ingredientes/")
    .replace("assets/img/Herreria/Armas/Arquería/", "assets/img/Herreria/Armas/Arqueria/")
    .replace("assets/img/Herreria/Armas/Flechas/", "assets/img/Herreria/Armas/Arqueria/Flechas/")
    .replace("assets/img/Herreria/Armadura/Pesada/Armadura_hombresra_hueso.png", "assets/img/Herreria/Armadura/Pesada/Armadura_hombreras_hueso.png")
    .replace("assets/img/Herreria/Armadura/Pesada/Yelmo_acero_cuerros.png", "assets/img/Herreria/Armadura/Pesada/Yelmo_acero_cuernos.png")
    .replace("assets/img/Herreria/Armadura/Pesada/Yelmo_nordicos_tallados.png", "assets/img/Herreria/Armadura/Pesada/Yelmo_nordico_tallado.png")
    .replace("assets/img/Herreria/Armadura/Pesada/Yelmo_pesado_quininoso.png", "assets/img/Herreria/Armadura/Pesada/Yelmo_pesado_quitinoso.png")
    .replace("assets/img/Alquimia/Ingredientes/Cola_espada_cyrodiplica.png", "assets/img/Alquimia/Ingredientes/Cola_espada_cyrodilica.png")
    .replace("assets/img/Alquimia/Ingredientes/Garra_oso.png", "assets/img/Alquimia/Ingredientes/Garras_oso.png")
    .replace("assets/img/Taberna/Comida/Vino_altopng", "assets/img/Taberna/Comida/Vino_alto.png")
    .replace("assets/img/Taberna/Comida/Manquilla.png", "assets/img/Taberna/Comida/Mantequilla.png")
    .replace("assets/img/Magia/Bastones/Baston_conjuración.png", "assets/img/Magia/Bastones/Baston_conjuracion.png")
    .replace("assets/img/Magia/Bastones/Baston_restauración.png", "assets/img/Magia/Bastones/Baston_restauracion.png")
    .replace("assets/img/Taberna/Comida/Bowl_1.png", "assets/img/Bienes_generales/Bowl_1.png")
    .replace("assets/img/Taberna/Comida/Caliz.png", "assets/img/Bienes_generales/Caliz.png")
    .replace("assets/img/Taberna/Comida/Caliz_1.png", "assets/img/Bienes_generales/Caliz_1.png")
    .replace("assets/img/Taberna/Comida/Caliz2.png", "assets/img/Bienes_generales/Caliz_2.png")
    .replace("assets/img/Taberna/Comida/Cuenco_madera.png", "assets/img/Bienes_generales/Cuenco_madera.png")
    .replace("assets/img/Taberna/Comida/Pichel.png", "assets/img/Bienes_generales/Pichel.png")
    .replace("assets/img/Taberna/Comida/Plato.png", "assets/img/Bienes_generales/Plato.png")
    .replace("assets/img/Taberna/Comida/Plato2.png", "assets/img/Bienes_generales/Plato_2.png")
    .replace("assets/img/Taberna/Comida/Plato_madera.png", "assets/img/Bienes_generales/Plato_madera.png")
    .replace("assets/img/Taberna/Comida/Taza.png", "assets/img/Bienes_generales/Taza.png")
    .replace("assets/img/Taberna/Comida/Tenedor.png", "assets/img/Bienes_generales/Tenedor.png");
}

function prepararContenedorCatalogo() {
    // Reutiliza #app o adapta el antiguo #lista para que todas las páginas compartan el mismo render.
    let app = document.getElementById("app");
    if (!app) {
        const lista = document.getElementById("lista");
        if (!lista) return null;
        lista.id = "app";
        app = lista;
    }
    app.className = "catalogo-app";
    return app;
}

function crearEstadisticasCatalogo(config, catalogo) {
    // Inserta la cantidad total de productos y el tipo de gremio bajo el subtítulo.
    if (document.getElementById("catalogo-stats")) return;
    const subtitulo = document.querySelector("body > .subtitulo");
    if (!subtitulo) return;
    const cantidad = catalogo.reduce((total, seccion) => total + seccion.items.length, 0);
    const estadisticas = document.createElement("div");
    estadisticas.id = "catalogo-stats";
    estadisticas.className = "catalogo-stats";
    estadisticas.innerHTML = `<span><strong>${cantidad}</strong> productos</span><span><strong>${escaparCatalogo(config.tipo)}</strong></span>`;
    subtitulo.after(estadisticas);
}

function crearControlesCatalogo(catalogo) {
    // Construye el buscador y los filtros por sección; Legendarias solo aparece en herrería.
    if (document.getElementById("catalogo-controls")) return;
    const subtitulo = document.querySelector("body > .subtitulo") || document.querySelector("body > header");
    const controles = document.createElement("div");
    controles.id = "catalogo-controls";
    controles.className = "catalogo-controls";
    const archivo = window.location.pathname.split("/").pop();
    const filtroLegendario = archivo === "adrianne-herreria.html"
        ? '<button class="catalogo-filter catalogo-filter-legendary" data-filter="Legendarias">Legendarias</button>'
        : "";
    controles.innerHTML = `<input id="catalogo-search" class="catalogo-search" placeholder="Buscar producto..." aria-label="Buscar producto">
        <button class="catalogo-filter active" data-filter="Todas">Todos</button>
        ${filtroLegendario}
        ${catalogo.map(seccion => `<button class="catalogo-filter" data-filter="${escaparCatalogo(seccion.titulo)}">${escaparCatalogo(seccion.titulo)}</button>`).join("")}`;
    subtitulo?.after(controles);
}

function crearModalCatalogo() {
    // Crea una sola vez el modal de detalle y registra sus eventos de cierre.
    if (document.getElementById("catalogo-modal")) return;
    document.body.insertAdjacentHTML("beforeend", `<div id="catalogo-modal" class="catalogo-modal" role="dialog" aria-modal="true" aria-label="Detalle del producto">
        <div class="catalogo-dialog"><div class="catalogo-dialog-img"><img id="catalogo-modal-img" alt=""></div><div class="catalogo-dialog-body"><button class="catalogo-close" type="button" aria-label="Cerrar">✕</button><p id="catalogo-modal-category" class="catalogo-sub"></p><h2 id="catalogo-modal-name"></h2><p id="catalogo-modal-description"></p><p id="catalogo-modal-stock"></p><div id="catalogo-modal-price" class="catalogo-bigprice"></div><div class="catalogo-modal-actions"><button id="catalogo-modal-cart" type="button">Añadir al carrito</button><a id="catalogo-modal-detail" class="catalogo-detail-link" href="../pages/producto-detalle.html">Ver detalle completo</a></div></div></div>
    </div>`);
    document.querySelector(".catalogo-close").addEventListener("click", cerrarModalCatalogo);
    document.getElementById("catalogo-modal").addEventListener("click", event => {
        if (event.target.id === "catalogo-modal") cerrarModalCatalogo();
    });
}

function cerrarModalCatalogo() {
    // Oculta el modal sin eliminarlo del documento.
    document.getElementById("catalogo-modal")?.classList.remove("show");
}

function mostrarDetalleCatalogo(producto, config) {
    // Carga en el modal la imagen, descripción, precio, stock y disponibilidad del producto elegido.
    document.getElementById("catalogo-modal-img").src = imagenCatalogo(producto.image);
    document.getElementById("catalogo-modal-img").alt = producto.name;
    document.getElementById("catalogo-modal-category").textContent = config.titulo;
    document.getElementById("catalogo-modal-name").textContent = producto.name;
    document.getElementById("catalogo-modal-name").classList.toggle("legendario", esProductoLegendario(producto, config));
    document.getElementById("catalogo-modal-description").textContent = producto.description || "Sin descripción disponible.";
    const stockLabel = document.getElementById("catalogo-modal-stock") || document.createElement("p");
    stockLabel.id = "catalogo-modal-stock";
    stockLabel.textContent = `Stock: ${Number(producto.stock ?? 0)}`;
    if (!stockLabel.parentElement) document.getElementById("catalogo-modal-description").after(stockLabel);
    document.getElementById("catalogo-modal-price").textContent = `${Number(producto.price).toLocaleString("es-CL")} 🪙`;
    document.getElementById("catalogo-modal-detail").href = `../pages/producto-detalle.html?id=${encodeURIComponent(producto.id)}`;
    const stock = Number(producto.stock ?? 0);
    document.getElementById("catalogo-modal-cart").disabled = stock <= 0;
    document.getElementById("catalogo-modal-cart").textContent = stock > 0 ? "Añadir al carrito" : "Sin stock";
    document.getElementById("catalogo-modal-cart").onclick = () => Cart.add(producto);
    document.getElementById("catalogo-modal").classList.add("show");
}

function renderizarCatalogo(config, catalogo, filtro = "Todas", busqueda = "") {
    // Filtra por sección, búsqueda o productos legendarios y genera las tarjetas visibles.
    const app = document.getElementById("app");
    const texto = busqueda.toLowerCase();
    const secciones = catalogo.map(seccion => {
        if (filtro !== "Todas" && filtro !== "Legendarias" && filtro !== seccion.titulo) return "";
        const productos = seccion.items.filter(producto =>
            (filtro !== "Legendarias" || esProductoLegendario(producto, config)) &&
            `${producto.name} ${producto.description}`.toLowerCase().includes(texto)
        );
        if (!productos.length) return "";
        return `<section class="catalogo-category"><div class="catalogo-cat-head"><h2>${escaparCatalogo(seccion.titulo)}</h2><span>${productos.length} productos</span></div><div class="catalogo-grid">${productos.map(producto => { const stock = Number(producto.stock ?? 0); const legendario = esProductoLegendario(producto, config); return `<article class="catalogo-card${stock <= 0 ? " sin-stock" : ""}${legendario ? " legendario" : ""}" data-product-id="${escaparCatalogo(producto.id)}">${legendario ? '<span class="catalogo-legendary-badge">LEGENDARIA</span>' : ""}<span class="catalogo-tag">${escaparCatalogo(seccion.titulo)}</span><div class="catalogo-imgbox"><img src="${imagenCatalogo(producto.image)}" alt="${escaparCatalogo(producto.name)}" loading="lazy"></div><div class="catalogo-info"><div class="catalogo-name">${escaparCatalogo(producto.name)}</div><p class="catalogo-desc">${escaparCatalogo(producto.description || "")}</p><p class="catalogo-stock">Stock: ${stock}</p><div class="catalogo-card-bottom"><span class="catalogo-price">${Number(producto.price).toLocaleString("es-CL")} 🪙</span><button type="button" class="catalogo-add" ${stock <= 0 ? "disabled" : ""}>${stock > 0 ? "Añadir" : "Sin stock"}</button></div></div></article>`; }).join("")}</div></section>`;
    }).join("");
    app.innerHTML = secciones || `<div class="catalogo-empty">No se encontraron productos.</div>`;
    // Cada tarjeta abre el detalle; el botón Añadir usa el carrito y no abre el modal.
    app.querySelectorAll(".catalogo-card").forEach(card => {
        const producto = catalogo.flatMap(seccion => seccion.items).find(item => item.id === card.dataset.productId);
        card.addEventListener("click", event => {
            if (event.target.closest(".catalogo-add")) {
                Cart.add(producto);
                return;
            }
            mostrarDetalleCatalogo(producto, config);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Punto de entrada: identifica el gremio actual, prepara su estructura y conecta sus controles.
    const archivo = window.location.pathname.split("/").pop();
    const config = configuracionGremios[archivo];
    if (!config || typeof inventario === "undefined") return;
    const app = prepararContenedorCatalogo();
    if (!app) return;
    const catalogo = inventario[config.categoria] || [];
    const titulo = document.querySelector("body > h1");
    const subtitulo = document.querySelector("body > .subtitulo");
    if (titulo) titulo.innerHTML = `<img class="gremio-title-icon" src="${config.icono}" alt="" style="width:34px;height:34px;object-fit:contain;vertical-align:middle;margin-right:10px;">${escaparCatalogo(config.titulo)}`;
    if (subtitulo) subtitulo.textContent = config.subtitulo;
    crearEstadisticasCatalogo(config, catalogo);
    crearControlesCatalogo(catalogo);
    crearModalCatalogo();
    let filtro = "Todas";
    let busqueda = "";
    const actualizar = () => renderizarCatalogo(config, catalogo, filtro, busqueda);
    document.querySelectorAll(".catalogo-filter").forEach(boton => boton.addEventListener("click", () => {
        filtro = boton.dataset.filter;
        document.querySelectorAll(".catalogo-filter").forEach(item => item.classList.toggle("active", item === boton));
        actualizar();
    }));
    document.getElementById("catalogo-search")?.addEventListener("input", event => {
        busqueda = event.target.value;
        actualizar();
    });
    actualizar();
});
