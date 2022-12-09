const { Schema, model } = require("mongoose");
const Joi = require("joi");

const phoneRegexp = /^[0-9]{10}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string()
    .regex(phoneRegexp)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` }),
  favorite: Joi.bool(),
});

const schemas = {
  addContactSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};