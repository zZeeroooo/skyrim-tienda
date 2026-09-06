/*
 * tienda.js
 * Renderiza el arreglo de productos mediante JavaScript.
 */
document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos(document.getElementById("productList"));
    renderizarDestacados(document.getElementById("featuredProducts"));
    renderizarDetalle();
    actualizarAnio();
    configurarMenuMovil();
});

function obtenerProductosTienda() {
    if (typeof inventario === "undefined") return [];
    return Object.entries(inventario).flatMap(([gremio, secciones]) =>
        secciones.flatMap(seccion => seccion.items.map(producto => ({
            ...producto,
            gremio,
            categoria: producto.categoria || seccion.titulo,
            nombre: producto.nombre || producto.name,
            descripcion: producto.descripcion || producto.description,
            precio: producto.precio ?? producto.price
        })))
    );
}

function renderizarProductos(contenedor) {
    if (!contenedor) return;
    contenedor.innerHTML = obtenerProductosTienda().map(crearTarjetaProducto).join("");
}

function renderizarDestacados(contenedor) {
    if (!contenedor) return;
    contenedor.innerHTML = obtenerProductosTienda().slice(0, 3).map(crearTarjetaProducto).join("");
}

function buscarProducto(id) {
    return obtenerProductosTienda().find(producto => producto.id === id);
}

function crearTarjetaProducto(producto) {
    const stock = Number(producto.stock ?? 0);
    const imagenRuta = producto.imagen || producto.image;
    const imagen = imagenRuta
        ? `<img src="${imagenRuta.startsWith("assets/") ? imagenRuta : `../${imagenRuta}`}" alt="${escapeHTML(producto.nombre)}">`
        : `<div class="image-placeholder">Imagen del producto</div>`;

    return `
        <article class="product-card">
            ${imagen}
            <div class="product-content">
                <p class="eyebrow">${escapeHTML(producto.categoria)}</p>
                <h3>${escapeHTML(producto.nombre)}</h3>
                <p>${escapeHTML(producto.descripcion)}</p>
                <p class="price">$${Number(producto.precio).toLocaleString("es-CL")}</p>
                <div class="card-actions">
                    <a class="button secondary" href="producto-detalle.html?id=${encodeURIComponent(producto.id)}">Ver detalle</a>
                    <button class="button add-to-cart"
                        type="button"
                        ${stock <= 0 ? "disabled" : ""}
                        data-id="${escapeHTML(producto.id)}"
                        data-name="${escapeHTML(producto.nombre)}"
                        data-price="${Number(producto.precio)}">${stock > 0 ? "Añadir" : "Sin stock"}</button>
                </div>
            </div>
        </article>
    `;
}

function renderizarDetalle() {
    const title = document.getElementById("detailTitle");
    if (!title) return;

    const id = new URLSearchParams(window.location.search).get("id");
    const producto = buscarProducto(id) || obtenerProductosTienda()[0];
    if (!producto) return;

    document.getElementById("detailTitle").textContent = producto.nombre;
    document.getElementById("detailCategory").textContent = producto.categoria;
    document.getElementById("detailName").textContent = producto.nombre;
    document.getElementById("detailDescription").textContent = producto.descripcion;
    const stock = Number(producto.stock ?? 0);
    const stockElement = document.getElementById("detailStock");
    if (stockElement) stockElement.textContent = `Stock: ${stock}`;
    document.getElementById("detailPrice").textContent =
        `$${Number(producto.precio).toLocaleString("es-CL")}`;

    const image = document.getElementById("detailImage");
    const imagenRuta = producto.imagen || producto.image;
    image.innerHTML = imagenRuta
        ? `<img src="${imagenRuta.startsWith("assets/") ? `../${imagenRuta}` : imagenRuta}" alt="${escapeHTML(producto.nombre)}">`
        : "Imagen del producto";

    const addButton = document.getElementById("detailAddButton");
    addButton.dataset.id = producto.id;
    addButton.dataset.name = producto.nombre;
    addButton.dataset.price = producto.precio;
    addButton.dataset.stock = producto.stock ?? 0;
    addButton.disabled = stock <= 0;
    addButton.textContent = stock > 0 ? "Agregar al carrito" : "Sin stock";
    addButton.classList.add("add-to-cart");
}

function configurarMenuMovil() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
        const abierto = links.classList.toggle("show");
        toggle.setAttribute("aria-expanded", String(abierto));
    });
}

function actualizarAnio() {
    document.querySelectorAll("#currentYear").forEach(el => {
        el.textContent = new Date().getFullYear();
    });
}

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
