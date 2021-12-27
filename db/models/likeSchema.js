const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  // isLiked: { type: Boolean, default: false },
  byUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  onProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

module.exports = mongoose.model("Like", likeSchema);
