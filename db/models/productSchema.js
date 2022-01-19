const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: { type: String, required: true }, //صنف المنتج
  name: { type: String, required: true }, //اسم المنتج
  image: [{ type: String, required: true }], //صورة المنتج
  gender: { type: String, required: true }, //نسائي أو رجالي
  description: { type: String, required: true }, //وصف للمنتج
  creator: { type: String, required: true }, //المصنع
  size: { type: Number, required: true }, //مقاس المنتج
  price: { type: Number, required: true }, //سعر المنتج
  isDeleted: { type: Boolean, default: false }, //محذوف او لا ؟
  time: { type: Date, default: Date.now }, //تاريخ إضافة المنتج


  
  likeBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});
module.exports = mongoose.model("Product", productSchema);


// step: { type: Number }, //الحد الأدنى للزيادة في السوم
  // startingBid: { type: Number }, //السعر المبدئي للمزاد
  // status: { type: String, default: false }, //حاله البيع
  // currentBid: { type: Number }, //السعر الحالي للمنتج
  // auction: { type: Boolean, default: false }, //منتج يحتاج مزاد او لا؟
  // duration: { type: Date, default: Date.now }, //مدة المزاد
  // startingDate: { type: Date, default: Date.now }, //تاريخ البدء
  // currentWinner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // المالك الحالي
  // likeBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // order: { [type: mongoose.Schema.Types.ObjectId, ref: "Order"] },