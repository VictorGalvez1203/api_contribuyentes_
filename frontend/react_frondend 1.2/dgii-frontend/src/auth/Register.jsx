import { useState } from "react";
import { createUserRequest } from "../api/registerApi";
import LogoImg from "../assets/dgii_logo.png";
import "./auth.css";

export default function Register({ onBack }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState([]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);

    if (form.password !== form.password2) {
      setErrors(["Las contraseñas no coinciden"]);
      return;
    }

    try {
      await createUserRequest({
        username: form.username,
        email: form.email,
        password: form.password,
        rol_Id: 2,
        estado: "Activo",
      });

      alert("Usuario creado correctamente");
      onBack();
    } catch (errs) {
      setErrors(errs);
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
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
          />
          <input
            name="password2"
            type="password"
            placeholder="Repetir contraseña"
            onChange={handleChange}
          />

          <button type="submit">Registrarse</button>
        </form>

        {errors.map((err, i) => (
          <p key={i} className="error">
            {err}
          </p>
        ))}

        <button type="button" className="link-button" onClick={onBack}>
          Volver
        </button>
      </div>
    </div>
  );
}
