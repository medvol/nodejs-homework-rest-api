const express = require("express");
const { validationBody, ctrlWrapper, isValidId } = require("../../middlewares");

const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/register", ctrlWrapper(ctrl.register));

module.exports = router;
