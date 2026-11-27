import rawStructures from "./portalMenus.json";
import type { MenuItem, PortalStructure, WorkspaceKey } from "../types/portal";

export const portalStructures: Record<string, PortalStructure> = rawStructures;

const labels: Record<WorkspaceKey, string> = {
  admin: "ADMINISTRADOR",
  empleado: "EMPLEADO",
  artista: "ARTISTA",
  productor: "PRODUCTOR",
  cliente: "CLIENTE",
  proveedor: "PROVEEDOR",
  artistaprod: "ARTISTA / PRODUCTOR"
};

export function getWorkspaceMenu(workspace: WorkspaceKey): MenuItem[] {
  if (workspace === "admin") {
    return [
      {
        id: "seccion-admin",
        label: labels.admin,
        icono: "users",
        roleSection: labels.admin,
        children: portalStructures.admin.menu
      },
      {
        id: "seccion-empleado",
        label: labels.empleado,
        icono: "user",
        roleSection: labels.empleado,
        children: portalStructures.empleado.menu
      }
    ];
  }
  return portalStructures[workspace].menu;
}

export const workspaceNames: Record<WorkspaceKey, string> = {
  admin: "Administrador / Empleado",
  empleado: "Empleado",
  artista: "Artista",
  productor: "Productor",
  cliente: "Cliente",
  proveedor: "Proveedor",
  artistaprod: "Artista / Productor"
};
