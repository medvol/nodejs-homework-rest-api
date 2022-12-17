const express = require("express");

const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const {
  auth,
  validationBody,
  ctrlWrapper,
  isValidId,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

const validateMiddleware = validationBody(schemas.addContactSchema);

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", auth, validateMiddleware, ctrlWrapper(ctrl.add));

router.put("/:id", isValidId, validateMiddleware, ctrlWrapper(ctrl.updateById));

router.patch(
  "/:id/favorite",
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
