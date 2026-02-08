const express = require("express");
const cors = require("cors");

const milkingRoutes = require("./routes/milking.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/milking", milkingRoutes);

module.exports = app;
