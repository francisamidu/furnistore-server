//Database models
const Token = require("../db/models/Token");

//Logs out current user and deletes their session
const logoutServices = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.body;
    const storedRefreshToken = await Token.findOne({ token: refreshToken });
    if (!storedRefreshToken) {
      return res.status(400).json({
        message: "Logout failed. Please provide a valid refresh token",
        success: false,
      });
    }
    await Token.findOneAndDelete({ token: accessToken });
    await Token.findOneAndDelete({ token: refreshToken });

    //Revoke access token cookie
    res.cookie("accessToken", "", {
      httpOnly: true,
      maxAge: 0,
    });

    //Revoke refresh token cookie
    res.cookie("refreshToken", "", {
      httpOnly: true,
      maxAge: 0,
    });
    return res.status(200).json({ message: "Logged out", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong while logging out",
      success: false,
    });
  }
};

module.exports = logoutServices;
