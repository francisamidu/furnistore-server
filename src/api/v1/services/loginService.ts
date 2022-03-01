import { Response } from "express";
import SessionRequest from "../interfaces/Session";

import { validationResult } from "express-validator";

//Database models
import { Token, User } from "../db/models";

//Auth Utilities
import {
  comparePassword,
  decryptPassword,
  signJwt,
  serializeValidationResults,
} from "../helpers";

//Logs in user and creates a new session
const loginService = async (req: SessionRequest, res: Response) => {
  const { email, password } = req.body;

  //Check for empty credentials and send back response message
  const validationResults = validationResult(req).formatWith(
    serializeValidationResults
  );
  const results = validationResults.array();
  if (results.length) {
    return res.status(406).json(results);
  }

  //Query the database for user and send back response message
  const user = await User.findOne({ email }).populate({
    select: ["code", "roles"],
    model: "role",
    path: "roles",
  });
  if (!user) {
    return res.status(404).json({ message: "No user found", success: false });
  }
  const { roles } = user;
  // if (!isVerified) {
  //   return res
  //     .status(401)
  //     .json({ message: "Account verification required", success: false });
  // }
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
    roles,
  };

  const accessToken = await signJwt(req.session.user);
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

  return res.json({
    message: "Login successful",
    success: true,
    user: {
      _id: user._id,
      accessToken,
      refreshToken,
      roles,
    },
  });
};

export default loginService;
