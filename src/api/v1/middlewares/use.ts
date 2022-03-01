import { Request, Response, NextFunction } from "express";
import SessionRequest from "../interfaces/Session";
import logger from "./logger";

const use =
  (
    fun: (
      req: SessionRequest | Request,
      res: Response,
      next: NextFunction
    ) => any
  ) =>
  (req: SessionRequest | Request, res: Response, next: NextFunction) => {
    // logger.log({
    //   level: "info",
    //   message: JSON.stringify(req.session),
    // });
    return Promise.resolve(fun(req, res, next)).catch(next);
  };

export default use;
