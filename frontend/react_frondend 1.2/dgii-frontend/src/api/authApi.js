const API_URL = "https://localhost:7285/api/v1/Auth";

export async function loginRequest({ email, password }) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  // 🔥 NORMALIZACIÓN AQUÍ
  const message = result.message ?? result.Message ?? null;
  const errors  = result.errors  ?? result.Errors  ?? [];
  const data    = result.data    ?? result.Data    ?? null;

  if (!response.ok) {
    throw {
      message: message || "Error al iniciar sesión",
      errors,
      status: response.status,
    };
  }

  return data;
}



