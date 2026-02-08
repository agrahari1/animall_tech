const mongoose = require("mongoose");

const milkingSessionSchema = new mongoose.Schema(
  {
    animalName: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: Date,
    duration: Number, // minutes
    musicPlayed: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("MilkingSession", milkingSessionSchema);
