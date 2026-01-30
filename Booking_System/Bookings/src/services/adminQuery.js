import axios from "axios";
import { config } from "./config";

// GET /admin/queries
export async function getAllQueries() {
  const url = `${config.server}/admin/queries`;
  const res = await axios.get(url);
  return res.data;
}

// PATCH /admin/queries/{id}/status?status=... (generic - may not exist on backend)
export async function updateQueryStatus(id, status) {
  const url = `${config.server}/admin/queries/${id}/status`;
  const res = await axios.patch(url, null, { params: { status } });
  return res.data;
}

// PATCH /admin/queries/{id}/resolve
export async function resolveQuery(id) {
  const url = `${config.server}/admin/queries/${id}/resolve`;
  const res = await axios.patch(url);
  return res.data;
}