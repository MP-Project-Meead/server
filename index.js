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


//////////////// Role Router ////////////////////////////
const roleRouter = require("./routres/routes/role");
app.use("/role", roleRouter);


//////////////////// User Router /////////////////////////
const userRouter = require("./routres/routes/user");
app.use("/user", userRouter);


//////////////////// Product Router /////////////////////////
const productRouter = require("./routres/routes/product");
app.use("/product", productRouter);


//////////////////// Comment Router /////////////////////////
const commentRouter = require("./routres/routes/comment");
app.use("/comment", commentRouter);


/////////////////////////////////////////////
app.listen(PORT, () => {
  console.log(`server is running on  ${PORT}`);
});
