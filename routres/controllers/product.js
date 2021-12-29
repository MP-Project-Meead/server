const productModel = require("../../db/models/productSchema");
const likesModel = require("../../db/models/likeSchema");
const commentModel = require("../../db/models/commentSchema");
const roleModel = require("./../../db/models/roleSchema");

//////////////////////////{ Create Product  }/////////////////////////////////////////
const createProduct = (req, res) => {
  const {
    category,
    name,
    image,
    description,
    creator,
    size,
    price,
    step,
    startingBid,
    status,
    isDeleted,
    auction,
    time,
    duration,
    currentBid,
    startingDate,
    currentWinner,
  } = req.body; // creator: req.token.id ?

  const post = new productModel({
    category,
    name,
    image,
    description,
    creator,
    size,
    price,
    step,
    startingBid,
    status,
    isDeleted,
    auction,
    time,
    duration,
    currentBid,
    startingDate,
    currentWinner,
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

////////////////////////////{ Get One Product }//////////////////////////////////////

const getOneProduct = (req, res) => {
  const { _id } = req.params;
  productModel
    .findById({ _id })
    // .populate("postedBy")
    .then((result) => {
      console.log(result);
      if (result.isDeleted) {
        return res.status(201).json("this Product already have been deleted");
      }
      finalResult = [];
      likesModel
        .find({ onProduct: _id })
        .populate("onProduct")
        .populate("byUser")
        .exec()
        .then((likesresult) => {
          commentModel
            .find({ onProduct: _id })
            .populate("onProduct")
            .populate("byUser")
            .exec()
            .then((commentresult) => {
              finalResult.push({
                _id: result._id,
                category: result.result,
                name: result.name,
                image: result.image,
                description: result.description,
                creator: result.creator,
                size: result.size,
                price: result.price,
                time: result.time,
              });
              finalResult.push({ likes: likesresult.length });
              finalResult.push(
                commentresult.map((elem) => {
                  console.log(elem);
                  return {
                    description: elem.description,
                    byUser: elem.byUser.username,
                    _id: elem.byUser._id,
                    commentId: elem._id,
                    // img: elem.by.img,
                  };
                })
              );

              res.json(finalResult);
            });
        });
    })
    .catch((err) => {
      res.send(err);
    });
};

/////////////////////////////{   Search     }/////////////////////////////////////
const search = (req, res) => {
  const { data } = req.body;
  productModel
    .find({
      $or: [
        { name: new RegExp(data, "i") },
        { creator: new RegExp(data, "i") },
      ],
    })
    .then((result) => {
      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send("Not found");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
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
  deleteProduct,
  search,
};
