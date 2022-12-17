const express = require("express");
const { validationBody, ctrlWrapper, auth } = require("../../middlewares");

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

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
