const express = require("express");
const router = express.Router();

router.use("/blogs", require("./blog.routes"));
router.use("/comments", require("./comment.routes"));
router.use("/users", require("./user.routes"));
router.use("/likes", require("./like.routes"));

module.exports = router;
