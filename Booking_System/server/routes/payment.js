const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

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

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    });
    axios.post("http://localhost:5137/api/logs", {
      message: `Payment order created. OrderId=${order.id}, Amount=${amount}`,
      timestamp: Date.now()
      }).catch(err => { 
      console.error("Failed to log to DotNet:", err);
    });
    res.json(order);
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
     axios.post("http://localhost:5137/api/logs", {
      message: `Payment order created. OrderId=${order.id}, Amount=${amount}`,
      timestamp: Date.now()
    }).catch(err => { 
      console.error("Failed to log to DotNet:", err);
    });
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

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
     axios.post("http://localhost:5137/api/logs", {
          message: `Payment verified. PaymentId=${razorpay_payment_id}`,
          timestamp: Date.now()
    }).catch(err => { 
      console.error("Failed to log to DotNet:", err);
    });
    res.json({ status: "Payment verified" });
  } else {
     axios.post("http://localhost:5137/api/logs", {
      message: `Payment verification failed. PaymentId=${razorpay_payment_id}`,
      timestamp: Date.now()
    }).catch(err => { 
      console.error("Failed to log to DotNet:", err);
    });
    res.status(400).json({ status: "Invalid signature" });
  }
});

module.exports = router;
