import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Toast from "../dashboard/components/Toast";
import LogoImg from "../assets/dgii_logo.png";
import "./auth.css";

export default function Login({ onRegister }) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);

  async function handleSubmit(e) {
  e.preventDefault();

  try {
    setToast({
      type: "success",
      message: "Inicio de sesión exitoso",
    });

    // ⏳ Pequeño delay para que el toast se vea
    setTimeout(async () => {
      await login(email, password);
    }, 800);

  } catch (err) {
    if (Array.isArray(err.errors) && err.errors.length > 0) {
      setToast({
        type: "error",
        message: err.errors,
      });
    } else {
      setToast({
        type: "error",
        message: err.message || "Error al iniciar sesión",
      });
    }
  }
}


  return (
    <div className="login-container">
      <div className="login-card">
        <img src={LogoImg} alt="DGII Logo" />
        <h2>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={!email.trim() || !password.trim()}
          >
            Ingresar
          </button>
        </form>

        <button className="link-button" onClick={onRegister}>
          ¿No tienes cuenta? Regístrate
        </button>
      </div>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}


