const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/authRoutes");
require("dotenv").config();
require("./config/passport");
const { connectToMongoDB } = require("./config/db");

// Connect to MongoDB
connectToMongoDB();

// Define routes
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);


// MongoDB connection
// mongoose
//   .connect("mongodb://localhost:27017/mydatabase", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//   });

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to Bloggy");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
