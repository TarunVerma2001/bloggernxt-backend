const express = require("express");
const router = express.Router();
const likeController = require("../controllers/like.controller");
const authController = require("../controllers/auth.controller");

router.post("/getAllLikes", likeController.getAllLike);

router.use(authController.protect);

router.delete("/dislike/:id", likeController.dislike);
router.post("/like", likeController.like);

module.exports = router;
