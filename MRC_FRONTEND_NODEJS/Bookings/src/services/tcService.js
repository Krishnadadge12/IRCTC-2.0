import axios from "axios";
import { config } from "./config";

// JWT header helper
function authHeader() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}

// GET /tc/train/{trainId}/passengers
export async function getPassengersByTrain(trainId) {
  const url = `${config.server}/tc/train/${trainId}/passengers`;
  const res = await axios.get(url, {
    headers: authHeader(),
  });
  return res.data;
}

// PATCH booking status by bookingId OR by pnr
export async function updateBookingStatus(identifier, status) {
  if (!identifier) {
    throw new Error("Missing identifier for booking status update");
  }

  const isNumeric = /^\d+$/.test(String(identifier));

  if (isNumeric) {
    // ADMIN endpoint (by bookingId)
    const url = `${config.server}/admin/bookings/${identifier}/status`;
    const res = await axios.patch(
      url,
      null,
      {
        headers: authHeader(),
        params: { status },
      }
    );
    return res.data;
  } else {
    // ADMIN endpoint (by PNR)
    const url = `${config.server}/admin/bookings/status`;
    const res = await axios.patch(
      url,
      null,
      {
        headers: authHeader(),
        params: { pnr: identifier, status },
      }
    );
    return res.data;
  }
}

// DELETE booking by passenger id
export async function cancelBookingByPassenger(passengerId) {
  if (!passengerId) {
    throw new Error("Missing passengerId for cancel operation");
  }

  const url = `${config.server}/tc/bookings/${passengerId}/cancel`;
  const res = await axios.delete(url, {
    headers: authHeader(),
  });
  return res.data;
}
