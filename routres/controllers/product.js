const postsModel = require("../../db/models/productSchema");
const likesModel = require("../../db/models/likeSchema");
const commentModel = require("../../db/models/commentSchema");
const roleModel = require("./../../db/models/roleSchema");

/////////////////////////////////////////////////////////////////////////////

const createPost = (req, res) => {
  const { name, description, postedBy } = req.body; // postedBy: req.token.id ?
  const post = new postsModel({
    image,
    description,
    postedBy,
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
