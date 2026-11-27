import { useState, type FormEvent } from "react";
import { PasswordField } from "../../components/common/PasswordField";
import { useAuth } from "../../contexts/AuthContext";
import { useFeedback } from "../../contexts/FeedbackContext";
import { useWorkspaceContext } from "../../layouts/WorkspaceShell";
import { getMemberships } from "../../services/authService";

type ProfileTab = "personal" | "bancaria" | "cuenta";

function BankAccount({ title, titular }: { title: string; titular: string }) {
  return (
    <section className="perfil-seccion">
      <h4>{title}</h4>
      <div className="perfil-grid cols-4">
        <div><label className="wf-label">Banco</label><select className="wf-input" defaultValue="Bancolombia"><option>Bancolombia</option><option>Davivienda</option><option>BBVA Colombia</option><option>Banco de Bogotá</option><option>Banco Popular</option></select></div>
        <div><label className="wf-label">Tipo de cuenta</label><select className="wf-input" defaultValue="Ahorros"><option>Ahorros</option><option>Corriente</option></select></div>
        <div><label className="wf-label">Número de cuenta</label><input className="wf-input" defaultValue="**** **** **** 4821" /></div>
        <div><label className="wf-label">Titular</label><input className="wf-input" defaultValue={titular} /></div>
      </div>
      <label className="wf-label">Certificación bancaria (PDF, no mayor a 30 días)</label>
      <div className="perfil-fila"><input type="file" className="wf-input" /><button className="wf-btn" type="button">Subir</button></div>
    </section>
  );
}

