import api from "./api";

let config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
async function send(data) {
  return await api.post(`/contact`, data);
}
export const Contacts = {
  send,
};
