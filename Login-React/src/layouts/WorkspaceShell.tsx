import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  BarChart3,
  Bell,
  Check,
  CircleHelp,
  DollarSign,
  FileText,
  Grid2X2,
  House,
  LogOut,
  Menu as MenuIcon,
  Music2,
  Search,
  User,
  Users,
  X
} from "lucide-react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext
} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFeedback } from "../contexts/FeedbackContext";
import { getWorkspaceMenu, workspaceNames } from "../data/portalMenus";
import { getAccessibleWorkspaces, hasWorkspaceAccess, workspacePath } from "../services/authService";
import type { MenuItem, WorkspaceKey } from "../types/portal";
import { retainMenuAncestors, toggleExpandedMenuGroup } from "./menuState";

type IconComponent = typeof House;
const iconByKey: Record<string, IconComponent> = {
  home: House,
  user: User,
  users: Users,
  doc: FileText,
  chart: BarChart3,
  check: Check,
  money: DollarSign,
  music: Music2,
  grid: Grid2X2,
  help: CircleHelp
};

export interface WorkspaceOutletContext {
  workspace: WorkspaceKey;
  menu: MenuItem[];
  openProfile: () => void;
}

interface WorkspaceShellProps {
  workspace: WorkspaceKey;
}

function itemMatches(item: MenuItem, term: string): boolean {
  return !term
    || item.label.toLocaleLowerCase().includes(term)
    || Boolean(item.children?.some((child) => itemMatches(child, term)));
}

function findMenuItem(items: MenuItem[], id: string): MenuItem | null {
  for (const item of items) {
    if (item.id === id && item.widgets) return item;
    const found = item.children ? findMenuItem(item.children, id) : null;
    if (found) return found;
  }
  return null;
}

