/* =========================================================
   Login ACINPRO — multi-rol con sesión persistente
   ========================================================= */

const formulario = document.getElementById("formularioLogin");
const usuario = document.getElementById("usuario");
const contrasena = document.getElementById("contrasena");
const recordarme = document.getElementById("recordarme");
const estado = document.getElementById("estado");
const olvido = document.getElementById("olvido");

const USUARIOS_DEMO = [
    { usuario: "1001", contrasena: "1001", nombre: "Administrador ACINPRO", correo: "admin@acinpro.local", rol: "admin", tipoUsuario: "Empleado", estado: "activo" },
    { usuario: "1002", contrasena: "1002", nombre: "Carlos Baquero", correo: "carlos2000ba@gmail.com", rol: "usuario", tipoUsuario: "Productor", estado: "pendiente_perfil" },
    { usuario: "1003", contrasena: "1003", nombre: "María López", correo: "maria@example.com", rol: "usuario", tipoUsuario: "Artista", estado: "pendiente_perfil" },
    { usuario: "1004", contrasena: "1004", nombre: "Pedro Ruiz", correo: "pedro@example.com", rol: "usuario", tipoUsuario: "Proveedor", estado: "pendiente_perfil" },
    { usuario: "1005", contrasena: "1005", nombre: "Ana Torres", correo: "ana@acinpro.local", rol: "usuario", tipoUsuario: "Empleado", estado: "pendiente_perfil" },
    { usuario: "1006", contrasena: "1006", nombre: "Carlos Andrés Bermúdez", correo: "artista.productor@example.com", rol: "usuario", tipoUsuario: "Artista, Productor", estado: "pendiente_perfil" },
    { usuario: "1007", contrasena: "1007", nombre: "Laura Castillo", correo: "laura@example.com", rol: "usuario", tipoUsuario: "Cliente", estado: "pendiente_perfil" }
];

const usuarioGuardado = localStorage.getItem("acinpro_usuario");
if (usuarioGuardado) {
    usuario.value = usuarioGuardado;
    recordarme.checked = true;
}

function mostrarEnlaceOlvido() {
    if (olvido.classList.contains("oculto")) {
        olvido.classList.remove("oculto");
        olvido.setAttribute("aria-hidden", "false");
    }
}

function ocultarEnlaceOlvido() {
    if (!olvido.classList.contains("oculto")) {
        olvido.classList.add("oculto");
        olvido.setAttribute("aria-hidden", "true");
    }
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    estado.textContent = "";

    const nombreUsuario = usuario.value.trim();
    const clave = contrasena.value;

    if (!nombreUsuario || !clave) {
        estado.textContent = "Por favor, completa todos los campos.";
        return;
    }

    if (recordarme.checked) {
        localStorage.setItem("acinpro_usuario", nombreUsuario);
    } else {
        localStorage.removeItem("acinpro_usuario");
    }

    estado.textContent = "Validando acceso...";

    setTimeout(() => {
        const encontrado = USUARIOS_DEMO.find(u => u.usuario === nombreUsuario && u.contrasena === clave);

        if (encontrado) {
            const sesion = {
                usuario: encontrado.usuario,
                nombre: encontrado.nombre,
                correo: encontrado.correo,
                rol: encontrado.rol,
                tipoUsuario: encontrado.tipoUsuario,
                estado: encontrado.estado,
                inicio: new Date().toISOString()
            };
            if (window.SessionRepository) window.SessionRepository.guardar(sesion);
            else localStorage.setItem("acinpro_sesion", JSON.stringify(sesion));

            estado.textContent = "Acceso correcto. Redirigiendo...";
            ocultarEnlaceOlvido();

            setTimeout(() => {
                window.location.href = window.AcinproWorkspace
                    ? window.AcinproWorkspace.rutaPara(sesion)
                    : (sesion.rol === "admin" ? "admin.html" : "home.html");
            }, 600);
        } else {
            estado.textContent = "Usuario o contraseña incorrectos. Verifica tus datos.";
            mostrarEnlaceOlvido();

            formulario.classList.remove("shake");
            void formulario.offsetWidth;
            formulario.classList.add("shake");

            formulario.addEventListener("animationend", function limpiar() {
                formulario.classList.remove("shake");
                formulario.removeEventListener("animationend", limpiar);
            }, { once: true });
        }
    }, 700);
});

olvido.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "recuperar.html";
});

function togglePasswordVisibility() {
    const passwordInput = document.getElementById("contrasena");
    const eyeIcon = document.getElementById("eye-icon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`;
    } else {
        passwordInput.type = "password";
        eyeIcon.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
    }
}