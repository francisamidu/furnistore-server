import { Response } from "express";
import SessionRequest from "../interfaces/Session";

import { validationResult } from "express-validator";

//Database models
import { Token, User } from "../db/models";

//Auth Utilities
import { comparePassword, decryptPassword, signJwt } from "../helpers";

//Logs in user and creates a new session
const loginService = async (req: SessionRequest, res: Response) => {
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
  req.session.user = {
    _id: user._id,
    isAdmin,
  };
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
    accessToken,
    refreshToken,
  });
  await savedToken.save();

  //Set Token headers
  res.set("Access-Control-Expose-Headers", "x-auth-token");
  res.set("Access-Control-Expose-Headers", "x-refresh-token");
  res.set("x-auth-token", accessToken);
  res.set("x-refresh-token", refreshToken);

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
