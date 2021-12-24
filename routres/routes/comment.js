const express = require("express");
const authentication = require("./../middleWares/authentication");
const { createNewComment, deleteComment, getProductComment } = require("./../controllers/comment");


////////////////////////////////////////////////////////////////////////////////////////////

const commentRouter = express.Router();

commentRouter.post("/createComment", authentication, createNewComment);
commentRouter.get("/getAllComments", authentication, getProductComment);
commentRouter.delete("/deleteComment/:_id", authentication, deleteComment); 


module.exports = commentRouter;
