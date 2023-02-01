const createError = require("http-errors");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { User, joiAuthSchema } = require("../../models");
const { sendEmail } = require("../../helpers");

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

    const verificationToken = v4();
    const avatarURL = gravatar.url(email);
    const newUser = new User({ email, avatarURL, verificationToken });
    newUser.setPassword(password);
    await newUser.save();

    const mail = {
      to: email,
      from: "yanko.dmitriy@gmail.com",
      subject: "Verification email",
      html: `<a target="_blank" href="http:localhost:3001/api/users/verify/${verificationToken}">Verificay you Email</a>`,
    };

    await sendEmail(mail);

    res.json({
      status: "Success",
      code: 201,
      data: {
        user: {
          email,
          avatarURL,
          verificationToken,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
