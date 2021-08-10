import api from "./api";

let config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
async function create(data) {
  return await api.post(`/notifications`, data);
}
async function deleteNotification(id) {
  return await api.delete(`notifications/${id}`);
}
export const Notifications = {
  create,
  deleteNotification,
};
