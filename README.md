# Gremios y Mercaderes de Skyrim

Sitio web temático de Skyrim con información de gremios y mercaderes, y un carrito de compras funcional compartido entre páginas mediante `localStorage`.

## Estructura del proyecto

```
.
├── index.html                     # Página principal (índice de gremios)
├── styles.css                     # Todos los estilos del sitio
├── cart.js                        # Lógica del carrito, compartida entre todos los gremios
├── adrianne-herreria.html         # (por crear) Herrería
├── arcadias-cauldron.html         # (por crear) Alquimia
├── belethor.html                  # (por crear) Bienes Generales
├── comerciantes-solitude.html     # (por crear) Ropa Fina
├── corcel-encabritado.html        # (por crear) Comida y Taberna
└── colegio-winterhold.html        # (por crear) Magia
```

Son 6 tiendas en total, una por categoría (sin duplicados).

Cada nombre de archivo debe coincidir con el campo `pagina` del array `datos` en `index.html`, ya que ahí es donde apunta el botón "Ingresar tienda" de cada gremio.

## Cómo crear la página de un gremio

1. Copia `index.html` como base y renómbralo según corresponda (ej. `companeros.html`).
2. Mantén `<link rel="stylesheet" href="styles.css">` en el `<head>`.
3. Mantén `<script src="cart.js"></script>` antes de tu propio script.
4. Agrega el catálogo de productos de ese gremio y, en cada botón "Añadir", llama `Cart.add({id, name, price})` con un `id` único.

Mientras todas las páginas se sirvan desde el mismo dominio/carpeta, el carrito (clave `skyrim_cart` en `localStorage`) se mantiene al navegar entre ellas.

## Ver el sitio localmente

Basta con abrir `index.html` en el navegador. Para evitar problemas de rutas relativas o `localStorage` entre archivos, se recomienda levantar un servidor simple:

```bash
python3 -m http.server 8000
```

Luego visita `http://localhost:8000`.

## Publicar en GitHub Pages

1. Sube el repositorio con `index.html` en la raíz.
2. Ve a Settings → Pages, selecciona la rama `main` y la carpeta raíz (`/`).
3. En unos minutos el sitio estará disponible en `tu-usuario.github.io/nombre-del-repo`.

## Aviso

Proyecto ficticio con fines educativos. Sin afiliación con Bethesda Softworks.
