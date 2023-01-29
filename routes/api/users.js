const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");
const { isAuth } = require("../../middlewares");

router.put("/signup", ctrl.signup);

router.put("/login", ctrl.login);

router.get("/current", isAuth, ctrl.getCurrent);

module.exports = router;
