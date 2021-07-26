import api from "./api";

let config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
async function getById(id) {
  return await api.get(`partners/${id}`);
}
async function create(data) {
  return await api.post(`/partners`, data);
}

async function update(id, data) {
  return await api.put(`partners/${id}`, data);
}
async function deletePartner(id) {
  return await api.delete(`partners/${id}`);
}
export const Partners = {
  getById,
  create,
  update,
  deletePartner,
};
