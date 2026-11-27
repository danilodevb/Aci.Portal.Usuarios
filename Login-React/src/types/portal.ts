export type SystemRole = "admin" | "usuario";

export type Membership =
  | "Administrador"
  | "Empleado"
  | "Artista"
  | "Productor"
  | "Cliente"
  | "Proveedor"
  | "Radio o TV"
  | "Eventos";

export type WorkspaceKey =
  | "admin"
  | "empleado"
  | "artista"
  | "productor"
  | "cliente"
  | "proveedor"
  | "artistaprod";

export interface Session {
  usuario: string;
  nombre: string;
  correo: string;
  rol: SystemRole;
  tipoUsuario: string;
  estado: string;
  inicio: string;
}

export interface WidgetDefinition {
  id: string;
  title: string;
  size?: string;
  content: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icono?: string;
  roleSection?: string;
  children?: MenuItem[];
  widgets?: WidgetDefinition[];
}

export interface PortalStructure {
  title: string;
  menu: MenuItem[];
}

export interface WorkspaceSection {
  title: string;
  structureKey: string;
}
