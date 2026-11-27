/* =========================================================
   Registro ACINPRO — Solicitud de creación de cuenta
   ========================================================= */

const formReg = document.getElementById("formularioRegistro");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const tipoIdent = document.getElementById("tipoIdentificacion");
const documento = document.getElementById("documento");
const terminos = document.getElementById("terminos");
const estadoReg = document.getElementById("estadoReg");
const toast = document.getElementById("toastRegistro");

formReg.addEventListener("submit", async (e) => {
    e.preventDefault();
    estadoReg.textContent = "";

    // Capturamos los checkboxes seleccionados
    const checkboxes = document.querySelectorAll('input[name="tipoUsuario"]:checked');
    const tiposSeleccionados = Array.from(checkboxes).map(cb => cb.value);

    const datos = {
        nombre: nombre.value.trim(),
        correo: correo.value.trim().toLowerCase(),
        tipoIdentificacion: tipoIdent.value,
        documento: documento.value.trim(),
        tipoUsuario: tiposSeleccionados.join(", ") // Ej: "Productor, Artista"
    };

    /* Validaciones */
    if (!datos.nombre || !datos.correo || !datos.tipoIdentificacion || !datos.documento) {
        estadoReg.textContent = "Por favor, completa todos los campos personales.";
        return;
    }

    if (tiposSeleccionados.length === 0) {
        estadoReg.textContent = "Selecciona al menos un tipo de usuario.";
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)) {
        estadoReg.textContent = "El correo electrónico no es válido.";
        return;
    }

    if (!/^\d{6,15}$/.test(datos.documento)) {
        estadoReg.textContent = "El número de identificación debe tener entre 6 y 15 dígitos.";
        return;
    }

    if (!terminos.checked) {
        estadoReg.textContent = "Debes aceptar el tratamiento de datos personales para continuar.";
        return;
    }

    estadoReg.textContent = "Enviando solicitud...";

    // Simulación de guardado en LocalStorage
    setTimeout(() => {
        const solicitudes = JSON.parse(localStorage.getItem("acinpro_solicitudes") || "[]");
        solicitudes.push({
            id: Date.now(),
            ...datos,
            estado: "pendiente",
            creadoEn: new Date().toISOString()
        });
        localStorage.setItem("acinpro_solicitudes", JSON.stringify(solicitudes));

        estadoReg.textContent = "";
        mostrarToast();
        formReg.reset();

        setTimeout(() => { window.location.href = "index.html"; }, 4000);
    }, 800);
});

function mostrarToast() {
    toast.classList.add("visible");
    setTimeout(() => toast.classList.remove("visible"), 3800);
}