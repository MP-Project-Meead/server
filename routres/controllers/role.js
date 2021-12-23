const roleModel = require("./../../db/models/roleSchema");

////////////////////////////////// Create Role /////////////////////////////////////////////
////  هنا ننشئ تصنيفات اليوزر  إما يكون ادمن او مستخدم عادي و اعطيه الصلاحيات الخاصة فيه

const createRole = (req, res) => {
  console.log("fffffffff");
  const { role, permissions } = req.body;
  const newRole = new roleModel({
    role,
    permissions,
  });

  newRole
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//////////////////////////////// Get the Roles ///////////////////////////////////////////////

const roles = (req, res) => {
  console.log("fffffffff");

  roleModel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { createRole, roles };
