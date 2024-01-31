const mongoose = require("mongoose");
const Comment = require("./comments.model");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Provide title of Blog"],
    },
    author: {
      type: String,
      required: [true, "Please Provide author of Blog"],
    },
    description: {
      type: String,
      required: [true, "Please Provide description of Blog"],
    },
    avatar: {
      type: String,
      default: "https://github.com/shadcn.png",
      required: [true, "Please Provide avatar of Blog"],
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

blogSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "blog",
  localField: "_id",
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
