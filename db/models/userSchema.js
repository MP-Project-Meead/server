const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  avatar: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  },
  password: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },

  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    default: "61c42c3139940ec8e18224d0",
  },
  // comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  // like: { type: mongoose.Schema.Types.ObjectId, ref: "Like" },
});

module.exports = mongoose.model("User", userSchema);
