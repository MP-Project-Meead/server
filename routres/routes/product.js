const express = require("express");
const authentication = require("./../middleWares/authentication");
const authorization = require("./../middleWares/authorization");

const {
  createProduct,
  getAllProduct,
  userCart,
  getOneProduct,
  deleteProduct,
  addToCart,
  deleteFromCart,
  checkCart,
  // search,
} = require("./../controllers/product");

const productRouter = express.Router();
productRouter.post("/create", createProduct); 
productRouter.get("/", getAllProduct); 
// productRouter.get("/userliked/:likedBy", authentication, getUserLiked);
productRouter.get("/oneProduct/:_id", getOneProduct); 
// productRouter.get("/search", search); 
productRouter.delete("/delete/:_id", authentication, authorization, deleteProduct); // اشتغل
productRouter.get("/checkCart/:_id", authentication, checkCart);

productRouter.get("/userCart", authentication, userCart);
productRouter.put("/addToCart", authentication, addToCart);
productRouter.put("/deleteFromCart/:id", authentication, deleteFromCart);

module.exports = productRouter;
