# Gremios y Mercaderes de Skyrim

Sitio web temático de Skyrim con información de gremios y mercaderes, y un carrito de compras funcional compartido entre páginas mediante `localStorage`.

## Estructura del proyecto
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
│       ├── receta.png              # Imagen de respaldo mientras
│       └── gremios/                     # Una carpeta por categoría, con TODO lo visual de esa tienda
│           ├── herreria/                #   portada.jpg + fotos de cada producto de esa categoría
│           ├── alquimia/
│           ├── general/
│           ├── ropa/
│           ├── comida/
│           └── magia/
│
└── js/
    ├── cart.js                          # Lógica del carrito, compartida entre todas las páginas
    ├── inventario.js                    # Catálogo y precios centralizados de todas las tiendas
    └── datos-gremios.js                 # Listado de gremios que se muestra en index.html
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
