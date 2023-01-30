const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { isAuth } = require("../../middlewares");

router.get("/", isAuth, ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", isAuth, ctrl.add);

router.delete("/:contactId", ctrl.removeById);

router.put("/:contactId", ctrl.updateById);

router.patch("/:contactId/favorite", ctrl.updateFavorite);

module.exports = router;
