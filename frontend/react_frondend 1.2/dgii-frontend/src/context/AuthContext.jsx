import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest } from "../api/authApi";
import { getUserIdFromToken } from "../api/jwt";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Cargar sesión al iniciar la app
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const expiration = localStorage.getItem("expiration");

    if (!storedToken || !expiration) {
      logout();
      setLoading(false);
      return;
    }

    const expiresAt = new Date(expiration).getTime();

    if (Date.now() >= expiresAt) {
      logout();
      setLoading(false);
      return;
    }

    setToken(storedToken);
    setUserId(getUserIdFromToken(storedToken));

    // ⏱️ Programar cierre automático
    const timeout = expiresAt - Date.now();

    const timer = setTimeout(() => {
      alert("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
      logout();
    }, timeout);

    setLoading(false);

    return () => clearTimeout(timer);
  }, []);

  // 🔐 LOGIN
  async function login(email, password) {
    const data = await loginRequest({ email, password });

    localStorage.setItem("token", data.token);
    localStorage.setItem("expiration", data.expiration);

    setToken(data.token);
    setUserId(getUserIdFromToken(data.token));

    // ⏱️ Programar cierre automático
    const expiresAt = new Date(data.expiration).getTime();
    const timeout = expiresAt - Date.now();

    setTimeout(() => {
      alert("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
      logout();
    }, timeout);
  }

  // 🚪 LOGOUT
  function logout() {
    localStorage.clear();
    setToken(null);
    setUserId(null);
  }

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

