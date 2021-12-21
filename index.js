const express = require("express");
 require("dotenv").config();
const db = require("./db/db.js");
const morgan = require("morgan");
const cors = require("cors");


/////////////////////////////////////////////

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


/////////////////////////////////////////////


app.listen(PORT, () => {
  console.log(`server is running on  ${PORT}`);
});
