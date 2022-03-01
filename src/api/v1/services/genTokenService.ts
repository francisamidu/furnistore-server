import { Response } from "express";
import SessionRequest from "../interfaces/Session";

import { Token } from "../db/models";
import { signJwt, verifyJwt } from "../helpers";

const getTokenService = async (req: SessionRequest, res: Response) => {
  const refreshToken = req.header("x-refresh-token");
  const token = await Token.findOne({ refreshToken });
  if (!token) {
    return res
      .status(401)
      .json({
        success: false,
        message: "Refresh token has expired. Please login again",
      });
  }
  //TODO: Create new session
  const accessToken = await signJwt(req.session.user, "1d");
  res.set("Access-Control-Expose-Headers", "x-auth-token");
  res.set("x-auth-token", accessToken);
  req.user = (await verifyJwt(accessToken)).payload;
  //Save token to the database
  token.accessToken = accessToken;
  await token.save();

  return res.json({
    accessToken,
    message: "Token refresh successful",
  });
};
export default getTokenService;
