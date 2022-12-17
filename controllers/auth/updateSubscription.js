const { User } = require("../../models/user");
const { NotFound } = require("http-errors");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!user) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: user,
  });
};

module.exports = updateSubscription;
