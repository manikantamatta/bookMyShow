const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const user_controller = require("../controllers/user");
const auth_middleware = require("../middlewares/auth");
//Create a User
router.post("/",user_controller.createUser);
router.get("/:id",auth_middleware.authenticateToken,user_controller.getUserById);
router.put("/:id",auth_middleware.authenticateToken,user_controller.updateUserById);




module.exports = router;