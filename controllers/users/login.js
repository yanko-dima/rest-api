const { User, joiAuthSchema } = require("../../models");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = joiAuthSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const user = await User.findOne({ email });
    if (!user || !user.verify || !user.comparePassword(password)) {
      throw createError(
        401,
        `Email is wrong ore not verify, or password is wrong`
      );
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      status: "Success",
      code: 200,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
