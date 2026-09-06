/*
 * auth.js
 * Gestiona la sesión del usuario y la visibilidad de las vistas por rol.
 */
const CLAVE_SESION = "skyrimSesion";
const RUTAS_PUBLICAS = ["index.html", "", "login.html", "registro.html"];

function obtenerSesion() {
    try {
        return JSON.parse(sessionStorage.getItem(CLAVE_SESION)) || null;
    } catch (error) {
        return null;
    }
}

function guardarSesion(usuario) {
    sessionStorage.setItem(CLAVE_SESION, JSON.stringify({
        nombre: usuario.nombre,
        correo: usuario.correo,
        tipo: usuario.tipo
    }));
}

function cerrarSesion() {
    sessionStorage.removeItem(CLAVE_SESION);
    window.location.href = obtenerRuta("index.html");
}

function obtenerRuta(ruta) {
    return window.location.pathname.includes("/admin/") || window.location.pathname.includes("/gremios/") || window.location.pathname.includes("/pages/")
        ? `../${ruta}`
        : ruta;
}

function actualizarEnlaceAdmin(sesion) {
    const enlaceSesion = document.querySelector("[data-auth-link]");
    if (!enlaceSesion || !["Administrador", "Vendedor"].includes(sesion?.tipo)) return;

    const contenedor = document.createElement("li");
    contenedor.className = "nav-item";
    const esVendedor = sesion.tipo === "Vendedor";
    const destino = esVendedor ? "admin/productos.html" : "admin/index.html";
    const texto = esVendedor ? "Vista vendedor" : "Vista admin";
    contenedor.innerHTML = `<a class="nav-link" href="${obtenerRuta(destino)}">${texto}</a>`;
    enlaceSesion.closest("li")?.after(contenedor);
}

function actualizarEnlacesSesion() {
    const sesion = obtenerSesion();
    actualizarEnlaceAdmin(sesion);
    document.querySelectorAll("[data-auth-link]").forEach(enlace => {
        if (!sesion) {
            enlace.textContent = "Iniciar sesión";
            enlace.href = obtenerRuta("login.html");
            enlace.onclick = null;
            return;
        }

        enlace.textContent = sesion.tipo;
        enlace.href = "#";
        enlace.title = "Cerrar sesión";
        enlace.onclick = event => {
            event.preventDefault();
            cerrarSesion();
        };
    });
}

function aplicarPermisos() {
    const ruta = window.location.pathname.split("/").pop();
    const sesion = obtenerSesion();
    const estaEnAdmin = window.location.pathname.includes("/admin/");

    if (!estaEnAdmin) return;

    if (!sesion || sesion.tipo === "Cliente") {
        window.location.href = obtenerRuta("index.html");
        return;
    }

    if (sesion.tipo === "Vendedor" && !["productos.html", "ordenes.html", "orden-detalle.html"].includes(ruta)) {
        window.location.href = "productos.html";
        return;
    }

    if (sesion.tipo === "Vendedor") {
        document.querySelectorAll(".admin-sidebar a").forEach(enlace => {
            const href = enlace.getAttribute("href") || "";
            if (!href.includes("productos.html") && !href.includes("ordenes.html")) enlace.remove();
        });
        document.querySelectorAll(".admin-header a.brand").forEach(enlace => enlace.remove());
        document.querySelectorAll("a[href*='nuevo-producto'], a[href*='nuevo-usuario']").forEach(enlace => enlace.remove());
        document.querySelectorAll(".admin-main a[href*='nuevo-producto'], .admin-main a[href*='nuevo-usuario']").forEach(enlace => enlace.remove());
    }
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarEnlacesSesion();
    aplicarPermisos();
});
