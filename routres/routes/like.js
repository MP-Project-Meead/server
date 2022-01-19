const express = require("express");
const { getLiked, addLike, deleteLike } = require("./../controllers/like");
const authentication = require("./../middleWares/authentication");

const likesRouter = express.Router();



likesRouter.post("/getLiked", authentication, getLiked);
likesRouter.post("/addLike", authentication, addLike);
likesRouter.put("/deleteLike", authentication, deleteLike);




module.exports = likesRouter;
