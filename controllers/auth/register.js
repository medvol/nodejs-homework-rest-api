const { Conflict } = require("http-errors");
const gravatar = require("gravatar");

const { User } = require("../../models/user");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, avatarURL });
  await newUser.setPassword(password);
  await newUser.save();

  res.status(201).json({
    user: {
      email,
      subscription: newUser.subscription,
      avatarUrl: newUser.avatarURL,
    },
  });
};

module.exports = register;
