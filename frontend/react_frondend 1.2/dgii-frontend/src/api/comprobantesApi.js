import axios from "axios";

const API_URL = "https://localhost:7285/api/v1/ComprobanteFiscales";

function authHeaders() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
}

// GET con filtros / paginación
export async function getComprobantes(params = {}) {
  const res = await axios.get(API_URL, {
    ...authHeaders(),
    params,
  });
  return res.data;
}

// GET por ID
export async function getComprobanteById(id) {
  const res = await axios.get(`${API_URL}/${id}`, authHeaders());
  return res.data;
}

// POST
export async function createComprobante(data) {
  const res = await axios.post(API_URL, data, authHeaders());
  return res.data;
}

// PUT
export async function updateComprobante(id, data) {
  const res = await axios.put(`${API_URL}/${id}`, data, authHeaders());
  return res.data;
}

// DELETE
export async function deleteComprobante(id) {
  const res = await axios.delete(`${API_URL}/${id}`, authHeaders());
  return res.data;
}
