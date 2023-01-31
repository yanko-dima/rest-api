const multer = require("multer");
const path = require("path");

const tempDir = path.resolve("temp");

const multerConfig = multer.diskStorage({
  destination: (reg, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

const uploadAvatar = multer({
  storage: multerConfig,
});

module.exports = uploadAvatar;
