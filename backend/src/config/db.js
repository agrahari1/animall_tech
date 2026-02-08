const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://agrahariprashant1_db_user:Prashant@cluster0.etbjv6c.mongodb.net/?appName=Cluster0",
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB connection failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
