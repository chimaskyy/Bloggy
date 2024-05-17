const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

function connectToMongoDB() {
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err);
    });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
}

module.exports = { connectToMongoDB };
