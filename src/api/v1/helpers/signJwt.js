const JWT = require("jsonwebtoken");

module.exports = async (
  payload,
  expiration = Math.floor(Date.now() / 1000) + 60 * 60
) => {
  try {
    const token = await JWT.sign(payload, process.env.AUTH_SECRET, {
      expiresIn: expiration,
    });
    return token;
  } catch (error) {
    throw error;
  }
};
