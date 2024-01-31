const User = require("../models/user.model");
const { sendRes, readAll } = require("../utils/factoryFunctions");

exports.getAllUsers = async (req, res, next) => {
  try {
    readAll(User, req, res);
  } catch (err) {
    sendRes(res, 400, err, 0, "Something Went Wrong 1", true);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    sendRes(
      res,
      200,
      { user: req.user },
      1,
      "Request Successfully Served",
      false
    );
  } catch (err) {
    sendRes(res, 400, err, 0, "Something Went Wrong", true);
  }
};
