const { Contact, joiSchema } = require("../../models");

const add = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json({
      status: "Success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
