module.exports = async (providedPassword, originalPassword) => {
  try {
    const isMatch = providedPassword === originalPassword;
    return isMatch;
  } catch (error) {
    throw error;
  }
};
