const express = require("express");
const router = express.Router();
const {
registerValidation
   }= require("../validations/auth.validation");
const authController = require("../modules/userAuth/auth.controller");

router.post("/register",registerValidation, authController.register);
router.post("/login", authController.login);

module.exports = router;
