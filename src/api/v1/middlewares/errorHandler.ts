import { Request, Response, NextFunction } from "express";
export default function (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);
  res.status(500).send({ message: "Something went wrong. Sorry" });
}
