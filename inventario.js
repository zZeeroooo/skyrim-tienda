// inventario.js - Catálogo y precios centralizados de todas las tiendas
// Cada HTML de gremio incluye este archivo y solo lee su sección
// (ej. inventario.ropa, inventario.magia). Así los precios se
// editan en un solo lugar y no quedan repetidos en cada página.

const inventario = {

  ropa: [
    {
      titulo: "Ropa y vestimenta",
      items: [
        { id: "sol-ropa-fina", name: "Ropa fina", price: 25 },
        { id: "sol-ropa-comun", name: "Ropa común", price: 10 },
        { id: "sol-tunica-cinturon", name: "Túnica con cinturón", price: 15 },
        { id: "sol-tunica-chef", name: "Túnica de chef", price: 12 },
        { id: "sol-gorro-chef", name: "Gorro de chef", price: 8 },
        { id: "sol-robes-negras", name: "Robes negras", price: 40 },
        { id: "sol-robes-azules", name: "Robes azules", price: 40 },
        { id: "sol-robes-extravagantes", name: "Robes extravagantes", price: 60 },
        { id: "sol-robes-monje", name: "Robes de monje", price: 30 },
        { id: "sol-robes-necromante", name: "Robes de necromante", price: 55 },
        { id: "sol-robes-harapientas", name: "Robes harapientas", price: 5 },
        { id: "sol-capucha-alikr", name: "Capucha Alik'r", price: 20 },
        { id: "sol-capucha-mendigo", name: "Capucha de mendigo", price: 3 },
        { id: "sol-gorro-fino", name: "Gorro fino", price: 18 },
        { id: "sol-sombrero-doliente", name: "Sombrero de doliente", price: 10 },
        { id: "sol-gorro-doliente", name: "Gorro de doliente", price: 8 },
        { id: "sol-capucha-roja", name: "Capucha roja", price: 15 },
        { id: "sol-capucha-pescador", name: "Capucha de pescador", price: 10 },
        { id: "sol-gorro-pescador", name: "Gorro de pescador", price: 8 },
        { id: "sol-vestimenta-contramaestre", name: "Vestimenta de contramaestre", price: 22 },
        { id: "sol-vestimenta-capitan", name: "Vestimenta de capitán", price: 28 },
        { id: "sol-vestimenta-limpieza", name: "Vestimenta de limpieza", price: 6 }
      ]
    },
    {
      titulo: "Calzado",
      items: [
        { id: "sol-botas-finas", name: "Botas finas", price: 20 },
        { id: "sol-botas", name: "Botas", price: 10 },
        { id: "sol-zapatos", name: "Zapatos", price: 8 },
        { id: "sol-botas-redguard", name: "Botas de Redguard", price: 18 },
        { id: "sol-botas-capitan", name: "Botas de capitán", price: 22 },
        { id: "sol-botas-pescador", name: "Botas de pescador", price: 10 }
      ]
    },
    {
      titulo: "Accesorios",
      items: [
        { id: "sol-guantes", name: "Guantes", price: 8 },
        { id: "sol-guantes-finos", name: "Guantes finos", price: 18 }
      ]
    },
    {
      titulo: "Joyas y aros",
      items: [
        { id: "sol-aro-oro-esmeralda", name: "Aro de oro y esmeralda", price: 150 },
        { id: "sol-aro-plata-zafiro", name: "Aro de plata y zafiro", price: 120 },
        { id: "sol-anillos", name: "Anillos (nivel variable)", price: 50 },
        { id: "sol-collares", name: "Collares (nivel variable)", price: 60 },
        { id: "sol-amuletos-divinos", name: "Amuletos de los Divinos", price: 100 },
        { id: "sol-joyas-encantadas", name: "Joyas encantadas (nivel variable)", price: 200 }
      ]
    },
    {
      titulo: "Varios",
      items: [
        { id: "sol-ropa-nino", name: "Ropa de niño", price: 8 },
        { id: "sol-ropa-nina", name: "Ropa de niña", price: 8 },
        { id: "sol-espada-madera", name: "Espada de madera", price: 5 },
        { id: "sol-muneca", name: "Muñeca", price: 6 }
      ]
    }
  ],

  magia: [
    {
      titulo: "Libros de hechizos (Spell Tomes)",
      items: [
        { id: "col-hechizo-destruccion", name: "Hechizos de Destrucción (nivel bajo-medio)", price: 80 },
        { id: "col-hechizo-conjura", name: "Hechizos de Conjura (nivel bajo-medio)", price: 80 },
        { id: "col-hechizo-ilusion", name: "Hechizos de Ilusión (nivel bajo-medio)", price: 80 },
        { id: "col-hechizo-alteracion", name: "Hechizos de Alteración (nivel bajo-medio)", price: 80 },
        { id: "col-hechizo-restauracion", name: "Hechizos de Restauración (nivel bajo-medio)", price: 80 }
      ]
    },
    {
      titulo: "Pergaminos mágicos",
      items: [
        { id: "col-pergamino-fuego", name: "Pergamino de fuego", price: 45 },
        { id: "col-pergamino-hielo", name: "Pergamino de hielo", price: 45 },
        { id: "col-pergamino-rayos", name: "Pergamino de rayos", price: 45 },
        { id: "col-pergamino-curacion", name: "Pergamino de curación", price: 40 },
        { id: "col-pergamino-invocacion", name: "Pergamino de invocación", price: 55 }
      ]
    },
    {
      titulo: "Pociones",
      items: [
        { id: "col-pocion-magicka", name: "Poción de restaurar magicka", price: 25 },
        { id: "col-pocion-salud", name: "Poción de restaurar salud", price: 25 },
        { id: "col-pocion-invisibilidad", name: "Poción de invisibilidad", price: 90 },
        { id: "col-pocion-resistencia", name: "Poción de resistencia mágica", price: 70 }
      ]
    },
    {
      titulo: "Ingredientes de alquimia",
      items: [
        { id: "col-sal-vacio", name: "Sal de vacío", price: 15 },
        { id: "col-polvo-brillante", name: "Polvo brillante", price: 12 },
        { id: "col-corazon-daedra", name: "Corazón de daedra", price: 100 },
        { id: "col-huevo-luna", name: "Huevo de luna", price: 20 },
        { id: "col-raiz-nirn", name: "Raíz de nirn", price: 18 },
        { id: "col-seta-imp", name: "Seta imp", price: 5 },
        { id: "col-campana-muerte", name: "Campana de la muerte", price: 8 },
        { id: "col-oreja-falmer", name: "Oreja de falmer", price: 10 }
      ]
    },
    {
      titulo: "Gemas y almas",
      items: [
        { id: "col-gema-vacia", name: "Gema vacía", price: 10 },
        { id: "col-gema-alma-menor", name: "Gema de alma menor", price: 20 },
        { id: "col-gema-alma-comun", name: "Gema de alma común", price: 40 },
        { id: "col-gema-alma-mayor", name: "Gema de alma mayor", price: 80 },
        { id: "col-gema-alma-grandiosa", name: "Gema de alma grandiosa", price: 120 }
      ]
    },
    {
      titulo: "Ropa de mago",
      items: [
        { id: "col-tunica-mago", name: "Túnica de mago", price: 60 },
        { id: "col-tunica-aprendiz", name: "Túnica de mago de aprendiz", price: 35 },
        { id: "col-capucha-mago", name: "Capucha de mago", price: 30 },
        { id: "col-botas-mago", name: "Botas de mago", price: 25 },
        { id: "col-guantes-mago", name: "Guantes de mago", price: 25 }
      ]
    },
    {
      titulo: "Varitas y bastones",
      items: [
        { id: "col-varita-fuego", name: "Varita de fuego", price: 70 },
        { id: "col-varita-hielo", name: "Varita de hielo", price: 70 },
        { id: "col-varita-rayos", name: "Varita de rayos", price: 70 },
        { id: "col-baston-invocacion", name: "Bastón de invocación", price: 150 },
        { id: "col-baston-hechizos", name: "Bastón de hechizos", price: 130 }
      ]
    },
    {
      titulo: "Varios",
      items: [
        { id: "col-tintero", name: "Tintero", price: 3 },
        { id: "col-pluma", name: "Pluma", price: 2 }
      ]
    }
  ]

  // A medida que Cris y Vale terminen sus tiendas, agregan aquí
  // inventario.herreria, inventario.alquimia, inventario.general
  // y inventario.comida con la misma estructura.

};
