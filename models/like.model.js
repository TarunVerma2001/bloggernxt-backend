const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  blogId: {
    type: String,
    ref: "Blog",
  },
  userId: {
    type: String,
    ref: "User",
  },
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
