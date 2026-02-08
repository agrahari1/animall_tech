const MilkingSession = require("../models/MilkingSession");

// Start Milking
exports.startMilking = async (req, res) => {
  try {
    const { animalName, musicPlayed } = req.body;

    const session = await MilkingSession.create({
      animalName,
      startTime: new Date(),
      musicPlayed
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Stop Milking
exports.stopMilking = async (req, res) => {
  try {
    const session = await MilkingSession.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    session.endTime = new Date();
    session.duration =
      (session.endTime - session.startTime) / (1000 * 60);

    await session.save();
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Milking History
exports.getMilkingHistory = async (req, res) => {
  try {
    const sessions = await MilkingSession.find().sort({ createdAt: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
