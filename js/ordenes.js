/* Renderiza la lista y el detalle de órdenes guardadas por el carrito. */
function escaparOrden(valor) {
    return String(valor)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function formatoFechaOrden(fecha) {
    return new Date(fecha).toLocaleString("es-CL");
}

function renderizarOrdenes() {
    const tbody = document.getElementById("adminOrderTable");
    if (!tbody || typeof obtenerOrdenes !== "function") return;
    const ordenes = [...obtenerOrdenes()].reverse();

    tbody.innerHTML = ordenes.length
        ? ordenes.map(orden => `
            <tr>
                <td>#${escaparOrden(orden.id)}</td>
                <td>${escaparOrden(orden.cliente)}</td>
                <td>${escaparOrden(formatoFechaOrden(orden.fecha))}</td>
                <td>${escaparOrden(orden.estado)}</td>
                <td><a href="orden-detalle.html?id=${encodeURIComponent(orden.id)}">Ver detalle</a></td>
            </tr>
        `).join("")
        : '<tr><td colspan="5">No hay órdenes registradas.</td></tr>';
}

function renderizarDetalleOrden() {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id || typeof obtenerOrdenes !== "function") return;
    const orden = obtenerOrdenes().find(item => item.id === id);
    if (!orden) return;

    document.getElementById("orderTitle").textContent = `Orden #${orden.id}`;
    document.getElementById("orderCustomer").textContent = `Cliente: ${orden.cliente}`;
    document.getElementById("orderStatus").textContent = `Estado: ${orden.estado}`;
    document.getElementById("orderTotal").textContent = `$${Number(orden.total).toLocaleString("es-CL")}`;
    document.getElementById("adminOrderDetailTable").innerHTML = orden.items.map(item => `
        <tr>
            <td>${escaparOrden(item.nombre)}</td>
            <td>${item.cantidad}</td>
            <td>$${Number(item.precio).toLocaleString("es-CL")}</td>
            <td>$${Number(item.total).toLocaleString("es-CL")}</td>
        </tr>
    `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarOrdenes();
    renderizarDetalleOrden();
});
