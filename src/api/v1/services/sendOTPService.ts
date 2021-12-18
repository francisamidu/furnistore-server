import { Request, Response } from "express";

import { generateOTP } from "../helpers";
import { validationResult } from "express-validator";
import { OTP, User } from "../db/models";

//Sends OTP to email for password reset verification
const sendOTPService = async (req: Request, res: Response) => {
  const { email } = req.body;
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
  if (!user) {
    return res
      .status(404)
      .json({ message: "User account doesnt exist", success: false });
  }
  const verificationToken = new OTP({
    token: generateOTP(),
  });
  await verificationToken.save();

  //Send otp to email
};

export default sendOTPService;
