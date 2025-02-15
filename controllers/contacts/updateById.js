const { Contact, joiSchema } = require("../../models");
const createError = require("http-errors");

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw createError(404, `Product with id=${contactId} not found`);
    }
    res.status(200).json({
      status: "Success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
