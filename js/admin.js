/*
 * admin.js
 * Render y validaciones básicas de las vistas administrativas.
 */
document.addEventListener("DOMContentLoaded", () => {
    renderizarTablaProductos();
    renderizarTablaUsuarios();
    configurarFormularioProducto();
    configurarFiltrosProductos();
    configurarImagenesExistentes();
    prepararEdicionProducto();
});

const gremiosInventario = {
    herreria: "Herrería",
    alquimia: "Alquimia",
    bienesGenerales: "Bienes generales",
    ropaFina: "Ropa fina",
    comida: "Comida y taberna",
    magia: "Magia"
};

function obtenerProductosAdmin() {
    if (typeof inventario === "undefined") return [];
    return Object.entries(inventario).flatMap(([gremio, secciones]) =>
        secciones.flatMap(seccion => seccion.items.map(producto => ({
            ...producto,
            codigo: producto.codigo || producto.id,
            nombre: producto.nombre || producto.name,
            precio: producto.precio ?? producto.price,
            stock: producto.stock ?? 0,
            stockCritico: producto.stockCritico ?? 0,
            categoria: seccion.titulo,
            gremio
        })))
    );
}

function renderizarTablaProductos() {
    const tbody = document.getElementById("adminProductTable");
    if (!tbody) return;
    const esVendedor = typeof obtenerSesion === "function" && obtenerSesion()?.tipo === "Vendedor";
    const gremioFiltro = document.getElementById("productGuildFilter")?.value || "";
    const categoriaFiltro = document.getElementById("productCategoryFilter")?.value || "";
    const productos = obtenerProductosAdmin().filter(producto =>
        (!gremioFiltro || producto.gremio === gremioFiltro) &&
        (!categoriaFiltro || producto.categoria === categoriaFiltro)
    );

    tbody.innerHTML = productos.map(producto => `
        <tr>
            <td>${escapeAdmin(producto.codigo)}</td>
            <td>${escapeAdmin(producto.nombre)}</td>
            <td>$${Number(producto.precio).toLocaleString("es-CL")}</td>
            <td>${producto.stock}${Number(producto.stock) <= Number(producto.stockCritico) ? ' <span class="stock-alert">Stock crítico</span>' : ''}</td>
            <td>${escapeAdmin(gremiosInventario[producto.gremio])} · ${escapeAdmin(producto.categoria)}</td>
            <td><a href="${esVendedor
                ? `../pages/producto-detalle.html?id=${encodeURIComponent(producto.id)}`
                : `nuevo-producto.html?id=${encodeURIComponent(producto.id)}`}">${esVendedor ? "Ver detalle" : "Editar"}</a></td>
        </tr>
    `).join("");
}

function configurarFiltrosProductos() {
    const gremio = document.getElementById("productGuildFilter");
    const categoria = document.getElementById("productCategoryFilter");
    if (!gremio || !categoria) return;

    const actualizarCategorias = () => {
        const secciones = gremio.value && typeof inventario !== "undefined"
            ? inventario[gremio.value].map(item => item.titulo)
            : [...new Set(obtenerProductosAdmin().map(item => item.categoria))].sort();
        categoria.innerHTML = '<option value="">Todos los tipos</option>' +
            secciones.map(item => `<option value="${escapeAdmin(item)}">${escapeAdmin(item)}</option>`).join("");
        renderizarTablaProductos();
    };

    gremio.addEventListener("change", actualizarCategorias);
    categoria.addEventListener("change", renderizarTablaProductos);
    actualizarCategorias();
}

function renderizarTablaUsuarios() {
    const tbody = document.getElementById("adminUserTable");
    if (!tbody || typeof usuarios === "undefined") return;

    tbody.innerHTML = usuarios.map(usuario => `
        <tr>
            <td>${escapeAdmin(usuario.run)}</td>
            <td>${escapeAdmin(usuario.nombre)}</td>
            <td>${escapeAdmin(usuario.apellidos)}</td>
            <td>${escapeAdmin(usuario.correo)}</td>
            <td>${escapeAdmin(usuario.tipo)}</td>
            <td><a href="nuevo-usuario.html?run=${encodeURIComponent(usuario.run)}">Editar</a></td>
        </tr>
    `).join("");
}

