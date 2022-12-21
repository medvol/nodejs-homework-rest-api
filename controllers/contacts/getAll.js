const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find(
    { owner: _id, favorite: favorite || [true, false] },
    "-createdAt -updatedAt",
    {
      skip,
      limit: Number(limit),
    }
  ).populate("owner", "_id email");
  res.json({
    status: "success",
    code: 200,
    data: contacts,
  });
};

module.exports = getAll;
