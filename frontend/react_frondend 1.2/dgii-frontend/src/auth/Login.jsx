import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import LogoImg from "../assets/dgii_logo.png";
import "./auth.css";

export default function Login({ onRegister }) {
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(email, password);

      showToast("success", "Inicio de sesión exitoso");

    } catch (err) {
      const messages = [];

      if (err.message) {
    messages.push(err.message);
  }

  if (Array.isArray(err.errors) && err.errors.length > 0) {
    messages.push(...err.errors);
  }

  showToast("error", messages);
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
    </div>
  );
}



