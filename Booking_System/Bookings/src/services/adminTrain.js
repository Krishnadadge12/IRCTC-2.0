import axios from "axios";
import { config } from "./config";

const BASE_URL = "http://localhost:8080/admin/trains";
function authHeader() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}

// GET /admin/trains
export async function getAllAdminTrains() {
  const url = `${config.server}/admin/trains`;
  const res = await axios.get(url, {
    headers: authHeader(),
  });
  return res.data;
}
// POST /admin/trains
export const addTrain = (train) => {
  return axios.post(
    BASE_URL,
    train,
    {
      headers: authHeader(),
    }
  ).then(res => res.data);
};


// PATCH /admin/trains/{id}/status?status=...
export async function updateTrainStatus(id, status) {
  const url = `${config.server}/admin/trains/${id}/status`;
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