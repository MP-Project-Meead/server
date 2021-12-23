const commentModel = require("../../db/models/commentSchema");
const roleModel = require("./../../db/models/roleSchema");



////////////////////////////////////{  Create Comment  }//////////////////////////////////////////


const createComment = (req, res) => {
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