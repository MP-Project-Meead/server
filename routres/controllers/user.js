const userModel = require("./../../db/models/userSchema");
const productModel = require("./../../db/models/productSchema");
const commentModel = require("./../../db/models/commentSchema");
const likeModel = require("./../../db/models/likeSchema");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRETKEY = process.env.secretKey;
const SALT = Number(process.env.SALT);

////////////////////////////////////{   sign Up       }//////////////////////////////////////////
const signUp = async (req, res) => {
  const { name, username, email, password, role } = req.body;
  const saveEmail = email.toLowerCase();
  const saveUsername = username.toLowerCase();
  const found = await userModel.findOne({
    $or: [{ email: saveEmail }, { username: saveUsername }],
  }); /// يدخل ايميل او يوزر
  //////////////////////////////////////////
  if (found) {
    // اذا كان اليوزر موجود
    return res.status(204).json("already there");
  }
  if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)) {
    const savePass = await bcrypt.hash(password, SALT);
    const newUser = new userModel({
      name,
      username: saveUsername,
      email: saveEmail,
      password: savePass,
      role,
    });
    newUser // نسيّف البيانات اللي دخلناها
      .save()
      .then((result) => {
        console.log(result);
        // generate token
        const token = jwt.sign({ _userId: result._id }, SECRETKEY, {
          expiresIn: "24h",
        });
        /// ارسال بريد تحقق الى الايميل
        const transporter = nodemailer.createTransport(
          sendgridTransport({
            auth: {
              api_key: process.env.ApiKey,
            },
          })
        );
        const mailOptions = {
          //// الايميل اللي بتوصلني منه رساله
          from: "fationproject@gmail.com",
          to: result.email,
          subject: "Account Verification Link",
          text:
            "Hello " +
            req.body.username +
            ",\n\n" +
            "Please verify your account by clicking the link: \nhttp://" +
            req.headers.host +
            "/user/confirmation/" +
            result.email +
            "/" +
            token +
            "\n\nThank You!\n",
        };
        console.log("here");

        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            return res.status(500).send({
              msg: "Technical Issue!, Please click on resend to verify your Email.",
            });
          }
          return res
            .status(200)
            .send(
              "A verification email has been sent to " +
                result.email +
                ". It will be expire after one day"
            );
        });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(210).json("you need to insert a complix password");
  }
};

///////////////////////////////////{   Log in           }//////////////////////////////////////////
const logIn = (req, res) => {
  const { emailOrUserName, password } = req.body;
  newInput = emailOrUserName.toLowerCase();
  userModel
    .findOne({ $or: [{ email: newInput }, { username: newInput }] })
    .populate("role") //
    .then(async (result) => {
      if (result) {
        if (result.isDeleted) {
          /// يشيك اذا اليوزر موجود او محذوف
          return res.status(203).json("your account has been deleted");
        }
        //// unhash password //// يقارن بين الباسوورد المشفرة بالباسوورد الاصليه ؟
        const savePass = await bcrypt.compare(password, result.password); //compare return boolean
        if (savePass) {
          if (!result.isVerified) {
            return res.status(203).json("Your Email has not been verified");
          }
          const payload = {
            //اخزن الرول و الأيدي في البيلود
            role: result.role,
            id: result._id,
          };
          const token = await jwt.sign(payload, SECRETKEY); //options //
          res.status(200).json({ result, token });
        } else {
          res.status(206).json("invalid email or password");
        }
      } else {
        res.status(206).json("invalid email or password");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

///////////////////////////////////{   Confirm Email    }//////////////////////////////////
const confirmEmail = (req, res) => {
  token = req.params.token;
  jwt.verify(token, SECRETKEY, (err, resul) => {
    console.log(resul);
    if (err) {
      return res
        .status(400)
        .send(
          "Your verification link may have expired. Please click on resend for verify your Email."
        );
    } else {
      userModel.findOne(
        { _id: resul._userId, email: req.params.email },
        function (err, user) {
          // not valid user
          if (!user) {
            return res.status(401).send({
              msg: "We were unable to find a user for this verification. Please SignUp!",
            });
          }
          // user is already verified
          else if (user.isVerified) {
            return res
              .status(200)
              .send("User has been already verified. Please Login");
          }
          // verify user
          else {
            // change isVerified to true
            user.isVerified = true;
            user.save(function (err) {
              // error occur
              if (err) {
                return res.status(500).send({ msg: err.message });
              }
              // account successfully verified
              else {
                return res
                  .status(200)
                  .send(
                    `Your account has been successfully verified <a href="">Back to log in</a>`
                  );
              }
            });
          }
        }
      );
    }
  });
  //  check valid user
};

///////////////////////////////////{   Forget Password  }///////////////////////////////
const ForgetPassword = (req, res) => {
  const { email } = req.body;
  userModel.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(201).send("this user does not exisits");
    }
    if (!user.isVerified) {
      return res.status(201).send("verify your email first ");
    }
    const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, {
      expiresIn: "60m",
    });
    const transporter = nodemailer.createTransport(
      sendgridTransport({
        auth: {
          api_key: process.env.ApiKey,
        },
      })
    );
    const mailOptions = {
      from: "fationproject@gmail.com",
      to: email, // or user.email,
      subject: "password reset Link",
      text:
        "Hello " +
        user.username +
        ",\n\n" +
        "Please reset your password by using the following code  : " +
        ",\n\n" +
        token + //splice
        "\n\nThank You!\n",
    };
    //        token.slice(token.length - 10) +
    return user.updateOne({ resetLink: token }, (err, result) => {
      //splice
      if (err) {
        return res.status(400).send("rest password link error");
      } else {
        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            return res.status(500).send({
              msg: "Technical Issue!",
            });
          }
          return res
            .status(200)
            .send("A rest password email has been sent to " + user.email);
        });
      }
    });
  });
};


