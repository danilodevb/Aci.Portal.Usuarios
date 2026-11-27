import { describe, expect, it } from "vitest";
import {
  defaultWorkspace,
  getAccessibleWorkspaces,
  getMemberships,
  workspacePath
} from "./authService";
import type { Session } from "../types/portal";

function session(overrides: Partial<Session> = {}): Session {
  return {
    usuario: "demo",
    nombre: "Usuario de prueba",
    correo: "demo@example.com",
    rol: "usuario",
    tipoUsuario: "Artista",
    estado: "activo",
    inicio: "2026-01-01T00:00:00.000Z",
    ...overrides
  };
}

describe("workspaces por rol y vinculación", () => {
  it("mantiene administrador y empleado como vinculaciones de una cuenta administrativa", () => {
    const admin = session({ rol: "admin", tipoUsuario: "Empleado" });
    expect(getMemberships(admin)).toEqual(["Administrador", "Empleado"]);
    expect(getAccessibleWorkspaces(admin)).toEqual(["admin"]);
    expect(defaultWorkspace(admin)).toBe("admin");
  });

  it("conserva las vinculaciones múltiples y prioriza el espacio combinado", () => {
    const mixed = session({ tipoUsuario: "Artista, Productor" });
    expect(getMemberships(mixed)).toEqual(["Artista", "Productor"]);
    expect(getAccessibleWorkspaces(mixed)).toEqual(["artista", "productor", "artistaprod"]);
    expect(defaultWorkspace(mixed)).toBe("artistaprod");
  });

  it("no descarta otras vinculaciones al resolver combinaciones no predefinidas", () => {
    const providerArtist = session({ tipoUsuario: "Proveedor, Artista" });
    expect(getAccessibleWorkspaces(providerArtist)).toEqual(["artista", "proveedor"]);
  });

  it("mantiene un espacio de compatibilidad para tipos aún sin módulos propios", () => {
    const radio = session({ tipoUsuario: "Radio o TV" });
    expect(getAccessibleWorkspaces(radio)).toEqual(["artista"]);
    expect(workspacePath("artistaprod")).toBe("/artista-productor");
  });
});
