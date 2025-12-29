import { useAuth } from "../context/AuthContext";
import LogoImg from "../assets/espiralii-trnas.png";

export default function Sidebar({ panel, setPanel, collapsed, toggleSidebar }) {
  const { logout } = useAuth();

  function confirmarLogout() {
    if (window.confirm("¿Seguro que deseas cerrar sesión?")) {
      logout();
    }
  }

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`} id="sidebar">
      <div className="logo" onClick={toggleSidebar}>
        <img src={LogoImg} alt="Logo Espiralii" />
      </div>

      <div className="menu">
        <a onClick={() => setPanel("contribuyentes")}>
          <span>Contribuyentes</span>
        </a>

        <a onClick={() => setPanel("comprobantes")}>
          <span>Comprobantes</span>
        </a>

        <a onClick={() => setPanel("usuarios")}>
          <span>Usuarios</span>
        </a>

        <a onClick={() => setPanel("config")}>
          <span>Configuración</span>
        </a>

        {/* 🔴 LOGOUT NORMAL */}
        <a className="logout-btn" onClick={confirmarLogout}>
          <span>Cerrar sesión</span>
        </a>
      </div>

      {/* 🔴 LOGOUT MINI (cuando colapsa) */}
      <button
        className="logout-mini"
        title="Cerrar sesión"
        onClick={confirmarLogout}
      >
        ⏻
      </button>
    </div>
  );
}



