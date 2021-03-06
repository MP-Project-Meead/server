const productModel = require("../../db/models/productSchema");
const userModel = require("./../../db/models/userSchema");
const { response } = require("express");

//////////////////////////{ Create Product  }/////////////////////////////////////////
const createProduct = async (req, res) => {
  const {
    category,
    name,
    image,
    gender,
    description,
    creator,
    size,
    price,
    isDeleted,
  } = req.body;

  const post = new productModel({
    category,
    name,
    image: image,
    gender,
    description,
    creator,
    size,
    price,
    isDeleted,
  });
  post
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

////////////////////////////{ Get All Product  }//////////////////////////////////////
const getAllProduct = (req, res) => {
  productModel.find({ isDeleted: false }).exec(function (err, posts) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    }
    res.json(posts);
  });
};

////////////////////////////{ Get One Product }//////////////////////////////////////
const getOneProduct = (req, res) => {
  const { _id } = req.params;
  productModel
    .findById(_id)
    .then((result) => {
      if (result.isDeleted) {
        return res.status(201).json("this Product already have been deleted");
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

////////////////////////////{ to add item to cart }//////////////////////////////////////
const addToCart = (req, res) => {
  // console.log(_id + );

  const { _id } = req.body;
  userModel.findById(req.token.id).then(async (result) => {
    let resu = await result.cart.includes(_id);
    if (resu) {
      userModel
        .findOneAndUpdate(
          { _id: req.token.id },
          { $pull: { cart: _id } },
          { new: true }
        )
        .then((result) => {
          res.status(200).json("removed successfully");
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      productModel
        .findOne({ _id })
        .then(async (result) => {
          await userModel.findByIdAndUpdate(req.token.id, {
            $push: { cart: result },
          });
          res.status(201).json("added successfully");
        })
        .catch((err) => {
          res.status(400).json(err);
          console.log(err);
        });
    }
  });
};

const checkCart = (req, res) => {
  const { _id } = req.params;
  userModel.findById(req.token.id).then(async (result) => {
    let resuu = await result.cart.includes(_id);
    if (resuu) {
      return res.status(200).json("this item in your cart");
    } else {
      return res.status(204).json("this item isn't in your cart");
    }
  });
};
////////////////////////////{ delete item from the cart }//////////////////////////////////////
const deleteFromCart = (req, res) => {
  const { id } = req.params;
  productModel
    .findOne({ _id: id })
    .then(async (result) => {
      await userModel.findByIdAndUpdate(req.token.id, {
        $pull: { cart: id },
      });

      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("deleteFromCart err", err);
      res.status(400).json(err);
    });
};
////////////////////////////{ Get User Liked }//////////////////////////////////////

const userCart = (req, res) => {
  userModel
    .findOne({ _id: req.token.id })
    .select("cart")
    .populate("cart")
    .then((result) => {
      // console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
};

/////////////////////////{ Delete Product  }///////////////////////////////////////////
const deleteProduct = async (req, res) => {
  const { _id } = req.params; //_id: product id

  productModel.findOne({ _id }).then((result) => {
    if (req.token.role.role === "admin") {
      productModel.deleteOne({ _id }, function (err, result2) {
        if (result2.deletedCount !== 0) {
          return res.status(200).json("deleted");
        } else {
          return res.status(404).json("not found");
        }
      });
    } else {
      return res.status(403).json({ message: "forbidden" });
    }
  });
};

///////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  createProduct,
  getAllProduct,
  getOneProduct,
  userCart,
  deleteProduct,
  addToCart,
  deleteFromCart,
  checkCart,
  // search,
};
