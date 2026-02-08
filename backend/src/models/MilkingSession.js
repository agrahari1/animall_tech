const mongoose = require("mongoose");

const milkingSessionSchema = new mongoose.Schema(
  {
    milkQuantity: {
      type: Number,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: Date,
    duration: Number, // minutes
  },
  { timestamps: true },
);

module.exports = mongoose.model("milking_sessions", milkingSessionSchema);
