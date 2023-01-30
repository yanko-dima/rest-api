const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id name subscription");
    res.json({
      status: "Sucess",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
