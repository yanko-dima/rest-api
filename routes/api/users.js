const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");

router.put("/signup", ctrl.signup);

router.put("/login", ctrl.login);

router.get("/current", ctrl.current);

module.exports = router;
