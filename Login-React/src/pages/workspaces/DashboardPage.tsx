import { useAuth } from "../../contexts/AuthContext";
import { useFeedback } from "../../contexts/FeedbackContext";
import { useWorkspaceContext } from "../../layouts/WorkspaceShell";

interface ActivitySummary {
  description: string;
  rows: [string, string, string][];
  actions: string[];
  cards: { label: string; value: number; status: string; detail: string }[];
}

function getSummary(tipoUsuario: string, isAdmin: boolean): ActivitySummary {
  const type = tipoUsuario.toLocaleLowerCase();
  if (isAdmin) {
    return {
      description: "Resumen de gestión administrativa y seguimiento de tus procesos internos como empleado.",
      rows: [
        ["Solicitud de afiliación", "Pendiente", "Hoy"],
        ["Solicitud de vacaciones", "En proceso", "Hoy"],
        ["Reporte del sistema", "Aprobado", "Ayer"]
      ],
      actions: ["Revisar solicitudes", "Administrar usuarios", "Consultar reportes", "Consultar pagos", "Abrir capacitaciones"],
      cards: [
        { label: "Solicitudes pendientes", value: 8, status: "pendiente", detail: "Cuentas por revisar" },
        { label: "Solicitudes aprobadas", value: 24, status: "aprobado", detail: "Este mes" },
        { label: "Solicitudes rechazadas", value: 3, status: "rechazado", detail: "Requieren seguimiento" },
        { label: "Usuarios activos", value: 48, status: "activo", detail: "En el portal" }
      ]
    };
  }

  const cards = [
    { label: "Pendientes", value: type.includes("proveedor") ? 5 : 3, status: "pendiente", detail: "Requieren atención" },
    { label: "En proceso", value: type.includes("empleado") ? 4 : 2, status: "activo", detail: "Seguimiento activo" },
    { label: "Aprobados", value: type.includes("artista") ? 12 : 8, status: "aprobado", detail: "Completados" },
    { label: "Rechazados", value: 1, status: "rechazado", detail: "Requieren corrección" }
  ];

  if (type.includes("empleado")) {
    return {
      description: "Seguimiento de solicitudes, pagos y tareas internas.",
      rows: [["Solicitud de vacaciones", "Pendiente", "Hoy"], ["Documento laboral", "En proceso", "Hoy"], ["Colilla de pago", "Aprobado", "Ayer"]],
      actions: ["Ver solicitudes", "Consultar pagos", "Abrir capacitaciones"],
      cards
    };
  }
  if (type.includes("proveedor")) {
    return {
      description: "Estado de documentos, facturas radicadas y pagos.",
      rows: [["Factura RAD-2025-0457", "Pendiente", "Hoy"], ["Soportes de facturación", "En proceso", "Hoy"], ["Pago RAD-2025-0340", "Aprobado", "Ayer"]],
      actions: ["Radicar factura", "Renovar documentos", "Consultar pagos"],
      cards
    };
  }
  if (type.includes("cliente")) {
    return {
      description: "Resumen de trámites, certificados y solicitudes de servicio.",
      rows: [["Solicitud #552", "Pendiente", "Hoy"], ["Actualización de documentos", "En proceso", "Hoy"], ["Certificado de paz y salvo", "Aprobado", "Ayer"]],
      actions: ["Consultar trámites", "Descargar certificados", "Solicitar información"],
      cards
    };
  }
  if (type.includes("artista") && type.includes("productor")) {
    return {
      description: "Vista conjunta de tus gestiones como artista y productor.",
      rows: [["Actualización de repertorio", "Pendiente", "Hoy"], ["Registro de producción", "En proceso", "Hoy"], ["Liquidación de regalías", "Aprobado", "Ayer"]],
      actions: ["Consultar repertorio", "Registrar producción", "Revisar liquidaciones"],
      cards
    };
  }
  if (type.includes("productor")) {
    return {
      description: "Seguimiento de producciones, declaraciones y pagos.",
      rows: [["Registro de producción", "Pendiente", "Hoy"], ["Declaración de uso", "En proceso", "Hoy"], ["Certificado tributario", "Aprobado", "Ayer"]],
      actions: ["Registrar producción", "Consultar declaraciones", "Revisar pagos"],
      cards
    };
  }
  return {
    description: "Resumen de repertorio, regalías y gestiones artísticas.",
    rows: [["Actualización de repertorio", "Pendiente", "Hoy"], ["Liquidación de regalías", "En proceso", "Hoy"], ["Perfil artístico", "Aprobado", "Ayer"]],
    actions: ["Consultar repertorio", "Revisar regalías", "Actualizar perfil artístico"],
    cards
  };
}

export function DashboardPage() {
  const { session } = useAuth();
  const { showToast } = useFeedback();
  const { workspace } = useWorkspaceContext();
  if (!session) return null;

  const summary = getSummary(session.tipoUsuario, session.rol === "admin");
  const roleLabel = workspace === "admin" ? "Administrador / Empleado" : session.tipoUsuario;

  return (
    <div className="canvas dashboard-mode">
      <div className="widget-grid dashboard-mode">
        <div className="dashboard-view">
          <header className="dashboard-header">
            <div>
              <span className="dashboard-eyebrow">Panel principal · Datos de ejemplo</span>
              <h2>Bienvenido, {session.nombre || "Usuario"}</h2>
              <p className="dashboard-description">{summary.description}</p>
            </div>
            <span className="dashboard-role">{roleLabel}</span>
          </header>
          <div className="dashboard-grid">
            {summary.cards.map((card) => (
              <article className={`dashboard-card ${card.status}`} key={card.label}>
                <div><span className="dashboard-card-label">{card.label}</span><strong className="dashboard-card-value">{card.value}</strong></div>
                <span className="dashboard-card-detail">{card.detail}</span>
              </article>
            ))}
          </div>
          <div className="dashboard-lower">
            <section className="dashboard-panel">
              <h3>Actividad reciente</h3>
              <table className="wf-table">
                <thead><tr><th>Actividad</th><th>Estado</th><th>Fecha</th></tr></thead>
                <tbody>
                  {summary.rows.map(([activity, status, date]) => (
                    <tr key={activity}><td>{activity}</td><td>{status}</td><td>{date}</td></tr>
                  ))}
                </tbody>
              </table>
            </section>
            <section className="dashboard-panel">
              <h3>Accesos rápidos</h3>
              <div className="dashboard-quick-actions">
                {summary.actions.map((action) => (
                  <button className="wf-btn" type="button" key={action} onClick={() => showToast(`Vista simulada: ${action}`)}>
                    {action}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
