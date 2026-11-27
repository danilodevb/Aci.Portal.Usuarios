import { describe, expect, it } from "vitest";
import { retainMenuAncestors, toggleExpandedMenuGroup } from "./menuState";

describe("estado de menús acordeón", () => {
  it("cierra los grupos hermanos cuando se abre otro grupo principal", () => {
    expect(toggleExpandedMenuGroup(new Set(["admin-0"]), "employee-1"))
      .toEqual(new Set(["employee-1"]));
  });

  it("mantiene los padres abiertos y cierra las ramas hermanas al expandir un submenú", () => {
    expect(toggleExpandedMenuGroup(
      new Set(["admin-0", "admin-0/social-0", "employee-1"]),
      "admin-0/social-1"
    )).toEqual(new Set(["admin-0", "admin-0/social-1"]));
  });

  it("cierra la rama y sus descendientes al volver a pulsar el grupo abierto", () => {
    expect(toggleExpandedMenuGroup(
      new Set(["admin-0", "admin-0/social-1"]),
      "admin-0"
    )).toEqual(new Set());
  });

  it("al seleccionar una opción conserva solo los grupos de su ruta", () => {
    expect(retainMenuAncestors(
      new Set(["admin-0", "employee-1", "admin-0/social-1"]),
      "admin-0/social-1/users-2"
    )).toEqual(new Set(["admin-0", "admin-0/social-1"]));
  });
});
