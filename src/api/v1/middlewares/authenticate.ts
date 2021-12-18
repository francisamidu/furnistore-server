import { NextFunction, Response } from "express";
import SessionRequest from "../interfaces/Session";

import signJwt from "../helpers/signJwt";
import verifyJwt from "../helpers/verifyJwt";

const authenticate = async (
  req: SessionRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.header("x-auth-token");
  const refreshToken = req.header("x-refresh-token");
  if (!refreshToken && !accessToken) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access. Login first!!!" });
  }
  //For valid access token
  const { payload, expired } = await verifyJwt(accessToken);
  if (payload) {
    req.user = payload;
    return next();
  }

  //Expired but valid access token
  const { payload: refresh } =
    expired && refreshToken ? await verifyJwt(refreshToken) : { payload: null };
  if (!refresh) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access. Login first!!!",
    });
  }

  //Generate new access token and set it to the cookie

  //TODO: Create new session
  const newAccessToken = await signJwt(req.session.user, "1d");
  res.set("Access-Control-Expose-Headers", "x-auth-token");
  res.set("x-auth-token", newAccessToken);
  req.user = (await verifyJwt(newAccessToken)).payload;
  return next();
};

export default authenticate;
