const { generate } = require("otp-generator");

export default () => {
  const token = generate(5, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return token;
};
