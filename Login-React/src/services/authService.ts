import type { Membership, Session, WorkspaceKey } from "../types/portal";

interface DemoCredential {
  usuario: string;
  contrasena: string;
  nombre: string;
  correo: string;
  rol: Session["rol"];
  tipoUsuario: string;
  estado: string;
}

export const DEMO_USERS: DemoCredential[] = [
  { usuario: "1001", contrasena: "1001", nombre: "Administrador ACINPRO", correo: "admin@acinpro.local", rol: "admin", tipoUsuario: "Empleado", estado: "activo" },
  { usuario: "1002", contrasena: "1002", nombre: "Carlos Baquero", correo: "carlos2000ba@gmail.com", rol: "usuario", tipoUsuario: "Productor", estado: "pendiente_perfil" },
  { usuario: "1003", contrasena: "1003", nombre: "María López", correo: "maria@example.com", rol: "usuario", tipoUsuario: "Artista", estado: "pendiente_perfil" },
  { usuario: "1004", contrasena: "1004", nombre: "Pedro Ruiz", correo: "pedro@example.com", rol: "usuario", tipoUsuario: "Proveedor", estado: "pendiente_perfil" },
  { usuario: "1005", contrasena: "1005", nombre: "Ana Torres", correo: "ana@acinpro.local", rol: "usuario", tipoUsuario: "Empleado", estado: "pendiente_perfil" },
  { usuario: "1006", contrasena: "1006", nombre: "Carlos Andrés Bermúdez", correo: "artista.productor@example.com", rol: "usuario", tipoUsuario: "Artista, Productor", estado: "pendiente_perfil" },
  { usuario: "1007", contrasena: "1007", nombre: "Laura Castillo", correo: "laura@example.com", rol: "usuario", tipoUsuario: "Cliente", estado: "pendiente_perfil" }
];

const demoDelay = (milliseconds: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));

export async function authenticate(usuario: string, contrasena: string): Promise<Session> {
  await demoDelay(700);
  const found = DEMO_USERS.find(
    (candidate) => candidate.usuario === usuario.trim() && candidate.contrasena === contrasena
  );
  if (!found) throw new Error("Usuario o contraseña incorrectos. Verifica tus datos.");

  return {
    usuario: found.usuario,
    nombre: found.nombre,
    correo: found.correo,
    rol: found.rol,
    tipoUsuario: found.tipoUsuario,
    estado: found.estado,
    inicio: new Date().toISOString()
  };
}

const membershipByLabel = new Map<string, Membership>([
  ["administrador", "Administrador"],
  ["empleado", "Empleado"],
  ["artista", "Artista"],
  ["productor", "Productor"],
  ["cliente", "Cliente"],
  ["proveedor", "Proveedor"],
  ["radio o tv", "Radio o TV"],
  ["eventos", "Eventos"]
]);

export function getMemberships(session: Session): Membership[] {
  const memberships = session.tipoUsuario
    .split(",")
    .map((type) => membershipByLabel.get(type.trim().toLocaleLowerCase()))
    .filter((type): type is Membership => Boolean(type));

  if (session.rol === "admin") {
    return Array.from(new Set<Membership>(["Administrador", "Empleado", ...memberships]));
  }
  return Array.from(new Set(memberships));
}

export function getAccessibleWorkspaces(session: Session): WorkspaceKey[] {
  const memberships = getMemberships(session);
  if (session.rol === "admin") return ["admin"];

  const workspaces: WorkspaceKey[] = [];
  if (memberships.includes("Empleado")) workspaces.push("empleado");
  if (memberships.includes("Artista")) workspaces.push("artista");
  if (memberships.includes("Productor")) workspaces.push("productor");
  if (memberships.includes("Cliente")) workspaces.push("cliente");
  if (memberships.includes("Proveedor")) workspaces.push("proveedor");
  if (memberships.includes("Artista") && memberships.includes("Productor")) {
    workspaces.push("artistaprod");
  }
  return workspaces.length ? workspaces : ["artista"];
}

export function defaultWorkspace(session: Session): WorkspaceKey {
  if (session.rol === "admin") return "admin";
  const accessible = getAccessibleWorkspaces(session);
  if (accessible.includes("artistaprod")) return "artistaprod";
  const firstWorkspace = accessible[0];
  if (firstWorkspace) return firstWorkspace;
  return "artista";
}

export function hasWorkspaceAccess(session: Session, workspace: WorkspaceKey): boolean {
  return getAccessibleWorkspaces(session).includes(workspace);
}

export function workspacePath(workspace: WorkspaceKey): string {
  const paths: Record<WorkspaceKey, string> = {
    admin: "admin",
    empleado: "empleado",
    artista: "artista",
    productor: "productor",
    cliente: "cliente",
    proveedor: "proveedor",
    artistaprod: "artista-productor"
  };
  return `/${paths[workspace]}`;
}

export function parseMemberships(value: string): Membership[] {
  return value
    .split(",")
    .map((part) => membershipByLabel.get(part.trim().toLocaleLowerCase()))
    .filter((item): item is Membership => Boolean(item));
}

export function getWorkspaceTitle(workspace: WorkspaceKey): string {
  const titles: Record<WorkspaceKey, string> = {
    admin: "Administrador / Empleado",
    empleado: "Empleado",
    artista: "Artista",
    productor: "Productor",
    cliente: "Cliente",
    proveedor: "Proveedor",
    artistaprod: "Artista / Productor"
  };
  return titles[workspace];
}
