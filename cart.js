// cart.js - Lógica del carrito de Gremios y Mercaderes de Skyrim
// Usa localStorage para que el carrito persista entre páginas y recargas.
// Copia este mismo archivo en la carpeta de cada gremio para compartir el carrito.

const Cart = {
    key: 'skyrim_cart',

    // Lee el carrito guardado (o un arreglo vacío si no hay nada aún)
    get() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    },

    // Guarda el carrito y refresca la burbuja con el contador
    save(items) {
        localStorage.setItem(this.key, JSON.stringify(items));
        this.updateBadge();
    },

    // Agrega un producto. Si ya existe, solo suma 1 a la cantidad.
    add(product) {
        const items = this.get();
        const existente = items.find(i => i.id === product.id);
        if (existente) {
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

// Abre/cierra el panel lateral del carrito
function toggleCart() {
    document.getElementById('cart-drawer').classList.toggle('open');
    document.getElementById('cart-overlay').classList.toggle('open');
    Cart.render();
}

// Muy simple: vacía el carrito y avisa. Aquí después podrías conectar
// un formulario de pago real o enviar el pedido a un servidor.
function checkout() {
    if (Cart.get().length === 0) {
        alert('Tu bolsa está vacía, viajero.');
        return;
    }
    alert('¡Trato cerrado! Total: ' + Cart.formatGold(Cart.total()));
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
