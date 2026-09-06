/*
 * formularios.js
 * Validaciones según las reglas de negocio de la pauta.
 */
document.addEventListener("DOMContentLoaded", () => {
    configurarLogin();
    configurarContacto();
    configurarRegistro();
    configurarFormularioAdminUsuario();
    actualizarAnio();
});

const DOMINIOS_PERMITIDOS = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

function correoPermitido(correo) {
    const valor = correo.trim().toLowerCase();
    return DOMINIOS_PERMITIDOS.some(dominio => valor.endsWith(dominio));
}

function validarRUN(run) {
    const limpio = run.replace(/[^0-9kK]/g, "").toUpperCase();
    if (!/^\d{6,8}[0-9K]$/.test(limpio)) return false;

    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1);
    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = 11 - (suma % 11);
    const esperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
    return dv === esperado;
}

function mostrarError(input, errorElement, mensaje) {
    input.classList.add("input-error");
    errorElement.textContent = mensaje;
}

function limpiarError(input, errorElement) {
    input.classList.remove("input-error");
    errorElement.textContent = "";
}

function configurarLogin() {
    const form = document.getElementById("loginForm");
    if (!form) return;

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const success = document.getElementById("formSuccess");

    form.addEventListener("input", () => {
        success.textContent = "";
    });

    form.addEventListener("submit", event => {
        event.preventDefault();

        let valido = true;
        success.textContent = "";

        // VALIDAR CORREO
        if (!email.value.trim()) {

            mostrarError(
                email,
                emailError,
                "El correo es obligatorio."
            );

            valido = false;

        } else if (email.value.length > 100) {

            mostrarError(
                email,
                emailError,
                "El correo no puede superar los 100 caracteres."
            );

            valido = false;

        } else if (!email.validity.valid || !correoPermitido(email.value)) {

            mostrarError(
                email,
                emailError,
                "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com."
            );

            valido = false;

        } else {

            limpiarError(email, emailError);
        }


        // VALIDAR CONTRASEÑA
        if (!password.value) {

            mostrarError(
                password,
                passwordError,
                "La contraseña es obligatoria."
            );

            valido = false;

        } else if (
            password.value.length < 4 ||
            password.value.length > 10
        ) {

            mostrarError(
                password,
                passwordError,
                "La contraseña debe tener entre 4 y 10 caracteres."
            );

            valido = false;

        } else {

            limpiarError(password, passwordError);
        }


        // LOGIN CORRECTO
        if (valido) {

            const usuario = typeof usuarios !== "undefined"
                ? usuarios.find(item => item.correo.toLowerCase() === email.value.trim().toLowerCase() && item.contrasena === password.value)
                : null;

            if (!usuario) {
                mostrarError(email, emailError, "El correo o la contraseña no son correctos.");
                mostrarError(password, passwordError, "Revisa tus datos e inténtalo nuevamente.");
                return;
            }

            guardarSesion(usuario);
            success.textContent = `Inicio de sesión correcto como ${usuario.tipo}.`;

            setTimeout(() => {
                window.location.href = "index.html";
            }, 500);
        }
    });
}

function configurarContacto() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const message = document.getElementById("contactMessage");
    const nameError = document.getElementById("contactNameError");
    const emailError = document.getElementById("contactEmailError");
    const messageError = document.getElementById("contactMessageError");
    const success = document.getElementById("contactSuccess");

    form.addEventListener("submit", event => {
        event.preventDefault();
        let valido = true;
        success.textContent = "";

        if (!name.value.trim()) {
            mostrarError(name, nameError, "El nombre es obligatorio.");
            valido = false;
        } else if (name.value.length > 100) {
            mostrarError(name, nameError, "El nombre no puede superar los 100 caracteres.");
            valido = false;
        } else limpiarError(name, nameError);

        if (email.value.trim() && (!email.validity.valid || email.value.length > 100 || !correoPermitido(email.value))) {
            mostrarError(email, emailError, "Si ingresas correo, debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com y no superar 100 caracteres.");
            valido = false;
        } else limpiarError(email, emailError);

        if (!message.value.trim()) {
            mostrarError(message, messageError, "El comentario es obligatorio.");
            valido = false;
        } else if (message.value.length > 500) {
            mostrarError(message, messageError, "El comentario no puede superar los 500 caracteres.");
            valido = false;
        } else limpiarError(message, messageError);

        if (valido) {
            success.textContent = "Mensaje validado correctamente.";
            form.reset();
        }
    });
}

