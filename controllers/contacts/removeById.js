const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const removeById = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await Contact.findByIdAndRemove(id);
  if (!deletedContact) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    message:'object deleted',
    data: deletedContact,
  });
};

module.exports = removeById;
