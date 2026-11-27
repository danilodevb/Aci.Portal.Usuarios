import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeedbackProvider } from "../../contexts/FeedbackContext";
import { WidgetContent } from "./WidgetContent";

describe("contenido de módulos en React", () => {
  it("conecta las acciones de widgets a feedback React sin cargar los scripts antiguos", () => {
    render(
      <FeedbackProvider>
        <WidgetContent
          content={'<label>Valor<input type="number" class="wf-input" /></label><button class="wf-btn" onclick="mostrarToast(\'Acción ejecutada\')">Ejecutar</button>'}
          onOpenProfile={() => undefined}
        />
      </FeedbackProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Ejecutar" }));
    expect(screen.getByRole("status")).toHaveTextContent("Acción ejecutada");
    expect(screen.getByLabelText("Valor")).toBeInTheDocument();
  });

  it("abre el formulario de renovación desde el módulo de proveedor", () => {
    render(
      <FeedbackProvider>
        <WidgetContent
          content={'<button onclick="abrirModalRenovar(\'RUT\')">Renovar</button>'}
          onOpenProfile={() => undefined}
        />
      </FeedbackProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Renovar" }));
    expect(screen.getByRole("dialog")).toHaveTextContent("Renovar RUT");
    expect(screen.getByLabelText("Observaciones")).toBeInTheDocument();
  });
});
