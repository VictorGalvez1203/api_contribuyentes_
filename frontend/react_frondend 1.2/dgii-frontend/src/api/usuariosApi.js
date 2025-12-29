import axios from "axios";

const API_URL = "https://localhost:7285/api/v1/Usuarios";

export function getUsuarioPorId(id, token) {
  return axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
