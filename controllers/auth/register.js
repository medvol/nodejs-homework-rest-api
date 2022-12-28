const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { User } = require("../../models/user");
const { sendEmail, createVerifyEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const avatarURL = gravatar.url(email);

  const verificationToken = v4();

  const newUser = new User({ email, avatarURL, verificationToken });
  await newUser.setPassword(password);
  await newUser.save();

  const mail = createVerifyEmail(email, verificationToken);

  await sendEmail(mail);

  res.status(201).json({
    user: {
      email,
      subscription: newUser.subscription,
      avatarUrl: newUser.avatarURL,
    },
  });
};

module.exports = register;
