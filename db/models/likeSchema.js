const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  onProduct: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
});

module.exports = mongoose.model("Like", likeSchema);