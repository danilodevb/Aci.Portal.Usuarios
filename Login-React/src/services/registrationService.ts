import { parseMemberships } from "./authService";

export interface RegistrationRequest {
  nombre: string;
  correo: string;
  tipoIdentificacion: string;
  documento: string;
  tipoUsuario: string;
  estado: "pendiente";
  creadoEn: string;
  id: number;
}

export interface RegistrationInput {
  nombre: string;
  correo: string;
  tipoIdentificacion: string;
  documento: string;
  tiposUsuario: string[];
  acceptedTerms: boolean;
}

export function validateRegistration(input: RegistrationInput): string | null {
  if (!input.nombre.trim() || !input.correo.trim() || !input.tipoIdentificacion || !input.documento.trim()) {
    return "Por favor, completa todos los campos personales.";
  }
  if (input.tiposUsuario.length === 0) return "Selecciona al menos un tipo de usuario.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.correo.trim())) {
    return "El correo electrónico no es válido.";
  }
  if (!/^\d{6,15}$/.test(input.documento.trim())) {
    return "El número de identificación debe tener entre 6 y 15 dígitos.";
  }
  if (!input.acceptedTerms) {
    return "Debes aceptar el tratamiento de datos personales para continuar.";
  }
  if (parseMemberships(input.tiposUsuario.join(", ")).length !== input.tiposUsuario.length) {
    return "Selecciona tipos de usuario válidos.";
  }
  return null;
}

export function saveRegistration(input: RegistrationInput): void {
  const stored = localStorage.getItem("acinpro_solicitudes") || "[]";
  const requests: unknown = JSON.parse(stored);
  if (!Array.isArray(requests)) throw new Error("Las solicitudes guardadas tienen un formato inválido.");
  const request: RegistrationRequest = {
    id: Date.now(),
    nombre: input.nombre.trim(),
    correo: input.correo.trim().toLowerCase(),
    tipoIdentificacion: input.tipoIdentificacion,
    documento: input.documento.trim(),
    tipoUsuario: input.tiposUsuario.join(", "),
    estado: "pendiente",
    creadoEn: new Date().toISOString()
  };
  localStorage.setItem("acinpro_solicitudes", JSON.stringify([...requests, request]));
}
