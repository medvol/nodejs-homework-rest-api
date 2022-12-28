const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const handleErrors = require("../helpers/handleSchemaErrors");

const subscription = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscription,
      default: "starter",
    },
    avatarURL: String,
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = async function (password) {
  this.password = await bcrypt.hash(password, 10);
};

userSchema.methods.validPassword = async function (password) {
  const comparePassword = await bcrypt.compare(password, this.password);
  return comparePassword;
};

userSchema.post("save", handleErrors);

const registerUserSchema = Joi.object({
  password: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  subscription: Joi.string().valid(...subscription),
});

const loginUserSchema = Joi.object({
  password: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const schemas = {
  registerUserSchema,
  loginUserSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
