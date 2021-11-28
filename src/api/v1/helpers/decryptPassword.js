const { AES } = require("crypto-js");

module.exports = (password) => {
  try {
    const hashedPassword = AES.decrypt(user.password, process.env.SECRET);
    const decryptedPassword = hashedPassword.toString(enc.utf8);
    return decryptedPassword;
  } catch (error) {
    throw error;
  }
};
