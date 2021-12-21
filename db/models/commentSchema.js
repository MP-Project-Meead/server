const mongoose = require("mongoose");

const comment = new mongoose.Schema({

  description: { type: String, required: true },
  time: { type: Date, default: Date.now },
  isDel: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
});

module.exports = mongoose.model("Comment", comment);

/////////////////////////////////////////////////////////////////////////////////\
