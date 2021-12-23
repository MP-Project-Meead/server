const express = require("express");
const authentication = require("./../middleWares/authentication");
const {createComment,deleteComment,getProductComment} = require("./../controllers/comment");


////////////////////////////////////////////////////////////////////////////////////////////

const commentRouter = express.Router();

commentRouter.post("/create", authentication, createComment);
commentRouter.get("/allComments", authentication, getProductComment);
commentRouter.delete("/delete/:_id", authentication, deleteComment); 


module.exports = commentRouter;
