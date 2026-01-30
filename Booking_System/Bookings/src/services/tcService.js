import axios from "axios";
import { config } from "./config";

// GET /tc/train/{trainId}/passengers
export async function getPassengersByTrain(trainId) {
  const url = `${config.server}/tc/train/${trainId}/passengers`;
  const res = await axios.get(url);
  return res.data;
}

// PATCH booking status by bookingId OR by pnr (fallback)
export async function updateBookingStatus(identifier, status) {
  // identifier can be bookingId (number/string of digits) or a PNR string
  if (!identifier) throw new Error("Missing identifier for booking status update");

  const isNumeric = /^\d+$/.test(String(identifier));

  if (isNumeric) {
    // Prefer admin endpoint for mutating booking state
    const url = `${config.server}/admin/bookings/${identifier}/status?status=${encodeURIComponent(status)}`;
    const res = await axios.patch(url);
    return res.data;
  } else {
    // Fallback: update by PNR
    const url = `${config.server}/admin/bookings/status?pnr=${encodeURIComponent(identifier)}&status=${encodeURIComponent(status)}`;
    const res = await axios.patch(url);
    return res.data;
  }
}

// DELETE booking by passenger id (calls admin cancellation by bookingId under the hood)
export async function cancelBookingByPassenger(passengerId) {
  if (!passengerId) throw new Error("Missing passengerId for cancel operation");
  // Calls backend that cancels booking using passenger id
  const url = `${config.server}/tc/bookings/${passengerId}/cancel`;
  const res = await axios.delete(url);
  return res.data;
} 