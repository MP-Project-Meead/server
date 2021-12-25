const commentModel = require("../../db/models/commentSchema");
const roleModel = require("./../../db/models/roleSchema");

////////////////////////////////////{  Create New Comment  }//////////////////////////////////////////

const createNewComment = (req, res) => {
  const { description, user, product } = req.body;
  const comment = new commentModel({
    description,
    user,
    product,
  });
  comment
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

////////////////////////////////////{  Comments of The Products  }//////////////////////////////////////////

const getProductComment = (req, res) => {
  const { onProduct } = req.body;
  commentModel
    .find({})
    .populate("onProduct")
    .where("onProduct")
    .equals(onProduct)
    .exec(function (err, comments) {
      if (!comments) {
        return res.status(404).json("Product not found");
      }
      if (!comments.length) {
        return res.json("this Product dosnt have any comments");
      }
      if (err) return handleError(err);
      res.json(comments);
    });
};

////////////////////////////////////{  Delete Comment  }//////////////////////////////////////////

const deleteComment = async (req, res) => {
  //// االيوزر و الادمن يقدرون يحذفون الكومنت

  const { _id } = req.params;
  const reqUserId = req.token.id; //user
  const userId = req.token.role;
  const Result = await roleModel.findById(userId); //admin -- Result.role =="adimn"
  const Result2 = await commentModel.findById(_id).populate("onPost"); //post owner -- Result2.onPost.postedBy
  const Result3 = await commentModel.findById(_id); // comment owner
  if (
    Result.role == "adimn" ||
    Result2.onPost.postedBy == reqUserId ||
    Result3.by == reqUserId
  ) {
    commentModel.deleteOne({ _id }, function (err, result) {
      if (err) return handleError(err);
      if (result.deletedCount !== 0) {
        return res.status(200).json("deleted");
      } else {
        return res.status(404).json("not found");
      }
    });
  } else {
    return res.status(403).json({ message: "forbidden" });
  }
};

module.exports = {
  createNewComment,
  getProductComment,
  deleteComment,
};
