import { NextFunction, Response } from "express";
import SessionRequest from "../interfaces/Session";

import { signJwt, verifyJwt } from "../helpers";

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
  return next();
};

export default authenticate;
