const express = require("express");
const roleRouter = express.Router();

const { createRole, roles } = require("./../controllers/role");

roleRouter.post("/create", createRole);
roleRouter.get("/", roles);

module.exports = roleRouter;
