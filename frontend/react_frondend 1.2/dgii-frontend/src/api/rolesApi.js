import axios from "axios";

const ROLES_API_URL = "https://localhost:7285/api/v1/Roles_usuario";

export function getRolPorId(id, token) {
  return axios.get(`${ROLES_API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
