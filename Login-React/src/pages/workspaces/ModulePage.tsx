import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { WidgetContent } from "../../components/common/WidgetContent";
import { useFeedback } from "../../contexts/FeedbackContext";
import { useWorkspaceContext } from "../../layouts/WorkspaceShell";
import type { MenuItem, WidgetDefinition } from "../../types/portal";

function findItem(items: MenuItem[], id: string): MenuItem | null {
  for (const item of items) {
    if (item.id === id && item.widgets) return item;
    const found = item.children ? findItem(item.children, id) : null;
    if (found) return found;
  }
  return null;
}

function widgetSpan(size: string | undefined, axis: "w" | "h", fallback: number): number {
  const value = size?.match(new RegExp(`\\b${axis}-(\\d+)`))?.[1];
  return Math.max(1, Math.min(axis === "w" ? 12 : 12, Number(value || fallback)));
}

export function ModulePage() {
  const { moduleId = "" } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { workspace, menu, openProfile } = useWorkspaceContext();
  const { showToast } = useFeedback();
  const passedItem = (location.state as { menuItem?: MenuItem } | null)?.menuItem;
  const item = passedItem?.id === moduleId ? passedItem : findItem(menu, moduleId);
  const storageKey = `acinpro_react_widgets_${workspace}_${moduleId}`;
  const [widgets, setWidgets] = useState<WidgetDefinition[]>(item?.widgets || []);
  const [minimized, setMinimized] = useState<string[]>([]);
  const [fixed, setFixed] = useState<string[]>([]);

  useEffect(() => {
    if (!item) {
      navigate(`/${workspace}`, { replace: true });
      return;
    }
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const state: unknown = JSON.parse(stored);
      if (!Array.isArray(state)) throw new Error("La distribución guardada de widgets es inválida.");
      const orderedIds = state.filter((id): id is string => typeof id === "string");
      const ordered = orderedIds.map((id) => item.widgets?.find((widget) => widget.id === id)).filter((widget): widget is WidgetDefinition => Boolean(widget));
      const remaining = (item.widgets || []).filter((widget) => !orderedIds.includes(widget.id));
      setWidgets([...ordered, ...remaining]);
    } else {
      setWidgets(item.widgets || []);
    }
  }, [item, navigate, storageKey, workspace]);

  const hiddenWidgets = useMemo(
    () => (item?.widgets || []).filter((widget) => !widgets.some((visible) => visible.id === widget.id)),
    [item, widgets]
  );

  if (!item) return null;

  function reorder(fromId: string, toId: string) {
    setWidgets((current) => {
      const from = current.findIndex((widget) => widget.id === fromId);
      const to = current.findIndex((widget) => widget.id === toId);
      if (from < 0 || to < 0 || from === to) return current;
      const next = [...current];
      const [moved] = next.splice(from, 1);
      if (!moved) return current;
      next.splice(to, 0, moved);
      localStorage.setItem(storageKey, JSON.stringify(next.map((widget) => widget.id)));
      return next;
    });
  }

  function restoreWidget(widget: WidgetDefinition) {
    setWidgets((current) => [...current, widget]);
  }

  function closeWidget(widget: WidgetDefinition) {
    setWidgets((current) => current.filter((visible) => visible.id !== widget.id));
    setMinimized((current) => current.filter((id) => id !== widget.id));
    setFixed((current) => current.filter((id) => id !== widget.id));
  }

  return (
    <>
      <div className="toolbar">
        <span className="toolbar-label">Acciones disponibles:</span>
        {item.widgets?.map((widget) => (
          <button
            className="draggable-chip"
            key={widget.id}
            type="button"
            onClick={() => {
              if (widgets.some((visible) => visible.id === widget.id)) {
                showToast("Esta herramienta ya está en pantalla");
              } else restoreWidget(widget);
            }}
          >
            {widget.title}
          </button>
        ))}
      </div>
      <div className="canvas">
        {widgets.length === 0 ? (
          <div className="module-empty">Selecciona una herramienta de la barra de acciones para agregarla al espacio de trabajo.</div>
        ) : (
          <div className="widget-grid">
            {widgets.map((widget) => {
              const isMinimized = minimized.includes(widget.id);
              const isFixed = fixed.includes(widget.id);
              return (
                <article
                  className={`widget${isFixed ? " widget-fijo" : ""}${isMinimized ? " minimizado" : ""}`}
                  key={widget.id}
                  style={{
                    gridColumn: `span ${widgetSpan(widget.size, "w", 6)}`,
                    gridRowEnd: isMinimized ? "span 1" : `span ${widgetSpan(widget.size, "h", 3)}`,
                    resize: "both",
                    minWidth: 180,
                    minHeight: isMinimized ? 48 : 100
                  }}
                  draggable={!isFixed}
                  onDragStart={(event) => event.dataTransfer.setData("text/plain", widget.id)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    reorder(event.dataTransfer.getData("text/plain"), widget.id);
                  }}
                >
                  <header className="widget-head">
                    <span>{widget.title}</span>
                    <span className="widget-tools">
                      <button className="widget-btn" type="button" title={isMinimized ? "Restaurar" : "Minimizar"} onClick={() => setMinimized((current) => isMinimized ? current.filter((id) => id !== widget.id) : [...current, widget.id])}>{isMinimized ? "+" : "−"}</button>
                      <button className="widget-btn" type="button" title={isFixed ? "Desfijar" : "Fijar"} onClick={() => setFixed((current) => isFixed ? current.filter((id) => id !== widget.id) : [...current, widget.id])}>{isFixed ? "Fijo" : "Fijar"}</button>
                      <button className="widget-btn" type="button" title="Cerrar" onClick={() => closeWidget(widget)}>×</button>
                    </span>
                  </header>
                  {!isMinimized && (
                    <div className="widget-body">
                      <WidgetContent content={widget.content} onOpenProfile={openProfile} />
                    </div>
                  )}
                  <div className="widget-resize" />
                </article>
              );
            })}
          </div>
        )}
        {hiddenWidgets.length > 0 && <span className="sr-only">{hiddenWidgets.length} herramientas disponibles para agregar.</span>}
      </div>
    </>
  );
}
