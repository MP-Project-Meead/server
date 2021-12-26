const express = require("express");
const roleRouter = express.Router();

const { createRole, roles } = require("./../controllers/role");

roleRouter.post("/create", createRole); //يشتغل
roleRouter.get("/", roles); //يشتغل

module.exports = roleRouter;
