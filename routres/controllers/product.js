const productModel = require("../../db/models/productSchema");
const likesModel = require("../../db/models/likeSchema");
const commentModel = require("../../db/models/commentSchema");
const userModel = require("./../../db/models/userSchema");

const cloudinary = require("cloudinary").v2;
const { response } = require("express");
// cloudinary configuration
cloudinary.config({
  cloud_name: "daziyd7x1",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
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
    time,
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
    time,
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
  productModel
    .find({ isDeleted: false })
    .populate("likeBy")
    // .sort({ date: -1 })
    .exec(function (err, posts) {
      if (err) return handleError(err);
      res.json(posts);
    });
};

////////////////////////////{ Get One Product }//////////////////////////////////////
const getOneProduct = (req, res) => {
  const { _id } = req.params;
  productModel
    .findById(_id)
    // .populate("comment")
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

/////////////////////////////{  Search  }/////////////////////////////////////
// const search = (req, res) => {
//   const { data } = req.body;
//   productModel
//     .find({
//       $or: [
//         { name: new RegExp(data, "i") },
//         { creator: new RegExp(data, "i") },
//       ],
//     })
//     .then((result) => {
//       if (result.length > 0) {
//         res.status(200).send(result);
//       } else {
//         res.status(404).send("Not found");
//       }
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// };

////////////////////////////{ to add item to cart }//////////////////////////////////////
const addToCart = (req, res) => {
  const { _id } = req.body;
  productModel
    .findOne({ _id })
    .then(async (result) => {
      await userModel.findByIdAndUpdate(req.token.id, {
        $push: { cart: result },
      });
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
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
          likesModel.deleteMany({ Product: _id }, function (err) {
            if (err) return handleError(err);
          });
          commentModel.deleteMany({ Product: _id }, function (err) {
            if (err) return handleError(err);
          });

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
  // search,
};
