const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

router.post("/login", authController.login);
router.post("/signup", authController.signup);

router.use(authController.protect);

router.get("/get-me", userController.getMe);

router.use(authController.restrictTo("admin"));
router.post("/getAllUsers", userController.getAllUsers);

module.exports = router;