function configurarRegistro() {
    const form = document.getElementById("registerForm");
    if (!form) return;

    const ids = ["run", "registerName", "registerLastName", "registerEmail", "region", "comuna", "address"];
    ids.forEach(id => {
        const input = document.getElementById(id);
        const error = document.getElementById(`${id}Error`);
        input?.addEventListener("input", () => error && limpiarError(input, error));
        input?.addEventListener("change", () => error && limpiarError(input, error));
    });

    configurarRegiones("region", "comuna");

    form.addEventListener("submit", event => {
        event.preventDefault();
        let valido = true;

        const run = document.getElementById("run");
        const name = document.getElementById("registerName");
        const lastName = document.getElementById("registerLastName");
        const email = document.getElementById("registerEmail");
        const region = document.getElementById("region");
        const comuna = document.getElementById("comuna");
        const address = document.getElementById("address");

        const reglas = [
            [run, "runError", !run.value.trim() ? "El RUN es obligatorio." : (!validarRUN(run.value) || run.value.includes(".") || run.value.includes("-") ? "Ingresa un RUN válido, sin puntos ni guion." : "")],
            [name, "registerNameError", !name.value.trim() ? "El nombre es obligatorio." : name.value.length > 50 ? "El nombre no puede superar 50 caracteres." : ""],
            [lastName, "registerLastNameError", !lastName.value.trim() ? "Los apellidos son obligatorios." : lastName.value.length > 100 ? "Los apellidos no pueden superar 100 caracteres." : ""],
            [email, "registerEmailError", !email.value.trim() ? "El correo es obligatorio." : email.value.length > 100 || !email.validity.valid || !correoPermitido(email.value) ? "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com." : ""],
            [region, "regionError", !region.value ? "Selecciona una región." : ""],
            [comuna, "comunaError", !comuna.value ? "Selecciona una comuna." : ""],
            [address, "addressError", !address.value.trim() ? "La dirección es obligatoria." : address.value.length > 300 ? "La dirección no puede superar 300 caracteres." : ""]
        ];

        reglas.forEach(([input, errorId, mensaje]) => {
            const error = document.getElementById(errorId);
            if (mensaje) {
                mostrarError(input, error, mensaje);
                valido = false;
            } else limpiarError(input, error);
        });

        const success = document.getElementById("registerSuccess");
        if (valido) {
            success.textContent = "Usuario validado correctamente.";
        } else success.textContent = "";
    });
}

function configurarRegiones(regionId, comunaId) {
    const region = document.getElementById(regionId);
    const comuna = document.getElementById(comunaId);
    if (!region || !comuna || typeof regionesChile === "undefined") return;

    region.innerHTML = '<option value="">Selecciona una región</option>' +
        Object.keys(regionesChile).map(nombre => `<option value="${nombre}">${nombre}</option>`).join("");

    region.addEventListener("change", () => {
        const comunas = regionesChile[region.value] || [];
        comuna.disabled = comunas.length === 0;
        comuna.innerHTML = comunas.length
            ? '<option value="">Selecciona una comuna</option>' + comunas.map(c => `<option value="${c}">${c}</option>`).join("")
            : '<option value="">Selecciona primero una región</option>';
    });
}

