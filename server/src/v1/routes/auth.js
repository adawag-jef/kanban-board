const router = require("express").Router();
const { body } = require("express-validator");
const validation = require("../handlers/validation");
const tokenHandler = require("../handlers/tokenHandler");
const User = require("../models/user");
const userController = require("../controllers/user");

router.post(
  "/signup",
  body("username")
    .isLength({ min: 8 })
    .withMessage("username must be atleast 8 characters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be atleast 8 characters"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("confirmPassword must be atleast 8 characters"),
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("username already used");
      }
    });
  }),
  validation.validate,
  userController.reqister
);