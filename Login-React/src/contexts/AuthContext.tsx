import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren
} from "react";
import { authenticate } from "../services/authService";
import type { Session } from "../types/portal";

interface AuthContextValue {
  session: Session | null;
  signIn: (usuario: string, contrasena: string, remember: boolean) => Promise<Session>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredSession(): Session | null {
  const stored = localStorage.getItem("acinpro_sesion");
  if (!stored) return null;
  const session: unknown = JSON.parse(stored);
  if (!isSession(session)) {
    throw new Error("La sesión guardada tiene un formato inválido.");
  }
  return session;
}

function isSession(value: unknown): value is Session {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return typeof record.usuario === "string"
    && typeof record.nombre === "string"
    && typeof record.correo === "string"
    && (record.rol === "admin" || record.rol === "usuario")
    && typeof record.tipoUsuario === "string"
    && typeof record.estado === "string"
    && typeof record.inicio === "string";
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(readStoredSession);

  const signIn = useCallback(async (usuario: string, contrasena: string, remember: boolean) => {
    const authenticated = await authenticate(usuario, contrasena);
    localStorage.setItem("acinpro_sesion", JSON.stringify(authenticated));
    if (remember) localStorage.setItem("acinpro_usuario", usuario.trim());
    else localStorage.removeItem("acinpro_usuario");
    setSession(authenticated);
    return authenticated;
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("acinpro_sesion");
    setSession(null);
  }, []);

  const value = useMemo(() => ({ session, signIn, signOut }), [session, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth debe usarse dentro de AuthProvider.");
  return value;
}
