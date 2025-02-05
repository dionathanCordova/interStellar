// src/server.js
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require( "../swagger.json");
const checkHorizonStatus = require("./middlewares/check-horizon-status");

const app = require('./app');
const PORT = process.env.PORT || 3000;

app.use(checkHorizonStatus);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📜 Documentação disponível em http://localhost:${PORT}/api-docs`);
});
