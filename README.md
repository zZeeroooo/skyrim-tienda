# Gremios y Mercaderes de Skyrim

Sitio web temático de Skyrim con información de gremios y mercaderes, y un carrito de compras funcional compartido entre páginas mediante `localStorage`.

## Estructura del proyecto

```
.
├── index.html                     # Página principal (gremios-mercaderes-skyrim.html)
├── cart.js                        # Lógica del carrito, compartida entre todos los gremios
└── gremios/                       # (opcional) un HTML por cada gremio, cada uno temátizado
    ├── ladrones.html
    ├── companeros.html
    └── ...
```

## Cómo agregar un nuevo gremio

1. Copia `index.html` como base para el nuevo gremio.
2. Incluye `<script src="cart.js"></script>` (ajusta la ruta relativa si el archivo está en otra carpeta).
3. Cambia el array `datos` con la información y productos de ese gremio.
4. En cada botón "Añadir", llama `Cart.add({id, name, price})` con un `id` único.

Mientras todas las páginas se sirvan desde el mismo dominio/carpeta, el carrito (clave `skyrim_cart` en `localStorage`) se mantiene al navegar entre ellas.

## Ver el sitio localmente

Basta con abrir `index.html` en el navegador. Para evitar problemas de rutas relativas o `localStorage` entre archivos, se recomienda levantar un servidor simple:

```bash
python3 -m http.server 8000
```

Luego visita `http://localhost:8000`.

## Aviso

Proyecto ficticio con fines educativos. Sin afiliación con Bethesda Softworks.
