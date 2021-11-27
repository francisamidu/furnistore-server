const router = require("express").Router();

const { check } = require("express-validator");

router.post(
  "/",
  [check("username").isEmpty(), check("password").isEmpty()],
  require("../../handlers/loginHandler")
);

module.exports = router;
