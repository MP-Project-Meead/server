const userModel = require("./../../db/models/userSchema");
const productModel = require("./../../db/models/productSchema");
const comModel = require("./../../db/models/commentSchema");
const likeModel = require("./../../db/models/likeSchema");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.secretKey;

//////////////////////////////////// signUp //////////////////////////////////////////

const signUp = async (req, res) => {


  const { name, username, email, password , role } = req.body;
  const saveEmail = email.toLowerCase();
  const saveUsername = username.toLowerCase();
  const found = await userModel.findOne({ $or: [{ email: saveEmail }, { username: saveUsername }]});


 //////////////////////////////////////////

  if (found) {
    return res.status(204).json("already there");
  }
  if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)) {
    console.log("okkkk");
    const savePass = await bcrypt.hash(password, SALT);
    const newUser = new userModel({
      email: saveEmail,
      password: savePass,
      username: saveUsername,
      role,
    });
    newUser
      .save()
      .then((result) => {
        // generate token
        const token = jwt.sign({ _userId: result._id }, SECRETKEY, {
          expiresIn: "24h",
        });
        // Send email (use verified sender's email address & generated API_KEY on SendGrid)
        const transporter = nodemailer.createTransport(
          sendgridTransport({
            auth: {
              api_key: process.env.ApiKey,
            },
          })
        );
        const mailOptions = {
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
        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            return res.status(500).send({
              msg: "Technical Issue!, Please click on resend for verify your Email.",
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

//////////////////////////////////// confirmEmail ////////////////////////////////////

const confirmEmail = (req, res) => {
  token = req.params.token;
  jwt.verify(token, SECRETKEY, (err, resul) => {
    console.log(resul);
    if (err) {
      return res.status(400).send("Your verification link may have expired. Please click on resend for verify your Email.");
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
                  .send(`Your account has been successfully verified <a href="https://socialmedia-website.netlify.app">Back to log in</a>`);
              }
            });
          }
        }
      );
    }
  });
  //  check valid user
};

//////////////////////////////////// ForgetPassword //////////////////////////////////

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

module.exports = { signUp , confirmEmail , ForgetPassword };