const likeModel = require("../../db//models/likeSchema");
const productModel = require("../../db/models/productSchema");

///////////////////////////////////{   like Product     }///////////////////////////////////

const addLike = (req, res) => {
  const { onProduct } = req.body;
  const newlike = new likeModel({
    onProduct: onProduct,
    byUser: req.token.userId,
  });
  newlike.save().then((result) => {
    productModel
      .findByIdAndUpdate(onProduct, { $push: { like: result._id } })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });
};

///////////////////////////////////{   Remove Like     }///////////////////////////////////

const deleteLike = (req, res) => {
  const { onProduct } = req.body;
  likesModel
    .findOneAndRemove({ onProduct: onProduct })
    .exec()
    .then((result) => {
      productModel
        .findByIdAndUpdate(onProduct, { $pull: { like: result._id } })
        .then((result) => {
          res.status(201).json("deleted");
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

///////////////////////////////////{   get Like     }///////////////////////////////////


const getLiked = (req, res) => {
  const { byUser } = req.body;
  likesModel
    .find({})
    .populate("onProduct")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

///////////////////////////////////////////////////////////////////

module.exports = {
  addLike,
  deleteLike,
  getLiked,
};
