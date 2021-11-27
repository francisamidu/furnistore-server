const { validationResult } = require("express-validator");
const { AES, enc } = require("crypto-js");

//Database models
const User = require("../db/models/User");
const Token = require("../db/models/Token");

//Auth Utilities
const comparePassword = require("../utils/comparePassword");
const decryptPassword = require("../utils/decryptPassword");
const signJwt = require("../utils/signJwt");

//Logs in user and creates a session
const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check for empty credentials and send back response message
    const validationResults = validationResult(req);
    if (validationResults.length) {
      return res.status(403).json({
        message: "Please provide valid login credentials",
        success: false,
      });
    }

    //Query the database for user and send back response message
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found", success: false });
    }

    //Decrypt password
    const decryptedPassword = decryptPassword(user.password);

    //Compare password and send back response message
    const isPasswordMatching = comparePassword(password, decryptedPassword);
    if (!isPasswordMatching) {
      return res
        .status(403)
        .json({ message: "Passwords do not match", success: false });
    }

    //Sign JWT
    const accessToken = await signJwt({
      _id: user._id,
      isAdmin: user.isAdmin,
    });
    const refreshToken = await signJwt(
      {
        id: Date.now(),
      },
      3.154e10
    );

    //Save token to the database
    const savedToken = new Token({
      token: accessToken,
    });
    const refreshTokenObject = new Token({ token: refreshToken });
    await refreshTokenObject.save();
    await savedToken.save();

    //Set access token cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 36000000,
    });

    //Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 86400000,
    });

    return res.json({
      message: "Login successful",
      success: true,
      user: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong while loggin in",
      success: false,
    });
  }
};

module.exports = loginHandler;
