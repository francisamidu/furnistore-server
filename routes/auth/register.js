const router = require("express").Router();
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("email", "Please provide a valid email address").isEmail(),
    check(
      "password",
      "Password should have at least, 8 characters,1 number,1 lowercase character,1 uppercase character and 1 special character"
    ).isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    }),
  ],
  require("../../handlers/registrationHandler")
);

module.exports = router;
