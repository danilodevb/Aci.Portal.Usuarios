const sesionPerfil = JSON.parse(localStorage.getItem("acinpro_sesion") || "{}");

function crearCampoPassword(etiqueta) {
    return `<label class="wf-label">${etiqueta}</label><div class="password-field-wrapper"><input type="password" class="wf-input"><button type="button" class="password-toggle" aria-label="Mostrar contraseña"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button></div>`;
}

function configurarOjos() {
    document.querySelectorAll(".password-toggle").forEach(boton => {
        boton.addEventListener("click", () => {
            const input = boton.previousElementSibling;
            const visible = input.type === "text";
            input.type = visible ? "password" : "text";
            boton.classList.toggle("activo", !visible);
            boton.setAttribute("aria-label", visible ? "Mostrar contraseña" : "Ocultar contraseña");
            boton.innerHTML = visible
                ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`
                : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
        });
    });
}

function cambiarTab(tab, boton) {
    document.querySelectorAll(".perfil-tab").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".perfil-tab-content").forEach(el => el.classList.remove("active"));
    boton.classList.add("active");
    document.getElementById("perfil-tab-" + tab).classList.add("active");
}

function volver() {
    const ruta = window.AcinproWorkspace
        ? window.AcinproWorkspace.rutaPara(sesionPerfil)
        : (sesionPerfil.rol === "admin" ? "admin.html" : "home.html");
    window.location.href = "../" + ruta;
}

document.querySelectorAll("[data-volver]").forEach(boton => boton.addEventListener("click", volver));

const rol = document.body.dataset.rol;
const esProveedor = rol === "proveedor";
const esMixto = rol === "artista-productor";
const roles = sesionPerfil.rol === "admin"
    ? ["Administrador", "Empleado"]
    : esMixto ? ["Artista", "Productor"] : [document.body.dataset.rolLabel];
document.getElementById("perfilRoles").innerHTML = roles.map(r => `<span class="perfil-chip">${r}</span>`).join("");

const identidad = esProveedor ? `
    <div class="perfil-grid cols-3">
        <div><label class="wf-label">Razón social</label><input class="wf-input" value="Suministros Musicales ABC S.A.S."></div>
        <div><label class="wf-label">NIT</label><input class="wf-input" value="900.123.456-7"></div>
        <div><label class="wf-label">Representante legal</label><input class="wf-input" value="${sesionPerfil.nombre || ""}"></div>
        <div><label class="wf-label">Correo corporativo</label><input class="wf-input" value="${sesionPerfil.correo || ""}"></div>
        <div><label class="wf-label">Teléfono</label><input class="wf-input" value="+57 601 555 1234"></div>
        <div><label class="wf-label">Dirección</label><input class="wf-input" value="Calle 100 # 15-20, Bogotá"></div>
    </div>` : `
    <div class="perfil-grid cols-4">
        <div><label class="wf-label">Nombres</label><input class="wf-input" value="${sesionPerfil.nombre || ""}"></div>
        <div><label class="wf-label">Apellidos</label><input class="wf-input" value="Bermúdez Ruiz"></div>
        <div><label class="wf-label">Tipo de documento</label><select class="wf-input"><option>CC</option><option>CE</option><option>Pasaporte</option></select></div>
        <div><label class="wf-label">Número de documento</label><input class="wf-input" value="1.020.304.050"></div>
        <div><label class="wf-label">Fecha de nacimiento</label><input type="date" class="wf-input" value="1990-05-14"></div>
        <div><label class="wf-label">Correo electrónico</label><input class="wf-input" value="${sesionPerfil.correo || ""}"></div>
        <div><label class="wf-label">Teléfono</label><input class="wf-input" value="+57 300 000 0000"></div>
        <div><label class="wf-label">Dirección</label><input class="wf-input" value="Carrera 45 # 22-10, Bogotá"></div>
    </div>`;

function bloqueBanco(titulo, titular) {
    return `<div class="perfil-seccion"><h4>${titulo}</h4><div class="perfil-grid"><div><label class="wf-label">Banco</label><select class="wf-input"><option>Bancolombia</option><option>Davivienda</option><option>BBVA Colombia</option><option>Banco de Bogotá</option></select></div><div><label class="wf-label">Tipo de cuenta</label><select class="wf-input"><option>Ahorros</option><option>Corriente</option></select></div><div><label class="wf-label">Número de cuenta</label><input class="wf-input" value="**** **** **** 4821"></div><div><label class="wf-label">Titular</label><input class="wf-input" value="${titular || ""}"></div></div><label class="wf-label">Certificación bancaria (PDF)</label><div class="perfil-fila"><input type="file" class="wf-input"><button type="button" class="wf-btn">Subir</button></div></div>`;
}

const banco = esMixto
    ? `<div class="perfil-seccion"><label class="perfil-check"><input type="checkbox"> Usar la misma cuenta bancaria para regalías y facturación</label></div><div class="perfil-columnas cols-2">${bloqueBanco("Cuenta para regalías y anticipos (Artista)", sesionPerfil.nombre)}${bloqueBanco("Cuenta para pagos de facturación (Productor)", sesionPerfil.nombre)}</div>`
    : bloqueBanco(esProveedor ? "Cuenta para pagos de facturas" : rol === "artista" ? "Cuenta para regalías y anticipos" : rol === "productor" ? "Cuenta para pagos de facturación" : "Cuenta bancaria", esProveedor ? "Suministros Musicales ABC S.A.S." : sesionPerfil.nombre);

document.getElementById("perfilPersonal").innerHTML = `
    <div class="perfil-seccion"><h4>Datos de identificación</h4>${identidad}</div>
    <div class="perfil-seccion"><h4>Roles y permisos</h4><div class="perfil-roles">Roles activos en el portal: ${roles.map(r => `<span class="perfil-chip">${r}</span>`).join("")}</div></div>
`;
document.getElementById("perfilBancaria").innerHTML = banco;
document.getElementById("perfilCuenta").innerHTML = `
    <div class="perfil-columnas cols-3">
        <div class="perfil-seccion"><h4>Seguridad</h4>${crearCampoPassword("Contraseña actual")}${crearCampoPassword("Nueva contraseña")}${crearCampoPassword("Confirmar nueva contraseña")}<label class="perfil-check"><input type="checkbox" checked> Autenticación en dos pasos (2FA)</label></div>
        <div class="perfil-seccion"><h4>Notificaciones</h4><label class="perfil-check"><input type="checkbox" checked> Correo electrónico</label><label class="perfil-check"><input type="checkbox"> SMS</label><label class="perfil-check"><input type="checkbox" checked> Notificaciones en el portal</label></div>
        <div class="perfil-seccion"><h4>Preferencias</h4><label class="wf-label">Idioma</label><select class="wf-input"><option>Español</option><option>Inglés</option></select><label class="wf-label">Zona horaria</label><select class="wf-input"><option>(GMT-5) Bogotá</option></select></div>
    </div>
`;

document.querySelectorAll(".perfil-tab").forEach(boton => {
    boton.addEventListener("click", () => cambiarTab(boton.dataset.tab, boton));
});
configurarOjos();
