import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ConfirmModal from "./components/ConfirmModal";
import LogoImg from "../assets/espiralii-trnas.png";

// Iconos SVG planos y minimalistas
const IconoContribuyentes = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconoComprobantes = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="11" x2="12" y2="17" />
    <line x1="9" y1="14" x2="15" y2="14" />
  </svg>
);

const IconoUsuarios = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconoConfiguracion = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24" />
  </svg>
);

const IconoLogout = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 8 20 12 16 16" />
    <line x1="9" y1="12" x2="20" y2="12" />
  </svg>
);

export default function Sidebar({ panel, setPanel, collapsed, toggleSidebar }) {
  const { logout } = useAuth();
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  function confirmarLogout() {
    setLogoutConfirm(true);
  }

  function handleLogoutConfirm() {
    setLogoutConfirm(false);
    logout();
  }

  // Cerrar sidebar en móvil al seleccionar panel
  const handlePanelClick = (panelName) => {
    setPanel(panelName);
    if (window.innerWidth <= 640) {
      toggleSidebar();
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={logoutConfirm}
        title="Cerrar sesión"
        message="¿Estás seguro de que deseas cerrar sesión?"
        confirmText="Cerrar sesión"
        cancelText="Cancelar"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setLogoutConfirm(false)}
      />
      {/* OVERLAY para cerrar sidebar en móvil */}
      {!collapsed && window.innerWidth <= 640 && (
        <div 
          className="sidebar-overlay visible" 
          onClick={toggleSidebar}
        ></div>
      )}

      <div className={`sidebar ${collapsed ? "collapsed" : "open"}`} id="sidebar">
        <div className="logo" onClick={toggleSidebar}>
          <img src={LogoImg} alt="Logo Espiralii" />
        </div>

        <div className="menu">
          <a 
            className={panel === "contribuyentes" ? "active" : ""} 
            onClick={() => handlePanelClick("contribuyentes")}
          >
            <span className="menu-icon"><IconoContribuyentes /></span>
            <span>Contribuyentes</span>
          </a>

          <a 
            className={panel === "comprobantes" ? "active" : ""} 
            onClick={() => handlePanelClick("comprobantes")}
          >
            <span className="menu-icon"><IconoComprobantes /></span>
            <span>Comprobantes</span>
          </a>

          <a 
            className={panel === "usuarios" ? "active" : ""} 
            onClick={() => handlePanelClick("usuarios")}
          >
            <span className="menu-icon"><IconoUsuarios /></span>
            <span>Usuarios</span>
          </a>

          <a 
            className={panel === "config" ? "active" : ""} 
            onClick={() => handlePanelClick("config")}
          >
            <span className="menu-icon"><IconoConfiguracion /></span>
            <span>Configuración</span>
          </a>

          {/* LOGOUT NORMAL */}
          <a className="logout-btn" onClick={confirmarLogout}>
            <span className="menu-icon"><IconoLogout /></span>
            <span>Cerrar sesión</span>
          </a>
        </div>

        {/* LOGOUT MINI (cuando colapsa) */}
        <button
          className="logout-mini"
          title="Cerrar sesión"
          onClick={confirmarLogout}
        >
          <IconoLogout />
        </button>
      </div>
    </>
  );
}



