const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const updateById = async (req, res) => {
  // const { id } = req.params;
  // const contact = await contactsOperations.updateContact(id, req.body);
  // if (!contact) {
  //   throw new NotFound("Not found");
  // }
  // res.json({
  //   status: "success",
  //   code: 200,
  //   data: contact,
  // });
};

module.exports = updateById;
