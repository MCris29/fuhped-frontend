import api from "./api";

let config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
async function getById(id) {
  return await api.get(`afiliates/${id}`);
}
async function create(data) {
  return await api.post(`/afiliates`, data);
}

async function update(id, data) {
  return await api.put(`afiliates/${id}`, data);
}
async function deleteAffiliate(id) {
  return await api.delete(`afiliates/${id}`);
}
export const Affiliates = {
  getById,
  create,
  update,
  deleteAffiliate,
};
