const router = require("express").Router();
const { check } = require("express-validator");

const { registrationService } = require("../services/index");

router.post(
  "/",
  [
    check("email").isEmpty(),
    check("email").isEmail(),
    check("password").isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
    }),
  ],
  registrationService
);

module.exports = router;
