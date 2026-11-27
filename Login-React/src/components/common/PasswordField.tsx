import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
  id: string;
  label: string;
  autoComplete: "current-password" | "new-password";
}

export function PasswordField({ id, label, autoComplete }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label className="wf-label" htmlFor={id}>{label}</label>
      <div className="password-field-wrapper">
        <input id={id} type={visible ? "text" : "password"} className="wf-input" autoComplete={autoComplete} />
        <button
          className={`password-toggle${visible ? " activo" : ""}`}
          type="button"
          aria-label={`${visible ? "Ocultar" : "Mostrar"} ${label.toLocaleLowerCase()}`}
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
