import api from "./api";

let config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
async function getById(id) {
  return await api.get(`services/${id}`);
}
async function create(data) {
  return await api.post(`/services`, data);
}

async function update(id, data) {
  return await api.put(`services/${id}`, data);
}
async function deleteService(id) {
  return await api.delete(`services/${id}`);
}
export const Services = {
  getById,
  create,
  update,
  deleteService,
};
