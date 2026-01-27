import { useState } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./dashboard/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ConfirmProvider } from "./context/ConfirmContext";

function AppContent() {
  const { token, loading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  // ⛔ Bloquea render hasta validar sesión
  if (loading) return null;

  // ✅ Sesión activa → Dashboard
  if (token) {
    return <Dashboard />;
  }

  // ❌ Sin sesión → Login / Register
  return showRegister ? (
    <Register onBack={() => setShowRegister(false)} />
  ) : (
    <Login onRegister={() => setShowRegister(true)} />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastProvider>
          <ConfirmProvider>
            <AppContent />
          </ConfirmProvider>
        </ToastProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}








