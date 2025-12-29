import { useState } from "react";
import Login from "../auth/Login";
import Register from "../auth/Register";

export default function AuthPage() {
  const [view, setView] = useState("login");

  return view === "login"
    ? <Login onRegister={() => setView("register")} />
    : <Register onBack={() => setView("login")} />;
}
