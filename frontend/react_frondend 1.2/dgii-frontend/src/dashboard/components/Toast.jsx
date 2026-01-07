import { useEffect } from "react";
import "./toast.css";

export default function Toast({
  message,
  type = "info",
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`toast toast-${type}`}>
      {Array.isArray(message) ? (
        <ul className="toast-list">
          {message.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      ) : (
        <span>{message}</span>
      )}
    </div>
  );
}


