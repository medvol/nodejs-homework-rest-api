const { User } = require("../../models/user");

const logout = async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).send("No Content");
};

module.exports = logout;
