const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller");
const authController = require("../controllers/auth.controller");

router.post("/readAll", blogController.getAllBlogs);
router.get("/read/:id", blogController.getBlog);

router.use(authController.protect);

router.post("/create", blogController.creatBlog);
router.delete("/delete/:id", blogController.deleteBlog);
router.patch("/update/:id", blogController.updateBlog);

module.exports = router;
