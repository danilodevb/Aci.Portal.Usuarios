import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { BrandStage } from "../../components/auth/BrandStage";
import { useFeedback } from "../../contexts/FeedbackContext";
import { saveRegistration, validateRegistration } from "../../services/registrationService";

const userTypes = ["Productor", "Artista", "Proveedor", "Empleado", "Radio o TV", "Eventos"];

export function RegistrationPage() {
  const { showToast } = useFeedback();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [tipoIdentificacion, setTipoIdentificacion] = useState("");
  const [documento, setDocumento] = useState("");
  const [tiposUsuario, setTiposUsuario] = useState<string[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [estado, setEstado] = useState("");
  const [enviado, setEnviado] = useState(false);

  function toggleType(type: string, checked: boolean) {
    setTiposUsuario((current) =>
      checked ? [...current, type] : current.filter((value) => value !== type)
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEstado("");
    const data = { nombre, correo, tipoIdentificacion, documento, tiposUsuario, acceptedTerms };
    const validation = validateRegistration(data);
    if (validation) {
      setEstado(validation);
      return;
    }

    setEstado("Enviando solicitud...");
    await new Promise<void>((resolve) => window.setTimeout(resolve, 800));
    try {
      saveRegistration(data);
      setEnviado(true);
      setEstado("");
      showToast("Solicitud enviada. Te notificaremos cuando sea revisada.");
      window.setTimeout(() => { window.location.assign("/"); }, 4000);
    } catch (error) {
      setEstado(error instanceof Error ? error.message : "No se pudo guardar la solicitud.");
    }
  }

  return (
    <div className="pantalla">
      <BrandStage />
      <section className="panel-login panel-registro">
        <h1 className="titulo">Crear cuenta<span className="subtitulo">Portal web Acinpro</span></h1>
        <p className="aviso-credenciales">
          <strong>Importante:</strong> Al realizar esta solicitud, entrará en proceso de evaluación. Si es aceptada,
          recibirá en su correo electrónico las <em>credenciales</em> de acceso al portal.
        </p>
        <form onSubmit={handleSubmit} autoComplete="on" noValidate>
          <div className="campo">
            <input id="nombre" name="nombre" type="text" placeholder="Nombre completo" autoComplete="name" value={nombre} onChange={(event) => setNombre(event.target.value)} required />
          </div>
          <div className="campo">
            <input id="correo" name="correo" type="email" placeholder="Correo electrónico" autoComplete="email" value={correo} onChange={(event) => setCorreo(event.target.value)} required />
          </div>
          <div className="campo campo-select">
            <select id="tipoIdentificacion" value={tipoIdentificacion} onChange={(event) => setTipoIdentificacion(event.target.value)} required>
              <option value="" disabled>Tipo de identificación</option>
              <option value="CC">CC</option>
              <option value="TI">TI</option>
              <option value="NIT">NIT</option>
            </select>
            <span className="select-flecha" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
            </span>
          </div>
          <div className="campo">
            <input id="documento" name="documento" type="text" placeholder="Número de identificación" inputMode="numeric" value={documento} onChange={(event) => setDocumento(event.target.value)} required />
          </div>
          <h3 className="perfil-seccion registro-tipo-titulo">Tipo de usuario</h3>
          <div className="tipo-usuario-grid">
            {userTypes.map((type) => (
              <label className="recordar" key={type}>
                <input type="checkbox" checked={tiposUsuario.includes(type)} onChange={(event) => toggleType(type, event.target.checked)} />
                <span>{type}</span>
              </label>
            ))}
          </div>
          <div className="acciones acciones-registro">
            <label className="recordar recordar-largo">
              <input id="terminos" type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} required />
              <span>
                Acepto el{" "}
                <a
                  href="https://asociacion-colombiana-de-interpretes-productores.docuware.cloud/docuware/formsweb/web-autorizacion-tratamiento-datos-personales"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="enlace-terminos"
                >
                  tratamiento de datos personales
                </a>
              </span>
            </label>
          </div>
          <div className="acciones acciones-boton">
            <button className="boton boton-ancho" type="submit" disabled={enviado}>Solicitar</button>
          </div>
          <div className="estado" aria-live="polite">{estado}</div>
          <Link to="/" className="olvido">← Volver al login</Link>
        </form>
      </section>
      {enviado && (
        <div className="toast visible" role="status">
          <div className="toast-icono">✓</div>
          <div className="toast-texto">
            <strong>¡Solicitud enviada!</strong>
            <span>Cuando sea aprobada recibirás tu usuario y contraseña en el correo registrado.</span>
          </div>
        </div>
      )}
    </div>
  );
}
