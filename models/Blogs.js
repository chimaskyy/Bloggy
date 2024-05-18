const mongoose = require("mongoose");

const schema = mongoose.Schema;

const BlogSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  author: {
    type: schema.Types.ObjectId, // Use ObjectId to reference another document
    ref: "users", // Reference the User model
    required: true,
  },
  state: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  reading_time: {
    type: Number,
    required: true,
    default: 0,
  },
  read_count: {
    type: Number,
    required: true,
    default: 0,
  },
  tags: {
    type: [String],
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Blog", BlogSchema);
