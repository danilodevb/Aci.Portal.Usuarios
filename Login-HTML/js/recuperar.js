/* =========================================================
   Recuperar acceso ACINPRO
   ========================================================= */

const formRec       = document.getElementById("formularioRecuperar");
const identificador = document.getElementById("identificador");
const estadoRec     = document.getElementById("estadoRec");
const confirmacion  = document.getElementById("confirmacionRec");
const correoMostrado = document.getElementById("correoMostrado");

formRec.addEventListener("submit", async (e) => {
    e.preventDefault();
    estadoRec.textContent = "";

    const valor = identificador.value.trim();

    if (!valor) {
        estadoRec.textContent = "Ingresa tu usuario o correo.";
        return;
    }

    estadoRec.textContent = "Verificando...";

    /*
    =====================================================
    AQUÍ CONECTA TU API REAL:
    const resp = await fetch("/api/recuperar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identificador: valor })
    });
    =====================================================
    */

    setTimeout(() => {
        // Mostrar como correo si contiene @, si no como usuario
        const esCorreo = valor.includes("@");
        correoMostrado.textContent = esCorreo
            ? valor
            : `la cuenta asociada a "${valor}"`;

        formRec.hidden = true;
        confirmacion.hidden = false;
    }, 900);
});