const express = require("express");
const { likeProduct, checkLike } = require("./../controllers/like");
const authentication = require("./../middleWares/authentication");

const likesRouter = express.Router();

likesRouter.put("/", authentication, likeProduct); //يشتغل
likesRouter.get("/:onProduct", authentication, checkLike); //يشتغل


module.exports = likesRouter;
