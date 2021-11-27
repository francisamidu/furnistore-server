const router = require("express").Router();

router.delete("/", require("../../handlers/logoutHandler"));

module.exports = router;
