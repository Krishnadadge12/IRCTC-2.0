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
      amount: amount,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    });

    res.json(order);
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
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
    res.json({ status: "Payment verified" });
  } else {
    res.status(400).json({ status: "Invalid signature" });
  }
});

/**
 * @swagger
 * /api/payment/process-refund:
 *   post:
 *     summary: Process refund for cancelled booking
 *     description: Creates a refund for a Razorpay payment using payment ID
 *     tags:
 *       - Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               razorpay_payment_id:
 *                 type: string
 *                 description: Razorpay payment ID to refund
 *               amount:
 *                 type: number
 *                 description: Amount to refund in paise (optional - full refund if not provided)
 *               notes:
 *                 type: object
 *                 description: Additional notes for refund
 *     responses:
 *       200:
 *         description: Refund initiated successfully
 *       400:
 *         description: Invalid payment ID or refund failed
 *       500:
 *         description: Server error
 */
router.post("/process-refund", async (req, res) => {
  try {
    const { razorpay_payment_id, amount, notes } = req.body;

    if (!razorpay_payment_id) {
      await logMessage(`Refund failed | Reason: Missing payment ID`);
      return res.status(400).json({ error: "Payment ID is required" });
    }

    await logMessage(
      `Process-refund called | Payment ID: ${razorpay_payment_id} | Amount: ${amount || 'full'}`
    );

    const refundParams = {
      receipt: `refund_${Date.now()}`
    };

    // If amount is provided, refund partial amount (in paise)
    if (amount) {
      refundParams.amount = amount;
    }

    // Add notes if provided
    if (notes) {
      refundParams.notes = notes;
    }

    const refund = await razorpay.payments.refund(
      razorpay_payment_id,
      refundParams
    );

    await logMessage(
      `Refund processed successfully | Payment ID: ${razorpay_payment_id} | Refund ID: ${refund.id} | Amount: ${refund.amount}`
    );

    res.json({
      status: "Refund initiated",
      refund_id: refund.id,
      amount_refunded: refund.amount,
      payment_id: razorpay_payment_id
    });

  } catch (err) {
    console.error("REFUND ERROR:", err);
    await logMessage(
      `Refund processing failed | Message: ${err.message || err.toString()}`
    );
    res.status(400).json({
      error: err.message || "Refund processing failed"
    });
  }
});

module.exports = router;
