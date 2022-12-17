const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const updateFavorite = async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!contact) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: contact,
  });
};

module.exports = updateFavorite;