function configurarFormularioProducto() {
    const form = document.getElementById("productForm");
    if (!form) return;
    const gremio = document.getElementById("productGuild");
    const categoria = document.getElementById("productCategory");

    gremio?.addEventListener("change", () => {
        const secciones = inventario[gremio.value] || [];
        categoria.disabled = !gremio.value;
        categoria.innerHTML = '<option value="">Selecciona un tipo</option>' +
            secciones.map(item => `<option value="${escapeAdmin(item.titulo)}">${escapeAdmin(item.titulo)}</option>`).join("");
    });

    form.addEventListener("submit", event => {
        event.preventDefault();
        let valido = true;

        const rules = [
            ["productCode", "productCodeError", v => v.trim().length >= 3, "El código es obligatorio y debe tener al menos 3 caracteres."],
            ["productName", "productNameError", v => v.trim() && v.length <= 100, "El nombre es obligatorio y no puede superar 100 caracteres."],
            ["productDescription", "productDescriptionError", v => v.length <= 500, "La descripción no puede superar 500 caracteres."],
            ["productPrice", "productPriceError", v => v !== "" && Number(v) >= 0, "El precio es obligatorio y debe ser igual o mayor a 0."],
            ["productStock", "productStockError", v => v !== "" && Number.isInteger(Number(v)) && Number(v) >= 0, "El stock debe ser un número entero igual o mayor a 0."],
            ["criticalStock", "criticalStockError", v => v === "" || (Number.isInteger(Number(v)) && Number(v) >= 0), "El stock crítico debe ser un entero igual o mayor a 0."],
            ["productGuild", "productGuildError", v => Boolean(v), "Selecciona un gremio."],
            ["productCategory", "productCategoryError", v => Boolean(v), "Selecciona un tipo de producto."]
        ];

        rules.forEach(([id, errorId, rule, message]) => {
            const input = document.getElementById(id);
            const error = document.getElementById(errorId);
            if (!rule(input.value)) {
                mostrarAdminError(input, error, message);
                valido = false;
            } else limpiarAdminError(input, error);
        });

        const stock = Number(document.getElementById("productStock").value);
        const critical = Number(document.getElementById("criticalStock").value);
        const success = document.getElementById("productSuccess");
        const codigo = document.getElementById("productCode").value.trim();
        const idEdicion = new URLSearchParams(window.location.search).get("id");
        if (obtenerProductosAdmin().some(producto => producto.codigo.toLowerCase() === codigo.toLowerCase() && producto.id !== idEdicion)) {
            mostrarAdminError(document.getElementById("productCode"), document.getElementById("productCodeError"), "El código ya está registrado.");
            valido = false;
        }

        if (valido) {
            const productoExistente = idEdicion && typeof obtenerProductoInventario === "function"
                ? obtenerProductoInventario(idEdicion)
                : null;
            const producto = {
                id: idEdicion || `${codigo.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
                codigo,
                nombre: document.getElementById("productName").value.trim(),
                descripcion: document.getElementById("productDescription").value.trim(),
                precio: Number(document.getElementById("productPrice").value),
                stock,
                stockCritico: Number.isNaN(critical) ? 0 : critical,
                categoria: categoria.value,
                gremio: gremio.value,
                name: document.getElementById("productName").value.trim(),
                description: document.getElementById("productDescription").value.trim(),
                price: Number(document.getElementById("productPrice").value),
                image: productoExistente?.image || "assets/img/Iconos/Whiterun.png"
            };
            const archivo = document.getElementById("productImage").files[0];
            const imagenExistente = document.getElementById("productExistingImage").value;
            const guardar = () => {
                if (idEdicion) {
                    actualizarProductoAdmin(producto);
                } else {
                    guardarProductoAdmin(producto);
                }
                success.textContent = stock <= producto.stockCritico
                    ? `${idEdicion ? "Producto actualizado" : "Producto guardado"}. Atención: el stock está en nivel crítico.`
                    : `Producto ${idEdicion ? "actualizado" : "guardado"} correctamente.`;
                form.reset();
                categoria.disabled = true;
                setTimeout(() => { window.location.href = "productos.html"; }, 500);
            };
            if (archivo) {
                const lector = new FileReader();
                lector.onload = () => { producto.image = lector.result; guardar(); };
                lector.readAsDataURL(archivo);
            } else {
                producto.image = imagenExistente || producto.image;
                guardar();
            }
        } else success.textContent = "";
    });
}

function prepararEdicionProducto() {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id || typeof obtenerProductoInventario !== "function") return;
    const producto = obtenerProductoInventario(id);
    if (!producto) return;

    const ubicacion = Object.entries(inventario).find(([, secciones]) =>
        secciones.some(seccion => seccion.items.some(item => item.id === id))
    );
    const gremioId = producto.gremio || ubicacion?.[0] || "";
    const seccion = ubicacion?.[1].find(item => item.items.some(item => item.id === id));
    const categoriaNombre = producto.categoria || seccion?.titulo || "";

    document.querySelector(".form-card h1").textContent = "Editar producto";
    document.querySelector(".form-intro").textContent = `Editando el producto ${producto.codigo || producto.id}.`;
    document.querySelector("#productForm button[type='submit']").textContent = "Actualizar producto";
    document.getElementById("productCode").value = producto.codigo || producto.id;
    document.getElementById("productName").value = producto.nombre || producto.name || "";
    document.getElementById("productDescription").value = producto.descripcion || producto.description || "";
    document.getElementById("productPrice").value = producto.precio ?? producto.price ?? 0;
    document.getElementById("productStock").value = producto.stock ?? 0;
    document.getElementById("criticalStock").value = producto.stockCritico ?? 0;
    document.getElementById("productGuild").value = gremioId;
    document.getElementById("productGuild").dispatchEvent(new Event("change"));
    document.getElementById("productCategory").value = categoriaNombre;
    document.getElementById("productExistingImage").value = producto.image || "";
}

function configurarImagenesExistentes() {
    const selector = document.getElementById("productExistingImage");
    if (!selector || typeof inventario === "undefined") return;
    const imagenes = new Map();
    Object.values(inventario).flatMap(secciones => secciones.flatMap(seccion => seccion.items))
        .forEach(producto => {
            if (producto.image && !imagenes.has(producto.image)) imagenes.set(producto.image, producto.name);
        });
    selector.innerHTML += [...imagenes.entries()]
        .sort((a, b) => a[1].localeCompare(b[1]))
        .map(([ruta, nombre]) => `<option value="${escapeAdmin(ruta)}">${escapeAdmin(nombre)}</option>`)
        .join("");
}

function mostrarAdminError(input, error, message) {
    input.classList.add("input-error");
    error.textContent = message;
}

function limpiarAdminError(input, error) {
    input.classList.remove("input-error");
    error.textContent = "";
}

function escapeAdmin(value) {
    return String(value)
        .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;").replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
