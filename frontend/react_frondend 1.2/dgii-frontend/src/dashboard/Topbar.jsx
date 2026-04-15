import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { getUsuarioPorId } from "../api/usuariosApi";
import { getRolPorId } from "../api/rolesApi";
import ConfirmModal from "./components/ConfirmModal";

// Iconos SVG planos
const IconoMoon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const IconoSun = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const IconoUsuario = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconoHamburger = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export default function Topbar() {
  const { token, userId, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [usuario, setUsuario] = useState(null);
  const [rol, setRol] = useState(null);
  const [open, setOpen] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
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
      const userInfoElement = event.target.closest(".user-info");
      const dropdownElement = event.target.closest(".dropdown");
      
      if (!userInfoElement && !dropdownElement) {
        setOpen(false);
      }
    }
    
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  function confirmarLogout() {
    setLogoutConfirm(true);
  }

  function handleLogoutConfirm() {
    setLogoutConfirm(false);
    logout();
  }

  return (
    <div className="topbar">
      <ConfirmModal
        isOpen={logoutConfirm}
        title="Cerrar sesión"
        message="¿Estás seguro de que deseas cerrar sesión?"
        confirmText="Cerrar sesión"
        cancelText="Cancelar"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setLogoutConfirm(false)}
      />
      <button 
        className="hamburger-btn"
        onClick={() => {
          const sidebar = document.getElementById("sidebar");
          sidebar?.classList.toggle("open");
        }}
        style={{ display: "none" }}
        id="hamburger-btn"
      >
        <IconoHamburger />
      </button>

      <div></div>

      <div className="topbar-actions">
        <button 
          className="theme-toggle-btn" 
          onClick={toggleTheme}
          title={theme === "light" ? "Cambiar a tema oscuro" : "Cambiar a tema claro"}
        >
          {theme === "light" ? <IconoMoon /> : <IconoSun />}
        </button>

        <div 
          className="user-info" 
          onClick={() => setOpen(!open)}
        >
          <div className="user-avatar">
            <IconoUsuario />
          </div>

          {!usuario ? (
            <div className="user-display">
              <span className="user-username">Cargando...</span>
            </div>
          ) : (
            <div className="user-display">
              <span className="user-username">{usuario.username}</span>
              <span className="user-email">{usuario.email}</span>
            </div>
          )}
        </div>

        {open && usuario && (
          <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-header">
              <div className="dropdown-avatar">
                <IconoUsuario />
              </div>
              <div className="dropdown-user-info">
                <h4>{usuario.username}</h4>
                <p className="dropdown-email">{usuario.email}</p>
              </div>
            </div>

            <div className="dropdown-details">
              <div className="detail-item">
                <span className="detail-label">Rol</span>
                <span className="detail-value role-badge">
                  {rol ? rol.nombreRol : "Cargando..."}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Estado</span>
                <span className={`detail-value status-badge ${usuario.estado.toLowerCase()}`}>
                  {usuario.estado}
                </span>
              </div>
            </div>

            <button className="logout-btn" onClick={confirmarLogout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}




