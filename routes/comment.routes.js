const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const authController = require("../controllers/auth.controller");

router.post("/readAll", commentController.getAllComments);
// router.get("/read/:id", blogController.getBlog);

router.use(authController.protect);

router.post("/create", commentController.createComment);
// router.delete("/delete/:id", blogController.deleteBlog);
// router.patch("/update/:id", blogController.updateBlog);

module.exports = router;
