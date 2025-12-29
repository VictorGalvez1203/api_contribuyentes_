const API_URL = "https://localhost:7285/api/v1/Auth";

export async function loginRequest({ email, password }) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  // ❌ Backend controlado
  if (!result.succeeded) {
    if (Array.isArray(result.errors)) {
      throw result.errors; // ⬅️ array de errores
    }

    throw [result.message || "Error al iniciar sesión"];
  }

  return result.data;
}