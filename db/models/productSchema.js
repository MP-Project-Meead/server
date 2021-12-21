const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  name:{ type: String, required: true}, // اسم المنتج
  image: { type: String }, // صورة المنتج
  description: { type: String, default: false }, // وصف المنتج
  time: { type: Date, default: Date.now }, // تاريخ إضافة المنتج
  isDeleted : { type: Boolean, default: false }, //محذوف او لا ؟
  Limited:{ type: Boolean, default: false },// منتج فريد او لا ؟
  status: {type : String , required: true } // حاله البيع 
  creator: { type: String, required: true}, // المصنع
  size: { type: Number, required: true}, // مقاس المنتج
  price: { type: Number, required: true},// سعر المنتج
  category: { type: String, required: true},// صنف المنتج
  startingBid: { type: Number, required: true}, // السعر المبدئي للمزاد 
  pool : { type: Number, required: true},
  duration : { type: Date, default: Date.now }, // مدة المزاد
  currentWinner : { type: String, required: true},// المالك الحالي
  startingDate : { type: Date, default: Date.now },//تاريخ البدء 
  currentBid : { type: Number, required: true}،  // سعر 

  Comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  like: { type: mongoose.Schema.Types.ObjectId, ref: "Like" },
});

module.exports = mongoose.model("Product", post);
