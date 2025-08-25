import { createContext, useContext, useState, type ReactNode } from "react";
import AlertToast from "../../lib/components/toast";

interface ToastProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
}

interface ToastContextType {
  showToast: (toast: ToastProps) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = (toast: ToastProps) => {
    setToast(toast);
    setTimeout(() => setToast(null), 4000); // desaparece após 4s
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <AlertToast message={toast.message} variant={toast.type} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser usado dentro do ToastProvider");
  }
  return context;
};
