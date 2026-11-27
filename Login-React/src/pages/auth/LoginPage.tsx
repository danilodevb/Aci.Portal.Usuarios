import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BrandStage } from "../../components/auth/BrandStage";
import { useAuth } from "../../contexts/AuthContext";
import { defaultWorkspace, workspacePath } from "../../services/authService";

export function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(localStorage.getItem("acinpro_usuario") || "");
  const [contrasena, setContrasena] = useState("");
  const [recordarme, setRecordarme] = useState(Boolean(localStorage.getItem("acinpro_usuario")));
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [estado, setEstado] = useState("");
  const [mostrarRecuperacion, setMostrarRecuperacion] = useState(false);
  const [shake, setShake] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEstado("");
    if (!usuario.trim() || !contrasena) {
      setEstado("Por favor, completa todos los campos.");
      return;
    }

    setEstado("Validando acceso...");
    try {
      const authenticated = await signIn(usuario, contrasena, recordarme);
      setEstado("Acceso correcto. Redirigiendo...");
      window.setTimeout(() => {
        navigate(workspacePath(defaultWorkspace(authenticated)), { replace: true });
      }, 500);
    } catch (error) {
      setEstado(error instanceof Error ? error.message : "No se pudo validar el acceso.");
      setMostrarRecuperacion(true);
      setShake(false);
      window.requestAnimationFrame(() => setShake(true));
    }
  }

  return (
    <div className="pantalla">
      <BrandStage />
      <section className="panel-login">
        <h1 className="titulo">Iniciar sesión<span className="subtitulo">Portal web Acinpro</span></h1>
        <form className={shake ? "shake" : ""} onSubmit={handleSubmit} autoComplete="on" noValidate>
          <div className="campo">
            <input
              id="usuario"
              name="usuario"
              type="text"
              placeholder="Correo electrónico"
              autoComplete="username"
              value={usuario}
              onChange={(event) => setUsuario(event.target.value)}
              required
            />
          </div>
          <div className="campo campo-password">
            <input
              id="contrasena"
              name="contrasena"
              type={mostrarPassword ? "text" : "password"}
              placeholder="Contraseña"
              autoComplete="current-password"
              value={contrasena}
              onChange={(event) => setContrasena(event.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setMostrarPassword((visible) => !visible)}
              aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {mostrarPassword ? <EyeOff id="eye-icon" /> : <Eye id="eye-icon" />}
            </button>
          </div>
          <div className="acciones">
            <label className="recordar">
              <input
                id="recordarme"
                type="checkbox"
                checked={recordarme}
                onChange={(event) => setRecordarme(event.target.checked)}
              />
              <span>Recordarme</span>
            </label>
            <button className="boton" type="submit">Ingresar</button>
          </div>
          {mostrarRecuperacion && <Link to="/recuperar" className="olvido">¿Olvidaste tu contraseña?</Link>}
          <Link to="/registro" className="olvido registro-link">¿No tienes cuenta? Crear una</Link>
          <div className="estado" aria-live="polite">{estado}</div>
        </form>
      </section>
    </div>
  );
}
