const router = require("express").Router();

const { logoutService } = require("../services/index");

router.post("/", logoutService);

module.exports = router;
