const mongoose = require("mongoose");
const { Schema } = mongoose;

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categories: [String],
  price: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Publication", publicationSchema);