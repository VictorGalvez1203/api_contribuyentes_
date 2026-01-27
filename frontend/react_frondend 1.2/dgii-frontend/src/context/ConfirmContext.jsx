import { createContext, useContext, useState } from "react";
import ConfirmModal from "../dashboard/components/ConfirmModal";

const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
  const [confirm, setConfirm] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "Confirmar",
    cancelText: "Cancelar",
    isDanger: false,
    onConfirm: null,
    onCancel: null
  });

  const showConfirm = (options) => {
    setConfirm({
      isOpen: true,
      title: options.title || "Confirmar",
      message: options.message || "",
      confirmText: options.confirmText || "Confirmar",
      cancelText: options.cancelText || "Cancelar",
      isDanger: options.isDanger || false,
      onConfirm: options.onConfirm || (() => {}),
      onCancel: options.onCancel || (() => {})
    });
  };

  const handleConfirm = () => {
    if (confirm.onConfirm) {
      confirm.onConfirm();
    }
    setConfirm(prev => ({ ...prev, isOpen: false }));
  };

  const handleCancel = () => {
    if (confirm.onCancel) {
      confirm.onCancel();
    }
    setConfirm(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <ConfirmContext.Provider value={{ showConfirm }}>
      {children}
      <ConfirmModal
        isOpen={confirm.isOpen}
        title={confirm.title}
        message={confirm.message}
        confirmText={confirm.confirmText}
        cancelText={confirm.cancelText}
        isDanger={confirm.isDanger}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm debe ser usado dentro de ConfirmProvider");
  }
  return context;
};
