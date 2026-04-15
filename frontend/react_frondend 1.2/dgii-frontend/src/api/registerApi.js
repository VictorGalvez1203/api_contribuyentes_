const API_URL = "https://localhost:7285/api/v1/Auth/register";

export async function createUserRequest(user) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const result = await response.json();

  // ❌ ERROR CONTROLADO POR BACKEND
  if (!result.succeeded) {
    // 1️⃣ Si hay errores de validación → mostrar TODOS
    if (Array.isArray(result.errors) && result.errors.length > 0) {
      throw result.errors;
    }

    // 2️⃣ Si hay solo mensaje (correo duplicado, etc)
    if (result.message) {
      throw [result.message];
    }

    // 3️⃣ Fallback (casi nunca)
    throw ["Error desconocido al registrar usuario"];
  }

  return result.data;
}