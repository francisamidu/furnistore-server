const router = require("express").Router();
const { check } = require("express-validator");

const { loginService } = require("../services/index");

router.post(
  "/",
  [check("username").isEmpty(), check("password").isEmpty()],
  loginService
);

module.exports = router;
