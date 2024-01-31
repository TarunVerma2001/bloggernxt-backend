const Blog = require("../models/blog.model");
const Like = require("../models/like.model");
const { sendRes, readAll } = require("../utils/factoryFunctions");

exports.getAllBlogs = async (req, res, next) => {
  try {
    readAll(Blog, req, res);
  } catch (err) {
    sendRes(res, 400, err, 0, "Something Went Wrong", true);
  }
};

exports.getBlog = async (req, res, next) => {
  try {
    const data = await Blog.findById(req.params.id).populate({
      path: "comments",
    });

    const likes = await Like.countDocuments({ blogId: req.params.id });

    const newData = { blogData: data, likes: likes };

    sendRes(res, 200, newData, 1, "Data Successsfully Fetched");
  } catch (err) {
    sendRes(res, 400, err, 0, "Something Went Wrong", true);
  }
};

exports.creatBlog = async (req, res, next) => {
  try {
    const data = await Blog.create({
      title: req.body.title,
      author: req.user.name,
      description: req.body.description,
      avatar: req.body.avatar,
    });

    sendRes(res, 201, data, 1, "Data Created Successsfully");
  } catch (err) {
    sendRes(res, 400, err, 0, "Something Went Wrong", true);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    console.log(req.user.name);
    const data = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        avatar: req.body.avatar,
      },
      { new: true }
    );

    sendRes(res, 200, data, 1, "Data Updated Successsfully");
  } catch (err) {
    sendRes(res, 400, err, 0, "Something Went Wrong", true);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const data = await Blog.findByIdAndDelete(req.params.id);

    sendRes(res, 204, data, 1, "Data Deleted Successsfully");
  } catch (err) {
    sendRes(res, 400, err, 0, "Something Went Wrong", true);
  }
};
