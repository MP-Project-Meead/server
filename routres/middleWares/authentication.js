const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRETKEY = process.env.SECRETKEY;

/////////////////////////////////////////////////////

const authentication = (req, res, next) => {
  try {
    // يشيك اذا فيه توكن او لا؟
    if (!req.headers.authorization) {
      return res.status(403).json({ message: "forbidden" });
    }

    // يشيك اذا التوكن شغّال للآن او انتهى
    const token = req.headers.authorization.split(" ")[1];
    phraseToken = jwt.verify(token, SECRETKEY);
    req.token = phraseToken;
    next();
  } catch (error) {
    res.status(403).json(error);
  }
};

module.exports = authentication;
