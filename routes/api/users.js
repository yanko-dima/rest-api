const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");
const { isAuth, uploadAvatar } = require("../../middlewares");

router.post("/signup", ctrl.signup);

router.post("/login", ctrl.login);

router.get("/current", isAuth, ctrl.getCurrent);

router.get("/logout", isAuth, ctrl.logout);

router.patch(
  "/avatars",
  isAuth,
  uploadAvatar.single("avatarURL"),
  ctrl.updateAvatar
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

module.exports = router;
