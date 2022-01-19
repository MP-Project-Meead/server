// const commentModel = require("../../db/models/commentSchema");
// const productModel = require("../../db/models/productSchema");

// ////////////////////////////////////{  Create New Comment  }//////////////////////////////////////////

// const createNewComment = (req, res) => {
//   const { description, onProduct } = req.body;

//   const comments = new commentModel({
//     description,
//     byUser: req.token.id,
//     onProduct: onProduct,
//   });

//   comments.save().then((result) => {
//     productModel
//       .findByIdAndUpdate(onProduct, { $push: { comment: result._id } })
//       .then((result) => {
//         res.status(201).json(result);
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   });
// };

// ////////////////////////////////////{  Comments of The Products  }//////////////////////////////////////////

// const getCommentsForProduct = (req, res) => {
//   const { id } = req.params; // post id

//   commentModel
//     .find({ onProduct: id, deleted: false })
//     .populate("byUser")
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// };

// ////////////////////////////////////{  Update Comment  }//////////////////////////////////////////
// const updateComment = (req, res) => {
//   const { description } = req.body;
//   const { id } = req.params;
//   commentModel
//     .findByIdAndUpdate(
//       id,
//       { $set: { description: description } },
//       { new: true }
//     )
//     .then((result) => {
//       if (result) {
//         res.status(200).json(result);
//       } else {
//         res.status(404).json(err);
//       }
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// };

// ////////////////////////////////////{  Delete Comment  }//////////////////////////////////////////

// const deleteComment = (req, res) => {
//   const { id } = req.params;

//   commentModel
//     .findByIdAndUpdate(id, { $set: { isDeleted: true } })
//     .exec()
//     .then((result) => {
//       res.status(200).json("Deleted");
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// };

// module.exports = {
//   createNewComment,
//   getCommentsForProduct,
//   updateComment,
//   deleteComment,
// };
