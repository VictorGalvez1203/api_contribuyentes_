import axios from "axios";

const API_URL = "https://localhost:7285/api/v1/Contribuyentes";

function authHeaders() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
}

// GET con filtros / paginación
export async function getContribuyentes(params = {}) {
  const res = await axios.get(API_URL, {
    ...authHeaders(),
    params,
  });
  return res.data;
}

// GET por ID
export async function getContribuyenteById(id) {
  const res = await axios.get(`${API_URL}/${id}`, authHeaders());
  return res.data;
}

// POST
export async function createContribuyente(data) {
  const res = await axios.post(API_URL, data, authHeaders());
  return res.data;
}

// PUT
export async function updateContribuyente(id, data) {
  const res = await axios.put(`${API_URL}/${id}`, data, authHeaders());
  return res.data;
}

// DELETE
export async function deleteContribuyente(id) {
  const res = await axios.delete(`${API_URL}/${id}`, authHeaders());
  return res.data;
}
