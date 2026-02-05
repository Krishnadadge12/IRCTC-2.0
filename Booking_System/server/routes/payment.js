const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const http = require("http");

// ===================== ENHANCED LOGGING SERVICE =====================
// Reliable logging with queue, retry logic, and proper async handling

const LOG_SERVICE_HOST = process.env.LOG_SERVICE_HOST || "localhost";
const LOG_SERVICE_PORT = process.env.LOG_SERVICE_PORT || 5137;
const LOG_SERVICE_PATH = process.env.LOG_SERVICE_PATH || "/api/logs";


class LogQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
    this.maxRetries = 3;
    this.retryDelay = 500; // ms
  }

  enqueue(message) {
    return new Promise((resolve, reject) => {
      const item = { message, resolve, reject };
      this.queue.push(item);
      if (!this.isProcessing) {
        // start processing but don't return its promise — resolve will be handled per-item
        this.processQueue().catch((err) => {
          // if processQueue fails unexpectedly, reject all queued items
          while (this.queue.length) {
            const queued = this.queue.shift();
            try {
              queued.reject(err);
            } catch (e) {}
          }
        });
      }
    });
  }

  async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const item = this.queue.shift();
      try {
        const result = await this.sendLog(item.message);
        item.resolve(result);
      } catch (err) {
        item.reject(err);
      }
    }

    this.isProcessing = false;
  }

  async sendLog(message, retryCount = 0) {
    return new Promise((resolve) => {
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
          },
          timeout: 5000
        };

        const req = http.request(options, (res) => {
          let responseData = '';

          res.on('data', (chunk) => {
            responseData += chunk;
          });

          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(true);
            } else if (retryCount < this.maxRetries) {
              setTimeout(() => {
                this.sendLog(message, retryCount + 1).then(resolve);
              }, this.retryDelay);
            } else {
              console.warn(`[LOG] Failed to save after ${this.maxRetries} retries:`, message);
              resolve(false);
            }
          });
        });

        req.on('error', (err) => {
          if (retryCount < this.maxRetries) {
            console.warn(`[LOG] Connection error, retrying (${retryCount + 1}/${this.maxRetries}):`, err.message);
            setTimeout(() => {
              this.sendLog(message, retryCount + 1).then(resolve);
            }, this.retryDelay);
          } else {
            console.error(`[LOG] Failed to send log after retries: ${message}`, err.message);
            resolve(false);
          }
        });

        req.setTimeout(5000, () => {
          req.destroy();
          if (retryCount < this.maxRetries) {
            setTimeout(() => {
              this.sendLog(message, retryCount + 1).then(resolve);
            }, this.retryDelay);
          } else {
            resolve(false);
          }
        });

        req.write(data);
        req.end();
      } catch (err) {
        console.error("[LOG] Client error:", err.message);
        resolve(false);
      }
    });
  }
}

const logQueue = new LogQueue();

function logMessage(message) {
  return logQueue.enqueue(message).catch((err) => {
    console.error("[LOG] Queue error:", err.message);
  });
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

    await logMessage(`Create-order called | Amount: ${amount}`);

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    });


    await logMessage(
      `Order created successfully | Order ID: ${order.id} | Amount: ${order.amount}`
    );

    res.json(order);
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    await logMessage(
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
router.post("/verify-payment", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  await logMessage(
    `Verify-payment called | Order ID: ${razorpay_order_id} | Payment ID: ${razorpay_payment_id}`
  );

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    await logMessage(
      `Payment verified | Order ID: ${razorpay_order_id} | Payment ID: ${razorpay_payment_id}`
    );
    res.json({ status: "Payment verified" });
  } else {
    await logMessage(
      `Payment verification failed | Order ID: ${razorpay_order_id} | Payment ID: ${razorpay_payment_id}`
    );
    res.status(400).json({ status: "Invalid signature" });
  }
});

module.exports = router;
