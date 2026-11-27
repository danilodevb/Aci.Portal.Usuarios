(() => {
const workspace = document.body.dataset.workspace;
const sesion = window.AcinproWorkspace.exigir(workspace);
if (!sesion) return;

const configWorkspace = window.AcinproWorkspace.routes[workspace];
const estructura = window.ESTRUCTURA_PORTAL[configWorkspace.structure];
const homeNav = document.getElementById("homeNav");
const homeMain = document.getElementById("homeMain");
const adminShell = document.querySelector(".admin-shell");
document.getElementById("homeRolSubtitulo").textContent = estructura.title;

if (localStorage.getItem("acinpro_sidebar_colapsado") === "true" && !window.matchMedia("(max-width: 900px)").matches) {
    adminShell.classList.add("sidebar-colapsado");
}

const dashboardItem = {
    id: "dashboard",
    label: "Dashboard",
    icono: "home",
    widgets: [window.DashboardView.crearWidget(sesion)]
};
const menuCompleto = [dashboardItem, ...estructura.menu];

if (!window.MenuPortal) menuCompleto.forEach(item => {
    const wrapper = document.createElement("div");
    wrapper.className = "nav-grupo";

    const iconoSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${window.ICONOS[item.icono] || window.ICONOS.home}</svg>`;

    if (item.children && item.children.length > 0) {
        const header = document.createElement("div");
        header.className = "nav-grupo-header admin-nav-item";
        header.innerHTML = `
            <span style="display:flex; align-items:center; gap:12px;">
                ${iconoSVG}
                ${item.label}
            </span>
            <span class="toggle" style="font-size:16px; font-weight:bold;">+</span>
        `;

        const sub = document.createElement("div");
        sub.className = "nav-submenu";

        item.children.forEach(child => {
            if (child.children && child.children.length > 0) {
                const childHeader = document.createElement("button");
                childHeader.type = "button";
                childHeader.className = "nav-submenu-item";
                childHeader.innerHTML = `<span>${child.label}</span><span class="toggle">+</span>`;

                const nested = document.createElement("div");
                nested.className = "nav-submenu nav-submenu-nivel";

                child.children.forEach(grandChild => {
                    const grandButton = document.createElement("button");
                    grandButton.type = "button";
                    grandButton.className = "nav-submenu-item";
                    grandButton.textContent = grandChild.label;
                    grandButton.onclick = (e) => {
                        e.stopPropagation();
                        document.querySelectorAll('.nav-submenu-item, .admin-nav-item').forEach(el => el.classList.remove('activo'));
                        grandButton.classList.add('activo');
                        document.getElementById('breadcrumb-title').textContent = grandChild.label;
                        renderizarSeccion(grandChild.id, grandChild.widgets || []);
                    };
                    nested.appendChild(grandButton);
                });

                childHeader.onclick = (e) => {
                    e.stopPropagation();
                    const abierto = nested.classList.toggle("open");
                    childHeader.querySelector(".toggle").textContent = abierto ? "−" : "+";
                };
                sub.appendChild(childHeader);
                sub.appendChild(nested);
                return;
            }

            const it = document.createElement("button");
            it.className = "nav-submenu-item";
            it.textContent = child.label;
            it.onclick = (e) => {
                e.stopPropagation();
                document.querySelectorAll('.nav-submenu-item, .admin-nav-item').forEach(el => el.classList.remove('activo'));
                it.classList.add('activo');
                document.getElementById('breadcrumb-title').textContent = child.label;
                renderizarSeccion(child.id, child.widgets || []);
            };
            sub.appendChild(it);
        });

        header.onclick = () => {
            // SI EL MENÚ ESTÁ COLAPSADO, LO ABRIMOS Y DESPLEGAMOS EL SUBMENÚ
            if (adminShell.classList.contains("sidebar-colapsado")) {
                adminShell.classList.remove("sidebar-colapsado");
                localStorage.setItem("acinpro_sidebar_colapsado", "false");
                sub.classList.add("open");
                header.querySelector(".toggle").textContent = "−";

                // Enfocar el buscador después de la animación
                setTimeout(() => { document.getElementById("menu-search").focus(); }, 300);
            } else {
                // COMPORTAMIENTO NORMAL SI YA ESTÁ ABIERTO
                const open = sub.classList.toggle("open");
                header.querySelector(".toggle").textContent = open ? "−" : "+";
            }
        };
        wrapper.appendChild(header);
        wrapper.appendChild(sub);
    } else {
        const btn = document.createElement("button");
        btn.className = "admin-nav-item";
        btn.innerHTML = `
            <span style="display:flex; align-items:center; gap:12px;">
                ${iconoSVG}
                ${item.label}
            </span>
        `;
        btn.onclick = () => {
            document.querySelectorAll('.nav-submenu-item, .admin-nav-item').forEach(el => el.classList.remove('activo'));
            btn.classList.add('activo');
            document.getElementById('breadcrumb-title').textContent = item.label;
            renderizarSeccion(item.id, item.widgets || []);
        };
        wrapper.appendChild(btn);
    }
    homeNav.appendChild(wrapper);
});
if (window.MenuPortal) {
    window.MenuPortal.render(
        homeNav,
        menuCompleto,
        (id, widgets) => renderizarSeccion(id, widgets)
    );
}

homeMain.innerHTML = `
    <div class="top-header">
        <div style="display:flex; align-items:center;">
            <button class="btn-toggle-sidebar" id="btnToggleSidebar" title="Mostrar/ocultar menú" aria-label="Mostrar/ocultar menú" aria-expanded="false">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <div class="breadcrumb">Inicio <span>/</span> <b id="breadcrumb-title">Panel</b></div>
        </div>
        <div class="user-info">
            <span class="notif-text" onclick="abrirPerfil()" title="Ver y editar mi perfil">Mi perfil</span>
            <button id="btnSalirTop" class="btn-salir-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Salir
            </button>
        </div>
    </div>
    <div class="toolbar" id="toolbar">
        <span class="toolbar-label">Acciones disponibles:</span>
    </div>
    <div class="canvas" id="canvas-principal" style="flex: 1; overflow-y: auto; padding-bottom: 20px;">
        <div class="widget-grid" id="grid"></div>
    </div>
`;

const btnToggleSidebar = document.getElementById("btnToggleSidebar");
const sincronizarModoMenu = () => {
    const responsive = window.matchMedia("(max-width: 900px)").matches;
    adminShell.classList.remove("menu-responsive-abierto");
    if (responsive) {
        adminShell.classList.remove("sidebar-colapsado");
    } else {
        adminShell.classList.toggle("sidebar-colapsado", localStorage.getItem("acinpro_sidebar_colapsado") === "true");
    }
    btnToggleSidebar.setAttribute("aria-expanded", "false");
};

btnToggleSidebar.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 900px)").matches) {
        const abierto = adminShell.classList.toggle("menu-responsive-abierto");
        btnToggleSidebar.setAttribute("aria-expanded", String(abierto));
        return;
    }
    adminShell.classList.toggle("sidebar-colapsado");
    localStorage.setItem("acinpro_sidebar_colapsado", adminShell.classList.contains("sidebar-colapsado"));
});
window.addEventListener("resize", sincronizarModoMenu);
sincronizarModoMenu();

// Lógica de la lupa
document.querySelector(".sidebar-search .icono-lupa").addEventListener("click", () => {
    if (adminShell.classList.contains("sidebar-colapsado")) {
        adminShell.classList.remove("sidebar-colapsado");
        localStorage.setItem("acinpro_sidebar_colapsado", "false");
        setTimeout(() => { document.getElementById("menu-search").focus(); }, 300);
    }
});

document.getElementById("btnSalirTop").addEventListener("click", () => {
    if (window.SessionRepository) window.SessionRepository.cerrar();
    else localStorage.removeItem("acinpro_sesion");
    window.location.href = "index.html";
});

window.modoPerfil = function (activo) {
    const canvas = document.getElementById("canvas-principal");
    const toolbar = document.getElementById("toolbar");
    if (canvas) canvas.classList.toggle("sin-scroll", activo);
    if (toolbar) toolbar.style.display = activo ? "none" : "";
};

window.mostrarTabPerfil = function (tab, boton) {
    document.querySelectorAll(".perfil-tab").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".perfil-tab-content").forEach(el => el.classList.remove("active"));
    boton.classList.add("active");
    const contenido = document.getElementById("perfil-tab-" + tab);
    if (contenido) contenido.classList.add("active");
    window.ajustarPerfil();
};

window.cerrarPerfil = function () {
    const grid = document.getElementById("grid");
    modoPerfil(false);
    grid.className = "widget-grid";
    grid.innerHTML = `<div style="grid-column:span 12;text-align:center;padding:50px;color:#5d7d82;border:2px dashed #7ad9d1;border-radius:14px;">Mi perfil cerrado. Selecciona una opción del menú lateral.</div>`;
    document.getElementById("breadcrumb-title").textContent = "Panel";
};

window.abrirPerfil = function () {
    const tipo = (sesion.tipoUsuario || "").toString();
    const esMixto = /\bArtista\b/i.test(tipo) && /\bProductor\b/i.test(tipo);
    const esProveedor = /Proveedor/i.test(tipo);
    const esArtista = /Artista/i.test(tipo);
    const esProductor = /Productor/i.test(tipo);
    const esCliente = /Cliente/i.test(tipo);

    const tituloRoles = esMixto
        ? ["Artista", "Productor"]
        : [estructura.title];
    const chips = tituloRoles.map(rol => `<span class="perfil-chip">${rol}</span>`).join("");

    const identidad = esProveedor ? `
        <div class="perfil-grid cols-3">
            <div><label class="wf-label">Razón social</label><input class="wf-input" value="Suministros Musicales ABC S.A.S."></div>
            <div><label class="wf-label">NIT</label><input class="wf-input" value="900.123.456-7"></div>
            <div><label class="wf-label">Representante legal</label><input class="wf-input" value="${sesion.nombre || ""}"></div>
            <div><label class="wf-label">Correo corporativo</label><input class="wf-input" value="${sesion.correo || ""}"></div>
            <div><label class="wf-label">Teléfono</label><input class="wf-input" value="+57 601 555 1234"></div>
            <div><label class="wf-label">Dirección</label><input class="wf-input" value="Calle 100 # 15-20, Bogotá"></div>
        </div>` : `
        <div class="perfil-grid cols-4">
            <div><label class="wf-label">Nombres</label><input class="wf-input" value="${sesion.nombre || ""}"></div>
            <div><label class="wf-label">Apellidos</label><input class="wf-input" value="Bermúdez Ruiz"></div>
            <div><label class="wf-label">Tipo de documento</label><select class="wf-input"><option>CC</option><option>CE</option><option>Pasaporte</option></select></div>
            <div><label class="wf-label">Número de documento</label><input class="wf-input" value="1.020.304.050"></div>
            <div><label class="wf-label">Fecha de nacimiento</label><input type="date" class="wf-input" value="1990-05-14"></div>
            <div><label class="wf-label">Correo electrónico</label><input class="wf-input" value="${sesion.correo || ""}"></div>
            <div><label class="wf-label">Teléfono</label><input class="wf-input" value="+57 300 000 0000"></div>
            <div><label class="wf-label">Dirección</label><input class="wf-input" value="Carrera 45 # 22-10, Bogotá"></div>
        </div>`;

    const bloqueBanco = (titulo, titular, columnas = "cols-4") => `
        <div class="perfil-seccion">
            <h4>${titulo}</h4>
            <div class="perfil-grid ${columnas}">
                <div><label class="wf-label">Banco</label><select class="wf-input"><option>Bancolombia</option><option>Davivienda</option><option>BBVA Colombia</option><option>Banco de Bogotá</option><option>Banco Popular</option></select></div>
                <div><label class="wf-label">Tipo de cuenta</label><select class="wf-input"><option>Ahorros</option><option>Corriente</option></select></div>
                <div><label class="wf-label">Número de cuenta</label><input class="wf-input" value="**** **** **** 4821"></div>
                <div><label class="wf-label">Titular</label><input class="wf-input" value="${titular}"></div>
            </div>
            <label class="wf-label">Certificación bancaria (PDF, no mayor a 30 días)</label>
            <div class="perfil-fila"><input type="file" class="wf-input"><button class="wf-btn" onclick="mostrarToast('Certificación bancaria actualizada')">Subir</button></div>
        </div>`;

    let banco;
    if (esMixto) {
        banco = `
            <div class="perfil-cuenta-compartida">
                <label><input type="checkbox"> Usar la misma cuenta bancaria para regalías y facturación</label>
            </div>
            <div class="perfil-columnas cols-2">
                ${bloqueBanco("Cuenta para regalías y anticipos (Artista)", sesion.nombre || "", "")}
                ${bloqueBanco("Cuenta para pagos de facturación (Productor)", sesion.nombre || "", "")}
            </div>`;
    } else {
        const tituloBanco = esProveedor ? "Cuenta para pagos de facturas"
            : esArtista ? "Cuenta para regalías y anticipos"
            : esProductor ? "Cuenta para pagos de facturación"
            : esCliente ? "Cuenta para devoluciones"
            : "Cuenta bancaria";
        banco = bloqueBanco(tituloBanco, esProveedor ? "Suministros Musicales ABC S.A.S." : (sesion.nombre || ""));
    }

    const html = `
        <div class="perfil-page">
            <div class="perfil-encabezado"><h3>Mi perfil</h3><div class="perfil-roles">${chips}</div></div>
            <div class="perfil-tabs">
                <button class="perfil-tab active" onclick="mostrarTabPerfil('personal', this)">Información personal</button>
                <button class="perfil-tab" onclick="mostrarTabPerfil('bancaria', this)">Información bancaria</button>
                <button class="perfil-tab" onclick="mostrarTabPerfil('cuenta', this)">Ajustes de cuenta</button>
            </div>
            <div class="perfil-tab-content active" id="perfil-tab-personal">
                <div class="perfil-seccion"><h4>Datos de identificación</h4>${identidad}</div>
                <div class="perfil-seccion"><h4>Roles y permisos</h4><div class="perfil-roles">Roles activos en el portal: ${chips}</div></div>
                <div class="perfil-acciones"><button class="wf-btn" onclick="cerrarPerfil()">Cancelar</button><button class="wf-btn wf-btn-primary" onclick="mostrarToast('Información personal actualizada')">Guardar cambios</button></div>
            </div>
            <div class="perfil-tab-content" id="perfil-tab-bancaria">
                ${banco}
                <div class="perfil-acciones"><button class="wf-btn" onclick="cerrarPerfil()">Cancelar</button><button class="wf-btn wf-btn-primary" onclick="mostrarToast('Información bancaria actualizada')">Guardar cambios</button></div>
            </div>
            <div class="perfil-tab-content" id="perfil-tab-cuenta">
                <div class="perfil-columnas cols-3">
                    <div class="perfil-seccion"><h4>Seguridad</h4><label class="wf-label">Contraseña actual</label><input type="password" class="wf-input"><label class="wf-label">Nueva contraseña</label><input type="password" class="wf-input"><label class="wf-label">Confirmar nueva contraseña</label><input type="password" class="wf-input"><label class="perfil-check"><input type="checkbox" checked> Autenticación en dos pasos (2FA)</label></div>
                    <div class="perfil-seccion"><h4>Notificaciones</h4><label class="perfil-check"><input type="checkbox" checked> Correo electrónico</label><label class="perfil-check"><input type="checkbox"> SMS</label><label class="perfil-check"><input type="checkbox" checked> Notificaciones en el portal</label></div>
                    <div class="perfil-seccion"><h4>Preferencias</h4><label class="wf-label">Idioma</label><select class="wf-input"><option>Español</option><option>Inglés</option></select><label class="wf-label">Zona horaria</label><select class="wf-input"><option>(GMT-5) Bogotá</option><option>(GMT-5) Lima</option></select></div>
                </div>
                <div class="perfil-acciones"><button class="wf-btn" onclick="cerrarPerfil()">Cancelar</button><button class="wf-btn wf-btn-primary" onclick="mostrarToast('Ajustes de cuenta guardados')">Guardar cambios</button></div>
            </div>
        </div>`;

    const grid = document.getElementById("grid");
    grid.className = "widget-grid perfil-mode";
    grid.innerHTML = html;
    inicializarOjosContrasena(grid);
    document.getElementById("breadcrumb-title").textContent = "Mi perfil";
    document.getElementById("canvas-principal").scrollTop = 0;
    modoPerfil(true);
    ajustarPerfil();
};

const primerItem = menuCompleto[0];
if (primerItem) {
    const firstTarget = primerItem.children ? primerItem.children[0] : primerItem;
    document.getElementById('breadcrumb-title').textContent = firstTarget.label;
    renderizarSeccion(firstTarget.id, firstTarget.widgets || []);
}

window.inicializarNotificaciones();
})();