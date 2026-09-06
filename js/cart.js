// cart.js - Lógica del carrito de Gremios y Mercaderes de Skyrim
// Usa localStorage para que el carrito persista entre páginas y recargas.
// Copia este mismo archivo en la carpeta de cada gremio para compartir el carrito.

const Cart = {
    key: 'skyrim_cart',

    // Lee el carrito guardado (o un arreglo vacío si no hay nada aún)
    get() {
        const items = JSON.parse(localStorage.getItem(this.key)) || [];
        return items
            .filter(item => Number(item.stock ?? 0) > 0)
            .map(item => ({ ...item, qty: Math.min(item.qty, Number(item.stock)) }))
            .filter(item => item.qty > 0);
    },

    // Guarda el carrito y refresca la burbuja con el contador
    save(items) {
        localStorage.setItem(this.key, JSON.stringify(items));
        this.updateBadge();
    },

    // Agrega un producto. Si ya existe, solo suma 1 a la cantidad.
    add(product) {
        const stock = Number(product.stock ?? 0);
        if (stock <= 0) {
            alert('Este producto no tiene stock disponible.');
            return;
        }
        const items = this.get();
        const existente = items.find(i => i.id === product.id);
        if (existente) {
            if (existente.qty >= stock) {
                alert('No puedes agregar más unidades que el stock disponible.');
                return;
            }
            existente.qty += 1;
        } else {
            items.push({ ...product, qty: 1 });
        }
        this.save(items);
        this.render();
        this.openDrawer();
    },

    // Elimina un producto por id
    remove(id) {
        const items = this.get().filter(i => i.id !== id);
        this.save(items);
        this.render();
    },

    // Suma o resta cantidad. Si llega a 0, se elimina.
    changeQty(id, delta) {
        const items = this.get();
        const item = items.find(i => i.id === id);
        if (!item) return;
        if (delta > 0 && item.qty >= Number(item.stock ?? 0)) return;
        item.qty += delta;
        if (item.qty <= 0) {
            return this.remove(id);
        }
        this.save(items);
        this.render();
    },

    // Suma total en monedas de oro
    total() {
        return this.get().reduce((sum, i) => sum + i.price * i.qty, 0);
    },

    // Cantidad total de unidades (para la burbuja del ícono)
    count() {
        return this.get().reduce((sum, i) => sum + i.qty, 0);
    },

    // Actualiza el número que aparece sobre el ícono del carrito
    updateBadge() {
        const badge = document.getElementById('cart-count');
        if (badge) badge.textContent = this.count();
    },

    // Formatea números como monedas de oro: 150 -> 150 🪙
    formatGold(num) {
        return num.toLocaleString('es-CL') + ' 🪙';
    },

    // Dibuja la lista de productos. Busca dos posibles lugares:
    // #cart-items (el panel deslizante) y #cart-items-full (una página carrito.html).
    // Si la página solo tiene uno de los dos, simplemente ignora el otro.
    render() {
        const items = this.get();
        let html;

        if (items.length === 0) {
            html = '<p class="cart-empty">Tu bolsa está vacía, viajero.</p>';
        } else {
            html = items.map(i => `
                <div class="cart-item">
                    <span class="cart-item-name">${i.name}</span>
                    <div class="cart-item-controls">
                        <button onclick="Cart.changeQty('${i.id}', -1)" aria-label="Restar">-</button>
                        <span>${i.qty}</span>
                        <button onclick="Cart.changeQty('${i.id}', 1)" aria-label="Sumar">+</button>
                    </div>
                    <span class="cart-item-price">${this.formatGold(i.price * i.qty)}</span>
                    <button class="cart-item-remove" onclick="Cart.remove('${i.id}')" aria-label="Eliminar">×</button>
                </div>
            `).join('');
        }

        const drawerContainer = document.getElementById('cart-items');
        if (drawerContainer) drawerContainer.innerHTML = html;

        const fullContainer = document.getElementById('cart-items-full');
        if (fullContainer) fullContainer.innerHTML = html;

        const totalText = this.formatGold(this.total());
        const totalEl = document.getElementById('cart-total');
        if (totalEl) totalEl.textContent = totalText;

        const totalFullEl = document.getElementById('cart-total-full');
        if (totalFullEl) totalFullEl.textContent = totalText;

        this.updateBadge();
    },

    openDrawer() {
        const drawer = document.getElementById('cart-drawer');
        const overlay = document.getElementById('cart-overlay');
        if (drawer) drawer.classList.add('open');
        if (overlay) overlay.classList.add('open');
    }
};

const CLAVE_ORDENES = "skyrimOrdenes";

function obtenerOrdenes() {
    try {
        const ordenes = JSON.parse(localStorage.getItem(CLAVE_ORDENES) || "[]");
        return Array.isArray(ordenes) ? ordenes : [];
    } catch (error) {
        return [];
    }
}

function registrarOrden(items, total) {
    const sesion = typeof obtenerSesion === "function" ? obtenerSesion() : null;
    const ordenes = obtenerOrdenes();
    const numero = `SK-${String(Date.now()).slice(-8)}`;
    const orden = {
        id: numero,
        cliente: sesion?.nombre || "Viajero",
        correo: sesion?.correo || "",
        fecha: new Date().toISOString(),
        estado: "Preparando",
        total,
        items: items.map(item => ({
            id: item.id,
            nombre: item.name,
            cantidad: item.qty,
            precio: item.price,
            total: item.price * item.qty
        }))
    };
    ordenes.push(orden);
    localStorage.setItem(CLAVE_ORDENES, JSON.stringify(ordenes));
    return orden;
}

// Abre/cierra el panel lateral del carrito
function toggleCart() {
    document.getElementById('cart-drawer').classList.toggle('open');
    document.getElementById('cart-overlay').classList.toggle('open');
    Cart.render();
}

// Muy simple: vacía el carrito y avisa. Aquí después podrías conectar
// un formulario de pago real o enviar el pedido a un servidor.
function checkout() {
    const items = Cart.get();
    if (items.length === 0) {
        alert('Tu bolsa está vacía, viajero.');
        return;
    }

    const stockDisponible = items.every(item => {
        const producto = typeof obtenerProductoInventario === 'function'
            ? obtenerProductoInventario(item.id)
            : item;
        return producto && Number(producto.stock ?? 0) >= item.qty;
    });
    if (!stockDisponible) {
        alert('El stock de uno de los productos cambió. Revisa tu bolsa.');
        Cart.render();
        return;
    }

    items.forEach(item => actualizarStockProducto(item.id, item.qty));
    const orden = registrarOrden(items, Cart.total());
    alert(`¡Trato cerrado! Orden ${orden.id}. Total: ${Cart.formatGold(orden.total)}`);
    Cart.save([]);
    Cart.render();
    toggleCart();
}

// Vacía el carrito por completo (con confirmación, para evitar clics accidentales)
function clearCart() {
    if (confirm('¿Vaciar toda la bolsa?')) {
        Cart.save([]);
        Cart.render();
    }
}

// Al cargar cualquier página, dibuja el carrito (panel y/o página completa,
// lo que exista) y actualiza la burbuja del contador
document.addEventListener('DOMContentLoaded', () => Cart.render());