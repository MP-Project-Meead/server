const express = require("express");
const userRouter = express.Router();
const { signUp,confirmEmail,ForgetPassword} = require("./../controllers/user");

userRouter.post("/create", signUp);
userRouter.get("/confirmation/:email/:token", confirmEmail);
userRouter.put("/forgetPassword", ForgetPassword);