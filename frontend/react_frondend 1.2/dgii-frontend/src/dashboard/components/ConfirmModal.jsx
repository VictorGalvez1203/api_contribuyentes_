import { useEffect } from "react";

export default function ConfirmModal({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isDanger = false
}) {
  
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    }
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div 
      className="confirm-modal-overlay"
      onClick={onCancel}
    >
      <div 
        className="confirm-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirm-modal-content">
          <h3>{title}</h3>
          <p>{message}</p>
        </div>

        <div className="confirm-modal-footer">
          <button 
            className="btn-cancel"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button 
            className={`btn-confirm ${isDanger ? "danger" : ""}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
