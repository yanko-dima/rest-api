const getCurrent = async (req, res, next) => {
  console.log(req.user);
  try {
    const { email, subscription } = await req.user;
    res.json({
      status: "Sucess",
      code: 200,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
