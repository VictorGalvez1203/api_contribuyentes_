import axios from "axios";

const ROLES_API_URL = "https://localhost:7285/api/v1/Roles_usuario";

// 🔹 LISTAR ROLES (para filtros, selects, etc.)
export function getRoles(token, params = {}) {
  return axios.get(ROLES_API_URL, {
    params,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

// 🔹 OBTENER ROL POR ID (detalle)
export function getRolPorId(id, token) {
  return axios.get(`${ROLES_API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

// 🔹 CREAR
export function createRol(data, token) {
  return axios.post(ROLES_API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

// 🔹 ACTUALIZAR
export function updateRol(id, data, token) {
  return axios.put(`${ROLES_API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

// 🔹 ELIMINAR
export function deleteRol(id, token) {
  return axios.delete(`${ROLES_API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
