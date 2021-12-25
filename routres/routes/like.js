const express = require("express");
const { likeProduct, checkLike } = require("./../controllers/like");
const authentication = require("./../middleWares/authentication");

const likesRouter = express.Router();

likesRouter.get("/:onProduct", authentication, checkLike);
likesRouter.put("/", authentication, likeProduct); //---------auth

module.exports = likesRouter;
