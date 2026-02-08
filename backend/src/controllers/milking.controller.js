const MilkingSession = require("../models/MilkingSession");

// Start Milking
exports.startMilking = async (req, res) => {
  try {
    const session = await MilkingSession.create({
      startTime: new Date(),
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Stop Milking
exports.stopMilking = async (req, res) => {
  try {
    const { milkQuantity, duration } = req.body;

    //  Validate milk quantity
    if (milkQuantity === undefined || milkQuantity === null) {
      return res.status(400).json({
        message: "milkQuantity is required",
      });
    }

    if (Number(milkQuantity) < 0) {
      return res.status(400).json({
        message: "milkQuantity must be greater than or equal to 0",
      });
    }

    //  Validate duration
    if (duration === undefined || duration === null) {
      return res.status(400).json({
        message: "duration is required",
      });
    }

    if (Number(duration) < 0) {
      return res.status(400).json({
        message: "duration must be greater than or equal to 0",
      });
    }

    //  Find session
    const session = await MilkingSession.findById(req.params.id);
    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    //  Stop time
    session.endTime = new Date();

    //  Save provided values
    session.milkQuantity = Number(milkQuantity);
    session.duration = Number(duration); // ⬅️ from body

    await session.save();

    //  Response
    res.status(200).json({
      message: "Milking session stopped successfully",
      data: {
        sessionId: session._id,
        startTime: session.startTime,
        endTime: session.endTime,
        duration: session.duration,
        milkQuantity: session.milkQuantity,
      },
    });
  } catch (error) {
    console.error("Stop milking error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
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
