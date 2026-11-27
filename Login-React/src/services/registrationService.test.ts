import { beforeEach, describe, expect, it } from "vitest";
import {
  saveRegistration,
  validateRegistration,
  type RegistrationInput
} from "./registrationService";

const validInput: RegistrationInput = {
  nombre: "María López",
  correo: "maria@example.com",
  tipoIdentificacion: "CC",
  documento: "12345678",
  tiposUsuario: ["Artista", "Productor"],
  acceptedTerms: true
};

describe("solicitudes de registro", () => {
  beforeEach(() => localStorage.clear());

  it("valida vinculaciones combinadas conservando validaciones originales", () => {
    expect(validateRegistration(validInput)).toBeNull();
    expect(validateRegistration({ ...validInput, tiposUsuario: [] })).toContain("Selecciona");
    expect(validateRegistration({ ...validInput, documento: "12a456" })).toContain("6 y 15");
  });

  it("persiste localmente una solicitud con sus tipos de usuario", () => {
    saveRegistration(validInput);
    const requests = JSON.parse(localStorage.getItem("acinpro_solicitudes") || "[]") as Array<{ tipoUsuario: string; estado: string }>;
    expect(requests).toHaveLength(1);
    expect(requests[0]?.tipoUsuario).toBe("Artista, Productor");
    expect(requests[0]?.estado).toBe("pendiente");
  });
});
