const express = require("express");

const router = express.Router();
const { NotFound, BadRequest } = require("http-errors");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
});

const contactsOperations = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsOperations.getContactById(id);
    if (!contact) {
      throw new NotFound("Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw new BadRequest("missing required name field");
    }
    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
 try {
   const { id } = req.params
   const deletedContact = await contactsOperations.removeContact(id)
    if (!deletedContact) {
      throw new NotFound("Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: deletedContact,
    });
 } catch (error) {
  next(error)
 }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw new BadRequest("missing fields");
    }
    const { id } = req.params;
    const contact = await contactsOperations.updateContact(id, req.body);
    if (!contact) {
      throw new NotFound("Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
