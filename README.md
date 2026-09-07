# Gremios y Mercaderes de Skyrim

Sitio web temático de Skyrim con información de gremios y mercaderes, sistema de registro/inicio de sesión, panel de administración y un carrito de compras funcional compartido entre páginas mediante `localStorage`.

> Proyecto ficticio con fines educativos. Sin afiliación con Bethesda Softworks.

## Estructura del proyecto

```
.
├── index.html                          # Página principal (índice de gremios)
├── login.html                          # Inicio de sesión (nombre + raza)
├── registro.html                       # Registro de nuevos usuarios
├── README.md
│
├── admin/                              # Panel de administración del sitio
│
├── gremios/                            # Una página por tienda/gremio
│   ├── adrianne-herreria.html          # Herrería
│   ├── arcadias-cauldron.html          # Alquimia
│   ├── belethor.html                   # Bienes Generales
│   ├── comerciantes-solitude.html      # Ropa Fina
│   ├── corcel-encabritado.html         # Comida y Taberna
│   └── colegio-winterhold.html         # Magia
│
├── assets/
│   ├── css/
│   │   └── styles.css                  # Todos los estilos del sitio
│   └── img/
│       ├── alquimia/                   # Fotos de cada producto de esa categoría
│       ├── bienes_generales/
│       ├── herreria/
│       ├── iconos/
│       ├── magia/
│       ├── ropa_fina/
│       └── taberna/
│
├── js/
│   ├── auth.js                         # Lógica de autenticación (login/registro)
│   ├── cart.js                         # Lógica del carrito, compartida entre todas las páginas
│   └── inventario.js                   # Catálogo y precios centralizados de todas las tiendas
│
└── pages/
    ├── blogs.html                      # Página de blogs
    ├── contacto.html                   # Página de contacto
    ├── nosotros.html                   # Página sobre nosotros
    └── producto-detalle.html           # Detalle de un producto
```

## Tecnologías

- HTML5
- CSS3
- JavaScript (vanilla)

## Funcionalidades

- Navegación entre páginas.
- Estructura HTML semántica.
- CSS externo.
- Formularios con atributos HTML apropiados y validación mediante JavaScript.
- Registro e inicio de sesión de usuarios.
- Panel de administración.
- Catálogo de productos por gremio/tienda.
- Carrito de compras persistente utilizando `localStorage`.
- Botones para agregar, eliminar y modificar cantidades de productos.
- Diseño responsive.
- Footer.

## Cómo ejecutar el proyecto

Al ser un sitio estático (HTML/CSS/JS sin backend ni build), basta con abrir `index.html` en el navegador, o servirlo con un servidor local:

```bash
# Con Python
python -m http.server 8000

# Con la extensión Live Server de VS Code
# clic derecho sobre index.html > "Open with Live Server"
```

Luego visita `http://localhost:8000`.

## Aviso

Proyecto ficticio con fines educativos. Sin afiliación con Bethesda Softworks.
