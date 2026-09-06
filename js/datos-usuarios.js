/*
 * datos-usuarios.js
 * Arreglo de regiones/comunas solicitado por la pauta.
 * Agrega o reemplaza datos según el proyecto.
 */
const regionesChile = {
    "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte"],
    "Antofagasta": ["Antofagasta", "Calama", "Tocopilla"],
    "Atacama": ["Copiapó", "Caldera", "Vallenar"],
    "Coquimbo": ["La Serena", "Coquimbo", "Ovalle"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
    "Metropolitana de Santiago": ["Santiago", "Maipú", "Puente Alto"],
    "O'Higgins": ["Rancagua", "San Fernando", "Rengo"],
    "Maule": ["Talca", "Curicó", "Linares"],
    "Ñuble": ["Chillán", "San Carlos", "Bulnes"],
    "Biobío": ["Concepción", "Los Ángeles", "Talcahuano"],
    "La Araucanía": ["Temuco", "Angol", "Villarrica"],
    "Los Ríos": ["Valdivia", "La Unión", "Río Bueno"],
    "Los Lagos": ["Puerto Montt", "Osorno", "Castro"],
    "Aysén": ["Coyhaique", "Aysén", "Chile Chico"],
    "Magallanes y de la Antártica Chilena": ["Punta Arenas", "Puerto Natales", "Porvenir"]
};

const usuarios = [
    {
        run: "0000000K",
        nombre: "NOMBRE",
        apellidos: "APELLIDOS",
        correo: "ejemplo@gmail.com",
        contrasena: "123456",
        tipo: "Cliente"
    },

    {
        run: "12345678-9",
        nombre: "Valeria",
        apellidos: "Rodriguez",
        correo: "vale.rodrigueza@duoc.cl",
        contrasena: "1234567",
        tipo: "Administrador"
    },

    {
        run: "11111111-1",
        nombre: "Vendedor",
        apellidos: "Skyrim",
        correo: "vendedor@duoc.cl",
        contrasena: "123456",
        tipo: "Vendedor"
    }
];

const CLAVE_USUARIOS = "skyrimUsuarios";
const usuariosGuardadosBase = usuarios.slice(0, 3);

try {
    const usuariosGuardados = JSON.parse(localStorage.getItem(CLAVE_USUARIOS) || "[]");
    if (Array.isArray(usuariosGuardados)) {
        usuariosGuardados.forEach(usuarioGuardado => {
            const indice = usuarios.findIndex(usuario => usuario.run === usuarioGuardado.run);
            if (indice >= 0) usuarios[indice] = { ...usuarios[indice], ...usuarioGuardado };
            else usuarios.push(usuarioGuardado);
        });
    }
} catch (error) {
    localStorage.removeItem(CLAVE_USUARIOS);
}

function guardarUsuario(usuario) {
    const usuariosGuardados = usuarios.filter(item => !usuariosGuardadosBase.some(base => base.run === item.run));
    usuariosGuardados.push(usuario);
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuariosGuardados));
    usuarios.push(usuario);
}

function actualizarUsuario(usuarioActualizado) {
    const indice = usuarios.findIndex(usuario => usuario.run === usuarioActualizado.run);
    if (indice < 0) return false;

    usuarios[indice] = { ...usuarios[indice], ...usuarioActualizado };
    const usuariosGuardados = usuarios.filter(usuario =>
        !usuariosGuardadosBase.some(base => base.run === usuario.run)
    );
    const baseEditado = usuarios.find(usuario =>
        usuariosGuardadosBase.some(base => base.run === usuario.run)
    );
    if (baseEditado) usuariosGuardados.push(baseEditado);
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuariosGuardados));
    return true;
}
