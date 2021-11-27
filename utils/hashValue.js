const bcrypt = require("bcryptjs");
module.exports = async (password) => {
  try {
    const hashedValue = await bcrypt.hash(password, 12);
    return hashedValue;
  } catch (error) {
    throw error;
  }
};
