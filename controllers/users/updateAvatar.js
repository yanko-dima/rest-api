const { User } = require("../../models");
const fs = require("fs").promises;
const Jimp = require("jimp");
const path = require("path");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const image = await Jimp.read(tempUpload);
  await image.resize(250, 250);
  await image.writeAsync(tempUpload);
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(id, { avatarURL });

    res.status(200).json({
      status: "Success",
      code: 200,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    fs.unlink(tempUpload);
    next(error);
  }
};

module.exports = updateAvatar;
