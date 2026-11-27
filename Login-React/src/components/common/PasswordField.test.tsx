import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PasswordField } from "./PasswordField";

describe("campo de contraseña de perfil", () => {
  it("permite alternar entre el texto oculto y visible", () => {
    render(
      <PasswordField id="current-password" label="Contraseña actual" autoComplete="current-password" />
    );

    const input = screen.getByLabelText("Contraseña actual");
    expect(input).toHaveAttribute("type", "password");

    fireEvent.click(screen.getByRole("button", { name: "Mostrar contraseña actual" }));
    expect(input).toHaveAttribute("type", "text");

    fireEvent.click(screen.getByRole("button", { name: "Ocultar contraseña actual" }));
    expect(input).toHaveAttribute("type", "password");
  });
});
