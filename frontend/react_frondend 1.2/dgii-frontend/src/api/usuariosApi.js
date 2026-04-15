import axios from "axios";

const API_URL = "https://localhost:7285/api/v1/Usuarios";

// LISTAR con filtros + paginación
export async function getUsuarios(params = {}, token) {
  const res = await axios.get(API_URL, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data; 
}

// OBTENER POR ID
export function getUsuarioPorId(id, token) {
  return axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// CREAR
export function createUsuario(data, token) {
  return axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// ACTUALIZAR
export function updateUsuario(id, data, token) {
  return axios.put(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// ELIMINAR
export function deleteUsuario(id, token) {
  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

