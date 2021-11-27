const JWT = require("jsonwebtoken");

module.exports = async (token) => {
  try {
    const isValidToken = await JWT.verify(token, process.env.AUTH_SECRET);
    return { payload: isValidToken, expired: false };
  } catch (error) {
    return { payload: null, expired: error.message.includes("jwt expired") };
  }
};
