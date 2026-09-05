# Gremios y Mercaderes de Skyrim

Sitio web temático de Skyrim con información de gremios y mercaderes, y un carrito de compras funcional compartido entre páginas mediante `localStorage`.

## Estructura del proyecto [ACTUALIZAR]
```
.
├── index.html                          # Página principal (índice de gremios)
├── login.html                          # Inicio de sesión ficticio (nombre + raza)
├── README.md
│
├── gremios/                             # Una página por tienda/gremio
│   ├── adrianne-herreria.html           # Herrería
│   ├── arcadias-cauldron.html           # Alquimia
│   ├── belethor.html                    # Bienes Generales
│   ├── comerciantes-solitude.html       # Ropa Fina
│   ├── corcel-encabritado.html          # Comida y Taberna
│   └── colegio-winterhold.html          # Magia
│
├── assets/
│   ├── css/
│   │   └── styles.css                   # Todos los estilos del sitio
│   └── img/
│       ├── alquimia/                # Fotos de cada producto de esa categoría
│       ├── bienes_generales/
│       ├── herreria/
│       ├── iconos/
│       ├── magia/
│       ├── ropa_fina/
│       └── taberna/
│
├── js/
│   ├── auth.js                          # Construyendo ?
│   ├── cart.js                          # Lógica del carrito, compartida entre todas las páginas
│   └── inventario.js                    # Catálogo y precios centralizados de todas las tiendas
│   │
└── pages/
    ├── blogs.html                    # Construyendo... Página de blogs
    ├── contacto.html                 # Página de contacto
    ├── nosotros.html                 # Página sobre nosotros
    └── producto-detalle.html         # Construyendo... Página para ver los detalles de un producto
```

## Tecnologías

- HTML5
- CSS3
- JavaScript

## Funcionalidades incluidas (REVISAR)

- Navegación entre páginas.
- Estructura HTML semántica.
- CSS externo.
- Formularios con atributos HTML apropiados.
- Base para validación mediante JavaScript.
- Catálogo de productos.
- Carrito utilizando `localStorage`.
- Botones para agregar, eliminar y modificar cantidades.
- Espacio preparado para imágenes.
- Espacio preparado para video.
- Footer.
- Diseño responsive.
- Registro(?)

## Aviso

Proyecto ficticio con fines educativos. Sin afiliación con Bethesda Softworks.
