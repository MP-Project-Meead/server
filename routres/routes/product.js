const express = require("express");
const authentication = require("./../middleWares/authentication");
const authorization = require("./../middleWares/authorization");

const {
  createProduct,
  getAllProduct,
  deleteProduct,
} = require("./../controllers/product");

const productRouter = express.Router();

productRouter.get("/", authentication, getAllProduct);
productRouter.post("/create", authentication, authorization, createProduct);
productRouter.delete(
  "/delete/:_id",
  authentication,
  authorization,
  deleteProduct
);

module.exports = productRouter;
