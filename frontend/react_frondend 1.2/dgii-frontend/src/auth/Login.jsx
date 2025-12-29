import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LogoImg from "../assets/dgii_logo.png";
import "./auth.css";

export default function Login({ onRegister }) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);

    try {
      await login(email, password);
      alert("Login exitoso");
    } catch (errs) {
      setErrors(errs);
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
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button type="submit">Ingresar</button>
        </form>

        {errors.map((err, i) => (
          <p key={i} className="error">{err}</p>
        ))}

        <button
          type="button"
          className="link-button"
          onClick={onRegister}
        >
          ¿No tienes cuenta? Regístrate
        </button>
      </div>
    </div>
  );
}
