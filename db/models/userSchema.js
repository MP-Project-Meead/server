const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name : { type: String, required: true},
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  avatar : {type: String,},
  password: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },

  role: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  comment : { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  like : { type: mongoose.Schema.Types.ObjectId, ref: "Like" },
});

module.exports = mongoose.model("User", userSchema);
