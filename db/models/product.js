const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name:{ type: String, required: true}, // اسم المنتج
  image:  { type: String }, // صورة المنتج
  description: { type: String, default: false },
  time: { type: Date, default: Date.now },
  isDeleted : { type: Boolean, default: false },
  Limited:{ type: Boolean, default: false },
  status: {type : String , required: true }
  creator: { type: String, required: true},
  size: { type: Number, required: true},
  price: { type: Number, required: true},
  category: { type: String, required: true},
  startingBid: { type: Number, required: true}, // السعر المبدئي للمزاد 
  pool : { type: Number, required: true},
  duration : { type: Date, default: Date.now },
  currentWinner : { type: String, required: true},
  startingDate : { type: Date, default: Date.now },
  currentBid : { type: Number, required: true},


  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  like: { type: mongoose.Schema.Types.ObjectId, ref: "Like" },

});

module.exports = mongoose.model("Post", post);
