import { Response } from "express";
import SessionRequest from "../interfaces/Session";

const imageUploadService = async (req: SessionRequest, res: Response) => {
  const { destination, filename } = req.file;
  return res.status(200).json({
    message: "File stored.",
    filePath: `http://localhost:5000\/${destination}\/${filename}`,
  });
};

export default imageUploadService;
