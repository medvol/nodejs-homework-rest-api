const { Unauthorized, BadRequest } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const validPassword = await user.validPassword(password);

  if (!user || !validPassword) {
    throw new Unauthorized("Email or password is wrong");
  }

  if (!user.verify) {
    throw new BadRequest("User not verify");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
