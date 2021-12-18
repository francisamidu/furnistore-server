import { Request, Response, NextFunction } from "express";
import logger from "./logger";
export default function (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);
  // logger.log({
  //   level: "error",
  //   message: error.message,
  // });
  res.status(500).send({ message: "Something went wrong. Sorry" });
}