export function ProfilePage() {
  const { session } = useAuth();
  const { workspace } = useWorkspaceContext();
  const { showToast } = useFeedback();
  const [tab, setTab] = useState<ProfileTab>("personal");
  if (!session) return null;

  const memberships = getMemberships(session);
  const roles = memberships.filter((membership) => membership !== "Radio o TV" && membership !== "Eventos");
  const isMixed = roles.includes("Artista") && roles.includes("Productor");
  const identity = roles.includes("Proveedor") ? (
    <div className="perfil-grid cols-3">
      <div><label className="wf-label">Razón social</label><input className="wf-input" defaultValue="Suministros Musicales ABC S.A.S." /></div>
      <div><label className="wf-label">NIT</label><input className="wf-input" defaultValue="900.123.456-7" /></div>
      <div><label className="wf-label">Representante legal</label><input className="wf-input" defaultValue={session.nombre} /></div>
      <div><label className="wf-label">Correo corporativo</label><input className="wf-input" defaultValue={session.correo} /></div>
      <div><label className="wf-label">Teléfono</label><input className="wf-input" defaultValue="+57 601 555 1234" /></div>
      <div><label className="wf-label">Dirección</label><input className="wf-input" defaultValue="Calle 100 # 15-20, Bogotá" /></div>
    </div>
  ) : (
    <div className="perfil-grid cols-4">
      <div><label className="wf-label">Nombres</label><input className="wf-input" defaultValue={session.nombre} /></div>
      <div><label className="wf-label">Apellidos</label><input className="wf-input" defaultValue="Bermúdez Ruiz" /></div>
      <div><label className="wf-label">Tipo de documento</label><select className="wf-input" defaultValue="CC"><option>CC</option><option>CE</option><option>Pasaporte</option></select></div>
      <div><label className="wf-label">Número de documento</label><input className="wf-input" defaultValue="1.020.304.050" /></div>
      <div><label className="wf-label">Fecha de nacimiento</label><input type="date" className="wf-input" defaultValue="1990-05-14" /></div>
      <div><label className="wf-label">Correo electrónico</label><input type="email" className="wf-input" defaultValue={session.correo} /></div>
      <div><label className="wf-label">Teléfono</label><input className="wf-input" defaultValue="+57 300 000 0000" /></div>
      <div><label className="wf-label">Dirección</label><input className="wf-input" defaultValue="Carrera 45 # 22-10, Bogotá" /></div>
    </div>
  );

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showToast("Cambios guardados correctamente.");
  }

  return (
    <div className="canvas">
      <div className="widget-grid perfil-mode">
        <form className="perfil-page" onSubmit={save}>
          <div className="perfil-encabezado">
            <h3>Mi perfil</h3>
            <div className="perfil-roles">{roles.map((role) => <span className="perfil-chip" key={role}>{role}</span>)}</div>
          </div>
          <div className="perfil-tabs" role="tablist">
            {([
              ["personal", "Información personal"],
              ["bancaria", "Información bancaria"],
              ["cuenta", "Ajustes de cuenta"]
            ] as const).map(([key, label]) => (
              <button
                className={`perfil-tab${tab === key ? " active" : ""}`}
                type="button"
                role="tab"
                aria-selected={tab === key}
                key={key}
                onClick={() => setTab(key)}
              >
                {label}
              </button>
            ))}
          </div>
          {tab === "personal" && (
            <section className="perfil-tab-content active" role="tabpanel">
              <div className="perfil-seccion"><h4>Datos de identificación</h4>{identity}</div>
              <div className="perfil-seccion">
                <h4>Roles y vinculaciones</h4>
                <div className="perfil-roles">Vinculaciones activas: {roles.map((role) => <span className="perfil-chip" key={role}>{role}</span>)}</div>
              </div>
              <div className="perfil-acciones"><button className="wf-btn wf-btn-primary" type="submit">Guardar cambios</button></div>
            </section>
          )}
          {tab === "bancaria" && (
            <section className="perfil-tab-content active" role="tabpanel">
              {isMixed ? (
                <>
                  <div className="perfil-cuenta-compartida"><label><input type="checkbox" /> Usar la misma cuenta bancaria para regalías y facturación</label></div>
                  <div className="perfil-columnas cols-2">
                    <BankAccount title="Cuenta para regalías y anticipos (Artista)" titular={session.nombre} />
                    <BankAccount title="Cuenta para pagos de facturación (Productor)" titular={session.nombre} />
                  </div>
                </>
              ) : (
                <BankAccount
                  title={workspace === "admin" ? "Cuenta de nómina" : roles.includes("Artista") ? "Cuenta para regalías y anticipos" : roles.includes("Productor") ? "Cuenta para pagos de facturación" : "Cuenta bancaria"}
                  titular={session.nombre}
                />
              )}
              <div className="perfil-acciones"><button className="wf-btn wf-btn-primary" type="submit">Guardar cambios</button></div>
            </section>
          )}
          {tab === "cuenta" && (
            <section className="perfil-tab-content active" role="tabpanel">
              <div className="perfil-columnas cols-3">
                <div className="perfil-seccion">
                  <h4>Seguridad</h4>
                  <PasswordField id="current-password" label="Contraseña actual" autoComplete="current-password" />
                  <PasswordField id="new-password" label="Nueva contraseña" autoComplete="new-password" />
                  <PasswordField id="confirm-new-password" label="Confirmar nueva contraseña" autoComplete="new-password" />
                  <label className="perfil-check"><input type="checkbox" defaultChecked /> Autenticación en dos pasos (2FA)</label>
                </div>
                <div className="perfil-seccion">
                  <h4>Notificaciones</h4>
                  <label className="perfil-check"><input type="checkbox" defaultChecked /> Correo electrónico</label>
                  <label className="perfil-check"><input type="checkbox" /> SMS</label>
                  <label className="perfil-check"><input type="checkbox" defaultChecked /> Notificaciones en el portal</label>
                </div>
                <div className="perfil-seccion">
                  <h4>Preferencias</h4>
                  <label className="wf-label">Idioma</label><select className="wf-input"><option>Español</option><option>Inglés</option></select>
                  <label className="wf-label">Zona horaria</label><select className="wf-input"><option>(GMT-5) Bogotá</option><option>(GMT-5) Lima</option></select>
                </div>
              </div>
              <div className="perfil-acciones"><button className="wf-btn wf-btn-primary" type="submit">Guardar cambios</button></div>
            </section>
          )}
        </form>
      </div>
    </div>
  );
}

