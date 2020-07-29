const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/authController");

//POST - Register
router.route("/register").post(authCtrl.registerUser);
//POST - Login
router.route("/login").post(authCtrl.loginUser);

module.exports = router;