function MenuNode({
  item,
  depth,
  path,
  search,
  activeId,
  expanded,
  onToggle,
  onSelect
}: {
  item: MenuItem;
  depth: number;
  path: string;
  search: string;
  activeId: string;
  expanded: Set<string>;
  onToggle: (path: string) => void;
  onSelect: (item: MenuItem, path: string) => void;
}) {
  if (!itemMatches(item, search)) return null;
  const children = item.children || [];
  const hasChildren = children.length > 0;
  const isOpen = search.length > 0 || expanded.has(path);
  const Icon = depth === 0 && item.icono ? iconByKey[item.icono] || House : null;

  return (
    <div className="nav-grupo" data-menu-node="true" data-menu-label={item.label}>
      <button
        type="button"
        className={`${depth === 0 ? "admin-nav-item nav-grupo-header" : "nav-submenu-item"}${activeId === item.id ? " activo" : ""}`}
        aria-expanded={hasChildren ? isOpen : undefined}
        onClick={() => hasChildren ? onToggle(path) : onSelect(item, path)}
      >
        <span className="menu-control-label">
          {Icon && <Icon aria-hidden="true" />}
          <span>{item.label}</span>
        </span>
        {item.roleSection && <span className="menu-search-context">{item.roleSection}</span>}
        {hasChildren && <span className="toggle">{isOpen ? "−" : "+"}</span>}
      </button>
      {hasChildren && (
        <div className={`nav-submenu${depth > 0 ? " nav-submenu-nivel" : ""}${isOpen ? " open" : ""}`}>
          {children.map((child, index) => (
            <MenuNode
              key={`${path}-${child.id}-${index}`}
              item={child}
              depth={depth + 1}
              path={`${path}/${child.id}-${index}`}
              search={search}
              activeId={activeId}
              expanded={expanded}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function activeMenuId(pathname: string): string {
  const match = pathname.match(/\/module\/([^/]+)/);
  return match?.[1] || "";
}

export function useWorkspaceContext(): WorkspaceOutletContext {
  return useOutletContext<WorkspaceOutletContext>();
}

export function WorkspaceShell({ workspace }: WorkspaceShellProps) {
  const { session, signOut } = useAuth();
  const { showToast } = useFeedback();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    localStorage.getItem("acinpro_sidebar_colapsado") === "true"
  );
  const menu = useMemo(() => getWorkspaceMenu(workspace), [workspace]);

  useLayoutEffect(() => {
    document.body.classList.add("tema-claro");
    return () => document.body.classList.remove("tema-claro");
  }, []);

  useEffect(() => {
    if (!notificationsOpen) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (event.target instanceof Node && !notificationRef.current?.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNotificationsOpen(false);
    };

    document.addEventListener("click", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("click", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [notificationsOpen]);

  if (!session) return <Navigate to="/login" replace />;
  if (!hasWorkspaceAccess(session, workspace)) {
    return <Navigate to={workspacePath(getAccessibleWorkspaces(session)[0] || "artista")} replace />;
  }

  const workspaceChoices = getAccessibleWorkspaces(session);
  const currentPath = workspacePath(workspace);
  const currentItemId = activeMenuId(location.pathname);
  const currentItem = findMenuItem(menu, currentItemId);
  const isProfile = location.pathname.endsWith("/profile");
  const pageTitle = isProfile ? "Mi perfil" : currentItem?.label || "Dashboard";
  const searchTerm = search.trim().toLocaleLowerCase();

  function selectMenuItem(item: MenuItem, path: string) {
    if (window.matchMedia("(max-width: 900px)").matches) {
      setExpanded(new Set());
      setSearch("");
    } else {
      setExpanded((current) => retainMenuAncestors(current, path));
    }
    navigate(`${currentPath}/module/${item.id}`, { state: { menuItem: item } });
    setMobileMenuOpen(false);
  }

  function toggleGroup(path: string) {
    setExpanded((current) => toggleExpandedMenuGroup(current, path));
  }

  function toggleSidebar() {
    const next = !sidebarCollapsed;
    setSidebarCollapsed(next);
    localStorage.setItem("acinpro_sidebar_colapsado", String(next));
  }

  const outletContext: WorkspaceOutletContext = {
    workspace,
    menu,
    openProfile: () => navigate(`${currentPath}/profile`)
  };

  return (
    <div className={`admin-shell${sidebarCollapsed ? " sidebar-colapsado" : ""}${mobileMenuOpen ? " menu-responsive-abierto" : ""}`}>
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <img src="/assets/clave-sol.png" alt="" className="admin-logo-img" />
          <div className="admin-logo-texto">
            <strong>ACINPRO</strong>
            <span>{workspaceNames[workspace]}</span>
          </div>
        </div>
        <div className="sidebar-search">
          <Search className="icono-lupa" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar..."
            aria-label="Buscar en el menú"
          />
        </div>
        <nav className="admin-nav" aria-label={`Menú ${workspaceNames[workspace]}`}>
          <Link className={`admin-nav-item${location.pathname === currentPath ? " activo" : ""}`} to={currentPath}>
            <span className="menu-control-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              <span>Dashboard</span>
            </span>
          </Link>
          {menu.map((item, index) => (
            <MenuNode
              key={`${item.id}-${index}`}
              item={item}
              depth={0}
              path={`${item.id}-${index}`}
              search={searchTerm}
              activeId={currentItemId}
              expanded={expanded}
              onToggle={toggleGroup}
              onSelect={selectMenuItem}
            />
          ))}
        </nav>
      </aside>

      <main className="admin-main">
        <header className="top-header">
          <div className="workspace-header-left">
            <button
              className="btn-toggle-sidebar"
              type="button"
              title="Mostrar/ocultar menú"
              aria-label="Mostrar/ocultar menú"
              aria-expanded={mobileMenuOpen}
              onClick={() => {
                if (window.matchMedia("(max-width: 900px)").matches) setMobileMenuOpen((open) => !open);
                else toggleSidebar();
              }}
            >
              {mobileMenuOpen ? <X /> : <MenuIcon />}
            </button>
            <div className="breadcrumb">Inicio <span>/</span> <b>{pageTitle}</b></div>
          </div>
          <div className="user-info">
            {workspaceChoices.length > 1 && (
              <label className="workspace-switcher">
                <span className="sr-only">Cambiar espacio de trabajo</span>
                <select
                  aria-label="Cambiar espacio de trabajo"
                  value={workspace}
                  onChange={(event) => navigate(workspacePath(event.target.value as WorkspaceKey))}
                >
                  {workspaceChoices.map((choice) => (
                    <option key={choice} value={choice}>{workspaceNames[choice]}</option>
                  ))}
                </select>
              </label>
            )}
            <div className="notif-wrapper" ref={notificationRef}>
              <button
                className="notif-btn"
                type="button"
                title="Notificaciones"
                aria-label="Notificaciones (3 pendientes)"
                aria-expanded={notificationsOpen}
                aria-controls="notif-dropdown"
                onClick={() => setNotificationsOpen((open) => !open)}
              >
                <Bell aria-hidden="true" /><span className="notif-badge">3</span>
              </button>
              <div
                id="notif-dropdown"
                className={`notif-dropdown${notificationsOpen ? " show" : ""}`}
                aria-hidden={!notificationsOpen}
              >
                <div className="notif-header">Notificaciones</div>
                {["Nuevo usuario registrado", "Solicitud aprobada", "Documento actualizado"].map((notification) => (
                  <button
                    className="notif-item"
                    key={notification}
                    type="button"
                    onClick={() => {
                      setNotificationsOpen(false);
                      showToast(notification);
                    }}
                  >
                    {notification}
                  </button>
                ))}
              </div>
            </div>
            <button className="notif-text" type="button" onClick={outletContext.openProfile} title="Ver y editar mi perfil">Mi perfil</button>
            <button className="btn-salir-header" type="button" onClick={() => { signOut(); navigate("/login", { replace: true }); }}>
              <LogOut aria-hidden="true" /> Salir
            </button>
          </div>
        </header>
        <div className="workspace-content">
          <Outlet context={outletContext} />
        </div>
      </main>
    </div>
  );
}
