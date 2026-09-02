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
  ],

  herreria: [
    {
      titulo: "Armas",
      items: [
        { id: "her-arma-hierro-acero", name: "Hierro / Acero", price: 50 },
        { id: "her-arma-orco", name: "Orco", price: 100 },
        { id: "her-arma-enano", name: "Enano", price: 150 },
        { id: "her-arma-elfico", name: "Élfico", price: 200 },
        { id: "her-arma-cristal", name: "Cristal", price: 350 },
        { id: "her-arma-ebano", name: "Ébano", price: 500 }
      ]
    },
    {
      titulo: "Armaduras Ligeras",
      items: [
        { id: "her-lig-piel-cuero", name: "Piel / Cuero", price: 15 },
        { id: "her-lig-imperial", name: "Imperial ligera", price: 60 },
        { id: "her-lig-cristal", name: "Cristal", price: 300 },
        { id: "her-lig-escamas-dragon", name: "Escamas de dragón", price: 450 },
        { id: "her-lig-hermandad-oscura", name: "Hermandad oscura", price: 80 },
        { id: "her-lig-nightingale", name: "Nightingale", price: 350 },
        { id: "her-lig-hermandad-ladrones", name: "Hermandad de Ladrones", price: 40 },
        { id: "her-lig-linwe", name: "Linwe", price: 60 },
        { id: "her-lig-gremio-ladrones", name: "Gremio de Ladrones", price: 60 },
        { id: "her-lig-antiguos-dioses", name: "Antiguos Dioses", price: 90 },
        { id: "her-lig-penitus-oculatus", name: "Guardia Penitus Oculatus", price: 70 },
        { id: "her-lig-capas-tormenta", name: "Capas de la tormenta", price: 55 },
        { id: "her-lig-renegados", name: "Renegados", price: 45 }
      ]
    },
    {
      titulo: "Armaduras Pesadas",
      items: [
        { id: "her-pes-hierro-acero", name: "Hierro / Acero", price: 60 },
        { id: "her-pes-imperial", name: "Imperial", price: 90 },
        { id: "her-pes-nordica-antigua", name: "Nórdica Antigua", price: 120 },
        { id: "her-pes-hueso-dragon", name: "Hueso de dragón", price: 480 },
        { id: "her-pes-ebano", name: "Ébano", price: 520 },
        { id: "her-pes-daedrica", name: "Draédrica", price: 600 },
        { id: "her-pes-blades", name: "Blades", price: 150 },
        { id: "her-pes-orco", name: "Orco", price: 130 },
        { id: "her-pes-enano", name: "Enano", price: 170 }
      ]
    },
    {
      titulo: "Flechas",
      items: [
        { id: "her-flecha-falmer", name: "Falmer", price: 1 },
        { id: "her-flecha-renegados", name: "Renegados", price: 1 },
        { id: "her-flecha-hierro", name: "Hierro", price: 1 },
        { id: "her-flecha-nordica-antigua", name: "Nórdica Antigua", price: 2 },
        { id: "her-flecha-acero", name: "Acero", price: 2 },
        { id: "her-flecha-enana", name: "Enana", price: 3 },
        { id: "her-flecha-orca", name: "Orca", price: 4 },
        { id: "her-flecha-elfica", name: "Élfica", price: 5 },
        { id: "her-flecha-cristal", name: "Cristal", price: 8 },
        { id: "her-flecha-ebano", name: "Ébano", price: 10 },
        { id: "her-flecha-esfera-enana", name: "Esfera enana", price: 6 },
        { id: "her-flecha-daedrica", name: "Daédrica", price: 15 },
        { id: "her-flecha-heroe-nordico", name: "Héroe nórdico", price: 6 },
        { id: "her-flecha-hueso-dragon", name: "Hueso de dragón", price: 12 }
      ]
    },
    {
      titulo: "Minerales / Lingotes",
      items: [
        { id: "her-min-hierro", name: "Mena / Lingote de hierro", price: 8 },
        { id: "her-min-plata", name: "Mena / Lingote de plata", price: 15 },
        { id: "her-min-oro", name: "Mena / Lingote de oro", price: 20 },
        { id: "her-min-cobre", name: "Mena / Lingote de cobre", price: 6 },
        { id: "her-min-oricalco", name: "Mena / Lingote de oricalco", price: 10 },
        { id: "her-min-malaquita", name: "Mena de malaquita / Malaquita refinada", price: 12 },
        { id: "her-min-piedra-lunar", name: "Mena de piedra lunar / Piedra Lunar refinada", price: 15 },
        { id: "her-min-mercurio", name: "Mena / Lingote de mercurio", price: 8 },
        { id: "her-min-ebano", name: "Mena / Lingote de ébano", price: 50 },
        { id: "her-min-azurita", name: "Mena de azurita", price: 10 },
        { id: "her-min-estalhrim", name: "Mena / Lingote de estalhrim", price: 40 },
        { id: "her-min-ambar", name: "Mena de ámbar", price: 12 },
        { id: "her-min-locura", name: "Mena de locura", price: 25 }
      ]
    },
    {
      titulo: "Legendarias",
      items: [
        { id: "her-leg-daedrico", name: "Daédrico", price: 700 },
        { id: "her-leg-hueso-dragon", name: "Hueso de Dragón", price: 650 },
        { id: "her-leg-stalhrim", name: "Stalhrim", price: 550 },
        { id: "her-leg-nordico", name: "Nórdico", price: 300 }
      ]
    }
  ],

  comida: [
    {
      titulo: "Bebidas alcohólicas",
      items: [
        { id: "com-beb-hidromiel", name: "Hidromiel", price: 10 },
        { id: "com-beb-hidromiel-espino-negro", name: "Hidromiel de Espino Negro", price: 15 },
        { id: "com-beb-cerveza", name: "Cerveza", price: 8 },
        { id: "com-beb-cerveza-negra", name: "Cerveza negra", price: 10 },
        { id: "com-beb-vino", name: "Vino", price: 12 },
        { id: "com-beb-vino-tinto", name: "Vino tinto", price: 12 },
        { id: "com-beb-vino-blanco", name: "Vino blanco", price: 12 },
        { id: "com-beb-vino-fuego", name: "Vino de fuego", price: 20 },
        { id: "com-beb-brandy", name: "Brandy", price: 18 }
      ]
    },
    {
      titulo: "Comida preparada",
      items: [
        { id: "com-prep-estofado-manzana-col", name: "Estofado de manzana y col", price: 6 },
        { id: "com-prep-estofado-ternera", name: "Estofado de ternera", price: 8 },
        { id: "com-prep-pan", name: "Pan", price: 2 },
        { id: "com-prep-pan-mantequilla", name: "Pan con mantequilla", price: 3 },
        { id: "com-prep-queso", name: "Queso", price: 3 },
        { id: "com-prep-torta", name: "Torta", price: 5 },
        { id: "com-prep-torta-manzana", name: "Torta de manzana", price: 6 },
        { id: "com-prep-empanada", name: "Empanada", price: 4 },
        { id: "com-prep-empanada-manzana", name: "Empanada de manzana", price: 5 },
        { id: "com-prep-pescado-ahumado", name: "Pescado ahumado", price: 4 },
        { id: "com-prep-salmon-ahumado", name: "Salmón ahumado", price: 5 }
      ]
    },
    {
      titulo: "Frutas y verduras",
      items: [
        { id: "com-fv-manzana", name: "Manzana", price: 1 },
        { id: "com-fv-zanahoria", name: "Zanahoria", price: 1 },
        { id: "com-fv-cebolla", name: "Cebolla", price: 1 },
        { id: "com-fv-puerro", name: "Puerro", price: 1 },
        { id: "com-fv-tomate", name: "Tomate", price: 1 }
      ]
    },
    {
      titulo: "Ingredientes crudos",
      items: [
        { id: "com-ing-ajo", name: "Ajo", price: 1 },
        { id: "com-ing-carne-caballo", name: "Carne de caballo", price: 3 },
        { id: "com-ing-carne-ciervo", name: "Carne de ciervo", price: 3 },
        { id: "com-ing-pollo", name: "Pollo", price: 3 },
        { id: "com-ing-huevo-gallina", name: "Huevo de gallina", price: 1 },
        { id: "com-ing-leche", name: "Leche", price: 2 },
        { id: "com-ing-mantequilla", name: "Mantequilla", price: 2 },
        { id: "com-ing-miel", name: "Miel", price: 3 },
        { id: "com-ing-sal", name: "Sal", price: 1 },
        { id: "com-ing-saco-harina", name: "Saco de harina", price: 5 },
        { id: "com-ing-trigo", name: "Trigo", price: 1 }
      ]
    },
    {
      titulo: "Varios",
      items: [
        { id: "com-var-plato", name: "Plato", price: 1 },
        { id: "com-var-tazon", name: "Tazón", price: 1 },
        { id: "com-var-copa", name: "Copa", price: 2 },
        { id: "com-var-jarra", name: "Jarra", price: 2 },
        { id: "com-var-botella-vino", name: "Botella de vino", price: 3 }
      ]
    }
  ]

  // A medida que Cris y Vale terminen sus tiendas, agregan aquí
  // inventario.herreria, inventario.alquimia, inventario.general
  // y inventario.comida con la misma estructura.

};
