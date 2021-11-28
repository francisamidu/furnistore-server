const { AES } = require("crypto-js");
module.exports = async (password) => {
  try {
    const hashedValue = await AES.encrypt(
      password,
      process.env.SECRET
    ).toString();
    return hashedValue;
  } catch (error) {
    throw error;
  }
};
