const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const DB = process.env.DB;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/////////////////////////////////////////////

mongoose.connect(process.env.DB, options).then(
  () => {
    console.log("DB Ready is To Use");
  },
  (err) => {
    console.log(err);
  }
);

/////////////////////////////////////////////
