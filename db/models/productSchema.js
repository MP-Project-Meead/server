const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // اسم المنتج
  image: { type: String }, // صورة المنتج
  description: { type: String, required: true }, // وصف للمنتج
  creator: { type: String, required: true }, // المصنع
  size: { type: Number, required: true }, // مقاس المنتج
  price: { type: Number, required: true }, // سعر المنتج
  startingBid: { type: Number, required: true }, // السعر المبدئي للمزاد
  category: { type: String, required: true }, // صنف المنتج
  status: { type: String, required: true }, // حاله البيع
  currentWinner: { type: String }, // المالك الحالي
  currentBid: { type: Number, required: true }, // سعر
  isDeleted: { type: Boolean, default: false }, //محذوف او لا ؟
  limited: { type: Boolean, default: false }, // منتج فريد او لا ؟

  time: { type: Date, default: Date.now }, // تاريخ إضافة المنتج
  pool: { type: Number, required: true },
  duration: { type: Date, default: Date.now }, // مدة المزاد
  startingDate: { type: Date, default: Date.now }, //تاريخ البدء

  like: { type: mongoose.Schema.Types.ObjectId, ref: "Like" },
  // comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  // order: { [type: mongoose.Schema.Types.ObjectId, ref: "Order"] },
});

module.exports = mongoose.model("Product", productSchema);
