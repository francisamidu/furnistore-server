import { Request, Response } from "express";

import { validationResult } from "express-validator";

//Database models
import User from "../db/models/User";
import Token from "../db/models/Token";

//Auth Utilities
import comparePassword from "../helpers/comparePassword";
import decryptPassword from "../helpers/decryptPassword";
import signJwt from "../helpers/signJwt";

//Logs in user and creates a new session
const loginService = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  //Check for empty credentials and send back response message
  const validationResults: any = validationResult(req);
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
  const { isAdmin, isVerified } = user;
  if (!isVerified) {
    return res
      .status(401)
      .json({ message: "Account verification required", success: false });
  }
  //Compare password and send back response message
  const decryptedPassword = decryptPassword(user.password);
  const isPasswordMatching = comparePassword(password, decryptedPassword);
  if (!isPasswordMatching) {
    return res
      .status(403)
      .json({ message: "Passwords do not match", success: false });
  }

  //Sign JWT
  const accessToken = await signJwt({
    _id: user._id,
    isAdmin,
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
    maxAge: 36000000, // 1hr expiry
  });

  //Set refresh token cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 86400000, // 1 day expiry
  });

  return res.json({
    message: "Login successful",
    success: true,
    user: {
      _id: user._id,
      isAdmin,
      isVerified,
    },
  });
};

export default loginService;
