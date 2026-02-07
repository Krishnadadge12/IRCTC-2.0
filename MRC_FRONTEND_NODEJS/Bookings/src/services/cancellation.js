import axios from "axios";
import { config } from "./config";

function authHeader() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Cancel booking and process refund
 * @param {number} bookingId - The booking ID
 * @param {object} bookingData - Full booking data (should contain razorpayPaymentId)
 * @returns {Promise} - Result of cancellation with refund
 */
export async function cancelBookingWithRefund(bookingId, bookingData) {
  try {
    // Step 1: Cancel booking in Spring Boot backend
    const cancelRes = await axios.patch(
      `${config.server}/bookings/${bookingId}/cancel`,
      {},
      {
        headers: authHeader(),
      }
    );

    // Extract payment ID from response (backend returns it in BookingResponseDto)
    let paymentId = null;
    
    if (cancelRes.data) {
      paymentId =
        cancelRes.data?.razorpayPaymentId ||
        cancelRes.data?.razorpay_payment_id ||
        cancelRes.data?.paymentId ||
        cancelRes.data?.payment_id;
    }

    if (!paymentId) {
      console.warn("No payment ID found in cancellation response");
    }

    // If cancellation succeeds and we have a payment ID, process refund
    if (cancelRes.status === 200 && paymentId) {
      try {
        const refundRes = await axios.post(
          "http://localhost:5000/api/payment/process-refund",
          {
            razorpay_payment_id: paymentId,
            notes: {
              booking_id: bookingId,
              reason: "Booking cancelled by user"
            }
          }
        );

        return {
          success: true,
          cancellation: cancelRes.data,
          refund: refundRes.data,
          message: `Booking cancelled and refund of ₹${refundRes.data.amount_refunded / 100} initiated`
        };
      } catch (refundErr) {
        console.error("Refund processing error:", refundErr);

        // Log the refund failure
        try {
          await axios.post("http://localhost:5137/api/logs", {
            message: `Refund failed for booking ${bookingId} | Payment ID: ${paymentId} | Error: ${refundErr.message}`
          });
        } catch (logErr) {
          console.error("Failed to log refund error:", logErr);
        }

        return {
          success: true,
          cancellation: cancelRes.data,
          refund: null,
          warning: "Booking cancelled but refund processing failed. Please contact support.",
          error: refundErr.message
        };
      }
    }

    // If no payment ID but cancellation succeeded
    return {
      success: true,
      cancellation: cancelRes.data,
      refund: null,
      message: "Booking cancelled successfully"
    };

  } catch (err) {
    console.error("Cancellation error:", err);

    // Log the cancellation failure
    try {
      await axios.post("http://localhost:5137/api/logs", {
        message: `Booking cancellation failed | Booking ID: ${bookingId} | Error: ${err.message}`
      });
    } catch (logErr) {
      console.error("Failed to log cancellation error:", logErr);
    }

    throw {
      success: false,
      error: err.message || "Failed to cancel booking",
      details: err.response?.data
    };
  }
}

/**
 * Get cancellation policy details
 */
export function getCancellationPolicy() {
  return {
    title: "Cancellation Policy",
    policies: [
      {
        time: "More than 24 hours before departure",
        refund: "100% refund",
        charges: "No cancellation charges"
      },
      {
        time: "12-24 hours before departure",
        refund: "75% refund",
        charges: "25% cancellation charges"
      },
      {
        time: "6-12 hours before departure",
        refund: "50% refund",
        charges: "50% cancellation charges"
      },
      {
        time: "Less than 6 hours before departure",
        refund: "No refund",
        charges: "Non-refundable"
      }
    ]
  };
}
