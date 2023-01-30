const createHttpError = require("http-errors");
const { User } = require("../../models");

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    if (!_id) {
      throw createHttpError(401, "Not authorized");
    }

    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
