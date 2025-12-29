import { createContext, useContext, useState } from "react";
import { loginRequest } from "../api/authApi";
import { getUserIdFromToken } from "../api/jwt";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(
    localStorage.getItem("token")
      ? getUserIdFromToken(localStorage.getItem("token"))
      : null
  );

  async function login(email, password) {
    const data = await loginRequest({ email, password });

    localStorage.setItem("token", data.token);
    localStorage.setItem("expiration", data.expiration);

    const id = getUserIdFromToken(data.token);

    setToken(data.token);
    setUserId(id);
  }

  function logout() {
    localStorage.clear();
    setToken(null);
    setUserId(null);
  }

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
