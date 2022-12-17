const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id} = req.user;
  const { page = 1, limit = 5, favorite} = req.query;
  const skip = (page - 1) * limit;
console.log(favorite)
  // if (favorite) {
  //   const contacts = await Contact.find({owner: _id , favorite}, "-createdAt -updatedAt", {
  //   skip,
  //   limit: Number(limit),
  //   }).populate("owner", "_id email");
     
  // }
  const contacts = await Contact.find(
    { owner: _id, favorite},
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
