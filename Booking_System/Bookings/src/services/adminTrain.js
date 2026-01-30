import axios from "axios";
import { config } from "./config";

// GET /admin/trains
export async function getAllAdminTrains() {
  const url = `${config.server}/admin/trains`;
  const res = await axios.get(url);
  return res.data;
}

// PATCH /admin/trains/{id}/status?status=...
export async function updateTrainStatus(id, status) {
  const url = `${config.server}/admin/trains/${id}/status`;
  // backend expects status as request param
  const res = await axios.patch(url, null, { params: { status } });
  return res.data;
}
