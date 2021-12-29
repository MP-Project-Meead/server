const express = require("express");
const authentication = require("./../middleWares/authentication");
const authorization = require("./../middleWares/authorization");

const {
  createProduct,
  getAllProduct,
  getOneProduct,
  deleteProduct,
  search,
} = require("./../controllers/product");

const productRouter = express.Router();
productRouter.post("/create", authentication, authorization, createProduct); // اشتغل
productRouter.get("/", authentication, getAllProduct); // اشتغل
postsRouter.get("/oneProduct/:_id", authentication, getOneProduct); 

productRouter.get("/search", search); 
productRouter.delete("/delete/:_id", authentication, authorization, deleteProduct); // اشتغل

module.exports = productRouter;
