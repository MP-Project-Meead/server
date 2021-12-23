const express = require("express");
const userRouter = express.Router();
const {
  signUp,
  logIn,
  confirmEmail,
  ForgetPassword,
  deleteUser,
} = require("./../controllers/user");

////////////////////////////////////////////////////////////////

userRouter.post("/create", signUp);
userRouter.post("/log", logIn);
userRouter.delete("/delete", deleteUser);
userRouter.get("/confirmation/:email/:token", confirmEmail);
userRouter.put("/forgetPassword", ForgetPassword);


module.exports = userRouter ;
