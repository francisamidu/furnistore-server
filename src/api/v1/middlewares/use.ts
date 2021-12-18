import { Request, Response, NextFunction } from "express";
import SessionRequest from "../interfaces/Session";

const use =
  (
    fun: (
      req: SessionRequest | Request,
      res: Response,
      next: NextFunction
    ) => any
  ) =>
  (req: SessionRequest | Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fun(req, res, next)).catch(next);
  };

export default use;
