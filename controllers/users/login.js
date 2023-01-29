const { User, joiAuthSchema } = require("../../models");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

// const decodeToken = jwt.decode(token);
// const verifyTocen = jwt.verify(token, SECRET_KEY);

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = joiAuthSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      throw createError(401, `Email or password is wrong`);
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
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
