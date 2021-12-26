const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: {type: mongoose.Schema.Types.ObjectId,ref: "Product",required: true,},
});

module.exports = mongoose.model("Order", orderSchema);
