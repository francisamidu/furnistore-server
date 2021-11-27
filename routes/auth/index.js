const router = require("express").Router();

router.use("/login", require("./login"));
router.use("/logout", require("./logout"));
router.use("/register", require("./register"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
