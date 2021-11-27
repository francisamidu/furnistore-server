const { generate } = require("otp-generator");

module.exports = () => {
  try {
    const token = generate(5, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    return token;
  } catch (error) {
    throw error;
  }
};
