import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUsuarioPorId, updateUsuario } from "../../api/usuariosApi";

export default function Configuracion() {
  const { token, userId } = useAuth();
  const [form, setForm] = useState({
    id: null,
    username: "",
    email: "",
    password: "",
    rol_Id: null,
    estado: "",
  });
  ;

  /* =========================
     CARGAR USUARIO LOGUEADO
  ========================= */
  useEffect(() => {
    if (!token || !userId) return;

    async function cargarUsuario() {
      try {
        const res = await getUsuarioPorId(userId, token);
        const u = res.data.data;

        setForm({
          id: u.id,
          username: u.username || "",
          email: u.email || "",
          password: "",
          rol_Id: u.rol_Id,
          estado: u.estado,
        });

      } catch (error) {
        console.error("Error cargando usuario", error);
      }
    }

    cargarUsuario();
  }, [token, userId]);

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleGuardar() {
    try {
      const payload = {
        id: form.id,
        username: form.username,
        email: form.email,
        rol_Id: form.rol_Id,
        estado: form.estado,
      };

      if (form.password) {
        payload.password = form.password;
      }

      await updateUsuario(form.id, payload, token);

      alert("Datos actualizados correctamente");

      // 🔁 RECARGA COMPLETA DEL DASHBOARD
      window.location.reload();

    } catch (error) {
      alert("Error actualizando datos");
      console.error(error);
    }
  }



  return (
    <div className="card card-full" id="config" style={{ position: "relative" }}>
      <h3>Configuración de Usuario</h3>

      <label>Nombre de usuario</label>
      <input
        value={form.username}
        onChange={e => handleChange("username", e.target.value)}
      />

      <label>Email</label>
      <input
        type="email"
        value={form.email}
        onChange={e => handleChange("email", e.target.value)}
      />

      <label>Contraseña</label>
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={form.password}
        onChange={e => handleChange("password", e.target.value)}
      />

      {/* 🔹 BOTONES ABAJO A LA DERECHA */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "2rem",
          display: "flex",
          gap: "1rem",
        }}
      >
        <button onClick={() => window.location.reload()}>
          Cancelar
        </button>
        <button className="btn-primary" onClick={handleGuardar}>
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}
