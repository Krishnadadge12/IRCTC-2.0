import axios from "axios";
import { config } from "./config";

function authHeader() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}

// GET /admin/bookings/train/{trainId}
export async function getBookingsByTrain(trainId) {
  const url = `${config.server}/admin/bookings/train/${trainId}`;
  const res = await axios.get(url, {
    headers: authHeader(),
  });
  return res.data;
}

// PATCH /admin/bookings/{bookingId}/cancel
export async function cancelBooking(bookingId) {
  const url = `${config.server}/admin/bookings/${bookingId}/cancel`;
  const res = await axios.patch(url, null, {
    headers: authHeader(),
  });
  return res.data;
}

// PATCH /admin/bookings/{bookingId}/status?status=...
export async function updateBookingStatus(bookingId, status) {
  const url = `${config.server}/admin/bookings/${bookingId}/status`;
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
