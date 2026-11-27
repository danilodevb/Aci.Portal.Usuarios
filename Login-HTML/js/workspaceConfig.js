window.AcinproWorkspace = {
    routes: {
        admin: { path: "admin.html", structure: "admin" },
        empleado: { path: "empleado.html", structure: "empleado" },
        artista: { path: "artista.html", structure: "artista" },
        productor: { path: "productor.html", structure: "productor" },
        cliente: { path: "cliente.html", structure: "cliente" },
        artistaprod: { path: "artista-productor.html", structure: "artistaprod" },
        proveedor: { path: "proveedor.html", structure: "proveedor" }
    },

    obtenerSesion() {
        return JSON.parse(localStorage.getItem("acinpro_sesion") || "null");
    },

    resolver(sesion) {
        if (!sesion) return null;
        if (sesion.rol === "admin") return "admin";

        const tipos = (sesion.tipoUsuario || "")
            .toString()
            .split(",")
            .map(tipo => tipo.trim().toLocaleLowerCase());

        if (tipos.includes("artista") && tipos.includes("productor")) return "artistaprod";
        if (tipos.includes("empleado")) return "empleado";
        if (tipos.includes("artista")) return "artista";
        if (tipos.includes("productor")) return "productor";
        if (tipos.includes("cliente")) return "cliente";
        if (tipos.includes("proveedor")) return "proveedor";
        return "artista";
    },

    rutaPara(sesion) {
        const key = this.resolver(sesion);
        return this.routes[key].path;
    },

    exigir(workspace) {
        const sesion = this.obtenerSesion();
        if (!sesion) {
            window.location.replace("index.html");
            return null;
        }

        const actual = this.resolver(sesion);
        if (actual !== workspace) {
            window.location.replace(this.routes[actual].path);
            return null;
        }
        return sesion;
    },

    redirigirDesdeInicio() {
        const sesion = this.obtenerSesion();
        if (!sesion) {
            window.location.replace("index.html");
            return;
        }
        window.location.replace(this.rutaPara(sesion));
    }
};
