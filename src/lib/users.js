import api from "./api";

let config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
async function deleteUser(id) {
  return await api.delete(`users/${id}`);
}
export const Users = {
  deleteUser,
};
