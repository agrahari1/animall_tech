const express = require("express");
const router = express.Router();
const {
  startMilking,
  stopMilking,
  getMilkingHistory
} = require("../controllers/milking.controller");

router.post("/start", startMilking);
router.put("/stop/:id", stopMilking);   // IMPORTANT
router.get("/", getMilkingHistory);

module.exports = router;
