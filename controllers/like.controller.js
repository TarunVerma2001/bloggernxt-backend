const Like = require("../models/like.model");
const { readAll, sendRes } = require("../utils/factoryFunctions");

exports.getAllLike = async (req, res, next) => {
  try {
    readAll(Like, req, res);
  } catch (err) {
    sendRes(res, 400, err, 0, "Something Went Wrong", true);
  }
};

exports.like = async (req, res, next) => {
  try {
    const like = await Like.findOne({
      blogId: req.body.blogId,
      userId: req.user.id,
    });

    if (like) {
      sendRes(res, 200, like, 1, "Like already exist", false);
      return;
    }

    const data = await Like.create({
      blogId: req.body.blogId,
      userId: req.user.id,
    });

    sendRes(res, 201, data, 1, "Liked", false);
  } catch (err) {
    sendRes(res, 400, err, 0, "Something Went Wrong", true);
  }
};

exports.dislike = async (req, res, next) => {
  try {
    const like = await Like.findByIdAndDelete(req.params.id);
    sendRes(res, 200, like, 1, "Disliked", false);
  } catch (err) {
    sendRes(res, 400, err, 0, "Something Went Wrong", true);
  }
};
