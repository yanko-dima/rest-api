const { Contact } = require("../../models");
const createError = require("http-errors");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw createError(404, `Product with id=${contactId} not found`);
    }
    res.json({
      status: "Sucess",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
