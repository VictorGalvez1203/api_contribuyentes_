import { useState } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./dashboard/Dashboard";

import { AuthProvider, useAuth } from "./context/AuthContext";

function AppContent() {
  const { token, loading } = useAuth();
  const [view, setView] = useState("login");

  if (loading) return null; // evita parpadeos

  // 🔐 SI HAY TOKEN → DASHBOARD
  if (token) {
    return <Dashboard />;
  }

  // 🔑 LOGIN / REGISTRO
  return (
    <>
      {view === "login" && (
        <Login onRegister={() => setView("register")} />
      )}

      {view === "register" && (
        <Register onBack={() => setView("login")} />
      )}
    </>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}






