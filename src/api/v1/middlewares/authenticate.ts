import { NextFunction, Request, Response } from "express";
import signJwt from "../helpers/signJwt";
import verifyJwt from "../helpers/verifyJwt";

const authenticate = async (
  req: Request,
  res: Response | any,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access. Login first!!!" });
  }
  try {
    //For valid access token
    const { payload, expired } = await verifyJwt(accessToken);
    if (payload) {
      req.user = payload;
      return next();
    }

    //Expired but valid access token
    const { payload: refresh } =
      expired && refreshToken
        ? await verifyJwt(refreshToken)
        : { payload: null };
    if (!refresh) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Login first!!!",
      });
    }

    //Generate new access token and set it to the cookie
    const newAccessToken = await signJwt(process.env.AUTH_SECRET, "1d");
    res.cookie("accesToken", newAccessToken, {
      httpOnly: true,
      maxAge: 36000000,
    });
    req.user = (await verifyJwt(newAccessToken)).payload;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during authentication",
    });
  }
};

export default authenticate;
