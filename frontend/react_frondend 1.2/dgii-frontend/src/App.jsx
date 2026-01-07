import { useState } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./dashboard/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppContent() {
  const { token, loading } = useAuth();

  const [view, setView] = useState("login");
  const [isAnimating, setIsAnimating] = useState(false);

  if (loading) return null; // evita parpadeos

  // 🔐 SI HAY TOKEN → DASHBOARD
  if (token) {
    return <Dashboard />;
  }

  function changeView(nextView) {
    setIsAnimating(true);

    setTimeout(() => {
      setView(nextView);
      setIsAnimating(false);
    }, 300); // ⏱ coincide con fadeOut
  }

  return (
    <div className={isAnimating ? "fade-out" : ""}>
      {view === "login" && (
        <Login onRegister={() => changeView("register")} />
      )}

      {view === "register" && (
        <Register onBack={() => changeView("login")} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}







