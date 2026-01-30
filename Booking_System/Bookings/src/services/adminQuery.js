import axios from "axios";
import { config } from "./config";

function authHeader() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}

// GET /admin/queries
export async function getAllQueries() {
  const url = `${config.server}/admin/queries`;
  const res = await axios.get(url, {
    headers: authHeader(),
  });
  return res.data;
}

// PATCH /admin/queries/{id}/status?status=...
export async function updateQueryStatus(id, status) {
  const url = `${config.server}/admin/queries/${id}/status`;
  const res = await axios.patch(
    url,
    null,
    {
      headers: authHeader(),
      params: { status },
    }
  );
  return res.data;
}

// PATCH /admin/queries/{id}/resolve
export async function resolveQuery(id) {
  const url = `${config.server}/admin/queries/${id}/resolve`;
  const res = await axios.patch(url, null, {
    headers: authHeader(),
  });
  return res.data;
}
