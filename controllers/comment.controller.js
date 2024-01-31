const Comment = require("../models/comments.model");
const { readAll, sendRes } = require("../utils/factoryFunctions");

exports.getAllComments = async (req, res, next) => {
  try {
    readAll(Comment, req, res);
  } catch (err) {
    sendRes(res, 400, err, 0, "Something Went Wrong", true);
  }
};

exports.createComment = async (req, res, next) => {
  try {
    const data = await Comment.create({
      author: req.user.id,
      description: req.body.description,
      blog: req.body.blogId,
    });

    sendRes(res, 201, data, 1, "Data Created Successsfully");
  } catch (err) {
    sendRes(res, 400, err, 0, "Something Went Wrong", true);
  }
};
