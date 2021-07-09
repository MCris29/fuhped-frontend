import api from "./api";

let config = {
  headers: {
    "Content-Type": "multipart/form-data",
  }
}
async function getById(id) {
  return await api.get(`publications/${id}`);

}
async function create(data) {
  return await api.post(`publications/`, data);
}

async function update(id,data) {
  return await api.put(`publications/${id}`, data);
}
async function deleteBook(id) {
  return await api.delete(`publications/${id}`);
}
export const Books = {
  getById,
  create,
  update,
  deleteBook,
};
