const router = require("express").Router();

// Register routes
router.use("/login", require("../controllers/loginController"));
router.use("/logout", require("../controllers/logoutController"));
router.use("/register", require("../../controllers/registerationController"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
