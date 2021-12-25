const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  description: { type: String, required: true },
  time: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  byUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  onProduct: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

module.exports = mongoose.model("Comment", comment);

/////////////////////////////////////////////////////////////////////////////////\
