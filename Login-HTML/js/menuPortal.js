window.MenuPortal = {
    render(nav, menu, renderSection) {
        nav.innerHTML = "";

        const resetToggles = (node) => {
            node.querySelectorAll(".menu-control").forEach(control => {
                const toggle = control.querySelector(".toggle");
                if (toggle) toggle.textContent = "+";
                control.setAttribute("aria-expanded", "false");
            });
        };

        const closeBranch = (node) => {
            const submenu = node.querySelector(":scope > .nav-submenu");
            if (!submenu) return;
            submenu.classList.remove("open");
            node.querySelectorAll(".nav-submenu.open").forEach(nested => nested.classList.remove("open"));
            resetToggles(node);
        };

        const closeBranchesOutsideRoute = (node) => {
            const route = new Set();
            let current = node;
            while (current && current !== nav) {
                if (current.matches('[data-menu-node="true"]')) route.add(current);
                current = current.parentElement.closest('[data-menu-node="true"]');
            }

            nav.querySelectorAll('[data-menu-node="true"]').forEach(branch => {
                const submenu = branch.querySelector(":scope > .nav-submenu");
                if (submenu && submenu.classList.contains("open") && !route.has(branch)) {
                    closeBranch(branch);
                }
            });
        };

        const closeAllBranches = () => {
            nav.querySelectorAll(":scope > .nav-grupo[data-menu-node='true']").forEach(closeBranch);
        };

        const clearActive = () => {
            nav.querySelectorAll(".menu-control.activo").forEach(control => control.classList.remove("activo"));
        };

        const createNode = (item, depth, roleSection) => {
            const node = document.createElement("div");
            node.className = "nav-grupo";
            node.dataset.menuNode = "true";
            node.dataset.menuLabel = item.label || "";
            node.dataset.roleSection = roleSection || "";

            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            const control = document.createElement("button");
            control.type = "button";
            control.className = `${depth === 0 ? "admin-nav-item nav-grupo-header" : "nav-submenu-item"} menu-control`;
            control.dataset.menuLabel = item.label || "";
            control.dataset.roleSection = roleSection || "";
            control.setAttribute("aria-expanded", "false");

            const icon = depth === 0 && item.icono
                ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${window.ICONOS[item.icono] || window.ICONOS.home}</svg>`
                : "";
            const context = roleSection ? `<span class="menu-search-context">${roleSection}</span>` : "";
            control.innerHTML = `<span class="menu-control-label">${icon}<span>${item.label}</span></span>${context}${hasChildren ? '<span class="toggle">+</span>' : ""}`;
            node.appendChild(control);

            if (hasChildren) {
                const submenu = document.createElement("div");
                submenu.className = `nav-submenu${depth > 0 ? " nav-submenu-nivel" : ""}`;
                item.children.forEach(child => {
                    submenu.appendChild(createNode(child, depth + 1, roleSection));
                });
                node.appendChild(submenu);
                control.addEventListener("click", event => {
                    event.stopPropagation();
                    closeBranchesOutsideRoute(node);
                    if (submenu.classList.contains("open")) {
                        closeBranch(node);
                        control.setAttribute("aria-expanded", "false");
                        return;
                    }
                    submenu.classList.add("open");
                    control.setAttribute("aria-expanded", "true");
                    const toggle = control.querySelector(".toggle");
                    if (toggle) toggle.textContent = "−";
                });
            } else {
                control.addEventListener("click", event => {
                    event.stopPropagation();
                    const node = control.closest('[data-menu-node="true"]');
                    closeBranchesOutsideRoute(node);
                    clearActive();
                    control.classList.add("activo");
                    document.getElementById("breadcrumb-title").textContent = item.label;
                    renderSection(item.id, item.widgets || []);
                    if (window.matchMedia("(max-width: 900px)").matches) {
                        const search = document.getElementById("menu-search");
                        if (search && search.value) {
                            search.value = "";
                            window.MenuPortal.filter(nav, "");
                        }
                        closeAllBranches();
                        const shell = nav.closest(".admin-shell");
                        const menuButton = document.getElementById("btnToggleSidebar");
                        if (shell) shell.classList.remove("menu-responsive-abierto");
                        if (menuButton) menuButton.setAttribute("aria-expanded", "false");
                    }
                });
            }
            return node;
        };

        menu.forEach(item => {
            const section = item.roleSection || (item.id === "bloque_artista" ? "ARTISTA" : item.id === "bloque_productor" ? "PRODUCTOR" : "");
            nav.appendChild(createNode(item, 0, section));
        });
    },

    filter(nav, value) {
        const term = value.trim().toLocaleLowerCase();
        const nodes = Array.from(nav.querySelectorAll('[data-menu-node="true"]'));
        const controls = Array.from(nav.querySelectorAll(".menu-control"));

        controls.forEach(control => {
            control.style.display = "";
            control.setAttribute("aria-expanded", "false");
            const context = control.querySelector(".menu-search-context");
            if (context) context.classList.toggle("visible", Boolean(term));
        });
        nodes.forEach(node => {
            node.style.display = "";
            const submenu = node.querySelector(":scope > .nav-submenu");
            if (submenu) submenu.classList.remove("open");
        });
        nav.querySelectorAll(".menu-control .toggle").forEach(toggle => { toggle.textContent = "+"; });
        if (!term) return;

        const matched = new Set();
        nodes.forEach(node => {
            const label = (node.dataset.menuLabel || "").toLocaleLowerCase();
            const section = (node.dataset.roleSection || "").toLocaleLowerCase();
            if (label.includes(term) || section.includes(term)) matched.add(node);
        });

        nodes.forEach(node => {
            let current = node;
            let visible = false;
            while (current && current !== nav) {
                if (matched.has(current)) visible = true;
                current = current.parentElement.closest('[data-menu-node="true"]');
            }
            node.style.display = visible ? "" : "none";
            if (visible) {
                const parentSubmenu = node.parentElement.closest(".nav-submenu");
                if (parentSubmenu) {
                    parentSubmenu.classList.add("open");
                    const parentNode = parentSubmenu.parentElement;
                    const parentToggle = parentNode.querySelector(":scope > .menu-control .toggle");
                    if (parentToggle) parentToggle.textContent = "−";
                    const parentControl = parentNode.querySelector(":scope > .menu-control");
                    if (parentControl) parentControl.setAttribute("aria-expanded", "true");
                }
                if (matched.has(node)) {
                    const submenu = node.querySelector(":scope > .nav-submenu");
                    if (submenu) {
                        submenu.classList.add("open");
                        const toggle = node.querySelector(":scope > .menu-control .toggle");
                        if (toggle) toggle.textContent = "−";
                        const control = node.querySelector(":scope > .menu-control");
                        if (control) control.setAttribute("aria-expanded", "true");
                    }
                }
            }
        });
    }
};

window.filtrarMenu = function (texto) {
    const nav = document.getElementById("homeNav") || document.getElementById("adminNav");
    if (nav) window.MenuPortal.filter(nav, texto);
};
