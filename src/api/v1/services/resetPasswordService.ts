import { Response, Request } from "express";

import { validationResult } from "express-validator";

//Database models
import { User } from "../db/models";

//Auth Utilities
import { hashValue } from "../helpers";

//Creates a new password for a resetted account
const resetPasswordService = async (req: Request, res: Response) => {
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
  const newPassword = hashValue(password);
  user.password = newPassword;
  await user.save();

  const { isAdmin, isVerified } = user;

  return res.json({
    message: "Password reset was successful",
    success: true,
    user: {
      _id: user._id,
    },
  });
};

export default resetPasswordService;