function configurarFormularioAdminUsuario() {
    const form = document.getElementById("adminUserForm");
    if (!form) return;
    configurarRegiones("adminRegion", "adminComuna");
    prepararEdicionUsuario();

    form.addEventListener("submit", event => {
        event.preventDefault();
        let valido = true;
        const fields = [
            ["adminRun", "adminRunError", "RUN", value => value.trim() && validarRUN(value) && !value.includes(".") && !value.includes("-")],
            ["adminName", "adminNameError", "Nombre", value => value.trim() && value.length <= 50],
            ["adminLastName", "adminLastNameError", "Apellidos", value => value.trim() && value.length <= 100],
            ["adminEmail", "adminEmailError", "Correo", value => value.trim() && value.length <= 100 && document.getElementById("adminEmail").validity.valid && correoPermitido(value)],
            ["adminPassword", "adminPasswordError", "Contraseña", value => value.length >= 4 && value.length <= 10],
            ["adminRegion", "adminRegionError", "Región", value => Boolean(value)],
            ["adminComuna", "adminComunaError", "Comuna", value => Boolean(value)],
            ["adminAddress", "adminAddressError", "Dirección", value => value.trim() && value.length <= 300]
        ];

        fields.forEach(([id, errorId, label, rule]) => {
            const input = document.getElementById(id);
            const error = document.getElementById(errorId);
            if (!rule(input.value)) {
                mostrarError(input, error, `Revisa el campo ${label}.`);
                valido = false;
            } else limpiarError(input, error);
        });

        const run = document.getElementById("adminRun").value.trim().toUpperCase();
        const correo = document.getElementById("adminEmail").value.trim().toLowerCase();
        const runOriginal = new URLSearchParams(window.location.search).get("run")?.toUpperCase();
        const duplicado = typeof usuarios !== "undefined" && usuarios.some(usuario =>
            usuario.run.toUpperCase() !== runOriginal &&
            (usuario.run.toUpperCase() === run || usuario.correo.toLowerCase() === correo)
        );

        if (duplicado) {
            mostrarError(document.getElementById("adminRun"), document.getElementById("adminRunError"), "El RUN o correo ya está registrado.");
            valido = false;
        }

        if (valido && typeof guardarUsuario === "function") {
            const usuario = {
                run,
                nombre: document.getElementById("adminName").value.trim(),
                apellidos: document.getElementById("adminLastName").value.trim(),
                correo,
                contrasena: document.getElementById("adminPassword").value,
                tipo: document.getElementById("adminType").value,
                fechaNacimiento: document.getElementById("adminBirthDate").value,
                region: document.getElementById("adminRegion").value,
                comuna: document.getElementById("adminComuna").value,
                direccion: document.getElementById("adminAddress").value.trim()
            };
            const editando = Boolean(runOriginal);
            if (editando && typeof actualizarUsuario === "function") actualizarUsuario(usuario);
            else guardarUsuario(usuario);
            document.getElementById("adminUserSuccess").textContent = editando
                ? "Usuario actualizado correctamente."
                : "Usuario guardado correctamente.";
            setTimeout(() => {
                window.location.href = "usuarios.html";
            }, 500);
        } else {
            document.getElementById("adminUserSuccess").textContent = "";
        }
    });
}

function prepararEdicionUsuario() {
    const runOriginal = new URLSearchParams(window.location.search).get("run");
    if (!runOriginal || typeof usuarios === "undefined") return;
    const usuario = usuarios.find(item => item.run.toUpperCase() === runOriginal.toUpperCase());
    if (!usuario) return;

    document.querySelector(".form-card h1").textContent = "Editar usuario";
    document.querySelector(".form-intro").textContent = `Editando el usuario ${usuario.run}.`;
    document.querySelector("#adminUserForm button[type='submit']").textContent = "Actualizar usuario";
    document.getElementById("adminRun").value = usuario.run;
    document.getElementById("adminRun").readOnly = true;
    document.getElementById("adminName").value = usuario.nombre || "";
    document.getElementById("adminLastName").value = usuario.apellidos || "";
    document.getElementById("adminEmail").value = usuario.correo || "";
    document.getElementById("adminPassword").value = usuario.contrasena || "";
    document.getElementById("adminBirthDate").value = usuario.fechaNacimiento || "";
    document.getElementById("adminType").value = usuario.tipo || "Cliente";
    document.getElementById("adminRegion").value = usuario.region || "";
    document.getElementById("adminRegion").dispatchEvent(new Event("change"));
    document.getElementById("adminComuna").value = usuario.comuna || "";
    document.getElementById("adminAddress").value = usuario.direccion || "";
}
