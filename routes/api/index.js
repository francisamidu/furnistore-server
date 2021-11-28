const router = require("express").Router();

router.use("/shorten", require("./shorten"));
router.use("/link/", require("./link"));
router.use("/links", require("./links"));

module.exports = router;
