const { User, joiAuthSchema } = require("../../models");
const createError = require("http-errors");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, "Email in use");
    }

    const { error } = joiAuthSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const newUser = new User({ email });
    newUser.setPassword(password);
    newUser.save();

    res.json({
      status: "Success",
      code: 201,
      data: {
        user: {
          email,
          subscription: "starter",
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
