import { Navigate, Route, Routes, useParams } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "./contexts/AuthContext";
import { AdminLayout } from "./layouts/workspaces/AdminLayout";
import { ArtistLayout } from "./layouts/workspaces/ArtistLayout";
import { ArtistProducerLayout } from "./layouts/workspaces/ArtistProducerLayout";
import { ClientLayout } from "./layouts/workspaces/ClientLayout";
import { EmployeeLayout } from "./layouts/workspaces/EmployeeLayout";
import { ProducerLayout } from "./layouts/workspaces/ProducerLayout";
import { ProviderLayout } from "./layouts/workspaces/ProviderLayout";
import { LoginPage } from "./pages/auth/LoginPage";
import { RecoveryPage } from "./pages/auth/RecoveryPage";
import { RegistrationPage } from "./pages/auth/RegistrationPage";
import { DashboardPage } from "./pages/workspaces/DashboardPage";
import { ModulePage } from "./pages/workspaces/ModulePage";
import { ProfilePage } from "./pages/workspaces/ProfilePage";
import { defaultWorkspace, hasWorkspaceAccess, workspacePath } from "./services/authService";
import type { WorkspaceKey } from "./types/portal";

function GuestRoute({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  return session
    ? <Navigate to={workspacePath(defaultWorkspace(session))} replace />
    : children;
}

function HomeRedirect() {
  const { session } = useAuth();
  return session
    ? <Navigate to={workspacePath(defaultWorkspace(session))} replace />
    : <Navigate to="/login" replace />;
}

function ProfileRoute() {
  const { session } = useAuth();
  const { profileKey = "" } = useParams();
  if (!session) return <Navigate to="/login" replace />;

  const normalized = profileKey.toLocaleLowerCase().replace(/^perfil-/, "").replace(/\.html$/, "");
  const routeByProfile: Record<string, WorkspaceKey> = {
    admin: "admin",
    empleado: "empleado",
    artista: "artista",
    productor: "productor",
    cliente: "cliente",
    proveedor: "proveedor",
    "artista-productor": "artistaprod"
  };
  const requested = routeByProfile[normalized];
  const target = requested && hasWorkspaceAccess(session, requested)
    ? requested
    : defaultWorkspace(session);
  return <Navigate to={`${workspacePath(target)}/profile`} replace />;
}

function WorkspaceRoutes({ path, layout }: { path: string; layout: ReactNode }) {
  return (
    <Route path={path} element={layout}>
      <Route index element={<DashboardPage />} />
      <Route path="module/:moduleId" element={<ModulePage />} />
      <Route path="profile" element={<ProfilePage />} />
    </Route>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
      <Route path="/recuperar" element={<GuestRoute><RecoveryPage /></GuestRoute>} />
      <Route path="/registro" element={<GuestRoute><RegistrationPage /></GuestRoute>} />
      <Route path="/perfiles/:profileKey" element={<ProfileRoute />} />
      {WorkspaceRoutes({ path: "/admin", layout: <AdminLayout /> })}
      {WorkspaceRoutes({ path: "/empleado", layout: <EmployeeLayout /> })}
      {WorkspaceRoutes({ path: "/artista", layout: <ArtistLayout /> })}
      {WorkspaceRoutes({ path: "/productor", layout: <ProducerLayout /> })}
      {WorkspaceRoutes({ path: "/cliente", layout: <ClientLayout /> })}
      {WorkspaceRoutes({ path: "/proveedor", layout: <ProviderLayout /> })}
      {WorkspaceRoutes({ path: "/artista-productor", layout: <ArtistProducerLayout /> })}
      <Route path="/home" element={<HomeRedirect />} />
      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  );
}
