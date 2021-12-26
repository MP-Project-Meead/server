const express = require("express");
const authentication = require("./../middleWares/authentication");
const {
  createNewComment,
  deleteComment,
  getProductComment,
} = require("./../controllers/comment");

////////////////////////////////////////////////////////////////////////////////////////////

const commentRouter = express.Router();

commentRouter.post("/createComment", authentication, createNewComment); // يشتغل
commentRouter.get("/getAllComments", authentication, getProductComment); // يشتغل
commentRouter.delete("/deleteComment/:_id", authentication, deleteComment); // يشتغل

module.exports = commentRouter;
