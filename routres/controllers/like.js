const likesModel = require("../../db//models/likeSchema");

///////////////////////////////////{   likem Product     }///////////////////////////////////

const likeProduct = (req, res) => {
  // like toggle

  const { user, onProduct } = req.body; // user: req.token.id ?

  likesModel.findOne({ user, onProduct }).then((result) => {
    console.log(result);
    if (result) {
      likesModel.deleteOne({ user, onProduct }, function (err) {
        if (err) return res.status(400).json(err);
      });
      res.status(200).json("unliked successfully");
    } else {
      const like = new likesModel({
        user,
        onProduct,
      });
      like
        .save()
        .then((result) => {
          res.status(201).json(`liked successfully`);
        })
        .catch((err) => {
          res.send(err);
        });
    }
  });
};

///////////////////////////////////{   Check Like     }///////////////////////////////////

const checkLike = (req, res) => {
  const { onProduct } = req.params; // user: req.token.id ?
  likesModel.findOne({ user: req.token.id, onProduct }).then((result) => {
    if (result) {
      res.status(201).json("its liked");
    } else {
      res.status(200).json(`its unliked`);
    }
  });
};

module.exports = {
  likeProduct,
  checkLike,
};
