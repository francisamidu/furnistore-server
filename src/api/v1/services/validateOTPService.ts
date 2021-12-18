import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { OTP } from "../db/models";

//Validates OTP for password reset verification
const validateOTPService = async (req: Request, res: Response) => {
  const { otp } = req.body;
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
  const savedOTP = await OTP.findOne({ token: otp });
  if (!savedOTP) {
    return res.status(404).json({ message: "OTP is invalid", success: false });
  }

  //Delete otp after validation
  await OTP.findOneAndDelete({ token: otp });
  return res
    .status(200)
    .json({ message: "OTP has been validated", sucess: true });
};

export default validateOTPService;
