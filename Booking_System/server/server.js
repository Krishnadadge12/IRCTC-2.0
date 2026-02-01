require("dotenv").config();
const paymentRouter=require("./routes/payment");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const app = express();

// ===================== MIDDLEWARE =====================
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Swagger UI

app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// ===================== ROUTES =====================
app.use("/api/payment", paymentRouter); 
// payment routes > Razorpay (create order, verify, refund)

// ===================== HEALTH CHECK =====================
app.get("/", (req, res) => {
  res.send("MRC Payment Server Running");
});

// ===================== ERROR HANDLER =====================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
  });
});

// ===================== SERVER START =====================
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log("KEY SECRET:", process.env.RAZORPAY_KEY_SECRET);

});
