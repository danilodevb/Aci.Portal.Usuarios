import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { BrandStage } from "../../components/auth/BrandStage";

export function RecoveryPage() {
  const [identificador, setIdentificador] = useState("");
  const [estado, setEstado] = useState("");
  const [confirmacion, setConfirmacion] = useState(false);
  const [correoMostrado, setCorreoMostrado] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEstado("");
    const value = identificador.trim();
    if (!value) {
      setEstado("Ingresa tu usuario o correo.");
      return;
    }
    setEstado("Verificando...");
    window.setTimeout(() => {
      setCorreoMostrado(value.includes("@") ? value : `la cuenta asociada a "${value}"`);
      setConfirmacion(true);
    }, 900);
  }

  return (
    <div className="pantalla">
      <BrandStage />
      <section className="panel-login">
        <h1 className="titulo">Recuperar acceso<span className="subtitulo">Portal web Acinpro</span></h1>
        {!confirmacion ? (
          <form onSubmit={handleSubmit} autoComplete="on" noValidate>
            <p className="aviso-credenciales">Ingresa tu usuario o correo para recuperar el acceso.</p>
            <div className="campo">
              <input
                id="identificador"
                type="text"
                placeholder="Usuario o correo electrónico"
                value={identificador}
                onChange={(event) => setIdentificador(event.target.value)}
                required
              />
            </div>
            <div className="acciones acciones-boton">
              <button className="boton boton-ancho" type="submit">Continuar</button>
            </div>
            <div className="estado" aria-live="polite">{estado}</div>
            <Link to="/" className="olvido">← Volver al login</Link>
          </form>
        ) : (
          <div id="confirmacionRec">
            <p>Si la cuenta existe, enviaremos las instrucciones a <strong>{correoMostrado}</strong>.</p>
            <Link to="/" className="olvido">← Volver al login</Link>
          </div>
        )}
      </section>
    </div>
  );
}
