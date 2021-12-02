import { Request, Response } from "express";
import { validationResult } from "express-validator";

//Database models
import VerificationToken from "../db/models/OTP";
import User from "../db/models/User";

//Auth Utilities
import generateOTP from "../helpers/generateOTP";
import hashValue from "../helpers/hashValue";

//New user account registration
const registrationService = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  //Validate credentials and send back response message
  const validationResults: any = validationResult(req);
  if (validationResults.length) {
    const errors: any = validationResults.errors.map(
      (result: { msg: any }) => ({
        message: result.msg,
        success: false,
      })
    );
    return res.status(401).json(errors);
  }

  //Query the database for user and send back response message
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(400)
      .json({ message: "User already exists", success: false });
  }

  //has user password
  const hashedPassword = await hashValue(password);

  //create User and save to the database
  const newUser = new User({
    email,
    password: hashedPassword,
  });
  await newUser.save();
  const verificationToken = new VerificationToken({
    token: generateOTP(),
  });
  await verificationToken.save();

  return res.status(201).json({
    success: true,
    user: {
      email: newUser._doc.email,
      createdAt: newUser._doc.created_at,
    },
  });
};

export default registrationService;
