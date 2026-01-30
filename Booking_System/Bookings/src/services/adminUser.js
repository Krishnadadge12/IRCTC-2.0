import axios from "axios";
import { config } from "./config";

// GET /admin/users
export async function getAllAdminUsers() {
  const url = `${config.server}/admin/users`;
  const res = await axios.get(url);
  return res.data;
}

// PATCH /admin/users/{id}/block
export async function blockUser(id) {
  const url = `${config.server}/admin/users/${id}/block`;
  const res = await axios.patch(url);
  return res.data;
}

// PATCH /admin/users/{id}/unblock
export async function unblockUser(id) {
  const url = `${config.server}/admin/users/${id}/unblock`;
  const res = await axios.patch(url);
  return res.data;
}