///////////////////////////////////{   Reset Password  }///////////////////////////////

const resetPassword = (req, res) => {
  const { resetLink, newPassword } = req.body;
  if (
    newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)
  ) {
    if (resetLink) {
      jwt.verify(
        resetLink, //splice
        process.env.RESET_PASSWORD_KEY,
        async (err, result) => {
          if (err) {
            return res.status(201).json("token error");
          }
          const savePass = await bcrypt.hash(newPassword, SALT);
          userModel.findOne({ resetLink }, (err, user) => {
            //splice
            if (err || !user) {
              return res
                .status(201)
                .json("user with this token does not exists");
            }

            return user.updateOne(
              { resetLink: "", password: savePass },
              (err, resultt) => {
                if (err) {
                  return res.status(400).json("error");
                }
                return res
                  .status(200)
                  .json("your password has been updated successfully");
              }
            );
          });
        }
      );
    } else {
      return res.status(201).json("authentication error");
    }
  } else {
    res.status(201).json("you need to insert a complix password");
  }
};
///////////////////////////////////{   Get All Users    }///////////////////////////////////
const getAllUsers = async (req, res) => {
  userModel
    .find({ isDeleted: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

///////////////////////////////////{   Get One User     }///////////////////////////////////
const getOneUser = async (req, res) => {
  const { _id } = req.params;
  userModel
    .find({ _id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

///////////////////////////////////{   Delete User     }///////////////////////////////////
const deleteUser = (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  userModel
    .findById({ _id })
    .then((result) => {
      console.log(result);
      if (result) {
        if (!result.isDeleted) {
          userModel.updateOne(
            { _id },
            { $set: { isDeleted: true } },
            function (err) {
              if (err) return res.status(400).json(err);
            }
          );

          productModel.updateMany(
            { by: _id },
            { $set: { isDeleted: true } },
            function (err) {
              if (err) return res.status(400).json(err);
            }
          );
          commentModel.updateMany(
            { by: _id },
            { $set: { isDeleted: true } },
            function (err) {
              if (err) return res.status(400).json(err);
            }
          );
          likeModel.updateMany(
            { by: _id },
            { $set: { isLiked: false } },
            function (err) {
              if (err) return handleError(err);
            }
          );

          return res.status(200).json("done");
        }
        return res.json("this user already have been deleted");
      } else {
        return res.status(404).json("user not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  signUp,
  logIn,
  confirmEmail,
  ForgetPassword,
  resetPassword,
  deleteUser,
  getAllUsers,
  getOneUser,
};
