const express = require("express");
const userRouter = express.Router();
const {
  signUp,
  logIn,
  confirmEmail,
  ForgetPassword,
  resetPassword,
  deleteUser,
  getAllUsers,
  getOneUser,
  updateProfile,
} = require("./../controllers/user");
const authentication = require("./../middleWares/authentication");
const authorization = require("./../middleWares/authorization");

////////////////////////////////////////////////////////////////

userRouter.post("/signUp", signUp); // يشتغل 
userRouter.post("/logIn", logIn); // يشتغل 
userRouter.delete("/delete/:_id", authentication, authorization, deleteUser); //يشتغل 
userRouter.get("/allusers", authentication, authorization, getAllUsers); //يشتغل
userRouter.get("/users/:_id" , authentication, getOneUser); // Get user by Id  // يشتغل 
userRouter.put("/updateProfile/:_id", authentication, updateProfile);
////////////////////////////////////////////////////////////////

userRouter.get("/confirmation/:email/:token", confirmEmail);//يشتغل 
userRouter.put("/forgetPassword", ForgetPassword); // يشتغل 
userRouter.put("/resetPassword", resetPassword); //يشتغل

module.exports = userRouter;