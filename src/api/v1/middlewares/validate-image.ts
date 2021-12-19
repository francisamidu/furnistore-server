import { Request, Response, NextFunction } from "express";

const validateImage = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return res
      .status(422)
      .json({ message: "Image not uploaded", success: false });
  }
  next();
};

export default validateImage;
