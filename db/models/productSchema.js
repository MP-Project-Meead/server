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
});
module.exports = mongoose.model("Product", productSchema);
