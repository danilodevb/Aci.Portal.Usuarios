window.DashboardView = {
    crearWidget(sesion) {
        const tipo = (sesion && sesion.tipoUsuario || "Usuario").toString();
        const esAdmin = sesion && sesion.rol === "admin";
        const etiquetaRol = esAdmin ? "Administrador / Empleado" : tipo;
        const resumen = esAdmin ? [
            { etiqueta: "Solicitudes pendientes", valor: 8, estado: "pendiente", detalle: "Cuentas por revisar" },
            { etiqueta: "Solicitudes aprobadas", valor: 24, estado: "aprobado", detalle: "Este mes" },
            { etiqueta: "Solicitudes rechazadas", valor: 3, estado: "rechazado", detalle: "Requieren seguimiento" },
            { etiqueta: "Usuarios activos", valor: 48, estado: "activo", detalle: "En el portal" }
        ] : [
            { etiqueta: "Pendientes", valor: tipo === "Proveedor" ? 5 : 3, estado: "pendiente", detalle: "Requieren atención" },
            { etiqueta: "En proceso", valor: tipo === "Empleado" ? 4 : 2, estado: "activo", detalle: "Seguimiento activo" },
            { etiqueta: "Aprobados", valor: tipo === "Artista" ? 12 : 8, estado: "aprobado", detalle: "Completados" },
            { etiqueta: "Rechazados", valor: 1, estado: "rechazado", detalle: "Requieren corrección" }
        ];

        const tipoNormalizado = tipo.toLowerCase();
        const actividadPorPerfil = esAdmin ? {
            descripcion: "Resumen de gestión administrativa y seguimiento de tus procesos internos como empleado.",
            filas: [
                ["Solicitud de afiliación", "Pendiente", "Hoy"],
                ["Solicitud de vacaciones", "En proceso", "Hoy"],
                ["Reporte del sistema", "Aprobado", "Ayer"]
            ],
            acciones: ["Revisar solicitudes", "Administrar usuarios", "Consultar reportes", "Consultar pagos", "Abrir capacitaciones"]
        } : /emplead/.test(tipoNormalizado) ? {
            descripcion: "Seguimiento de solicitudes, pagos y tareas internas.",
            filas: [
                ["Solicitud de vacaciones", "Pendiente", "Hoy"],
                ["Documento laboral", "En proceso", "Hoy"],
                ["Colilla de pago", "Aprobado", "Ayer"]
            ],
            acciones: ["Ver solicitudes", "Consultar pagos", "Abrir capacitaciones"]
        } : /proveedor/.test(tipoNormalizado) ? {
            descripcion: "Estado de documentos, facturas radicadas y pagos.",
            filas: [
                ["Factura RAD-2025-0457", "Pendiente", "Hoy"],
                ["Soportes de facturación", "En proceso", "Hoy"],
                ["Pago RAD-2025-0340", "Aprobado", "Ayer"]
            ],
            acciones: ["Radicar factura", "Renovar documentos", "Consultar pagos"]
        } : /cliente/.test(tipoNormalizado) ? {
            descripcion: "Resumen de trámites, certificados y solicitudes de servicio.",
            filas: [
                ["Solicitud #552", "Pendiente", "Hoy"],
                ["Actualización de documentos", "En proceso", "Hoy"],
                ["Certificado de paz y salvo", "Aprobado", "Ayer"]
            ],
            acciones: ["Consultar trámites", "Descargar certificados", "Solicitar información"]
        } : /artista/.test(tipoNormalizado) && /productor/.test(tipoNormalizado) ? {
            descripcion: "Vista conjunta de tus gestiones como artista y productor.",
            filas: [
                ["Actualización de repertorio", "Pendiente", "Hoy"],
                ["Registro de producción", "En proceso", "Hoy"],
                ["Liquidación de regalías", "Aprobado", "Ayer"]
            ],
            acciones: ["Consultar repertorio", "Registrar producción", "Revisar liquidaciones"]
        } : /productor/.test(tipoNormalizado) ? {
            descripcion: "Seguimiento de producciones, declaraciones y pagos.",
            filas: [
                ["Registro de producción", "Pendiente", "Hoy"],
                ["Declaración de uso", "En proceso", "Hoy"],
                ["Certificado tributario", "Aprobado", "Ayer"]
            ],
            acciones: ["Registrar producción", "Consultar declaraciones", "Revisar pagos"]
        } : {
            descripcion: "Resumen de repertorio, regalías y gestiones artísticas.",
            filas: [
                ["Actualización de repertorio", "Pendiente", "Hoy"],
                ["Liquidación de regalías", "En proceso", "Hoy"],
                ["Perfil artístico", "Aprobado", "Ayer"]
            ],
            acciones: ["Consultar repertorio", "Revisar regalías", "Actualizar perfil artístico"]
        };

        const tarjetas = resumen.map(item => `
            <article class="dashboard-card ${item.estado}">
                <div><span class="dashboard-card-label">${item.etiqueta}</span><strong class="dashboard-card-value">${item.valor}</strong></div>
                <span class="dashboard-card-detail">${item.detalle}</span>
            </article>
        `).join("");
        const filasActividad = actividadPorPerfil.filas.map(([actividad, estado, fecha]) =>
            `<tr><td>${actividad}</td><td>${estado}</td><td>${fecha}</td></tr>`
        ).join("");
        const accesosRapidos = actividadPorPerfil.acciones.map(accion =>
            `<button class="wf-btn" onclick="mostrarToast('Vista simulada: ${accion}')">${accion}</button>`
        ).join("");

        return {
            id: "dashboard-general",
            dashboard: true,
            title: "Resumen general",
            content: `
                <div class="dashboard-view">
                    <header class="dashboard-header">
                        <div>
                            <span class="dashboard-eyebrow">Panel principal · Datos de ejemplo</span>
                            <h2>Bienvenido, ${sesion.nombre || "Usuario"}</h2>
                            <p class="dashboard-description">${actividadPorPerfil.descripcion}</p>
                        </div>
                        <span class="dashboard-role">${etiquetaRol}</span>
                    </header>
                    <div class="dashboard-grid">${tarjetas}</div>
                    <div class="dashboard-lower">
                        <section class="dashboard-panel">
                            <h3>Actividad reciente</h3>
                            <table class="wf-table">
                                <thead><tr><th>Actividad</th><th>Estado</th><th>Fecha</th></tr></thead>
                                <tbody>${filasActividad}</tbody>
                            </table>
                        </section>
                        <section class="dashboard-panel">
                            <h3>Accesos rápidos</h3>
                            <div class="dashboard-quick-actions">${accesosRapidos}</div>
                        </section>
                    </div>
                </div>
            `
        };
    }
};
