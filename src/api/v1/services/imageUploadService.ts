import { Response } from "express";
import SessionRequest from "../interfaces/Session";

const imageUploadService = async (req: SessionRequest, res: Response) => {
  const { destination, filename } = req.file;
  return res.status(200).json({
    imageUrl: `http://localhost:5000\/${destination}\/${filename}`,
    message: "Image uploaded",
    success: true,
  });
};

export default imageUploadService;
