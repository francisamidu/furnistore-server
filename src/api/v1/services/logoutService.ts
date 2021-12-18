//Database models
import { Request, Response } from "express";
import { Token } from "../db/models";

//Logs out current user and deletes their session
const logoutService = async (req: Request, res: Response) => {
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

  return res.status(200).json({ message: "Logged out", success: true });
};

export default logoutService;
