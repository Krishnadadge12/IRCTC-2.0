import axios from "axios";
import { config } from "./config";

// GET /admin/bookings/train/{trainId}
export async function getBookingsByTrain(trainId) {
  const url = `${config.server}/admin/bookings/train/${trainId}`;
  const res = await axios.get(url);
  return res.data;
}

// PATCH /admin/bookings/{bookingId}/cancel
export async function cancelBooking(bookingId) {
  const url = `${config.server}/admin/bookings/${bookingId}/cancel`;
  const res = await axios.patch(url);
  return res.data;
}

// PATCH /admin/bookings/{bookingId}/status?status=...
export async function updateBookingStatus(bookingId, status) {
  const url = `${config.server}/admin/bookings/${bookingId}/status`;
  // send status as request param
  const res = await axios.patch(url, null, { params: { status } });
  return res.data;
}
