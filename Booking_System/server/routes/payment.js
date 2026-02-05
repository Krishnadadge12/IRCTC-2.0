const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const http = require("http");

// Simple logger integration to external LoggingService
// Does not affect existing payment flow; failures are swallowed.
const LOG_SERVICE_HOST = process.env.LOG_SERVICE_HOST || "localhost";
const LOG_SERVICE_PORT = process.env.LOG_SERVICE_PORT || 5137;
const LOG_SERVICE_PATH = process.env.LOG_SERVICE_PATH || "/api/logs";

function logMessage(message) {
  try {
    const data = JSON.stringify({ message });

    const options = {
      hostname: LOG_SERVICE_HOST,
      port: LOG_SERVICE_PORT,
      path: LOG_SERVICE_PATH,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data)
      }
    };

    const req = http.request(options, (res) => {
      // consume response to free up memory; no need to do anything with it
      res.on("data", () => {});

    });

    req.on("error", (err) => {
      console.error("LOGGING SERVICE ERROR:", err.message || err);
    });

    req.write(data);
    req.end();
  } catch (err) {
    console.error("LOGGING CLIENT ERROR:", err.message || err);
  }
}

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

/**
 * @swagger
 * /api/payment/create-order:
 *   post:
 *     summary: Create Razorpay order
 *     description: Creates a Razorpay order for payment
 *     tags:
 *       - Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 500
 *     responses:
 *       200:
 *         description: Order created successfully
 *       500:
 *         description: Server error
 */
router.post("/create-order", async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);

    const { amount } = req.body;

    logMessage(`Create-order called | Amount: ${amount}`);

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    });

    logMessage(
      `Order created successfully | Order ID: ${order.id} | Amount: ${order.amount}`
    );

    res.json(order);
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    logMessage(
      `Create-order error | Message: ${err.message || err.toString()}`
    );
    res.status(500).json({ error: err.message || "Order creation failed" });
  }
});

/**
 * @swagger
 * /api/payment/verify-payment:
 *   post:
 *     summary: Verify Razorpay payment
 *     description: Verifies Razorpay payment signature
 *     tags:
 *       - Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *               razorpay_payment_id:
 *                 type: string
 *               razorpay_signature:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified
 *       400:
 *         description: Invalid signature
 */
router.post("/verify-payment", (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  logMessage(
    `Verify-payment called | Order ID: ${razorpay_order_id} | Payment ID: ${razorpay_payment_id}`
  );

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    logMessage(
      `Payment verified | Order ID: ${razorpay_order_id} | Payment ID: ${razorpay_payment_id}`
    );
    res.json({ status: "Payment verified" });
  } else {
    logMessage(
      `Payment verification failed | Order ID: ${razorpay_order_id} | Payment ID: ${razorpay_payment_id}`
    );
    res.status(400).json({ status: "Invalid signature" });
  }
});

module.exports = router;
