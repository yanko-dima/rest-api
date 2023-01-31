const createError = require("http-errors");
const { User } = require("../../models");

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw createError(404, "Not found");
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
    res.json({
      message: "Verify success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
