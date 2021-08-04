import api from "./api";

let config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
async function getById(id) {
  return await api.get(`appointments/${id}`);
}
async function create(data) {
  return await api.post(`/appointments`, data);
}

async function update(id, data) {
  return await api.put(`appointments/${id}`, data);
}
async function deleteAppointments(id) {
  return await api.delete(`appointments/${id}`);
}
export const Appointments = {
  getById,
  create,
  update,
  deleteAppointments,
};
