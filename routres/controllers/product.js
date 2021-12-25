const productModel = require("../../db/models/productSchema");
const likesModel = require("../../db/models/likeSchema");
const commentModel = require("../../db/models/commentSchema");
const roleModel = require("./../../db/models/roleSchema");

//////////////////////////{ Create Product  }/////////////////////////////////////////
const createProduct = (req, res) => {
  const {
    name,
    image,
    description,
    creator,
    size,
    price,
    startingBid,
    category,
    status,
    currentWinner,
    currentBid,
  } = req.body; // creator: req.token.id ?
  const post = new productModel({
    name,
    image,
    description,
    creator,
    size,
    price,
    startingBid,
    category,
    status,
    currentWinner,
    currentBid,
  });

  post
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

////////////////////////////{ Get All Product  }//////////////////////////////////////
const getAllProduct = (req, res) => {
  productModel
    .find({ isDeleted: false })
    // .sort({ date: -1 })
    .exec(function (err, posts) {
      if (err) return handleError(err);
      res.json(posts);
    });
};

/////////////////////////{ Delete Product  }//////////////////////////////////////////////
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
  deleteProduct,
};
