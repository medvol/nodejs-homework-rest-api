const express = require("express");
const { validationBody, ctrlWrapper, isValidId } = require("../../middlewares");

const { auth: ctrl } = require("../../controllers");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validationBody(schemas.registerUserSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validationBody(schemas.loginUserSchema),
  ctrlWrapper(ctrl.login)
);

module.exports = router;
