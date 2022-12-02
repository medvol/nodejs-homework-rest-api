const { NotFound } = require("http-errors");
const contactsOperations = require("../../models/contacts");

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsOperations.getContactById(id);
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
