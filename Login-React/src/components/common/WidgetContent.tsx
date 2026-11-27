import { createElement, useState } from "react";
import parse, {
  attributesToProps,
  domToReact,
  type HTMLReactParserOptions
} from "html-react-parser";
import type { Element } from "domhandler";
import type { CSSProperties, ReactNode } from "react";
import { useFeedback } from "../../contexts/FeedbackContext";
import type { PortalModal } from "../../contexts/FeedbackContext";

interface WidgetContentProps {
  content: string;
  onOpenProfile: () => void;
}

type ParserNode = Parameters<NonNullable<HTMLReactParserOptions["replace"]>>[0];

function getArguments(action: string): string[] {
  const call = action.match(/\w+\s*\((.*)\)/s)?.[1] ?? "";
  return Array.from(call.matchAll(/(['"])(.*?)\1/g), (match) => match[2] ?? "");
}

function createModal(action: string, args: string[]): PortalModal | null {
  const operation = action.match(/(abrirModal\w*)/)?.[1];
  const documentName = args[0] || "documento";
  const recordId = args[0] || "radicado";
  const templates: Record<string, PortalModal> = {
    abrirModalRenovar: {
      title: `Renovar ${documentName}`,
      message: "Adjunta la documentación requerida para actualizar este registro.",
      fields: ["Archivo de soporte (PDF)", "Observaciones"],
      confirmLabel: "Radicar renovación",
      successMessage: `${documentName} renovado correctamente`
    },
    abrirModalCotizar: {
      title: `Enviar propuesta para ${documentName}`,
      message: "Completa la información económica y adjunta los soportes de la propuesta.",
      fields: ["Valor de la propuesta", "Archivo técnico (PDF)", "Archivo económico (PDF)"],
      confirmLabel: "Enviar propuesta",
      successMessage: `Propuesta enviada para ${documentName}`
    },
    abrirModalFirmar: {
      title: `Aceptar ${args[0] || "documento"}`,
      message: `Confirma la aceptación del documento ${args[1] || ""}.`,
      fields: ["Nombre del representante", "Observaciones"],
      confirmLabel: "Firmar / Aceptar",
      successMessage: `${args[1] || "Documento"} firmado y aceptado correctamente`
    },
    abrirModalCorregir: {
      title: `Corregir ${recordId}`,
      message: "Adjunta la corrección solicitada antes de volver a radicar.",
      fields: ["Descripción de la corrección", "Archivo de soporte"],
      confirmLabel: "Volver a radicar",
      successMessage: `${recordId} corregido y radicado nuevamente`
    },
    abrirModalDetalleRadicado: {
      title: `Detalle ${recordId}`,
      message: "Consulta el estado y los documentos asociados a este radicado.",
      fields: [],
      confirmLabel: "Cerrar",
      successMessage: `Detalle de ${recordId} consultado`
    },
    abrirModalDescuento: {
      title: `Detalle de descuentos ${recordId}`,
      message: "Resumen de retenciones y valores aplicados al radicado.",
      fields: [],
      confirmLabel: "Cerrar",
      successMessage: `Detalle de ${recordId} consultado`
    }
  };
  if (operation === "abrirModal") {
    return {
      title: documentName,
      message: "Completa la información solicitada.",
      fields: ["Observaciones"],
      confirmLabel: "Guardar",
      successMessage: "Información guardada"
    };
  }
  return operation ? templates[operation] ?? null : null;
}

function isElement(node: ParserNode): node is Element {
  return node.type === "tag";
}

export function WidgetContent({ content, onOpenProfile }: WidgetContentProps) {
  const { showToast, openModal } = useFeedback();
  const [radicadoTipo, setRadicadoTipo] = useState("juridica");

  const options: HTMLReactParserOptions = {
    replace(node) {
      if (!isElement(node)) return;
      const element = node as Element;
      const originalProps = attributesToProps(element.attribs) as Record<string, unknown>;
      const action = element.attribs.onclick;
      const changeAction = element.attribs.onchange;
      const props = { ...originalProps };
      delete props.onClick;
      delete props.onChange;
      delete props.onInput;
      delete props.onclick;
      delete props.onchange;

      const id = element.attribs.id;
      if (id === "form-radicado-juridica") {
        props.style = {
          ...(props.style as CSSProperties),
          display: radicadoTipo === "juridica" ? "" : "none"
        };
      } else if (id === "form-radicado-natural") {
        props.style = {
          ...(props.style as CSSProperties),
          display: radicadoTipo === "natural" ? "" : "none"
        };
      }

      if (action) {
        props.onClick = () => {
          if (action.includes("abrirPerfil")) {
            onOpenProfile();
            return;
          }
          const toastMessage = action.match(/mostrarToast\((['"])(.*?)\1\)/s)?.[2];
          if (toastMessage) {
            showToast(toastMessage);
            return;
          }
          const modal = createModal(action, getArguments(action));
          if (modal) openModal(modal);
        };
      }
      if (changeAction?.includes("toggleFormaRadicado")) {
        props.onChange = (event: Event) => {
          const target = event.currentTarget;
          if (target instanceof HTMLSelectElement) setRadicadoTipo(target.value);
        };
      }

      if (node.children.length === 0) return createElement(element.name, props);
      const children = domToReact(node.children as Parameters<typeof domToReact>[0], options) as ReactNode;
      return createElement(element.name, props, children);
    }
  };

  return <>{parse(content, options)}</>;
}
