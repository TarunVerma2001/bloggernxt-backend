const mongoose = require("mongoose");
const User = require("./user.model");
const Blog = require("./blog.model");

const commentSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Please Provide description of Comment"],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Please Provide author of Blog"],
    },
    blog: {
      type: mongoose.Schema.ObjectId,
      ref: "Blog",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "name avatar",
  });
  next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
