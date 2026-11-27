import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren
} from "react";

export interface PortalModal {
  title: string;
  message: string;
  fields: string[];
  confirmLabel: string;
  successMessage: string;
}

interface FeedbackContextValue {
  showToast: (message: string) => void;
  openModal: (modal: PortalModal) => void;
  closeModal: () => void;
}

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

export function FeedbackProvider({ children }: PropsWithChildren) {
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState<PortalModal | null>(null);

  const showToast = useCallback((message: string) => setToast(message), []);
  const openModal = useCallback((nextModal: PortalModal) => setModal(nextModal), []);
  const closeModal = useCallback(() => setModal(null), []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const value = useMemo(
    () => ({ showToast, openModal, closeModal }),
    [showToast, openModal, closeModal]
  );

  return (
    <FeedbackContext.Provider value={value}>
      {children}
      {toast && (
        <div className="toast visible" role="status" aria-live="polite">
          <div className="toast-icono">✓</div>
          <div className="toast-texto"><strong>ACINPRO</strong><span>{toast}</span></div>
        </div>
      )}
      {modal && (
        <div className="acinpro-modal-backdrop" role="presentation" onMouseDown={closeModal}>
          <section
            className="acinpro-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header><h2 id="modal-title">{modal.title}</h2></header>
            <p>{modal.message}</p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                showToast(modal.successMessage);
                closeModal();
              }}
            >
              {modal.fields.map((field) => (
                <label className="wf-label" key={field}>
                  {field}
                  {field.toLocaleLowerCase().includes("archivo") || field.toLocaleLowerCase().includes("pdf")
                    ? <input className="wf-input" type="file" />
                    : <input className="wf-input" />}
                </label>
              ))}
              <footer>
                <button className="wf-btn" type="button" onClick={closeModal}>Cancelar</button>
                <button className="wf-btn wf-btn-primary" type="submit">{modal.confirmLabel}</button>
              </footer>
            </form>
          </section>
        </div>
      )}
    </FeedbackContext.Provider>
  );
}

export function useFeedback(): FeedbackContextValue {
  const value = useContext(FeedbackContext);
  if (!value) throw new Error("useFeedback debe usarse dentro de FeedbackProvider.");
  return value;
}
