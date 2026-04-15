import { useState } from "react";
import { createUserRequest } from "../api/registerApi";
import Toast from "../dashboard/components/Toast";
import LogoImg from "../assets/dgii_logo.png";
import "./auth.css";

export default function Register({ onBack }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [toast, setToast] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { username, email, password, password2 } = form;

    // 🔴 Validaciones FRONTEND
    if (!username.trim() || !email.trim() || !password || !password2) {
      setToast({
        type: "error",
        message: ["Todos los campos son obligatorios"],
      });
      return;
    }

    if (password !== password2) {
      setToast({
        type: "error",
        message: ["Las contraseñas no coinciden"],
      });
      return;
    }

    try {
      await createUserRequest({
        username,
        email,
        password,
        rol_Id: 2,
        estado: "Activo",
      });

      // 🟢 ÉXITO
      setToast({
        type: "success",
        message: "Usuario creado correctamente",
      });

      // ⏳ Volver al login después del toast
      setTimeout(onBack, 1200);

    } catch (err) {
      // 🔥 MENSAJES DINÁMICOS DEL BACKEND
      if (Array.isArray(err)) {
        setToast({
          type: "error",
          message: err,
        });
      } else {
        setToast({
          type: "error",
          message: err.message || "Error al registrar usuario",
        });
      }
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={LogoImg} alt="DGII Logo" />
        <h2>Registro</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Nombre de usuario"
            autoComplete="username"
            value={form.username}
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            name="password2"
            type="password"
            placeholder="Repetir contraseña"
            autoComplete="new-password"
            value={form.password2}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={
              !form.username.trim() ||
              !form.email.trim() ||
              !form.password.trim() ||
              !form.password2.trim()
            }
          >
            Registrarse
          </button>
        </form>

        <button type="button" className="link-button" onClick={onBack}>
          Volver
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


