const contactsOperations = require("../../models/contacts");

const getAll = async (_, res) => {
  const contacts = await contactsOperations.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: contacts,
  });
};

module.exports = getAll;
