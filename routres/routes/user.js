const express = require("express");
const userRouter = express.Router();
const {
  signUp,
  logIn,
  confirmEmail,
  ForgetPassword,
  deleteUser,
  getAllUsers,
  getOneUser,
} = require("./../controllers/user");
const authentication = require("./../middleWares/authentication");
const authorization = require("./../middleWares/authorization");

////////////////////////////////////////////////////////////////

userRouter.post("/signUp", signUp);
userRouter.post("/logIn",logIn);
userRouter.delete("/delete/:_id",authentication, authorization, deleteUser);
userRouter.get("/allusers", getAllUsers);
userRouter.get("/users/:id", authentication, getOneUser); // Get user by Id ;

////////////////////////////////////////////////////////////////

userRouter.get("/confirmation/:email/:token", confirmEmail);
userRouter.put("/forgetPassword", ForgetPassword);


module.exports = userRouter ;
