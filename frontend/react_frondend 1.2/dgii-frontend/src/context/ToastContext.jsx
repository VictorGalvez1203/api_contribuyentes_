// context/ToastContext.jsx
import { createContext, useContext, useState } from "react";
import Toast from "../dashboard/components/Toast";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  function showToast(type, message) {
    setToast({ type, message });
  }

  function hideToast() {
    setToast(null);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
