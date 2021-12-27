const express = require("express");
const authentication = require("./../middleWares/authentication");
const authorization = require("./../middleWares/authorization");

const {
  createProduct,
  getAllProduct,
  deleteProduct,
  search,
} = require("./../controllers/product");

const productRouter = express.Router();

productRouter.post("/create", authentication, authorization, createProduct); // اشتغل
productRouter.get("/", authentication, getAllProduct); // اشتغل
productRouter.get("/search", search); // اشتغل

productRouter.delete("/delete/:_id", authentication, authorization, deleteProduct); // اشتغل

module.exports = productRouter;
