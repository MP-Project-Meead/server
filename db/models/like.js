const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({

  by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  onProduct: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
});

module.exports = mongoose.model("like", likeSchema);