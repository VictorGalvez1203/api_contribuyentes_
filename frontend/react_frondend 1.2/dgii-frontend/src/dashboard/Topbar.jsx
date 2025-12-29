import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { getUsuarioPorId } from "../api/usuariosApi";
import { getRolPorId } from "../api/rolesApi";

export default function Topbar() {
  const { token, userId, logout } = useAuth();
  const [usuario, setUsuario] = useState(null);
  const [rol, setRol] = useState(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!token || !userId) return;

    async function load() {
      try {
        const resUsuario = await getUsuarioPorId(userId, token);
        const usuarioData = resUsuario.data.data;
        setUsuario(usuarioData);

        if (usuarioData.rol_Id) {
          const resRol = await getRolPorId(usuarioData.rol_Id, token);
          setRol(resRol.data.data);
        }
      } catch (e) {
        console.error("Error cargando usuario o rol", e);
      }
    }

    load();
  }, [token, userId]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  function confirmarLogout() {
    if (window.confirm("¿Seguro que deseas cerrar sesión?")) {
      logout();
    }
  }

  return (
    <div className="topbar">
      <div></div>

      <div className="user-info" onClick={() => setOpen(!open)}>
        <span>👤</span>

        {!usuario ? (
          <span>Cargando...</span>
        ) : (
          <span>{usuario.username}</span>
        )}

        {open && usuario && (
          <div className="dropdown" ref={dropdownRef}>
            <p>
              <strong>Nombre de usuario:</strong> {usuario.username}
            </p>
            <p>
              <strong>Email:</strong> {usuario.email}
            </p>
            <p>
              <strong>Rol:</strong> {rol ? rol.nombreRol : "Cargando..."}
            </p>
            <p>
              <strong>Estado:</strong> {usuario.estado}
            </p>

            <hr />

            <button className="logout-btn" onClick={confirmarLogout}>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}




