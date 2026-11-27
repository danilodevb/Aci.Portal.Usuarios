(() => {
const sesion = window.AcinproWorkspace.exigir("admin");
if (!sesion) return;

const estructura = window.ESTRUCTURA_PORTAL.admin;
const estructuraEmpleado = window.ESTRUCTURA_PORTAL.empleado;
const adminNav = document.getElementById("adminNav");
const adminMain = document.getElementById("adminMain");
const adminShell = document.querySelector(".admin-shell");

if (localStorage.getItem("acinpro_sidebar_colapsado") === "true" && !window.matchMedia("(max-width: 900px)").matches) {
    adminShell.classList.add("sidebar-colapsado");
}

const dashboardItem = {
    id: "dashboard",
    label: "Dashboard",
    icono: "home",
    widgets: [window.DashboardView.crearWidget(sesion)]
};
const menuCompleto = [
    dashboardItem,
    {
        id: "seccion-admin",
        label: "ADMINISTRADOR",
        icono: "users",
        roleSection: "ADMINISTRADOR",
        children: estructura.menu
    },
    {
        id: "seccion-empleado",
        label: "EMPLEADO",
        icono: "user",
        roleSection: "EMPLEADO",
        children: estructuraEmpleado.menu
    }
];

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
    adminNav.appendChild(wrapper);
});
if (window.MenuPortal) {
    window.MenuPortal.render(
        adminNav,
        menuCompleto,
        (id, widgets) => renderizarSeccion(id, widgets)
    );
}

adminMain.innerHTML = `
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

const primerItem = menuCompleto[0];
if (primerItem) {
    const firstTarget = primerItem.children ? primerItem.children[0] : primerItem;
    document.getElementById('breadcrumb-title').textContent = firstTarget.label;
    renderizarSeccion(firstTarget.id, firstTarget.widgets || []);
}

window.inicializarNotificaciones();
})();