const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MRC Payment API",
      version: "1.0.0",
      description: "Razorpay Payment APIs"
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server"
      }
    ]
  },
  apis: ["./routes/*.js"]
};

module.exports = swaggerJSDoc(swaggerOptions);
