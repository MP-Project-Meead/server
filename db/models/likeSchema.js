const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  // isLiked: { type: Boolean, default: false },
  byUser: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  onProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    
  },
});

module.exports = mongoose.model("Like", likeSchema);
