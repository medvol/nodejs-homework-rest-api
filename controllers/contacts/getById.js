const { NotFound } = require("http-errors");
const { Contact } = require("../../models/contact");

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: contact,
  });
};

module.exports = getById;
